import useNavigationStore from '../../store/useNavigationStore';
import { Tooltip } from 'react-tooltip';


const AppBarButton = (props: {
  section: string,
  children: any,
  disabled?: boolean,
}) => {
  const [section, setSection] = useNavigationStore((state) => [state.section, state.setSection]);
  return (
    <button
      className={`AppBarButton ${section.name === props.section ? 'active' : ''} ${props.disabled ? 'disabled' : ''}`}
      onClick={() => setSection(props.section)}
      data-tooltip-id="appbarbutton-tooltip"
      data-tooltip-content={props.section}
      data-tooltip-place={'right'}
    >
      {props.children}
      <Tooltip id="appbarbutton-tooltip" />
    </button>
  );
};

export default AppBarButton;