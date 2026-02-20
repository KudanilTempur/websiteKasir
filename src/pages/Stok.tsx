import React, { useState } from "react"

function Stok() {
    const [products, setProducts] = useState([
        { id: 1, name: "Beras", kategori: "makanan", price: 12000, stock: 20 },
        { id: 2, name: "Gula", kategori: "makanan", price: 14000, stock: 15 },
        { id: 3, name: "Minyak", kategori: "makanan", price: 18000, stock: 10 },
    ])

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const [editId, setEditId] = useState<number | null>(null)

    const [search, setSearch] = useState("")

    const totalProduk = products.length
    const handleSubmit = () => {
        if (!form.name || !form.kategori || !form.price || !form.stock) {
            alert("Isi semua field dulu")
            return
        }


        if (editId !== null) {
            const updatedProducts = products.map((product) =>
                product.id === editId
                    ? { ...product, ...form, price: Number(form.price), stock: Number(form.stock) }
                    : product
            )

            setProducts(updatedProducts)
            setEditId(null)
        } else {
            const newProduct = {
                id: products.length + 1,
                ...form,
                price: Number(form.price),
                stock: Number(form.stock)
            }

            setProducts([...products, newProduct])
        }

        setform({
            name: "",
            kategori: "",
            price: "",
            stock: ""
        })

        setShowForm(false)
    }





    const [form, setform] = useState({
        name: "",
        kategori: "",
        price: "",
        stock: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        })
    }


    const handleDelete = (id: number) => {
        const filteredProducts = products.filter((product) => product.id !== id)
        setProducts(filteredProducts)
    }

    const handleEdit = (product: any) => {
        setform({
            name: product.name,
            kategori: product.kategori,
            price: product.price,
            stock: product.stock
        })
        setEditId(product.id)
        setShowForm(true)

    }

    const [showForm, setShowForm] = useState(false)


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold mb-6">Cek Stok</h2>



                <button
                    onClick={() => setShowForm(!showForm)}
                    className=" bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition cursor-pointer">+ tambah produk</button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">

                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
                        >
                            ×
                        </button>

                        <h3 className="text-xl font-bold mb-4">
                            {editId ? "Edit Produk" : "Tambah Produk"}
                        </h3>

                        <div className="grid gap-4">
                            <div className="grid gap-4 ">
                                <div className="grid gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nama Produk"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="border p-2 rounded-md"
                                    />

                                    <select
                                        name="kategori"
                                        value={form.kategori}
                                        onChange={handleChange}
                                        className="border p-2 rounded-md cursor-pointer"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="Makanan">Makanan</option>
                                        <option value="Minuman">Minuman</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>

                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Harga"
                                        value={form.price}
                                        onChange={handleChange}
                                        className="border p-2 rounded-md"
                                    />

                                    <input
                                        type="number"
                                        name="stock"
                                        placeholder="Stok"
                                        value={form.stock}
                                        onChange={handleChange}
                                        className="border p-2 rounded-md"
                                    />

                                    <button
                                        onClick={handleSubmit}
                                        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition cursor-pointer">
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <input
                    type="text"
                    placeholder="Cari produk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded-md mb-4 w-full "
                />

                <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="bg-gray-700 text-white px-4 py-0 rounded-md mb-4 ml-4 cursor-pointer hover:bg-gray-800 active:scale-95 transition"
                >
                    Sort Harga ({sortOrder})
                </button>
            </div>





            <div className="bg-white p-6 rounded-lg shadow-md">


                <div className="flex justify-between items-center mb-6">
                    <div className=" rounded-md p-4">
                        <h2 className="text-xl font-bold">Stok Barang</h2>
                    </div>
                    <p className="bg-slate-100 px-4 py-2 rounded-lg text-sm">Total Produk : <span className=" font-bold">{totalProduk}</span></p>

                </div>
                <div className="grid grid-cols-3 gap-6  md:grid-cols-2 lg:grid-cols-3">
                    {products
                        .filter((product) =>
                            product.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .sort((a, b) =>
                            sortOrder === "asc"
                                ? a.price - b.price
                                : b.price - a.price
                        )
                        .map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transition duration-200"
                            >
                                <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Gambar</span>
                                </div>

                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-gray-600">Rp {product.price}</p>

                                <p className={product.stock < 6 ? "text-red-600 font-bold" : ""}>
                                    Stok: {product.stock}
                                </p>

                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Stok
