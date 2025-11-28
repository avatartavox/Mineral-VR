import React from 'react';
import { Mineral, MineralCategory } from '../types';

interface InfoPanelProps {
  mineral: Mineral | null;
  category: MineralCategory;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ mineral, category }) => {
  const isDark = category === MineralCategory.PHOSPHORESCENT;
  
  // Dynamic Styles
  const bgColor = isDark ? "#111" : "#fff";
  const titleColor = isDark ? "#a78bfa" : "#1e40af"; // Light Purple vs Dark Blue
  const bodyColor = isDark ? "#ddd" : "#333";
  const borderColor = isDark ? "#7c3aed" : "#3b82f6";

  if (!mineral) {
    return (
      <a-entity position="1.8 1.6 -2" rotation="0 -20 0">
         <a-plane width="1.2" height="1.5" color={bgColor} opacity="0.6" shader="flat">
            <a-text value="Selecciona un mineral" align="center" color={bodyColor} width="3"></a-text>
         </a-plane>
      </a-entity>
    );
  }

  return (
    <a-entity position="1.8 1.6 -2" rotation="0 -20 0">
      {/* Background Container */}
      <a-plane 
        width="1.2" 
        height="1.5" 
        color={bgColor} 
        shader="flat"
        material={`side: double; transparent: true; opacity: 0.9`}
      >
        {/* Border (simulated with slightly larger plane behind or careful geometry) - keeping simple here */}
      </a-plane>

      {/* Decorative Top Bar */}
      <a-plane
        width="1.2"
        height="0.05"
        position="0 0.725 0.01"
        color={borderColor}
        shader="flat"
      ></a-plane>

      {/* Content Container */}
      <a-entity position="0 0 0.02">
        {/* Name */}
        <a-text
          value={mineral.name.toUpperCase()}
          align="center"
          position="0 0.55 0"
          width="1.1" 
          wrap-count="18"
          color={titleColor}
          font="roboto" 
        ></a-text>

        {/* Separator */}
        <a-plane width="0.8" height="0.005" color={borderColor} position="0 0.45 0"></a-plane>

        {/* Uses Label */}
        <a-text
          value="USOS PRINCIPALES:"
          align="left"
          anchor="left"
          position="-0.5 0.3 0"
          width="1.1"
          wrap-count="35"
          color={isDark ? "#888" : "#666"}
          font="roboto"
        ></a-text>
        
        {/* Uses Value */}
        <a-text
          value={mineral.uses}
          align="left"
          anchor="left"
          position="-0.5 0.22 0"
          width="1.1"
          wrap-count="30"
          color={bodyColor}
          font="roboto"
        ></a-text>

        {/* Description Label */}
        <a-text
          value="INFORMACION:"
          align="left"
          anchor="left"
          position="-0.5 0.05 0"
          width="1.1"
          wrap-count="35"
          color={isDark ? "#888" : "#666"}
          font="roboto"
        ></a-text>

        {/* Description Value */}
        <a-text
          value={mineral.description}
          align="left"
          anchor="left"
          position="-0.5 -0.05 0"
          width="1.05"
          wrap-count="32"
          color={bodyColor}
          baseline="top"
          font="roboto"
        ></a-text>
      </a-entity>
    </a-entity>
  );
};

export default InfoPanel;