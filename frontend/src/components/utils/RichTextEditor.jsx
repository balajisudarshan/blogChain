import { useEffect, useRef } from "react"
import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import LinkTool from "@editorjs/link"
import Code from "@editorjs/code"

const RichTextEditor = ({ setContent }) => {
    const editorRef = useRef(null)

    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: "editorjs",
                tools: {
                    header: Header,
                    list: List,
                    linkTool: LinkTool,
                    code: Code
                },
                async onChange(api) {
                    const data = await api.saver.save()
                    setContent(data)
                }
            })

            editorRef.current = editor
        }

        return () => {
            editorRef.current?.destroy()
            editorRef.current = null
        }
    }, [])

    return (
        <div
            id="editorjs"
            className="
                w-full
                rounded-md
                bg-white/10
                border border-white/20
                text-white
                px-3 py-2
                min-h-[160px]
                focus-within:ring-1
                focus-within:ring-white/30
            "
        />
    )

}

export default RichTextEditor
