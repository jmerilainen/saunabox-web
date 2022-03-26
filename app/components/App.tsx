import type { ReactNode } from "react";
import { Link, NavLink } from "remix";
import IconUser from "./IconUser";

interface AppProps {
    children: ReactNode
}

interface SidebarProps {
    children: ReactNode
}

interface MainProps {
    children: ReactNode;
}

const AppHeader = () => (
    <div className="px-12 py-8">
        <div className="grid items-center grid-cols-3">
            <div className="flex justify-start">
                <Link to="/" className="group">
                    <span className="text-2xl font-bold tracking-wideer font-display">
                        {/* <span className="inline-block transform transition duration-300 group-hover:scale-y-[var(--scale)]" style={{'--scale': rnd(0.5,2)} as React.CSSProperties}>Sauna</span><span className="inline-block transform transition duration-300 group-hover:scale-y-[var(--scale)]" style={{'--scale': rnd(0.5,2)} as React.CSSProperties}>Box</span> */}
                        <span className="inline-block transform transition duration-300 group-hover:scale-y-[0.5]">Sauna</span><span className="inline-block transform transition duration-300 group-hover:scale-y-[2]">Box</span>
                    </span>
                </Link>
            </div>
            <div className="flex justify-center gap-8">
                <NavLink to="/sauna" className={({ isActive }) => isActive ? 'flex gap-2 items-center border-b-2' : 'flex gap-2 items-center hover:text-slate-700 transition'}>
                    <span>Saunas</span>
                </NavLink>

            </div>
            <div className="flex justify-end gap-8">
                <NavLink to="/login" className={({ isActive }) => isActive ? 'flex gap-2 items-center border-b-2' : 'flex gap-2 items-center hover:text-slate-700 transition'}>
                    <IconUser />
                </NavLink>
            </div>
        </div>
    </div>
)

const App = ({ children }: AppProps) => {
    return (
        <div className="overflow-hidden">
            <div className="flex items-center justify-center w-screen min-h-screen md:hidden bg-[#faf9f9] text-[#080D21] dark:bg-[#080D21] dark:text-[#faf9f9] fixed inset-0 z-50">
                <div className="max-w-screen-sm p-8 mx-auto space-y-8 text-center">
                    <span className="text-4xl font-bold tracking-wideer font-display">
                        <span className="inline-block animate-logo-sauna">Sauna</span><span className="inline-block animate-logo-box">Box</span>
                    </span>
                    <p>Sorry, this is just an example app and small screen sizes are not supported.</p>
                </div>
            </div>
            <div className="bg-[#faf9f9] min-h-screen w-full font-body text-[#080D21] dark:bg-[#080D21] dark:text-[#faf9f9] flex flex-col">
                <AppHeader />
                <div className="flex-1">
                    {children}
                </div>
                <footer className="px-12 py-8 text-xs text-right">
                    &copy; jmerilainen - demo project
                </footer>
            </div>
        </div>
    );
}

const Sidebar = ({ children }: SidebarProps) => {
    return (
        <div className="w-80 shrink-0 scroll-smooth">
            {children}
        </div>
    )
}

const Main = ({ children }: MainProps) => {
    return (
        <div className="grow scroll-smooth">
            {children}
        </div>
    );
}

App.Sidebar = Sidebar;
App.Main = Main;

export default App;