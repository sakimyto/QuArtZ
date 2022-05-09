import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import projectConfig from '@/config/projectConfig';

type Props = {
  pageTitle?: string;
};

const MyHead: NextPage<Props> = ({ pageTitle }) => {
  const router = useRouter();
  const title = pageTitle
    ? pageTitle
    : `${projectConfig.nftName} | ${projectConfig.siteShortDescription}`;
  const ogUrl = projectConfig.siteUrl + router.asPath;
  const ogType = router.pathname === '/' ? 'website' : 'article';
  const ogTitle = title;
  const ogImage = projectConfig.siteUrl + projectConfig.ogImagePath;

  return (
    <Head>
      <title>{title}</title>
      <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
      <link rel='manifest' href='/favicon/site.webmanifest' />
      <link rel='mask-icon' href='/favicon/safari-pinned-tab.svg' color='#18181b' />
      <link rel='shortcut icon' href='/favicon/favicon.ico' />
      <meta name='msapplication-TileColor' content='#18181b' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#18181b' />
      <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      <meta name='description' content={projectConfig.siteDescription} key='description' />
      <meta property='og:url' content={ogUrl} />
      <meta property='og:type' content={ogType} />
      <meta property='og:site_name' content={projectConfig.nftName} />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={projectConfig.siteDescription} key='ogDescription' />
      <meta property='og:image' content={ogImage} key='ogImage' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={projectConfig.twitterUsername} />
    </Head>
  );
};

export default MyHead;
