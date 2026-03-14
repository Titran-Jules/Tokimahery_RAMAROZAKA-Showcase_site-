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