import ApplicationLogo from "@/components/ApplicationLogo";
import { GrassIcon } from "@/components/Icons";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className=" border-b border-yellow-yellow5 sticky top-0  backdrop-blur-lg bg-opacity-50 bg-gradient-to-r from-yellow-yellow3  from-600% z-50  to-yellow-yellow2">
            <nav className="flex justify-between px-4 py-2  w-full md:max-w-[778px] mx-auto md:py-3">
                <div className="relative -ml-1 md:p-0 shrink-0 flex items-center ">
                    <Link to="/">
                        <ApplicationLogo />
                        <span className=" absolute -rotate-12 top-0 translate-x-4 translate-y-5 text-xs font-bold text-gray-gray12">Notes</span>
                    </Link>
                </div>
                <div>
                    <Link
                        to="note/create"
                        className={
                            ` bg-crimson-crimson6    
                             text-gray-gray12
                            sm:text-sm 
                            py-1
                            px-2
                            hover:ring-offset-2
                            hover:ring-2 hover:ring-crimson-crimson7 inline-flex items-center     border-transparent
                            font-semibold text-xs
                            uppercase tracking-widest
                             focus:outline-none
                            focus:ring-2
                            focus:ring-crimson-crimson11 focus:ring-offset-2
                            transition ease-in-out duration-150 rounded-lg
                            ` }
                    >
                        <GrassIcon />
                        <span className="ml-1"
                        >
                            Create
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}