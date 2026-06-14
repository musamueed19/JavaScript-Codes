export interface CardProps {
  imgUrl?: string;
  cardWidth?: number;
}

const Card = ({
  imgUrl = "https://via.placeholder.com/200",
  cardWidth = 18,
}: CardProps) => {
  return (
    <div className="card" style={{ width: `${cardWidth}rem` }}>
      <img src={imgUrl} alt="card image" className="card-img" />
    </div>
  );
};

export default Card;
