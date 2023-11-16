import { useState, useEffect } from 'react';


const Selector = (props: {
  defaultValue?: number,
  label: string,
  options: string[];
  onSelect: (value: number) => void,
}) => {
  const [value, setValue] = useState(props.defaultValue || -1);

  useEffect(() => {
    props.onSelect(+value);
  }, [value]);

  return (
    <div className={'Selector'}>
      <div className="label">{props.label}</div>
      <select value={value} onChange={(e: any) => setValue(e.target.value)}>
        {props.options.map((option, index) => <option value={index}>{option}</option>)}
      </select>
    </div>
  );
};

export default Selector;