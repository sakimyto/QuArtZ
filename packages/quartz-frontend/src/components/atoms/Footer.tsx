import { NextPage } from 'next';
import React from 'react';
import Container from './Container';
import projectConfig from '@/config/projectConfig';

const Footer: NextPage = () => (
  <footer className='py-4'>
    <Container>
      <div className='text-xs font-normal'>
        © 2022 <a href={projectConfig.twitterUrl}>QuArtZ.</a>
      </div>
    </Container>
  </footer>
);

export default Footer;
