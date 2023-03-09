export default function TickerPriceHistory(props) {
  const { day, prevDay } = props.data;

  const USDollar = {
    style: "currency",
    currency: "USD",
  };

  const data = {
    "Previous Close": new Intl.NumberFormat("en-US", USDollar).format(
      prevDay?.c
    ),
    Open: new Intl.NumberFormat("en-US", USDollar).format(day?.o),
    Low: new Intl.NumberFormat("en-US", USDollar).format(day?.l),
    High: new Intl.NumberFormat("en-US", USDollar).format(day?.h),
    Volume: new Intl.NumberFormat().format(day?.v),
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg p-6 divide-y divide-solid">
      {Object.keys(data).map((item, i) => (
        <PriceHistoryItem key={i} name={item} value={data[item]} />
      ))}
    </div>
  );
}

const PriceHistoryItem = ({ name, value }) => {
  return (
    <span className="flex justify-between py-2">
      <span className="">{name}</span>
      <span>{value || "-"}</span>
    </span>
  );
};
