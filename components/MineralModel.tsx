import React, { useEffect, useRef } from 'react';
import { Mineral, MineralCategory } from '../types';

interface MineralModelProps {
  mineral: Mineral | null;
  category: MineralCategory;
}

const MineralModel: React.FC<MineralModelProps> = ({ mineral, category }) => {
  const entityRef = useRef<any>(null);
  const isPhosphorescent = category === MineralCategory.PHOSPHORESCENT;

  useEffect(() => {
    if (!mineral || !entityRef.current) return;

    const el = entityRef.current;

    // Because we use key={mineral.id}, this component mounts fresh every time.
    // We set initial scale to 0 for the pop-in effect.
    el.setAttribute('scale', '0 0 0');
    
    // Configure the pop-in animation
    el.setAttribute('animation', {
      property: 'scale',
      to: '1 1 1',
      dur: 800,
      easing: 'easeOutElastic'
    });

    // Handle Model Loaded event to modify materials (Phosphorescent effect)
    const handleModelLoaded = () => {
      const mesh = el.getObject3D('mesh');
      if (!mesh) return;

      mesh.traverse((node: any) => {
        if (node.isMesh) {
          if (isPhosphorescent) {
            // Apply Glow effect
            const oldMat = node.material;
            node.material = oldMat.clone(); 
            node.material.emissive.setHex(0x00ff00); // Greenish glow base
            node.material.emissiveIntensity = 0.6;
            node.material.color.setHex(0x222222); // Darken diffuse
          } else {
            // Standard visual
            node.material.emissive.setHex(0x000000);
            node.material.emissiveIntensity = 0;
          }
        }
      });
    };

    el.addEventListener('model-loaded', handleModelLoaded);

    return () => {
      el.removeEventListener('model-loaded', handleModelLoaded);
    };
  }, [mineral, isPhosphorescent]);

  if (!mineral) return null;

  return (
    <a-entity id="mineral-stage" position="0 1.3 -2">
      {/* Spotlight from top */}
      <a-light 
        type="spot" 
        position="0 2 0" 
        rotation="-90 0 0" 
        intensity={isPhosphorescent ? 2.5 : 1.5}
        color={isPhosphorescent ? "#aaffaa" : "#ffffff"}
        angle="45"
        penumbra="0.5"
      ></a-light>
      
      {/* Floating Animation Wrapper */}
      <a-entity animation="property: position; to: 0 0.1 0; dir: alternate; dur: 2000; loop: true; easing: easeInOutSine">
         {/* 
            The Model Itself 
            KEY PROP IS CRITICAL: It forces React to destroy and recreate this entity
            when the mineral ID changes, ensuring the scale resets to 0 and the 
            pop-in animation plays correctly.
         */}
         <a-entity
            key={mineral.id}
            ref={entityRef}
            gltf-model={mineral.file}
            class="clickable"
            rotation="0 0 0"
            // Continuous rotation for showcase
            animation__rotate="property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
         ></a-entity>
      </a-entity>

      {/* Podium/Base */}
      <a-cylinder 
        position="0 -0.8 0" 
        radius="0.4" 
        height="0.1" 
        color={isPhosphorescent ? "#111" : "#888"}
        material="roughness: 0.8; metalness: 0.2"
      >
        {isPhosphorescent && (
            <a-ring radius-inner="0.38" radius-outer="0.4" color="#00ff00" rotation="-90 0 0" position="0 0.06 0" shader="flat"></a-ring>
        )}
      </a-cylinder>

      {/* Label on podium */}
      <a-text
        value={mineral.name}
        position="0 -0.9 0.45"
        align="center"
        color={isPhosphorescent ? "#fff" : "#333"}
        width="2"
      ></a-text>
    </a-entity>
  );
};

export default MineralModel;