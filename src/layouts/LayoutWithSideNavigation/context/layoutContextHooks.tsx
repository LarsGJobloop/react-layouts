import {
  useRef,
  useCallback,
  useSyncExternalStore,
  useContext,
  createContext,
} from "react";

export function useHeaderStore() {
  const store = useRef<string[]>([]);
  const subscribers = useRef(new Set<() => void>());

  const get = useCallback(() => store.current, []);
  const set = useCallback((newHeaders: string[]) => {
    store.current = newHeaders;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => {
      subscribers.current.delete(callback);
    };
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

export function useViewStore() {
  const store = useRef<string>("");
  const subscribers = useRef(new Set<() => void>());

  const get = useCallback(() => store.current, []);
  const set = useCallback((newView: string) => {
    store.current = newView;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => {
      subscribers.current.delete(callback);
    };
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

type LayoutContext = {
  headers: ReturnType<typeof useHeaderStore>;
  view: ReturnType<typeof useViewStore>;
};

export const layoutContext = createContext<LayoutContext | null>(null);

/**
 * @param componentName Name of component to ease debugging
 */
export function useHeaders(componentName: string) {
  const store = useContext(layoutContext);

  if (!store) {
    throw new Error(
      `${componentName} must be a child of the Layout.Root component`
    );
  }

  const headers = useSyncExternalStore(
    store.headers.subscribe,
    store.headers.get
  );

  return { headers, setHeaders: store.headers.set };
}

/**
 * @param componentName Name of component to ease debugging
 */
export function useView(componentName: string) {
  const store = useContext(layoutContext);

  if (!store) {
    throw new Error(
      `${componentName} must be a child of the Layout.Root component`
    );
  }

  const view = useSyncExternalStore(store.view.subscribe, store.view.get);

  return { view, setView: store.view.set };
}
