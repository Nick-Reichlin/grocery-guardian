import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React from 'react';

export default function FileUpload() {
  return (
    <FilePond
      server={{
        process: '/api/upload-receipt',
        fetch: null,
        revert: null,
      }}
    />
  );
}
