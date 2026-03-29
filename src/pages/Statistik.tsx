
import { useState, useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const allData = [
    { date: "2025-03-01", income: 450000, trx: 8 },
    { date: "2025-03-02", income: 720000, trx: 12 },
    { date: "2025-03-03", income: 310000, trx: 6 },
    { date: "2025-03-04", income: 890000, trx: 15 },
    { date: "2025-03-05", income: 560000, trx: 9 },
    { date: "2025-03-06", income: 230000, trx: 4 },
    { date: "2025-03-07", income: 680000, trx: 11 },
    { date: "2025-03-08", income: 940000, trx: 16 },
    { date: "2025-03-09", income: 410000, trx: 7 },
    { date: "2025-03-10", income: 770000, trx: 13 },
    { date: "2025-03-11", income: 820000, trx: 14 },
    { date: "2025-03-12", income: 390000, trx: 7 },
    { date: "2025-03-13", income: 610000, trx: 10 },
    { date: "2025-03-14", income: 1020000, trx: 18 },
]

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

const pct = (n: number, base: number) => {
    if (base === 0) return "+0%"
    const val = Math.round(((n - base) / base) * 100)
    return (val >= 0 ? "+" : "") + val + "%"
}

function Statistik() {
    const today = allData[allData.length - 1]

    const [fromDate, setFromDate] = useState(allData[0].date)
    const [toDate, setToDate] = useState(allData[allData.length - 1].date)

    const [filtered, setFiltered] = useState(allData)

    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    const totalIncome = filtered.reduce((a, d) => a + d.income, 0)
    const totalTrx = filtered.reduce((a, d) => a + d.trx, 0)
    const avgPerTrx = totalTrx > 0 ? Math.round(totalIncome / totalTrx) : 0

    const prev = allData.filter((d) => d.date < fromDate)
    const prevIncome = prev.reduce((a, d) => a + d.income, 0)
    const prevTrx = prev.reduce((a, d) => a + d.trx, 0)
    const prevAvg = prevTrx > 0 ? Math.round(prevIncome / prevTrx) : 0

    const handleApply = () => {
        const result = allData.filter((d) => d.date >= fromDate && d.date <= toDate)
        setFiltered(result)
    }

    useEffect(() => {
        if (!chartRef.current) return

        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        chartInstance.current = new Chart(chartRef.current, {
            type: "line",
            data: {
                labels: filtered.map((d) => d.date.slice(5)),
                datasets: [
                    {
                        label: "Pendapatan",
                        data: filtered.map((d) => d.income),
                        borderColor: "#2563eb",
                        backgroundColor: "rgba(37,99,235,0.08)",
                        tension: 0.35,
                        pointRadius: 3,
                        pointBackgroundColor: "#2563eb",
                        fill: true,
                    },
                    {
                        label: "Transaksi (×50k)",
                        data: filtered.map((d) => d.trx * 50000),
                        borderColor: "#f59e0b",
                        backgroundColor: "rgba(245,158,11,0.07)",
                        tension: 0.35,
                        pointRadius: 3,
                        pointBackgroundColor: "#f59e0b",
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        grid: { color: "rgba(0,0,0,0.05)" },
                        ticks: { font: { size: 11 }, color: "#94a3b8" },
                    },
                    y: {
                        grid: { color: "rgba(0,0,0,0.05)" },
                        ticks: {
                            font: { size: 11 },
                            color: "#94a3b8",
                            callback: (v) => "Rp " + (Number(v) / 1000).toFixed(0) + "k",
                        },
                    },
                },
            },
        })

        return () => {
            chartInstance.current?.destroy()
        }
    }, [filtered])

    const Badge = ({ value, base }: { value: number; base: number }) => {
        const text = pct(value, base)
        const isNeg = value < base
        return (
            <span
                className={`inline-block text-xs px-2 py-0.5 rounded mt-1 font-medium ${isNeg
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                    }`}
            >
                {text}
            </span>
        )
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Statistik</h2>

            {/* Kartu ringkasan hari ini */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 mb-1">Pendapatan Hari Ini</p>
                    <p className="text-2xl font-semibold text-gray-800">{fmt(today.income)}</p>
                    <p className="text-xs text-gray-400 mt-1">dibanding kemarin</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 mb-1">Total Transaksi Hari Ini</p>
                    <p className="text-2xl font-semibold text-gray-800">{today.trx} transaksi</p>
                    <p className="text-xs text-gray-400 mt-1">sejak pukul 00.00</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 mb-1">Produk Terjual Hari Ini</p>
                    <p className="text-2xl font-semibold text-gray-800">
                        {Math.round(today.trx * 2.3)} item
                    </p>
                    <p className="text-xs text-gray-400 mt-1">dari semua kategori</p>
                </div>
            </div>

            {/* Filter tanggal */}
            <div className="flex items-end gap-4 mb-6">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Dari Tanggal</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Sampai Tanggal</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
                    />
                </div>
                <button
                    onClick={handleApply}
                    className="bg-gray-800 text-white px-5 py-2 rounded-md text-sm hover:bg-gray-900 active:scale-95 transition cursor-pointer"
                >
                    Terapkan
                </button>
            </div>

            {/* Kartu rentang */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 mb-1">Total Pendapatan</p>
                    <p className="text-xl font-semibold text-gray-800">{fmt(totalIncome)}</p>
                    <Badge value={totalIncome} base={prevIncome} />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 mb-1">Total Transaksi</p>
                    <p className="text-xl font-semibold text-gray-800">{totalTrx} transaksi</p>
                    <Badge value={totalTrx} base={prevTrx} />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 mb-1">Rata-rata per Transaksi</p>
                    <p className="text-xl font-semibold text-gray-800">{fmt(avgPerTrx)}</p>
                    <Badge value={avgPerTrx} base={prevAvg} />
                </div>
            </div>

            {/* Grafik */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-semibold text-gray-800">Grafik Pendapatan</h3>
                    <div className="flex gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                            Pendapatan
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                            Transaksi
                        </span>
                    </div>
                </div>
                <div className="relative w-full h-60">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    )
}

export default Statistik
