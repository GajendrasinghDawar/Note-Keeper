import ApplicationLogo from "@/components/ApplicationLogo";
import { PlusIcon } from "@/components/Icons";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="border  border-b bg-sand-sand2 sticky top-0 z-10 backdrop-blur-lg bg-opacity-50 ">
            <nav className="flex justify-between px-3 py-2 w-full md:max-w-[778px] mx-auto">
                <div className="-ml-1 md:p-0 shrink-0 flex items-center">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-9 md:h-10 md:w-10  fill-current text-gray-gray12" />
                    </Link>
                </div>
                <div>
                    <Link
                        to="note/create"
                        className={ `rounded-lg p-1 bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5 inline-flex justify-center items-center  font-medium min-h-[30px] min-w-fit text-gray-gray11  sm:text-sm` }
                    >
                        <PlusIcon />
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