/**
 * Rich text renderer for prompts, explanations and lessons.
 * Supports: paragraphs (blank line), "- " bullets, "1. " numbered steps, **bold**,
 * `$inline$` and `$$display$$` KaTeX, `\$` for a literal dollar sign, and preserved line breaks.
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

const ITALIC_RE = /(?<![*\w])\*(?!\*)([^*\n]+?)\*(?![*\w])/g;

/** Placeholder for an escaped dollar (`\$`, e.g. "$30,000" in an English text) while math is detected. */
const ESC_DOLLAR = "\uE000";
const ESC_DOLLAR_RE = /\uE000/g;

/** Math segments first (so `$…$` never gets mangled), then bold/italic inside the text runs. */
function math(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const src = text.replace(/\\\$/g, ESC_DOLLAR);
  const plain = (s: string) => s.replace(ESC_DOLLAR_RE, "$$");
  let last = 0;
  let k = 0;
  for (const m of src.matchAll(MATH_RE)) {
    if (m.index! > last) out.push(<Fragment key={`${keyBase}-t${k++}`}>{plain(src.slice(last, m.index))}</Fragment>);
    const display = m[1] !== undefined;
    const tex = (m[1] ?? m[2] ?? "").replace(ESC_DOLLAR_RE, "\\$$");
    out.push(<span key={`${keyBase}-m${k++}`} className={display ? "block my-1" : undefined} dangerouslySetInnerHTML={{ __html: renderTex(tex, display) }} />);
    last = m.index! + m[0].length;
  }
  if (last < src.length) out.push(<Fragment key={`${keyBase}-t${k++}`}>{plain(src.slice(last))}</Fragment>);
  return out;
}

/** Bold and italic spans may contain math, so emphasis is split first and math rendered inside. */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  const spans: { start: number; end: number; inner: string; tag: "strong" | "em" }[] = [];
  for (const m of text.matchAll(BOLD_RE)) spans.push({ start: m.index!, end: m.index! + m[0].length, inner: m[1]!, tag: "strong" });
  for (const m of text.matchAll(ITALIC_RE)) {
    const s = m.index!;
    if (!spans.some((x) => s >= x.start && s < x.end)) spans.push({ start: s, end: s + m[0].length, inner: m[1]!, tag: "em" });
  }
  spans.sort((a, b) => a.start - b.start);
  for (const sp of spans) {
    if (sp.start < last) continue;
    if (sp.start > last) out.push(...math(text.slice(last, sp.start), `${keyBase}-p${k++}`));
    out.push(
      sp.tag === "strong" ? (
        <strong key={`${keyBase}-b${k++}`} className="font-semibold text-ink">
          {math(sp.inner, `${keyBase}-bi${k}`)}
        </strong>
      ) : (
        <em key={`${keyBase}-i${k++}`} className="text-ink-2">
          {math(sp.inner, `${keyBase}-ii${k}`)}
        </em>
      ),
    );
    last = sp.end;
  }
  if (last < text.length) out.push(...math(text.slice(last), `${keyBase}-p${k++}`));
  return out;
}

interface Props {
  text: string;
  /** Keep whitespace/line breaks exactly (formula alignments, step lists). */
  pre?: boolean;
  /** Render as a single inline span (no paragraphs), e.g. text fragments around a cloze blank. */
  inline?: boolean;
  className?: string;
}

export const MathText = memo(function MathText({ text, pre = false, inline: asInline = false, className }: Props) {
  if (asInline) return <span className={className}>{inline(text.replace(/\s*\n+\s*/g, " "), "inl")}</span>;
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
