# Toy Browser Engine

A simple HTML parser and DOM tree builder implemented in TypeScript, inspired by Matt Brubeck's excellent [Let's build a browser engine!](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html) series. While the original was written in Rust, this implementation uses TypeScript/Node.js to explore browser internals.

## Overview

This project is a learning exercise to understand how browsers parse HTML and construct the DOM (Document Object Model) tree. It implements a basic HTML parser from scratch without using any parsing libraries, focusing on the fundamental concepts of lexing, tokenization, and tree construction.

## Motivation

Ever wondered how browsers turn HTML strings into interactive web pages? This project explores the first critical step: parsing HTML into a structured DOM tree. By building a parser from the ground up, you gain deep insights into:

- How browsers tokenize and parse HTML
- Recursive descent parsing strategies
- Error recovery in real-world HTML
- State management in parsers
- DOM tree construction algorithms

## Features

- **HTML Parsing**: Tokenizes and parses HTML character by character
- **DOM Tree Construction**: Builds a structured tree of nodes
- **Support for Various HTML Elements**:
  - Regular tags with opening and closing pairs (`<div>...</div>`)
  - Void/self-closing tags (`<img>`, `<br>`, `<input>`, etc.)
  - HTML comments (`<!-- ... -->`)
  - DOCTYPE declarations
- **Attribute Parsing**: Handles quoted, single-quoted, and boolean attributes
- **Error Recovery**: Collects errors and warnings instead of crashing
- **Type-Safe**: Written in TypeScript with comprehensive type definitions

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd toy-browser-engine

# Install dependencies
pnpm install

# Build the project
pnpm build
```

## Usage

### Parse an HTML File

```bash
pnpm dev examples/simple.html
```

### Example Output

```json
{
  "nodes": [
    {
      "type": "tag",
      "name": "html",
      "attributes": [],
      "children": [
        {
          "type": "tag",
          "name": "head",
          "attributes": [],
          "children": [...]
        },
        {
          "type": "tag",
          "name": "body",
          "attributes": [],
          "children": [...]
        }
      ]
    }
  ],
  "warnings": [],
  "errors": []
}
```

## Technical Details

### Architecture

The parser uses a single-pass, character-by-character lexer-parser approach:

1. **Position Tracking**: Maintains a pointer to track position in the input string
2. **Token Detection**: Identifies tokens based on current character
3. **Recursive Parsing**: Builds nested structures through recursive function calls
4. **Error Collection**: Accumulates errors and warnings for reporting

### Core Components

**HTMLParser Class**
- Main parsing logic and state management
- Position pointer for traversing input
- Error and warning collection

**Node Types**
- `HTMLTags`: Element nodes with name, attributes, and children
- `HTMLText`: Text content between tags
- `HTMLComment`: HTML comments
- `HTMLAttribute`: Key-value pairs for element attributes

**Parsing Decision Tree**

```
< character encountered
├─ <!--      → Parse as comment
├─ <!DOCTYPE → Parse as DOCTYPE declaration
├─ </        → Closing tag (return to parent)
├─ <void     → Self-closing tag (br, img, input, etc.)
└─ <regular  → Regular tag with potential children
```

### Key Parser Functions

**`parse()`**
- Main entry point that returns a `ParseResult`
- Contains DOM tree, warnings, and errors

**`parseTag()`**
- Determines tag type and delegates to appropriate parser

**`parseRegularTag()`**
- Parses opening tag
- Recursively parses children
- Validates closing tag

**`parseSelfClosingTag()`**
- Identifies void tags from predefined list
- Handles both `/>` and `>` closures

**`parseAttributes()`**
- Extracts attribute name-value pairs
- Supports quoted, single-quoted, and boolean attributes

**`parseText()`**
- Captures text content between tags
- Trims whitespace and filters empty nodes

### Error Handling

**Errors (Critical)**
- Malformed tags
- Unterminated comments
- Missing `>` characters
- Unexpected closing tags

**Warnings (Non-Critical)**
- Unclosed tags
- Missing closing tags

All errors and warnings are collected and returned in the parse result.

## Dependencies

- **TypeScript** (^5.3.3): Type-safe JavaScript
- **tsx** (^4.7.0): TypeScript execution engine for development
- **@types/node** (^20.10.6): Node.js type definitions

## Project Structure

```
toy-browser-engine/
├── index.ts          # CLI entry point
├── parser.ts         # Main parser implementation
├── types.ts          # TypeScript type definitions
├── examples/         # Sample HTML files for testing
│   ├── simple.html
│   ├── nested.html
│   └── attributes.html
├── package.json
├── tsconfig.json
└── README.md
```

## What I Learned

- **Lexer/Parser Design Patterns**: Understanding tokenization and parsing phases
- **Recursive Descent Parsing**: Building tree structures through recursion
- **State Management**: Tracking parser position and context
- **Error Recovery**: Handling malformed input gracefully
- **Type Safety**: Leveraging TypeScript for robust parsing logic
- **DOM Concepts**: How browsers structure HTML internally

## Current Limitations

This is a "toy" implementation for learning purposes, so it has several limitations:

- No CSS parsing or styling
- No JavaScript execution
- No layout engine or rendering
- HTML entities not decoded (`&nbsp;`, `&lt;`, etc.)
- No CDATA section support
- No namespace handling (SVG, MathML, etc.)
- No HTML5 parsing algorithm compliance
- Limited error recovery strategies

## Future Enhancements

Planned additions to expand the project:

- [ ] **CSS Parser**: Parse CSS stylesheets and inline styles
- [ ] **Style Computation**: Calculate computed styles for each element
- [ ] **Layout Engine**: Implement box model and layout algorithms
- [ ] **Rendering**: Output visual representation (ASCII art or canvas)
- [ ] **HTML Entity Decoding**: Support for `&nbsp;`, `&lt;`, `&gt;`, etc.
- [ ] **Better Error Recovery**: Implement HTML5-compliant error handling
- [ ] **Performance Optimization**: Benchmark and optimize hot paths
- [ ] **Browser DevTools Inspector**: Interactive DOM tree visualization

## Resources

- [Let's build a browser engine! - Matt Brubeck](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html)
- [HTML Standard - WHATWG](https://html.spec.whatwg.org/)
- [How Browsers Work - Tali Garsiel](https://web.dev/howbrowserswork/)

## License

ISC

## Author

Ramazan Dogan
