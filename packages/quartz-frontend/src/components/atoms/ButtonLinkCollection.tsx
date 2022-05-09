import { NextPage } from 'next';
import { FaShip } from 'react-icons/fa';
import projectConfig from '@/config/projectConfig';

const ButtonLinkCollection: NextPage = () => {
  return (
    <a
      href={projectConfig.collectionUrl}
      aria-label={`${projectConfig.nftName} on OpenSea`}
      rel='noopener noreferrer'
      target='_blank'
      className='p-2 rounded-full bg-zinc-700 hover:bg-zinc-600'
    >
      <FaShip />
    </a>
  );
};

export default ButtonLinkCollection;
