import { Link } from 'react-router-dom'

export default function NoNoteGreet({ noteCount = 0 }: { noteCount?: number }) {
  return (
    <div className='flex flex-col gap-8 justify-center w-full col-span-5 relative '>
      <div className='fixed right-[30vw] -bottom-7  flex justify-center items-end z-10'>
        <img
          src='/images/scandi02.png'
          alt='background'
          className='w-auto h-auto max-w-xs max-h-xs mb-0'
        />
      </div>
      <div className='fixed   md:z-10 left-0 md:left-[30vw] -bottom-7 flex justify-center items-end '>
        <img
          src='/images/scandi.png'
          alt='background'
          className='w-auto h-auto max-w-xs max-h-xs mb-0'
        />
      </div>
      <div className='fixed right-[12vw] md:right-[22vw] -bottom-7  flex justify-center items-end z-10'>
        <img
          src='/images/scandi04.png'
          alt='background'
          className='w-auto h-auto max-w-xs max-h-xs mb-0'
        />
      </div>
      <div className='fixed   md:z-10 left-[12vw] md:left-[36vw] -bottom-7 flex justify-center items-end '>
        <img
          src='/images/scandi03.png'
          alt='background'
          className='w-auto h-auto max-w-xs max-h-xs mb-0'
        />
      </div>

      <section className='mt-2 relative bg-yellow5 bg-green-00 rounded-lg  min-h-20 opacity-90 px-2 md:px-4 flex justify-center items-center text-center z-10'>
        <div className='absolute opacity-90 -top-5 -left-4 sm:-top-7 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 '>
          <img
            src='/images/orange-maple-leaf.png'
            alt='background'
            className='w-full h-full object-contain z-0'
          />
        </div>
        <div className='flex flex-col items-center'>
          {noteCount > 0 ? (
            <p className='text-center text-base sm:text-xl md:text-2xl font-bold text-slate12'>
              You have{' '}
              <Link
                to='/note'
                className='text-crimson9 hover:text-crimson10 underline underline-offset-4 mr-1.5'
              >
                {noteCount} {noteCount === 1 ? 'note' : 'notes'}
              </Link>
              in your notebook!
            </p>
          ) : (
            <p className='text-center text-base sm:text-xl md:text-2xl font-bold text-slate12'>
              No notes yet. Create a new note to get started.
            </p>
          )}
        </div>
      </section>
      <section>
        <p className='text-center text-sm text-slate10 mt-2'>
          or{' '}
          <Link
            to='/viewer'
            className='text-crimson9 hover:text-crimson10 underline underline-offset-4'
          >
            open a Markdown file
          </Link>{' '}
          from your device
        </p>
      </section>
    </div>
  )
}
