import { NextPage } from 'next';
import React from 'react';

import Footer from '@/components/atoms/Footer';
import Main from '@/components/atoms/Main';
import MyHead from '@/components/molecules/MyHead';
import Header from '@/components/organisms/Header';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const Layout: NextPage<Props> = ({ children, pageTitle }) => (
  <>
    <MyHead pageTitle={pageTitle} />
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Layout;
