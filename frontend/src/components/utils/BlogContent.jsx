import EditorJSHTML from "editorjs-html"

const BlogContent = ({ content }) => {
    if (!content || !content.blocks) return null

    const parser = EditorJSHTML()
    const htmlBlocks = parser.parse(content)

    return (
        <div className="editor-content">
            {htmlBlocks.map((block, index) => (
                <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: block }}
                />
            ))}
        </div>
    )
}

export default BlogContent
