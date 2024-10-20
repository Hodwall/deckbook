import { useState } from "react";
import { FaDiceD20, FaHighlighter, FaTable } from "react-icons/fa";
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatQuote, MdFormatStrikethrough, MdHorizontalRule, MdImage, MdKeyboardReturn, MdMoreHoriz, MdOutlineFormatAlignCenter, MdOutlineFormatAlignJustify, MdOutlineFormatAlignLeft, MdOutlineFormatAlignRight, MdRedo, MdUndo } from "react-icons/md";
import rollTreasure from "../../../pages/Generators/rollTreasure";
import PopMenu from "../../PopMenu/PopMenu";
import Selector from "../../Selector/Selector";
import styles from '../CardContent.module.css';
import GeneratorsMenu from "./GeneratorsMenu";


const MenuBar = (props: {
  editor: any;
}) => {
  const [showToolsBar, setShowToolsBar] = useState(false);
  const editor = props.editor;

  const handleAddImage = () => {
    const url = window.prompt('URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const handleGenerateList = (header: string, items: string[]) => {
    const parsed_items = items.map((t) => {
      return {
        "type": "taskItem",
        "attrs": { "checked": false },
        "content": [{
          "type": "paragraph",
          "attrs": { "textAlign": "left" },
          "content": [{
            "type": "text",
            "text": t
          }]
        }]
      };
    });
    return (
      editor.commands.insertContent({
        type: 'treasure',
        content: [
          {
            "type": "heading",
            "attrs": { "textAlign": "left", "level": 5 },
            "content": [{ "type": "text", "text": header }]
          },
          { "type": "horizontalRule" },
          {
            "type": "taskList",
            "content": parsed_items,
          },
        ]
      })
    );
  };


  if (!editor) {
    return null;
  } else {
    if (!showToolsBar) {
      return (
        <div className={styles.MenuBar}>
          <button onClick={() => setShowToolsBar(true)}><FaDiceD20 /></button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <MdUndo />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <MdRedo />
          </button>
          <input
            type="color"
            onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
            value={editor.getAttributes('textStyle').color}
            data-testid="setColor"
          />
          <PopMenu
            padding={8}
            trigger={<button><MdFormatBold /></button>}
            positions={['top']}
            direction="top"
            align="center"
            content={
              <div className={styles.MenuBar__selector}>
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'is-active' : ''}
                >
                  <MdFormatBold />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'is-active' : ''}
                >
                  <MdFormatItalic />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? 'is-active' : ''}
                >
                  <MdFormatStrikethrough />
                </button>
              </div>
            }
          />
          <PopMenu
            padding={8}
            trigger={<button><MdMoreHoriz /></button>}
            positions={['top']}
            direction="top"
            align="center"
            content={
              <div className={styles.MenuBar__selector}>
                <button onClick={handleAddImage}>
                  <MdImage /> Insert image
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  disabled={!editor.can().chain().focus().toggleHighlight().run()}
                  className={editor.isActive('highlight') ? 'is-active' : ''}
                >
                  <FaHighlighter style={{ fontSize: '1em' }} /> Highlight
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                  <MdHorizontalRule /> Add horizontal rule
                </button>
              </div>
            }
          />
          <PopMenu
            padding={8}
            trigger={<button><FaTable /></button>}
            positions={['top']}
            align="center"
            direction="top"
            content={
              <div className={styles.MenuBar__selector}>
                <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} >Insert table</button>
                <button onClick={() => editor.chain().focus().addColumnBefore().run()}> Add column before </button>
                <button onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</button>
                <button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
                <button onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</button>
                <button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
                <button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
                <button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
                <button onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells</button>
                <button onClick={() => editor.chain().focus().splitCell().run()}>Split cell</button>
                <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}> Toggle header column </button>
                <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}> Toggle header row </button>
                <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}> Toggle header cell </button>
                <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</button>
              </div>
            }
          />
          <PopMenu
            padding={8}
            trigger={<button><MdFormatListBulleted /></button>}
            positions={['top']}
            direction="top"
            align="center"
            content={
              <div className={styles.MenuBar__selector}>
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                  <MdFormatListBulleted /> Bulleted List
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                  <MdFormatListNumbered /> Numbered List
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleTaskList().run()}
                  className={editor.isActive('taskList') ? 'is-active' : ''}
                >
                  Toggle task list
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                  <MdFormatQuote /> Quote
                </button>
              </div>
            }
          />
          <Selector
            className={styles.selector}
            onClick={() => editor.chain().focus()}
            options={[
              <MdOutlineFormatAlignLeft />,
              <MdOutlineFormatAlignCenter />,
              <MdOutlineFormatAlignRight />,
              <MdOutlineFormatAlignJustify />
            ]}
            positions={['top', 'right']}
            defaultValue={(() => {
              if (editor.isActive({ textAlign: 'left' })) return 0;
              else if (editor.isActive({ textAlign: 'center' })) return 1;
              else if (editor.isActive({ textAlign: 'right' })) return 2;
              else if (editor.isActive({ textAlign: 'justify' })) return 3;
              // else return 0;
            })()}
            onSelect={(value) => {
              const align_values = ['left', 'center', 'right', 'justify'];
              if (!editor.isActive({ textAlign: align_values[value] })) editor.chain().focus().setTextAlign(align_values[value]).run();
            }}
          />
          <Selector
            className={styles.selector}
            onClick={() => editor.chain().focus()}
            options={['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']}
            positions={['top', 'right']}
            defaultValue={(() => {
              if (editor.isActive('heading', { level: 1 })) return 1;
              else if (editor.isActive('heading', { level: 2 })) return 2;
              else if (editor.isActive('heading', { level: 3 })) return 3;
              else if (editor.isActive('heading', { level: 4 })) return 4;
              else if (editor.isActive('heading', { level: 5 })) return 5;
              else if (editor.isActive('heading', { level: 6 })) return 6;
              // else return ;
            })()}
            onSelect={(value) => {
              if (value === 0) {
                editor.isActive('heading') && editor.chain().focus().setParagraph().run();
              } else {
                !editor.isActive('heading', { level: value }) && editor.chain().focus().toggleHeading({ level: value }).run();
              }
            }}
          />

          {/* 
          <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}> Set cell attribute </button>
          <button onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</button>
          <button onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</button>
          <button onClick={() => editor.chain().focus().goToPreviousCell().run()}> Go to previous cell </button> 
          */}

          {/* <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={ !editor.can() .chain() .focus() .toggleCode() .run() } className={editor.isActive('code') ? 'is-active' : ''} >
            Code
          </button> */}
          {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()} >
            Clear marks
          </button> */}
          {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
            Clear nodes
          </button> */}

        </div >
      );
    } else {
      return (
        <div className={styles.MenuBar}>
          <button onClick={() => setShowToolsBar(false)}><MdKeyboardReturn /></button>

          <PopMenu
            padding={8}
            trigger={<button>TREASURES</button>}
            positions={['top']}
            direction="top"
            align="center"
            content={
              <div className={styles.MenuBar__selector}>

                <GeneratorsMenu handleGenerateList={handleGenerateList} />

                {/* <button onClick={() => {
                  const treasure = rollTreasure(0);
                  return handleGenerateList(treasure.status, treasure.items);
                }}>
                  Hovel (brass)
                  Coins, basic items, equipment and clothes.
                </button>
                <button onClick={() => {
                  const treasure = rollTreasure(1);
                  return handleGenerateList(treasure.status, treasure.items || []);
                }}>
                  House (silver)
                  Coins, basic items, gems and jewelry, art, equipment and clothes, magic scroll, random item.
                </button>
                <button onClick={() => {
                  const treasure = rollTreasure(7);
                  return handleGenerateList(treasure.status, treasure.items || []);
                }}>
                  Chest - Open (silver)
                </button>
                <button onClick={() => {
                  const treasure = rollTreasure(8);
                  return handleGenerateList(treasure.status, treasure.items || []);
                }}>
                  Chest - Secure (gold)
                </button> */}

              </div>
            }
          />

          {/* 
          <button
            onClick={() => {

              const treasure = rollTreasure(1);

              const treasure_text = treasure.items.map((t) => { return { "type": 'text', "text": t }; });
              // const treasure_text = treasure.items.map((t) => { type: 'text', text: t});

              return (
                editor.commands.insertContent({
                  type: 'treasure',
                  content: [
                    {
                      "type": "blockquote",
                      "content": [
                        {
                          "type": "heading",
                          "attrs": {
                            "textAlign": "left",
                            "level": 2
                          },
                          "content": [{
                            "type": "text",
                            "text": treasure.status,
                          }]
                        },
                        {
                          "type": "paragraph",
                          "attrs": { "textAlign": "left" },
                          // "content": treasure_text,
                          "content": treasure_text,

                          // "content": [{
                          //   "type": "text",
                          //   "text": treasure.items.join(', ')
                          // },
                          // ]
                        },
                        { "type": "horizontalRule" },
                      ]
                    },
                  ],
                }, {
                  updatePosition: true
                })
              );
            }
              // editor.commands.insertContent(`<div className="af234"><span>asdfasdf</span>12341234</div>`)

              // editor.commands.insertContent(
              //   {
              //     type: 'heading',
              //     attrs: {

              //     },
              //     content: [
              //       {
              //         type: 'text',
              //         text: 'Example Text',
              //       },
              //     ],
              //   }
              // )

            }
          >
            TEST
          </button> */}

        </div>
      );
    }
  }
};

export default MenuBar;