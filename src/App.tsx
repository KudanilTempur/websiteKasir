
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Stok from "./pages/Stok"
import Kasir from "./pages/Kasir"
import Statistik from "./pages/Statistik"
import Profile from "./pages/Profile"
import Login from "./pages/Login"



function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stok" element={<Stok />} />
        <Route path="/statistik" element={<Statistik />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Kasir" element={<Kasir />} />
      </Routes>
    </Layout>
  )
}

export default App
