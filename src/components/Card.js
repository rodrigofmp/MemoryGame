export default function Card({imagePath, onCardClick}) {
  return (
    <>
      <img src={imagePath} alt="" onClick={onCardClick} className="square" />
    </>
  );
}
