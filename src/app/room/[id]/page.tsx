// src/app/room/[id]/page.tsx

import { CodeEditor } from "@/components/CodeEditor";
import { Header } from "@/components/Header";
import { SocketProvider } from "@/components/SocketProvider";

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
  params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id: roomId } = await params;

  return (
    <SocketProvider>
      <div className="flex flex-col h-screen">
        <Header roomId={roomId} />
        <CodeEditor roomId={roomId} />
      </div>
    </SocketProvider>
  );
}
