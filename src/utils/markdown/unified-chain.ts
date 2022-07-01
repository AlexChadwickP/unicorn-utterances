import { PluggableList, unified } from "unified";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

interface markdownChainProps {
  remarkPlugins: PluggableList;
  rehypePlugins: PluggableList;
}

export const unifiedChain = ({
  remarkPlugins,
  rehypePlugins,
}: markdownChainProps) => {
  return (
    unified()
      .use(remarkParse, { fragment: true } as never)
      .use(remarkPlugins)
      .use(remarkToRehype, { allowDangerousHtml: true })
      .use(rehypePlugins)
      // Voids: [] is required for epub generation, and causes little/no harm for non-epub usage
      .use(rehypeStringify, { allowDangerousHtml: true, voids: [] })
  );
};
