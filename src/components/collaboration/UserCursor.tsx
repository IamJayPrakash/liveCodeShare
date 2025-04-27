import { motion } from 'framer-motion';

interface UserCursorProps {
  readonly user: { readonly name: string; readonly color?: string };
  readonly position: { readonly x: number; readonly y: number } | null;
}

export function UserCursor({ user, position }: UserCursorProps) {
  if (!position) return null;

  return (
    <motion.div
      className="absolute pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: position.x,
        y: position.y,
      }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="relative">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: user.color || '#3b82f6',
            transform: 'rotate(-15deg)',
          }}
        >
          <path
            d="M5.586 12.686l4.293 4.293a1 1 0 001.414-1.414L7.414 11.686 11.293 7.807a1 1 0 10-1.414-1.414l-4.293 4.293a1 1 0 000 1.414z"
            fill="currentColor"
          />
        </svg>
        <div
          className="absolute top-0 left-6 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium"
          style={{ backgroundColor: user.color || '#3b82f6', color: 'white' }}
        >
          {user.name}
        </div>
      </div>
    </motion.div>
  );
}
