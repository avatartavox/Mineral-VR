import React, { useState } from 'react';
import { MINERALS } from './constants';
import { MineralCategory, Mineral } from './types';
import VRMenu from './components/VRMenu';
import InfoPanel from './components/InfoPanel';
import MineralModel from './components/MineralModel';

const App: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<MineralCategory>(MineralCategory.POPULAR);
  // Initialize with Cuarzo (index 0 of Popular)
  const [selectedMineral, setSelectedMineral] = useState<Mineral | null>(MINERALS[MineralCategory.POPULAR][0]);

  // Background colors based on mode
  const skyColor = currentCategory === MineralCategory.PHOSPHORESCENT ? "#050505" : "#f0f4f8";
  
  // Fog to blend horizon
  const fogColor = currentCategory === MineralCategory.PHOSPHORESCENT ? "#000" : "#f0f4f8";

  const handleCategoryChange = (cat: MineralCategory) => {
    setCurrentCategory(cat);
    // Auto-select first mineral of the new category to ensure visibility
    setSelectedMineral(MINERALS[cat][0]);
  };

  return (
    <div className="w-full h-screen">
      {/* 2D Overlay for Desktop users not in VR */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none text-white mix-blend-difference">
        <h1 className="text-2xl font-bold">GeoVR Explorer</h1>
        <p className="text-sm opacity-80">Click 'Enter VR' on Quest</p>
      </div>

      <a-scene 
        cursor="rayOrigin: mouse; fuse: false" 
        raycaster="objects: .clickable"
        renderer="antialias: true; colorManagement: true; physicallyCorrectLights: true;"
        fog={`type: linear; color: ${fogColor}; far: 30; near: 0`}
        background={`color: ${skyColor}`}
      >
        {/* Assets Management */}
        <a-assets>
            {/* Preload models logic could go here if needed, but we load dynamically */}
        </a-assets>

        {/* Environment / Sky */}
        <a-sky color={skyColor}></a-sky>

        {/* Lighting */}
        <a-ambient-light color="#ffffff" intensity={currentCategory === MineralCategory.PHOSPHORESCENT ? 0.2 : 0.7}></a-ambient-light>
        <a-directional-light position="-1 2 1" intensity={0.5} cast-shadow="true"></a-directional-light>

        {/* Player Rig */}
        <a-entity id="rig" position="0 0 0">
          <a-camera position="0 1.6 0" look-controls="pointerLockEnabled: false" wasd-controls="acceleration: 20">
             {/* Cursor for Gaze-based or non-controller interaction fallback */}
             <a-cursor 
                color={currentCategory === MineralCategory.PHOSPHORESCENT ? "#00ff00" : "black"} 
                scale="0.5 0.5 0.5"
                raycaster="objects: .clickable"
             ></a-cursor>
          </a-camera>
          
          {/* VR Controllers */}
          <a-entity laser-controls="hand: left" raycaster="objects: .clickable; far: 5"></a-entity>
          <a-entity laser-controls="hand: right" raycaster="objects: .clickable; far: 5"></a-entity>
        </a-entity>

        {/* Left Side: Menu */}
        <VRMenu 
          currentCategory={currentCategory}
          minerals={MINERALS[currentCategory]}
          selectedMineralId={selectedMineral?.id || null}
          onSelectCategory={handleCategoryChange}
          onSelectMineral={setSelectedMineral}
        />

        {/* Center: Mineral Viewer */}
        <MineralModel 
          mineral={selectedMineral} 
          category={currentCategory} 
        />

        {/* Right Side: Info Panel */}
        <InfoPanel 
          mineral={selectedMineral} 
          category={currentCategory} 
        />
        
      </a-scene>
    </div>
  );
};

export default App;