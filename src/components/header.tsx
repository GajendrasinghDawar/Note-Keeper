import ApplicationLogo from '@/components/application_logo'
import { GrassIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { usePWA } from '@/hooks/use_pwa'

export default function Header() {
  const { canInstall, isStandalone, triggerInstall } = usePWA()

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
        <div className='flex items-center gap-2'>
          {canInstall && !isStandalone && (
            <button
              onClick={triggerInstall}
              className='text-slate12 sm:text-sm px-2 inline-flex items-center border-transparent font-semibold text-xs uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow11 focus-visible:ring-offset-2 hover:bg-yellow10 transition ease-in-out duration-150 rounded-md bg-yellow9/95 py-2'
            >
              Install app
            </button>
          )}
          <Link
            to='note/create'
            className='bg-crimson9/95 text-slate1 sm:text-sm py-1 px-2 inline-flex items-center border-transparent font-semibold text-xs uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson11 focus-visible:ring-offset-2 hover:bg-crimson10 transition ease-in-out duration-150 rounded-lg no-underline'
          >
            <GrassIcon />
            <span className='ml-1'>Create</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
