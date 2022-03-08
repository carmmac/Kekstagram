import React from "react";
import PropTypes from "prop-types";
import {getStyle} from "../../../_util";
// import {getEffect} from "../../../store/selectors";

const PreviewImage = ({effectLevel, currentScale, currentEffect}) => {
  // console.log(`PreviewImage`);
  // console.log(currentEffect);

  // const currentEffect = useSelector((state) => getEffect(state));

  return (
    <div className="img-upload__preview">
      <img
        // className={`effects__preview--${currentEffect.name}`}
        src="img/upload-default-image.jpg"
        alt="Предварительный просмотр фотографии"
        style={{
          transform: `scale(${currentScale / 100})`,
          filter: getStyle(currentEffect, effectLevel),
        }}
      />
    </div>
  );
};

// PreviewImage.whyDidYouRender = true;

PreviewImage.propTypes = {
  effectLevel: PropTypes.number.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentEffect: PropTypes.object.isRequired,
};

export default PreviewImage;
