/* ═══════════════════════════════════════
   DR. ALOK TIWARI — Portfolio Script
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── YEAR ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── NOISE CANVAS ──
  (function initNoise() {
    const canvas = document.getElementById('noiseCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawNoise() {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = 18;
      }
      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(drawNoise);
    }

    resize();
    window.addEventListener('resize', resize);
    drawNoise();
  })();

  // ── HEADER SCROLL ──
  const header = document.getElementById('siteHeader');
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── MOBILE NAV ──
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('is-open');
      menuToggle.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    siteNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── LATEST GITHUB PROJECTS ──
  (function renderLatestGitHubProjects() {
    const projectGrid = document.querySelector('#projects .project-grid');
    if (!projectGrid) return;

    const latestProjects = [
      {
        title: 'ResumeCraft AI Studio',
        icon: '🎯',
        url: 'https://github.com/dr-alok-tiwari/ResumeCraft-AI-Studio',
        description: 'Zero-cost Streamlit resume studio for ATS scoring, JD matching, resume parsing, guided resume building, bullet refinement, and PDF/DOCX/TXT export.',
        stack: ['Streamlit', 'Python', 'ATS Scoring', 'JD Matching']
      },
      {
        title: 'AI Career Readiness Studio',
        icon: '🚀',
        url: 'https://github.com/dr-alok-tiwari/AI-Career-Readiness-Studio',
        description: 'Workshop-ready, no-API career-readiness app for students covering prompts, resumes, role fit, interviews, emails, LinkedIn, data analysis, and responsible AI.',
        stack: ['Streamlit', 'Career Readiness', 'Prompting', 'No API']
      },
      {
        title: 'Course Design Studio',
        icon: '🧩',
        url: 'https://github.com/dr-alok-tiwari/course-design-studio',
        description: 'Offline course-design toolkit for course profiles, CLO-PLO mapping, rubrics, quizzes, exam papers, PPT outlines, study material, caselets, and gamification plans.',
        stack: ['OBE', 'Rubrics', 'Assessment', 'PPT Export']
      },
      {
        title: 'JournalFit Studio',
        icon: '📚',
        url: 'https://github.com/dr-alok-tiwari/journalfit-studio',
        description: 'Responsible journal discovery and manuscript-fit assistant using local metadata, TF-IDF evidence, keyword overlap, area alignment, reports, and verification prompts.',
        stack: ['Research Tools', 'TF-IDF', 'Journal Fit', 'Responsible Use']
      },
      {
        title: 'Machine Learning for Managers Studio',
        icon: '📊',
        url: 'https://github.com/dr-alok-tiwari/Machine-Learning-for-Managers-Studio',
        description: 'Managerial ML learning studio for PGDM/MBA learners with visual roadmaps, algorithm advisors, evaluation tools, XAI, ethics, Orange labs, case studies, and prompts.',
        stack: ['ML for Managers', 'XAI', 'Orange', 'Case Studies']
      },
      {
        title: 'Fix the Friction — Staff Retreat 2026',
        icon: '🛠️',
        url: 'https://github.com/dr-alok-tiwari/fix-the-friction-staff-retreat-2026',
        description: 'Constructive Streamlit retreat tool for issue exploration, bottleneck synthesis, impact-feasibility prioritization, 5-Whys analysis, roadmap planning, and reflection capture.',
        stack: ['Streamlit', 'Process Improvement', 'Dashboard', 'Roadmap']
      }
    ];

    const existingTitles = Array.from(projectGrid.querySelectorAll('h3'))
      .map(title => title.textContent.trim().toLowerCase());

    latestProjects.forEach(project => {
      if (existingTitles.includes(project.title.toLowerCase())) return;

      const card = document.createElement('a');
      card.className = 'project-card fade-up';
      card.href = project.url;
      card.target = '_blank';
      card.rel = 'noreferrer';
      card.setAttribute('aria-label', `Open ${project.title} on GitHub`);

      const chips = project.stack.map(item => `<span>${item}</span>`).join('');
      card.innerHTML = `
        <div class="pc-accent"></div>
        <div class="pc-icon">${project.icon}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="pc-stack">${chips}</div>
      `;

      projectGrid.appendChild(card);
    });
  })();

  // ── TEACHING, COURSES & MDP PORTFOLIO UPDATE ──
  (function updateTeachingPortfolio() {
    const teachingCards = document.querySelectorAll('#teaching .teaching-card');
    if (!teachingCards.length) return;

    const academicCard = Array.from(teachingCards).find(card =>
      card.querySelector('h3')?.textContent.trim().toLowerCase().includes('academic')
    );
    const mdpCard = Array.from(teachingCards).find(card =>
      card.querySelector('h3')?.textContent.trim().toLowerCase().includes('fdps') ||
      card.querySelector('h3')?.textContent.trim().toLowerCase().includes('mdps') ||
      card.querySelector('h3')?.textContent.trim().toLowerCase().includes('outreach')
    );

    const academicCourses = [
      ['Storytelling using Data Visualization', 'For PGDM-BDA students · data storytelling, dashboard thinking, visual analytics, and business communication'],
      ['LRCT', 'For PGDM-BDA students · logical reasoning, critical thinking, arguments, decisions, and ethical reasoning'],
      ['MLOps', 'For PGDM-BDA students and Data Engineering certification learners · production ML workflows, lifecycle management, reproducibility, monitoring, MLflow, Docker, and deployment pipelines'],
      ['Sports Analytics', 'For PGDM-BDA students · performance analytics, player/team metrics, scouting logic, and data-driven sports decisions'],
      ['Healthcare Analytics', 'For PGDM-HCM students · clinical, operational, public-health, and healthcare decision analytics'],
      ['Intelligent Research: AI Applications & Techniques', 'For FPM students · AI-assisted literature review, research design, academic writing, and responsible scholarly workflows'],
      ['Calculus', 'For BTech students · limits, derivatives, integrals, optimization, and engineering applications'],
      ['Machine Learning', 'For Data Engineering certification courses · supervised/unsupervised learning, evaluation, and applied ML pipelines'],
      ['Statistics', 'For Data Engineering certification courses · probability, inference, hypothesis testing, regression, and analytics foundations'],
      ['Deep Learning', 'For Data Engineering certification courses · neural networks, CNNs, transfer learning, and applied model development'],
      ['NLP', 'For Data Engineering certification courses · text preprocessing, embeddings, transformers, and language analytics'],
      ['DevOps', 'For Data Engineering certification courses · Git, CI/CD, containerization, deployment, and engineering workflows'],
      ['ETL/SQL', 'For Data Engineering certification courses · data extraction, transformation, loading, database querying, and pipeline design'],
      ['Python and R Programming', 'For Data Engineering certification courses · programming foundations, analytics scripting, data manipulation, and reproducible analysis']
    ];

    const mdpPrograms = [
      ['Gen AI for Executive Management', 'MDP for AJNIF MBA Graduates · executive AI literacy, managerial decision-making, productivity workflows, governance, and strategic adoption'],
      ['Gen AI — Classroom to Career', 'For UG students across Government Institutes of Goa · employability, responsible prompting, career readiness, and AI-enabled learning'],
      ['GenAI & Pedagogical Innovation', 'Faculty development on AI-integrated teaching, assessment redesign, classroom productivity, and responsible academic use'],
      ['AI for Railways & Applied Analytics', 'Industry MDP for rail sector professionals focused on analytics opportunities, process improvement, and AI adoption'],
      ['Data Visualization & Decision-Making', 'Workshops for analytics practitioners using dashboards, visual reasoning, and management-oriented data communication'],
      ['Corporate & Executive AI Learning', 'Analytics and AI fluency for senior managers, functional leaders, and decision-makers'],
      ['Hands-On Tool Sessions', 'Applied sessions on Python, Power BI, SQL, no-code AI tools, and analytics workflows for practitioners']
    ];

    function buildList(items, dotClass = '') {
      return items.map(([title, description]) => `
        <li>
          <span class="course-dot ${dotClass}"></span>
          <div><strong>${title}</strong><span>${description}</span></div>
        </li>
      `).join('');
    }

    if (academicCard) {
      const header = academicCard.querySelector('.tc-header h3');
      const list = academicCard.querySelector('.course-list');
      if (header) header.textContent = 'Academic Courses by Audience';
      if (list) list.innerHTML = buildList(academicCourses);
    }

    if (mdpCard) {
      const header = mdpCard.querySelector('.tc-header h3');
      const list = mdpCard.querySelector('.course-list');
      if (header) header.textContent = 'FDPs, MDPs & Outreach Programs';
      if (list) list.innerHTML = buildList(mdpPrograms, 'course-dot--gold');
    }

    const sectionSub = document.querySelector('#teaching .section-sub');
    if (sectionSub) {
      sectionSub.textContent = 'Audience-specific academic courses, executive MDPs, faculty development programs, and applied AI learning experiences across management, healthcare, engineering, research, and data engineering.';
    }
  })();

  // ── SCROLL REVEAL ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

  // ── STAT COUNTERS ──
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  const statStrip = document.querySelector('.stat-strip');
  if (statStrip) counterObserver.observe(statStrip);

  // ── PUBLICATION FILTER ──
  const pubFilters = document.querySelectorAll('.pub-filter');
  const pubItems = document.querySelectorAll('.pub-item');

  pubFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      pubFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      pubItems.forEach(item => {
        const match = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('is-hidden', !match);
        item.style.display = match ? '' : 'none';
      });
    });
  });

  // ── SMOOTH ANCHOR SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── ACTIVE NAV HIGHLIGHTING ──
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  // ── FORM SUBMIT FEEDBACK ──
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = '<span>Send message</span>';
          btn.disabled = false;
        }, 4000);
      }
    });
  }

  // ── RESEARCH CARD PARALLAX ──
  const interactiveCards = document.querySelectorAll('.research-card, .project-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
