"use strict";

document.body.classList.add("js");

const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll('nav a[href^="#"]');
let pendingSectionId = null;

const setActiveSection = (sectionId) => {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateActiveSection = () => {
  const headerOffset = 72;
  const isAtPageBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

  if (pendingSectionId) {
    const pendingSection = document.getElementById(pendingSectionId);
    const isPendingSectionReady =
      pendingSection &&
      (pendingSection.getBoundingClientRect().top <= headerOffset ||
        (isAtPageBottom && pendingSection === sections[sections.length - 1]));

    if (!isPendingSectionReady) {
      return;
    }

    pendingSectionId = null;
  }

  let activeSectionId = sections[0]?.id;

  if (isAtPageBottom) {
    setActiveSection(sections[sections.length - 1]?.id);
    return;
  }

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= headerOffset) {
      activeSectionId = section.id;
    }
  });

  if (activeSectionId) {
    setActiveSection(activeSectionId);
  }
};

window.addEventListener("scroll", updateActiveSection, { passive: true });
updateActiveSection();

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    pendingSectionId = link.getAttribute("href").slice(1);
    setActiveSection(pendingSectionId);
  });
});

const initialSectionId = window.location.hash.slice(1);
if (initialSectionId && document.getElementById(initialSectionId)) {
  pendingSectionId = initialSectionId;
  setActiveSection(initialSectionId);
}
