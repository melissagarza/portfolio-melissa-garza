import React from 'react';
import { Document, Page } from 'react-pdf';

const Resume = () => {
  return (
    <Document
      className="resume"
      file="ResumeMelissaGarza2020.pdf"
    >
      <Page pageNumber={1} />
    </Document>
  );
};

export default Resume;
