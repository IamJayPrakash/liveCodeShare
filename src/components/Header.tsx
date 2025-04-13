import Link from "next/link";

type HeaderProps = {
  roomId: string;
};

export const Header = ({ roomId }: HeaderProps) => {
  return (
    <header className="bg-zinc-800 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        LiveCodeShare
      </Link>
      <div className="text-sm text-zinc-400">
        Room ID: <span className="font-mono">{roomId}</span>
      </div>
    </header>
  );
};
