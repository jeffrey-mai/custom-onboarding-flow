import { ItemsContainerProp } from "../../../types";
import Item from "../components/Item";

const ItemsContainer: React.FC<ItemsContainerProp> = (props) => {
  const { accountData } = props;
  // fetch item API
  // render <Item> for each item from SQL query

  return (
    <div className="itemContainer">
      {/* MULTIPLE <Item> in here */}
    </div>
  );
};

export default ItemsContainer;