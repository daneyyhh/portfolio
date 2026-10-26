import React from 'react';

export default function RoadmapSubNav({ activeTab, onChangeTab, counts = {} }) {
  const tabs = [
    { id: 'phases', label: '01. PHASES', count: counts.phases || '08' },
    { id: 'method', label: '02. METHOD', count: counts.method || '08' },
    { id: 'patterns', label: '03. PATTERNS', count: counts.patterns || '29' },
    { id: 'toolkit', label: '04. TOOLKIT', count: counts.toolkit || '23' },
    { id: 'projects', label: '05. PROJECTS', count: counts.projects || '06' },
    { id: 'resources', label: '06. RESOURCES', count: counts.resources || '15' },
    { id: 'tracker', label: '07. TRACKER', count: 'LOCAL' }
  ];

  return (
    <div className="w-full border-b border-[#C9C7C0] bg-[#FAF9F5] font-mono sticky top-[60px] z-20 overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-1 sm:gap-2 min-w-max px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`px-3 py-2 text-xs font-bold transition-all duration-150 flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-sm'
                  : 'bg-[#FFFFFF] text-[#444440] border-[#C9C7C0] hover:border-[#111111] hover:text-[#000000]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1 py-0.2 border ${
                  isActive
                    ? 'border-[#FF1E27] text-[#FF1E27]'
                    : 'border-[#D0CECB] text-[#888880]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
