import Header from "@/app/components/Header/Header";
import SideMenu from "@/app/components/SideMenu/SideMenu";
import Dashboard from "@/app/dashboard/Dashboard";
import Login from "@/app/login/Login";

export default function Page() {
  return <>
    <main className="">
      <Header />
      <SideMenu />
      {/* <Dashboard /> */}
      {/* <Login /> */}
    </main>
  </>
}