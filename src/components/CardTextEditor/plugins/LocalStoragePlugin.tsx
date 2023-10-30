import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import useCardStore from "../../../store/useCardStore";


function LocalStoragePlugin() {
  const [active_card, addContentToCard] = useCardStore((state) => [state.active_card, state.addContentToCard]);
  const cards = useCardStore((state) => state.cards);
  const card = cards.find((c) => c.id === active_card);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!active_card) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    } else {
      if (card && card.content) {
        const initialEditorState = editor.parseEditorState(card.content);
        editor.setEditorState(initialEditorState);
      }
    }
  }, [active_card]);

  const onChange = (editorState: any) => {
    addContentToCard(active_card || -1, JSON.stringify(editorState.toJSON()));
  };

  return <OnChangePlugin onChange={onChange} />;
}


export default LocalStoragePlugin;

