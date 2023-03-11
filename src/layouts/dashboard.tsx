import { ReactElement } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout(page: ReactElement) {
  return (
    <div className="flex flex-row min-h-screen !font-inter">
      <Sidebar />
      <div className="bg-[#0C0C0C] w-full">
        <div className="p-4">{page}</div>
      </div>
    </div>
  );
}
