import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFilteredPhotos} from "../../_util";
import {Filter} from "../../_const";
import {filterChange} from "../../store/action";
import {getPhotos, getPhotosLoadIndicator} from "../../store/selectors";
import Footer from "../footer/footer";
import Header from "../header/header";
import PictureCard from "../picture-card/picture-card";
import UploadForm from "../upload-form/upload-form";

const Main = () => {
  const dispatch = useDispatch();

  const photos = useSelector((state) => getPhotos(state));
  const arePhotosLoaded = useSelector((state) => getPhotosLoadIndicator(state));

  const [photosToShow, setPhotosToShow] = useState(photos);
  const [selectedFilter, setSelectedFilter] = useState(Filter.DEFAULT.name);

  const handleFilterSelect = useCallback(
      (newFilter) => {
        const updatedPhotosList = getFilteredPhotos(photos, newFilter);

        dispatch(filterChange(newFilter));
        setSelectedFilter(newFilter);
        setPhotosToShow(updatedPhotosList);
      },
      [photosToShow]
  );

  useEffect(() => setPhotosToShow(photos), [arePhotosLoaded]);

  return (
    <>
      <Header
        selectedFilter={selectedFilter}
        handleFilterSelect={handleFilterSelect}
        arePhotosLoaded={arePhotosLoaded}
      />

      <section className="pictures  container">
        <h2 className="pictures__title  visually-hidden">
          Фотографии других пользователей
        </h2>

        {/* <!-- Поле для загрузки нового изображения на сайт --> */}
        <section className="img-upload">
          <div className="img-upload__wrapper">
            <h2 className="img-upload__title  visually-hidden">
              Загрузка фотографии
            </h2>

            <UploadForm />
          </div>
        </section>

        {
          photosToShow.map((photo, i) => (
            <PictureCard photo={photo} key={`photo-${i}`} />
          ))
        }
      </section>

      <Footer />
    </>
  );
};

export default Main;
