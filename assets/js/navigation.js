(() => {
  const sidebar = document.getElementById("site-sidebar");
  const toggle = document.getElementById("sidebar-toggle");
  const close = document.getElementById("sidebar-close");
  const backdrop = document.getElementById("sidebar-backdrop");
  const workspace = document.getElementById("site-workspace");
  if (!sidebar || !toggle || !close || !backdrop || !workspace) return;

  document.documentElement.classList.replace("no-js", "js");
  toggle.hidden = false;
  close.hidden = false;
  const mobile = window.matchMedia("(max-width: 960px)");
  let opened = false;

  function setOpen(value, restoreFocus = false) {
    opened = mobile.matches && value;
    sidebar.classList.toggle("is-open", opened);
    document.body.classList.toggle("sidebar-open", opened);
    toggle.setAttribute("aria-expanded", String(opened));
    backdrop.hidden = !opened;
    sidebar.inert = mobile.matches && !opened;
    workspace.inert = opened;
    if (opened) {
      sidebar.setAttribute("role", "dialog");
      sidebar.setAttribute("aria-modal", "true");
      close.focus();
    } else {
      sidebar.removeAttribute("role");
      sidebar.removeAttribute("aria-modal");
      if (restoreFocus && mobile.matches) toggle.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(!opened));
  close.addEventListener("click", () => setOpen(false, true));
  backdrop.addEventListener("click", () => setOpen(false, true));
  mobile.addEventListener("change", () => {
    const focusWasInSidebar = sidebar.contains(document.activeElement);
    setOpen(false, focusWasInSidebar);
  });
  document.addEventListener("keydown", event => {
    if (!opened) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false, true);
    }
    if (event.key === "Tab") {
      const items = Array.from(sidebar.querySelectorAll("a[href], button:not([hidden])"));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  setOpen(false);
})();
