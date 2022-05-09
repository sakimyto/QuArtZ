import { NextPage } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
  isTextCenter?: boolean;
};

const H2: NextPage<Props> = ({ children, isTextCenter = false }) => (
  <h2 className={`text-2xl font-bold ${isTextCenter && 'text-center'}`}>{children}</h2>
);
export default H2;
