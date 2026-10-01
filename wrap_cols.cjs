const fs = require('fs');
const file = '/Users/gdfgdfgdfgdfgdf/Downloads/sridasi/src/pages/TrainingRegistrationForm.jsx';
let content = fs.readFileSync(file, 'utf8');

// Insert wrapper 1 before Section 1
content = content.replace(
  /(\s*\{\/\* 1\. PERSONAL INFORMATION \*\/})/,
  '\n              {/* COLUMN 1 */}\n              <div className="space-y-6">$1'
);

// Insert wrapper 2 before Section 5
content = content.replace(
  /(\s*\{\/\* 5\. BASIC FARM INFRASTRUCTURE \*\/})/,
  '\n              </div>\n\n              {/* COLUMN 2 */}\n              <div className="space-y-6">$1'
);

// Close wrapper 2 before Section 10
content = content.replace(
  /(\s*\{\/\* 10\. YOUR FARM AT A GLANCE \*\/})/,
  '\n              </div>\n$1'
);

fs.writeFileSync(file, content);
console.log("Done");
