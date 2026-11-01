import { Link } from "@tanstack/react-router";
import { ArrowUpIcon } from "@phosphor-icons/react";
export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-brand">
        <img
          src="/assets/brand/sc-mark-black.svg"
          width="48"
          height="36"
          alt="Stephen Clark monogram"
        />
        <p>© 2026 Stephen Clark</p>
      </div>
      <p>Richlands, North Carolina .</p>
      <Link to="/" activeOptions={{ includeHash: true }} hash="top">
        Back to top <ArrowUpIcon size={18} />
      </Link>
    </footer>
  );
}
