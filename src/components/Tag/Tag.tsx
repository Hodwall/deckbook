import { useSpring, animated } from 'react-spring';
import './Tag.css';
import useCardStore from '../../store/useCardStore';
import useDeckStore from '../../store/useDeckStore';
import useTagStore from '../../store/useTagStore';


const Tag = (props: {
  label: string,
  className?: string,
  onClick?: any,
  canDelete?: boolean,
}) => {

  const animation = useSpring({
    from: { opacity: 0, y: -5 },
    to: { opacity: 1, y: 0 },
    config: { mass: 15, friction: 200, tension: 8000 }
  });

  return (
    <animated.div
      className={`Tag ${props.className ? props.className : ''}`}
      onClick={props.onClick}
      style={{ ...animation }}
    >
      {props.label}
      {/* {props.canDelete &&
        <button
          onClick={(e: any) => {
            e.stopPropagation();
            useTagStore.getState().deleteTag(props.id);
          }}>
          X
        </button>
      } */}
    </animated.div>
  );
};

export default Tag;