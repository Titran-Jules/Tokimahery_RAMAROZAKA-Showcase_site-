/* Home page */
const aboutMe_part1 = `I am a PhD researcher studying complex systems through agent-based modeling and simulation. However, teaching, is my Ikigai, it is driven by a deep commitment to helping students grow beyond what they thought possible.`;
const aboutMe_part2 = `It is not an accessory to my work — it is its foundation and its energy. Research sharpens my thinking; the classroom gives it meaning. And as a developer, I turn ideas into clean, reliable software built to last.`;
const overview = [
    { number: new Date().getFullYear() - 2017, label: 'Years experience' },
    { number: '800+', label: 'Students taught' },
    { number: '20+', label: 'Topics' }
  ];
  const experiences = [
    { year: '2026 – Present', role: 'Consultant', org: 'Independent', desc: 'Advising, teaching, on a much more singular level for all societies, and developing scalable solutions' },
    { year: '2021 – 2026', role: 'Study Coordinator | Back-end developer', org: "HEI Madagascar (Haute École d'Informatique), Antananarivo", desc: 'Responsible of studies, permanent teacher for 5 different topics, as well as some back-end development on the school management app' },
    { year: '2024', role: 'PhD in Computer Science', org: 'Université de Fianarantsoa', desc: 'A self-founded PhD on modeling complex systems, between the university of Fianarantsoa, and CIRAD, Montpellier, titled: Accounting for norms in agent-based modeling' },
    { year: '2017 – 2020', role: 'Teacher', org: "ESMIA (École Supérieure de Management et d'Informatique appliquée), Antananarivo", desc: 'Taught over 14 different topics from first years to Master degree. Mentoring students from small projects to technical ones' }
  ];

const aboutMe1 = document.getElementById('aboutMe1');
aboutMe1.textContent = aboutMe_part1;

const aboutMe2 = document.getElementById('aboutMe2');
aboutMe2.textContent = aboutMe_part2;


/* Fin home page */

