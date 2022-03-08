import React from "react";
import EffectItem from "./effects-item";
import {Effect} from "../../../_const";
import {useSelector} from "react-redux";
import {getEffect} from "../../../store/selectors";

const EffectsList = () => {
  const currentEffect = useSelector((state) => getEffect(state));

  const effects = Object.keys(Effect);

  return (
    <ul className="effects__list">
      {effects.map((effect, i) => (
        <EffectItem
          effect={Effect[effect]}
          currentEffect={currentEffect}
          key={Effect[effect].name + i}
        />
      ))}
    </ul>
  );
};

export default EffectsList;
