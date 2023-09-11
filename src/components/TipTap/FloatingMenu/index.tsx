import {
    type Editor,
    FloatingMenu as _FloatingMenu
} from "@tiptap/react"
import type {
    IconType
} from "react-icons";

// icons imports
import {
    RxDividerHorizontal as IconDivider
} from 'react-icons/rx'
import {
    PiTextHOneBold as IconH1,
    PiTextHTwoBold as IconH2,
    PiListBulletsFill as IconBulletedList,
    PiTextColumnsBold as IconColumns,
    PiChartLineFill as IconChart
} from 'react-icons/pi'

//#region 
interface FloatingButtonProps {
    onClickAction: () => void,
    Icon: IconType,
    title: string,
    description: string
}

function FloatingButton({ onClickAction, Icon, title, description }: FloatingButtonProps) {
    return (
        <button
            onClick={onClickAction}
            className="flex items-center rounded p-1 gap-2 min-w-[280px] hover:bg-zinc-600"
        >
            <Icon className="p-2 w-12 h-12 bg-zinc-50 border border-zinc-600 rounded" />
            <div
                className="flex flex-col text-left"
            >
                <p className="text-sm text-zinc-50">
                    {title}
                </p>
                <span className="text-xs text-zinc-400">
                    {description}
                </span>
            </div>
        </button>
    )
}
//#endregion

export default function FloatingMenu({ editor }: { editor: Editor | null }) {
    return (
        <>
            {
                editor &&
                <_FloatingMenu
                    editor={editor}
                    className="bg-zinc-700 py-2 px-1 gap-1 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg flex flex-col h-80 overflow-y-scroll"
                    shouldShow={({ state }) => {
                        const { $from } = state.selection
                        const currentLine = $from.nodeBefore?.textContent

                        return currentLine === '/' && (() => {
                            $from.nodeBefore?.textContent.replace(/\//, '')
                            return true;
                        })()
                    }}
                >
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        Icon={IconH1}
                        title="Heading 1"
                        description="Big section heading"
                    />
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        Icon={IconH2}
                        title="Heading 2"
                        description="Medium section heading"
                    />
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().toggleBulletList().run()}
                        Icon={IconBulletedList}
                        title="Bulleted list"
                        description="Create a simple bulleted list."
                    />
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().setHorizontalRule().run()}
                        Icon={IconDivider}
                        title="Divider"
                        description="Visually divide the blocks."
                    />
                    <hr />
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().insertTable({ rows: 1, cols: 2 }).run()}
                        Icon={IconColumns}
                        title="2 Columns"
                        description="Create two columns of block."
                    />
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().insertTable({ rows: 1, cols: 3 }).run()}
                        Icon={IconColumns}
                        title="3 Columns"
                        description="Create three columns of block."
                    />
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().insertTable({ rows: 1, cols: 4 }).run()}
                        Icon={IconColumns}
                        title="4 Columns"
                        description="Create four columns of block."
                    />
                    <hr />
                    <FloatingButton
                        onClickAction={() => editor.chain().focus().insertContent("<mantine-component/>").run()}
                        Icon={IconChart}
                        title="Chart"
                        description="Display a customizable chart."
                    />
                </_FloatingMenu>
            }
        </>
    )
}