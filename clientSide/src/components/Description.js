import React, { useState } from 'react';

const Description = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split the description into an array of words
  const words = text.split(' ');

  // Function to toggle the expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* Show the first 50 words if not expanded, else show full text */}
      <p>
        {isExpanded ? text : words.slice(0, 50).join(' ')}
        {!isExpanded && words.length > 50 && (
          <>
            ... <span onClick={toggleExpand} style={{ color: 'blue', cursor: 'pointer' }}>Read more</span>
          </>
        )}
      </p>
      
      {/* Toggle the "Show less" link when expanded */}
      {isExpanded && (
        <span onClick={toggleExpand} style={{ color: 'blue', cursor: 'pointer' }}>Show less</span>
      )}
    </div>
  );
};

export default Description;
