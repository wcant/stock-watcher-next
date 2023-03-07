import NewsCard from "./NewsCard";
import Heading from "./Heading";

export default function TickerNewsList(props) {
  const { results } = props.data;

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
      <Heading hLevel="h2" content="Latest News" />
      <div className="flex flex-col justify-center items-center gap-4">
        {newsItems}
      </div>
    </section>
  );
}
