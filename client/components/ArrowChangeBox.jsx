import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ArrowChangeBox(props) {
  const { up, value } = props;
  // console.log(up, value);
  return (
    <div
      className={`flex place-items-center rounded-lg px-4 py-1 ${
        up ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <FontAwesomeIcon
        icon={up ? "arrow-up" : "arrow-down"}
        size="lg"
        color={up ? "green" : "red"}
      />
      {value ? value : ""}
    </div>
  );
}
