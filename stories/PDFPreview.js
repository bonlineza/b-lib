import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PDFPreview from 'components/PDFPreview';
import Readme from '../docs/PDFPreview.md';

const DummyControl = ({ item }) => (
  <button type="button" onClick={item.action} className="dummy-control">
    {item.documentAction}
  </button>
);

const DummyPDFFile =
  './Bizet-Variations_Chromatiques_de_concert_var_Coda_A4.pdf';
const prevPageButton = (
  <button type="button" className="btn-svg--base">
    &lt;
  </button>
);
const nextPageButton = (
  <button type="button" className="btn-svg--base">
    &gt;
  </button>
);

const BasicPDFPreview = () => (
  <PDFPreview
    data={{
      extUrl: DummyPDFFile,
    }}
    description={() => (
      <div className="description-class">Some Description</div>
    )}
    customControls={[]}
    prevPageButton={
      <button type="button" className="btn-svg--base">
        &lt;
      </button>
    }
    nextPageButton={
      <button type="button" className="btn-svg--base">
        &gt;
      </button>
    }
  />
);

const WithControlsPDFPreview = () => (
  <PDFPreview
    data={{
      extUrl: DummyPDFFile,
    }}
    description={() => (
      <div className="description-class">Some Description</div>
    )}
    customControls={[
      {
        action: action('Remove Document'),
        documentAction: 'DELETE',
        canDisplay: true,
        useComponent: DummyControl,
      },
    ]}
    prevPageButton={prevPageButton}
    nextPageButton={nextPageButton}
  />
);

storiesOf('PDFPreview', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Basic', () => <BasicPDFPreview />)
  .add('With Custom Controls', () => <WithControlsPDFPreview />);
