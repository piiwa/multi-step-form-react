import React from 'react';
import Form from '@/components/organisms/form/form';

const Quotation = () => {
  return (
    <>
      <div className="bg-[#00568b]">
        <div className="container mx-auto max-w-screen-md py-10 px-3">
          <h1 className="text-white text-3xl font-semibold uppercase">Formulaire de devis</h1>
        </div>
      </div>
      <Form />
    </>
  );
};

export default Quotation;
