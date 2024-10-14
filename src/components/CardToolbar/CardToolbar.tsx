import { MdArrowDownward, MdArrowUpward, MdClose } from "react-icons/md";
import { TbCardsFilled } from "react-icons/tb";
import { animated, useSpring } from 'react-spring';
import useCardStore from '../../store/useCardStore';
import PopMenu from '../PopMenu/PopMenu';
import styles from './CardToolbar.module.css';
import MenuCard from './MenuCard';


const CardToolbar = (props: {
  handleBringToFront: (id: number) => void,
}) => {
  const [active_cards, active_wide_card, hand_cards, drawCardFromHand, addAllCardsToHand, drawAllCardsFromHand, emptyHand] = useCardStore((state) => [
    state.active_cards,
    state.active_wide_card,
    state.hand_cards,
    state.drawCardFromHand,
    state.addAllCardsToHand,
    state.drawAllCardsFromHand,
    state.emptyHand
  ]);

  console.log(active_cards);

  const animation = useSpring({
    opacity: hand_cards.length > 0 ? 1 : 0,
    config: { mass: 50, friction: 600, tension: 4000 }
  });

  return (
    <div className={styles.CardToolbar}>
      {(active_cards.length > 0 || active_wide_card || hand_cards.length > 0) && <button className={styles.toolbarBtn} onClick={addAllCardsToHand}><MdArrowDownward /></button>}
      {
        hand_cards.length > 0 &&
        <animated.div style={animation}>
          <PopMenu
            padding={8}
            trigger={
              <div className={`${styles.toolbarBtn} ${styles.wide}`}>
                <TbCardsFilled />{hand_cards.length}
              </div>
            }
            positions={['top', 'left']}
            direction="top"
            content={
              <div className={styles.list}>
                {
                  hand_cards.map((card_id) => <MenuCard id={card_id} onSelect={drawCardFromHand} />)
                }
              </div>
            }
          />
          <button className={styles.toolbarBtn} onClick={drawAllCardsFromHand}><MdArrowUpward /></button>
          <button className={styles.toolbarBtn} onClick={emptyHand}><MdClose /></button>
          <div className={styles.background} />
        </animated.div>
      }
    </div>
  );
};

export default CardToolbar;