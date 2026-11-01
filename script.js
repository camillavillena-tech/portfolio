
/* =========================================
   CAMILLA VILLENA PORTFOLIO
   Updated JavaScript
========================================= */

/* PROJECT DATA */

const PROJECTS = [
  {
    title: "CTRL + Brew",
    category: "Website Design",
    description: "Multi-page website concept for a gaming internet café and coffee shop, featuring a homepage, spaces, and a full drinks and gaming menu.",
    images: [
      "assets/ctrl-home.png",
      "assets/ctrl-features.png",
      "assets/ctrl-menu.png"
    ]
  },
  {
    title: "ADF2027 — A Day with Foxes",
    category: "Campaign & Print",
    description: "A coordinated event design collection featuring a two-sided brochure, promotional poster, and event infographic.",
    images: [
      "assets/adf-poster.png",
      "assets/brochure-front.png",
      "assets/brochure-back.png",
      "assets/infographic.png"
    ]
  },
  {
    title: "iRescue",
    category: "Web & UI/UX",
    description: "Emergency response system interface featuring login, dashboard, incident reporting, safety locator, and hotline directory.",
    images: ["assets/irescue.png"]
  },
  {
    title: "TableTap",
    category: "UI/UX Design",
    description: "Mobile ordering experience with QR scanning, food selection, checkout, order tracking, and staff-side order management.",
    images: ["assets/tabletap.png"]
  },
  {
    title: "ADF2027 Event Website",
    category: "CMS / Wix",
    description: "Event website built using Wix, featuring event information, featured organizations, and highlights.",
    images: ["assets/adf-wix.png"]
  },
  {
    title: "Baker Academy",
    category: "Website Design",
    description: "Pink-themed baking academy website concept with class schedule, sign-up form, portfolio, and contact page.",
    images: ["assets/baker.png"]
  },
  {
    title: "University Student Dashboard",
    category: "Dashboard UI",
    description: "Student portal dashboard interface with schedule, student details, calendar, and notifications.",
    images: ["assets/hau.png"]
  },
  {
    title: "Project Bukas",
    category: "Poster Design",
    description: "Education-themed promotional graphic with a strong headline and blue-and-yellow visual identity.",
    images: ["assets/bukas.png"]
  },
  {
    title: "Skincare Campaign",
    category: "Digital Advertising",
    description: "Skincare promotional layout with editorial typography, product presentation, benefit highlights, and call to action.",
    images: ["assets/skincare.png"]
  },
  {
    title: "Brew Haven — Iced Coffee Advertisement",
    category: "Digital Advertising",
    description: "A promotional iced caramel latte advertisement featuring a coffee-focused composition, bold typography, and a 30% off offer.",
    images: ["assets/coffee-ads.png"]
  },
  {
    title: "CV Personal Branding",
    category: "Brand Identity",
    description: "Personal CV monogram and coordinating two-sided navy, gold, and white business card.",
    images: [
      "assets/business-card-1.png",
      "assets/business-card-2.png"
    ]
  },
  {
    title: "Game On! — Linear Algebra in Gaming",
    category: "Infographic Design",
    description: "An educational infographic connecting linear algebra with video-game transformations, movement, collision detection, color coding, and 3D modeling.",
    images: ["assets/game-on-infographic.png"]
  }
];


/* =========================================
   PROJECT GALLERY
========================================= */

const grid = document.querySelector("#projectGrid");
const total = document.querySelector("#projectTotal");
const dialog = document.querySelector("#projectDialog");
const dialogBody = document.querySelector("#dialogBody");

let focusBefore = null;

const matches = {
  all: () => true,
  web: p => /website|cms|dashboard|web & ui/i.test(p.category),
  ui: p => /ui|dashboard/i.test(p.category),
  graphic: p => /print|poster|advertising|campaign|infographic|brand/i.test(p.category),
  infographic: p => /infographic/i.test(p.category) || p.title.startsWith("ADF2027 —"),
  brand: p => /brand/i.test(p.category)
};

