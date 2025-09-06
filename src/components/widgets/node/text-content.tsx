import type { ITextContentData } from '#widgets/types'

interface TextContentProps {
  data: ITextContentData['propsData']
}

export function TextContent({ data }: TextContentProps) {
  const { content } = data

  return (
    <div
      className="tiptap flex flex-col justify-center"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  )
}
