export default function TickerNewsList(props) {
  const { results, count } = props;

  const newsItems = [];

  for (let i = 0; i < count; i++) {
    const { publisher, title, published_utc, article_url, image_url } =
      results.i;
    const item = (
      <div>
        <span>results.i.</span>
        <span>results.i</span>
      </div>
    );

    newsItems.push(item);
  }

  return (
    <div className="flex flex-col">
      {/* <span className="flex justify-between">
        <span className="stock--details-name">Open:</span>
        <span>{data.hasOwnProperty("open") ? `$${data.open}` : "-"}</span>
      </span>
      <span className="flex justify-between">
        <span className="stock--details-name">Close:</span> <br />
        <span>{data.hasOwnProperty("close") ? `$${data.close}` : "-"}</span>
      </span>
      <span className="flex justify-between">
        <span className="stock--details-name">High:</span> <br />
        <span>{data.hasOwnProperty("high") ? `$${data.high}` : "-"}</span>
      </span>
      <span className="flex justify-between">
        <span className="stock--details-name">Low:</span> <br />
        <span>{data.hasOwnProperty("low") ? `$${data.low}` : "-"}</span>
      </span>
      <span className="flex justify-between">
        <span className="stock--details-name">Volume:</span> <br />
        <span>{data.hasOwnProperty("volume") ? data.volume : "-"}</span>
      </span> */}
    </div>
  );
}
