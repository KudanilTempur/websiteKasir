import { useState, useRef } from "react"
import { ArrowLeft, User, Camera, LogOut, Lock, Eye, EyeOff } from "lucide-react"

function Profile() {
    const [form, setForm] = useState({
        namaLengkap: "Admin Toko",
        username: "admin123",
        email: "admin@tokoku.com",
        noTelepon: "081234567890",
        namaToko: "Toko Sejahtera",
        alamatToko: "Jl. Merdeka No. 10, Bogor",
    })

    const [passwordForm, setPasswordForm] = useState({
        passwordLama: "",
        passwordBaru: "",
        konfirmasiPassword: "",
    })

    const [showPass, setShowPass] = useState({
        passwordLama: false,
        passwordBaru: false,
        konfirmasiPassword: false,
    })

    const [avatar, setAvatar] = useState<string | null>(null)
    const [saved, setSaved] = useState(false)
    const [passwordSaved, setPasswordSaved] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [activeTab, setActiveTab] = useState<"profil" | "password">("profil")

    const fileRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setSaved(false)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
        setPasswordError("")
        setPasswordSaved(false)
    }

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const handleSavePassword = () => {
        if (!passwordForm.passwordLama || !passwordForm.passwordBaru || !passwordForm.konfirmasiPassword) {
            setPasswordError("Semua field wajib diisi.")
            return
        }
        if (passwordForm.passwordBaru !== passwordForm.konfirmasiPassword) {
            setPasswordError("Password baru dan konfirmasi tidak cocok.")
            return
        }
        if (passwordForm.passwordBaru.length < 6) {
            setPasswordError("Password baru minimal 6 karakter.")
            return
        }
        setPasswordError("")
        setPasswordSaved(true)
        setPasswordForm({ passwordLama: "", passwordBaru: "", konfirmasiPassword: "" })
        setTimeout(() => setPasswordSaved(false), 2500)
    }

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => setAvatar(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleLogout = () => {
        setShowLogoutModal(false)
        window.location.href = "/"
    }

    const profilFields: { label: string; name: keyof typeof form; placeholder: string }[] = [
        { label: "Nama Lengkap", name: "namaLengkap", placeholder: "Masukkan nama lengkap" },
        { label: "Username", name: "username", placeholder: "Masukkan username" },
        { label: "Email", name: "email", placeholder: "Masukkan email" },
        { label: "No. Telepon", name: "noTelepon", placeholder: "Masukkan no. telepon" },
        { label: "Nama Toko", name: "namaToko", placeholder: "Masukkan nama toko" },
        { label: "Alamat Toko", name: "alamatToko", placeholder: "Masukkan alamat toko" },
    ]

    const passwordFields: { label: string; name: keyof typeof passwordForm; placeholder: string }[] = [
        { label: "Password Lama", name: "passwordLama", placeholder: "Masukkan password lama" },
        { label: "Password Baru", name: "passwordBaru", placeholder: "Masukkan password baru" },
        { label: "Konfirmasi Password", name: "konfirmasiPassword", placeholder: "Ulangi password baru" },
    ]

    return (
        <div className="h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <p className="text-xs text-gray-400 leading-none">Pengaturan</p>
                        <h2 className="text-xl font-bold text-gray-800 leading-tight">Kelola Akun</h2>
                    </div>
                </div>

                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium cursor-pointer transition active:scale-95"
                >
                    <LogOut size={15} />
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-12 gap-5 flex-1 min-h-0">

                {/* Kartu Kiri */}
                <div className="col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center p-8 gap-4">
                    <div className="relative">
                        <div
                            className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden cursor-pointer"
                            onClick={() => fileRef.current?.click()}
                        >
                            {avatar ? (
                                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} className="text-purple-500" />
                            )}
                        </div>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 cursor-pointer transition"
                        >
                            <Camera size={13} className="text-gray-500" />
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                    </div>

                    <div className="text-center">
                        <p className="font-semibold text-gray-800 text-base">{form.namaLengkap}</p>
                        <p className="text-sm text-gray-400">@{form.username}</p>
                    </div>

                    <div className="w-full border-t border-gray-100 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Email</span>
                            <span className="text-gray-700 font-medium truncate ml-2">{form.email}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Telepon</span>
                            <span className="text-gray-700 font-medium">{form.noTelepon}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Toko</span>
                            <span className="text-gray-700 font-medium truncate ml-2">{form.namaToko}</span>
                        </div>
                    </div>

                    {/* Tab navigasi */}
                    <div className="w-full mt-auto pt-4 border-t border-gray-100 space-y-1">
                        <button
                            onClick={() => setActiveTab("profil")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition ${activeTab === "profil"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            <User size={15} />
                            Edit Profil
                        </button>
                        <button
                            onClick={() => setActiveTab("password")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition ${activeTab === "password"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            <Lock size={15} />
                            Ubah Password
                        </button>
                    </div>
                </div>

                {/* Kartu Kanan */}
                <div className="col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col">

                    {/* Tab: Edit Profil */}
                    {activeTab === "profil" && (
                        <>
                            <h3 className="font-semibold text-gray-700 mb-5">Informasi Akun</h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4 flex-1">
                                {profilFields.map((field) => (
                                    <div key={field.name} className="flex flex-col gap-1">
                                        <label className="text-xs text-gray-500 font-medium">{field.label}</label>
                                        <input
                                            type="text"
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400 transition bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setSaved(false)}
                                    className="px-5 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={handleSave}
                                    className={`px-6 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer transition active:scale-95 ${saved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
                                </button>
                            </div>
                        </>
                    )}

                    {/* Tab: Ubah Password */}
                    {activeTab === "password" && (
                        <>
                            <h3 className="font-semibold text-gray-700 mb-1">Ubah Password</h3>
                            <p className="text-xs text-gray-400 mb-6">Pastikan password baru minimal 6 karakter.</p>

                            <div className="flex flex-col gap-4 max-w-sm">
                                {passwordFields.map((field) => (
                                    <div key={field.name} className="flex flex-col gap-1">
                                        <label className="text-xs text-gray-500 font-medium">{field.label}</label>
                                        <div className="relative">
                                            <input
                                                type={showPass[field.name] ? "text" : "password"}
                                                name={field.name}
                                                value={passwordForm[field.name]}
                                                onChange={handlePasswordChange}
                                                placeholder={field.placeholder}
                                                className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm text-gray-800 outline-none focus:border-blue-400 transition bg-gray-50 focus:bg-white"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPass((prev) => ({
                                                        ...prev,
                                                        [field.name]: !prev[field.name],
                                                    }))
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                            >
                                                {showPass[field.name] ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {passwordError && (
                                    <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 flex justify-start">
                                <button
                                    onClick={handleSavePassword}
                                    className={`px-6 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer transition active:scale-95 ${passwordSaved
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    {passwordSaved ? "Password Diperbarui ✓" : "Simpan Password"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Modal Logout */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80 shadow-xl">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mx-auto mb-4">
                            <LogOut size={20} className="text-red-500" />
                        </div>
                        <h3 className="text-center font-bold text-gray-800 text-lg mb-1">Logout</h3>
                        <p className="text-center text-sm text-gray-500 mb-6">
                            Kamu yakin ingin keluar dari akun ini?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold cursor-pointer transition active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile