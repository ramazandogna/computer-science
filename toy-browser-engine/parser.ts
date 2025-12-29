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
      // < gördüğünde ne yapmalı?
    }

    return {
      nodes,
      warnings: this.warnings,
      errors: this.errors,
    };
  }

  // other parses methods

  /**
   * Parses an HTML tag and its attributes
   */
  private parseTag(): HTMLTags | null {
    return null;
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

  // Utility methods

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
