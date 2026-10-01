import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Package, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export function ProductDetailModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState('Commercial Batch (25 - 100 Liters / Kg)');
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form fields every time modal opens or a different product is selected
  useEffect(() => {
    if (isOpen) {
      setFarmerName('');
      setFarmerPhone('');
      setQuantity('Commercial Batch (25 - 100 Liters / Kg)');
      setIsSent(false);
      setErrors({});
    }
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    const trimmedName = farmerName.trim();
    if (!trimmedName) {
      newErrors.farmerName = 'Please enter your full name';
    } else if (trimmedName.length < 2) {
      newErrors.farmerName = 'Name must be at least 2 characters';
    } else if (/^\d+$/.test(trimmedName)) {
      newErrors.farmerName = 'Name cannot contain only numbers';
    }

    // Validate Phone / WhatsApp (Indian standard 10-digit mobile validation)
    const cleanPhone = farmerPhone.replace(/\D/g, ''); // strip all non-digits
    if (!farmerPhone.trim()) {
      newErrors.farmerPhone = 'Please enter your phone / WhatsApp number';
    } else if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      newErrors.farmerPhone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquiry = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-lg border border-sridasi-neutral-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div 
          className="p-6 text-white flex items-center justify-between shrink-0"
          style={{ backgroundColor: product.color || '#0B5D45' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-md">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{product.category}</span>
              <h3 className="font-heading font-extrabold text-xl text-white">{product.name}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSent ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-extrabold text-xl text-sridasi-forest">
                Inquiry & Sample Request Received!
              </h4>
              <p className="text-xs sm:text-sm text-sridasi-neutral-600 max-w-md mx-auto">
                Our agri-biologist will contact <strong className="text-sridasi-forest">{farmerPhone}</strong> within 2 hours with the official Certificate of Analysis (COA), dosage protocol, and commercial batch pricing for <strong>{product.name}</strong>.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsSent(false);
                  onClose();
                }}
              >
                Close & Return
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Badge variant="green" size="sm">{product.badge}</Badge>
                <p className="text-xs text-sridasi-neutral-700 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sridasi-leaf-600">
                  Documented Efficacy & Field Parameters
                </span>
                <div className="space-y-1.5">
                  {product.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-sridasi-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-green shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable For */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sridasi-neutral-400 block mb-1.5">
                  Recommended For
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.suitableFor.map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-sridasi-primary-50 text-sridasi-forest text-xs font-semibold border border-sridasi-primary-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Inquiry Form */}
              <form onSubmit={handleInquiry} noValidate className="p-4 rounded-2xl bg-white border border-sridasi-neutral-200 space-y-3 text-xs">
                <div className="font-heading font-bold text-xs text-sridasi-forest">
                  Request Commercial Pricing & Sample Kit
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sridasi-neutral-700 mb-1 font-semibold">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={farmerName}
                      onChange={(e) => {
                        setFarmerName(e.target.value);
                        if (errors.farmerName) {
                          setErrors((prev) => ({ ...prev, farmerName: null }));
                        }
                      }}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full p-2.5 rounded-xl bg-sridasi-surface border text-sridasi-forest text-xs transition-colors focus:outline-none ${
                        errors.farmerName
                          ? 'border-red-500 bg-red-50/30 focus:border-red-600'
                          : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                      }`}
                    />
                    {errors.farmerName && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.farmerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 mb-1 font-semibold">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={farmerPhone}
                      onChange={(e) => {
                        setFarmerPhone(e.target.value);
                        if (errors.farmerPhone) {
                          setErrors((prev) => ({ ...prev, farmerPhone: null }));
                        }
                      }}
                      placeholder="+91 98765 43210"
                      className={`w-full p-2.5 rounded-xl bg-sridasi-surface border text-sridasi-forest text-xs transition-colors focus:outline-none ${
                        errors.farmerPhone
                          ? 'border-red-500 bg-red-50/30 focus:border-red-600'
                          : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                      }`}
                    />
                    {errors.farmerPhone && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.farmerPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sridasi-neutral-700 mb-1 font-semibold">Requirement Volume</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-sridasi-forest text-xs focus:outline-none focus:border-sridasi-forest cursor-pointer"
                  >
                    <option>Trial Sample (1-5 Liters / Pack)</option>
                    <option>Commercial Batch (25 - 100 Liters / Kg)</option>
                    <option>Bulk Federation Order (500+ Liters)</option>
                    <option>Distribution / Dealership Inquiry</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="outline" size="sm" type="button" onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="primary" size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5" />}>
                    Send Sample Request
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductDetailModal;

