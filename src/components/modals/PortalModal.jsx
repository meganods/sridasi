import React, { useState } from 'react';
import { X, User, Shield, Lock, ArrowRight, CheckCircle2, Fish, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export function PortalModal({ isOpen, onClose, initialRole = 'farmer' }) {
  const [role, setRole] = useState(initialRole); // 'farmer' | 'admin'
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otpOrPass, setOtpOrPass] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-soft-lg border border-sridasi-neutral-200 overflow-hidden">
        
        {/* Role Toggle Header */}
        <div className="p-4 bg-sridasi-surface border-b border-sridasi-neutral-200 flex items-center justify-between">
          <div className="flex p-1 rounded-xl bg-white border border-sridasi-neutral-200">
            <button
              onClick={() => { setRole('farmer'); setIsSuccess(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'farmer' ? 'bg-sridasi-forest text-white shadow-soft-sm' : 'text-sridasi-neutral-600'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Farmer Portal
            </button>
            <button
              onClick={() => { setRole('admin'); setIsSuccess(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'admin' ? 'bg-sridasi-forest text-white shadow-soft-sm' : 'text-sridasi-neutral-600'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-sridasi-neutral-500 hover:bg-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isSuccess ? (
            <div className="py-6 text-center space-y-3 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-heading font-bold text-lg text-sridasi-forest">
                {role === 'farmer' ? 'Farmer Logged In' : 'Admin Authenticated'}
              </h4>
              <p className="text-xs text-sridasi-neutral-600">
                {role === 'farmer' 
                  ? 'Accessing your 2 registered ponds, real-time doctor chats, and diagnostic history.' 
                  : 'Accessing central control: 4,850 farmers, escrow release manager, and consultation logs.'}
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                  const el = document.getElementById('platform-demo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Go to Interactive Platform Studio
              </Button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-sridasi-forest">
                  {role === 'farmer' ? (mode === 'login' ? 'Farmer Login' : 'Register New Farmer') : 'Administrator Login'}
                </h3>
                <p className="text-xs text-sridasi-neutral-500 mt-1">
                  {role === 'farmer' 
                    ? 'Enter your mobile number to receive instant OTP verification' 
                    : 'Secure administrator console for dispute & payment management'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-sridasi-neutral-700 font-bold mb-1">
                    {role === 'farmer' ? 'Mobile Number' : 'Admin Email'}
                  </label>
                  <input
                    type={role === 'farmer' ? 'tel' : 'email'}
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder={role === 'farmer' ? '+91 98765 43210' : 'admin@sridasifarms.com'}
                    className="w-full p-2.5 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                  />
                </div>

                <div>
                  <label className="block text-sridasi-neutral-700 font-bold mb-1">
                    {role === 'farmer' ? 'OTP or Password' : 'Admin Security Key'}
                  </label>
                  <input
                    type="password"
                    required
                    value={otpOrPass}
                    onChange={(e) => setOtpOrPass(e.target.value)}
                    placeholder={role === 'farmer' ? 'Enter 4-digit OTP' : '••••••••••••'}
                    className="w-full p-2.5 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                  />
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center shadow-soft"
                  type="submit"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {role === 'farmer' ? (mode === 'login' ? 'Sign In via OTP' : 'Register Account') : 'Access Admin Dashboard'}
                </Button>
              </form>

              {role === 'farmer' && (
                <div className="text-center pt-2 text-xs text-sridasi-neutral-500">
                  {mode === 'login' ? (
                    <span>New to Sridasi? <button onClick={() => setMode('register')} className="font-bold text-sridasi-forest hover:underline">Register your farm</button></span>
                  ) : (
                    <span>Already registered? <button onClick={() => setMode('login')} className="font-bold text-sridasi-forest hover:underline">Sign in</button></span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default PortalModal;
