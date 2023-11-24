import './Button.css';


const Button = (props: {
  onClick: any,
  disabled?: boolean,
  style?: string,
  children: JSX.Element | string,
}) => {
  return (
    <span>REPLACE</span>
    // <button
    //     className={`Button ${props.style ? props.style : 'standard'} ${props.disabled ? 'disabled' : ''}`}
    //     onClick={props.onClick}
    // >
    //     {props.children}
    // </button>
  );
};

export default Button;