function node(tag, className = "", text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function showProject(project) {
  focusBefore = document.activeElement;
  dialogBody.replaceChildren();

  const label = node(
    "p",
    "section-label",
    project.category.toUpperCase()
  );

  const title = node("h2", "", project.title);
  title.id = "dialogTitle";

  const description = node("p", "", project.description);
  const gallery = node("div", "gallery");

  project.images.forEach((src, index) => {
    const figure = node("figure");
    const image = document.createElement("img");

    image.src = src;
    image.alt = project.title + " — image " + (index + 1);
    image.loading = "lazy";

    const caption = node(
      "figcaption",
      "",
      `Original work · Image ${index + 1} of ${project.images.length}`
    );

    figure.append(image, caption);
    gallery.append(figure);
  });

  dialogBody.append(label, title, description, gallery);

  if (project.title === "CV Personal Branding") {
    const pdf = node(
      "a",
      "pdf-link",
      "View original business card PDF ↗"
    );

    pdf.href = "assets/original-business-card.pdf";
    pdf.target = "_blank";
    pdf.rel = "noopener noreferrer";

    dialogBody.append(pdf);
  }

  dialog.showModal();
}

function render(filter = "all") {
  grid.replaceChildren();

  const visible = PROJECTS.filter(matches[filter]);

  visible.forEach((project, index) => {
    const card = node("article", "project");

    card.style.setProperty(
      "--card-delay",
      `${Math.min(index % 4, 3) * 90}ms`
    );

    const button = node("button", "project-button");
    button.type = "button";
    button.setAttribute(
      "aria-label",
      "View " + project.title + " project details"
    );

    const thumbnail = node("div", "project-thumb");

    const image = document.createElement("img");
    image.src = project.images[0];
    image.alt = "Preview of " + project.title;
    image.loading = index < 2 ? "eager" : "lazy";

    const arrow = node("span", "project-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");

    thumbnail.append(image, arrow);

    const meta = node("div", "project-meta");
    const info = node("div");

    info.append(
      node("h3", "", project.title),
      node(
        "p",
        "",
        project.category +
        " · " +
        project.images.length +
        " image" +
        (project.images.length === 1 ? "" : "s")
      )
    );

    meta.append(
      info,
      node(
        "span",
        "project-number",
        String(index + 1).padStart(2, "0")
      )
    );

    button.append(thumbnail, meta);

    button.addEventListener("click", () => {
      showProject(project);
    });

    card.append(button);
    grid.append(card);

    requestAnimationFrame(() => {
      card.classList.add("project-ready");
    });
  });

  total.textContent =
    `Showing ${visible.length} of ${PROJECTS.length} projects`;
}

/* PROJECT FILTERS */

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    render(button.dataset.filter);
  });
});

/* PROJECT POPUP */

document.querySelector("#closeDialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

dialog.addEventListener("close", () => {
  focusBefore?.focus();
});


/* =========================================
   MOBILE NAVIGATION
========================================= */

const toggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");

function closeMenu() {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", event => {
  if (!nav.contains(event.target) && !toggle.contains(event.target)) {
    closeMenu();
  }
});


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const observer = ("IntersectionObserver" in window)
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    })
  : null;

document.querySelectorAll(".reveal").forEach(element => {
  if (observer) {
    observer.observe(element);
  } else {
    element.classList.add("is-visible");
  }
});

/* FOOTER YEAR */

document.querySelector("#year").textContent =
  new Date().getFullYear();

/* DISPLAY PROJECTS */

render();


/* =========================================
   CONTACT BUTTONS
========================================= */

const email = "camillavillena@gmail.com";

const emailOptionsButton =
  document.querySelector("#emailOptionsButton");

const emailOptions =
  document.querySelector("#emailOptions");

const emailFeedback =
  document.querySelector("#emailFeedback");

const toast =
  document.querySelector("#toast");

let toastTimeout;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

emailOptionsButton.addEventListener("click", () => {
  const open = emailOptions.hidden;

  emailOptions.hidden = !open;

  emailOptionsButton.setAttribute(
    "aria-expanded",
    String(open)
  );

  if (open) {
    emailOptions.querySelector("a").focus();
  }
});

async function copyEmail() {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const field = document.createElement("textarea");

      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";

      document.body.append(field);
      field.select();

      const copied = document.execCommand("copy");
      field.remove();

      if (!copied) {
        throw new Error("Copy unsupported");
      }
    }

    emailFeedback.textContent = "Email copied!";
    notify("Email address copied to clipboard");

  } catch (error) {
    emailFeedback.textContent =
      "Select and copy: " + email;

    notify("Please copy the email address shown below");
  }
}

document.querySelector("#copyEmail")
  .addEventListener("click", copyEmail);

document.querySelector("#copyEmailSmall")
  .addEventListener("click", copyEmail);


/* =========================================
   PORTRAIT HOVER ANIMATION
========================================= */

const heroVisual = document.querySelector(".hero-visual");

if (
  window.matchMedia(
    "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)"
  ).matches
) {
  heroVisual.addEventListener("pointermove", event => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroVisual.style.setProperty(
      "--pointer-x",
      `${(x * 12).toFixed(2)}px`
    );

    heroVisual.style.setProperty(
      "--pointer-y",
      `${(y * 10).toFixed(2)}px`
    );
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--pointer-x", "0px");
    heroVisual.style.setProperty("--pointer-y", "0px");
  });
}


/* =========================================
   ACTIVE NAVIGATION ON SCROLL
========================================= */

const navLinks = [
  ...document.querySelectorAll('.main-nav a[href^="#"]')
];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "current",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, {
    rootMargin: "-30% 0px -60% 0px"
  });

  document.querySelectorAll("main section[id]").forEach(section => {
    sectionObserver.observe(section);
  });
}


/* =========================================
   SCROLL PROGRESS BAR
========================================= */

const scrollProgress =
  document.querySelector("#scrollProgress");

let scrollPending = false;

function updateScrollProgress() {
  const max =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = max > 0
    ? Math.min(100, Math.max(0, window.scrollY / max * 100))
    : 0;

  scrollProgress.style.width = progress + "%";
  scrollPending = false;
}

window.addEventListener("scroll", () => {
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(updateScrollProgress);
  }
}, {
  passive: true
});

