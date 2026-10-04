export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const profile = {
  name: 'Pulkit Sharma',
  role: 'Full Stack Developer',
  location: 'Based in India',
  email: 'pulkit1865@gmail.com',
  githubUsername: 'pulkitdotio',
  githubUrl: 'https://github.com/pulkitdotio',
  linkedinUrl: 'https://www.linkedin.com/in/pulkit-sharma-691909384',
  xUrl: 'https://x.com/pulkitdotdev',
  xHandle: '@pulkitdotdev',
} as const;

export const siteTitle = `${profile.name} | ${profile.role}`;

export const siteDescription =
  'Portfolio of Pulkit Sharma, a full stack developer and AI/ML enthusiast building modern web applications, backend systems, scalable architectures, and practical AI-powered products.';
