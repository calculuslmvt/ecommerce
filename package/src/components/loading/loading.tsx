import React from 'react';

const MeteorStardustLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative w-32 h-32">
        {/* Orbit path */}
        <div className="absolute inset-0 border-2 border-blue-200 border-opacity-20 rounded-full"></div>
        
        {/* Meteor */}
        <div className="absolute w-4 h-4 bg-orange-500 rounded-full animate-orbit">
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-orange-300 rounded-full opacity-50 animate-pulse" style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-orange-200 rounded-full opacity-30 animate-pulse" style={{ transform: 'translate(-50%, -50%)' }}></div>
        </div>
        
        {/* Stardust particles */}
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1500}ms`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MeteorStardustLoader;