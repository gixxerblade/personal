import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("production content hydrates without errors and passes accessibility checks", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  for (const details of await page.locator("details").all()) {
    if ((await details.getAttribute("open")) === null) await details.locator("summary").click();
  }
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test("navigation and career disclosures work", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("link", { name: "Read the engineering story" }).click();
  await expect(page.locator("#capture-story")).toHaveAttribute("open", "");
  await expect(page.locator("#capture-story .case-body")).toBeVisible();
  await page.getByText("My work at Growers", { exact: true }).click();
  await expect(page.locator(".contribution-list")).toBeVisible();
  expect(await page.getByRole("navigation").locator("[aria-current]").count()).toBeLessThanOrEqual(
    1,
  );
});

test("résumé downloads and contact uses the correct email", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "sdclarkie@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:sdclarkie@gmail.com");
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: /Download résumé/ }).click();
  expect((await download).suggestedFilename()).toBe("stephen-clark-resume.docx");
});

test("email copy succeeds and denied clipboard gives a useful fallback", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("sdclarkie@gmail.com");
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("Permission denied");
    };
  });
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Select the email address to copy it.");
});

test("small phones, tablets and desktop have no horizontal overflow", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `overflow at ${width}px`,
    ).toBe(true);
  }
});

test("legacy routes redirect and unknown URLs return a real 404", async ({ request, page }) => {
  for (const [path, location] of [
    ["/aboutme", "/#about"],
    ["/projects/", "/#work"],
    ["/contact", "/#contact"],
    ["/resume", "/assets/stephen-clark-resume.docx"],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(path === "/resume" ? 302 : 301);
    expect(response.headers().location).toBe(location);
  }
  const response = await page.goto("/this-page-does-not-exist");
  expect(response.status()).toBe(404);
  await page.getByRole("link", { name: "Back to the portfolio" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("content and native navigation work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4174/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "Background", exact: true }),
  ).toBeVisible();
  await page.getByText("Inside Capture", { exact: true }).click();
  await expect(page.locator("#capture-story")).toHaveAttribute("open", "");
  await expect(page.getByRole("link", { name: "sdclarkie@gmail.com", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test("reduced motion preference disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    "auto",
  );
});
