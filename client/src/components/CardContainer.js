import StockCard from "components/StockCard";

export default function CardContainer(props) {
  const { tickers, setTickers } = props;

  function makeStockCards(ticker, index) {
    return <StockCard key={ticker} ticker={ticker} setTickers={setTickers} />;
  }

  return (
    // <div className="flex flex-wrap gap-8">{tickers.map(makeStockCards)}</div>
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 p-4">
      {tickers.map(makeStockCards)}
    </div>
  );
}
