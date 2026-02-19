import { useState } from "react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const MainNavbar = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center h-16">
      <h1 className="font-semibold border border-white rounded-md px-2 py-1 bg-white text-gray-900">Student's Manager</h1>

      <div className="hidden md:flex">
        <NavLinks links={links} />
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && <MobileMenu links={links} />}
    </nav>
  );
};

export default MainNavbar;
