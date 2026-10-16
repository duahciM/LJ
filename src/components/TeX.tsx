import { useMemo } from "react";
import katex from "katex";

interface TeXProps {
  tex: string;
  block?: boolean;
  className?: string;
}

export default function TeX({ tex, block = false, className = "" }: TeXProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      }),
    [tex, block]
  );

  if (block) {
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
  return (
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
