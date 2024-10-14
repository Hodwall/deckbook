import { BsPinAngleFill } from "react-icons/bs";
import { TbCardsFilled } from "react-icons/tb";
import useCardStore from "../../../store/useCardStore";
import styles from '../AppBar.module.css';
import useDeckStore from "../../../store/useDeckStore";
import { useNavigate } from "react-router-dom";

const PinnedDecksPanel = () => {
  const decks = useDeckStore((state) => state.decks);
  const pinned_decks = decks.filter((deck) => deck.isPinned);
  const navigate = useNavigate();

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <BsPinAngleFill />PINNED DECKS
      </div>
      <div className={styles.PinnedDecksPanel_list}>
        {
          pinned_decks.map((deck) =>
            <div
              className="deck-link"
              onClick={() => navigate(`/deckbook/cards?deck=${deck.id}`)}
            >
              <TbCardsFilled />{deck.label}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PinnedDecksPanel;