import React from 'react';
import { useCursor } from './useCursor';

const Cursor = () => {
    // Initialize Hook
    useCursor();

    return (
        <>
            <style>{`
        body { cursor: none; }
        .custom-cursor {
          position: fixed;
          top: 0; left: 0;
          width: 12px; height: 12px;
          background-color: #00ff88;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }
        .custom-cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1px solid #00ff88;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center; justify-content: center;
        }
        .custom-cursor-label {
          font-family: monospace;
          font-size: 10px;
          color: black;
          opacity: 0;
          transition: opacity 0.2s;
        }
        @media (pointer: coarse) {
          .custom-cursor, .custom-cursor-ring { display: none; }
          body { cursor: auto; }
        }
      `}</style>

            <div className="custom-cursor"></div>
            <div className="custom-cursor-ring">
                <span className="custom-cursor-label">→</span>
            </div>
        </>
    );
};

export default Cursor;
