import { useState, useEffect, memo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StockChart from "./StockChart";

const StockCard = memo(function StockCard(props) {
  const { symbol, setSymbols, dataUrl } = props;

  const [data, setData] = useState({});
  const [updateTime, setUpdateTime] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(dataUrl + `/day-open-close/${symbol}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      <span className="close-card-icon-bg" onClick={handleDeleteCard}>
        <FontAwesomeIcon className="close-card-icon" icon="circle-xmark" />
      </span>
      <div className="stock--header">
        <span>
          <h2 className="stock--symbol">{symbol}</h2>
          <span className="stock--last-update">
            Last Update: {data.hasOwnProperty("from") ? `${data.from}` : "-"}
          </span>
        </span>
      </div>
      <div className="stock--plot">
        <StockChart symbol={symbol} dataUrl={dataUrl} />
      </div>
      <div className="stock--details">
        <span className="details-row">
          <span className="stock--details-name">Open:</span>
          <span>{data.hasOwnProperty("open") ? `$${data.open}` : "-"}</span>
        </span>
        <span className="details-row">
          <span className="stock--details-name">Close:</span> <br />
          <span>{data.hasOwnProperty("close") ? `$${data.close}` : "-"}</span>
        </span>
        <span className="details-row">
          <span className="stock--details-name">High:</span> <br />
          <span>{data.hasOwnProperty("high") ? `$${data.high}` : "-"}</span>
        </span>
        <span className="details-row">
          <span className="stock--details-name">Low:</span> <br />
          <span>{data.hasOwnProperty("low") ? `$${data.low}` : "-"}</span>
        </span>
        <span className="details-row">
          <span className="stock--details-name">Volume:</span> <br />
          <span>{data.hasOwnProperty("volume") ? data.volume : "-"}</span>
        </span>
      </div>
    </div>
  );
});

export default StockCard;
