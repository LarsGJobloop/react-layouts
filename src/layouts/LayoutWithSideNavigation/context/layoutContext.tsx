import {
  useViewStore,
  useHeaderStore,
  layoutContext,
} from "./layoutContextHooks";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <layoutContext.Provider
      value={{ headers: useHeaderStore(), view: useViewStore() }}
    >
      {children}
    </layoutContext.Provider>
  );
}
