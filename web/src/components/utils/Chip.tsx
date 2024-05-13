interface PillProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export function Chip({ text, isActive, onClick }: PillProps) {
  return (
    <button
      className={`inline-flex items-center overflow-hidden | box-border | min-w-3 max-w-52 h-8 px-3 | rounded-lg | select-none cursor-pointer
      ${isActive ? "dark:bg-white dark:text-black" : "dark:bg-neutral-600/40 dark:text-white"}`}
      onClick={onClick}
    >
      <span className="text-sm font-semibold | line-clamp-1 text-ellipsis | overflow-hidden">
        {text}
      </span>
    </button>
  );
}
