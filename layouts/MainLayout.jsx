import { Outlet } from "react-router-dom";
import NavBar from "../components/Header";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}
