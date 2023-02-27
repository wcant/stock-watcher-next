export default function NewsCard(props) {
  const { imageUrl, publisher, title, time, articleUrl } = props;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          {imageUrl && (
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={imageUrl}
              alt=""
            />
          )}
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            <a href={articleUrl}>{title}</a>
          </div>
          <a
            href={articleUrl}
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {publisher.name}
          </a>
          <p className="mt-2 text-slate-500">{time}</p>
        </div>
      </div>
    </div>
  );
}
