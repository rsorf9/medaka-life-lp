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

const topicsList = document.querySelector("[data-topics-list]");

if (topicsList) {
  fetch("assets/topics.json")
    .then((response) => {
      if (!response.ok) throw new Error("topics.json could not be loaded");
      return response.json();
    })
    .then((topics) => {
      topicsList.innerHTML = topics
        .slice(0, 3)
        .map(
          (topic) => `
            <article class="topic-item">
              <time datetime="${topic.date}">${topic.label}</time>
              <p>${topic.text}</p>
            </article>
          `
        )
        .join("");
    })
    .catch(() => {
      // Keep the static fallback topics in the HTML when local file loading is blocked.
    });
}
