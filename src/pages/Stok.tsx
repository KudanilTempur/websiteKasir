const products = [
    { id: 1, name: "Beras", kategori: "makanan", price: 12000, stock: 20 },
    { id: 2, name: "Gula", kategori: "makanan", price: 14000, stock: 15 },
    { id: 3, name: "Minyak", kategori: "makanan", price: 18000, stock: 10 },
]



function Stok() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Cek Stok</h2>

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
                            <tr key={products.id} className="border-b">
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
