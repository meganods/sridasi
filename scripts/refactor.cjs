const fs = require('fs');
const file = 'src/pages/TrainingRegistrationForm.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Increase overall text size
code = code.replace(/<form onSubmit=\{handleSubmit\} noValidate className="space-y-6 text-xs text-left">/, 
  '<form onSubmit={handleSubmit} noValidate className="space-y-6 text-sm text-left">');

// 2. Change block labels to inline, no-wrap, slightly margined
code = code.replace(/<label className="block text-sridasi-neutral-700 font-semibold mb-0\.5">/g, 
  '<label className="text-sridasi-neutral-700 font-semibold whitespace-nowrap min-w-max mr-2">');

// 3. Wrap standard floating inputs inside a flex container to align label and input side-by-side
// We target `<div>\n\s*<label className="text-sridasi-neutral-700 font-semibold whitespace-nowrap`
code = code.replace(/(<div>)\s*(<label className="text-sridasi-neutral-700 font-semibold whitespace-nowrap min-w-max mr-2">)/g, 
  '<div className="flex items-center w-full">\n                      $2');

// 4. Update the actual inputs/selects/textareas to use border-b instead of full rounded border
// a) Inputs with dynamic errors
code = code.replace(/className=\{`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none \$\{\s*errors\.(\w+) \? 'border-red-500 bg-red-50\/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'\s*\}`\}/g,
  "className={`flex-1 w-full border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none ${errors.$1 ? 'border-red-500 bg-red-50' : 'focus:border-sridasi-forest'}`}");

// b) Textareas with dynamic errors
code = code.replace(/className=\{`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none resize-none \$\{\s*errors\.(\w+) \? 'border-red-500 bg-red-50\/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'\s*\}`\}/g,
  "className={`flex-1 w-full border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none resize-none ${errors.$1 ? 'border-red-500 bg-red-50' : 'focus:border-sridasi-forest'}`}");

// c) Selects without errors
code = code.replace(/className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"/g,
  'className="flex-1 w-full border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"');

code = code.replace(/className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest"/g,
  'className="flex-1 w-full border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"');

// d) The specific select for preferred language or similar with w-1/3
code = code.replace(/className="w-1\/3 p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"/g,
  'className="w-1/3 border-b-2 border-sridasi-neutral-400 bg-transparent px-2 py-0.5 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"');

fs.writeFileSync(file, code);
console.log('Refactoring complete!');
