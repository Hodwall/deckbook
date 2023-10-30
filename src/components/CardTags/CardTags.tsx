import useCardStore from "../../store/useCardStore";
import Tag from "../Tag/Tag";
import './CardTags.css';


const CardTags = (props: {
  isEditMode?: boolean,
}) => {
  const active_card = useCardStore((state) => state.active_card);
  const cards = useCardStore((state) => state.cards);
  const removeTagFromCard = useCardStore((state) => state.removeTagFromCard);
  const card = cards.find((c) => c.id === active_card);

  return (
    <div className="CardTags">
      {
        card?.tags.map((tag) => (
          <Tag
            id={tag.id}
            label={tag.label}
            className={`${props.isEditMode ? 'can-remove' : ''}`}
            onClick={() => {
              if (props.isEditMode) {
                removeTagFromCard(card.id, tag.id);
              }
            }}
          />
        ))
      }
    </div>
  );
};

export default CardTags;