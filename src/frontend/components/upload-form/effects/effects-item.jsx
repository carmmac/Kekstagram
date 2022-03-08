import React from "react";
import PropTypes from "prop-types";
import {DEFAULT_EFFECT} from "../../../_const";
import {useDispatch} from 'react-redux';
import {effectSelect} from '../../../store/action';

const EffectItem = ({effect, currentEffect}) => {
  const dispatch = useDispatch();

  return (
    <a href="#" className="effects__item">
      <input
        type="radio"
        className="effects__radio  visually-hidden"
        name="effect"
        id={`effect-${effect.name}`}
        value={effect.value}
        defaultChecked={effect.name === currentEffect.name}
        onChange={() => dispatch(effectSelect(effect))}
      />
      <label htmlFor={`effect-${effect.name}`} className="effects__label">
        <span className={`effects__preview  effects__preview--${effect.name}`}>
          {effect.name === DEFAULT_EFFECT.name
            ? `Превью фото без эффекта`
            : `Превью эффекта ${effect.label}`}
        </span>
        {effect.label}
      </label>
    </a>
  );
};

EffectItem.propTypes = {
  effect: PropTypes.object.isRequired,
  currentEffect: PropTypes.object.isRequired,
};

export default EffectItem;
