import {
    Node,
    ReactNodeViewRenderer,
    mergeAttributes
} from "@tiptap/react";

// component import
import Mantine from "./mantine";


export const MantineExtension = Node.create({
    name: 'MantineExtension',
    group: 'block',
    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'mantine-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['mantine-component', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(Mantine)
    },
})