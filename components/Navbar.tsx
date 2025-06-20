"use client"
import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './CustomButton';


const NavBar = () => {
    const handleSignInClick = () => {
 // don't plan to implement this feature
    alert(`Let's say, you are signed in 😎`);
  };
  return (
  <header className='w-full  absolute z-10'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
      <Link href='/' className='flex justify-center items-center'>
        <Image
          src='/modo3.png'
          alt='logo'
          width = {100}
          height={100}
          className='object-contain'
        />
      </Link>

      <CustomButton
        title='Sign in'
        btnType='button'
        containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
        handleClick={handleSignInClick}
     />
   
    </nav>
  
  </header>
)};

export default NavBar;