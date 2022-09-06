import { useState, useEffect, memo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StockCard = memo(function StockCard(props) {
  const { symbol, setSymbols, dataUrl } = props;

  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(dataUrl + `/day-open-close/${symbol}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [setData, symbol, dataUrl]);
  console.log(`after useEffect in ${symbol}`);
  function handleDeleteCard() {
    console.log("clicked delete");
    setSymbols((prevSymbols) => {
      return prevSymbols.filter((prevSymbol) => prevSymbol !== symbol);
    });
  }

  console.log(data);
  return (
    <div className="stock-card">
      <div>
        <h2 className="stock--symbol">{symbol}</h2>
        <span onClick={handleDeleteCard}>
          <FontAwesomeIcon icon="circle-xmark" />
        </span>
      </div>
      <div className="stock--plot"></div>
      <div className="stock--details">
        <span>
          Date: <br />
          {data.hasOwnProperty("from") ? `${data.from}` : "-"}
        </span>
        <span>
          Open: <br />
          {data.hasOwnProperty("open") ? `$${data.open}` : "-"}
        </span>
        <span>
          Close: <br />
          {data.hasOwnProperty("close") ? `$${data.close}` : "-"}
        </span>
        <span>
          High: <br />
          {data.hasOwnProperty("high") ? `$${data.high}` : "-"}
        </span>
        <span>
          Low: <br />
          {data.hasOwnProperty("low") ? `$${data.low}` : "-"}
        </span>
        <span>
          Volume: <br />
          {data.hasOwnProperty("volume") ? data.volume : "-"}
        </span>
      </div>
    </div>
  );
});

export default StockCard;
