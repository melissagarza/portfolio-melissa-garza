import React from 'react';
import RoadmapChart from './RoadmapChart';
import RoadmapForm from './RoadmapForm';

const Roadmap = () => {
  return (
    <div className="container">
      <h1 className="mb-5">Roadmap Bubble Chart</h1>
      <RoadmapChart />
      <RoadmapForm />
    </div>
  );
};

export default Roadmap;
