import Layout from "Layout";
import ChartGrid from "pages/ChartGrid";
import Home from "pages/Home";
import Quote from "pages/Quote";
import Chart from "pages/Chart";
import TickerInput from "components/TickerInput";
import MarketsSummaryTabs from "components/MarketsSummaryTabs";
import { useCookies } from "react-cookie";
import { NavLink, Link, useNavigate, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark, faArrowUp, faArrowDown);

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  return (
    <Layout>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center mx-auto w-full navy-topo-light">
          <MarketsSummaryTabs />
        </div>
        <div className="navy-topo-light">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/chartgrid" element={<ChartGrid />} />
            {/* <Route path="/chart/:ticker" element={<Chart />} /> */}
            <Route exact path="/quote" element={<Home />} />
            <Route path="/quote/:ticker" element={<Quote />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Layout>
  );
}

export default App;
