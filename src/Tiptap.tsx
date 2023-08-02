import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function(){
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Hello world</>'
    })

    return <EditorContent editor={editor} />
}