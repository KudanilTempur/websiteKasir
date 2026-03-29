import { useState } from "react"

type Product = {
    id: number
    name: string
    kategori: string
    price: number
    stock: number
}

type CartItem = Product & { qty: number }

const initialProducts: Product[] = [
    { id: 1, name: "Beras", kategori: "Makanan", price: 12000, stock: 20 },
    { id: 2, name: "Gula", kategori: "Makanan", price: 14000, stock: 15 },
    { id: 3, name: "Minyak", kategori: "Makanan", price: 18000, stock: 10 },
    { id: 4, name: "Teh Botol", kategori: "Minuman", price: 5000, stock: 30 },
    { id: 5, name: "Air Mineral", kategori: "Minuman", price: 4000, stock: 50 },
]

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

function Kasir() {
    const [products] = useState<Product[]>(initialProducts)
    const [cart, setCart] = useState<CartItem[]>([])
    const [search, setSearch] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((c) => c.id === product.id)
            if (existing) {
                if (existing.qty >= product.stock) return prev
                return prev.map((c) =>
                    c.id === product.id ? { ...c, qty: c.qty + 1 } : c
                )
            }
            return [...prev, { ...product, qty: 1 }]
        })
    }

    const updateQty = (id: number, delta: number) => {
        setCart((prev) =>
            prev
                .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
                .filter((c) => c.qty > 0)
        )
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((c) => c.id !== id))
    }

    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0)

    const handleBayar = () => {
        setShowConfirm(true)
    }

    const handleKonfirmasi = () => {
        setCart([])
        setShowConfirm(false)
    }

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-6">Kasir</h2>

            <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">

                {/* Keranjang */}
                <div className="col-span-8 bg-white p-5 flex flex-col rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-700 mb-3">Keranjang</h3>

                    <div className="flex-1 overflow-y-auto min-h-0">
                        {cart.length === 0 ? (
                            <div className="h-full border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
                                Keranjang masih kosong
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">{fmt(item.price)} / pcs</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQty(item.id, -1)}
                                                className="w-7 h-7 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm cursor-pointer transition"
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center font-semibold text-gray-800">
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() => updateQty(item.id, 1)}
                                                className="w-7 h-7 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm cursor-pointer transition"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="w-28 text-right font-semibold text-gray-800">
                                            {fmt(item.price * item.qty)}
                                        </p>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-4 text-red-400 hover:text-red-600 text-lg cursor-pointer transition"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Total & Bayar */}
                    <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-500 text-sm">Total Item</span>
                            <span className="text-gray-700">{cart.reduce((s, c) => s + c.qty, 0)} pcs</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-gray-800">Total</span>
                            <span className="text-xl font-bold text-gray-900">{fmt(total)}</span>
                        </div>
                        <button
                            onClick={handleBayar}
                            disabled={cart.length === 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition cursor-pointer active:scale-95"
                        >
                            Bayar
                        </button>
                    </div>
                </div>

                {/* Daftar Produk */}
                <div className="col-span-4 bg-white p-4 flex flex-col rounded-xl shadow-sm border border-gray-100 min-h-0">
                    <h3 className="font-semibold text-gray-700 mb-3">Produk</h3>

                    <input
                        type="text"
                        placeholder="Cari barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-3 p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                    />

                    <div className="flex-1 overflow-y-auto min-h-0 space-y-2">
                        {filtered.map((product) => {
                            const inCart = cart.find((c) => c.id === product.id)
                            return (
                                <div
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-lg p-3 cursor-pointer transition duration-150"
                                >
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-gray-400 text-xs">Img</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-800 truncate">{product.name}</p>
                                        <p className="text-xs text-gray-500">{fmt(product.price)}</p>
                                    </div>
                                    {inCart ? (
                                        <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-0.5 font-semibold">
                                            {inCart.qty}
                                        </span>
                                    ) : (
                                        <span className="text-xs text-gray-400">Stok {product.stock}</span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Pembayaran */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Konfirmasi Pembayaran</h3>

                        <div className="space-y-2 mb-4 max-h-52 overflow-y-auto">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm text-gray-700">
                                    <span>{item.name} × {item.qty}</span>
                                    <span>{fmt(item.price * item.qty)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-3 mb-4 flex justify-between font-bold text-gray-900">
                            <span>Total</span>
                            <span>{fmt(total)}</span>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 border border-gray-300 py-2 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleKonfirmasi}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold cursor-pointer transition"
                            >
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Kasir