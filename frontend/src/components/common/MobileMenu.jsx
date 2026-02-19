import NavLinks from "./NavLinks";

const MobileMenu = ({ links }) => {
  return (
    <div className="absolute top-14 left-0 w-full bg-gray-800 p-4">
      <NavLinks links={links} />
    </div>
  );
};

export default MobileMenu;
