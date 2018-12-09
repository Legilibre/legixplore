// get some folder tree
//
// node scripts/structure.js "../Archeo-Lex/textes/codes/code_du_travail"
//

const tree = require("directory-tree");

if (process.argv.length !== 3) {
  console.log("\n usage: node scripts/structure.js /path/to/git/\n");
  process.exit(1);
}

console.log(JSON.stringify(tree(process.argv[2]), null, 2));
