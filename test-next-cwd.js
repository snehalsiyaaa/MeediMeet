const fs = require('fs');
const path = require('path');
console.log("cwd:", process.cwd());
const p1 = process.env.VONAGE_PRIVATE_KEY || "lib/private.key";
const a1 = path.resolve(process.cwd(), p1);
console.log("exists? p1:", fs.existsSync(p1), "a1:", fs.existsSync(a1));