window.addEventListener(
  "resize",
  updateScrollProgress,
  { passive: true }
);

updateScrollProgress();


/* =========================================
   CERTIFICATES DATA
========================================= */

const CERTIFICATES = [
  {
    title: "Python Development and Programming Fundamentals",
    issuer: "Udemy",
    year: "2024",
    category: "Programming",
    image: "assets/certificates/python-development.webp",
    original: "assets/certificates/python-development.webp"
  },
  {
    title: "Introduction to Graphic Design: Basics of UI/UX",
    issuer: "Simplilearn SkillUp",
    year: "2026",
    category: "Design",
    image: "assets/certificates/graphic-design-uiux.webp",
    original: "assets/certificates/graphic-design-uiux.webp"
  },
  {
    title: "Website UI/UX Designing using ChatGPT",
    issuer: "Simplilearn SkillUp",
    year: "2026",
    category: "Design",
    image: "assets/certificates/website-uiux-chatgpt.webp",
    original: "assets/certificates/website-uiux-chatgpt.webp"
  },
  {
    title: "Content Marketing",
    issuer: "HubSpot Academy",
    year: "2026",
    category: "Marketing",
    image: "assets/certificates/content-marketing.png",
    original: "assets/certificates/content-marketing.png"
  },
  {
    title: "Digital Advertising",
    issuer: "HubSpot Academy",
    year: "2026",
    category: "Marketing",
    image: "assets/certificates/digital-advertising.png",
    original: "assets/certificates/digital-advertising.png"
  },
  {
    title: "Legacy Responsive Web Design V8",
    issuer: "freeCodeCamp",
    year: "2025",
    category: "Development",
    image: "assets/certificates/responsive-web-design.png",
    original: "assets/certificates/responsive-web-design.png"
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    year: "2025",
    category: "Development",
    image: "assets/certificates/javascript-essentials.webp",
    original: "assets/certificates/javascript-essentials.pdf"
  },
  {
    title: "Cyber Threat Management",
    issuer: "Cisco Networking Academy",
    year: "2026",
    category: "Networking",
    image: "assets/certificates/cyber-threat-management.webp",
    original: "assets/certificates/cyber-threat-management.pdf"
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    year: "2026",
    category: "Networking",
    image: "assets/certificates/ccna-introduction-networks.webp",
    original: "assets/certificates/ccna-introduction-networks.pdf"
  }
];


/* =========================================
   CERTIFICATE GALLERY
========================================= */

const certGrid = document.querySelector("#certGrid");
const certCount = document.querySelector("#certCount");
const certDialog = document.querySelector("#certDialog");

let certPreviousFocus = null;

function renderCertificates(category = "All") {
  certGrid.replaceChildren();

  const shown = CERTIFICATES.filter(certificate =>
    category === "All" || certificate.category === category
  );

  shown.forEach(certificate => {
    const card = node("article", "cert-card reveal");
    const button = node("button", "cert-card-button");

    button.type = "button";

    button.setAttribute(
      "aria-label",
      "View " + certificate.title + " certificate"
    );

    const frame = node("div", "cert-image-wrap");

    const image = document.createElement("img");
    image.src = certificate.image;
    image.alt =
      certificate.title + " certificate issued by " + certificate.issuer;
    image.loading = "lazy";

    frame.append(
      image,
      node("span", "cert-view", "View certificate ↗")
    );

    const details = node("div", "cert-info");

    details.append(
      node(
        "span",
        "cert-issuer",
        certificate.issuer + " · " + certificate.year
      ),
      node("h3", "", certificate.title),
      node("span", "cert-category", certificate.category)
    );

    button.append(frame, details);

    button.addEventListener("click", () => {
      certPreviousFocus = document.activeElement;

      document.querySelector("#certDialogIssuer").textContent =
        certificate.issuer + " · " + certificate.year;

      document.querySelector("#certDialogTitle").textContent =
        certificate.title;

      document.querySelector("#certDialogImage").src =
        certificate.image;

      document.querySelector("#certDialogImage").alt =
        certificate.title + " certificate";

      document.querySelector("#certOpenOriginal").href =
        certificate.original;

      certDialog.showModal();
    });

    card.append(button);
    certGrid.append(card);

    if (observer) {
      observer.observe(card);
    } else {
      card.classList.add("is-visible");
    }
  });

  certCount.textContent =
    shown.length +
    " certificate" +
    (shown.length === 1 ? "" : "s") +
    " displayed";
}


/* CERTIFICATE FILTERS */

document.querySelectorAll("[data-cert-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-cert-filter]").forEach(item => {
      const active = item === button;

      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    renderCertificates(button.dataset.certFilter);
  });
});


/* CERTIFICATE POPUP */

document.querySelector("#closeCertDialog")
  .addEventListener("click", () => {
    certDialog.close();
  });

certDialog.addEventListener("click", event => {
  if (event.target === certDialog) {
    certDialog.close();
  }
});

certDialog.addEventListener("close", () => {
  certPreviousFocus?.focus();
});

/* DISPLAY ALL CERTIFICATES */

renderCertificates();
