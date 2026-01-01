//this is parser file of the toy browser engine project ^^
import {
  Node,
  KnownHTMLTags,
  HTMLTags,
  HTMLText,
  HTMLAttribute,
  HTMLComment,
  ParseResult,
  VoidTags,
} from "./types";

class HTMLParser {
  private input: string;
  private position: number;
  private warnings: string[] = [];
  private errors: string[] = [];

  constructor(input: string) {
    this.input = input;
    this.position = 0;
  }

  public parse(): ParseResult {
    const nodes: Node[] = [];

    /**
     * Main parsing loop
     */
    while (this.position < this.input.length) {
      // if start with "<"
      if (this.input[this.position] === "<") {
        // TAG PARSING (COMMENT, SELF-CLOSING, NORMAL TAGS)
        const node = this.parseTag();
        if (node) {
          nodes.push(node);
          continue;
        } else {
          this.errors.push(`Malformed tag at position ${this.position}`);
          this.position++;
        }
      } else {
        // TEXT PARSING
        const textNode = this.parseText();
        if (textNode) {
          nodes.push(textNode);
        }
      }
    }

    return {
      nodes,
      warnings: this.warnings,
      errors: this.errors,
    };
  }

  // OTHER PARSING METHODS

  /**
   * Parses an HTML tag and its attributes
   */
  private parseTag(): Node | null {
    // Position hala '<' uzerinde, alt fonksiyonlar handle edecek

    // CHECK FOR COMMENT
    const commentNode = this.parseComment();
    if (commentNode) {
      return commentNode;
    }

    // CHECK FOR DOCTYPE
    if (this.input.startsWith("<!DOCTYPE", this.position)) {
      return this.parseDoctype();
    }

    // CHECK FOR SELF-CLOSING TAG
    const selfClosingNode = this.parseSelfClosingTag();
    if (selfClosingNode) {
      return selfClosingNode;
    }

    // CHECK FOR CLOSING TAG
    if (this.input.startsWith("</", this.position)) {
      return null;
    }

    const regularTagNode = this.parseRegularTag();
    return regularTagNode;
  }

  /**
   * Parses DOCTYPE declaration
   */
  private parseDoctype(): HTMLTags | null {
    // Skip "<!DOCTYPE"
    this.position += 9;
    
    // Skip whitespace
    this.skipWhitespace();
    
    // Read DOCTYPE value (usually "html")
    let doctypeValue = "";
    while (this.position < this.input.length && 
           this.input[this.position] !== ">" &&
           !/\s/.test(this.input[this.position])) {
      doctypeValue += this.input[this.position];
      this.position++;
    }
    
    // Skip to closing ">"
    while (this.position < this.input.length && this.input[this.position] !== ">") {
      this.position++;
    }
    
    if (this.input[this.position] === ">") {
      this.position++; // Skip ">"
    }
    
    return {
      type: "tag",
      name: "!DOCTYPE" as KnownHTMLTags,
      attributes: [
        {
          name: doctypeValue || "html",
          value: "true"
        }
      ],
      children: []
    };
  }

  // Void tags (for self-closing tags) are handled separately
  private readonly VOID_TAGS: VoidTags[] = [
    "br",
    "hr",
    "img",
    "input",
    "meta",
    "link",
    "embed",
    "param",
    "track",
    "wbr",
  ];

  /**
   * Parses text content
   */
  private parseText(): HTMLText | null {
    let start = this.position;
    while (
      this.position < this.input.length &&
      this.input[this.position] !== "<"
    ) {
      this.position++;
    }
    // check if any text was found
    if (this.position > start) {
      const content = this.input.substring(start, this.position).trim();
      // content is empty string check
      if (content === "") {
        return null;
      }
      return {
        type: "text",
        content: content,
      };
    }
    return null;
  }

  /**
   * Parses an HTML comment
   */
  private parseComment(): HTMLComment | null {
    const commentStart = "<!--";
    const commentEnd = "-->";
    // Check if the current position starts with comment start
    if (this.input.startsWith(commentStart, this.position)) {
      // Find the end of the comment
      const start = this.position + commentStart.length;
      const end = this.input.indexOf(commentEnd, start);
      // If end found, extract comment content
      if (end !== -1) {
        // Move position past the comment
        const content = this.input.substring(start, end);
        this.position = end + commentEnd.length;
        return {
          type: "comment",
          content: content,
        };
      } else {
        this.errors.push(
          `Unterminated comment starting at position ${this.position}`
        );
        this.position++;
        return null;
      }
    }
    return null;
  }

