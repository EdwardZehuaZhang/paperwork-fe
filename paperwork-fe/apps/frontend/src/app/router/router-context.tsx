import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Route = '/' | '/workflows';

interface RouterContextType {
  currentRoute: Route;
  navigate: (route: Route) => void;
  workflowId?: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<Route>('/');
  const [workflowId, setWorkflowId] = useState<string | undefined>();

  useEffect(() => {
    // Parse initial route from URL
    const path = window.location.pathname;
    if (path.startsWith('/workflows')) {
      setCurrentRoute('/workflows');
      const match = path.match(/\/workflows\/(.+)/);
      if (match) {
        setWorkflowId(match[1]);
      }
    } else {
      setCurrentRoute('/');
    }

    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/workflows')) {
        setCurrentRoute('/workflows');
        const match = path.match(/\/workflows\/(.+)/);
        setWorkflowId(match ? match[1] : undefined);
      } else {
        setCurrentRoute('/');
        setWorkflowId(undefined);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: Route, id?: string) => {
    const path = id ? `${route}/${id}` : route;
    window.history.pushState({}, '', path);
    setCurrentRoute(route);
    setWorkflowId(id);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate, workflowId }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
}
