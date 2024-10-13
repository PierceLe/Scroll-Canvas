import { useState, useEffect } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {
  classnames,
  sizing,
  spacing,
  display,
  justifyContent,
  overflow,
  gap,
  alignItems,
} from '@frontend/tailwindcss-classnames';
import { Button } from '@frontend/components/button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export type ReactPDFProps = {
  url: string;
};
export const ReactPDF = (props: ReactPDFProps) => {
  const { url } = props;
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const styles = useStyles();

  useEffect(() => {
    setPageNumber(1);
    setNumPages(0);
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <div className={classnames(styles.pdfPreview)}>
        <Document
          // renderMode="canvas"
          file={{
            url: url,
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      {numPages ? (
        <div className={classnames(styles.pdfPreviewPage)}>
          <Button
            onClick={() => setPageNumber(pageNumber - 1)}
            color="default"
            variant={'contained'}
            size={'sm'}
          >
            {`<`}
          </Button>
          <div>
            {pageNumber}/{numPages}
          </div>
          <Button
            onClick={() => setPageNumber(pageNumber + 1)}
            color="default"
            variant={'contained'}
            size={'sm'}
          >
            {`>`}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

const useStyles = () => {
  return {
    pdfPreview: classnames(
      sizing('h-96'),
      overflow('overflow-auto'),
      spacing('mb-2'),
    ),
    pdfPreviewPage: classnames(
      display('flex'),
      gap('gap-2'),
      justifyContent('justify-center'),
      alignItems('items-center'),
    ),
  };
};
