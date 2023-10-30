import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import './Dialog.css';


const Dialog = (props: {
  label: string,
  className?: string,
  display: boolean,
  setDisplay: (d: boolean) => void,
  tools?: any,
  children: any,
  icon: any,
}) => {
  const animation = useSpring({
    y: props.display ? 0 : -40,
    opacity: props.display ? 1 : 0,
    config: { mass: 15, friction: 220, tension: 6000 }
  });
  if (props.display) {
    return (
      <animated.div
        className={`Dialog ${props.display ? '' : 'hidden'} ${props.className ? props.className : ''}`}
        style={{ ...animation }}
      >
        <div className="dialog-header">
          <div className="icon">{props.icon}</div>
          <div className="label">{props.label}</div>
          <div className="controls">
            <button onClick={() => props.setDisplay(false)}><MdClose /></button>
          </div>
        </div>
        <div className="dialog-content">{props.children}</div>
        {
          props.tools &&
          <div className="dialog-tools">
            {props.tools}
          </div>
        }
      </animated.div>
    );
  } else {
    return null;
  }
};

export default Dialog;