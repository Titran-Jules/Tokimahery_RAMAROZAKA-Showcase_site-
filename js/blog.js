import { initCart } from "./panier.js";

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    menuOverlay.classList.remove('hidden');
    setTimeout(() => menuOverlay.classList.add('opacity-100'), 10);

    const links = mobileMenu.querySelectorAll('nav a');
    links.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('animate-staggered-fade');
    });
}

function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    menuOverlay.classList.remove('opacity-100');
    setTimeout(() => {
        menuOverlay.classList.add('hidden');
        mobileMenu.querySelectorAll('nav a').forEach(link => link.classList.remove('animate-staggered-fade'));
    }, 300);
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

const posts = [
    { id: 1, title: 'Join me at HEI', description: "Since 2021, I have been a part of HEI - Haute École d'Informatique, from the ground up, and until its evolution, struggles, and first students, I have been there, and it was a lot of fun.", creationDate: new Date('2026-03-08'), thumbnail: 'https://picsum.photos/400', tags: ['education', 'HEI'] },
    { id: 2, title: 'Teaching Databases the Right Way', description: "Too many students jump directly into ORMs without understanding relational thinking. In my courses, we start with normalization, constraints, and real SQL joins before touching any abstraction layer. Strong foundations create confident engineers.", creationDate: new Date('2026-01-12'), thumbnail: 'https://picsum.photos/400', tags: ['databases', 'SQL', 'education'] },
    { id: 3, title: 'Why Git Is a Survival Skill', description: "Version control is not optional. I teach Git before advanced frameworks because collaboration, clean commit history, and conflict resolution are what make or break real-world software projects.", creationDate: new Date('2026-02-03'), thumbnail: 'https://picsum.photos/400', tags: ['git', 'software-engineering', 'education'] },
    { id: 4, title: 'Building a Secure Exam Platform', description: "Designing a live exam platform with strict tab-focus control and paste restrictions pushed me to combine pedagogy and engineering. Fair assessment requires both technical precision and educational clarity.", creationDate: new Date('2026-03-19'), thumbnail: 'https://picsum.photos/400', tags: ['svelte', 'typescript', 'assessment'] },
    { id: 5, title: 'Operating Systems: From Theory to Practice', description: "Processes, threads, memory management — these concepts only make sense when students experiment with them. I prioritize simulations and real concurrency problems to make operating systems tangible.", creationDate: new Date('2026-04-08'), thumbnail: 'https://picsum.photos/400', tags: ['operating-systems', 'computer-science', 'education'] },
    { id: 6, title: 'Spring Boot Beyond CRUD', description: "Teaching Spring Boot is not about generating controllers. It is about architecture: layered design, validation, security, JPA relationships, and writing backend systems that remain maintainable years later.", creationDate: new Date('2026-05-27'), thumbnail: 'https://picsum.photos/400', tags: ['spring-boot', 'java', 'backend'] },
    { id: 7, title: 'Technical English Is a Career Lever', description: "Reading documentation, writing clear README files, and communicating ideas internationally are critical skills for developers. Integrating technical English into IT training unlocks global opportunities.", creationDate: new Date('2026-07-14'), thumbnail: 'https://picsum.photos/400', tags: ['english', 'career', 'education'] },
    { id: 8, title: 'SEO for Engineers', description: "SEO is not just marketing. It is structured HTML, accessibility, performance optimization, and semantic clarity. Developers who understand search engines build better web applications.", creationDate: new Date('2026-09-02'), thumbnail: 'https://picsum.photos/400', tags: ['seo', 'web-development', 'performance'] },
    { id: 9, title: 'Narrative-Driven Programming Exercises', description: "I design algorithm problems with storytelling elements while keeping strict technical constraints. Students engage more deeply, and still practice loops, accumulators, edge cases, and structured thinking.", creationDate: new Date('2026-11-18'), thumbnail: 'https://picsum.photos/400', tags: ['algorithms', 'pedagogy', 'education'] },
]

const youtubeVideos = [
    { id: 'cdWNlGD_FzQ', title: 'Counter App with Pharo' },
    { id: 'cfS4XP4bBEk', title: 'Build a DSL with Pharo' },
    { id: 'Ut2aeuFc2KY', title: 'My keyboard addiction' }
]

