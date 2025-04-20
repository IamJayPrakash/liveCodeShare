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

// Update the type definition to match what Next.js expects
interface RoomPageProps {
  params: { id: string };
}

// Remove the await from the function parameters and use it inside the function
export default async function RoomPage({ params }: RoomPageProps) {
  const roomId = params.id;
  return <RoomPageClient roomId={roomId} />;
}