import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "./ui/Button";

interface Props {
  children: ReactNode;
}

interface State {
  comErro: boolean;
}

// Evita página em branco: se algo quebrar durante a renderização,
// mostra uma mensagem com opção de recarregar em vez de travar a tela toda.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { comErro: false };

  static getDerivedStateFromError(): State {
    return { comErro: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Erro não tratado na interface:", error, info.componentStack);
  }

  render() {
    if (this.state.comErro) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-secondary px-4 text-center text-white">
          <h1 className="font-sans text-2xl font-bold">Algo deu errado</h1>
          <p className="max-w-md font-sans text-sm text-text-footer">
            A página encontrou um problema inesperado. Isso costuma acontecer quando o
            servidor está instável. Tente recarregar.
          </p>
          <Button onClick={() => window.location.reload()}>Recarregar página</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
