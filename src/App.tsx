
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Stok from "./pages/Stok"
import Kasir from "./pages/Kasir"

function kasir() {
  return (
    <h2 className="text-3xl font-bold">Halaman kasir ini wok</h2>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Kasir />} />
        <Route path="/stok" element={<Stok />} />
      </Routes>
    </Layout>
  )
}

export default App
