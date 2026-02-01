
import React from 'react';

interface DonateProps {
  onBack: () => void;
}

const PAYPAL_URL = "https://www.paypal.com/donate?hosted_button_id=YOUR_ID";
const CRYPTO_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

const copyToClipboard = (text: string) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
    // lightweight feedback; avoid blocking alerts in mobile
    try { window.dispatchEvent(new CustomEvent('toast', { detail: 'Address copied' })); } catch {}
  } else {
    // fallback
    const tmp = document.createElement('textarea');
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
  }
};

const Donate: React.FC<DonateProps> = ({ onBack }) => {
  return (
    <div className="h-full px-6 py-8 overflow-y-auto max-w-lg mx-auto pb-24">
      <p className="text-center text-gray-400 text-sm mb-10 italic">
        Your contributions help us maintain the servers and continue developing sonic tools for everyone.
      </p>

      <div className="space-y-6">
        <section className="glass p-6 rounded-[32px] border border-blue-500/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-[#003087]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M20.067 8.178c-.644 4.153-3.21 6.324-7.442 6.324H9.418l-1.07 6.845H4l2.67-17.114h6.587c4.102 0 6.64 2.126 6.81 5.445.011.233.011.45.011.667-.011.633-.044 1.25-.13 1.833zM15.467 8.3c-.011-.1-.011-.183-.022-.267-.22-2.133-1.844-3.266-4.322-3.266H8.56l-1.026 6.556h1.22c2.81 0 4.634-1.344 5.034-4.522.055-.411.066-.81.066-1.189.011-.478-.011-.9-.055-1.312z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg">PayPal</h4>
          </div>
          <a 
            href={PAYPAL_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#0070ba] text-white rounded-2xl font-bold tracking-widest text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-500/10"
          >
            DONATE VIA PAYPAL
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </section>

        <section className="glass p-6 rounded-[32px] border border-gray-500/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-500/10 flex items-center justify-center text-orange-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg">Crypto (ETH / ERC20)</h4>
          </div>
          
          <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between gap-3 border border-white/5">
            <code className="text-[10px] text-gray-400 truncate font-mono">
              {CRYPTO_ADDRESS}
            </code>
            <button 
              onClick={() => copyToClipboard(CRYPTO_ADDRESS)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              title="Copy Address"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
          <p className="text-[9px] text-gray-600 mt-3 text-center uppercase tracking-widest font-bold">
            Only send ETH or ERC-20 tokens to this address.
          </p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none">
        <button 
          onClick={onBack}
          className="w-full max-w-lg mx-auto pointer-events-auto py-5 glass border-white/10 rounded-[28px] font-bold tracking-widest text-xs transition-all active:scale-95 shadow-2xl backdrop-blur-3xl uppercase text-gray-400"
        >
          GO BACK
        </button>
      </div>
    </div>
  );
};

export default Donate;
