export default function Button({
  text,
  bgColor,
}: {
  text: string;
  bgColor: string;
}) {
  return <button className={`${bgColor}`}>{text}</button>;
}
