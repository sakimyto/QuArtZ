import { NextPage } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Main: NextPage<Props> = ({ children }) => <main>{children}</main>;

export default Main;
