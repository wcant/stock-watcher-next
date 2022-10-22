import { useState } from "react";
import CardContainer from "components/CardContainer";

export default function ChartGrid() {
  const [tickers, setTickers] = useState([]);

  // handles populating TickerCards
  // function handleKeyUp(e) {
  //     if (e.key === "Enter") {
  //       setTickers((prevTickers) => {
  //         // this prevents duplicates
  //         // could add something to popup a message that it's duplicate
  //         return prevTickers.includes(search)
  //           ? [...prevTickers]
  //           : [...prevTickers, search];
  //       });
  //       setSearch("");
  //     }
  //     if (e.key === "Escape") {
  //       console.log("you hit escape");
  //       setShowDropdown(false);
  //     }
  //   }
  return (
    <div>
      <CardContainer tickers={tickers} setTickers={setTickers} />
    </div>
  );
}

// AAPL CAT MSFT GOOGL CMG MRNA MCD GE SBUX AMZN AMD BAC INTC
