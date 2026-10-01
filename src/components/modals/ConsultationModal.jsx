import React, { useState } from 'react';
import { X, Video, Phone, MessageSquare, CheckCircle2, Star, Sparkles, Shield, User, Clock, AlertTriangle } from 'lucide-react';
import BRAND_INFO from '../../data/brandInfo';
import Button from '../ui/Button';

export function ConsultationModal({ isOpen, onClose }) {
  const [selectedDocId, setSelectedDocId] = useState(BRAND_INFO.specialists[0].id);
  const [problemType, setProblemType] = useState('mortality');
  const [consultChannel, setConsultChannel] = useState('video');
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [pondAcres, setPondAcres] = useState('2.5');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const activeDoc = BRAND_INFO.specialists.find(d => d.id === selectedDocId) || BRAND_INFO.specialists[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-lg border border-sridasi-neutral-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-sridasi-forest to-sridasi-dark text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sridasi-yellow text-sridasi-forest flex items-center justify-center font-bold">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Book Aqua-Teleconsultation</h3>
              <p className="text-xs text-sridasi-leaf-200">Connect with certified fisheries doctors in minutes</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-extrabold text-xl text-sridasi-forest">
                Consultation Confirmed!
              </h4>
              <p className="text-xs sm:text-sm text-sridasi-neutral-600 max-w-md mx-auto">
                <strong>{activeDoc.name}</strong> will connect with you via {consultChannel.toUpperCase()} on{' '}
                <span className="text-sridasi-forest font-bold">{farmerPhone || '+91 98765 43210'}</span> in 5-10 minutes. 
                Your emergency first-aid advice is also sent on WhatsApp.
              </p>
              <div className="p-4 rounded-2xl bg-sridasi-surface text-xs text-sridasi-forest text-left space-y-1 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-sridasi-neutral-500">Case ID:</span>
                  <span className="font-mono font-bold">#SRI-{(Math.random()*10000).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sridasi-neutral-500">Consultant:</span>
                  <span className="font-bold">{activeDoc.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sridasi-neutral-500">Escrow Protected:</span>
                  <span className="text-emerald-700 font-bold">✓ ₹499 (Guaranteed)</span>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
              >
                Close & View Portal
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Doctor Selector */}
              <div>
                <label className="block text-xs font-bold text-sridasi-forest mb-2">Select Specialist</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {BRAND_INFO.specialists.map((doc) => (
                    <button
                      type="button"
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedDocId === doc.id
                          ? 'border-sridasi-forest bg-sridasi-primary-50 ring-2 ring-sridasi-forest/20'
                          : 'border-sridasi-neutral-200 bg-white hover:bg-sridasi-surface'
                      }`}
                    >
                      <div className="font-bold text-sridasi-forest text-xs">{doc.name}</div>
                      <div className="text-[10px] text-sridasi-neutral-500">{doc.role.split('&')[0]}</div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-1">● {doc.availableStatus}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Type & Channel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-sridasi-forest mb-1">Issue Category</label>
                  <select
                    value={problemType}
                    onChange={(e) => setProblemType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                  >
                    {BRAND_INFO.problemCategories.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-sridasi-forest mb-1">Consultation Channel</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['video', 'call', 'chat'].map((ch) => (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => setConsultChannel(ch)}
                        className={`py-2 rounded-xl text-center font-bold capitalize transition-all ${
                          consultChannel === ch
                            ? 'bg-sridasi-forest text-white'
                            : 'bg-sridasi-surface text-sridasi-neutral-700 border border-sridasi-neutral-200'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Farmer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-sridasi-forest mb-1">Farmer Name</label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="e.g. Ramesh Jena"
                    className="w-full p-2.5 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sridasi-forest mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full p-2.5 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                  />
                </div>
              </div>

              {/* Pond Area */}
              <div>
                <label className="block text-xs font-bold text-sridasi-forest mb-1">Pond Water Area (Acres)</label>
                <input
                  type="text"
                  value={pondAcres}
                  onChange={(e) => setPondAcres(e.target.value)}
                  placeholder="e.g. 2.5 Acres"
                  className="w-full p-2.5 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                />
              </div>

              <div className="p-3 rounded-2xl bg-sridasi-primary-50 text-[11px] text-sridasi-forest flex items-start gap-2">
                <Shield className="w-4 h-4 text-sridasi-forest shrink-0 mt-0.5" />
                <span>100% Escrow Protection: Full refund if the expert does not connect within 15 minutes.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                >
                  Confirm & Connect ₹499
                </Button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default ConsultationModal;
