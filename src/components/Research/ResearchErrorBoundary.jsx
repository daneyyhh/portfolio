import React from 'react';
import { RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * ResearchErrorBoundary
 * Catches any unhandled exceptions in the Research section.
 * Prevents blank screen crashes and provides a recoverable error state with Retry.
 */
export default class ResearchErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[RESEARCH_COMPONENT_CRASH]: Uncaught error caught by ResearchErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-[#F1F0EA] text-[#000000] font-mono">
          <div className="max-w-xl w-full bg-[#FAF9F5] border border-[#FF0000]/40 p-8 shadow-sm space-y-5 text-center">
            
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000]">
              <AlertTriangle size={24} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-[#FF0000] font-bold uppercase tracking-widest block">
                SYSTEM DIAGNOSTIC // 500_HANDLED
              </span>
              <h2 className="font-sans font-black text-2xl text-[#000000] tracking-tight uppercase">
                Research couldn't be loaded. Please try again.
              </h2>
              <p className="text-xs text-[#555555] leading-relaxed max-w-md mx-auto">
                An unexpected interface or runtime condition occurred while rendering this research view. The error has been captured for diagnostics.
              </p>
            </div>

            {/* Error Diagnostics for Developers */}
            {this.state.error && (
              <div className="text-left bg-[#FFFFFF] border border-[#E2E0D8] p-3 text-[11px] text-[#FF0000] overflow-x-auto max-h-32">
                <code>{this.state.error.toString()}</code>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#000000] text-[#FFFFFF] hover:bg-[#FF0000] transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>Retry Loading</span>
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFFFFF] border border-[#E2E0D8] text-[#000000] hover:border-[#000000] transition-colors font-bold text-xs uppercase tracking-wider"
              >
                <ArrowLeft size={14} />
                <span>Explore Other Sections</span>
              </Link>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
