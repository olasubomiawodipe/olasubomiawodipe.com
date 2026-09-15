"use strict";

document.body.classList.add("js");

const scrollArea = document.querySelector(".scroll-area");
const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(
  'nav a[href^="#"]:not([href="#home"])',
);
let pendingSectionId = null;
let pendingScrollTop = null;

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

// Light a section's link and keep it lit until the reader scrolls away, used
// both for nav clicks and for loading straight into a #hash.
const holdSection = (sectionId) => {
  pendingSectionId = sectionId;
  pendingScrollTop = null;
  setActiveSection(sectionId);
  // The anchor jump is instant, so by the next frame it has landed, and that
  // resting position is the baseline for noticing the reader moving away.
  requestAnimationFrame(() => {
    pendingScrollTop = scrollArea.scrollTop;
  });
};

const updateActiveSection = () => {
  // The scroll container starts below the header, so its own box — not the
  // window — defines where the readable region begins and ends. Section rects
  // are viewport-relative, and so is areaTop, so the two compare directly.
  const areaTop = scrollArea.getBoundingClientRect().top;
  const activeLine = areaTop + scrollArea.clientHeight * 0.35;
  const isAtPageBottom =
    scrollArea.scrollTop + scrollArea.clientHeight >=
    scrollArea.scrollHeight - 2;

  // While a section is held (see holdSection), keep its link lit: once the
  // target lands at the top of the reading area the next section is usually
  // above the active line too, so the calculation below would pick the wrong
  // one. The hold ends as soon as the reader scrolls away from where the jump
  // left them.
  if (pendingSectionId) {
    if (
      pendingScrollTop === null ||
      Math.abs(scrollArea.scrollTop - pendingScrollTop) < 4
    ) {
      return;
    }

    pendingSectionId = null;
    pendingScrollTop = null;
  }

  let activeSectionId = sections[0]?.id;

  if (isAtPageBottom) {
    setActiveSection(sections[sections.length - 1]?.id);
    return;
  }

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= activeLine) {
      activeSectionId = section.id;
    }
  });

  if (activeSectionId) {
    setActiveSection(activeSectionId);
  }
};

// The header sits outside the scroll container and so keeps its full width,
// while the content inside loses the scrollbar's width. Without this the nav
// would sit wider than the content beneath it. Returns 0 on overlay scrollbars.
//
// Measured on a throwaway probe rather than on .scroll-area itself: the value
// feeds the header's padding, which can re-wrap the nav and resize .scroll-area,
// so observing that element to measure it is a feedback loop whose follow-up
// notification the browser may drop.
const measureScrollbarWidth = () => {
  const probe = document.createElement("div");
  probe.className = "scrollbar-probe";
  probe.style.cssText =
    "position:absolute;top:-9999px;width:100px;height:100px;overflow-y:scroll";
  document.body.appendChild(probe);
  const width = probe.offsetWidth - probe.clientWidth;
  probe.remove();
  return width;
};

const syncScrollbarWidth = () => {
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${measureScrollbarWidth()}px`,
  );
};

scrollArea.addEventListener("scroll", updateActiveSection, { passive: true });

// The nav wraps at narrow widths, which changes the scroll area's height and so
// where the active line falls. This also covers the initial measurement.
new ResizeObserver(updateActiveSection).observe(scrollArea);

// Zooming changes the scrollbar's rendered width, and fires resize.
syncScrollbarWidth();
window.addEventListener("resize", syncScrollbarWidth);

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    holdSection(link.getAttribute("href").slice(1));
  });
});

const initialSectionId = window.location.hash.slice(1);
if (initialSectionId && document.getElementById(initialSectionId)) {
  holdSection(initialSectionId);
}
