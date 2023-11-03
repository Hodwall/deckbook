import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import useCardStore from '../../store/useCardStore';
import Button from '../Button/Button';
import CardTags from '../CardTags/CardTags';
import { MdClose } from 'react-icons/md';
import './CardDisplay.css';
import TagSearch from '../../sections/TagSearch/TagSearch';
import CardTextEditor from '../CardTextEditor/CardTextEditor';
import CardStats from '../CardStats/CardStats';
import UpdateCardDialog from '../UpdateCardDialog/UpdateCardDialog';


const CardDisplay = () => {
  const [section, setSection] = useState('text');
  const active_card = useCardStore((state) => state.active_card);

  const [setActiveCard, addTagToCard, deleteCard] = useCardStore((state) => [
    state.setActiveCard,
    state.addTagToCard,
    state.deleteCard
  ]);

  const cards = useCardStore((state) => state.cards);
  const card = cards.find((card) => card.id === active_card);

  const style = card?.background ? { background: `url(${card?.background}), rgba(40, 40, 40, 100%)` } : {};

  const animation = useSpring({
    y: active_card ? 0 : -20,
    opacity: active_card ? 1 : 0,
    config: { mass: 15, friction: 220, tension: 4000 }
  });

  const getSection = () => {
    switch (section) {
      case 'text':
        return <CardTextEditor />;
      case 'tags': {
        return (
          <div>
            <CardTags isEditMode />
            <TagSearch type="card" taggableElement={card} addHandler={addTagToCard} />
          </div>
        );
      }
      case 'stats': {
        return <CardStats cardId={card?.id || -1} />;
      }
    }
  };

  return (
    <animated.div
      className={`CardDisplay ${active_card ? '' : 'hidden'}`}
      style={{ ...animation, ...style }}
    >
      <div className={'card-display'}>
        <div className="card-header">
          <Button onClick={() => setActiveCard(null)}><MdClose /></Button>
        </div>
        <div className="card-img-space" />
        <div className="card-title">
          <div className="card-label">{card?.label}</div>
          <div className="card-description">{card?.description}</div>
          <div className="card-sections">
            <div className="card-section" onClick={() => setSection('text')}>TEXT</div>
            <div className="card-section" onClick={() => setSection('tags')}>TAGS</div>
            <div className="card-section" onClick={() => setSection('stats')}>STATS</div>
          </div>
        </div>
        <div className="card-content">
          {getSection()}
        </div>
        <div className="card-tools">
          <Button onClick={() => deleteCard(active_card || -1)}>DELETE CARD</Button>
          <UpdateCardDialog cardId={card?.id || -1} />
        </div>
      </div>
    </animated.div>
  );
};

export default CardDisplay;