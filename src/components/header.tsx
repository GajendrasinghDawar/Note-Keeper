import ApplicationLogo from '@/components/application_logo'
import { GrassIcon } from '@/components/icons'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className=' border-b border-yellow5 sticky top-0  backdrop-blur-lg bg-linear-to-r from-yellow3/50  from-600% z-50  to-yellow2/50'>
      <nav className='flex justify-between px-4 py-2  w-full md:max-w-194.5 mx-auto md:py-3'>
        <div className='relative -ml-1 md:p-0 shrink-0 flex items-center '>
          <Link to='/'>
            <ApplicationLogo />
            <span className=' absolute -rotate-12 top-0 translate-x-4 translate-y-5 text-xs font-bold text-slate12'>
              Notes
            </span>
          </Link>
        </div>
        <div>
          <Link
            to='note/create'
            className={` bg-crimson9/95    
                             text-slate1
                            sm:text-sm 
                            py-1
                            px-2
                            hover:ring-offset-2
                            hover:ring-2 hover:ring-crimson8 inline-flex items-center     border-transparent
                            font-semibold text-xs
                            uppercase tracking-widest
                             focus:outline-none
                            focus:ring-2
                            focus:ring-crimson11 focus:ring-offset-2
                            transition ease-in-out duration-150 rounded-lg
                            `}
          >
            <GrassIcon />
            <span className='ml-1'>Create</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
