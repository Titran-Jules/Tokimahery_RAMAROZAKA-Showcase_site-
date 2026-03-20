import { initCart } from "./panier";

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
    priceMAX: 300000,
    search: "" 
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

        const searchInput = currentFilters.search.trim().toLowerCase();
        const searchMatch = searchInput === "" || item.title.toLowerCase().includes(searchInput) || item.description.toLowerCase().includes(searchInput);

        return languageMatch && technologyMatch && levelMatch && priceMatch && searchMatch;

    });
}

const mg = document.querySelector("#mg");
mg.addEventListener("click", (e) => {
    currentFilters.languageMG = !currentFilters.languageMG;
    e.target.classList.toggle("brightness-50");
    e.target.classList.toggle("opacity-50");
    updateCourses();
});
    
const fr = document.querySelector("#fr");
fr.addEventListener("click", (e) => {
    currentFilters.languageFR = !currentFilters.languageFR;
    e.target.classList.toggle("brightness-50");
    e.target.classList.toggle("opacity-50");
    updateCourses();
});

const en = document.querySelector("#en");
en.addEventListener("click", (e) => {
    currentFilters.languageEN = !currentFilters.languageEN;
    e.target.classList.toggle("brightness-50");
    e.target.classList.toggle("opacity-50");
    updateCourses();
});

const technology = document.querySelector("#technology");
technology.addEventListener("change", (e) => {
    currentFilters.technology = e.target.value;
    updateCourses();
})

const level = document.querySelector("#level");
level.addEventListener("change", (e) => {
    currentFilters.level = e.target.value;
    updateCourses();
});

const priceMin = document.querySelector("#priceMin");
priceMin.addEventListener("input", (e) => {
    currentFilters.priceMIN = parseInt(e.target.value);
    document.querySelector("#priceMinLabel").textContent = Number(e.target.value).toLocaleString('en-us');
    updateCourses();
});

const priceMax = document.querySelector("#priceMax");
priceMax.addEventListener("input", (e) => {
    currentFilters.priceMAX = parseInt(e.target.value);
    document.querySelector("#priceMaxLabel").textContent = Number(e.target.value).toLocaleString('en-us');
    updateCourses();
});

const search_input = document.querySelector("#search_input");
search_input.addEventListener("input", (e) => {
    currentFilters.search = e.target.value;
    updateCourses();
});

const course_found = document.querySelector("#course_found");
const courses_section = document.querySelector("#courses_section");

function updateCourses() {
    const filteredCourses = filterCourses(courses);

    const count_course = filteredCourses.length;

    course_found.textContent = `${count_course} ${count_course <= 1 ? "COURSE" : "COURSES"} FOUND`;

    courses_section.innerHTML = "";

    if (count_course === 0) {
        courses_section.innerHTML = `
            <div class="flex flex-col col-span-4 justify-self-center self-center m-auto mt-20 mb-20 gap-6">
                <h2 class="font-Playfair italic text-xl text-gray-500">No courses match your filters.</h2>
                <button onclick="clearFilter()" class="text-red underline text-[0.9rem] cursor-pointer">CLEAR FILTER</button>
            </div>
        `;
    }
    else {
        let coursesContent = "";
        filteredCourses.forEach(course => {
        coursesContent += `
            <main class="shadow-2xs pb-4 flex flex-col gap-2">
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
                    <button data-course-id="${course.id}" class="add-to-cart-btn px-6 py-4 text-white bg-red rounded-xl shadow-xl">Add to cart</button>
                </div>
            </main>
        `;
        });
    
        courses_section.innerHTML = coursesContent;
        
        const addButtons = document.querySelector(".add-to-cart-btn");

        addButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const courseId = Number(event.currentTarget.dataset.courseId);

                if (cartState.items[courseId]) {
                    alert("This course is already in your cart!");
                    return;
                }

                const courseToAdd = courses.find(c => c.id === courseId);
                if (courseToAdd) {
                    addToCart(courseToAdd);
                }
            });
        });
    }
}
function clearFilter () {
    if(mg.classList.contains("brightness-50") && mg.classList.contains("opacity-50")) {
        mg.classList.remove("brightness-50");
        mg.classList.remove("opacity-50");
    }
    if(fr.classList.contains("brightness-50") && fr.classList.contains("opacity-50")) {
        fr.classList.remove("brightness-50");
        fr.classList.remove("opacity-50");
    }
    if(en.classList.contains("brightness-50") && en.classList.contains("opacity-50")) {
        en.classList.remove("brightness-50");
        en.classList.remove("opacity-50");
    }
    technology.value = "all technologies";
    level.value = "all levels";
    priceMin.value = 0;
    document.querySelector("#priceMinLabel").textContent = "0";
    document.querySelector("#priceMaxLabel").textContent = "300,000";
    priceMax.value = 300000;
    search_input.value = "";

    currentFilters = {
        languageMG: true,
        languageFR: true,
        languageEN: true,
        technology: "all technologies",
        level: "all levels",
        priceMIN: 0,
        priceMAX: 300000,
        search: "" 
    };
    updateCourses();
}
const clear_filter = document.querySelectorAll(".clear");

clear_filter.forEach((button) => {
    button.addEventListener("click", () => {
        clearFilter();
        updateCourses();
    });
});
updateCourses();
initCart();