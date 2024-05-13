interface ChipScrollerProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  onClick: () => void;
}

export function ChipScroller({ Icon, size = 6, onClick }: ChipScrollerProps) {
  return (
    <button className="dark:bg-neutral-800" onClick={onClick}>
      <Icon className={`w-${size} h-${size} aspect-square | dark:text-white`} />
    </button>
  );
}
