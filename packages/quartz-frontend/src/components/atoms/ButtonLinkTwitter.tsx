import { NextPage } from 'next';
import { FaTwitter } from 'react-icons/fa';
import projectConfig from '@/config/projectConfig';

const ButtonLinkTwitter: NextPage = () => {
  return (
    <a
      href={projectConfig.twitterUrl}
      aria-label={`${projectConfig.nftName} on Twitter`}
      rel='noopener noreferrer'
      target='_blank'
      className='p-2 rounded-full bg-zinc-700 hover:bg-zinc-600'
    >
      <FaTwitter />
    </a>
  );
};

export default ButtonLinkTwitter;
