import React, { useRef, useState, useEffect } from "react";
import "../styles/test.css";
import { useContext } from "react";
import { DataContext } from "../context/dataContext";
const Test = () => {
  const { setInputMinG, setInputMaxG } = useContext(DataContext);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [offsetSliderWidth, setOffsetSliderWidth] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(40000);
  const [minValueBetween, setMinValueBetween] = useState(10);
  const [currentMin, setCurrentMin] = useState(0);
  const [inputMin, setInputMin] = useState(0);
  const [currentMax, setCurrentMax] = useState(10000);
  const [inputMax, setInputMax] = useState(10000);

  const minValueRef = useRef(null);
  const sliderRef = useRef(null);
  const maxValueRef = useRef(null);

  useEffect(() => {
    minValueRef.current.style.width = `${(currentMin * 100) / max}%`;
    maxValueRef.current.style.width = `${(currentMax * 100) / max}%`;

    setSliderWidth(sliderRef.current.offsetWidth);
    setOffsetSliderWidth(sliderRef.current.offsetLeft);
    setInputMinG(inputMin); 
    setInputMaxG(inputMax); 
  }, [currentMin, currentMax, max, inputMin, inputMax]);
  const setMinValue = (e) => {
    const inputMin = e.target.value;
    setInputMin(inputMin);

    if (inputMin >= min && inputMin <= currentMax - minValueBetween) {
      setCurrentMin(parseInt(inputMin));
      minValueRef.current.style.width = `${(inputMin * 100) / max}%`;
    }
  };

  const changeMinValue = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", onMouseMoveMin);
    document.addEventListener("mouseup", onMouseUpMin);
    document.addEventListener("touchmove", onMouseMoveMin);
    document.addEventListener("touchend", onMouseUpMin);
  };

  const onMouseMoveMin = (e) => {
    const dragedWidht = e.clientX - offsetSliderWidth;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;
    const newCurrentMin = parseInt((max * dragedWidhtInPercent) / 100);

    if (newCurrentMin >= min && newCurrentMin <= currentMax - minValueBetween) {
      minValueRef.current.style.width = `${dragedWidhtInPercent}%`;
      setCurrentMin(newCurrentMin);
      setInputMin(newCurrentMin);
    }
  };

  const onMouseUpMin = () => {
    document.removeEventListener("mouseup", onMouseUpMin);
    document.removeEventListener("mousemove", onMouseMoveMin);
    document.removeEventListener("touchend", onMouseUpMin);
    document.removeEventListener("touchmove", onMouseMoveMin);
  };

  const setMaxValue = (e) => {
    const inputMax = e.target.value;
    setInputMax(inputMax);

    if (inputMax >= currentMin + minValueBetween && inputMax <= max) {
      setCurrentMax(parseInt(inputMax));
      maxValueRef.current.style.width = `${(inputMax * 100) / max}%`;
    }
  };

  const changeMaxValue = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", onMouseMoveMax);
    document.addEventListener("mouseup", onMouseUpMax);
    document.addEventListener("touchmove", onMouseMoveMax);
    document.addEventListener("touchend", onMouseUpMax);
  };

  const onMouseMoveMax = (e) => {
    const dragedWidht = e.clientX - offsetSliderWidth;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;
    const newCurrentMax = Math.abs(
      parseInt((max * dragedWidhtInPercent) / 100)
    );

    if (newCurrentMax >= currentMin + minValueBetween && newCurrentMax <= max) {
      maxValueRef.current.style.width = `${dragedWidhtInPercent}%`;
      setCurrentMax(newCurrentMax);
      setInputMax(newCurrentMax);
    }
  };

  const onMouseUpMax = () => {
    document.removeEventListener("mouseup", onMouseUpMax);
    document.removeEventListener("mousemove", onMouseMoveMax);
    document.removeEventListener("touchend", onMouseUpMax);
    document.removeEventListener("touchmove", onMouseMoveMax);
  };

  const maxForMin = () => {
    return currentMax - minValueBetween;
  };

  const minForMax = () => {
    return currentMin + minValueBetween;
  };

  return (
    <div className="card">
      <h2>Price Range slider</h2>
      <div className="current-value">
        <label htmlFor="min-input">Min: </label>
        <input
          id="min-input"
          type="number"
          onChange={setMinValue}
          value={inputMin}
          min={min}
          max={maxForMin()}
        />
        <br />
        <label htmlFor="max-input">Max: </label>
        <input
          id="max-input"
          type="number"
          onChange={setMaxValue}
          value={inputMax}
          min={minForMax()}
          max={max}
        />
      </div>

      <div className="values">
        <div>{min}</div>
        <div>{max}</div>
      </div>

      <div ref={sliderRef} id="slider">
        <div ref={minValueRef} id="min" data-content={currentMin}>
          <div
            ref={minValueRef}
            id="min-drag"
            onMouseDown={changeMinValue}
            onTouchStart={changeMinValue}
          ></div>
        </div>

        <div ref={maxValueRef} id="max" data-content={currentMax}>
          <div
            ref={maxValueRef}
            id="max-drag"
            onMouseDown={changeMaxValue}
            onTouchStart={changeMaxValue}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Test;
