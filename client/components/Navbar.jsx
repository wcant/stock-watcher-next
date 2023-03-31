import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="w-full flex-grow lg:flex lg:items-center lg:w-auto text-slate-50">
        <NavLink to="/" end>
          <span className="mr-6 hover:text-blue-400">ChartGrid</span>
        </NavLink>
        {/* <NavLink to="/chart" >
          <span className="mr-6">ChartView</span>
        </NavLink> */}
      </nav>
    </div>
  );
}
