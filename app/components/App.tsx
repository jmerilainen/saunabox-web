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
                <NavLink to="/sauna" className={({ isActive }) => isActive ? 'flex gap-2 items-center border-b-2' : 'flex gap-2 items-center'}>
                    <span>Saunas</span>
                </NavLink>

            </div>
            <div className="flex justify-end gap-8">
                <NavLink to="/login" className={({ isActive }) => isActive ? 'flex gap-2 items-center border-b-2' : 'flex gap-2 items-center'}>
                    <IconUser />
                </NavLink>
            </div>
        </div>
    </div>
)

const App = ({ children }: AppProps) => {
    return (
        <div className="bg-[#faf9f9] min-h-screen w-full font-body text-[#080D21] dark:bg-[#080D21] dark:text-[#faf9f9]">
            <AppHeader />
            {children}
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