export default function MiniTickerCard(props) {
  const { ticker, price, change, percentChange } = props;

  return (
    <div className="flex flex-row border rounded-xl p-2">
      <div>
        <span className="font-semibold">{ticker}</span>
        <span>{price}</span>
      </div>
      <div>
        <span>{percentChange}</span>
        <span>{change}</span>
      </div>
    </div>
  );
}
