import { useState } from 'react';
import './Toolbar.css';
import { animated, useSpring } from 'react-spring';


const Toolbar = (props: {
  startElements?: (JSX.Element | { content: JSX.Element, label: string, onClick?: Function; })[],
  endElements?: (JSX.Element | { content: JSX.Element, label: string, onClick?: Function; })[],
}) => {
  const [drawerContent, setDrawerContent] = useState(null);

  const animation = useSpring({
    height: drawerContent ? 100 : 0,
    opacity: drawerContent ? 1 : 0,
    config: { mass: 15, friction: 300, tension: 2000 }
  });

  return (
    <div className="Toolbar">
      <div className="toolbar-start">
        {props.startElements && props.startElements.map((element: any) =>
          (element.content)
            ? <button onClick={() => {
              if (drawerContent) setDrawerContent(null);
              else setDrawerContent(element.content);
              if (element.onClick) element.onClick();
            }}>
              {element.label}
            </button>
            : element
        )}
      </div>
      <div className="toolbar-end">
        {props.endElements && props.endElements.map((element: any) =>
          (element.content)
            ? <button onClick={() => {
              if (drawerContent) setDrawerContent(null);
              else setDrawerContent(element.content);
              if (element.onClick) element.onClick();
            }}>
              element.label
            </button>
            : element
        )}
      </div>
      <animated.div className={`toolbar-drawer ${!drawerContent && 'hidden'}`} style={{ ...animation }}>
        {drawerContent}
      </animated.div>
    </div>
  );
};

export default Toolbar;