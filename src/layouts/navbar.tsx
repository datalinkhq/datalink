import { ReactElement } from "react";
import Navbar from "../components/Navbar";

export default function NavbarLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
}
