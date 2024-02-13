import './Toolbar.css';


const Toolbar = (props: {
  children: any,
}) => {
  return (
    <div className="Toolbar">
      {props.children}
    </div>
  );
};

export default Toolbar;