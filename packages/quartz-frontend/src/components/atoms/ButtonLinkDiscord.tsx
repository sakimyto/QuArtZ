import { NextPage } from 'next';
import { FaDiscord } from 'react-icons/fa';
import projectConfig from '@/config/projectConfig';

const ButtonLinkDiscord: NextPage = () => {
  return (
    <a
      href={projectConfig.discordUrl}
      aria-label={`${projectConfig.nftName} on Discord`}
      rel='noopener noreferrer'
      target='_blank'
      className='p-2 rounded-full bg-zinc-700 hover:bg-zinc-600'
    >
      <FaDiscord />
    </a>
  );
};

export default ButtonLinkDiscord;
