function MarkdownRenderer({ src }: { src: string }) {
  return <div>{<div dangerouslySetInnerHTML={{ __html: src }} />}</div>;
}

export default MarkdownRenderer;
