import type {
    ComponentProps,
    ReactNode
} from "react";

import {
    BubbleMenu as _BubbleMenu,
    type Editor
} from "@tiptap/react";

// icons imports
import {
    RxFontBold as IconBold,
    RxFontItalic as IconItalic,
    RxStrikethrough as IconStrike,
    RxCode as IconCode,
} from 'react-icons/rx'

//#region 
interface BubbleButtonProps extends ComponentProps<'button'> {
    children: ReactNode
}

function BubbleButton(props: BubbleButtonProps) {
    return (
        <button
            className="p-2 text-zinc-200 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-50 hover:bg-zinc-600 data-[active=true]:text-blue-400"
            {...props}
        />
    )
}
//#endregion

export default function BubbleMenu({ editor }: { editor: Editor | null }) {
    return (
        <>
            {
                editor &&
                <_BubbleMenu
                    className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x-zinc-600"
                    editor={editor}
                >
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        data-active={editor.isActive('bold')}
                    >
                        <IconBold className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        data-active={editor.isActive('italic')}
                    >
                        <IconItalic className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        data-active={editor.isActive('strike')}
                    >
                        <IconStrike className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        data-active={editor.isActive('code')}
                    >
                        <IconCode className="w-4 h-4" />
                    </BubbleButton>
                </_BubbleMenu>
            }
        </>
    )
}