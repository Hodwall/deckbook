import { forwardRef, useEffect, useImperativeHandle, useState, } from 'react';
import styles from '../CardContent.module.css';


export default forwardRef((props: any, ref: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => setSelectedIndex(0), [props.items]);

  const selectItem = (index: any) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }
      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }
      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }
      return false;
    },
  }));

  return (
    <div className={styles.mentionMenu}>
      {
        props.items.length
          ? props.items.map((item: any, index: any) => (
            <button
              className={index === selectedIndex ? 'is-selected' : ''}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item}
            </button>
          ))
          : <div className="item">No result</div>
      }
    </div>
  );
});