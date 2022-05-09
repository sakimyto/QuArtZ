import { NextPage } from 'next';
import { FaGithub } from 'react-icons/fa';
import projectConfig from '@/config/projectConfig';

const ButtonLinkGithub: NextPage = () => {
  return (
    <a
      href={projectConfig.githubUrl}
      aria-label={`${projectConfig.nftName} on Github`}
      rel='noopener noreferrer'
      target='_blank'
      className='p-2 rounded-full bg-zinc-700 hover:bg-zinc-600'
    >
      <FaGithub />
    </a>
  );
};

export default ButtonLinkGithub;
