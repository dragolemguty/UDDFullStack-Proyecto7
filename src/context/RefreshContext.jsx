import { createContext, useState } from 'react';

// Crear el contexto
export const RefreshContext = createContext();

// Proveedor del contextoo
export const RefreshProvider = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  return (
    <RefreshContext.Provider value={{ shouldRefresh, setShouldRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
