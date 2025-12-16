// Register Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Hero Animations
gsap.from(".couple-name span", {
  y: 50,
  opacity: 0,
  duration: 1.5,
  stagger: 0.3,
  ease: "power3.out"
});

gsap.from(".wedding-date-box", {
  scale: 0,
  opacity: 0,
  duration: 1,
  delay: 1,
  ease: "back.out(1.7)"
});

// 2. Couple Cards Animation (Slide In)
gsap.from(".slide-left", {
  x: -100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".couple-section",
    start: "top 80%"
  }
});

gsap.from(".slide-right", {
  x: 100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".couple-section",
    start: "top 80%"
  }
});

// 3. Events Timeline (Fade Up One by One)
gsap.utils.toArray(".fade-up").forEach((item) => {
  gsap.from(item, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: item,
      start: "top 90%"
    }
  });
});

// 4. Parallax Text Effect
gsap.from(".parallax-text", {
  scale: 0.8,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".invite-parallax",
    start: "top 75%",
    scrub: true
  }
});