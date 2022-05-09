import { NextPage } from 'next';
import Image from 'next/image';
import Container from '@/components/atoms/Container';
import H2 from '@/components/atoms/H2';
import Section from '@/components/atoms/Section';
import Minting from '@/components/molecules/Minting';
import Layout from '@/components/templates/Layout';

const Index: NextPage = () => (
  <Layout>
    <Section>
      <Container>
        <div className='flex flex-col items-center'>
          <div className='mx-auto my-8'>
            <Image
              src={'/img/holy-crystal.png'}
              width={'144px'}
              height={'144px'}
              alt={'HolyCrystal'}
            />
          </div>
          <div className='my-8'>
            <H2 isTextCenter={true}>full-on-chain magic spell on Aster Network</H2>
          </div>
          <div className='w-full max-w-md my-8 md:mb-24'>
            <Minting />
          </div>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <H2 isTextCenter={true}>Summary</H2>

        <div className='mx-auto my-8 md:max-w-xl'>
          <ul className='p-4 text-sm list-disc'>
            <li>QuArtZ is universal magic crystals meme in the public domain.</li>
            <li>No fee, just gas. Royalties is 0%.</li>
            <li>Randomized magic spell with attrs.</li>
            <li>77 QuArtZ can be minted every 77 hours after last 77 mint, forever.</li>
          </ul>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <H2 isTextCenter={true}>Roadmap</H2>

        <div className='mx-auto my-8 md:max-w-xl'>
          <ul className='p-4 text-sm list-disc'>
            <li>depends on community</li>
          </ul>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <H2 isTextCenter={true}>Team</H2>

        <div className='mx-auto my-8 md:max-w-xl'>
          <ul className='p-4 text-sm list-disc'>
            <li>All holders</li>
          </ul>
        </div>
      </Container>
    </Section>
  </Layout>
);

export default Index;
