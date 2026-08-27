import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/desktop/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Desktop Dream — KDE Plasma Rice Guide" },
      {
        name: "description",
        content:
          "Interactive EndeavourOS and KDE Plasma Wayland rice documentation with real dotfiles, installer and troubleshooting.",
      },
      { property: "og:title", content: "Desktop Dream — KDE Plasma Rice Guide" },
      {
        property: "og:description",
        content: "Explore the desktop, inspect sanitized dotfiles and reproduce the rice.",
      },
      { property: "og:image", content: "/assets/wallpapers/main-wallpaper.webp" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
