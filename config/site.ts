export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "To Do List | Wevy",
  description:
    "To Do List made for Wevy technical challenge",
  mainNav: [
    {
      title: "Home",
      href: "/",
      security: 'public',
    },
  ],
  links: {
    home: "/",
  },
};
