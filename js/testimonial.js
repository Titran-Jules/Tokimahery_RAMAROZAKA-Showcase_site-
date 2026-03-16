const testimonials = [
    { id: 1, role: 'student', rating: 5, description: 'A precious aid, a light shining upon every step of my journey', author: 'Soa Mariaka, Promotion Mpamakilay, HEI (2021-2024)', thumbnail: 'https://picsum.photos/200' },
    { id: 2, role: 'student', rating: 5, description: 'An inspiring mentor who transforms complex concepts into clear and structured knowledge. The discipline and rigor I learned here shaped the way I approach every technical challenge today.', author: 'Faniry Keziah, Promotion Mpamakilay, HEI (2022-2025)', thumbnail: 'https://picsum.photos/200' },
    { id: 3, role: 'student', rating: 5, description: 'More than courses, it was a mindset shift. Learning how to think structurally about databases and algorithms changed my confidence as a developer.', author: 'Ando Ramanantsoa, Promotion Avotra, HEI (2021-2024)', thumbnail: 'https://picsum.photos/200' },
    { id: 4, role: 'student', rating: 4, description: 'The emphasis on fundamentals — Git, SQL, system design — prepared me for real-world projects. Every assignment felt practical and meaningful.', author: 'Dinasoa Ratsimba, Promotion Avotra, HEI (2022-2025)', thumbnail: 'https://picsum.photos/200' },
    { id: 5, role: 'student', rating: 5, description: 'Demanding but fair. The standards were high, yet the support was constant. I learned discipline, autonomy, and how to truly understand what I build.', author: 'Judicael Randrianjato, Promotion Mpamakilay, HEI (2021-2024)', thumbnail: 'https://picsum.photos/200' },
    { id: 6, role: 'collaborator', rating: 5, description: 'From algorithm storytelling to backend architecture, every lesson connected theory with practice. It pushed me to go beyond just "making it work."', author: 'Mayah Andriatsitohaina, Promotion Avotra, HEI (2023-2026)', thumbnail: 'https://picsum.photos/200' },
    { id: 7, role: 'collaborator', rating: 4, description: 'The way operating systems and databases were taught made abstract concepts concrete. I now approach technical problems with clarity and structure.', author: 'Axel, Promotion Mpamakilay, HEI (2022-2025)', thumbnail: 'https://picsum.photos/200' },
    { id: 8, role: 'collaborator', rating: 5, description: 'Beyond coding, I gained professional communication skills and technical English confidence. That made a real difference during internships.', author: 'Tolojanahary Randrambelo, Promotion Avotra, HEI (2023-2026)', thumbnail: 'https://picsum.photos/200' },
    { id: 9, role: 'collaborator', rating: 5, description: 'The rigor in project reviews and exam preparation pushed me to exceed my limits. It was challenging, but it prepared me for industry expectations.', author: 'Fiantso Harena, Promotion Mpamakilay, HEI (2021-2024)', thumbnail: 'https://picsum.photos/200' },
    { id: 10, role: 'collaborator', rating: 4, description: 'A rare combination of technical depth and pedagogical clarity. Working alongside Tokimahery elevated the quality of everything we built together.', author: 'Ravo Rakotondrabe', thumbnail: 'https://picsum.photos/200' },
    { id: 11, role: 'customer', rating: 5, description: 'The translation work delivered was precise, fast, and culturally nuanced. Exactly what our project needed.', author: 'Hery Andriantsoa', thumbnail: 'https://picsum.photos/200' },
    { id: 12, role: 'customer', rating: 5, description: 'We hired Tokimahery to consult on our backend architecture. The recommendations were pragmatic and immediately actionable.', author: 'Lalaina Rasolofo', thumbnail: 'https://picsum.photos/200' },
    { id: 13, role: 'customer', rating: 4, description: 'Professional, responsive, and thorough. The deliverables exceeded our expectations in both quality and timeliness.', author: 'Miora Randriamihaja', thumbnail: 'https://picsum.photos/200' },
    { id: 14, role: 'customer', rating: 5, description: 'Tokimahery helped us untangle a legacy codebase that had been holding us back for years. Clear roadmap, clean execution.', author: 'Njaka Rakotomalala', thumbnail: 'https://picsum.photos/200' },
    { id: 15, role: 'customer', rating: 5, description: 'From scoping to delivery, the whole process was smooth and transparent. I would not hesitate to work together again.', author: 'Sitraka Andriamanantena', thumbnail: 'https://picsum.photos/200' },
]

