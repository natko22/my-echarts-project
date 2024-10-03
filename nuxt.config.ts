export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Charts Project",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/apple-touch-icon.png",
        }, // Favicon reference
      ],
    },
  },
});
