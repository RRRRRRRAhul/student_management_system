import { Link } from "react-router-dom";

const NavLinks = ({ links }) => {
  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="hover:text-blue-400 bg-white text-gray-900 px-2 py-1 rounded-md text-sm font-medium"
          onClick={link.onClick}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
