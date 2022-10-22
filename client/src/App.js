import { Outlet, Link } from "react-router-dom";
import TickerInput from "components/TickerInput";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark, faArrowUp, faArrowDown);

function App() {
  const navigate = useNavigate();

  const handleSubmit = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="grid grid-cols-3 items-center pb-4">
        <nav className="text-slate-50">
          <Link to="/">
            <h1 className="text-2xl font-bold text-slate-50">Stock Watcher</h1>
          </Link>
          <Link to="/chart-grid">Chart Grid</Link>
        </nav>
        <TickerInput handleSubmit={handleSubmit} />
      </div>
      <Outlet />
    </div>
  );
}

export default App;

// useEffect(() => {
//   try {
//     fetch(url, {
//       json: true,
//       headers: { "User-Agent": "request" },
//     })
//       .then((res) => {
//         if (res.status !== 200) {
//           console.log("Status:", res.status);
//         } else {
//           // data is successfully parsed as a JSON object:
//           return res.json();
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         setData(data);
//       });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }, []);
