const loader = document.getElementById("loader");
const crystal = document.getElementById("crystal");
const navItems = document.getElementById("navItems");
const navActive = document.getElementById("navActive");
const navLinks = [...document.querySelectorAll(".nav-link")];
const revealEls = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");

document.getElementById("year").textContent = new Date().getFullYear();

function positionNavActive(link) {
  if (!link || !navItems || !navActive) return;
  const navRect = navItems.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  navActive.style.width = `${linkRect.width}px`;
  navActive.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
}
positionNavActive(document.querySelector(".nav-link.active"));
window.addEventListener("resize", () => positionNavActive(document.querySelector(".nav-link.active")));

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    positionNavActive(link);
  });
});

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("is-done"), 650);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });
revealEls.forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    const link = navLinks.find(x => x.dataset.section === id);
    if (!link) return;
    navLinks.forEach(x => x.classList.remove("active"));
    link.classList.add("active");
    positionNavActive(link);
  });
}, {threshold: 0.35});
sections.forEach(section => sectionObserver.observe(section));

let latestScroll = 0;
function introScrollMotion() {
  latestScroll = window.scrollY;
  const progress = Math.min(latestScroll / (window.innerHeight * 0.82), 1);
  if (crystal) {
    const scale = 1 - progress * 0.72;
    const y = -progress * 150;
    const rotate = progress * 22;
    crystal.style.transform = `translate3d(0, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
    crystal.style.opacity = String(1 - progress * 1.15);
  }
}
window.addEventListener("scroll", introScrollMotion, {passive:true});
introScrollMotion();

document.addEventListener("pointermove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
  if (window.scrollY < window.innerHeight * .8 && crystal) {
    const x = (e.clientX / window.innerWidth - .5) * 8;
    const y = (e.clientY / window.innerHeight - .5) * -6;
    crystal.style.setProperty("--mx", `${x}deg`);
    crystal.style.setProperty("--my", `${y}deg`);
  }
});

document.querySelectorAll("[data-tilt]").forEach(card => {
  card.addEventListener("pointermove", (e) => {
    if (window.innerWidth < 800) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
