import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center px-10 py-5 font-bold">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            className="rounded-full object-cover"
            src="https://cdn.pixabay.com/photo/2023/01/08/13/28/demoiselle-crane-7705173_960_720.jpg"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>
        <h1>Muhammad</h1>
      </div>
    </header>
  );
};

export default Header;
