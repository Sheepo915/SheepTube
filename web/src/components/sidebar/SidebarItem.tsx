import { useAppSelector } from "../../redux/hooks";

interface SidebarItem {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  url: string;
}

export function SidebarItem({ Icon, title, url }: SidebarItem) {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <a
      href={url}
      className={`flex items-center | hover:bg-neutral-400/30 | rounded-lg | py-2.5
        ${isSidebarOpen ? "gap-10 | px-2" : "flex-col gap-1 | px-1"}
      `}
    >
      <Icon className="w-6 h-6 | dark:text-white" />
      <span
        className={`text-sm font-semibold | dark:text-white ${
          !isSidebarOpen ? "hidden lg:block" : ""
        }`}
      >
        {title}
      </span>
    </a>
  );
}
