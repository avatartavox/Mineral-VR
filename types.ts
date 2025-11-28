import React from 'react';

// Extend JSX for A-Frame elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-camera': any;
      'a-cursor': any;
      'a-sky': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-light': any;
      'a-box': any;
      'a-sphere': any;
      'a-plane': any;
      'a-text': any;
      'a-cylinder': any;
      'a-ring': any;
      'a-ambient-light': any;
      'a-directional-light': any;
    }
  }
}

// Also extend 'react' module JSX for newer React types setup
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-camera': any;
      'a-cursor': any;
      'a-sky': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-light': any;
      'a-box': any;
      'a-sphere': any;
      'a-plane': any;
      'a-text': any;
      'a-cylinder': any;
      'a-ring': any;
      'a-ambient-light': any;
      'a-directional-light': any;
    }
  }
}

export enum MineralCategory {
  POPULAR = 'popular',
  PHOSPHORESCENT = 'phosphorescent'
}

export interface Mineral {
  id: string;
  name: string;
  file: string;
  uses: string;
  description: string;
}

export interface MineralData {
  [MineralCategory.POPULAR]: Mineral[];
  [MineralCategory.PHOSPHORESCENT]: Mineral[];
}