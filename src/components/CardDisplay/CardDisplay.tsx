import { useState, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import useCardStore from '../../store/useCardStore';
import useCollectionStore from '../../store/useCollectionStore';
import useNavigationStore from '../../store/useNavigationStore';
import TagSearch from '../../sections/TagSearch/TagSearch';
import CardStats from '../CardStats/CardStats';
import CardTags from '../CardTags/CardTags';
import CardTextEditor from '../CardTextEditor/CardTextEditor';
import Selector from '../Selector/Selector';
import UpdateCardDialog from '../UpdateCardDialog/UpdateCardDialog';
import { MdClose, MdCollectionsBookmark, MdDelete, MdFileCopy, MdEdit } from 'react-icons/md';
import { BsFillPinAngleFill } from 'react-icons/bs';
import './CardDisplay.css';


const CardDisplay = () => {
  const [section, setSection] = useState(0);
  const [displayMode, setDisplayMode] = useState(true);
  const [
    cards,
    active_card,
    setActiveCard,
    addTagToCard,
    addCard,
    deleteCard,
    updateCard,
    togglePinCard,
    setCardType,
    setCardTypeData
  ] = useCardStore((state) => [
    state.cards,
    state.active_card,
    state.setActiveCard,
    state.addTagToCard,
    state.addCard,
    state.deleteCard,
    state.updateCard,
    state.togglePinCard,
    state.setCardType,
    state.setCardTypeData
  ]);
  const card = cards.find((card) => card.id === active_card);
  const app_section = useNavigationStore((state) => state.section);
  const collections = useCollectionStore((state) => state.collections);
  const collection = collections.find((c) => c.id === card?.collection_id);
  const style = card?.background ? { background: `url(${card?.background}), rgba(40, 40, 40, 100%)` } : {};

  useEffect(() => {
    setActiveCard(null);
  }, [app_section]);

  useEffect(() => {
    setSection(0);
  }, [card]);

  const handleAddTag = (tag: string) => {
    if (card) addTagToCard(card.id, tag);
  };

  const handleChangeCollection = (collection_id: number) => {
    if (card) updateCard(card.id, card.label, card.description, card.background, collection_id);
  };

  const handlePin = (e: any) => {
    e.stopPropagation();
    if (card) togglePinCard(card.id);
  };

  const animation = useSpring({
    y: active_card ? 0 : -20,
    opacity: active_card ? 1 : 0,
    rotateZ: active_card ? 1 : 1,
    config: { mass: 15, friction: 220, tension: 4000 }
  });

  const sections: { [key: string]: any; } = useMemo(() => {
    return {
      'text': { label: 'text', component: <CardTextEditor /> },
      'tags': {
        label: 'tags', component:
          <div>
            <CardTags isEditMode />
            <TagSearch activeTags={[...card?.tags || []]} addHandler={handleAddTag} canCreate />
          </div>
      },
      'stats': { label: 'stats', component: <CardStats cardId={card?.id || -1} /> }
    };
  }, [card]);

  const card_sections = useMemo(() => {
    switch (card?.type) {
      case 'item': return [sections.text, sections.stats];
      default: return [sections.text, sections.tags, sections.stats];
    }
  }, [cards]);

  const card_type_options = ['-', 'item', 'location', 'spell'];
  const collection_options = collections.map((c) => c.label);

  return (
    <animated.div className={`CardDisplay ${active_card ? '' : 'hidden'} ${displayMode ? 'display-mode' : ''}`} style={{ ...animation, ...style }}>
      <div>
        <div className="card-header">
          <button onClick={() => setActiveCard(null)}><MdClose /></button>
          <button onClick={handlePin} className={`${card?.isPinned ? 'active' : ''}`}><BsFillPinAngleFill /></button>
          <div className="card-sections">
            {card_sections.map((s, index) => <div className="card-section" onClick={() => setSection(index)}>{s.label}</div>)}
          </div>
        </div>
        <div className="card-title">
          <div className="card-label">{card?.label}</div>
          <div className="card-description">{card?.description}</div>
          <div className="separator"></div>
        </div>
        <div className="card-content">
          {card_sections[section].component}
        </div>
        <div className="card-tools">
          <button onClick={() => setDisplayMode(!displayMode)}>{displayMode ? 'D' : 'E'}</button>
          {
            displayMode && (
              <>
                <button className="delete-collection" onClick={() => deleteCard(active_card || -1)}><MdDelete /></button>
                <button className="copy-collection" onClick={() => {
                  if (card) addCard({ ...card, id: Date.now() });
                }}>
                  <MdFileCopy />
                </button>
                <UpdateCardDialog cardId={card?.id || -1} />
                <div>
                  <Selector
                    className="selector-card-type"
                    defaultValue={card_type_options.findIndex((o: any) => o === card?.type) || 0}
                    options={card_type_options}
                    positions={['top']}
                    onSelect={(val) => {
                      setCardType(card?.id || -1, card_type_options[val]);
                      setCardTypeData(card?.id || -1, null);
                    }}
                  />
                  <Selector
                    className="selector-card-collection"
                    defaultValue={collection_options.findIndex((c) => c === collection?.label)}
                    options={collection_options}
                    icon={<MdCollectionsBookmark />}
                    positions={['top']}
                    onSelect={(val) => {
                      let collection_id = collections.find((c) => c.label === collection_options[val])?.id;
                      handleChangeCollection(collection_id || -1);
                    }}
                  />
                </div>
              </>
            )
          }
        </div>
      </div>
    </animated.div>
  );
};

export default CardDisplay;