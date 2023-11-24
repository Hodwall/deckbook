import useDeckStore from '../../store/useDeckStore';
import Tag from '../Tag/Tag';
import './DeckTags.css';


const DeckTags = (props: {
  isEditMode: boolean,
}) => {
  const active_deck = useDeckStore((state) => state.active_deck);
  const decks = useDeckStore((state) => state.decks);
  const deck = decks.find((d) => d.id === active_deck);
  const removeTagFromDeck = useDeckStore((state) => state.removeTagFromDeck);

  return (
    <div className="DeckTags">
      {deck?.tags.map((tag) => (
        <Tag
          label={tag}
          className={`${props.isEditMode ? 'can-remove' : ''}`}
          onClick={() => {
            if (props.isEditMode) {
              removeTagFromDeck(deck.id, tag);
            }
          }}
        />)
      )}
    </div>
  );
};

export default DeckTags;