// convert to markdown table

const codes = require(".");

console.log(`
id | titre
---|------`);

console.log(codes.map(code => `${code.id}|${code.titre}`).join("\n"));
