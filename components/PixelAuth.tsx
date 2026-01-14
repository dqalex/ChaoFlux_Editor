import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { PixelCard, PixelButton, PixelInput } from './PixelComponents';
import { PixelLogo } from './PixelLogo';

interface PixelAuthProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export const PixelAuth: React.FC<PixelAuthProps> = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Signup successful! Check your email for confirmation (if configured) or login.');
        setIsSignUp(false); // Switch to login after signup
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="max-w-md w-full animate-fade-in-up relative">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white font-pixel text-xl hover:text-red-500"
        >
          [ CLOSE ]
        </button>

        <div className="flex justify-center mb-6">
          <PixelLogo className="w-20 h-20 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
        </div>
        <PixelCard title={isSignUp ? "PLAYER REGISTRATION" : "CLOUD SYNC LOGIN"}>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="font-pixel block mb-1">EMAIL</label>
              <PixelInput
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hero@chaoflux.com"
              />
            </div>
            <div>
              <label className="font-pixel block mb-1">PASSWORD</label>
              <PixelInput
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 font-pixel text-sm">
                ERROR: {error}
              </div>
            )}

            <div className="flex flex-col gap-3 mt-6">
              <PixelButton type="submit" variant="primary" loading={loading} className="w-full text-xl py-3">
                {isSignUp ? "REGISTER" : "LOGIN & SYNC"}
              </PixelButton>
              
              <div className="flex justify-between items-center text-sm font-pixel text-gray-600 mt-2">
                <span>{isSignUp ? "Already a player?" : "New challenger?"}</span>
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-600 hover:underline uppercase"
                >
                  {isSignUp ? "Login Here" : "Create Account"}
                </button>
              </div>
            </div>
          </form>
        </PixelCard>
      </div>
    </div>
  );
};