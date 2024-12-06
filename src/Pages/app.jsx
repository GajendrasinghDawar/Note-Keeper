import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <div className="relative min-h-screen overflow-x-hidden">

            <Header />

            <main className="w-full md:max-w-[778px] mx-auto p-4">
                <Outlet />
            </main>
        </div>
    )
}