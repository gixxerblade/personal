import { useCreateStore, useStore } from "@tanstack/react-store";
import { CopyIcon, ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react";
import { email } from "../content";
export function Contact() {
  const store = useCreateStore({ status: "", pending: false });
  const { status, pending } = useStore(store);
  async function copyEmail() {
    store.setState(() => ({ status: "", pending: true }));
    try {
      await navigator.clipboard.writeText(email);
      store.setState(() => ({ status: "Email copied", pending: false }));
    } catch {
      store.setState(() => ({ status: "Select the email address to copy it.", pending: false }));
    }
  }
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="eyebrow">LET’S TALK</p>
        <div className="contact-heading">
          <h2 id="contact-title">
            Have a role or project
            <br />
            in mind?
          </h2>
          <a className="button" href={`mailto:${email}`}>
            Get in touch <ArrowUpRightIcon size={24} />
          </a>
        </div>
        <div className="contact-bottom">
          <div>
            <div className="email-group">
              <a className="email-link" href={`mailto:${email}`}>
                {email}
              </a>
              <button
                className="copy-email"
                type="button"
                aria-label="Copy email address"
                disabled={pending}
                aria-busy={pending}
                onClick={copyEmail}
              >
                {status === "Email copied" ? <CheckIcon size={21} /> : <CopyIcon size={21} />}
              </button>
            </div>
            <output className="copy-status" aria-live="polite">
              {status}
            </output>
          </div>
          <div className="social-links">
            <a href="https://github.com/gixxerblade" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRightIcon size={18} />
            </a>
            <a href="https://github.com/sclark-bycore" target="_blank" rel="noopener noreferrer">
              Work GitHub <ArrowUpRightIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/stephen-clark-5319406/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRightIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
