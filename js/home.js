import { initCart } from "./panier.js";

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    menuOverlay.classList.remove('hidden');
    setTimeout(() => menuOverlay.classList.add('opacity-100'), 10);
}

function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    menuOverlay.classList.remove('opacity-100');
    setTimeout(() => menuOverlay.classList.add('hidden'), 300);
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);


const aboutMe_part1 = `I am a PhD researcher studying complex systems through agent-based modeling and simulation. However, teaching, is my Ikigai, it is driven by a deep commitment to helping students grow beyond what they thought possible.`;
const aboutMe_part2 = `It is not an accessory to my work — it is its foundation and its energy. Research sharpens my thinking; the classroom gives it meaning. And as a developer, I turn ideas into clean, reliable software built to last.`;

const aboutMe1 = document.getElementById('aboutMe1');
aboutMe1.textContent = aboutMe_part1;

const aboutMe2 = document.getElementById('aboutMe2');
aboutMe2.textContent = aboutMe_part2;

const overview = [
  { number: new Date().getFullYear() - 2017, label: 'Years experience' },
  { number: '800+', label: 'Students taught' },
  { number: '20+', label: 'Topics' }
];

const statsContainer = document.getElementById('stats-container');
statsContainer.innerHTML = '';

overview.forEach(item => {
  statsContainer.innerHTML += `
    <div class="flex flex-col">
      <span class="text-4xl font-serif text-red">${item.number}</span>
      <span class="text-[10px] tracking-widest text-gray-400 uppercase font-bold">
        ${item.label}
      </span>
    </div>
  `;
});

const homeCourses = [
  { tag: 'Development', title: 'Web Development Fundamentals', mode: 'Online', duration: '8 weeks', color: 'bg-red-700' },
  { tag: 'Translation', title: 'Technical Translation Masterclass', mode: 'Hybrid', duration: '6 weeks', color: 'bg-black' },
  { tag: 'Research', title: 'Academic Writing & Methodology', mode: 'Offline', duration: '10 weeks', color: 'bg-gray-700' },
];

const coursesContainer = document.getElementById('courses-container');
coursesContainer.innerHTML = '';
homeCourses.forEach(course => {
  coursesContainer.innerHTML += `
    <div class="bg-bg-white rounded-2xl p-8 w-87.5 shadow-sm flex flex-col justify-between min-h-55 hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl">
      <div>
        <span class="${course.color} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          ${course.tag}
        </span>
        
        <h3 class="text-xl font-bold text-text-dark mt-6 leading-snug">
          ${course.title}
        </h3>
      </div>

      <div class="mt-8 pt-4 border-t border-gray-300 flex justify-between items-center text-gray-400 text-xs">
        <span>${course.mode}</span>
        <span>${course.duration}</span>
      </div>
    </div>
  `;
});

const experiences = [
  { year: '2026 – Present', role: 'Consultant', org: 'Independent', desc: 'Advising, teaching, on a much more singular level for all societies, and developing scalable solutions' },
  { year: '2021 – 2026', role: 'Study Coordinator | Back-end developer', org: "HEI Madagascar (Haute École d'Informatique), Antananarivo", desc: 'Responsible of studies, permanent teacher for 5 different topics, as well as some back-end development on the school management app' },
  { year: '2024', role: 'PhD in Computer Science', org: 'Université de Fianarantsoa', desc: 'A self-founded PhD on modeling complex systems, between the university of Fianarantsoa, and CIRAD, Montpellier, titled: Accounting for norms in agent-based modeling' },
  { year: '2017 – 2020', role: 'Teacher', org: "ESMIA (École Supérieure de Management et d'Informatique appliquée), Antananarivo", desc: 'Taught over 14 different topics from first years to Master degree. Mentoring students from small projects to technical ones' }
];

const expGrid = document.getElementById('experience-grid');
expGrid.innerHTML = '';
experiences.forEach(exp => {
  expGrid.innerHTML += `
    <div class="border-l-2 border-gray-300 pl-8 flex flex-col gap-2 hover:border-red transition-colors duration-500 group"">
      <span class="text-red text-[11px] font-bold tracking-widest uppercase">
        ${exp.year}
      </span>
      
      <h3 class="text-xl font-bold text-text-dark">
        ${exp.role}
      </h3>
      
      <p class="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">
        ${exp.org}
      </p>
      
      <p class="text-gray-500 text-sm leading-relaxed max-w-sm">
        ${exp.desc}
      </p>
    </div>
  `;
});

initCart();