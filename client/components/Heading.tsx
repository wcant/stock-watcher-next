import React, { HTMLAttributes } from "react";

type HeadingProps = {
  hLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
};

type HeadingPropsExtended = HeadingProps & HTMLAttributes<HTMLHeadingElement>;

export default function Heading({
  children,
  hLevel = "p",
  className,
}: HeadingPropsExtended) {
  const HElement = ({ ...props }: HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(hLevel, props, children);

  return <HElement className={className}>{children}</HElement>;
}
