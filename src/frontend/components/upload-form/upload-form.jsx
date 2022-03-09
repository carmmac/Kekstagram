import React, {useState} from "react";
import EffectsList from "./effects/effects-list";
import PreviewContainer from "./preview-container/preview-container";

const UploadForm = () => {
  // ! opener
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const previewToggleHandler = (value) => setIsPreviewOpen(value);


  return (
    <form
      className="img-upload__form"
      id="upload-select-image"
      action="#"
      method="post"
      encType="multipart/form-data"
      autoComplete="off"
      accept="image/jpeg,image/jpg,image/png,image/gif"
    >
      {/* <!-- Изначальное состояние поля для загрузки изображения --> */}
      <fieldset className="img-upload__start">
        <input
          className="img-upload__input  visually-hidden"
          type="file"
          id="upload-file"
          name="filename"
          required
          onChange={() => previewToggleHandler(true)}
        />
        <label
          className="img-upload__label  img-upload__control"
          htmlFor="upload-file"
        >
          Загрузить
        </label>
      </fieldset>

      {/* <!-- Форма редактирования изображения --> */}
      <div className={`img-upload__overlay  ${isPreviewOpen ? `` : `hidden`}`}>
        <div className="img-upload__wrapper">
          <PreviewContainer previewToggleHandler={previewToggleHandler} />

          {/* <!-- Наложение эффекта на изображение --> */}
          <fieldset className="img-upload__effects  effects">
            <EffectsList />
          </fieldset>

          {/* <!-- Добавление хэш-тегов и комментария к изображению --> */}
          <fieldset className="img-upload__text text">
            <input
              className="text__hashtags"
              name="hashtags"
              placeholder="#ХэшТег"
            />
            <textarea
              className="text__description"
              name="description"
              placeholder="Ваш комментарий..."
            ></textarea>
          </fieldset>

          {/* <!-- Кнопка для отправки данных на сервер --> */}
          <button
            type="submit"
            className="img-upload__submit"
            id="upload-submit"
          >
            Опубликовать
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
