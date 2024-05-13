import {
  ArrowUturnLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  HandThumbUpIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon,
  ComputerDesktopIcon,
  HomeIcon,
  RectangleStackIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { SidebarItem } from "../components/sidebar/SidebarItem";
import { SidebarSection } from "../components/sidebar/SidebarSection";
import { useAppSelector } from "../redux/hooks";

function SidebarItemException() {
  return (
    <a
      href={"./user"}
      className="flex items-center gap-2 | hover:bg-neutral-400/30 | rounded-lg | py-2.5 px-2"
    >
      <span className="text-base font-semibold | dark:text-white">You</span>
      <ChevronRightIcon className="w-4 h-4 aspect-square | dark:text-white" />
    </a>
  );
}

export function SideBar() {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <nav
      className={`hidden lg:sticky top-0 | overflow-y-auto scrollbar-hidden | pb-4 | lg:flex lg:flex-col | dark:bg-neutral-800 ${
        isSidebarOpen ? "w-56" : "w-24"
      }`}
    >
      {isSidebarOpen ? (
        <div className="lg:flex flex-col | w-full px-2 pb-4 | divide-y divide-neutral-400/40 | lg:sticky absolute top-0 | overflow-y-auto scrollbar-hidden">
          <SidebarSection>
            <SidebarItem Icon={HomeIcon} title="Home" url="./" />
            <SidebarItem Icon={TagIcon} title="Categories" url="./category" />
            <SidebarItem Icon={RectangleStackIcon} title="Subscriptions" url="./subscription" />
          </SidebarSection>
          <SidebarSection>
            <SidebarItemException />
            <SidebarItem Icon={ComputerDesktopIcon} title="Your Channel" url="./channel" />
            <SidebarItem Icon={ArrowUturnLeftIcon} title="History" url="./history" />
            <SidebarItem Icon={QueueListIcon} title="Playlist" url="./playlist" />
            <SidebarItem Icon={ClockIcon} title="Watch Later" url="./watchLater" />
            <SidebarItem Icon={HandThumbUpIcon} title="Liked Video" url="./watchLater" />
          </SidebarSection>
          <SidebarSection>
            <SidebarItem Icon={Cog6ToothIcon} title="Setting" url="./setting" />
          </SidebarSection>
        </div>
      ) : (
        <div className="w-24 px-2">
          <SidebarItem Icon={HomeIcon} title="Home" url="./" />
        </div>
      )}
    </nav>
  );
}
