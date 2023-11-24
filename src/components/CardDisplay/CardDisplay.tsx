import { useState, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import useCardStore from '../../store/useCardStore';
import useCollectionStore from '../../store/useCollectionStore';
import useNavigationStore from '../../store/useNavigationStore';
import TagSearch from '../../sections/TagSearch/TagSearch';
import CardStats from '../CardStats/CardStats';
import CardTags from '../CardTags/CardTags';
import CardTextEditor from '../CardTextEditor/CardTextEditor';
import UpdateCardDialog from '../UpdateCardDialog/UpdateCardDialog';
import { MdClose } from 'react-icons/md';
import './CardDisplay.css';


const CardDisplay = () => {
  const [section, setSection] = useState('text');
  const app_section = useNavigationStore((state) => state.section);
  const [active_card, setActiveCard, addTagToCard, deleteCard, updateCard] = useCardStore((state) => [
    state.active_card,
    state.setActiveCard,
    state.addTagToCard,
    state.deleteCard,
    state.updateCard
  ]);
  const cards = useCardStore((state) => state.cards);
  const card = cards.find((card) => card.id === active_card);
  const collections = useCollectionStore((state) => state.collections);
  const collection = collections.find((c) => c.id === card?.collection_id);
  const style = card?.background ? { background: `url(${card?.background}), rgba(40, 40, 40, 100%)` } : {};

  const animation = useSpring({
    y: active_card ? 0 : -20,
    opacity: active_card ? 1 : 0,
    config: { mass: 15, friction: 220, tension: 4000 }
  });

  useEffect(() => {
    setActiveCard(null);
  }, [app_section]);

  const handleAddTag = (tag: string) => {
    if (card) addTagToCard(card.id, tag);
  };

  const sections: { [key: string]: JSX.Element; } = useMemo(() => {
    return {
      'text': <CardTextEditor />,
      'tags': (
        <div>
          <CardTags isEditMode />
          <TagSearch activeTags={[...card?.tags || []]} addHandler={handleAddTag} canCreate />
        </div>
      ),
      'stats': <CardStats cardId={card?.id || -1} />
    };
  }, [card]);

  const handleChangeCollection = (e: any) => {
    if (card) {
      updateCard(card.id, card.label, card.description, card.background, +e.target.value);
    }
  };

  return (
    <animated.div
      className={`CardDisplay ${active_card ? '' : 'hidden'}`}
      style={{ ...animation, ...style }}
    >
      <div className={'card-display'}>
        <div className="card-header">
          <button onClick={() => setActiveCard(null)}><MdClose /></button>
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
          {sections[section]}
        </div>
        <div className="card-tools">
          <button className="delete-collection" onClick={() => deleteCard(active_card || -1)}>DELETE CARD</button>
          <UpdateCardDialog cardId={card?.id || -1} />
          <select className="card-collection" value={collection?.id} onChange={handleChangeCollection}>
            {
              collections.map((collection) => <option value={collection.id}><span>{collection.label}</span></option>)
            }
          </select>
        </div>
      </div>
    </animated.div>
  );
};

export default CardDisplay;