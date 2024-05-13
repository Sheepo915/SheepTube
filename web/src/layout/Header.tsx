import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProfilePic } from "../components/utils/ProfilePic";
import { useAppDispatch } from "../redux/hooks";
import { toggleSidebar } from "../redux/features/sidebar/sidebarSlice";
import { Link } from "react-router-dom";

export function Header() {
  const dispatch = useAppDispatch();

  function handleToggleSidebar() {
    dispatch(toggleSidebar());
  }

  return (
    <header className="dark:bg-neutral-800 | h-14 px-4 | flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Bars3Icon
          className="w-8 h-8 aspect-square | p-0.5 | rounded-full | dark:text-white hover:bg-neutral-400/30"
          onClick={handleToggleSidebar}
        />
        <Link to="/" className="flex items-center | h-6 | select-none">
          <span className="px-1.5 | font-semibold text-white bg-blue-800 | rounded-lg">Sheep</span>
          <span className="ms-1 | dark:text-white">Tube</span>
        </Link>
      </div>
      <div>
        <div className="hidden lg:flex | w-[40rem] h-10 | rounded-full | overflow-hidden">
          <input
            type="text"
            name=""
            id=""
            className="w-[35rem] h-full ps-6 | dark:text-white dark:caret-white | dark:bg-neutral-800 | border border-solid border-neutral-300 rounded-s-full"
            placeholder="Search"
          />
          <button
            type="submit"
            className="flex justify-center items-center | w-20 | bg-neutral-700 | border border-solid border-neutral-300 rounded-e-full"
          >
            <MagnifyingGlassIcon className="w-6 aspect-square | dark:text-white" />
          </button>
        </div>
      </div>
      <div>
        <div>
          <ProfilePic img="https://placehold.co/600x400" size={8} />
        </div>
      </div>
    </header>
  );
}
