import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { useContext, useState } from "react";
import { StoreContext } from "../../Context/StoreContext.jsx";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [search, setSearch] = useState("");

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handelSearch = (e) => {
    const searchedDish = e.target.value.toLowerCase();
    setSearch(searchedDish);
  };
  return (
    <div className="food-display" id="food-display">
      <div className="search-bar">
        <h2>Top dishes near you</h2>
        <input
          id="click-to-serach"
          onChange={(e) => handelSearch(e)}
          type="text"
          placeholder="Search your favorite dish"
        />
      </div>

      <div className="food-display-list">
        {food_list
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item._id}
                  {...item}
                  name={highlightMatch(item.name, search)}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;
