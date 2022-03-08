import React from "react";
import PropTypes from "prop-types";
import {SCALE_CHANGE_STEP} from "../../../_const";

const MIN_SCALE_LIMIT = 50;
const MAX_SCALE_LIMIT = 100;

const ScaleControls = ({currentScale, scaleChangeHandler}) => {

  return (
    <fieldset className="img-upload__scale  scale">
      <button
        type="button"
        className="scale__control  scale__control--smaller"
        disabled={currentScale < MIN_SCALE_LIMIT}
        onClick={() => {
          if (currentScale >= MIN_SCALE_LIMIT) {
            scaleChangeHandler(-SCALE_CHANGE_STEP);
          }
        }}
      >
        Уменьшить
      </button>
      <input
        type="text"
        className="scale__control  scale__control--value"
        value={`${currentScale}%`}
        title="Image Scale"
        name="scale"
        readOnly
      />
      <button
        type="button"
        className="scale__control  scale__control--bigger"
        disabled={currentScale === MAX_SCALE_LIMIT}
        onClick={() => {
          if (currentScale < MAX_SCALE_LIMIT) {
            scaleChangeHandler(SCALE_CHANGE_STEP);
          }
        }}
      >
        Увеличить
      </button>
    </fieldset>
  );
};

// ScaleControls.whyDidYouRender = true;

ScaleControls.propTypes = {
  currentScale: PropTypes.number.isRequired,
  scaleChangeHandler: PropTypes.func.isRequired,
};

export default ScaleControls;
