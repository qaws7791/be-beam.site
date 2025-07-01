import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './app.css';
import type { Route } from './+types/root';
import Navbar from './components/organisms/Navbar';
import { Toaster } from './components/atoms/toaster/Toaster';
import Footer from './components/organisms/Footer';
import { withOptionalAuth } from './lib/auth.server';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 3,
      staleTime: 5 * 60 * 1000,
    },
  },
});

if (import.meta.env.DEV && typeof window !== 'undefined') {
  import('./mocks/browser').then(({ worker }) => worker.start());
}

export const links: Route.LinksFunction = () => [
  {
    rel: 'stylesheet',
    as: 'style',
    crossOrigin: 'anonymous',
    href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  return withOptionalAuth(request);
}

export default function App({ loaderData }: Route.ComponentProps) {
  const path = useLocation().pathname.slice(1);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white whitespace-pre-wrap text-black">
        <Navbar user={loaderData.user} />
        <Outlet />
        <Toaster />

        {path !== 'login' && <Footer />}
      </div>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
