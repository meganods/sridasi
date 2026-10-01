const fs = require('fs');
const file = '/Users/gdfgdfgdfgdfgdf/Downloads/sridasi/src/pages/TrainingRegistrationForm.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* 4\. FARM LOCATION & SECURITY \*\/\}[\s\S]*?(?=<\/div>\n\n\s*\{\/\* COLUMN 2 \*\/})/m;

const replacement = `{/* 4. FARM LOCATION & SECURITY */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-4 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    4. FARM LOCATION & SECURITY
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col w-full gap-1">
                      <label className="text-sridasi-neutral-700 font-semibold">
                        16. Village / Town
                      </label>
                      <input
                        type="text"
                        value={formData.villageTown}
                        onChange={(e) => handleChange('villageTown', e.target.value)}
                        className={\`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none \${errors.villageTown ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}\`}
                      />
                      {errors.villageTown && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.villageTown}</p>}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                      <label className="text-sridasi-neutral-700 font-semibold">
                        District
                      </label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => handleChange('district', e.target.value)}
                        className={\`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none \${errors.district ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}\`}
                      />
                      {errors.district && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.district}</p>}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                      <label className="text-sridasi-neutral-700 font-semibold">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className={\`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none \${errors.state ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}\`}
                      />
                      {errors.state && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col w-full gap-1">
                      <label className="text-sridasi-neutral-700 font-semibold">
                        17. Distance from Main Road
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.distanceMainRoad}
                          onChange={(e) => handleChange('distanceMainRoad', e.target.value)}
                          className={\`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none pr-8 \${errors.distanceMainRoad ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}\`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sridasi-neutral-500 font-medium">km</span>
                      </div>
                      {errors.distanceMainRoad && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceMainRoad}</p>}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                      <label className="text-sridasi-neutral-700 font-semibold">
                        18. Distance from Nearest Market
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.distanceMarket}
                          onChange={(e) => handleChange('distanceMarket', e.target.value)}
                          className={\`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none pr-8 \${errors.distanceMarket ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}\`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sridasi-neutral-500 font-medium">km</span>
                      </div>
                      {errors.distanceMarket && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceMarket}</p>}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-sridasi-neutral-200">
                        <label className="text-sridasi-neutral-700 font-semibold">19. Predators / Wild Animals Around the Farm?</label>
                        <div className="flex items-center gap-4 shrink-0 pl-4">
                          <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                            <input type="radio" name="predators" value="Yes" checked={formData.predatorsWildAnimals === 'Yes'} onChange={(e) => handleChange('predatorsWildAnimals', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                            <span className="font-medium">Yes</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                            <input type="radio" name="predators" value="No" checked={formData.predatorsWildAnimals === 'No'} onChange={(e) => handleChange('predatorsWildAnimals', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                            <span className="font-medium">No</span>
                          </label>
                        </div>
                      </div>
                      {formData.predatorsWildAnimals === 'Yes' && (
                        <div className="flex items-center gap-3 pl-2">
                          <span className="text-sridasi-neutral-500 shrink-0 font-medium">If yes, specify:</span>
                          <input type="text" value={formData.predatorsSpecify} onChange={(e) => handleChange('predatorsSpecify', e.target.value)} className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest shadow-sm" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-sridasi-neutral-200">
                        <label className="text-sridasi-neutral-700 font-semibold">20. Theft / Trespassing / Security Concerns?</label>
                        <div className="flex items-center gap-4 shrink-0 pl-4">
                          <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                            <input type="radio" name="theft" value="Yes" checked={formData.theftTrespassing === 'Yes'} onChange={(e) => handleChange('theftTrespassing', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                            <span className="font-medium">Yes</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                            <input type="radio" name="theft" value="No" checked={formData.theftTrespassing === 'No'} onChange={(e) => handleChange('theftTrespassing', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                            <span className="font-medium">No</span>
                          </label>
                        </div>
                      </div>
                      {formData.theftTrespassing === 'Yes' && (
                        <div className="flex items-center gap-3 pl-2">
                          <span className="text-sridasi-neutral-500 shrink-0 font-medium">If yes, explain:</span>
                          <input type="text" value={formData.theftExplain} onChange={(e) => handleChange('theftExplain', e.target.value)} className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest shadow-sm" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-sridasi-neutral-200">
                      <label className="text-sridasi-neutral-700 font-semibold">21. Farm Protection: Are you prepared to provide fencing / boundary protection?</label>
                      <div className="flex items-center gap-6 mt-1">
                        <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                          <input type="radio" name="farmProtection" value="Yes" checked={formData.farmProtection === 'Yes'} onChange={(e) => handleChange('farmProtection', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                          <span className="font-medium">Yes</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                          <input type="radio" name="farmProtection" value="No" checked={formData.farmProtection === 'No'} onChange={(e) => handleChange('farmProtection', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                          <span className="font-medium">No</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                          <input type="radio" name="farmProtection" value="Need Guidance" checked={formData.farmProtection === 'Need Guidance'} onChange={(e) => handleChange('farmProtection', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                          <span className="font-medium">Need Guidance</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
console.log("Done");
