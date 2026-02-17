import React, { useState } from "react"

function Stok() {
    const [products, setProducts] = useState([
        { id: 1, name: "Beras", kategori: "makanan", price: 12000, stock: 20 },
        { id: 2, name: "Gula", kategori: "makanan", price: 14000, stock: 15 },
        { id: 3, name: "Minyak", kategori: "makanan", price: 18000, stock: 10 },
    ])

    const handleSubmit = () => {
        if (!form.name || !form.kategori || !form.price || !form.stock) {
            alert("Please fill in all fields")
            return
        }
        const newProduct = {
            id: products.length + 1,
            name: form.name,
            kategori: form.kategori,
            price: Number(form.price),
            stock: Number(form.stock)
        }

        setProducts([...products, newProduct])

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

    const [showForm, setShowForm] = useState(false)


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold mb-6">Cek Stok</h2>



                <button
                    onClick={() => setShowForm(!showForm)}
                    className=" bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transitionn cursor-pointer">+ tambah produk</button>
            </div>

            {showForm && (
                <div className="grid gap-4 mb-6">
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
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">Nama</th>
                            <th className="py-2">kategori</th>
                            <th className="py-2">harga</th>
                            <th className="py-2">stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b">
                                <td className="py-2">{product.name}</td>
                                <td className="py-2">{product.kategori}</td>
                                <td className="py-2">Rp {product.price}</td>
                                <td className="py-2">{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Stok
