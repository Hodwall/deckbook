import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useSetStore from "../../store/useSetStore";
import useDeckStore from "../../store/useDeckStore";
import styles from './BackgroundImage.module.css';


const BackgroundImage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sets = useSetStore((state) => state.sets);
  const decks = useDeckStore((state) => state.decks);
  const set_id = searchParams.get('set');
  const set = useMemo(() => set_id ? sets.find((c) => c.id === +set_id) : null, [set_id]);
  const deck_id = searchParams.get('deck');
  const deck = useMemo(() => deck_id ? decks.find((d) => d.id === +deck_id) : null, [deck_id]);

  const background = useMemo(() => {
    if (set) return set.background;
    else if (deck) return deck.background;
    else return null;
  }, [set, deck]);

  if (background) {
    return <img className={styles.BackgroundImage} src={background} />;
  }
};

export default BackgroundImage;