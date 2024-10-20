import { BsPinAngleFill } from "react-icons/bs";
import { TbCardsFilled } from "react-icons/tb";
import useCardStore from "../../../store/useCardStore";
import styles from '../AppBar.module.css';

const PinnedCardsPanel = () => {
  const [cards, setActiveWideCard, setActiveCard] = useCardStore((state) => [state.cards, state.setActiveWideCard, state.setActiveCard]);
  const pinned_cards = cards.filter((card) => card.isPinned).toSorted((a, b) => a.label < b.label ? -1 : 1);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <BsPinAngleFill />PINNED CARDS
      </div>
      <div className={styles.PinnedCardsPanel_list}>
        {
          pinned_cards.map((card) =>
            <div
              className="card-link"
              onClick={() => card.isWide ? setActiveWideCard(card.id) : setActiveCard(card.id)}
            >
              <TbCardsFilled />{card.label}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PinnedCardsPanel;