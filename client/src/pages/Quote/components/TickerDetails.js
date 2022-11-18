import { API_URL } from "utils/constants";
import useFetch from "hooks/useFetch";
// company details
// /api/reference/tickers/:symbol

export default function TickerDetails(props) {
  const { ticker, results } = props;

  const { data, isLoading, error } = useFetch();

  const {
    name,
    market_cap: marketCap,
    phone_number: phoneNumber,
    address,
    description,
    homepage_url: homepageUrl,
    total_employees: totalEmployees,
    list_date: listDate,
    branding,
    share_class_shares_outstanding: sharesOutstanding,
  } = data ?? {};

  // address = { address1, city, state, postal_code };
  // branding = { logo_url, icon_url };

  return <div></div>;
}
