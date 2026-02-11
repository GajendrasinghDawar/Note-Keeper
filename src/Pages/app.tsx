import Header from '@/components/header'
import { Outlet } from 'react-router-dom'

export default function App(): React.ReactElement {
  return (
    <div className='relative min-h-screen overflow-x-hidden'>
      <Header />

      <main className='w-full md:max-w-194.5 mx-auto p-4'>
        <Outlet />
      </main>
    </div>
  )
}
