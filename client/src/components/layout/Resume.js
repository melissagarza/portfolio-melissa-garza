import React from 'react';
import { Button } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';

const Resume = () => {

  const buttonDownload = (
    <div className="d-flex justify-content-around">
      <Button
        className="p-1"
        variant="light"
        href="./ResumeMelissaGarza2020.pdf"
        target="_blank"
      >Download Resume</Button>
    </div>
  );

  return (
    <div className="container">
      {buttonDownload}
      <Document
        className="resume"
        file="./ResumeMelissaGarza2020.pdf"
      >
        <Page pageNumber={1} />
      </Document>
      {buttonDownload}
    </div>
  );
};

export default Resume;
