import { useState, useEffect, useRef } from 'react';
import { PopoverPosition } from 'react-tiny-popover';
import PopMenu from '../PopMenu/PopMenu';
import SelectorOption from './SelectorOption';
import './Selector.css';


const Selector = (props: {
  className?: string,
  defaultValue?: number,
  label?: string,
  icon?: any,
  options: string[];
  positions?: PopoverPosition[],
  onSelect: (value: number) => void,
}) => {
  const [value, setValue] = useState(typeof props.defaultValue !== 'number' ? -1 : props.defaultValue);

  useEffect(() => {
    props.onSelect(+value);
  }, [value]);

  useEffect(() => {
    setValue(typeof props.defaultValue !== 'number' ? -1 : props.defaultValue);
  }, [props.defaultValue]);

  return (
    <div className={`Selector ${props.className}`}>
      {props.label && <div className="label">{props.icon}{props.label}</div>}
      <PopMenu
        label={<>{props.icon}{props.options[value] || '-'}</>}
        className={`popmenu-selector ${props.className}`}
        positions={props.positions || ['bottom', 'left']}
        useTools={false}
        content={
          props.options.map((option, index) =>
            <SelectorOption label={option} onClick={() => setValue(index)} />
          )
        }
      />
    </div>
  );
};

export default Selector;