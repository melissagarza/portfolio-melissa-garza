import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { createRoadmapChart } from '../../utils/roadmapChart';

const RoadmapChart = () => {

  const roadmapChart = createRoadmapChart();
  const tempData = [
    {"label":"0.5 POC","start":"07.07.2014","end":"08.10.2014","effort":25,"manpower": 1},
    {"label":"Toolbox 1.0","start":"08.07.2014","end":"10.07.2014","effort":44,"manpower": 1},
    {"label":"Toolbox 1.1","start":"10.03.2014","end":"12.16.2014","effort":53,"manpower": 1},
    {"label":"Toolbox 1.2","start":"12.13.2014","end":"01.20.2015","effort":27,"manpower": 1}
  ];

  useEffect(() => {
    roadmapChart.draw(tempData);
  }, [roadmapChart, tempData]);

  return (
    <Fragment>
      <div className="rbc-main"></div>
    </Fragment>
  );
};

export default connect()(RoadmapChart);
