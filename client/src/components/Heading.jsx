export default function Heading({ hLevel, content }) {
  const style = {
    h1: "text-5xl",
    h2: "text-4xl",
    h3: "text-3xl",
    h4: "text-2xl",
    h5: "text-xl",
    h6: "text-lg",
    p: "text-base",
  };

  const validLevels = Object.keys(style);

  const safeHeading = validLevels.includes(hLevel);
  if (!safeHeading) console.error(`${hLevel} is not a valid heading level`);

  const H = safeHeading ? hLevel : "p";

  return <H className={style[hLevel]}>{content}</H>;
}
