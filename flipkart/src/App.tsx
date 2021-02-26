import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Home from "./components/Hompage/Hompage";
import Header from "./components/Header/Header";
import SubMenues from "./components/Header/SubMenues";
import { categoryLoading, getAllCategories } from "./redux/categorySlice";
import { selectCategory } from "./redux/mainReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoryLoading("pending"));
    dispatch(getAllCategories());
    dispatch(categoryLoading("finished"));
  }, []);

  return (
    <div className="App">
      <>
        <Header />
        <SubMenues />
      </>
    </div>
  );
}

export default App;
