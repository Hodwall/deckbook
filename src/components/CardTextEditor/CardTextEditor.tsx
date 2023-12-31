import { useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
// import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
// import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
// import useLexicalEditable from '@lexical/react/useLexicalEditable';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';

// import ActionsPlugin from './plugins/ActionsPlugin';
// import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
// import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
// import CollapsiblePlugin from './plugins/CollapsiblePlugin';
// import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
// import ContextMenuPlugin from './plugins/ContextMenuPlugin';
// import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
// import ExcalidrawPlugin from './plugins/ExcalidrawPlugin';
// import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
// import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
// import KeywordsPlugin from './plugins/KeywordsPlugin';
import { LayoutPlugin } from './plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from './plugins/LinkPlugin';
// import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
// import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
// import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
// import MentionsPlugin from './plugins/MentionsPlugin';
// import PageBreakPlugin from './plugins/PageBreakPlugin';
// import PollPlugin from './plugins/PollPlugin';
// import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
// import TabFocusPlugin from './plugins/TabFocusPlugin';
// import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
// import TableCellResizer from './plugins/TableCellResizer';
// import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
// import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
// import TreeViewPlugin from './plugins/TreeViewPlugin';
// import TwitterPlugin from './plugins/TwitterPlugin';
// import YouTubePlugin from './plugins/YouTubePlugin';
import LocalStoragePlugin from './plugins/LocalStoragePlugin';
import StickyPlugin from './plugins/StickyPlugin';

import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';

import TableCellNodes from './nodes/TableCellNodes';

import './CardTextEditor.css';


const Editor = () => {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const CAN_USE_DOM: boolean =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined';

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;
      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);
    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);


  const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={cellEditorConfig}>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <div
        className={`editor-container`}>

        {/* <AutoFocusPlugin /> */}
        {/* <ClearEditorPlugin /> */}
        {/* <ComponentPickerPlugin /> */}
        {/* <AutoEmbedPlugin /> */}
        {/* <MentionsPlugin /> */}
        {/* <KeywordsPlugin /> */}
        {/* <MarkdownShortcutPlugin /> */}
        {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
        {/* <YouTubePlugin /> */}
        {/* <ExcalidrawPlugin /> */}
        {/* <TabFocusPlugin /> */}

        {/* <TablePlugin hasCellMerge={tableCellMerge} hasCellBackgroundColor={tableCellBackgroundColor} /> */}
        {/* <TableCellResizer /> */}
        {/* <NewTablePlugin cellEditorConfig={cellEditorConfig}>
          <AutoFocusPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="TableNode__contentEditable" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MentionsPlugin />
          <HistoryPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <LinkPlugin />
          <LexicalClickableLinkPlugin />
          <FloatingTextFormatToolbarPlugin />
        </NewTablePlugin> */}

        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ImagesPlugin />

        <HistoryPlugin />
        <LocalStoragePlugin />
        <ClearEditorPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TabIndentationPlugin />
        <LayoutPlugin />
        <StickyPlugin />

        <AutoLinkPlugin />
        <LinkPlugin />
        <LexicalClickableLinkPlugin />

        <HashtagPlugin />

        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <FloatingLinkEditorPlugin isLinkEditMode={isLinkEditMode} setIsLinkEditMode={setIsLinkEditMode} />
            {/* <TableCellActionMenuPlugin
              anchorElem={floatingAnchorElem}
              cellMerge={true}
            /> */}
            {/* <FloatingTextFormatToolbarPlugin
              anchorElem={floatingAnchorElem}
            /> */}
          </>
        )}
        {/* <div>{showTableOfContents && <TableOfContentsPlugin />}</div> */}
        {/* {shouldUseLexicalContextMenu && <ContextMenuPlugin />} */}
        {/* <ActionsPlugin isRichText={isRichText} /> */}

      </div>
    </LexicalComposer>
  );
};


export default Editor;
