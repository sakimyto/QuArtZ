import { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  href: string;
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const NextLink: NextPage<Props> = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default NextLink;
