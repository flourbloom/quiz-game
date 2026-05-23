import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import '../App.css';

export const Auth = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = isSignUp
        ? await register({ name, email, password })
        : await login({ email, password });

      setUser(user);
      navigate('/');
    } catch (err) {
      if (isAxiosError(err)) {
        const apiMessage = err.response?.data?.message;
        setError(typeof apiMessage === 'string' ? apiMessage : 'Unable to complete authentication');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to complete authentication');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="auth-kicker">Quiz Game</p>
          <h2>{isSignUp ? 'Create account' : 'Welcome back'}</h2>
          <p className="auth-subtitle">
            {isSignUp
              ? 'Create your profile to join the game.'
              : 'Sign in to continue to the lobby.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
        {isSignUp ? (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="auth-input"
          />
        ) : null}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="auth-input"
        />
        <button className="auth-button auth-primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      {error ? <p className="auth-error">{error}</p> : null}

      <button
        className="auth-button auth-secondary-button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError('');
          setName('');
          setPassword('');
        }}
        type="button"
      >
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
      </div>
    </div>
  );
};

export default Auth;