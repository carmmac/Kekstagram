import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {getOffset} from "../../../_util";
import {Effect} from "../../../_const";

const EffectsControls = ({
  currentEffect,
  defaultEffectLevel,
  // currentEffectLevel,
  effectLevelChangeHandler,
}) => {

  const effectLevelPinRef = useRef();
  const effectLevelBarRef = useRef();
  const effectLevelDepthRef = useRef();

  const getEffectLevel = (currLevel) =>
    Math.floor((currLevel * 100) / effectLevelBarRef.current.offsetWidth);

  const handleEffectLevelPinMove = (evt) => {
    evt.preventDefault();

    const sliderLimit = getOffset(effectLevelBarRef.current);
    const maxEffectLevel = effectLevelBarRef.current.offsetWidth;

    let startCoords = evt.clientX;

    const moveSliderAt = (value) => {
      effectLevelPinRef.current.style.left = `${value}px`;
    };

    const mouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();

      let newEffectLevel = getEffectLevel(effectLevelPinRef.current.offsetLeft);

      effectLevelChangeHandler(newEffectLevel);

      const shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      let moveValue = effectLevelPinRef.current.offsetLeft - shift;

      if (startCoords <= sliderLimit.left) {
        moveSliderAt(0);
      } else if (startCoords >= sliderLimit.right) {
        moveSliderAt(maxEffectLevel);
      } else {
        moveSliderAt(moveValue);
      }

      effectLevelDepthRef.current.style.width = `${newEffectLevel}%`;
    };

    const mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  };

  useEffect(() => {
    effectLevelPinRef.current.style.left = `${defaultEffectLevel}%`;
    effectLevelDepthRef.current.style.width = `${defaultEffectLevel}%`;
  }, [currentEffect]);

  return (
    <fieldset
      className={`img-upload__effect-level  effect-level  ${
        currentEffect === Effect.NONE ? `hidden` : ``
      }`}
    >
      <div className="effect-level__line" ref={effectLevelBarRef}>
        <div
          className="effect-level__pin"
          tabIndex="0"
          ref={effectLevelPinRef}
          onMouseDown={handleEffectLevelPinMove}
        >
          Кнопка изменения глубины эффекта фотографии
        </div>
        <div className="effect-level__depth" ref={effectLevelDepthRef}>
          Глубина эффекта фотографии
        </div>
      </div>
    </fieldset>
  );
};

// EffectsControls.whyDidYouRender = true;

EffectsControls.propTypes = {
  currentEffect: PropTypes.object.isRequired,
  defaultEffectLevel: PropTypes.number.isRequired,
  // currentEffectLevel: PropTypes.number.isRequired,
  effectLevelChangeHandler: PropTypes.func.isRequired,
};

export default EffectsControls;
