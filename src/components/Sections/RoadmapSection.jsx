import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { roadmapPhases } from '../../data/roadmap/roadmapPhasesData';
import { patternCategories, patternsData } from '../../data/roadmap/roadmapPatternsData';
import { toolkitData } from '../../data/roadmap/roadmapToolkitData';
import { projectsLadder } from '../../data/roadmap/roadmapProjectsData';
import { learningResources } from '../../data/roadmap/roadmapResourcesData';
import { learningMethodSteps } from '../../data/roadmap/roadmapMethodData';

import RoadmapHeader from '../Roadmap/RoadmapHeader';
import RoadmapSubNav from '../Roadmap/RoadmapSubNav';
import RoadmapPhasesView from '../Roadmap/RoadmapPhasesView';
import RoadmapMethodView from '../Roadmap/RoadmapMethodView';
import RoadmapPatternsView from '../Roadmap/RoadmapPatternsView';
import RoadmapToolkitView from '../Roadmap/RoadmapToolkitView';
import RoadmapProjectsView from '../Roadmap/RoadmapProjectsView';
import RoadmapResourcesView from '../Roadmap/RoadmapResourcesView';
import RoadmapTrackerView from '../Roadmap/RoadmapTrackerView';

const EASE = [0.16, 1, 0.3, 1];

export default function RoadmapSection() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState('phases'); // 'phases' | 'method' | 'patterns' | 'toolkit' | 'projects' | 'resources' | 'tracker'
  const [activePhase, setActivePhase] = useState('01');

  const handleSelectPhase = (phaseId) => {
    setActivePhase(phaseId);
    setActiveTab('phases');
  };

  const counts = {
    phases: String(roadmapPhases.length).padStart(2, '0'),
    method: String(learningMethodSteps.length).padStart(2, '0'),
    patterns: String(patternsData.length).padStart(2, '0'),
    toolkit: String(toolkitData.length).padStart(2, '0'),
    projects: String(projectsLadder.length).padStart(2, '0'),
    resources: String(learningResources.length).padStart(2, '0')
  };

  return (
    <section
      id="roadmap"
      data-section="roadmap"
      className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#F1F0EB] text-[#111111] relative overflow-x-clip border-t border-[#C9C7C0] font-mono w-full"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative z-10 w-full">
        
        {/* Left Margin Vertical Tag: 06 // ROADMAP */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-start h-full">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-4xl font-extrabold text-[#FF1E27]"
          >
            06
          </motion.div>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="vertical-tag font-mono text-xs text-[#555555] uppercase tracking-[0.3em] font-bold mt-6"
          >
            ROADMAP
          </motion.div>
        </div>

        {/* Main Roadmap Content Stream (11 Columns) */}
        <div className="lg:col-span-11 space-y-8 sm:space-y-10 w-full max-w-full">
          
          {/* Editorial Section Header */}
          <RoadmapHeader
            activePhase={activePhase}
            onSelectPhase={handleSelectPhase}
            phases={roadmapPhases}
          />

          {/* Segmented Sub-Navigation Bar */}
          <RoadmapSubNav
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            counts={counts}
          />

          {/* Active View Container */}
          <div className="pt-2">
            {activeTab === 'phases' && (
              <RoadmapPhasesView
                phases={roadmapPhases}
                activePhaseId={activePhase}
                onSelectPhase={setActivePhase}
              />
            )}

            {activeTab === 'method' && <RoadmapMethodView />}

            {activeTab === 'patterns' && <RoadmapPatternsView />}

            {activeTab === 'toolkit' && <RoadmapToolkitView />}

            {activeTab === 'projects' && <RoadmapProjectsView />}

            {activeTab === 'resources' && <RoadmapResourcesView />}

            {activeTab === 'tracker' && <RoadmapTrackerView />}
          </div>
        </div>

      </div>
    </section>
  );
}
