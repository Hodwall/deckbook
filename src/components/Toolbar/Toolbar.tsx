import './Toolbar.css';


const Toolbar = (props: {
  children: any,
}) => {
  return (
    <div className="Toolbar">
      <div className="separator" />
      {props.children}
      <div className="separator" />
    </div>
  );
};

export default Toolbar;