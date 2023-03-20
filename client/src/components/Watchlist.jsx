export default function Watchlist(props) {
  const { isLoggedIn, data, renderWith: ListItem } = props;
  console.log(data);

  return (
    <ul>
      {data?.map((ticker) => {
        return (
          <ListItem
            key={ticker.ticker}
            ticker={ticker.ticker}
            price={ticker?.min?.c}
            change={ticker.todaysChange}
            percentChange={ticker.todyasChangePerc}
          />
        );
      })}
    </ul>
  );
}

function createMiniTickerCards(tickers) {
  const tabPanels = [];
  for (const [key, value] of Object.entries(tickers)) {
    tabPanels.push(
      <ListItem
        key={key}
        ticker={key}
        price={value.price}
        change={value.change}
        percentChange={value.percentChange}
      />
    );
  }
  return tabPanels;
}
