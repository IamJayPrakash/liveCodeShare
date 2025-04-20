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

// Define proper props type according to Next.js Page format
type Props = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default function RoomPage({ params }: Props) {
  const { id: roomId } = params;
  return <RoomPageClient roomId={roomId} />;
}