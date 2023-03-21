import React, { useState } from 'react';
import { Button, Form, Input, Progress, Radio, Slider, Typography } from 'antd';

const { Text } = Typography;

const StepOneForm = ({ yesNoChoice, setYesNoChoice, amountChoice, setAmountChoice }: any) => {
  return (
    <>
      <Form.Item 
        label="Votre entreprise a t'elle été crée il y a moins de 2 ans ?"
        name="creation"
        rules={[{ required: true, message: 'Veuillez préciser quand votre entreprise a été créée' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Radio.Group
          value={yesNoChoice}
          onChange={(e) => setYesNoChoice(e.target.value)}
        >
          <Radio value="yes">Oui</Radio>
          <Radio value="no">Non</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Quel est votre chiffre d'affaire annuel HT en € ?"
        name="ca"
        rules={[{ required: true, message: 'Veuillez préciser votre chiffre d\'affaire annuel' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Radio.Group
          value={amountChoice}
          onChange={(e) => setAmountChoice(e.target.value)}
        >
          <Radio value="50">50 000 €</Radio>
          <Radio value="100">100 000 €</Radio>
          <Radio value="250">250 000 €</Radio>
          <Radio value="500">500 000 €</Radio>
          <Radio value="750">750 000 €</Radio>
          <Radio value="1000">1 000 000 €</Radio>
          <Radio value="1500">1 500 000 €</Radio>
          <Radio value="2000">2 000 000 € et +</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

const StepTwoForm = ({
  commissions,
  setCommissions,
  brokerageFees,
  setBrokerageFees,
  administrationFees,
  setAdministrationFees,
}: any) => {

  const totalContribution = brokerageFees + administrationFees;

  return (
    <>
      <Form.Item
        label="Votre commission (0% à 40%)"
        name="commission"
        rules={[{ required: true, message: 'Veuillez mettre une valeur pour la commission' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Slider min={0} max={40} value={commissions} onChange={setCommissions} />
      </Form.Item>
      <Form.Item
        label="Vos frais de courtage (0€ à 10€ par mois)"
        name="brokerageFees"
        rules={[{ required: true, message: 'Veuillez mettre une valeur pour les frais de courtage' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Slider min={0} max={10} value={brokerageFees} onChange={setBrokerageFees} />
      </Form.Item>
      <Form.Item
        label="Vos frais de dossier (0€ à 50€ par mois)"
        name="administrationFees"
        rules={[{ required: true, message: 'Veuillez mettre une valeur pour les frais de dossier' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Slider min={0} max={50} value={administrationFees} onChange={setAdministrationFees} />
      </Form.Item>
      <Text className="text-center font-semibold py-2">Cotisations TTC : {totalContribution}€ / mois</Text>
    </>
  );
};

const StepThreeForm = () => {
  return (
    <>
      <Form.Item
        label="Le fractionnement qui vous ferait plaisir ?"
        name="splitting"
        rules={[{ required: true, message: 'Veuillez choisir un fractionnement' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Radio.Group>
          <Radio value="mensuel">Mensuel</Radio>
          <Radio value="trimestriel">Trimestriel</Radio>
          <Radio value="semestriel">Semestriel</Radio>
          <Radio value="annuel">Semestriel</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Le mode de règlement que vous souhaiteriez ?"
        name="meansOfPayment"
        rules={[{ required: true, message: 'Veuillez choisir un moyen de règlement' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Radio.Group>
          <Radio value="debit">Prélèvement automatique</Radio>
          <Radio value="creditCard">Carte bancaire</Radio>
          <Radio value="bankTransfer">Virement</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="La franchise qui vous semble être la plus juste ?"
        name="franchise"
        rules={[{ required: true, message: 'Veuillez choisir un montant' }]}
        labelCol={{ className: "font-bold" }}
      >
        <Radio.Group>
          <Radio value="0">0 €</Radio>
          <Radio value="200">200 €</Radio>
          <Radio value="500">500 €</Radio>
          <Radio value="700">700 €</Radio>
          <Radio value="1000">1000 €</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

const SummaryStep = ({ formValues }: any) => (
  <div className="flex flex-col py-4">
    <h3 className="font-bold">Récapitulatif :</h3>
    <ul>
      {Object.entries(formValues).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  </div>
);

const CustomForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  // Step 1
  const [yesNoChoice, setYesNoChoice] = useState(null);
  const [amountChoice, setAmountChoice] = useState(null);

  // Step 2
  const [commissions, setCommissions] = useState(0);
  const [brokerageFees, setBrokerageFees] = useState(0);
  const [administrationFees, setAdministrationFees] = useState(0);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    setCurrent(current + 1);
  };

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  
  const steps = [
    {
      title: 'Step 1',
      content: (
        <StepOneForm
          yesNoChoice={yesNoChoice}
          setYesNoChoice={setYesNoChoice}
          amountChoice={amountChoice}
          setAmountChoice={setAmountChoice}
        />
      ),
    },
    {
      title: 'Step 2',
      content: (
        <StepTwoForm
          commissions={commissions}
          setCommissions={setCommissions}
          brokerageFees={brokerageFees}
          setBrokerageFees={setBrokerageFees}
          administrationFees={administrationFees}
          setAdministrationFees={setAdministrationFees}
        />
      ),
    },
    {
      title: 'Step 3',
      content: <StepThreeForm />,
    },
  ];

  const progressBarPercentage = ((current + 1) / steps.length) * 100;
  const formValues = form.getFieldsValue();

  return (
    <>
      <div className="bg-white text">
        <div className="container mx-auto max-w-screen-md py-6 px-3">
          <Progress percent={progressBarPercentage} showInfo={false} className="w-full" strokeColor="#00568b" />
        </div>
      </div>
      <div className="steps-content container mx-auto max-w-screen-md py-6 px-3 min-h-[calc(100vh-335px)]">
        <Form form={form} onFinish={onFinish} layout="vertical">
          {current < steps.length ? (
            <>
              <div className="py-4">{steps[current].content}</div>
              <div className="flex gap-2 justify-end">
                {current > 0 && (
                  <Button onClick={prev} className="bg-white text-[#00568b] hover:bg-[#f3f4f8] hover:!text-[#00568b] border-2 border-[#00568b] hover:!border-[#00568b] rounded-full text-2xl leading-4 font-semibold p-4 uppercase h-auto">
                    Précédent
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button onClick={next} className="bg-[#00568b] text-white hover:bg-[#013a5d] hover:!text-white border-0 rounded-full text-2xl leading-4 font-semibold p-4 uppercase h-auto">
                    Suivant
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button onClick={() => form.submit()} className="bg-[#00568b] text-white hover:bg-[#013a5d] hover:!text-white border-0 rounded-full text-2xl leading-4 font-semibold p-4 uppercase h-auto">
                    Valider
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <SummaryStep formValues={{...formValues, yesNoChoice, amountChoice, commissions, brokerageFees, administrationFees}} />
              <div className="flex gap-2">
                {current > 0 && (
                  <Button onClick={prev} className="bg-white text-[#00568b] hover:bg-[#f3f4f8] hover:!text-[#00568b] border-2 border-[#00568b] hover:!border-[#00568b] rounded-full text-2xl leading-4 font-semibold p-4 uppercase h-auto">
                    Précédent
                  </Button>
                )}
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default CustomForm;