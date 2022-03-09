import React from 'react';

const loadingContainerStyles = {
  width: `100%`,
  height: `25vh`,
  position: `relative`,
};

const Loading = () => {
  return (
    <div style={loadingContainerStyles}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loading;
