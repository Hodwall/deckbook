import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDeckStore from "../../../store/useDeckStore";
import Deck from "../../Deck/Deck";
import styles from '../AppBar.module.css';


const DeckPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deck_id = searchParams.get('deck');
  const decks = useDeckStore((state) => state.decks);
  const deck = useMemo(() => deck_id ? decks.find((d) => d.id === +deck_id) : null, [deck_id]);

  if (deck) {
    return (
      <div className={styles.DeckPanel}>
        <Deck data={deck} useCloseButton disableNavigation />
      </div>
    );
  }
};

export default DeckPanel;