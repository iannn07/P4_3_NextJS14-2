import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Image
        src='/Home.png'
        alt='Next.js Logo'
        className='mb-10 mt-20 rounded-xl'
        width={800}
        height={800}
        priority
      />
      <h1 className='text-6xl font-bold'>What&apos;s up brother?</h1>
    </div>
  );
}
