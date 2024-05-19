import Image from 'next/image';

interface Props {
  width: number;
  height: number;
}

const Logo = (props: Props): JSX.Element => (
  <>
    <Image src="/img/logo.png" width={props.width} height={props.height} alt="logo" />
    <span>Price Dynamic</span>
  </>
);

export default Logo;
