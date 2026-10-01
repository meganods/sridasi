const fs = require('fs');
const file = '/Users/gdfgdfgdfgdfgdf/Downloads/sridasi/src/pages/TrainingRegistrationForm.jsx';
let content = fs.readFileSync(file, 'utf8');

// Change the container
content = content.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">/,
  '<div className="columns-1 md:columns-2 gap-6 print-columns w-full">');

// Add break-inside-avoid and mb-6 to all sections
// Find all instances of: <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200
content = content.replace(/<div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/g,
  '<div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200');

// Remove the column wrappers we added previously
content = content.replace(/\s*\{\/\* COLUMN 1 \*\/\}\n\s*<div className="space-y-6">/g, '');
content = content.replace(/\s*<\/div>\n\n\s*\{\/\* COLUMN 2 \*\/\}\n\s*<div className="space-y-6">/g, '');
content = content.replace(/\s*<\/div>\n\n\s*\{\/\* 10\. YOUR FARM AT A GLANCE \*\/\}/g, '\n\n            {/* 10. YOUR FARM AT A GLANCE */}');

fs.writeFileSync(file, content);
console.log("Done Masonry");
