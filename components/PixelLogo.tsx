import React from 'react';

interface PixelLogoProps {
  className?: string;
}

export const PixelLogo: React.FC<PixelLogoProps> = ({ className = "" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges" // Ensures the sharp pixel look
    >
      {/* Shadow Offset */}
      <rect x="2" y="2" width="22" height="22" fill="#000" opacity="1" />
      
      {/* Main Body (Primary Pink) */}
      <rect x="0" y="0" width="22" height="22" fill="#ff0055" />
      
      {/* Borders */}
      <path d="M0 0H22V2H0V0ZM0 20H22V22H0V20ZM0 2V20H2V2H0ZM20 2V20H22V2H20Z" fill="black" />
      
      {/* Label Area (White) */}
      <rect x="5" y="0" width="12" height="9" fill="white" />
      <rect x="5" y="0" width="2" height="9" fill="#e0e0e0" /> {/* Slight shadow on label */}
      <path d="M4 0H5V9H17V0H18V10H4V0Z" fill="black" /> {/* Label Border */}
      
      {/* Shutter Area (Secondary Teal) */}
      <rect x="5" y="13" width="12" height="9" fill="#00ccaa" />
      <path d="M4 13H5V22H17V13H18V22H4V13Z" fill="black" /> {/* Shutter Border */}
      
      {/* Metal Slider Detail */}
      <rect x="7" y="15" width="4" height="5" fill="#2b2b2b" />
      
      {/* Write Protect Tab (Yellow) */}
      <rect x="18" y="2" width="2" height="2" fill="#ffff00" />
      <rect x="18" y="2" width="2" height="2" fill="none" stroke="black" strokeWidth="0.5" />
    </svg>
  );
};