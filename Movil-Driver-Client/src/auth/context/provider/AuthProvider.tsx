import { AuthContext } from "@/auth/context/AuthContext";
import { useMemo, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(false);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      login: () => {
        console.log('login');
      },
      logout: () => {
        console.log('logout');
      },
    }),
    [token]
  );

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      { children }
    </AuthContext.Provider>
  );
}