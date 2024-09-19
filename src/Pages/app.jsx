import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <div>
            <Header />
            <main className="w-full md:max-w-[778px] mx-auto" >
                <Outlet />
            </main>
        </div>
    )
}