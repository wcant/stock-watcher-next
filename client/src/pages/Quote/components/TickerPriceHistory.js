export default function TickerPriceHistory(props) {
  const { day, prevDay } = props.data;

  const USDollar = {
    style: "currency",
    currency: "USD",
  };

  const prevClose = new Intl.NumberFormat("en-US", USDollar).format(prevDay?.c);
  const open = new Intl.NumberFormat("en-US", USDollar).format(day?.o);
  const dayLow = new Intl.NumberFormat("en-US", USDollar).format(day?.l);
  const dayHigh = new Intl.NumberFormat("en-US", USDollar).format(day?.h);
  const dayVolume = new Intl.NumberFormat().format(day?.v);

  return (
    <div className="flex flex-col bg-white">
      <span className="flex justify-between">
        <span className="">Previous Close</span>
        <span>{prevClose || "-"}</span>
      </span>
      <span className="flex justify-between">
        <span className="">Open</span>
        <span>{open || "-"}</span>
      </span>
      <span className="flex justify-between">
        <span className="">Day Range</span> <br />
        <span>{`${dayLow} - ${dayHigh}` || "-"}</span>
      </span>
      <span className="flex justify-between">
        <span className="">Today's Volume</span> <br />
        <span>{dayVolume || "-"}</span>
      </span>
    </div>
  );
}
