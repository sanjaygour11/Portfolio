/* ===== Editable content ===== */
const SKILLS = [
  ['Core Java', 'Language fundamentals'], ['OOP', 'Object-oriented design'],
  ['Collections', 'List, Set, Map'], ['Exception Handling', 'Safe, readable error flow'],
  ['Multithreading', 'Concurrent programming'], ['JDBC', 'Database connectivity'],
  ['SQL / MySQL', 'Queries and schema design'], ['Hibernate', 'ORM and persistence'],
  ['Spring', 'Dependency injection'], ['Spring Boot', 'REST and backend apps'],
  ['Servlets', 'Java web requests'], ['JSP', 'Server-side pages'],
  ['REST APIs', 'Spring Boot web services'], ['HTML & CSS', 'Frontend basics'],
  ['Git & GitHub', 'Version control']
];

const CONCEPTS = [
  'OOP', 'Inheritance', 'Polymorphism', 'Abstraction', 'Encapsulation', 'Collections',
  'Exception Handling', 'Multithreading', 'Lambda Expressions', 'Stream API', 'JDBC', 'Hibernate', 'Spring Boot'
];

const JOURNEY = [
  ['Core Java', 'Syntax, OOP, collections, exceptions, multithreading'],
  ['SQL & MySQL', 'Database design and queries'],
  ['Advanced Java', 'Building on core concepts'],
  ['JDBC', 'Connecting Java to databases'],
  ['Servlets & JSP', 'Java web fundamentals'],
  ['Hibernate', 'ORM and persistence'],
  ['Spring', 'Core framework concepts'],
  ['Spring Boot', 'Building backend applications'],
  ['Git & GitHub', 'Version control and collaboration']
];

const TYPED_TEXT = 'Java Backend Developer';

const CODE_LINES = [
  '<span class="c">// Sanjay Gour</span>',
  '<span class="k">public class</span> <span class="t">Developer</span> {',
  '',
  '  <span class="t">String</span> role = <span class="s">"Java Backend Developer"</span>;',
  '  <span class="t">String</span> location = <span class="s">"Bhopal, India"</span>;',
  '  <span class="t">String</span>[] stack = {',
  '    <span class="s">"Spring Boot"</span>, <span class="s">"Hibernate"</span>,',
  '    <span class="s">"JDBC"</span>, <span class="s">"SQL"</span>',
  '  };',
  '',
  '  <span class="k">public void</span> build() {',
  '    <span class="c">// reliable, scalable, efficient</span>',
  '  }',
  '}'
];

/* ===== Helpers ===== */
const $ = (s) => document.querySelector(s);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== Render cards ===== */
$('#skillGrid').innerHTML = SKILLS.map(([n, d]) =>
  `<div class="skill glass"><h3>${n}</h3><p>${d}</p></div>`).join('');
$('#conceptGrid').innerHTML = CONCEPTS.map((c) =>
  `<div class="concept glass">${c}</div>`).join('');
$('#timeline').innerHTML = JOURNEY.map(([t, d]) =>
  `<li class="glass">${t}<small>${d}</small></li>`).join('');
$('#year').textContent = new Date().getFullYear();

/* ===== Typing animation ===== */
(function typing() {
  const el = $('#typed');
  if (reduceMotion) { el.textContent = TYPED_TEXT; return; }
  let i = 0, deleting = false;
  (function tick() {
    el.textContent = TYPED_TEXT.slice(0, i);
    if (!deleting && i === TYPED_TEXT.length) { deleting = true; return setTimeout(tick, 2200); }
    if (deleting && i === 0) { deleting = false; return setTimeout(tick, 500); }
    i += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 40 : 85);
  })();
})();

/* ===== Hero code window: reveals line by line ===== */
(function codeWindow() {
  const pre = $('#code');
  if (reduceMotion) { pre.innerHTML = CODE_LINES.join('\n'); return; }
  let n = 0;
  const id = setInterval(() => {
    pre.innerHTML = CODE_LINES.slice(0, ++n).join('\n');
    if (n >= CODE_LINES.length) clearInterval(id);
  }, 260);
})();

/* ===== Floating code symbols in background ===== */
(function floatBg() {
  if (reduceMotion) return;
  const items = ['{ }', 'public', 'class', '</>', 'int', 'SQL', ';', '@Entity', 'List<T>', 'void', '( )'];
  const box = $('#floatBg');
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    s.textContent = items[i % items.length];
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = 12 + Math.random() * 14 + 'px';
    s.style.animationDuration = 18 + Math.random() * 20 + 's';
    s.style.animationDelay = -Math.random() * 30 + 's';
    box.appendChild(s);
  }
})();

/* ===== Scroll reveal (staggered inside grids) ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const siblings = [...e.target.parentElement.children];
    e.target.style.transitionDelay = Math.min(siblings.indexOf(e.target), 8) * 60 + 'ms';
    e.target.classList.add('visible');
    io.unobserve(e.target);
    setTimeout(() => (e.target.style.transitionDelay = ''), 1200);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .skill, .concept, .timeline li').forEach((el) => io.observe(el));

/* ===== Nav: scrolled state, mobile menu, active link ===== */
const nav = $('#nav'), menuBtn = $('#menuBtn'), links = $('#navLinks');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }
});

const navAnchors = [...links.querySelectorAll('a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

/* ===== Contact form =====
   No backend yet, so Send opens the visitor's email app with the message filled in.
   Replace CONTACT_EMAIL with your real address. */
const CONTACT_EMAIL = 'sanjaygour9302@gmail.com';
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target, status = $('#formStatus');
  const name = f.name.value.trim(), email = f.email.value.trim(), message = f.message.value.trim();
  [f.name, f.email, f.message].forEach((i) => i.classList.remove('err'));

  const bad = [];
  if (!name) bad.push(f.name);
  if (!/^\S+@\S+\.\S+$/.test(email)) bad.push(f.email);
  if (!message) bad.push(f.message);
  if (bad.length) {
    bad.forEach((i) => i.classList.add('err'));
    status.style.color = '#ff6b6b';
    status.textContent = 'Please fill in your name, a valid email and a message.';
    bad[0].focus();
    return;
  }
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  status.style.color = '#8fd18f';
  status.textContent = 'Opening your email app to send the message.';
  f.reset();
});
