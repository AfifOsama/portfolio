/**
 * main.js
 * Portfolio – data & UI logic
 *
 * Responsibilities:
 *  - Define portfolio data (projects, tech stack)
 *  - Render dynamic HTML components into designated mount points
 *
 * To add / edit a project or skill: update the DATA section only.
 */

/* ============================================================
   DATA
   ============================================================ */

/** @type {{ name: string, icon: string }[]} */
const TECH_STACK = [
    { name: "React Native", icon: "smartphone" },
    { name: "Flutter",      icon: "devices" },
    { name: "Next JS",      icon: "language" },
    { name: "TypeScript",   icon: "code_blocks" },
    { name: "React JS",     icon: "data_object" },
    { name: "Tailwind CSS", icon: "css" },
];

/**
 * @typedef  {Object} Project
 * @property {string}   title       - Display name
 * @property {string}   description - Short description shown on the card
 * @property {string}   image       - Image src URL
 * @property {string}   imageAlt    - Alt text for the image
 * @property {string[]} tags        - Technology tags
 * @property {string}   glowColor   - CSS rgba() string for the card glow accent
 * @property {string}   link        - Project URL (use "#" if not public)
 */

/** @type {Project[]} */
const PROJECTS = [
    {
        title: "90 Sports Agency",
        description:
            "Comprehensive management platform for athletes and scouts. Features player marketing, content creation, and performance analysis.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAqSyfUbiQOwHZSaWxfqKvsy-gpS79XKSco_KP7zyF7OvhwSl2ct-O85q_e_OUeJLUAy-InT7_4onepxK9rLJ_52LKxxxa3q18RJTa9UK3-uICj-1AQvf74t5eAQx6bG7h_fNRr-9g02iF_KyNA84ZdocS-vl5jjsiZ3x-csRByMQD0viowbvJKfWhiEm2Hi39erwBzGGU5BXrD5iYeiTdzKS0JhyM-Dmo-hIqdbNhSRx1YZViT6zZfcybyjsm9uyXWootcKfES9sHt",
        imageAlt: "90 Sports Agency",
        tags: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS"],
        glowColor: "rgba(251, 191, 36, 0.15)",
        borderColor: "rgba(251, 191, 36, 0.3)",
        link: "https://90sportsagency.com/",
    },
    {
        title: "Kolaboravis",
        description:
            "Creative collaboration platform connecting designers and developers. Facilitates project management, asset sharing, and communication.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCGoR8g4tNficfMQhiMVGQuLawPvNO6Zzm04Z95E19PYhQPBg2CqZXEl91QFVpWXZY7zpWB5MqF6Bdbo7wGq1z4zET97FdGu1o7O4Sz-aom7RoVODxUJQUxJdoCNvidVWaYNPi-Sa3kxaVZ4Ca9-pel29Aho3IsbIbxCl_8qWx8j76tUIAMmw2ww_k3Rs8ZWHmV9rvXvbLhrXa-DLxcVR9SfrQV3vCtK_BKP7X3WHt00OTjew5yiQlvp7YaJ-Ywbtf98YzwlMtI5SyE",
        imageAlt: "Kolaboravis",
        tags: ["React", "Express", "MongoDB", "GraphQL", "Socket.io"],
        glowColor: "rgba(59, 130, 246, 0.15)",
        borderColor: "rgba(59, 130, 246, 0.3)",
        link: "https://www.kolaboravis.id/",
    },
    {
        title: "Halalins",
        description:
            "Multi-platform insurance and agency management system. Streamlining processes for agents, customers, and admins across web and mobile.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCbBoh_pr3w1AU9lrK3zIaR-MSOTZ88rbH3Oqz84wRpu9EAdg5uarufSFbUr3BnUSUeFDlAHWUbC8w8Ikh25-cAnFJvp5Cf6-wmUyQjm2bQMHEtmNnkgAmqo7_fhTHNj7GXbF1UqeisrBLokakoaS1OobnPRubKEl-XXuCz3HI6fswdtRFbfsWRcKGUeMN-B_0ex_ru9a3qfdmJ3hLgo19MInOhWGELyqoGPtA7eH0nvB7A5x-dhG1icV5qrmBJpuL5XJcIKup0QvO_",
        imageAlt: "Halalins Dashboard",
        tags: ["React", "Node.js", "PostgreSQL", "Flutter", "AWS"],
        glowColor: "rgba(34, 197, 94, 0.15)",
        borderColor: "rgba(34, 197, 94, 0.3)",
        link: "#",
    },
    
];

/* ============================================================
   RENDERERS
   ============================================================ */

/**
 * Build a single tech-stack badge element.
 * @param {{ name: string, icon: string }} item
 * @returns {HTMLElement}
 */
function createTechBadge({ name, icon }) {
    const el = document.createElement("div");
    el.className =
        "bg-surface-container p-4 rounded-lg border border-outline-variant/50 " +
        "flex flex-col items-start gap-2 hover:bg-surface-bright transition-colors";
    el.innerHTML = `
        <span class="material-symbols-outlined text-primary">${icon}</span>
        <span class="font-label-mono text-label-mono text-on-surface">${name}</span>
    `;
    return el;
}

/**
 * Build a single technology tag badge.
 * @param {string} tag
 * @returns {HTMLElement}
 */
function createTagBadge(tag) {
    const span = document.createElement("span");
    span.className =
        "font-label-mono text-label-mono bg-surface-container-high " +
        "border border-outline-variant text-on-surface px-2 py-1 rounded";
    span.textContent = tag;
    return span;
}

/**
 * Build a full project card element.
 * @param {Project} project
 * @returns {HTMLElement}
 */
function createProjectCard(project) {
    const article = document.createElement("article");
    article.className =
        "bg-surface border border-outline-variant rounded-lg overflow-hidden " +
        "group transition-all duration-300 flex flex-col";
    article.style.boxShadow = `${project.glowColor} 0px 0px 30px`;
    article.style.borderColor = project.borderColor;

    // Tags HTML
    const tagsHTML = project.tags
        .map(
            (tag) =>
                `<span class="font-label-mono text-label-mono bg-surface-container-high border border-outline-variant text-on-surface px-2 py-1 rounded">${tag}</span>`
        )
        .join("");

    article.innerHTML = `
        <div class="h-56 bg-surface-container relative overflow-hidden">
            <img
                src="${project.image}"
                alt="${project.imageAlt}"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span class="text-primary font-body-md font-bold px-4 py-2 border border-primary rounded bg-surface/80 backdrop-blur-sm cursor-pointer">
                        View Project
                    </span>
                </div>
            </a>
        </div>
        <div class="p-6 flex-grow flex flex-col">
            <h3 class="text-headline-sm font-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors">
                ${project.title}
            </h3>
            <p class="text-body-md font-body-md text-on-surface-variant mb-6 flex-grow">
                ${project.description}
            </p>
            <div class="flex flex-wrap gap-2 mt-auto">
                ${tagsHTML}
            </div>
        </div>
    `;

    return article;
}

/* ============================================================
   MOUNT – run after DOM is ready
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    // -- Tech Stack grid --
    const techGrid = document.getElementById("tech-stack-grid");
    if (techGrid) {
        TECH_STACK.forEach((item) => techGrid.appendChild(createTechBadge(item)));
    }

    // -- Projects grid --
    const projectsGrid = document.getElementById("projects-grid");
    if (projectsGrid) {
        PROJECTS.forEach((project) => projectsGrid.appendChild(createProjectCard(project)));
    }
});
