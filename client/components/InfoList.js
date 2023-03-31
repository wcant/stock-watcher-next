export function InfoList(props) {
  return <div className="flex flex-col p-2 ">{props.children}</div>;
}

export function InfoListHeading(props) {
  const { withToggle, children } = props;
  return <div>{children}</div>;
}

export function InfoListRow(props) {
  const { leftCol, rightCol } = props;
  return (
    <div className="flex justify-between px-4 py-2">
      {leftCol && <div>{leftCol}</div>}
      {rightCol && <div>{rightCol}</div>}
    </div>
  );
}
