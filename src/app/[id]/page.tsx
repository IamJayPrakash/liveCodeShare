import RoomPageClient from "@/components/RoomPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LiveCodeShare - Live Room",
  description: "Collaborate in real-time with others in this code room.",
  openGraph: {
    title: "LiveCodeShare Room",
    description: "Join a live coding session and collaborate instantly.",
    url: "https://livecodeshare.vercel.app",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default async function RoomPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  return <RoomPageClient roomId={id} />;
}
