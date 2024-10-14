import { useSpring, animated } from 'react-spring';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import styles from './Dialog.module.css';


interface ITools {
  label: string,
  onClick: Function,
  disabled?: boolean,
  dismissDialog?: boolean,
}

const Dialog = (props: {
  backgroundImage?: string;
  children: JSX.Element | string,
  height?: string,
  icon?: any,
  label?: string,
  tools?: ITools[],
  width?: string,
  trigger: JSX.Element,
  controls?: JSX.Element[],
  onDismiss?: Function,
  onDisplay?: Function,
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const animation = useSpring({
    y: open ? 0 : -40,
    opacity: open ? 1 : 0,
    config: { mass: 20, friction: 250, tension: 4000 },
  });
  const style = props.backgroundImage ? { backgroundImage: `url(${props.backgroundImage})` } : {};
  const root: any = document.getElementsByClassName('app-content')[0];

  useEffect(() => {
    if (open && props.onDisplay) props.onDisplay();
    else if (!open && props.onDismiss) props.onDismiss();
  }, [open]);

  return (
    <>
      <div
        onClick={(e: any) => {
          if (!props.disabled) {
            e.stopPropagation();
            setOpen(true);
          }
        }}
      >
        {props.trigger}
      </div>
      {
        open && root && createPortal(
          <animated.div
            className={`${styles.Dialog} non-draggable`}
            style={{ ...animation, ...style, height: props.height, width: props.width }}
            onClick={(e: any) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div>
                <div className="icon">{props.icon}</div>
                <div className={styles.header__label}>{props.label}</div>
              </div>
              <div>
                {props.controls && props.controls.map((c) => c)}
                <button className="transparent-button" onClick={() => setOpen(false)}><MdClose /></button>
              </div>
            </div>
            <div className={styles.content}>
              {props.children}
            </div>
            {
              props.tools &&
              <div className={styles.tools}>
                {
                  props.tools.map((tool: any) =>
                    <button
                      onClick={() => {
                        tool.onClick && tool.onClick();
                        tool.dismissDialog && setOpen(false);
                      }}
                      disabled={tool.disabled}
                    >
                      {tool.label}
                    </button>
                  )
                }
              </div>
            }
          </animated.div>
          , root)
      }
    </>
  );
};

export default Dialog;