import NewsCard from "./NewsCard";

export default function TickerNewsList(props) {
  const { results, count } = props.data;

  const newsItems = [];

  for (let key of Object.keys(results)) {
    const { publisher, title, published_utc, article_url, image_url } =
      results[key];

    newsItems.push(
      <NewsCard
        key={key}
        publisher={publisher}
        title={title}
        articleUrl={article_url}
        imageUrl={image_url}
        time={published_utc}
      />
    );
  }

  return (
    <section className=" bg-white w-full p-6">
      <h2>Latest News</h2>
      <div className="grid grid-cols-2 gap-4">{newsItems}</div>
    </section>
  );
}
