import { NextPage } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Section: NextPage<Props> = ({ children }) => (
  <section className='py-8 md:py-16'>{children}</section>
);

export default Section;
