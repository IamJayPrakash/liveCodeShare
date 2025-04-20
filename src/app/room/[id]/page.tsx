import { Metadata } from "next";
import RoomPageClient from "@/components/RoomPageClient";

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

export default async function RoomPage({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const roomId = params.id;
  return <RoomPageClient roomId={roomId} />;
}
