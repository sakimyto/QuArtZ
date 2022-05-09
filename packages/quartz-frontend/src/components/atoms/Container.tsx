import { NextPage } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Container: NextPage<Props> = ({ children }) => (
  <div className='container px-4 mx-auto'>{children}</div>
);

export default Container;
