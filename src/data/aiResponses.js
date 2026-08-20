import { personalData, projectsData, certificationsData } from './portfolioData';

export function getAiResponse(userQuery) {
  const query = userQuery.toLowerCase().trim();

  if (query.includes('who') || query.includes('name') || query.includes('about') || query.includes('reuben')) {
    return `Reuben Binu George (reubg) is a Full-Stack Developer × Creative Engineer based in ${personalData.location}. He holds a BCA degree with a specialization in Game Development and bridges full-stack engineering, AI/ML, UI/UX design, and 3D interactive experiences.`;
  }

  if (query.includes('tech') || query.includes('stack') || query.includes('language') || query.includes('tool') || query.includes('know')) {
    return `Reuben's verified tech stack includes:\n• Frontend: HTML5, CSS3, JavaScript, Bootstrap 5, React, Next.js\n• Backend: PHP, Node.js, REST APIs\n• Database: MySQL, Firebase, SQL, PostgreSQL\n• AI/ML: Python, Scikit-Learn, Machine Learning Classification\n• Game Dev: Unity 3D, C#, LUA Scripting, Three.js\n• Design: Figma\n• Tools: Git, GitHub, Postman, VS Code, Vercel`;
  }

  if (query.includes('project') || query.includes('built') || query.includes('work') || query.includes('portfolio')) {
    const titles = projectsData.map(p => `• ${p.title} (${p.category})`).join('\n');
    return `Reuben has built several key projects including:\n${titles}\n\nClick on any project card in the Selected Work section to view its full 7-part interactive case study!`;
  }

  if (query.includes('education') || query.includes('degree') || query.includes('college') || query.includes('study') || query.includes('bca')) {
    return `Reuben holds a ${personalData.education.degree} with a ${personalData.education.specialization} from ${personalData.education.institution}. He specialized in 3D game engines, C# gameplay programming, computer graphics, physics simulation, and software systems.`;
  }

  if (query.includes('certif') || query.includes('course') || query.includes('credential')) {
    const certs = certificationsData.map(c => `• ${c.title} (${c.issuer})`).join('\n');
    return `Reuben holds 5 key industry certifications:\n${certs}`;
  }

  if (query.includes('game') || query.includes('unity') || query.includes('3d') || query.includes('c#')) {
    return `Reuben has extensive game development experience from his BCA Game Dev degree. He has built 3D horror experiences in Unity (C#) with volumetric lighting and developed custom high-concurrency multiplayer scripts in LUA and MySQL for FiveM.`;
  }

  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning') || query.includes('python')) {
    return `Reuben works with Python and Scikit-Learn for machine learning classification problems, data processing, hyperparameter tuning, feature engineering, and predictive algorithms.`;
  }

  if (query.includes('ui') || query.includes('ux') || query.includes('design') || query.includes('figma')) {
    return `Reuben completed Meta's Android UI Design course and Scrimba's UI Design program. He uses Figma for wireframing, layout hierarchy, modern glassmorphism design systems, and user-centered interface design.`;
  }

  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('reach') || query.includes('domain')) {
    return `You can reach Reuben via email at ${personalData.email}. His official portfolio domain is ${personalData.domain}. He is currently ${personalData.status}!`;
  }

  return `I am Reuben's Portfolio Assistant. You can ask me about his:\n• Verified Tech Stack & Skills\n• Full-Stack, AI/ML, and Unity 3D Projects\n• BCA Game Development Education\n• Certifications from Meta, IBM, Scrimba & Coursera\n• Contact info (${personalData.email})`;
}
