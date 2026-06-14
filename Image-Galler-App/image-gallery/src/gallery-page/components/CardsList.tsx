import { Card } from "../../shared";

const CardsList = () => {
  return (
    <div className="row">
      {Array.apply(null, { length: 9 }).map(() => (
        <Card />
      ))}
    </div>
  );
};

export default CardsList;
