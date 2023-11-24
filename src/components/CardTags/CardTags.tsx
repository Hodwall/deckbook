import useCardStore from "../../store/useCardStore";
import Tag from "../Tag/Tag";
import './CardTags.css';


const CardTags = (props: {
  isEditMode?: boolean,
}) => {
  const active_card = useCardStore((state) => state.active_card);
  const cards = useCardStore((state) => state.cards);
  const card = cards.find((c) => c.id === active_card);
  const removeTagFromCard = useCardStore((state) => state.removeTagFromCard);

  return (
    <div className="CardTags">
      {
        card?.tags.map((tag) => (
          <Tag
            label={tag}
            className={`${props.isEditMode ? 'can-remove' : ''}`}
            onClick={() => {
              if (props.isEditMode) {
                removeTagFromCard(card.id, tag);
              }
            }}
          />
        ))
      }
    </div>
  );
};

export default CardTags;