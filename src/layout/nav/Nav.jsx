import { Link, useLocation } from "react-router-dom";
import NavActions from "./NavActions";

const Nav = () => {
  const location = useLocation();

  const isAuthRoute = location.pathname.startsWith("/auth");

  return (
    <nav className="flex justify-between h-14 items-center border-b border-[#ddd]/5 px-10 py-3.5">
      <Link to="/" className="justify-self-start font-semibold font-serif">
        C.
      </Link>

      {!isAuthRoute && <NavActions />}
    </nav>
  );
};

export default Nav;
