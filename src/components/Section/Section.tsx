import './Section.css';


const Section = (props: {
  children: any,
}) => {
  return (
    <div className={'section'}>
      {props.children}
    </div>
  );
};

export default Section;