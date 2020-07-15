import React from 'react';

function LiftingStateUp() {
  return <h1>Lifting state up!</h1>;
}

interface BuildingBlocks {
  url: string;
  name: string;
  Component: () => JSX.Element;
}

const ret: BuildingBlocks = {
  url: 'lifting-state-up',
  name: 'Lifting State Up',
  Component: LiftingStateUp,
};

export default ret;
