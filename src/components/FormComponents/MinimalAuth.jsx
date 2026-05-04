import React, { useState } from 'react';
import { Loader2, CheckCircle, Lock, Mail } from 'lucide-react';

export default function MinimalAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setStatus('loading');
      // Simulate authentication request
      setTimeout(() => {
        setStatus('success');
        
        // Reset back to idle after a few seconds
        setTimeout(() => {
          setStatus('idle');
          setEmail('');
          setPassword('');
        }, 3500);
      }, 2000);
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      {/* Outer container matching the screenshot's warm grey/beige tone */}
      <div className="relative overflow-hidden oklab-border bg-surface-container/60 p-10 shadow-sm transition-all duration-500 ease-in-out w-full sm:w-[400px] min-w-[280px]">
        
        {status === 'success' ? (
          /* Success State - smooth fade-in replacement */
          <div className="flex h-[320px] flex-col items-center justify-center text-center animate-in fade-in duration-700">
            <div className="mb-6 rounded-full bg-emerald-500/10 p-4 text-emerald-500">
              <CheckCircle className="h-10 w-10" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-2xl font-medium text-primary">Access Granted</h3>
            <p className="text-[15px] text-on-surface-variant/60">Secure session established for {email}</p>
          </div>
        ) : (
          /* Form State */
          <div className={`transition-all duration-500 ${status === 'loading' ? 'opacity-50 blur-[2px]' : 'opacity-100'}`}>
            <div className="mb-8">
              <span className="mb-4 block text-[13px] font-bold tracking-[0.15em] text-on-surface-variant/40 uppercase">
                Entry Point
              </span>
              <h2 className="text-[28px] font-normal tracking-tight text-primary">
                Minimal Auth
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email Field */}
              <div>
                <label className="mb-2 block text-[13px] font-semibold tracking-wider text-on-surface-variant/60 uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={status === 'loading'}
                    required
                    className="w-full border-b oklab-border bg-surface/50 px-4 py-3.5 text-base text-primary placeholder-on-surface-variant/30 transition-colors focus:border-error-warm/40 focus:bg-surface/80 focus:outline-none disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="mb-2 block text-[13px] font-semibold tracking-wider text-on-surface-variant/60 uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={status === 'loading'}
                    required
                    className="w-full border-b oklab-border bg-surface/50 px-4 py-3.5 text-base text-primary placeholder-on-surface-variant/30 transition-colors focus:border-error-warm/40 focus:bg-surface/80 focus:outline-none disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading' || !email || !password}
                className="mt-2 flex w-full items-center justify-center bg-primary text-on-primary py-4 text-[16px] font-semibold transition-all hover:bg-error-warm active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
