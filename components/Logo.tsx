import Image from "next/image";

const Logo = (props: any) => {
  const { renderDefault, title } = props;

  return (
    <div className="flex items-center space-x-2">
      <Image
        className="rounded-full object-cover"
        height={50}
        width={50}
        src="https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png"
        alt="logo"
      />
      <>{renderDefault(props)}</>
    </div>
  );
};

export default Logo;
