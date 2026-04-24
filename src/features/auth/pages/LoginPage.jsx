import { useState } from 'react';
import client from '../../../services/api/client';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('researcher@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      navigate('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-background p-6">
      <div className="w-full max-w-md bg-white border border-zinc-200 p-12 rounded">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center font-bold text-xl font-h3">
            C
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-black uppercase font-h2">
            CompareHub
          </h1>
        </div>
        
        <h2 className="text-xl font-bold mb-6 text-center font-h3 uppercase tracking-tight">Login to Research Systems</h2>
        
        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-label text-xs uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body transition-colors"
              required
            />
          </div>
          <div>
            <label className="block font-label text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 font-label text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs text-zinc-400 font-body">
          Default credentials: researcher@example.com / password123
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
