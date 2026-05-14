import React from 'react';

interface StoreProviderProps {
  children: React.ReactNode
}

/**
 * StoreProvider wraps the application tree to provide Zustand store context.
 * Currently a transparent wrapper — in place as the required architectural
 * boundary for testing and potential future store injection or SSR needs.
 *
 * @param {StoreProviderProps} props - Contains children to wrap.
 * @returns {JSX.Element} The provider-wrapped component tree.
 */
function StoreProvider({ children }: StoreProviderProps) {
  // Intentionally transparent: Zustand stores are module-level singletons.
  // This boundary exists for testability (inject mock stores) and future
  // multi-instance or SSR scenarios.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export { StoreProvider };
