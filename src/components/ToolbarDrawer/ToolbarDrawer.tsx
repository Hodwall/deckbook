import './ToolbarDrawer.css';


const ToolbarDrawer = (props: {
  children: any,
}) => {
  return (
    <div className={'ToolbarDrawer'}>
      {props.children}
    </div>
  );
};

export default ToolbarDrawer;