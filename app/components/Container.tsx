export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-8">
            <div className="w-full max-w-screen-lg mx-auto">
                {children}
            </div>
        </div>
    )
}