import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ code, language = 'python', filename = 'implementation.py' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative rounded-none border border-[#E2E0D8] bg-[#0E0E0E] overflow-hidden my-6 font-mono">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161616] border-b border-white/10 text-xs">
        <div className="flex items-center gap-2.5 text-neutral-300">
          <Terminal size={14} className="text-[#FF0000]" />
          <span className="font-bold tracking-wider uppercase text-[11px] text-white">
            {filename}
          </span>
          <span className="text-[10px] text-neutral-400 px-1.5 py-0.5 bg-white/5 border border-white/10 uppercase">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-neutral-300 hover:text-white px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={12} className="text-[#FF0000]" />
              <span className="text-[#FF0000] font-bold">COPIED</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="p-4 overflow-x-auto text-xs leading-relaxed text-neutral-200 font-mono">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                <td className="pr-4 select-none text-neutral-600 text-right w-10 text-[11px] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-[12px] text-neutral-200">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
