import Sidebar from "./Sidebar"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                {children}
            </div>
        </div>

    )
}

export default Layout