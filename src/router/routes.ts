
export const routes = {
  home: '/',
  auth: '/auth',
  dashboard: '/dashboard',
  admin: '/admin',
  about: '/about',
  services: {
    all: '/services',
    web: '/services/web',
    software: '/services/software',
    branding: '/services/branding',
    seo: '/services/seo',
    ads: '/services/ads',
  },
  portfolio: '/portfolio',
  testimonials: '/testimonials',
  contact: '/contact',
  pricing: '/pricing',
  blog: '/blog',
  faq: '/faq',
  career: '/career',
} as const;

export type RouteKey = keyof typeof routes;
