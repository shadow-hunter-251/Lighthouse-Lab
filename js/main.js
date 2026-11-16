document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.toLowerCase().split("/").pop() || "index.html";
  const pageKey = page.replace(".html", "");
  document.querySelectorAll(".shared-navbar [data-page]").forEach((link) => {
    if (link.dataset.page === pageKey) link.classList.add("active");
  });

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Word-by-word reveal. Authored title lines remain separate and never overlap.
  document.querySelectorAll("[data-word-reveal]").forEach((heading) => {
    if (heading.dataset.revealed === "true") return;
    heading.dataset.revealed = "true";
    let delay = 0;
    heading.querySelectorAll(".hero-title-line").forEach((line) => {
      const words = line.textContent.trim().split(/\s+/);
      line.replaceChildren();
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "hero-word";
        span.textContent = word;
        span.style.setProperty("--word-delay", `${delay}ms`);
        if (word.endsWith("...")) span.classList.add("hero-title-dots");
        line.append(span);
        if (index < words.length - 1) line.append(document.createTextNode(" "));
        delay += 115;
      });
    });
  });

  document.querySelectorAll("[data-lh-year]").forEach((node) => node.textContent = String(new Date().getFullYear()));

  // Footer legal cards (shared markup is present on every page).
  const backdrop = document.getElementById("policyBackdrop");
  const dialog = backdrop?.querySelector(".policy-dialog");
  const title = document.getElementById("policyTitle");
  const body = document.getElementById("policyBody");
  let lastFocus = null;
  const legalCopy = {
    privacy: {
      title: "Privacy Policy",
      html: `<p>Your privacy matters to Lighthouse Lab. This demo policy explains how information may be handled when you contact us or use our services.</p><h3>Information we may collect</h3><p>We may receive the name, email address, phone number, project details, and other information you choose to share through our contact channels.</p><h3>How information is used</h3><p>Information is used to respond to enquiries, discuss projects, provide services, improve our website, and maintain communication.</p><h3>Sharing and security</h3><p>We do not sell personal information. Information may be shared with trusted service providers only when needed to deliver a service. We take reasonable steps to protect information, but no online system can guarantee absolute security.</p><h3>Your choices</h3><p>You may contact us to ask about, correct, or request deletion of information you have shared, subject to applicable requirements.</p><p><em>Demo copy: replace this text with a reviewed policy before publishing.</em></p>`
    },
    terms: {
      title: "Terms & Conditions",
      html: `<p>These demo terms describe general expectations for working with Lighthouse Lab. A project agreement or approved quotation may contain additional details.</p><h3>Projects and scope</h3><p>Project scope, deliverables, timelines, revisions, and fees should be confirmed in writing before work begins.</p><h3>Payments</h3><p>Payment milestones and due dates are defined in the accepted quotation or project agreement. Additional requests outside the agreed scope may require a revised estimate.</p><h3>Delivery and client responsibilities</h3><p>Delivery time depends on project complexity and timely feedback, content, and approvals from the client.</p><h3>Ownership and third-party services</h3><p>Ownership, licences, hosting, domains, and third-party service costs should be stated in the project agreement.</p><h3>Contact</h3><p>For questions about these terms, contact lighthouse.dhaka@gmail.com.</p><p><em>Demo copy: replace this text with reviewed terms before publishing.</em></p>`
    }
  };
  const closePolicy = () => {
    if (!backdrop || backdrop.hidden) return;
    backdrop.hidden = true;
    backdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("policy-open");
    lastFocus?.focus();
  };
  document.querySelectorAll("[data-policy-open]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!backdrop || !dialog) return;
    const key = link.dataset.policyOpen === "terms" ? "terms" : "privacy";
    title.textContent = legalCopy[key].title;
    body.innerHTML = legalCopy[key].html;
    lastFocus = link;
    backdrop.hidden = false;
    backdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("policy-open");
    dialog.focus();
  }));
  backdrop?.querySelectorAll("[data-policy-close]").forEach((button) => button.addEventListener("click", closePolicy));
  backdrop?.addEventListener("click", (event) => { if (event.target === backdrop) closePolicy(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closePolicy(); });

  document.querySelectorAll('.lh-footer a[href="#top"], .lh-footer a[href="#"]').forEach((link)=>link.addEventListener("click",(event)=>{event.preventDefault();window.scrollTo({top:0,behavior:"smooth"});}));
});
