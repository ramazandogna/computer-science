export type Node = HTMLTags | HTMLText | HTMLAttribute | HTMLComment;

export type KnownHTMLTags =
  // Structure
  | "html"
  | "head"
  | "body"
  | "title"
  | "meta"
  | "link"
  | "script"
  | "style"
  // Semantic
  | "header"
  | "nav"
  | "main"
  | "article"
  | "section"
  | "aside"
  | "footer"
  // Content
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "div"
  | "span"
  | "pre"
  | "code"
  | "blockquote"
  // Lists
  | "ul"
  | "ol"
  | "li"
  | "dl"
  | "dt"
  | "dd"
  // Links & Media
  | "a"
  | "img"
  | "video"
  | "audio"
  | "source"
  | "iframe"
  // Forms
  | "form"
  | "input"
  | "button"
  | "label"
  | "textarea"
  | "select"
  | "option"
  | "fieldset"
  | "legend"
  // Tables
  | "table"
  | "thead"
  | "tbody"
  | "tfoot"
  | "tr"
  | "td"
  | "th"
  // Self-closing / Void
  | "br"
  | "hr"
  | "embed"
  | "param"
  | "track"
  | "wbr";

export interface HTMLTags {
  type: "tag";
  name: KnownHTMLTags | string;
  attributes: HTMLAttribute[];
  children: Node[];
}

export interface HTMLText {
  type: "text";
  content: string;
}

export interface HTMLAttribute {
  name: string;
  value: string;
}

export interface HTMLComment {
  type: "comment";
  content: string;
}

// Parser related types

export interface ParseResult {
  nodes: Node[];
  warnings: string[];
  errors: string[];
}