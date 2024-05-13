import { Outlet } from "react-router-dom";
import { Header } from "../layout/Header";
import { SideBar } from "../layout/SideBar";

function Root() {
  return (
    <div className="max-h-screen | flex flex-col">
      <Header />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 | h-screen | overflow-auto">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