  /**
   * Parses attributes
   */
  private parseAttributes(): HTMLAttribute[] {
    const attributes: HTMLAttribute[] = [];

    // Simple attribute parsing logic
    while (
      this.position < this.input.length &&
      this.input[this.position] !== ">" &&
      this.input[this.position] !== "/>"
    ) {
      this.skipWhitespace();

      // Attribute name
      let attrName = "";
      let attrValue: string = "";

      // Read atttribute name
      while (
        this.position < this.input.length &&
        /[a-zA-Z-]/.test(this.input[this.position])
      ) {
        attrName += this.input[this.position];
        this.position++;
      }

      if (attrName) {
        this.skipWhitespace();
        // Check for '='
        if (this.input[this.position] === "=") {
          this.position++; // Skip '='
        } else {
          attributes.push({ name: attrName, value: "true" });
          continue; // Move to next attribute
        }
      } else {
        return attributes;
      }

      // Attribute value
      this.skipWhitespace();
      const quoteChar = this.input[this.position];
      if (quoteChar === '"' || quoteChar === "'") {
        // Skip opening quote
        this.position++;
        // Read until closing quote
        while (
          this.position < this.input.length &&
          this.input[this.position] !== quoteChar
        ) {
          attrValue += this.input[this.position];
          this.position++;
        }
        this.position++;
        // Attribute without value
        attributes.push({
          name: attrName,
          value: attrValue,
        });
      }
    }

    return attributes;
  }

  /**
   * Parses self closing tags
   */
  /**
   * Parses self closing tags
   */
  private parseSelfClosingTag(): HTMLTags | null {
    // Peek ahead: tag name'i oku ama position'ı değiştirme
    let i = this.position + 1; // Skip '<'
    let tagName = "";

    while (i < this.input.length && /[a-zA-Z0-9!]/.test(this.input[i])) {
      tagName += this.input[i];
      i++;
    }

    // DÜZELTME 1: Void tag değilse null döndür (regular tag'tir)
    if (!this.VOID_TAGS.includes(tagName.toLowerCase() as VoidTags)) {
      return null;
    }

    // Burası void tag'lar için devam ediyor
    this.position = i; // Position'ı güncelle

    // Skip whitespaces and find attributes and parse it
    this.skipWhitespace();
    const attributes = this.parseAttributes();

    // Check for "/>" or ">" ending
    const hasSlashClosing = this.input.startsWith("/>", this.position);

    if (hasSlashClosing) {
      // Move past "/>"
      this.position += 2;
    } else if (this.input[this.position] === ">") {
      // Move past ">"
      this.position += 1;
    } else {
      // DÜZELTME 2: Void tag için ">" veya "/>" bulunamadı
      this.errors.push(
        `Expected "/>" or ">" for void tag <${tagName}> at position ${this.position}`
      );
      this.position += 1;
      return null;
    }

    return {
      type: "tag",
      name: tagName as KnownHTMLTags,
      attributes: attributes,
      children: [],
    };
  }

  /**
   * PARSE NORMAL TAGS
   */

  private parseRegularTag(): Node | null {
    // parse the opening tag
    const openingTag = this.parseOpeningTag();
    if (!openingTag) {
      this.errors.push(`Malformed opening tag at position ${this.position}`);
      return null;
    }

    // parse children nodes
    const children: Node[] = [];
    while (this.position < this.input.length) {
      // is this closing tag?
      if (this.input.startsWith(`</${openingTag.name}>`, this.position)) {
        break;
      }

      const originalPosition = this.position;
      // child parse
      let childNode: Node | null = null;
      if (this.input[this.position] === "<") {
        childNode = this.parseTag();
      } else {
        childNode = this.parseText();
      }
      
      if (childNode) {
        children.push(childNode);
      } else {
        // If position didn't advance, we're stuck - advance to avoid infinite loop
        if (this.position === originalPosition) {
          this.position++;
        }
        // If position did advance but no node was created, continue parsing from new position
      }
    }
    // handle the closing tag
    if (this.input.startsWith(`</${openingTag.name}>`, this.position)) {
      // skip closing tag
      this.position += `</${openingTag.name}>`.length;
    } else {
      // there is no closing tag
      this.warnings.push(`Unclosed tag: <${openingTag.name}>`);
    }
    return {
      type: "tag",
      name: openingTag.name,
      attributes: openingTag.attributes,
      children: children,
    };
  }

  private parseOpeningTag(): HTMLTags | null {
    // take tag name
    let tagName = "";
    let i = this.position + 1; // Skip '<'

    // loop to get all tag name characters
    while (i < this.input.length && /[a-zA-Z0-9!]/.test(this.input[i])) {
      tagName += this.input[i];
      i++;
    }

    // check tag name is exist.
    if (tagName === "") {
      return null;
    }

    // move position to after tag name
    this.position = i;
    this.skipWhitespace();

    // parse attributes
    const attributes = this.parseAttributes();

    // check for closing '>'
    if (this.input[this.position] === ">") {
      this.position++; // move past '>'
    } else {
      // error there is no closing '>'
      this.errors.push(
        `Expected '>' for opening tag <${tagName}> at position ${this.position}`
      );
      return null;
    }
    return {
      type: "tag",
      name: tagName as KnownHTMLTags,
      attributes: attributes,
      children: [],
    };
  }
  // UTILITY METHODS

  /**
   * Skips whitespace characters
   */
  private skipWhitespace(): void {
    while (
      this.position < this.input.length &&
      /\s/.test(this.input[this.position])
    ) {
      this.position++;
    }
  }
}

export default HTMLParser;
