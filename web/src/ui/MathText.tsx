/**
 * Rich text renderer for prompts, explanations and lessons.
 * Supports: paragraphs (blank line), "- " bullets, "1. " numbered steps, **bold**,
 * `$inline$` and `$$display$$` KaTeX, and preserved line breaks.
 */

import katex from "katex";
import { Fragment, memo, type ReactNode } from "react";

const MATH_RE = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

/** German decimal comma inside math: 3,5 → 3{,}5 (no thin space after comma). */
function fixTex(tex: string): string {
  return tex.replace(/(\d),(\d)/g, "$1{,}$2");
}

export function renderTex(tex: string, display: boolean): string {
  try {
    return katex.renderToString(fixTex(tex), { displayMode: display, throwOnError: false, strict: "ignore", output: "htmlAndMathml" });
  } catch {
    return `<code>${tex}</code>`;
  }
}

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(MATH_RE)) {
    if (m.index! > last) out.push(...bold(text.slice(last, m.index), `${keyBase}-t${k++}`));
    const display = m[1] !== undefined;
    const tex = m[1] ?? m[2] ?? "";
    out.push(<span key={`${keyBase}-m${k++}`} className={display ? "block my-1" : undefined} dangerouslySetInnerHTML={{ __html: renderTex(tex, display) }} />);
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(...bold(text.slice(last), `${keyBase}-t${k++}`));
  return out;
}

function bold(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(BOLD_RE)) {
    if (m.index! > last) out.push(<Fragment key={`${keyBase}-${k++}`}>{text.slice(last, m.index)}</Fragment>);
    out.push(
      <strong key={`${keyBase}-${k++}`} className="font-semibold text-ink">
        {m[1]}
      </strong>,
    );
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={`${keyBase}-${k++}`}>{text.slice(last)}</Fragment>);
  return out;
}

interface Props {
  text: string;
  /** Keep whitespace/line breaks exactly (formula alignments, step lists). */
  pre?: boolean;
  className?: string;
}

export const MathText = memo(function MathText({ text, pre = false, className }: Props) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return (
    <div className={className}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const isList = lines.length > 0 && lines.every((l) => /^\s*(-|•|\d+[.)])\s+/.test(l) || l.trim() === "");
        if (isList) {
          const ordered = /^\s*\d+[.)]/.test(lines[0] ?? "");
          const items = lines.filter((l) => l.trim()).map((l) => l.replace(/^\s*(-|•|\d+[.)])\s+/, ""));
          const Tag = ordered ? "ol" : "ul";
          return (
            <Tag key={bi} className={`${ordered ? "list-decimal" : "list-disc"} pl-6 my-1 space-y-1 marker:text-ink-3`}>
              {items.map((it, ii) => (
                <li key={ii}>{inline(it, `${bi}-${ii}`)}</li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={bi} className={`my-1 ${pre ? "pre-wrap font-[inherit]" : ""}`}>
            {lines.map((line, li) => (
              <Fragment key={li}>
                {inline(line, `${bi}-${li}`)}
                {li < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
});
