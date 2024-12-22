import { ReactElement, useEffect, useState } from "react";
import { ItemDataType, ItemsContainerProp, ItemType } from "../../../types";
import Item from "../components/Item";
import { useNavigate } from "react-router-dom";

const ItemsContainer: React.FC<ItemsContainerProp> = (props) => {
  const { accountData } = props;
  const [items, setItems] = useState<ReactElement[]>([]);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  }
  
  useEffect(() => {
    const itemCategory = accountData.item_category.toLowerCase().replace("''", "'");
    fetch(`https://fakestoreapi.com/products/category/${itemCategory}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
      console.log(data, accountData);
      data.forEach((ele: ItemDataType, index: number) => {
        setItems(prevState => [
          ...prevState,
          <Item itemData={ele} key={index} />
        ])
      })
    })
    .catch(error => { console.error('There was a problem with the GET request:', error);});
  }, [accountData])

  useEffect(() => {
    const itemContainer = document.querySelector('.itemContainer') as HTMLElement;
    function adjustHeightBasedOnOverflow() {
      if (itemContainer.scrollHeight > itemContainer.clientHeight){
        itemContainer.style.height = 'auto';
      }
      else itemContainer.style.height = '100vh';
    }
    adjustHeightBasedOnOverflow();
    window.addEventListener('resize', adjustHeightBasedOnOverflow);
  }, [items])

  return (
    <div className="itemContainer">
      <div className="itemContainerBox">
        <h2>Items that you would be interested in:</h2>
        <div className="items">
          {items}
        </div>
        <button onClick={handleAdminClick}>Admin</button>
      </div>
    </div>
  );
};

export default ItemsContainer;