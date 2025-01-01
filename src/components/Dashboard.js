import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "../css/Dashboard.css"; // External CSS file
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Sidebar from "./sidebar";
import Header from "./Header";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [data] = useState({
        stats: [
            { title: "ユーザー登録数累計", count: 450, countText: "人", subtext: "400人 (前月時点の累計)", change: 12.5, positive: true },
            { title: "アクティブユーザー", count: 50, countText: "人 / 今月", subtext: "12人 (前月時点)", change: 316.6, positive: true },
            { title: "定着率", count: 10, countText: "% / 前月", subtext: "12% (前々月)", change: 16.6, positive: false },
            { title: "平均検索回数", count: 4, countText: "回 / 今月", subtext: "2回 (前月の今日時点)", change: 100, positive: true },
            { title: "抽選利用回数", count: 125, countText: "回 / 今月", subtext: "85回 (前月の今日時点)", change: 47, positive: true },
            { title: "アカウント削除数", count: 10, countText: "人 / 今月", subtext: "8人 (前月の今日時点)", change: 25, positive: true },
        ],
        chartData: {
            labels: ["10代未満", "10代", "20代", "30代", "40代", "50代", "60代", "70代", "80代", "90代以上"],
            datasets: [
                {
                    label: "男性",
                    data: [400, 500, 700, 800, 1000, 900, 600, 200, 100, 50],
                    backgroundColor: "#FFCC80",
                },
                {
                    label: "女性",
                    data: [300, 400, 600, 700, 900, 800, 500, 150, 80, 40],
                    backgroundColor: "#FFA726",
                },
                {
                    label: "その他",
                    data: [100, 200, 300, 400, 500, 400, 200, 50, 20, 10],
                    backgroundColor: "#FFB74D",
                },
            ],
        },
    });

    return (
        <div className="container-fluid" style={{ background: "#F8F5F0", height: "100vh" }}>
            <div className="row">
                <Sidebar />

                {/* Main Content */}
                <main className="col-md-10">
                    <Header />

                    {/* First Row: Four Cards */}

                    <div className="row m-4">
                        <div className="col-12 d-flex flex-wrap justify-content-between">
                            {data.stats.slice(0, 4).map((stat, index) => (
                                <div
                                    key={index}
                                    className="mb-4"
                                    style={{
                                        width: "276px",
                                        height: "182px",
                                    }}
                                >
                                    <div
                                        className={`alert shadow-sm w-100 h-100 d-flex flex-column justify-content-between`}
                                        style={{
                                            borderRadius: "12px",
                                            border: "1px solid #e3e6f0",
                                            padding: "16px",
                                            backgroundColor: "#fff",
                                        }}
                                    >
                                        {/* Title and Subtext */}
                                        <div>
                                            <h6 className="mb-1" style={{ fontWeight: "bold", color: "#333" }}>
                                                {stat.title}
                                            </h6>
                                            <p
                                                className="text-muted"
                                                style={{
                                                    fontSize: "0.8rem",
                                                    margin: "0",
                                                }}
                                            >
                                                2024年2月1日 - 2024年2月5日
                                            </p>
                                        </div>

                                        {/* Count and Percentage in One Row */}
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            {/* Count */}
                                            <h2
                                                className="mb-0"
                                                style={{
                                                    fontSize: "2rem",
                                                    fontWeight: "bold",
                                                    color: "#333",
                                                }}
                                            >
                                                {stat.count}
                                                {typeof stat.count === "number" && (
                                                    <span
                                                        style={{
                                                            fontSize: "1rem",
                                                            fontWeight: "normal",
                                                            marginLeft: "4px",
                                                        }}
                                                    >
                                                        {stat.countText}
                                                    </span>
                                                )}
                                            </h2>

                                            {/* Light Percentage Alert */}
                                            <div
                                                className="position"
                                                style={{
                                                    backgroundColor: stat.positive ? "#e8f8e8" : "#fde8e8",
                                                    color: stat.positive ? "#28a745" : "#dc3545",
                                                    border: stat.positive ? "1px solid #c3e6cb" : "1px solid #f5c6cb",

                                                }}
                                            >
                                                <i
                                                    className={`bi ${stat.positive ? "bi-arrow-up" : "bi-arrow-down"}`}
                                                    style={{
                                                        marginRight: "4px", // Space between arrow and percentage
                                                    }}
                                                ></i>
                                                {stat.change}%
                                            </div>

                                        </div>

                                        {/* Subtext */}
                                        <p
                                            className="text-muted mt-2"
                                            style={{
                                                fontSize: "0.8rem",
                                                margin: "0",
                                            }}
                                        >
                                            {stat.subtext}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second Row: Chart and Two Cards */}
                    <div className="row m-4">
                        {/* Chart Section */}
                        <div className="col-md-6 mb-4">
    <div className="card shadow-sm p-3 h-100">
        <div className="d-flex justify-content-between align-items-center">
            <h5>性別・年代比</h5>
            <span>2024年 01月 ▶</span>
        </div>
        <div className="chart-container" style={{ height: "300px" }}>
            <Bar
                data={{
                    labels: ["10代未満", "10代", "20代", "30代", "40代", "50代", "60代", "70代", "80代", "90代以上"],
                    datasets: [
                        {
                            label: "男性",
                            data: [200, 300, 500, 700, 900, 800, 600, 400, 200, 100],
                            backgroundColor: "#ff8c00", // Bottom-most (Orange)
                            stack: "stack1",
                        },
                        {
                            label: "女性",
                            data: [100, 200, 400, 600, 800, 700, 500, 300, 100, 50],
                            backgroundColor: "#ffa500", // Second (Lighter Orange)
                            stack: "stack1",
                        },
                        {
                            label: "その他",
                            data: [50, 100, 200, 300, 400, 350, 250, 150, 50, 25],
                            backgroundColor: "#ffd700", // Third (Gold)
                            stack: "stack1",
                        },
                        {
                            label: "無回答",
                            data: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
                            backgroundColor: "#ffec8b", // Top-most (Light Yellow)
                            stack: "stack1",
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom", // Legend at the bottom
                            align: "start", // Aligns the legend to the left
                            labels: {
                                usePointStyle: false, // Square icons for legend
                                boxWidth: 9, // Set the square size
                                boxHeight: 9,
                            },
                        },
                        tooltip: {
                            enabled: true,
                            backgroundColor: "#ffffff",
                            borderColor: "#ccc",
                            borderWidth: 1,
                            titleColor: "#000000",
                            titleFont: {
                                size: 14,
                                weight: "bold",
                            },
                            bodyColor: "#000000",
                            bodyFont: {
                                size: 14,
                            },
                            displayColors: true,
                            callbacks: {
                                title: () => "", // Disable the title in tooltips
                                label: (context) => ` ${context.raw}人`,
                            },
                            padding: 10,
                            cornerRadius: 5, // Rounded tooltip corners
                        },
                    },
                    maintainAspectRatio: false,
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true, ticks: { stepSize: 100, max: 1000 } },
                      },
                }}
            />
        </div>
    </div>
</div>


                        {/* Two Cards Beside the Chart */}
                        <div className="col-md-6 d-flex flex-wrap justify-content-between">
                            {data.stats.slice(4, 6).map((stat, index) => (
                                <div
                                    key={index}
                                    className="card shadow-sm p-3 mb-3 d-flex flex-column justify-content-between"
                                    style={{
                                        width: "276px",
                                        height: "182px",
                                        borderRadius: "12px",
                                        border: "1px solid #e3e6f0",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <div>
                                        <h6 className="mb-1" style={{ fontWeight: "bold", color: "#333" }}>
                                            {stat.title}
                                        </h6>
                                        <p
                                            className="text-muted"
                                            style={{
                                                fontSize: "0.8rem",
                                                margin: "0",
                                            }}
                                        >
                                            2024年2月1日 - 2024年2月5日
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <h2
                                            className="mb-0"
                                            style={{
                                                fontSize: "2rem",
                                                fontWeight: "bold",
                                                color: "#333",
                                            }}
                                        >
                                            {stat.count}
                                            {typeof stat.count === "number" && (
                                                <span
                                                    style={{
                                                        fontSize: "1rem",
                                                        fontWeight: "normal",
                                                        marginLeft: "4px",
                                                    }}
                                                >
                                                    人 / 今月
                                                </span>
                                            )}
                                        </h2>

                                        <div
                                            className="position"
                                            style={{

                                                backgroundColor: stat.positive ? "#e8f8e8" : "#fde8e8",
                                                color: stat.positive ? "#28a745" : "#dc3545",
                                                border: stat.positive ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
                                            }}
                                        >
                                            {stat.positive ? <i class="bi bi-arrow-up"></i> : <i class="bi bi-arrow-down"></i>} {stat.change}%
                                        </div>
                                    </div>

                                    <p
                                        className="text-muted mt-2"
                                        style={{
                                            fontSize: "0.8rem",
                                            margin: "0",
                                        }}
                                    >
                                        {stat.subtext}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
