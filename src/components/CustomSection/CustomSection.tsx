// import TagSearch from '../../sections/TagSearch';
import './CustomSection.css';
// import { useSpring, animated } from 'react-spring';


const CustomSection = (props: {
  section: string,
}) => {

  // const getSection = () => {
  //   switch (props.section) {
  //     case 'tags': return <TagSearch />;
  //     default: return null;
  //   }
  // };

  // const section = getSection();

  // const animation = useSpring({
  //   opacity: section ? 1 : 0,
  // });


  return (
    <h1>CustomSection</h1>
    // <animated.div className="CustomSection" style={{ ...animation }}>
    //   {getSection()}
    // </animated.div>
  );
};

export default CustomSection;