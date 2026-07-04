(() => {
    'use strict';

    /* ================================================================
       Portfolio knowledge base — the ONLY source the assistant answers from
       ================================================================ */
    const PORTFOLIO = {
        name: 'Antony Arockia Raj',
        role: '.NET Developer & AI Integration Specialist',
        location: 'Kallakurichi, Tamil Nadu, India',
        email: 'antonyarockiaraj107@gmail.com',
        linkedin: 'https://www.linkedin.com/in/antony-arockia-raj/',
        github: 'https://github.com/Antony9345',
        whatsapp: '+91 93456 58857',

        about: `Antony is a .NET Developer with **2+ years of professional experience** building enterprise applications. He has strong expertise across the **Microsoft technology stack** (Dynamics 365, Power Apps, SharePoint/SPFx), a passion for **AI-powered software development**, and focuses on clean architecture and scalable backend design. He's a continuous learner currently exploring Generative AI and intelligent automation.`,

        skills: {
            Backend: ['C#', 'ASP.NET', 'ASP.NET Core', '.NET Core', 'ASP.NET Web API', 'Entity Framework'],
            Frontend: ['Angular', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design'],
            Database: ['SQL Server', 'MySQL'],
            'Microsoft Technologies': ['Dynamics 365 Plugin Development', 'Power Apps', 'SharePoint Framework (SPFx)', 'SharePoint', 'Microsoft 365'],
            AI: ['OpenAI API', 'Azure OpenAI', 'Prompt Engineering', 'AI Chatbots', 'RAG', 'AI Automation', 'Semantic Search', 'MCP', 'AI Agents'],
            Tools: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Postman'],
        },

        experience: [
            {
                title: 'Software Developer',
                company: 'EYERAISE',
                duration: 'November 2025 – Present',
                points: ['Developed enterprise .NET Core applications', 'Built Dynamics 365 Plugins', 'Developed Power Apps solutions', 'Worked with SharePoint and SPFx', 'Built REST APIs', 'Implemented JavaScript customizations', 'Improved performance and scalability'],
            },
            {
                title: 'Junior Software Developer',
                company: 'EYERAISE',
                duration: 'September 2024 – November 2025',
                points: ['Developed Angular applications', 'Built ASP.NET Web APIs', 'Worked with SQL and MySQL', 'Created SPFx solutions', 'Developed Power Apps', 'Fixed production issues', 'Collaborated with cross-functional teams'],
            },
        ],

        projects: [
            { name: 'AI Resume Analyzer', desc: 'Upload a resume and get instant AI analysis, ATS score, and improvement suggestions.' },
            { name: 'Enterprise CRM Plugin', desc: 'Dynamics 365 Plugins integrated with Power Apps to automate CRM workflows.' },
            { name: 'AI Chatbot', desc: 'OpenAI-powered chatbot with context-aware responses, semantic search, and prompt engineering.' },
            { name: 'Employee Management System', desc: 'ASP.NET Core + Angular + SQL Server system for managing employee records.' },
            { name: 'SharePoint Employee Portal', desc: 'SPFx portal integrated with Microsoft 365 and Power Apps.' },
            { name: 'Task Management System', desc: 'ASP.NET Core + Angular task tracker with JWT authentication.' },
        ],

        certifications: [
            { name: 'Web Designing & Web Application Development', org: 'Accord Info Matrix', date: '30 Dec 2023', areas: 'HTML, JavaScript, Angular, CSS, DOM' },
            { name: 'Java Technology', org: 'Accord Info Matrix', date: '30 Dec 2023', areas: 'Core Java, J2EE' },
            { name: 'DotNet Technology', org: 'Accord Info Matrix', date: '30 Dec 2023', areas: 'C#.NET, ADO.NET, ASP.NET, MVC' },
            { name: 'Microsoft Applied Skills: Create and Manage Automated Processes by Using Power Automate', org: 'Microsoft', date: 'January 2026', areas: 'Power Automate, Cloud Flows, Process Automation' },
        ],

        education: [
            { degree: 'Master of Computer Applications (MCA)', school: 'University of Madras', duration: 'July 2025 – Present', detail: 'Computer Programming, Specific Applications' },
            { degree: 'Bachelor of Commerce – BCom (CA)', school: 'Thiruvalluvar University, Vellore', duration: 'July 2020 – June 2023', detail: 'Computer Applications' },
        ],

        achievements: { years: '2+', projects: '6+', technologies: '25+', enterpriseApps: '4+', aiProjects: '2+' },
    };

    /* ================================================================
       Intent matching (simple keyword scoring — no external API calls)
       ================================================================ */
    const INTENTS = [
        { id: 'greeting', keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening'] },
        { id: 'about', keywords: ['about', 'who are you', 'who is antony', 'background', 'summary', 'introduce'] },
        { id: 'skills', keywords: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'proficient', 'language', 'framework', 'know'] },
        { id: 'experience', keywords: ['experience', 'work history', 'job', 'career', 'role', 'company', 'eyeraise', 'employer'] },
        { id: 'projects', keywords: ['project', 'projects', 'built', 'work sample', 'repo', 'application', 'app'] },
        { id: 'certifications', keywords: ['certificate', 'certification', 'certified', 'credential', 'course'] },
        { id: 'education', keywords: ['education', 'degree', 'university', 'college', 'study', 'mca', 'bcom', 'academic'] },
        { id: 'ai', keywords: ['ai', 'artificial intelligence', 'llm', 'openai', 'chatbot', 'machine learning', 'gpt', 'rag', 'automation', 'mcp'] },
        { id: 'contact', keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'phone', 'whatsapp', 'location', 'connect', 'available'] },
        { id: 'resume', keywords: ['resume', 'cv', 'download'] },
        { id: 'recommend', keywords: ['recommend', 'suggest', 'fit for', 'good for', 'suitable'] },
        { id: 'thanks', keywords: ['thanks', 'thank you', 'appreciate'] },
    ];

    function detectIntent(message) {
        const msg = message.toLowerCase();
        let best = { id: null, score: 0 };
        INTENTS.forEach(intent => {
            const score = intent.keywords.reduce((acc, kw) => acc + (msg.includes(kw) ? 1 : 0), 0);
            if (score > best.score) best = { id: intent.id, score };
        });
        return best.id;
    }

    /* ================================================================
       Response builders
       ================================================================ */
    function listSkills() {
        return Object.entries(PORTFOLIO.skills)
            .map(([cat, items]) => `**${cat}:**\n${items.map(i => `- ${i}`).join('\n')}`)
            .join('\n\n');
    }

    function listExperience() {
        return PORTFOLIO.experience
            .map(e => `**${e.title}** at **${e.company}** (${e.duration})\n${e.points.map(p => `- ${p}`).join('\n')}`)
            .join('\n\n');
    }

    function listProjects() {
        return PORTFOLIO.projects.map(p => `- **${p.name}** — ${p.desc}`).join('\n');
    }

    function listCertifications() {
        return PORTFOLIO.certifications.map(c => `- **${c.name}** (${c.org}, ${c.date}) — ${c.areas}`).join('\n');
    }

    function listEducation() {
        return PORTFOLIO.education.map(e => `- **${e.degree}**, ${e.school} (${e.duration}) — ${e.detail}`).join('\n');
    }

    function contactInfo() {
        return `You can reach Antony here:\n- **Email:** ${PORTFOLIO.email}\n- **LinkedIn:** ${PORTFOLIO.linkedin}\n- **GitHub:** ${PORTFOLIO.github}\n- **WhatsApp:** ${PORTFOLIO.whatsapp}\n- **Location:** ${PORTFOLIO.location}`;
    }

    const RESPONDERS = {
        greeting: () => `Hi there! I'm Antony's portfolio assistant. Ask me about his **skills**, **experience**, **projects**, **certifications**, **education**, or how to **get in touch**.`,
        about: () => PORTFOLIO.about,
        skills: () => `Here's Antony's technical skill set:\n\n${listSkills()}`,
        experience: () => `Antony's professional experience:\n\n${listExperience()}`,
        projects: () => `Here are some of Antony's featured projects:\n\n${listProjects()}\n\nYou can browse the code on GitHub: ${PORTFOLIO.github}`,
        certifications: () => `Antony holds these certifications:\n\n${listCertifications()}`,
        education: () => `Antony's academic background:\n\n${listEducation()}`,
        ai: () => `Antony builds **AI-powered applications** by integrating Large Language Models (OpenAI API, Azure OpenAI), using **prompt engineering**, **RAG**, **semantic search**, and **AI agents/MCP** to automate business workflows. Example projects: **AI Resume Analyzer** and **AI Chatbot**.`,
        contact: () => contactInfo(),
        resume: () => `You can download Antony's resume directly from the **Download Resume** button in the navbar or hero section — it's a PDF with his full experience and skills.`,
        recommend: () => `Antony is a strong fit for roles combining **.NET/C# backend development**, **Angular frontend work**, and **Microsoft Power Platform / Dynamics 365** projects — especially where a team wants to layer in **AI-powered features** like chatbots, semantic search, or intelligent automation.`,
        thanks: () => `You're welcome! Let me know if you'd like to know more about Antony's skills, projects, or how to contact him.`,
        fallback: () => `I can answer questions about Antony's **skills**, **experience**, **projects**, **certifications**, **education**, or **contact details** — try asking one of those, or use a suggested prompt below.`,
    };

    function getResponse(message) {
        const intent = detectIntent(message) || 'fallback';
        return (RESPONDERS[intent] || RESPONDERS.fallback)();
    }

    /* ================================================================
       Markdown-lite renderer (bold + bullet lists + paragraphs)
       ================================================================ */
    function inlineMd(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }

    function mdToHtml(text) {
        const lines = text.split('\n');
        let html = '';
        let inList = false;
        lines.forEach(rawLine => {
            const line = rawLine.trim();
            if (line.startsWith('- ')) {
                if (!inList) { html += '<ul>'; inList = true; }
                html += `<li>${inlineMd(line.slice(2))}</li>`;
            } else {
                if (inList) { html += '</ul>'; inList = false; }
                if (line !== '') html += `<p>${inlineMd(line)}</p>`;
            }
        });
        if (inList) html += '</ul>';
        return html;
    }

    /* ================================================================
       Tokenized "streaming" reveal — safe against mid-tag cuts
       ================================================================ */
    function tokenizeHTML(html) {
        const tokens = [];
        let i = 0;
        while (i < html.length) {
            if (html[i] === '<') {
                const close = html.indexOf('>', i);
                if (close === -1) { tokens.push(html.slice(i)); break; }
                tokens.push(html.slice(i, close + 1));
                i = close + 1;
            } else {
                tokens.push(html[i]);
                i++;
            }
        }
        return tokens;
    }

    function streamIntoBubble(bubbleEl, html, onTick) {
        const tokens = tokenizeHTML(html);
        let i = 0;
        let acc = '';
        const BATCH = 3;
        return new Promise(resolve => {
            function step() {
                if (i >= tokens.length) { bubbleEl.innerHTML = html; resolve(); return; }
                for (let n = 0; n < BATCH && i < tokens.length; n++, i++) acc += tokens[i];
                bubbleEl.innerHTML = acc;
                onTick && onTick();
                setTimeout(step, 12);
            }
            step();
        });
    }

    /* ================================================================
       UI wiring
       ================================================================ */
    const toggleBtn = document.getElementById('chatToggleBtn');
    const closeBtn = document.getElementById('chatCloseBtn');
    const panel = document.getElementById('chatPanel');
    const messagesEl = document.getElementById('chatMessages');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const suggestions = document.getElementById('chatSuggestions');

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function openChat() {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        toggleBtn.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        setTimeout(() => input?.focus(), 250);
    }
    function closeChat() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        toggleBtn.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn?.addEventListener('click', () => {
        panel.classList.contains('open') ? closeChat() : openChat();
    });
    closeBtn?.addEventListener('click', closeChat);

    function addUserMessage(text) {
        const row = document.createElement('div');
        row.className = 'chat-msg user';
        row.innerHTML = `
            <div class="chat-msg-avatar"><i class="bi bi-person-fill"></i></div>
            <div class="chat-msg-bubble"></div>`;
        row.querySelector('.chat-msg-bubble').textContent = text;
        messagesEl.appendChild(row);
        scrollToBottom();
    }

    async function addBotMessage(text) {
        const row = document.createElement('div');
        row.className = 'chat-msg bot';
        row.innerHTML = `
            <div class="chat-msg-avatar"><i class="bi bi-robot"></i></div>
            <div class="chat-msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
        messagesEl.appendChild(row);
        scrollToBottom();

        const bubble = row.querySelector('.chat-msg-bubble');
        await new Promise(r => setTimeout(r, 500 + Math.random() * 400));

        const html = mdToHtml(text);
        bubble.innerHTML = '';
        await streamIntoBubble(bubble, html, scrollToBottom);
        scrollToBottom();
    }

    let busy = false;
    async function handleUserInput(text) {
        const trimmed = text.trim();
        if (!trimmed || busy) return;
        busy = true;
        addUserMessage(trimmed);
        if (input) input.value = '';
        await addBotMessage(getResponse(trimmed));
        busy = false;
    }

    form?.addEventListener('submit', e => {
        e.preventDefault();
        handleUserInput(input.value);
    });

    suggestions?.addEventListener('click', e => {
        const chip = e.target.closest('.chip');
        if (chip) handleUserInput(chip.textContent);
    });

})();
