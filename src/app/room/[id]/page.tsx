// src/app/room/[id]/page.tsx

import { CodeEditor } from "@/components/CodeEditor";
import { Header } from "@/components/Header";

export const metadata = {
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
interface RoomPageProps {
  params: { id: string };
}

export default function RoomPage({ params }: RoomPageProps) {
  const { id: roomId } = params;

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold p-4">Room ID: {roomId}</h1>
      <Header roomId={roomId} />
      <CodeEditor roomId={roomId} />
    </div>
  );
}
