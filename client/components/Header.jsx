import Navbar from "./Navbar";

export default function Header() {
  return (
    <header>
      <div className="grid grid-cols-3 items-center bg-[#f6f6f6] p-4">
        <span role="banner" className="mr-6 text-3xl font-bold text-slate-800">
          Stock Watcher
        </span>
        <Navbar />
        <div className="ml-auto">Sign In | Logout</div>
      </div>
    </header>
  );
}
