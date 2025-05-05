import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { captureException } from '@/lib/sentry';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    captureException(error, {
      errorInfo,
      componentStack: errorInfo.componentStack,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Refresh Page
              </Button>
              <Button
                onClick={() => this.setState({ hasError: false, error: null })}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 