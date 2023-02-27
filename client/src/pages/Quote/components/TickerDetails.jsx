export default function TickerDetails(props) {
  const {
    data: {
      market_cap,
      address: { city, state },
      branding: { logo_url },
      description,
      homepage_url,
      total_employees,
      list_date,
      share_class_shares_outstanding: shares_outstanding,
    },
  } = props;

  const USDollar = {
    style: "currency",
    currency: "USD",
  };

  const marketCap = new Intl.NumberFormat("en-US", USDollar).format(market_cap);
  const totalEmployees = new Intl.NumberFormat().format(total_employees);
  const sharesOutstanding = new Intl.NumberFormat().format(shares_outstanding);

  const dateObj = new Date(list_date + "T00:00:00");
  const listDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);

  return (
    <section className="bg-white p-6 rounded-lg">
      <h2>About</h2>
      {/* logo has to be fetched from api, haven't decided how to do this since URL isn't known until after the initial API call, and the API key needs to be added */}
      {/* {logo_url && (
        <a href={homepage_url}>
          <img className="mx-auto max-w-xs" src={logo_url} alt="" />
        </a>
      )} */}
      <p>{description}</p>
      <div>
        <span className="flex justify-between">
          <span>Headquarters</span>
          <span>{`${city}, ${state}`}</span>
        </span>
        <span className="flex justify-between">
          <span>Market Cap</span>
          <span>{marketCap}</span>
        </span>
        <span className="flex justify-between">
          <span>Total Employees</span>
          <span>{totalEmployees}</span>
        </span>
        <span className="flex justify-between">
          <span>List Date</span>
          <span>{listDate}</span>
        </span>
        <span className="flex justify-between">
          <span>Shares Outstanding</span>
          <span>{sharesOutstanding}</span>
        </span>
      </div>
    </section>
  );
}
