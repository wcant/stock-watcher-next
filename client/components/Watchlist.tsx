type WatchlistProps = {
  isLoggedIn: boolean;
  data: TickerSnapshot[];
  renderWith: React.ReactElement;
  renderCount: number;
};

export default function Watchlist(props: WatchlistProps) {
  const { isLoggedIn, data, renderWith: ListItem, renderCount } = props;
  console.log(data);

  return (
    <ul>
      {data?.map((ticker) => {
        return (
          <ListItem
            key={ticker.ticker}
            ticker={ticker.ticker}
            price={ticker.min.c}
            change={ticker.todaysChange}
            percentChange={ticker.todaysChangePerc}
          />
        );
      })}
    </ul>
  );
}
