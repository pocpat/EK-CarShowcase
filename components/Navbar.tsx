import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './CustomButton';

// const Navbar = () => {
//   console.log("Rendering Navbar");
//   return <header>Navbar Content</header>;
// };

// export default Navbar;



// ============================== V2 =================================
// const Navbar = () => {
//   const handleSignInClick = () => {
//     // Handle sign-in click
//     console.log('Sign In button clicked');
//   };

//   return (
//     <header className='w-full absolute z-10'>
//       <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
//         <Link href='/' className='flex justify-center items-center'>
//           <Image src='/logo.svg' alt='Car Hub logo' width={118} height={18} className='object-contain' />
//         </Link>
//         <CustomButton
//           title='Sign In'
//           btnType='button'
//           containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
//           handleClick={handleSignInClick}
//         />
//         THIS IS NAV-BAR
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

// ============================== V1 =================================
const NavBar = () => {
    const handleSignInClick = () => {
    // Handle sign-in click
    console.log('Sign In button clicked');
  };
  return (
  <header className='w-full  absolute z-10'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
      <Link href='/' className='flex justify-center items-center'>
        <Image
          src='/logo.svg'
          alt='logo'
          width={118}
          height={18}
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