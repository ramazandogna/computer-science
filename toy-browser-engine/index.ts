import fs from "fs";
import path from "path";
import HTMLParser from "./parser";

// Get file path from CLI
const filePath = process.argv[2];

if(!filePath){
    console.error("Usage: tsx src/index.ts <path-to-html-file>");
    process.exit(1);
}

try{
    // Read file
    const fullPath = path.resolve(filePath);
    const html = fs.readFileSync(fullPath, "utf-8");

    // Parse
    const parser = new HTMLParser(html);
    const result = parser.parse();
    
    // Output DOM
    console.log("\n=== Parsed DOM ===\n");
    console.log(JSON.stringify(result, null, 2));
    
    // Summary
    if(result.errors.length > 0){
        console.log(`\n=== ❌ ERRORS ===\n`);
        result.errors.forEach(err => console.log(`  - ${err}`));
    }

    if (result.warnings.length > 0) {
        console.log("\n⚠️ WARNINGS:");
        result.warnings.forEach(warn => console.log(`  - ${warn}`));
    }

    console.log(`\n✅ Parsed ${result.nodes.length} nodes`);
}catch(error){
    if (error instanceof Error) {
        console.error("Error:", error.message);
    } else {
        console.error("Unknown error");
    }
    process.exit(1);
}