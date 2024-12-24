import { ItemType } from "../../types";

const Item: React.FC<ItemType> = (props) => {
  const { itemData } = props;
  
  return (
    <div className="item">
      <img src={itemData.image}/>
      <h3>{itemData.title}</h3>
      <div className="itemCategoryPrice">
        <p>{itemData.category.charAt(0).toUpperCase() + itemData.category.slice(1)}</p>
        <p className="itemPrice">${itemData.price}</p>
      </div>
    </div>
  );
};

export default Item;