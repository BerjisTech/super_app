'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { AuthService } from '@service/Auth';

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any | null>(null); // Replace 'any' with the actual type if you know it

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    setError(null); // Reset error state
    try {
      const user = await AuthService.login({email: email, password: password}, router);
      setResponse(user); // Set response
      console.log('User signed in:', user);
      // Navigate to another page or do something else
      router.push("/");
    } catch (error: any) {
      setError(error.message || 'An error occurred'); // Set error message
    } finally {
      setLoading(false); // Reset loading state whether request was successful or not
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-end p-5">
      <div className='h-full w-1/3 max-sm:w-full rounded-md border border-solid border-slate-500 p-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-500">Email</label>
            <input type="email" className="outline-none text-slate-950 mt-1 block w-full rounded-md border border-solid border-slate-500 p-2" required
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-500">Password</label>
            <input type="password" className="outline-none text-slate-950 mt-1 block w-full rounded-md border border-solid border-slate-500 p-2" required value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <button className="bg-slate-500 text-white rounded-md px-3 py-2">Sign In</button>
          </div>
          {/* Display loading */}
          {loading && <div>Loading...</div>}

          {/* Display error */}
          {error && <div>Error: {error}</div>}

          {/* Display response */}
          {response && <div>Response: {JSON.stringify(response, null, 2)}</div>}
        </form>
      </div>
    </div>
  )
}

export default page