import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col justify-between">

            <h1 className="text-2xl font-bold mb-8">myWebsite</h1>

            <ul className="space-y-4">
                <li className="hover:text-blue-400 p-1 rounded transition cursor-pointer duration-200"><NavLink to="/Kasir" className={({ isActive }) =>
                    `block p-2 rounded-md transition ${isActive
                        ? "bg-slate-700 text-blue-400"
                        : "hover:bg-slate-700"
                    }`
                }>kasir</NavLink></li>
                <li className="hover:text-blue-400  p-1 rounded transition cursor-pointer duration-200"><NavLink to="/stok" className={({ isActive }) =>
                    `block p-2 rounded-md transition ${isActive
                        ? "bg-slate-700 text-blue-400"
                        : "hover:bg-slate-700"
                    }`
                }>stok</NavLink></li>
                <li className="hover:text-blue-400  p-1 rounded transition cursor-pointer duration-200"><NavLink to="/statistik" className={({ isActive }) =>
                    `block p-2 rounded-md transition ${isActive
                        ? "bg-slate-700 text-blue-400"
                        : "hover:bg-slate-700"
                    }`
                }>statistik</NavLink></li>

            </ul>
            <div className="mt-auto">
                <NavLink to="/profile" className={({ isActive }) =>
                    `block p-2 rounded-md transition ${isActive
                        ? "bg-slate-700 text-blue-400"
                        : "hover:bg-slate-700"
                    }`
                }>profile</NavLink>
            </div>
        </aside >
    )
}

export default Sidebar