/* All courses */
const courses = [
    { id: 1, title: 'Javascript for beginners', description: 'Javascript made easy as your first language. This video walks you through the basic mechanism of algorithms, loops, conditions, functions, JS modules, unit tests, and modern syntax perfect for starters', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 120000, level: 'beginner', language: 'en', technologies: ['javascript'] },
    { id: 2, title: 'Java for beginners', description: 'A simple course for true beginners in Java. Learn OOP fundamentals: classes, objects, encapsulation, inheritance, polymorphism, abstraction to understand the basics of Java.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 220000, level: 'beginner', language: 'en', technologies: ['java'] },
    { id: 3, title: 'Relational Databases for beginners', description: 'Understand how relational databases really work. This course introduces tables, primary keys, foreign keys, constraints, normalization, ER diagrams, and SQL basics.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 180000, level: 'beginner', language: 'fr', technologies: ['sql'] },
    { id: 4, title: 'Git & Version Control Essentials', description: 'Master Git from scratch. Learn repositories, commits, branches, merging, rebasing, resolving conflicts, and collaborating with remote repositories like GitHub.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 95000, level: 'beginner', language: 'en', technologies: [] },
    { id: 5, title: 'Operating Systems Fundamentals', description: 'Discover how operating systems manage processes, memory, files, threads, and scheduling. Understand the difference between user space and kernel space, concurrency basics.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 200000, level: 'beginner', language: 'fr', technologies: [] },
    { id: 6, title: 'Technical English for Developers', description: 'Improve your English for the tech world. Learn essential vocabulary for programming, documentation, meetings, presentations, and job interviews.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 85000, level: 'beginner', language: 'mg', technologies: [] },
    { id: 7, title: 'Professional French Communication', description: 'Strengthen your French for academic and professional environments. Focus on formal writing, presentations, technical explanations, and clear structured arguments.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 80000, level: 'beginner', language: 'mg', technologies: [] },
    { id: 8, title: 'SEO Fundamentals for Web Developers', description: 'Learn how search engines work and how to optimize websites for visibility. Cover keywords, technical SEO, performance optimization, metadata, and structured data.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 150000, level: 'intermediate', language: 'en', technologies: ['javascript'] },
    { id: 9, title: 'Spring Boot for Backend Development', description: 'Build modern REST APIs with Spring Boot. Learn dependency injection, controllers, services, JPA, security basics, validation, and scalable backend architecture.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 250000, level: 'advanced', language: 'fr', technologies: ['java'] },
];

const levelColor = {
    beginner: "bg-[#00C851]",
    intermediate: "bg-[#F1B101]",
    advanced: "bg-[#F92A37]"
}

let currentFilters = {
    languageMG: true,
    languageFR: true,
    languageEN: true,
    technology: "all technologies",
    level: "all levels",
    priceMIN: 0,
    priceMAX: 300000 
}

function filterCourses(data) {
    return data.filter(item => {
        const isAnyLanguageSelected = currentFilters.languageMG || currentFilters.languageFR || currentFilters.languageEN;
        const languageMatch =   !isAnyLanguageSelected || 
                                (currentFilters.languageMG && item.language === 'mg') ||
                                (currentFilters.languageFR && item.language === 'fr') ||
                                (currentFilters.languageEN && item.language === 'en');

        const technologyMatch = currentFilters.technology === "all technologies" || item.technologies.includes(currentFilters.technology);
        const levelMatch = currentFilters.level === "all levels" || item.level === currentFilters.level;
        const priceMatch = item.price >= currentFilters.priceMIN && item.price <= currentFilters.priceMAX;

        return languageMatch && technologyMatch && levelMatch && priceMatch;

    });
}

document.querySelector("#mg").addEventListener("click", (e) => {
    currentFilters.languageMG = !currentFilters.languageMG;
    e.target.classList.toggle("brightness-50");
    e.target.classList.toggle("opacity-50");
    updateCourses();
});
    
document.querySelector("#fr").addEventListener("click", (e) => {
    currentFilters.languageFR = !currentFilters.languageFR;
    e.target.classList.toggle("brightness-50");
    e.target.classList.toggle("opacity-50");
    updateCourses();
});

document.querySelector("#en").addEventListener("click", (e) => {
    currentFilters.languageEN = !currentFilters.languageEN;
    e.target.classList.toggle("brightness-50");
    e.target.classList.toggle("opacity-50");
    updateCourses();
});

document.querySelector("#technology").addEventListener("change", (e) => {
    currentFilters.technology = e.target.value;
    updateCourses();
})

document.querySelector("#level").addEventListener("change", (e) => {
    currentFilters.level = e.target.value;
    updateCourses();
});

document.querySelector("#priceMin").addEventListener("input", (e) => {
    currentFilters.priceMIN = parseInt(e.target.value);
    document.querySelector("#priceMinLabel").textContent = Number(e.target.value).toLocaleString('en-us');
    updateCourses();
});

document.querySelector("#priceMax").addEventListener("input", (e) => {
    currentFilters.priceMAX = parseInt(e.target.value);
    document.querySelector("#priceMaxLabel").textContent = Number(e.target.value).toLocaleString('en-us');
    updateCourses();
});

function updateCourses() {
    const filteredCourses = filterCourses(courses);
    const courses_section = document.querySelector("#courses_section");
    courses_section.innerHTML = "";

    filteredCourses.forEach(course => {
    courses_section.innerHTML += `
        <main class="shadow-3xl pb-3 flex flex-col gap-2">
            <div class="relative">
                <img src="${course.thumbnail}" alt="Thumbnail" class="rounded-t-2xl" />
                <div class="absolute top-0 left-0 flex gap-2 mt-2 ml-2">
                    <span class="text-[0.8rem] text-black bg-white py-1 px-4 rounded-2xl">${course.language.toUpperCase()}</span>
                    <span class="text-[0.8rem] text-white ${course.technologies.length != 0 ? "bg-black" : ""} py-1 px-3 rounded-2xl">${course.technologies.length > 0 ? course.technologies[0] : ""}</span>
                </div>
                <span class="absolute text-white bottom-0 right-0 py-1 px-3 ${levelColor[course.level]}">${course.level}</span>
            </div>
            <h3 class="text-4xl text-red truncate mt-3">${course.title}</h3>
            <h4 class="text-xl font-medium">MGA ${course.price.toLocaleString('en-us')}</h4>
            <p class="line-clamp-3 my-3">${course.description}</p>
            <div class="flex gap-4 justify-end mt-3">
                <button class="px-6 py-4 text-red bg-bg-white rounded-xl shadow-xl">Learn More</button>
                <button class="px-6 py-4 text-white bg-red rounded-xl shadow-xl">Add to cart</button>
            </div>
        </main>
    `;
});
}
updateCourses();
/* Fin all courses */
