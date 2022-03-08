import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {fetchPhotosList} from "../../store/api-action";
import {getPhotosLoadIndicator} from "../../store/selectors";
import Main from "../main/main";

const App = () => {
  const dispatch = useDispatch();

  const arePhotosLoaded = useSelector((state) => getPhotosLoadIndicator(state));

  const onPhotosLoad = () => {
    if (!arePhotosLoaded) {
      dispatch(fetchPhotosList());
    }
  };

  useEffect(() => onPhotosLoad(), [arePhotosLoaded]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={`/`} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
