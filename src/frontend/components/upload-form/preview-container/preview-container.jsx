import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getEffect} from "../../../store/selectors";
import {useDispatch, useSelector} from "react-redux";
import PreviewImage from "./preview-imge";
import EffectsControls from "../controls/effects-controls";
import ScaleControls from "../controls/scale-controls";

import {DEFAULT_EFFECT_VALUE, DEFAULT_SCALE_VALUE} from "../../../_const";

const PreviewContainer = ({previewToggleHandler}) => {
  // const dispatch = useDispatch();

  const [currentScale, setCurrentScale] = useState(DEFAULT_SCALE_VALUE);
  const [effectLevel, setEffectLevel] = useState(DEFAULT_EFFECT_VALUE);
  // const [currentEffect, setCurrentEffect] = useState(DEFAULT_EFFECT);

  const currentEffect = useSelector((state) => getEffect(state));

  const effectLevelChangeHandler = (value) => setEffectLevel(value);

  const scaleChangeHandler = useCallback(
      (changeStep) => {
        setCurrentScale((prevScaleValue) => prevScaleValue + changeStep);
      },
      [currentScale]
  );

  useEffect(() => setEffectLevel(DEFAULT_EFFECT_VALUE), [currentEffect]);

  return (
    <div className="img-upload__preview-container">
      {/* <!-- Изменение размера изображения --> */}
      <ScaleControls
        currentScale={currentScale}
        scaleChangeHandler={scaleChangeHandler}
      />

      {/* <!-- Предварительный просмотр изображения --> */}
      <PreviewImage
        effectLevel={effectLevel}
        currentScale={currentScale}
        currentEffect={currentEffect}
      />

      {/* <!-- Изменение глубины эффекта, накладываемого на изображение --> */}
      <EffectsControls
        currentEffect={currentEffect}
        defaultEffectLevel={DEFAULT_EFFECT_VALUE}
        // currentEffectLevel={effectLevel}
        effectLevelChangeHandler={effectLevelChangeHandler}
      />

      {/* <!-- Кнопка для закрытия формы редактирования изображения --> */}
      <button
        type="reset"
        className="img-upload__cancel  cancel"
        id="upload-cancel"
        onClick={() => previewToggleHandler(false)}
      >
        Закрыть
      </button>
    </div>
  );
};

// PreviewContainer.whyDidYouRender = true;

PreviewContainer.propTypes = {
  previewToggleHandler: PropTypes.func.isRequired,
};

export default PreviewContainer;
