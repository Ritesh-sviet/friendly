import React from 'react';

// This code defines a React functional component called TextWithEllipsis which takes in a text and maxWidth prop. It renders the text within a span element, and if the text exceeds the specified maxWidth, it will be truncated and an ellipsis will be added at the end.
// this is responsible for displaying the text with ellipsis
// i.e.  if the text is too long then the text will be truncated and an ellipsis will be added at the end like ...
const TextWithEllipsis: React.FC<{ text: string; maxWidth: string }> = ({ text, maxWidth }) => {
  const style = {
    display: 'inline-block',
    maxWidth: maxWidth,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return <span style={style}>{text}</span>;
};

export default TextWithEllipsis;
