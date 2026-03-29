import { useState } from "react"
import { Eye, EyeOff, Lock, User } from "lucide-react"

function Login() {
    const [form, setForm] = useState({ username: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError("")
    }

    const handleLogin = () => {
        if (!form.username || !form.password) {
            setError("Username dan password wajib diisi.")
            return
        }

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (form.username === "admin" && form.password === "admin123") {
                window.location.href = "/kasir"
            } else {
                setError("Username atau password salah.")
            }
        }, 1000)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLogin()
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex min-h-[500px]">

                {/* Sisi Kiri — Branding */}
                <div className="w-1/2 bg-slate-800 flex flex-col items-center justify-center p-12 gap-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">T</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-white text-2xl font-bold">Toko Sejahtera</h1>
                        <p className="text-slate-400 text-sm mt-2">Sistem Kasir & Manajemen Stok</p>
                    </div>
                    <div className="w-full border-t border-white/10 pt-6 space-y-3">
                        {["Kelola stok barang dengan mudah", "Laporan penjualan harian", "Transaksi kasir cepat"].map((text) => (
                            <div key={text} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                <p className="text-slate-400 text-sm">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sisi Kanan — Form Login */}
                <div className="w-1/2 flex flex-col justify-center px-12 py-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Selamat Datang</h2>
                        <p className="text-sm text-gray-400 mt-1">Masuk ke akun kamu untuk melanjutkan</p>
                    </div>

                    <div className="space-y-4">

                        {/* Username */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-500">Username</label>
                            <div className="relative">
                                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Masukkan username"
                                    className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-500">Password</label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Masukkan password"
                                    className="w-full border border-gray-200 rounded-lg pl-9 pr-10 py-2.5 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                                {error}
                            </p>
                        )}

                        {/* Tombol Login */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition active:scale-95 mt-2"
                        >
                            {loading ? "Masuk..." : "Masuk"}
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 text-center mt-8">
                        Demo: username <span className="font-medium text-gray-600">admin</span> / password <span className="font-medium text-gray-600">admin123</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login