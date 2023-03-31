import { DateTime } from "luxon";
import diffIsoDates from "utils/diffIsoDates";
import toTitleCase from "utils/toTitleCase";

export default function TickerNewsList(props) {
  const {
    data: { results },
    renderWith: NewsCard,
    divideY,
  } = props;

  const newsItems = [];

  for (let key of Object.keys(results)) {
    const { publisher, title, published_utc, article_url, image_url } =
      results[key];

    const { values, invalid } = diffIsoDates(
      DateTime.now(),
      DateTime.fromISO(published_utc)
    );

    if (invalid) {
      console.error("Diff created is invalid.  Check DateTime format.");
    } else {
      const entries = Object.entries(values);
      const firstNonZeroIndex = entries.findIndex((val) => val[1] > 0);

      newsItems.push(
        <NewsCard
          key={key}
          publisher={publisher}
          title={toTitleCase(title)}
          articleUrl={article_url}
          imageUrl={image_url}
          time={entries[firstNonZeroIndex]}
        />
      );
    }
  }

  return (
    <div className="bg-white w-full">
      <div
        className={`flex flex-col gap-4 my-4 ${
          divideY && "divide-y divide-solid"
        }`}
      >
        {newsItems}
      </div>
    </div>
  );
}
