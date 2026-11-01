import { ArrowRightIcon, ArrowUpRightIcon, PlusIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { capture, growers, contributions } from "../content";

export function Work() {
  const captureStory = useRef<HTMLDetailsElement>(null);
  return (
    <section id="work" aria-label="Selected work">
      <article className="capture wrap" aria-labelledby="capture-title">
        <div className="capture-grid">
          <div className="capture-story-lead">
            <p className="eyebrow">FEATURED WORK / WAKECAP / CAPTURE</p>
            <h2 className="capture-headline" id="capture-title">
              Construction progress,
              <br />
              from site to screen.
            </h2>
            <p className="capture-deck">{capture.deck}</p>
            <div className="capture-actions">
              <a
                href="#capture-story"
                className="text-link story-jump"
                onClick={() => {
                  if (captureStory.current) captureStory.current.open = true;
                }}
              >
                Read the engineering story <ArrowRightIcon size={24} aria-hidden />
              </a>
            </div>
          </div>
          <div className="capture-intro">
            <p className="eyebrow">{capture.dates}</p>
            <h3>{capture.title}</h3>
            <p>{capture.summary}</p>
            <p>
              My work included OpenSpace walkthroughs, reporting, background processing, and
              deployment tooling.
            </p>
          </div>
        </div>
        <details ref={captureStory} id="capture-story" className="case-study">
          <summary>
            Inside Capture <PlusIcon size={23} aria-hidden />
          </summary>
          <div className="case-body">
            <div className="case-lead">
              <p className="eyebrow">PLATFORM SCOPE</p>
              <h3>
                Schedules, site data,
                <br />
                and payments.
              </h3>
              <p>{capture.stack}</p>
            </div>
            <div className="scope-grid">
              {capture.scope.map((item) => (
                <div key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="case-contributions">
              <h3>Selected contributions</h3>
              <ul>
                {capture.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </article>
      <article className="cycling" aria-labelledby="cycling-title">
        <img
          className="cycling-photo"
          src="/assets/cycling.webp"
          alt="Down East Cyclists riders on a road in Eastern North Carolina"
          width="1672"
          height="941"
          loading="lazy"
        />
        <div className="wrap cycling-inner">
          <div className="cycling-copy">
            <p className="eyebrow">SELECTED WORK / COMMUNITY</p>
            <h2 id="cycling-title">
              DOWN EAST
              <br />
              <span>CYCLISTS</span>
            </h2>
            <p className="cycling-subtitle">
              The website for my
              <br />
              local cycling club.
            </p>
            <p>
              I built and maintain the club’s Next.js site: Stripe memberships, member
              administration, events, and trail issue reporting.
            </p>
            <div className="cycling-actions">
              <a
                className="button"
                href="https://github.com/gixxerblade/downeastcyclists"
                target="_blank"
                rel="noopener noreferrer"
              >
                View project <ArrowRightIcon size={23} />
              </a>
              <a
                className="text-link"
                href="https://downeastcyclists.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit site <ArrowUpRightIcon size={23} />
              </a>
            </div>
          </div>
        </div>
      </article>
      <article className="growers wrap section" aria-labelledby="growers-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PROFESSIONAL WORK / AGRICULTURE</p>
            <h2 id="growers-title">
              CRM and commerce
              <br />
              for agriculture.
            </h2>
          </div>
          <div>
            <p className="role-label">Growers · {growers.title}</p>
            <p className="muted">{growers.dates}</p>
          </div>
        </div>
        <p className="growers-intro">{growers.summary}</p>
        <div className="product-pair">
          {growers.products.map((product) => (
            <div key={product.title}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="stack-label">{product.stack}</p>
            </div>
          ))}
        </div>
        <details className="case-study">
          <summary>
            My work at Growers <PlusIcon size={23} aria-hidden />
          </summary>
          <div className="case-body">
            <ul className="contribution-list">
              {growers.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </details>
      </article>
      <div className="open-source wrap">
        <p className="eyebrow">OPEN SOURCE</p>
        {contributions.map((item) => (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contribution"
            key={item.title}
          >
            <div>
              <p className="eyebrow">{item.label}</p>
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
            <ArrowUpRightIcon aria-hidden size={30} />
          </a>
        ))}
      </div>
    </section>
  );
}
