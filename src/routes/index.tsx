import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/desktop/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Linux Rice Desktop" },
      { name: "description", content: "A minimal Linux rice desktop interface." },
      { property: "og:title", content: "Linux Rice Desktop" },
      { property: "og:description", content: "A minimal Linux rice desktop interface." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
