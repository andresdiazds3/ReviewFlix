import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
