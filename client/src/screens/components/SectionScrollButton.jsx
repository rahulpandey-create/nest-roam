import React from "react";

const scrollToSection = (sectionId) => {
  const target = document.getElementById(sectionId);
  if (!target) return;

  if (window.lenis) {
    window.lenis.scrollTo(target, { offset: -96, duration: 1 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** Scroll to a section on the current page without changing the URL. */
const SectionScrollButton = ({ targetId, children, ...buttonProps }) => (
  <button
    type="button"
    onClick={() => scrollToSection(targetId)}
    {...buttonProps}
  >
    {children}
  </button>
);

export default SectionScrollButton;
