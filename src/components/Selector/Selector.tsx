import { useContext, useEffect, useState } from 'react';
import { PopoverPosition } from 'react-tiny-popover';
import PopMenu from '../PopMenu/PopMenu';
import { PopMenuContext } from "../PopMenu/PopMenuContext";
import styles from './Selector.module.css';


const SelectorOption = (props: {
  option: string,
  index: number,
  setValue: (val: number) => void,
}) => {
  const ctx = useContext(PopMenuContext);
  return (
    <div
      key={props.index}
      className={styles.option}
      onClick={() => { props.setValue(props.index); ctx.handlePopover(false); }}
    >
      {props.option}
    </div>
  );
};

const Selector = (props: {
  className?: any,
  defaultValue?: number,
  options: any[];
  icon?: any,
  positions?: PopoverPosition[],
  onSelect: (value: number) => void,
  onClick?: Function,
}) => {
  const [value, setValue] = useState(typeof props.defaultValue !== 'number' ? -1 : props.defaultValue);

  useEffect(() => {
    props.onSelect(+value);
  }, [value]);

  useEffect(() => {
    setValue(typeof props.defaultValue !== 'number' ? -1 : props.defaultValue);
  }, [props.defaultValue]);

  return (
    <PopMenu
      trigger={
        <div className={props.className} onClick={() => props.onClick && props.onClick()}>
          {props.icon}{props.options[value] || '-'}
        </div>
      }
      positions={props.positions || ['bottom', 'left']}
      useTools={false}
      content={
        <div className={styles.options_list}>
          {
            props.options.map((option, index) =>
              <SelectorOption option={option} index={index} setValue={setValue} />
            )
          }
        </div>
      }
    />
  );
};

export default Selector;