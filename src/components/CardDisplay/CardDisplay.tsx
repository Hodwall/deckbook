import { useEffect, useMemo, useState } from 'react';
import Draggable from 'react-draggable';
import { animated, useTransition } from 'react-spring';
import useCardStore from '../../store/useCardStore';
import CardContent from '../CardContent/CardContent';
import CardToolbar from '../CardToolbar/CardToolbar';
import styles from './CardDisplay.module.css';


const CardDisplay = () => {
  const [cards, active_cards] = useCardStore((state) => [state.cards, state.active_cards]);
  const [cardsStack, setCardsStack] = useState<number[]>([]);
  const cards_data: any[] = useMemo(() => active_cards.map((card_id) => cards.find((card) => card.id === card_id)), [cards, active_cards]);

  useEffect(() => {
    const new_cards = cards_data.reduce((acc: number[], current: any) => {
      if (!cardsStack.includes(current.id)) acc.push(current.id);
      return acc;
    }, []);
    setCardsStack([...cardsStack, ...new_cards]);
  }, [cards_data, active_cards]);

  const handleBringToFront = (card_id: number) => {
    const cards_stack = cardsStack.filter((id) => id !== card_id);
    cards_stack.push(card_id);
    setCardsStack([...cards_stack]);
  };

  const transition_config = { mass: 15, friction: 450, tension: 6000 };
  const transitions = useTransition(cards_data, {
    from: { y: -40, opacity: 0, scale: 1.05, rotateZ: 0, config: transition_config },
    leave: { y: -40, opacity: 0, scale: 1, rotateZ: 0, config: transition_config },
    enter: { y: 0, opacity: 1, scale: 1, rotateZ: 0, config: transition_config },
  });

  return (
    <>
      {
        transitions((transition_style, card) => (
          <Draggable
            defaultPosition={{ x: Math.random() * 50, y: Math.random() * 50 }}
            onStart={() => handleBringToFront(card.id)}
            cancel='.non-draggable, button'
          >
            <animated.div
              className={styles.CardDisplay}
              onClick={() => handleBringToFront(card.id)}
              style={{ zIndex: 9999 + cardsStack.findIndex((id) => id === card.id), ...transition_style }}
            >
              <CardContent data={card} />
              <div className={styles.bgImage} style={card?.background ? { backgroundImage: `url(${card?.background})` } : {}} />
            </animated.div>
          </Draggable>
        ))
      }
      <CardToolbar handleBringToFront={handleBringToFront} />
    </>
  );
};

export default CardDisplay;