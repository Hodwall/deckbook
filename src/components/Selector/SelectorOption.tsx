import { useContext } from "react";
import { PopMenuContext } from "../PopMenu/PopMenuContext";

const SelectorOption = (props: {
  label: string,
  onClick: Function;
}) => {
  const ctx = useContext(PopMenuContext);
  return (
    <div
      className="selector-option"
      onClick={() => {
        props.onClick();
        ctx.handlePopover();
      }}>
      {props.label}
    </div>
  );
};

export default SelectorOption;