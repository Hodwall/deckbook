import { TbCardsFilled } from 'react-icons/tb';
import useCardStore from '../../store/useCardStore';
import { PopMenuContext } from '../PopMenu/PopMenuContext';
import styles from './CardToolbar.module.css';
import { useContext } from 'react';


const MenuCard = (props: {
  id: number;
  onSelect: (id: number) => void,
}) => {
  const cards = useCardStore((state) => state.cards,);
  const card = cards.find((c: any) => c.id === props.id);
  const menuCtx = useContext(PopMenuContext);

  if (card) {
    return (
      <div
        className={styles.MenuCard}
        onClick={() => {
          props.onSelect(props.id);
          menuCtx.handlePopover(false);
        }}
      >
        <span><TbCardsFilled />{card.label}</span>
        <div className={styles.backgroundImage} style={{ backgroundImage: `url(${card.background})` }} />
      </div>
    );
  }
};

export default MenuCard;