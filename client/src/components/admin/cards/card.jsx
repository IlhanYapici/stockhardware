import UserCard from "./card.user";
import GpuCard from "./card.gpu";
import CpuCard from "./card.cpu";

const ItemCard = ({ type, hasLoaded, data, parentKey }) => {
  switch (type) {
    case "user":
      return (
        <UserCard hasLoaded={hasLoaded} user={data} parentKey={parentKey} />
      );
    case "gpu":
      return <GpuCard hasLoaded={hasLoaded} gpu={data} parentKey={parentKey} />;
    case "cpu":
      return <CpuCard hasLoaded={hasLoaded} cpu={data} parentKey={parentKey} />;
    default:
      return null;
  }
};

export default ItemCard;
