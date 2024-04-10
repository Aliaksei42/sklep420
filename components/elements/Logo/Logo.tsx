import Link from 'next/link'
import Image from 'next/image'
const Logo = () => (
  <Link className='logo' href='/'>
    <Image
      className='logo__img'
      src='/img/logo.svg'
      alt='Rostelecom Logo'
      width={200}
      height={50}
    />
  </Link>
)

export default Logo
