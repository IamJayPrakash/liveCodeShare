// src/app/room/[id]/page.tsx
import { CodeEditor } from "@/components/CodeEditor";
import { Header } from "@/components/Header";

export default function RoomPage({ params }: { params: { id: string } }) {
  const roomId = params.id;

  return (
    <div className="flex flex-col h-screen">
      <Header roomId={roomId} />
      <CodeEditor roomId={roomId} />
    </div>
  );
}
