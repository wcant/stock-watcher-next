type TickerListItemProps = {
  tickerIcon?: React.ReactElement;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  icon?: React.ReactElement;
};

export default function TickerListItem(props: TickerListItemProps) {
  const { tickerIcon, name, price, change, percentChange, icon } = props;
  return (
    <li>
      <div className="flex hover:bg-slate-500">
        <div>{tickerIcon}</div>
        <div className="text-ellipsis overflow-hidden">{name}</div>
        <div>{price}</div>
        <div>{change}</div>
        <div>{percentChange}</div>
        <div>{icon}</div>
      </div>
    </li>
  );
}
