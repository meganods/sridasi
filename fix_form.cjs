const fs = require('fs');
const file = '/Users/gdfgdfgdfgdfgdf/Downloads/sridasi/src/pages/TrainingRegistrationForm.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Revert input classes to boxes
// We will look for: className={`w-full border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none ${errors.NAME ? 'border-red-500 bg-red-50' : 'focus:border-sridasi-forest'}`}
content = content.replace(/className=\{`w-full border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none \$\{([^ ]+) \? 'border-red-500 bg-red-50' : 'focus:border-sridasi-forest'\}`\}/g, 
  "className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${$1 ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}");

// Replace ones without errors (select, generic text inputs)
content = content.replace(/className="w-full border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"/g,
  'className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"');

// Special case for land unit (w-1/3)
content = content.replace(/className="w-1\/3 border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"/g,
  'className="w-1/3 p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"');

// 2. Remove the Column Wrappers to fix numbering
// First wrapper start:
//               {/* COLUMN 1: SECTIONS 1, 2, 3, 4                                             */}
//               {/* ========================================================================= */}
//               <div className="space-y-6">
// It ends right before:
//               {/* ========================================================================= */}
//               {/* COLUMN 2: SECTIONS 5, 6, 7, 8, 9                                          */}
content = content.replace(/\s*\{\/\* =+ \*\/\}\n\s*\{\/\* COLUMN 1: SECTIONS 1, 2, 3, 4\s+\*\/\}\n\s*\{\/\* =+ \*\/\}\n\s*<div className="space-y-6">/g, '');

content = content.replace(/\s*<\/div>\n\n\s*\{\/\* =+ \*\/\}\n\s*\{\/\* COLUMN 2: SECTIONS 5, 6, 7, 8, 9\s+\*\/\}\n\s*\{\/\* =+ \*\/\}\n\s*<div className="space-y-6">/g, '');

// Also remove the closing div of the second column wrapper, which is right before:
//             </div>
//
//             {/* 10. YOUR FARM AT A GLANCE */}
content = content.replace(/\s*<\/div>\n\n\s*<\/div>\n\n\s*\{\/\* 10\. YOUR FARM AT A GLANCE \*\/\}/g, '\n\n            </div>\n\n            {/* 10. YOUR FARM AT A GLANCE */}');


fs.writeFileSync(file, content);
console.log("Done");
