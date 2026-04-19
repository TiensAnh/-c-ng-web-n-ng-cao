import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUserRequest, loginRequest, registerRequest } from '../services/authService';
import { clearStoredSession, persistSession, readStoredSession } from '../utils/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());
  const [isAuthChecking, setIsAuthChecking] = useState(() => Boolean(readStoredSession()?.token));

  useEffect(() => {
    let isMounted = true;
    const storedSession = readStoredSession();

    if (!storedSession?.token) {
      setIsAuthChecking(false);
      return undefined;
    }

    const syncCurrentUser = async () => {
      try {
        const response = await getCurrentUserRequest(storedSession.token);

        if (!isMounted) {
          return;
        }

        setSession({
          token: storedSession.token,
          user: response.user,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        clearStoredSession();
        setSession(null);
      } finally {
        if (isMounted) {
          setIsAuthChecking(false);
        }
      }
    };

    syncCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials, options = {}) => {
    const response = await loginRequest(credentials);
    const nextSession = {
      token: response.token,
      user: response.user,
    };

    persistSession(nextSession, options.rememberMe ?? true);
    setSession(nextSession);

    return response;
  };

  const register = async (payload) => {
    const response = await registerRequest(payload);
    const nextSession = {
      token: response.token,
      user: response.user,
    };

    persistSession(nextSession, true);
    setSession(nextSession);

    return response;
  };

  const logout = () => {
    clearStoredSession();
    setSession(null);
    setIsAuthChecking(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthChecking,
        isAuthenticated: Boolean(session?.token),
        token: session?.token || null,
        user: session?.user || null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