const archives = [
    { label: 'January 2026', slug: '2026-01', count: 2 },
    { label: 'February 2026', slug: '2026-02', count: 1 }
]

const posts_section = document.querySelector("#posts_section");
const prev_btn = document.querySelector("#prev-btn");
const next_btn = document.querySelector("#next-btn");
const recent_post = document.querySelectorAll(".recent-post");
const subscribe_container = document.querySelector("#subscribe-container");
const subscribe_btn = document.querySelector("#subscribe-btn");
const email_input = document.querySelector("#email-input");

let currentPage = 1;
const pageSize = 5;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-4');
            entry.target.classList.add('opacity-100', 'translate-y-0');
        }
    });
}, { threshold: 0.1 });

function observePosts() {
    document.querySelectorAll('.reveal-card').forEach(card => observer.observe(card));
}

function renderPosts(page) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginatedPost = posts.slice(start, end);

    let postContent = "";

    paginatedPost.forEach(post => {
        const formattedDate = post.creationDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        postContent += `
        <article class="relative flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md reveal-card opacity-0 translate-y-4 transition-all duration-700">
            <div class="w-full md:w-48 h-48 shrink-0 overflow-hidden rounded-xl">
                <img src="${post.thumbnail}" alt="${post.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="flex flex-col grow relative lg:pb-8">
                <h3 class="text-red-dark text-xl md:text-2xl font-bold mb-1">${post.title}</h3>
                <span class="text-gray-400 text-xs mb-3 font-medium uppercase tracking-tighter">${formattedDate}</span>
                <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">${post.description}</p>
                <div class="flex flex-wrap mt-4 lg-mt-0 gap-2 lg-absolute lg:bottom-0 lg:left-0">
                    ${post.tags.map(tag => `<span class="px-3 py-1 bg-[#54A0FF] text-white text-[10px] rounded-full border border-gray-100 font-bold uppercase tracking-widest">#${tag}</span>`).join('')}
                </div>
            </div>
        </article>`;
    });
    posts_section.innerHTML = postContent;

    prev_btn.disabled = (page == 1);
    next_btn.disabled = (end >= posts.length);

    recent_post.forEach(recent => {
        if (Number(recent.textContent) == page) {
            recent.classList.add("bg-red");
            recent.classList.add("text-white");
        }
        else {
            recent.classList.remove("bg-red");
            recent.classList.remove("text-white");
        }
    });

    if (page === 1) {
        prev_btn.disabled = true;
        next_btn.disabled = false;
        prev_btn.classList.add("opacity-45");
        next_btn.classList.remove("opacity-45");

    } else if (page === 2) {
        next_btn.disabled = true;
        prev_btn.disabled = false;
        next_btn.classList.add("opacity-45");
        prev_btn.classList.remove("opacity-45");    
    }

    observePosts();
}

prev_btn.addEventListener("click", () => {
    currentPage--;
    renderPosts(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

next_btn.addEventListener("click", () => {
    currentPage++;
    renderPosts(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderPosts(currentPage);

const archive_section = document.querySelector("#archive_section");
let archiveContent = "";

archives.forEach(archive => {
    archiveContent += `
        <div class="flex justify-between **:text-[0.9rem]">
            <h4>${archive.label}</h4>
            <span>${archive.count}</span>
        </div>
    `
});
archive_section.innerHTML = archiveContent;

if (subscribe_btn) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    subscribe_btn.addEventListener("click", (e) => {
        e.preventDefault();
        const emailValue = email_input.value.trim();

        if (emailRegex.test(emailValue)) {
            subscribe_container.innerHTML = ``;
    
            subscribe_container.innerHTML = `
                <p class="italic text-red-dark">You're in! Talk soon</p>
            `;
        } else {
            alert ("Veuillez saisir un email valide!");
        }
    });
}


const channel_section = document.querySelector("#channel_section");
channel_section.innerHTML = youtubeVideos.map(video => `
    <div class="flex flex-col gap-2 min-w-65 lg:min-w-full snap-center">
        <iframe class="w-full aspect-video rounded-xl shadow-sm" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
        <h3 class="text-[0.75rem] font-bold text-gray-700 leading-tight">${video.title}</h3>
    </div>
`).join('');

initCart();