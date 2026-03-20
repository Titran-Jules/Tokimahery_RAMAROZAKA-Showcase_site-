import { initCart } from "./panier.js";

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

let currentPage = 1;
const pageSize = 5;

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
        <div class="flex gap-8 p-6 rounded-xl mb-6 shadow-xl">
            <div class="shrink-0">
                <img src="${post.thumbnail}" alt="thumbnail" 
                     class="w-48 h-48 object-cover rounded-2xl" />
            </div>

            <div class="flex flex-col justify-start relative">
                <h3 class="text-red text-2xl font-semibold mb-1">
                    ${post.title}
                </h3>
                <span class="text-gray-500 text-sm mb-3">
                    ${formattedDate}
                </span>
                <p class="text-gray-600 leading-snug">
                    ${post.description}
                </p>

                <div class="flex gap-2 absolute bottom-0">
                    ${post.tags.map(tag => `
                        <span class="px-4 py-1 bg-blue-400 text-white text-xs rounded-full font-medium">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
        `;    
    });
    posts_section.innerHTML = postContent;

    prev_btn.disabled = (page == 1);
    next_btn.disabled = (end >= posts.length);

    recent_post.forEach(recent => {
        if (Number(recent.textContent) == page) {
            recent.classList.add("bg-red");
            recent.classList.add("text-white")
        }
        else {
            recent.classList.remove("bg-red");
            recent.classList.remove("text-white");
        }
    });
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

const channel_section = document.querySelector("#channel_section");
let channelContent = "";

youtubeVideos.forEach(video => {
    const videoURL = `https://youtube.com${video.id}`;
    channelContent += `
        <div class="flex flex-col gap-2">
            <iframe class="w-full h-54 rounded-xl aspect-video" src="${videoURL}" frameborder="0" allowfullscreen></iframe>
            <h3 class="text-[0.8rem]">${video.title}</h3>
        </div>
    `
});

channel_section.innerHTML = channelContent;

initCart();