
import type { Klass, LexicalNode } from 'lexical';

import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

// import { AutocompleteNode } from './AutocompleteNode';
import { ImageNode } from './ImageNode';
import { KeywordNode } from './KeywordNode';
import { MentionNode } from './MentionNode';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

import { LayoutContainerNode } from '../nodes/LayoutContainerNode';
import { LayoutItemNode } from '../nodes/LayoutItemNode';
import { StickyNode } from './StickyNode';


const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  HashtagNode,
  AutoLinkNode,
  LinkNode,
  ImageNode,
  MentionNode,
  HorizontalRuleNode,
  // AutocompleteNode,
  KeywordNode,
  LayoutContainerNode,
  LayoutItemNode,
  StickyNode
];

export default PlaygroundNodes;
