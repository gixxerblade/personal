import { useEffect, useRef } from "react";
import { useCreateStore, useStore } from "@tanstack/react-store";
import { Link } from "@tanstack/react-router";
import { ListIcon, XIcon } from "@phosphor-icons/react";
export function Header() {
  const store = useCreateStore({ open: false });
  const open = useStore(store, (state) => state.open);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const close = () => store.setState(() => ({ open: false }));
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape" && store.state.open) {
        store.setState(() => ({ open: false }));
        button.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target))
        store.setState(() => ({ open: false }));
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [store]);
  return (
    <header className="site-header wrap" ref={header}>
      <Link
        to="/"
        activeOptions={{ includeHash: true }}
        hash="top"
        className="wordmark"
        aria-label="Stephen Clark home"
      >
        STEPHEN CLARK
      </Link>
      <button
        ref={button}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => store.setState((s) => ({ open: !s.open }))}
      >
        Menu {open ? <XIcon size={22} /> : <ListIcon size={22} />}
      </button>
      <nav id="navigation" aria-label="Main navigation" className={open ? "is-open" : ""}>
        <Link to="/" activeOptions={{ includeHash: true }} hash="work" onClick={close}>
          Work
        </Link>
        <Link to="/" activeOptions={{ includeHash: true }} hash="about" onClick={close}>
          Background
        </Link>
        <Link to="/" activeOptions={{ includeHash: true }} hash="contact" onClick={close}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
