export const email = "sdclarkie@gmail.com";

export const capture = {
  company: "WakeCap",
  title: "Lead Engineer, Capture",
  dates: "January 2024 – October 2026",
  deck: "Capture combined construction schedules, field progress, 3D models, site imagery, and payment workflows in one application.",
  summary:
    "I led engineering for Capture at WakeCap, working across its React and TypeScript application and .NET backend.",
  scope: [
    {
      title: "Progress & planning",
      description:
        "Teams reviewed schedules, field updates, approvals, and earned value by activity, location, or work breakdown structure.",
    },
    {
      title: "Models & imagery",
      description:
        "Views combined 3D designs, blueprints, drone imagery, and 360° walkthroughs with reported construction progress.",
    },
    {
      title: "Payments",
      description:
        "Teams managed contracts, bills of quantities, allocations, payment applications, and certificates. Background jobs handled larger processing tasks.",
    },
  ],
  contributions: [
    "Delivered a production OpenSpace integration across authentication, secure backend proxies, blueprint matching, and React interfaces, with rate-limit handling and retries.",
    "Reduced median SQL rollup time 16% in benchmarks without changing the results.",
    "Replaced full-buffer S3 JSON processing with streaming serialization to address out-of-memory failures in a test import pipeline.",
    "Added OpenTelemetry metrics for model-processing health and Sentry exception capture for background workers.",
    "Reduced CI duration from about 30 to 10 minutes and Playwright runtime from about 20 to 6 minutes by isolating test account data.",
  ],
  stack: "React · TypeScript · TanStack Router & Query · C# / .NET 8 · PostgreSQL / PostGIS",
};

export const growers = {
  title: "Software Engineer",
  dates: "January 2021 – November 2023",
  summary:
    "I worked on GROWERS Rally and an agricultural commerce platform, building web and mobile features and the APIs behind them.",
  products: [
    {
      title: "GROWERS Rally",
      description:
        "I built CRM features with React and React Native. Rally covered customer records, contacts, farm plans, crop programs, and product costs.",
      stack: "React Native · Expo · Node.js · Sequelize · PostgreSQL",
    },
    {
      title: "Agricultural commerce",
      description:
        "I built product pages and price requests, including retailer selection, saved drafts, and offer review. Changes spanned React components, APIs, and the database.",
      stack: "React · TypeScript · React Query · Node.js · Jest",
    },
  ],
  contributions: [
    "Built storefront product pages and updated product requests across React components, API contracts, and shared types.",
    "Implemented preferred-retailer selection and save-as-draft behavior for price requests.",
    "Updated accepted offers, retailer statuses, and pickup and delivery workflows.",
    "Built tested, reusable components for toolbars, bottom sheets, page headings, lists, and data displays.",
    "Designed APIs for crop recommendations and product matching. Integrated Stripe, SendGrid, and Twilio for payments and messaging.",
    "Added Jest tests and i18next localization.",
  ],
};

export const contributions = [
  {
    title: "React Zero UI",
    label: "Merged open-source contribution",
    description:
      "Fixed directory scanning and configuration loading in icon-sprite, with regression tests and documentation.",
    href: "https://github.com/react-zero-ui/icon-sprite/pull/4",
  },
  {
    title: "Vets Who Code",
    label: "Community & open source",
    description:
      "Built the homepage for an open-source app supporting veterans entering software development.",
    href: "https://github.com/Vets-Who-Code/vets-who-code-app",
  },
];
