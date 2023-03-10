import Layout from "Layout";
import ChartGrid from "pages/ChartGrid";
import Home from "pages/Home";
import Quote from "pages/Quote";
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

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  return (
    <Layout>
      <div className="pb-10 pt-5 h-full navy-topo-light">
        <div className="max-w-screen-xl mx-auto">
          <MarketsSummaryTabs />
          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/chartgrid" element={<ChartGrid />} />
              <Route exact path="/quote" element={<Home />} />
              <Route path="/quote/:ticker" element={<Quote />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Layout>
  );
}
