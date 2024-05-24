import Image from 'next/image';

interface Props {
  width: number;
  height: number;
}

export default function Logo(props: Props): JSX.Element {
  return (
    <>
      <Image src="/img/logo/logo.png" width={props.width} height={props.height} alt="logo" />
      <span>Price Dynamic</span>
    </>
  );
}
