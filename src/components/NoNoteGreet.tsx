export default function NoNoteGreet() {
  return (
    <div className="flex  justify-center w-full col-span-5 relative ">
      <div className="fixed right-[30vw] -bottom-7  flex justify-center items-end z-10">
        <img
          src="/images/scandi02.png"
          alt="background"
          className="w-auto h-auto max-w-xs max-h-xs mb-0"
        />
      </div>
      <div className="fixed   md:z-10 left-[0vw] md:left-[30vw] -bottom-7 flex justify-center items-end ">
        <img
          src="/images/scandi.png"
          alt="background"
          className="w-auto h-auto max-w-xs max-h-xs mb-0"
        />
      </div>
      <div className="fixed right-[12vw] md:right-[22vw] -bottom-7  flex justify-center items-end z-10">
        <img
          src="/images/scandi04.png"
          alt="background"
          className="w-auto h-auto max-w-xs max-h-xs mb-0"
        />
      </div>
      <div className="fixed   md:z-10 left-[12vw] md:left-[36vw] -bottom-7 flex justify-center items-end ">
        <img
          src="/images/scandi03.png"
          alt="background"
          className="w-auto h-auto max-w-xs max-h-xs mb-0"
        />
      </div>

      <section className="mt-2 relative bg-yellow5 bg-green-00 rounded-lg  min-h-20 opacity-90 px-2 md:px-4 flex justify-center items-center text-center z-10">
        <div className="absolute opacity-90 -top-5 -left-4 sm:-top-7 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 ">
          <img
            src="/images/orange-maple-leaf.png"
            alt="background"
            className="w-full h-full object-contain z-0"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-base sm:text-xl md:text-2xl font-bold text-slate11">
            No notes found. Create a new note to get started.
          </p>
        </div>
      </section>
    </div>
  );
}
