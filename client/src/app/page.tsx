import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Dashboard from "./dashboard/Dashboard";

export default function Page() {
  return <>
    <main className="flex items-center justify-evenly h-screen ">
      <Header />
      <SideMenu />
      <Dashboard />
    </main>
  </>
}