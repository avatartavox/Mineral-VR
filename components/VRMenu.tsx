import React from 'react';
import { Mineral, MineralCategory } from '../types';

interface VRMenuProps {
  currentCategory: MineralCategory;
  minerals: Mineral[];
  selectedMineralId: string | null;
  onSelectCategory: (cat: MineralCategory) => void;
  onSelectMineral: (mineral: Mineral) => void;
}

const VRMenu: React.FC<VRMenuProps> = ({
  currentCategory,
  minerals,
  selectedMineralId,
  onSelectCategory,
  onSelectMineral
}) => {
  const isDark = currentCategory === MineralCategory.PHOSPHORESCENT;
  const panelColor = isDark ? "#222" : "#eee";
  const textColor = isDark ? "#fff" : "#000";
  const activeColor = isDark ? "#7c3aed" : "#3b82f6"; // Purple vs Blue

  return (
    <a-entity position="-1.8 1.6 -2" rotation="0 20 0">
      {/* Main Background Panel */}
      <a-plane width="1.2" height="2.2" color={panelColor} opacity="0.8" shader="flat"></a-plane>

      {/* Header */}
      <a-text
        value="CATEGORIAS"
        align="center"
        position="0 0.9 0.01"
        color={textColor}
        width="3"
      ></a-text>

      {/* Tabs */}
      <a-entity position="0 0.7 0.02">
        {/* Popular Tab */}
        <a-entity
          position="-0.3 0 0"
          onClick={() => onSelectCategory(MineralCategory.POPULAR)}
          class="clickable"
          geometry="primitive: plane; width: 0.5; height: 0.15"
          material={`color: ${currentCategory === MineralCategory.POPULAR ? activeColor : '#999'}; shader: flat`}
        >
          <a-text value="Populares" align="center" color="#fff" width="2.5" z-offset="0.01"></a-text>
        </a-entity>

        {/* Phosphorescent Tab */}
        <a-entity
          position="0.3 0 0"
          onClick={() => onSelectCategory(MineralCategory.PHOSPHORESCENT)}
          class="clickable"
          geometry="primitive: plane; width: 0.5; height: 0.15"
          material={`color: ${currentCategory === MineralCategory.PHOSPHORESCENT ? activeColor : '#999'}; shader: flat`}
        >
          <a-text value="Fosfor." align="center" color="#fff" width="2.5" z-offset="0.01"></a-text>
        </a-entity>
      </a-entity>

      {/* Mineral List */}
      <a-entity position="0 0.4 0.02">
        {minerals.map((mineral, index) => {
          const yPos = -index * 0.18;
          const isSelected = selectedMineralId === mineral.id;
          
          return (
            <a-entity
              key={mineral.id}
              position={`0 ${yPos} 0`}
              onClick={() => onSelectMineral(mineral)}
              class="clickable"
              geometry="primitive: plane; width: 0.9; height: 0.12"
              material={`shader: flat; color: ${isSelected ? activeColor : (isDark ? "#444" : "#fff")}`}
              animation__mouseenter="property: scale; to: 1.1 1.1 1; dur: 200; startEvents: mouseenter"
              animation__mouseleave="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
            >
              {/* Text */}
              <a-text
                value={mineral.name}
                align="center"
                color={isSelected ? "#fff" : textColor}
                width="2.5"
                z-offset="0.01"
                position="0 0 0.01"
              ></a-text>
            </a-entity>
          );
        })}
      </a-entity>
    </a-entity>
  );
};

export default VRMenu;