import React from "react";

import RCSlider, { type SliderRef as RCSliderRef } from "rc-slider";
import "rc-slider/assets/index.css";
import "./index.css";
import clsx from "clsx";

type ValueType = number | number[];

interface SliderProps {
    onChangeComplete?: (value: ValueType) => void;
    onChange?: (value: ValueType) => void;
    min?: number;
    max?: number;
    className?: string;
    ref?: React.Ref<RCSliderRef>;
    value?: number;
    disabled?: boolean;
}

const Slider = (props: SliderProps) => <RCSlider
    className={clsx("miko-slider", props.className)}

    onChangeComplete={props.onChangeComplete}
    onChange={props.onChange}

    min={props.min}
    max={props.max}
    ref={props.ref}

    value={props.value}
    disabled={props.disabled}
/>;

export default Slider;