const studentsTestimonialSection = document.querySelector("#students_testimonial");
const collaboratorsTestimonialSection = document.querySelector("#collaborators_testimonial");
const customersTestimonialSection = document.querySelector("#customers_testimonial");

let studentsTestimonialContent = "";
let collaboratorsTestimonialContent = "";
let customersTestimonialContent = "";

testimonials.forEach(testimonial => {
    const stars = Array.from({ length: 5 }, (_, i) => 
        `<span class="${i < testimonial.rating ? 'text-red-600' : 'text-gray-300'} text-lg">★</span>`
    ).join('');

    if (testimonial.role == "student") {
        studentsTestimonialContent += `
            <div class="bg-[#FAFAFA] p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-2xl transition-all">
                <div class="flex items-center gap-4">
                    <img src="${testimonial.thumbnail}" alt="${testimonial.author}" class="w-12 h-12 rounded-full object-cover bg-gray-200">
                    <div class="flex flex-col">
                        <h3 class="text-sm font-bold text-gray-900 leading-tight">${testimonial.author}</h3>
                        <span class="text-xs text-gray-400 font-medium">${testimonial.role}</span>
                    </div>
                </div>
    
                <div class="w-8 h-0.5 bg-red-600"></div>
    
                <p class="text-gray-600 text-sm leading-relaxed grow">
                    ${testimonial.description}
                </p>
    
                <div class="flex gap-0.5">
                    ${stars}
                </div>
            </div>
        `;
    }

    if (testimonial.role == "collaborator") {
        collaboratorsTestimonialContent += `
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col gap-6 h-full hover:shadow-2xl transition-all">
                <p class="text-gray-700 italic text-[15px] leading-relaxed grow">
                    "${testimonial.description}"
                </p>

                <div class="w-full h-px bg-gray-100"></div>

                <div class="flex items-center gap-4">
                    <img src="${testimonial.thumbnail}" alt="${testimonial.author}" 
                        class="w-10 h-10 rounded-full grayscale object-cover">
                    <div class="flex flex-col">
                        <h3 class="text-[14px] font-semibold text-gray-900 leading-tight">
                            ${testimonial.author}
                        </h3>
                        <span class="text-[11px] uppercase tracking-wider text-gray-400 font-bold mt-1">
                            ${testimonial.role}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    if (testimonial.role == "customer") {
        customersTestimonialContent += `
            <div class="bg-white p-6 rounded-lg shadow-xl shadow-gray-200/50 flex flex-col gap-4 min-h-55">
                <div class="flex gap-0.5">
                    ${stars}
                </div>

                <p class="text-gray-500 text-[13px] leading-relaxed grow">
                    "${testimonial.description}"
                </p>

            
                <div class="flex items-center gap-3 mt-2">
                    <img src="${testimonial.thumbnail}" alt="${testimonial.author}" 
                        class="w-10 h-10 rounded-full object-cover grayscale">
                    <div class="flex flex-col">
                        <h3 class="text-[14px] font-bold text-gray-900 leading-tight">
                            ${testimonial.author}
                        </h3>
                        <span class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                            ${testimonial.role}
                        </span>
                    </div>
                </div>
            </div>
        `
    }
});

studentsTestimonialSection.innerHTML = studentsTestimonialContent;
collaboratorsTestimonialSection.innerHTML = collaboratorsTestimonialContent;
customersTestimonialSection.innerHTML = customersTestimonialContent;