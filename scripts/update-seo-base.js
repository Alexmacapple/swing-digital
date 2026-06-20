#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const nextBase = (process.argv[2] || '').replace(/\/+$/, '');

if (!/^https?:\/\/[^/]+/.test(nextBase)) {
    console.error('Usage : node scripts/update-seo-base.js https://www.example.com');
    process.exit(1);
}

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const currentBases = [
    'http://localhost:8080',
    'https://localhost:8080',
    'https://swing.appmiweb.com',
    'https://www.swingdigitalproduction.com',
];

const publicFiles = fs.readdirSync(srcDir)
    .filter((file) => /\.(html|xml|txt)$/.test(file))
    .map((file) => path.join(srcDir, file));

let changed = 0;

for (const file of publicFiles) {
    const before = fs.readFileSync(file, 'utf8');
    let after = before;

    for (const currentBase of currentBases) {
        after = after.split(currentBase).join(nextBase);
    }

    if (after !== before) {
        fs.writeFileSync(file, after, 'utf8');
        changed += 1;
    }
}

console.log(`${changed} fichier(s) public(s) mis à jour vers ${nextBase}`);
