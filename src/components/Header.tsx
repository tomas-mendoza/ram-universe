import headerImage from '../assets/header.png';

export default function Header() {
  return (
    <header className='h-auto flex justify-center bg-orange-200'>
      <img src={headerImage} alt="Header image" className='w-[250px]' />
    </header>
  )
}