import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-900 text-white p-5">
            <h1 className="text-2xl font-bold mb-8">myWebsite</h1>

            <ul className="space-y-4">
                <li className="hover:text-blue-400 p-1 rounded transition cursor-pointer durration-200"><NavLink to="/" className={({ isActive }) =>
                    `block p-2 rounded-md transition ${isActive
                        ? "bg-slate-700 text-blue-400"
                        : "hover:bg-slate-700"
                    }`
                }>kasir</NavLink></li>
                <li className="hover:text-blue-400  p-1 rounded transition cursor-pointer durration-200"><NavLink to="/stok" className={({ isActive }) =>
                    `block p-2 rounded-md transition ${isActive
                        ? "bg-slate-700 text-blue-400"
                        : "hover:bg-slate-700"
                    }`
                }>stok</NavLink></li>
                <li className="hover:text-blue-400  p-1 rounded transition cursor-pointer durration-200">logout</li>
            </ul>
        </aside >
    )
}

export default Sidebar