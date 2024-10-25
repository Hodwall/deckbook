import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, mergeAttributes, useEditor, Node, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { MdArrowDownward, MdArticle, MdAutoStories, MdChromeReaderMode, MdClose, MdDelete, MdDescription, MdFileCopy, MdLabel } from 'react-icons/md';
import { PiPencilSimpleLineFill, PiPencilSimpleSlashFill } from "react-icons/pi";
import ImageResize from 'tiptap-extension-resize-image';
import TagSearch from '../TagSearch/TagSearch';
import useCardStore, { ICard } from '../../store/useCardStore';
import useSetStore from '../../store/useSetStore';
import Selector from '../Selector/Selector';
import Tag from '../Tag/Tag';
import styles from './CardContent.module.css';
import cardMentionsMenu from './components/cardMentionsMenu';
import MenuBar from './components/MenuBar';
import { TableOfContents as ToC } from './components/TableOfContents';
import UpdateCardDialog from './UpdateCardDialog';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';


const MemorizedToC = memo(ToC);

const CardContent = (props: {
  data: ICard,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [section, setSection] = useState(0);
  const [cardMentionsChoices, setCardMentionsChoices] = useState<any>(cardMentionsMenu);
  const [tableOfContentsItems, setTableOfContentsItems] = useState<any>([]);
  const [
    cards,
    addTagToCard,
    removeTagFromCard,
    addCard,
    deleteCard,
    updateCard,
    togglePinCard,
    addContentToCard,
    toggleWideCard,
    removeActiveCard,
    setActiveWideCard,
    setActiveCard,
    addCardToHand
  ] = useCardStore((state) => [
    state.cards,
    state.addTagToCard,
    state.removeTagFromCard,
    state.addCard,
    state.deleteCard,
    state.updateCard,
    state.togglePinCard,
    state.addContentToCard,
    state.toggleWideCard,
    state.removeActiveCard,
    state.setActiveWideCard,
    state.setActiveCard,
    state.addCardToHand
  ]);
  const card = useMemo(() => cards.find((card) => card.id === props.data.id), [cards, props.data.id]);
  const sets = useSetStore((state) => state.sets);
  const set = sets.find((s) => s.id === card?.set_id);
  const set_options = sets.map((s) => s.label);
  const ref: any = useRef(null);

  /* EMBEDDED CARD MENTIONS EFFECTS */
  // Event handler when clicking a mention. It adds the mentioned card to the corresponding active cards list.
  const handleMentionClick = useCallback((e: any) => {
    if (e.target.className === 'card-mention') {
      e.stopPropagation();
      let card = cards.find((c) => c.label === e.target.attributes['data-id'].value);
      if (card) {
        if (card.isWide) setActiveWideCard(card.id);
        else setActiveCard(card.id);
      }
    }
  }, []);

  // Attach the mention handler event function to the CardContent component.
  useEffect(() => {
    ref && ref.current.addEventListener('click', handleMentionClick);
  }, [cardMentionsChoices]);

  // Update the available list of cards for mention insertion each time the cards store is updated.
  useEffect(() => {
    let updateCards = false;
    if (!cardMentionsChoices.cards || cardMentionsChoices.cards.length !== cards.length) {
      updateCards = true;
    } else {
      for (let i = 0; i < cards.length; i++) {
        if (cardMentionsChoices.cards[i] !== cards[i].id) {
          updateCards = true;
        }
      }
    }
    if (updateCards) {
      setCardMentionsChoices(() => {
        return {
          ...cardMentionsChoices,
          items: ({ query }: any) => {
            return cards.map((card: ICard) => card.label)
              .filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
              .slice(0, 5);
          },
          cards: cards.map((card: ICard) => card.id)
        };
      });
    }
  }, [cards]);

  /* HANDLERS */
  const handlePin = () => {
    if (card) togglePinCard(card.id);
  };

  const handleChangeSet = (set_id: number) => {
    if (card) updateCard(card.id, card.label, card.description, card.background, card.background_alt, set_id);
  };


  const TestNode = Node.create({
    addNodeView() {
      return ReactNodeViewRenderer(<div>A CUSTOM NODE HERE!</div>);
    }
  });

  const Treasure = Paragraph.extend({
    name: 'treasure',
    group: 'block',
    content: 'block+',
    draggable: true,
    parseHTML() {
      return [{ tag: 'p.treasure' }];
    },
    renderHTML({ HTMLAttributes }) {
      return ['p', mergeAttributes(HTMLAttributes, { class: 'treasure' }), 0];
    },
    addAttributes() {
      return {
        class: {
          default: null,
        },
      };
    },
  });


  /* TEXT EDITOR (TIPTAP) */
  const extensions: any = [
    StarterKit.configure({
      bulletList: { keepMarks: true, keepAttributes: false, },
      orderedList: { keepMarks: true, keepAttributes: false, },
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    Document,
    Dropcursor,
    Gapcursor,
    Highlight,
    Image,
    Treasure,
    ImageResize,
    Mention.configure({
      suggestion: cardMentionsChoices,
      renderHTML({ options, node }) {
        return [
          'span',
          mergeAttributes({ class: 'card-mention' }, options.HTMLAttributes),
          `${node.attrs.label ?? node.attrs.id}`,
        ];
      },
    }),
    Paragraph,
    Table.configure({
      resizable: editMode,
      lastColumnResizable: false,
      HTMLAttributes: { width: '100%' }
    }),
    TableCell,
    TableHeader,
    TableRow,
    TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
      onUpdate(content) {
        setTableOfContentsItems(content);
      },
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Text,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyle
  ];

  const editor = useEditor({
    extensions,
    content: JSON.parse(props.data.content),
    onUpdate: ({ editor }) => card && addContentToCard(card?.id, JSON.stringify(editor.getJSON())),
    editorProps: {
      attributes: {
        class: `focus:outline-none non-draggable ${editMode && 'edit-active'}`,
      },
    }
  }, [card, cardMentionsChoices, ref, editMode]);

  useEffect(() => {
    editor?.setEditable(editMode);
  }, [editor, editMode]);

  /* RENDER */
  const sections = [
    { label: <MdArticle />, component: <EditorContent editor={editor} /> },
    {
      label: <MdLabel />,
      component:
        <>
          <div className={styles.tag_list}>
            {card?.tags.map((tag) => (<Tag label={tag} onClick={() => removeTagFromCard(card.id, tag)} />))}
          </div>
          <div>
            <TagSearch
              activeTags={[...card?.tags || []]}
              addHandler={(tag: string) => card && addTagToCard(card.id, tag)}
              canCreate
            />
          </div>
        </>
    },
  ];

  return (
    <div className={styles.CardContent} ref={ref}>
      {props.data.isWide &&
        <div className={styles.table_of_contents}>
          <MemorizedToC editor={editor} items={tableOfContentsItems} />
        </div>
      }
      <section className={`${styles.main} card-main`}>
        <div className={styles.header}>
          {
            sections.map((s, index) => <button className={`transparent-button non-draggable ${section === index ? 'active' : ''}`} onClick={() => setSection(index)} > {s.label} </button>)
          }
          <div>
            <button
              className="transparent-button non-draggable"
              onClick={() => card && addCardToHand(card.id)}
            >
              <MdArrowDownward />
            </button>
            <button
              className={`transparent-button non-draggable ${card?.isPinned ? 'active' : ''}`}
              onClick={handlePin}
            >
              <BsFillPinAngleFill />
            </button>
            <button
              className="transparent-button non-draggable"
              onClick={() => card && toggleWideCard(card.id)}
            >
              {card?.isWide ? <MdDescription /> : <MdChromeReaderMode />}
            </button>
            <button
              className="transparent-button non-draggable"
              onClick={() => card?.isWide ? setActiveWideCard(null) : removeActiveCard(props.data.id)}
            >
              <MdClose />
            </button>
          </div>
        </div>
        <div className={`${styles.title} ${props.data.isWide && styles.title_wide}`}>
          <div className={styles.title__label}>{card?.label}</div>
          <div className={styles.title__description}>{card?.description}</div>
          <div className={styles.title__separator}></div>
        </div>
        <div className={styles.body}>
          {sections[section].component}
        </div>
      </section>
      <section className={styles.footer}>
        <button onClick={() => setEditMode(!editMode)}>{editMode ? <PiPencilSimpleSlashFill /> : <PiPencilSimpleLineFill />}</button>
        {
          editMode
            ?
            <MenuBar editor={editor} />
            :
            <>
              <UpdateCardDialog id={card?.id || -1} />
              <button className="copy-set" onClick={() => card && addCard({ ...card, id: Date.now() })}><MdFileCopy /></button>
              <button className="delete-set" onClick={() => deleteCard(props.data.id || -1)}><MdDelete /></button>
              <div>
                <Selector
                  className={`${styles.collection_selector} ${styles.selector}`}
                  defaultValue={set_options.findIndex((s) => s === set?.label)}
                  options={set_options}
                  icon={<MdAutoStories />}
                  positions={['top']}
                  onSelect={(val) => {
                    let set_id = sets.find((c) => c.label === set_options[val])?.id;
                    handleChangeSet(set_id || -1);
                  }}
                />
              </div>
            </>
        }
      </section>
    </div>
  );
};

export default CardContent;