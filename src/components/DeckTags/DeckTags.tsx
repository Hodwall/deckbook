import useDeckStore from '../../store/useDeckStore';
import Tag from '../Tag/Tag';
import './DeckTags.css';


const DeckTags = (props: {
  isEditMode: boolean,
}) => {
  const active_deck = useDeckStore((state) => state.active_deck);
  const decks = useDeckStore((state) => state.decks);
  const removeTagFromDeck = useDeckStore((state) => state.removeTagFromDeck);
  const deck = decks.find((d) => d.id === active_deck);

  return (
    <div className="DeckTags">
      {deck?.tags.map((tag) => (
        <Tag
          id={tag.id}
          label={tag.label}
          className={`${props.isEditMode ? 'can-remove' : ''}`}
          onClick={() => {
            if (props.isEditMode) {
              removeTagFromDeck(deck.id, tag.id);
            }
          }}
        />)
      )}
    </div>
  );
};

export default DeckTags;