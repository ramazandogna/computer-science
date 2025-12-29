//this is parser file of the toy browser engine project ^^
import {
  Node,
  KnownHTMLTags,
  HTMLTags,
  HTMLText,
  HTMLAttribute,
  HTMLComment,
  ParseResult,
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
        } else {
          this.position++;
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
    // CHECK FOR COMMENT
    const commentNode = this.parseComment();
    if (commentNode) {
      return commentNode;
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

    const regularTagNode = null; // Placeholder for regular tag parsing
    return regularTagNode;
  }

  /**
   * Parses text content
   */
  private parseText(): HTMLText | null {
    return null;
  }

  /**
   * Parses an HTML comment
   */
  private parseComment(): HTMLComment | null {
    return null;
  }

  /**
   * Parses attributes
   */
  private parseAttributes(): HTMLAttribute[] {
    return [];
  }

  /**
   * Parses self closing tags
   */
  private parseSelfClosingTag(): HTMLTags | null {
    return null;
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
