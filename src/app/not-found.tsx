// src/pages/404.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Custom404: React.FC = () => {
  return (
    <div className=" flex flex-col items-center justify-center  text-center">
    <Image src="/images/404-robot.png" width={300} height={200} alt='robot error'>
    </Image>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-1">Page Not Found</p>
      <Link href="/" className="text-xl ">
        Go back to Home
      </Link>
    </div>
  );
}

export default Custom404;
