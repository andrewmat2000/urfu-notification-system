import type { ErrorInfo, ReactNode } from "react";
import React from "react";

interface IErrorBoundaryProps {
    children: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
    error: string;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: "" };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error: error.message };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        alert(error.message);
        alert("stack length = " + errorInfo.componentStack?.length);
    }

    render() {
        const { hasError, error } = this.state;
        const { children } = this.props;
        if (hasError) {
            return <h1>{error}</h1>;
        }

        return children;
    }
}
