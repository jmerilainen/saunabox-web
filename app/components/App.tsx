import type { FC, ReactNode } from "react";

interface AppProps {
    children: ReactNode
}

interface SidebarProps {
    children: ReactNode
}

interface MainProps {
    children: ReactNode;
}

const App: FC<AppProps> & {
    Sidebar: FC<SidebarProps>;
    Main: FC<MainProps>;
} = ({ children }) => {
    return (
        <div className="w-full">
            <div className="w-full max-w-screen-md mx-auto">
                <div className="flex min-h-screen gap-4 py-12">
                    {children}
                </div>
            </div>
        </div>
    );
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
    return (
        <div className="max-h-[calc(100vh-6rem)] overflow-y-auto w-80 shrink-0 scroll-smooth">
            {children}
        </div>
    )
}

const Main: FC<MainProps> = ({ children }) => {
    return (
        <div className="max-h-screen overflow-y-auto w-80 shrink-0 scroll-smooth">
            {children}
        </div>
    );
}

App.Sidebar = Sidebar;
App.Main = Main;

export default App;