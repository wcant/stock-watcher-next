function NewsItemCard(props) {
  const { imageUrl, publisher, title, time, articleUrl } = props;

  return (
    <div>
      {imageUrl && <img className="max-w-xs" src={imageUrl} alt="" />}
      <span>{publisher.name}</span>
      <span>
        <a href={articleUrl} data-expand-click-area>
          {title}
        </a>
      </span>
      <span>{time}</span>
    </div>
  );
}

export default function TickerNewsList(props) {
  const { results, count } = props.data;

  const newsItems = [];

  for (let i = 0; i < count; i++) {
    const { publisher, title, published_utc, article_url, image_url } =
      results[i];

    // first 3 are cards with images
    newsItems.push(
      <NewsItemCard
        key={i}
        publisher={publisher}
        title={title}
        articleUrl={article_url}
        imageUrl={i < 3 && image_url}
        time={published_utc}
      />
    );
  }

  return <section className="flex flex-col p-4 bg-white">{newsItems}</section>;
}
