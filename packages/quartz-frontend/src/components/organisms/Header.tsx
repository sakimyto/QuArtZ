import { NextPage } from 'next';

import ButtonLinkCollection from '../atoms/ButtonLinkCollection';
import ButtonLinkDiscord from '../atoms/ButtonLinkDiscord';
import ButtonLinkGithub from '../atoms/ButtonLinkGithub';
import ButtonLinkTwitter from '../atoms/ButtonLinkTwitter';
import Container from '@/components/atoms/Container';
import NextLink from '@/components/atoms/NextLink';
import ConnectButton from '@/components/molecules/ConnectButton';
import projectConfig from '@/config/projectConfig';

const Header: NextPage = () => {
  return (
    <div className='sticky top-0 z-50'>
      <header className='py-4 border-b bg-zinc-900'>
        <Container>
          <div className='block sm:items-center sm:justify-between sm:flex'>
            <NextLink href='/' className='inline-block mb-2 text-2xl font-bold sm:mb-0'>
              <span className='flex items-center'>{projectConfig.nftName}</span>
            </NextLink>

            <div className='flex items-center space-x-2'>
              {/* <ButtonLinkTwitter /> */}
              {/* <ButtonLinkDiscord /> */}
              {/* <ButtonLinkCollection /> */}
              <ButtonLinkGithub />
              <div className='inline-flex justify-end w-full'>
                <ConnectButton />
              </div>
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default Header;
