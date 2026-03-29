import { useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"

function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const hideSidebar = location.pathname === "/Login"

    return (
        <div className="flex h-screen">
            {!hideSidebar && <Sidebar />}
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default Layout