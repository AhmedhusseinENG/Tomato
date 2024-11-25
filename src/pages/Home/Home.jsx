import { useState, useEffect, lazy } from "react";
const Banner = lazy(() => import("../../components/Banner/Banner"));
const ExploreMenu = lazy(() =>
  import("../../components/ExploreMenu/ExploreMenu")
);
const FoodDisplay = lazy(() =>
  import("../../components/FoodDisplay/FoodDisplay")
);
const AppDownload = lazy(() =>
  import("../../components/AppDownload/AppDownload")
);

const Home = () => {
  const defaultSelection = () => {
    const selectedDish = localStorage.getItem("category");
    return selectedDish ? JSON.parse(selectedDish) : "All";
  };
  const [category, setCategory] = useState(defaultSelection);
  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
  }, [category]);
  return (
    <div>
      <Banner />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
