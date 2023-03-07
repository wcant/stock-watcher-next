export default function NewsCard(props) {
  const { imageUrl, publisher, title, time, articleUrl } = props;

  return (
    <div className="w-full max-w-md  bg-white rounded-xl shadow-md overflow-hidden sm:max-w-2xl">
      <div className="sm:flex">
        <div className="sm:shrink-0">
          {imageUrl && (
            <img
              className="h-24 w-full object-cover md:h-full sm:w-32"
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
