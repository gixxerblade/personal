import { ArrowRightIcon, ArrowDownIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
export function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-heading">
      <div className="hero-grid">
        <h1 id="hero-heading">
          <span>I turn complex</span> <span>problems into</span> <span>useful software.</span>
        </h1>
        <div className="hero-intro">
          <p>
            Full-stack software engineer in Richlands, North Carolina. I work with React,
            TypeScript, .NET, Python, and PostgreSQL.
          </p>
          <div className="hero-actions">
            <Link to="/" activeOptions={{ includeHash: true }} hash="work" className="button">
              See selected work <ArrowRightIcon size={25} />
            </Link>
            <a className="text-link" href="/assets/stephen-clark-resume.docx" download>
              Download résumé <ArrowDownIcon size={21} />
            </a>
          </div>
        </div>
      </div>
      <div className="credentials">
        <span>PREVIOUSLY LEAD ENGINEER, CAPTURE AT WAKECAP</span>
        <span>U.S. MARINE CORPS VETERAN</span>
        <span>5+ YEARS COMMERCIAL ENGINEERING</span>
      </div>
    </section>
  );
}
