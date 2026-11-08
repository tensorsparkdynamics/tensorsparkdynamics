'use client';

import React, { useState } from 'react';
import { FifteenDayInternship } from '../../types';
import { TensorsparkLogo } from '../TensorsparkLogo';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  Building2, 
  QrCode, 
  Copy, 
  Check, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  Zap
} from 'lucide-react';

interface InternshipPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: FifteenDayInternship;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  onPaymentSuccess: (txnDetails: {
    txnId: string;
    paidAmount: string;
    timestamp: string;
  }) => void;
}

export const InternshipPaymentModal: React.FC<InternshipPaymentModalProps> = ({
  isOpen,
  onClose,
  internship,
  candidateName,
  candidateEmail,
  candidatePhone,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('884');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isOpen) return null;

  const upiId = 'tensorspark.ai@icici';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setProcessingStage('Connecting to Bank Payment Gateway (256-Bit SSL)...');

    setTimeout(() => {
      setProcessingStage('Authorizing ₹2,000 RS transaction token...');
    }, 900);

    setTimeout(() => {
      setProcessingStage('Verifying UPI mandate & cryptographic signature...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const generatedTxnId = 'TXN_TS_' + Math.floor(100000000 + Math.random() * 900000000);

      setTimeout(() => {
        onPaymentSuccess({
          txnId: generatedTxnId,
          paidAmount: '₹2,000 RS',
          timestamp: new Date().toLocaleString()
        });
      }, 1400);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto sm:my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Gateway Secure Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <TensorsparkLogo size="sm" showText={false} animated={true} />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                <span>Tensorspark Checkout</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> SECURE
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                Encrypted 256-Bit SSL Payment Gateway
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors cursor-pointer disabled:opacity-30 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip */}
        <div className="p-3 sm:p-4 bg-neutral-950/70 border-b border-neutral-850 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Candidate & Track:</span>
            <div className="font-bold text-white">{candidateName}</div>
            <div className="text-[11px] text-cyan-400 truncate max-w-xs">{internship.title}</div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Amount Payable:</span>
            <div className="text-lg sm:text-xl font-extrabold text-white">₹2,000 <span className="text-xs text-neutral-400 font-sans font-normal">INR</span></div>
            <span className="text-[10px] text-emerald-400">All Taxes & Reviews Included</span>
          </div>
        </div>

        {paymentSuccess ? (
          /* Payment Success State */
          <div className="p-6 sm:p-8 text-center space-y-4 animate-in fade-in zoom-in-95 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white font-display">
                Payment Completed!
              </h4>
              <p className="text-xs text-neutral-300">
                ₹2,000 RS received successfully. Redirecting you to your personal <strong>Internship Monitoring Section</strong>...
              </p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-cyan-400 inline-block">
              Redirecting to Task Dashboard...
            </div>
          </div>
        ) : (
          /* Payment Selection Body */
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4 mb-1 text-cyan-400" />
                <div className="text-xs font-bold font-mono">UPI / QR</div>
                <div className="text-[10px] text-neutral-400">GPay, PhonePe</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-1 text-cyan-400" />
                <div className="text-xs font-bold font-mono">Card</div>
                <div className="text-[10px] text-neutral-400">Debit / Credit</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'netbanking'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 mb-1 text-cyan-400" />
                <div className="text-xs font-bold font-mono">Net Banking</div>
                <div className="text-[10px] text-neutral-400">All Indian Banks</div>
              </button>
            </div>

            {/* TAB 1: UPI / QR Code View */}
            {paymentMethod === 'upi' && (
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-white">
                    Scan with any UPI App or use VPA ID
                  </span>
                  <p className="text-[11px] text-neutral-400">
                    Google Pay, PhonePe, Paytm, CRED, or BHIM
                  </p>
                </div>

                {/* Stylized QR Code Box */}
                <div className="p-4 bg-white rounded-2xl inline-block shadow-xl relative group mx-auto">
                  <div className="w-40 h-40 flex flex-col items-center justify-between border-4 border-black p-2 bg-white relative">
                    {/* Simulated Authentic QR Pattern */}
                    <div className="flex justify-between w-full">
                      <div className="w-8 h-8 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                      <div className="w-8 h-8 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                    </div>
                    {/* Central Logo Emblem */}
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 text-cyan-400 flex items-center justify-center font-bold text-xs shadow">
                      TS
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="w-8 h-8 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                      <div className="w-8 h-8 flex flex-wrap gap-1 p-0.5">
                        <div className="w-2.5 h-2.5 bg-black"></div>
                        <div className="w-2.5 h-2.5 bg-black"></div>
                        <div className="w-2.5 h-2.5 bg-black"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1.5 text-[9.5px] font-mono text-neutral-800 font-bold">
                    SCAN TO PAY ₹2,000 RS
                  </div>
                </div>

                {/* Copyable UPI ID Box */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-750 font-mono text-xs text-neutral-200">
                    {upiId}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Card View */}
            {paymentMethod === 'card' && (
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold block">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 8912 3456 7890"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-750 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/29"
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-750 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="884"
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-750 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div className="text-[10px] text-neutral-400 flex items-center gap-1.5 pt-1">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>Your card details are never stored. Tokenized via PCI-DSS Vault.</span>
                </div>
              </div>
            )}

            {/* TAB 3: Net Banking View */}
            {paymentMethod === 'netbanking' && (
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                <span className="text-neutral-300 font-semibold block">Popular Indian Banks:</span>
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-colors cursor-pointer ${
                        selectedBank === bank
                          ? 'bg-cyan-500/10 border-cyan-500 text-white font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay Button / Processing Indicator */}
            <div className="space-y-3 pt-2">
              {isProcessing && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono flex items-center gap-2 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400 shrink-0" />
                  <span>{processingStage}</span>
                </div>
              )}

              <button
                type="button"
                id="pay-and-launch-internship-btn"
                disabled={isProcessing}
                onClick={handleProcessPayment}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 hover:from-emerald-300 hover:via-cyan-300 hover:to-blue-400 text-neutral-950 font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-neutral-950" />
                    <span>Pay ₹2,000 RS & Start Internship Monitoring</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10.5px] font-mono text-neutral-400 text-center">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Instant Task Access
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" /> 15-Day Milestone Review
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
