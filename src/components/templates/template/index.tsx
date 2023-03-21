import React, { FC } from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

type Props = {
  children: React.ReactNode;
};

const Template: FC<Props> = ({ children }) => {
  return (
    <Layout className="layout bg-white">
      <Header className="container mx-auto max-w-screen-md bg-white flex justify-between px-4">
        <div className="uppercase font-bold text-3xl self-center">Assurmax</div>
        <Menu
          mode="horizontal"
          // items={[
          //   {
          //     key: '1',
          //     label: 'Nos assurances',
          //   },
          //   {
          //     key: '2',
          //     label: 'Contactez-Nous',
          //   },
          //   {
          //     key: '3',
          //     label: 'Espace Client',
          //   },
          // ]}
        />
      </Header>
      <Content>
        <div className="site-layout-content bg-[#f3f4f8]">
          {children}
        </div>
      </Content>
      <Footer className="text-center bg-white">Formulaire multi-étapes React ©2023 Created by Pierre Moreau</Footer>
    </Layout>
  );
};

export default Template;
