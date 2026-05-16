const links = document.querySelectorAll(".nav a");
const sections = [...links].map((link) => document.querySelector(link.getAttribute("href")));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.toggleAttribute("aria-current", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.filter(Boolean).forEach((section) => observer.observe(section));

document.querySelectorAll(".purchase-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const purchaseUrl = link.dataset.purchaseUrl;

    if (!purchaseUrl) {
      event.preventDefault();
      link.blur();
    }
  });
});
