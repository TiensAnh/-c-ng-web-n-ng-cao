import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentAdminRequest,
  loginAdminRequest,
  registerAdminRequest,
} from '../services/adminAuthService';
import {
  clearStoredAdminSession,
  persistAdminSession,
  readStoredAdminSession,
} from '../utils/adminAuthStorage';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredAdminSession());
  const [isAdminAuthChecking, setIsAdminAuthChecking] = useState(
    () => Boolean(readStoredAdminSession()?.token),
  );

  useEffect(() => {
    let isMounted = true;
    const storedSession = readStoredAdminSession();

    if (!storedSession?.token) {
      setIsAdminAuthChecking(false);
      return undefined;
    }

    const syncCurrentAdmin = async () => {
      try {
        const response = await getCurrentAdminRequest(storedSession.token);

        if (!isMounted) {
          return;
        }

        setSession({
          token: storedSession.token,
          admin: response.admin,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        clearStoredAdminSession();
        setSession(null);
      } finally {
        if (isMounted) {
          setIsAdminAuthChecking(false);
        }
      }
    };

    syncCurrentAdmin();

    return () => {
      isMounted = false;
    };
  }, []);

  const loginAdmin = async (credentials, options = {}) => {
    const response = await loginAdminRequest(credentials);
    const nextSession = {
      token: response.token,
      admin: response.admin,
    };

    persistAdminSession(nextSession, options.rememberMe ?? true);
    setSession(nextSession);
    setIsAdminAuthChecking(false);

    return response;
  };

  const registerAdmin = async (payload) => {
    const response = await registerAdminRequest(payload);
    const nextSession = {
      token: response.token,
      admin: response.admin,
    };

    persistAdminSession(nextSession, true);
    setSession(nextSession);
    setIsAdminAuthChecking(false);

    return response;
  };

  const logoutAdmin = () => {
    clearStoredAdminSession();
    setSession(null);
    setIsAdminAuthChecking(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin: session?.admin || null,
        adminToken: session?.token || null,
        isAdminAuthenticated: Boolean(session?.token),
        isAdminAuthChecking,
        loginAdmin,
        registerAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  }

  return context;
}
