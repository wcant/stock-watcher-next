export default function SmallNewsCard(props) {
  const { imageUrl, publisher, title, time, articleUrl } = props;

  const pluralOrNot = time[1] > 1;

  const timeElapsed = `${Math.round(time[1]).toFixed()} ${
    pluralOrNot ? time[0] : time[0].slice(0, time[0].length)
  } ago`;

  return (
    <div className="flex justify-between bg-white overflow-hidden text-sm">
      <div className="flex flex-col grow-1">
        <div className="flex items-center">
          <a
            href={articleUrl}
            className="text-lg leading-tight font-medium text-black hover:underline"
          >
            {publisher.name} <span className="mx-2">•</span>
          </a>
          <p className="text-slate-500">{timeElapsed}</p>
        </div>
        <div className="uppercase tracking-wide p-2 text-sm text-indigo-500 font-semibold">
          <a href={articleUrl}>{title}</a>
        </div>
      </div>
      <div className="flex items-center sm:shrink-0">
        {imageUrl && (
          <img className="w-28 h-auto object-cover" src={imageUrl} alt="" />
        )}
      </div>
    </div>
  );
}
