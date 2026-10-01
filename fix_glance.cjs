const fs = require('fs');
const file = '/Users/gdfgdfgdfgdfgdf/Downloads/sridasi/src/pages/TrainingRegistrationForm.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs font-semibold text-sridasi-neutral-800">[\s\S]*?(?=<\/div>\n                <\/div>\n            <\/div>\n          <\/div>)/;

const replacement = `<div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-3 gap-y-4 text-xs font-semibold text-sridasi-neutral-800 items-end">
                    <span className="shrink-0 pb-1">Land:</span>
                    <input 
                      type="text" 
                      value={formData.farmAtAGlance.land}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, land: e.target.value }}))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0" 
                    />

                    <span className="shrink-0 pb-1 pl-2">Water:</span>
                    <input 
                      type="text" 
                      value={formData.farmAtAGlance.water}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, water: e.target.value }}))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0" 
                    />

                    <span className="shrink-0 pb-1">Electricity:</span>
                    <input 
                      type="text" 
                      value={formData.farmAtAGlance.electricity}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, electricity: e.target.value }}))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0" 
                    />

                    <span className="shrink-0 pb-1 pl-2">Road:</span>
                    <input 
                      type="text" 
                      value={formData.farmAtAGlance.road}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, road: e.target.value }}))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0" 
                    />

                    <span className="shrink-0 pb-1">Market Distance:</span>
                    <input 
                      type="text" 
                      value={formData.farmAtAGlance.marketDistance}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, marketDistance: e.target.value }}))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0" 
                    />

                    <span className="shrink-0 pb-1 pl-2">Security:</span>
                    <input 
                      type="text" 
                      value={formData.farmAtAGlance.security}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, security: e.target.value }}))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0" 
                    />`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
console.log("Done");
