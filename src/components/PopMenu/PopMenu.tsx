import { forwardRef, useState } from 'react';
import { PopMenuContext } from './PopMenuContext';
import { Popover, PopoverPosition } from 'react-tiny-popover';
import PopMenuAnimation from './PopMenuAnimation';
import { MdOutlineClose } from 'react-icons/md';
import './PopMenu.css';


const PopMenu = (props: {
  label: any,
  className?: string,
  positions?: PopoverPosition[];
  content?: any;
  clickHandler?: Function,
  highlighted?: boolean,
  useTools?: boolean,
  equalWidth?: boolean,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handlePopover = () => setIsPopoverOpen(!isPopoverOpen);

  if (props.content) {
    return (
      <Popover
        isOpen={isPopoverOpen}
        positions={props.positions || ['bottom', 'right']} // if you'd like, you can limit the positions
        align='start'
        padding={4} // adjust padding here!
        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
        content={({ childRect, position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
          <div className={props.className} >
            <PopMenuContext.Provider value={{ handlePopover }}>
              <PopMenuAnimation >
                {props.useTools &&
                  <div className={'tools'}>
                    <div onClick={handlePopover}><MdOutlineClose /></div>
                  </div>
                }
                <div className={'content'} style={(props.equalWidth ? { width: childRect.width } : {})}>
                  {props.content}
                </div>
              </PopMenuAnimation>
            </PopMenuContext.Provider>
          </div>
        )}
      >
        <div
          className={`popmenu-button ${props.highlighted ? 'highlighted' : ''}`}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <span>{props.label}</span>
        </div>
      </Popover>
    );
  } else {
    return (
      <div className={`button ${props.highlighted ? 'highlighted' : ''}`}>
        <span onClick={() => props.clickHandler && props.clickHandler()}>{props.label}</span>
      </div >
    );
  }
};

export default PopMenu;