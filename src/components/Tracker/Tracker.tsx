import { useState } from 'react';
import './Tracker.css';


const Tracker = (props: {
  label: string,
  maxValue: number,
}) => {
  const [value, setValue] = useState(25);

  let percentage = (value - props.maxValue) / (props.maxValue) * 100;

  console.log(props.label);

  return (
    <div className="Tracker">
      <div className="text">
        <div className="label-">{props.label}</div>
        <div className="value">
          <div className="current-value">{value}</div>/
          <div className="max-value">{props.maxValue}</div>
        </div>
      </div>
      <div className="progress">
        <div className="bar" style={{ width: `${percentage + props.maxValue}%` }} />
      </div>
    </div>
  );
};

export default Tracker;