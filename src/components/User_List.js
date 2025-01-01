import React, { useState } from "react";
import Sidebar from "./sidebar"; // Adjust the path if necessary
import Header from "./Header"; // Adjust the path if necessary

import "../css/UserList.css"; // Custom CSS if needed

const UserList = () => {
    // Simulated user data
    const initialUsers = [
        { id: "01", nickname: "ゆうと", email: "example1@example.com", dob: "1992年 12月", gender: "男性", location: "東京都", registrationDate: "2024年 01月 12日" },
        { id: "02", nickname: "ニックネーム最大12文字", email: "user234@example.net", dob: "1987年 5月", gender: "女性", location: "東京都", registrationDate: "2024年 01月 12日" },
        { id: "03", nickname: "わんこ好き", email: "test_user@gmail.com", dob: "1996年 10月", gender: "男性", location: "東京都", registrationDate: "2024年 01月 12日" },
        { id: "04", nickname: "はるかぜ", email: "dummy_email_567@yahoo.co.jp", dob: "1998年 2月", gender: "男性", location: "静岡県", registrationDate: "2024年 01月 12日" },
        { id: "05", nickname: "あおい", email: "ecampleaddress124e23@outlook.co.jp", dob: "1978年 5月", gender: "女性", location: "埼玉県", registrationDate: "2024年 01月 11日" },
        { id: "06", nickname: "ポンたろう", email: "random.user@example.org", dob: "1978年 6月", gender: "女性", location: "栃木県", registrationDate: "2024年 01月 11日" },
        { id: "07", nickname: "まさやん", email: "email1234@example.co.jp", dob: "1972年 8月", gender: "回答しない", location: "鹿児島県", registrationDate: "2024年 01月 11日" },
        { id: "08", nickname: "なつこ", email: "user_test456@gmail.com", dob: "1969年 11月", gender: "回答しない", location: "茨城県", registrationDate: "2024年 01月 11日" },
        { id: "09", nickname: "ぴょんぴょん", email: "example_email@yahoo.com", dob: "1984年 4月", gender: "女性", location: "東京都", registrationDate: "2024年 01月 10日" },
        { id: "10", nickname: "ひまわりさん", email: "dummy.address@example.net", dob: "1988年 4月", gender: "その他", location: "福岡県", registrationDate: "2024年 01月 10日" },
    ];

    const [users] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [loading, setLoading] = useState(false); // Loading state

    // Filter users based on the search input
    const filteredUsers = users.filter(
        (user) =>
            user.nickname.includes(search) || user.email.includes(search)
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setLoading(true); // Start loading

        // Simulate a delay to mimic loading
        setTimeout(() => {
            setLoading(false); // Stop loading
            setCurrentPage(1); // Reset to the first page
        }, 500);
    };

    const changePage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container-fluid" style={{ background: "#F8F5F0", height: "100vh" }}>
            <div className="row">
                <Sidebar />

                {/* Main Content */}
                <main className="col-md-10">
                    <Header />

                    {/* Heading and Search Bar */}
                    <div className="row mx-5 my-4">
                        <div className="row my-4">
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <h1 style={{ fontWeight: "500", fontSize: "20px" }}>ユーザーリスト</h1>
                                <div className="position-relative" style={{ width: "340px", marginRight: "-22px" }}>
                                    <i
                                        className="fas fa-search position-absolute"
                                        style={{
                                            left: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#999",
                                        }}
                                    ></i>
                                    <input
                                        type="text"
                                        className="form-control pl-5"
                                        placeholder="ニックネーム / メールアドレスで検索"
                                        style={{ paddingLeft: "35px", width: "100%" }}
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table and Spinner/Message Overlay */}
                        <div className="col-12 position-relative">
                            <table className="table" style={{ borderRadius: "8px", zIndex: 0 }}>
                                <thead>
                                    <tr>
                                        <th style={{ fontWeight: "500" }}>No.</th>
                                        <th style={{ fontWeight: "500" }}>ニックネーム</th>
                                        <th style={{ fontWeight: "500" }}>メールアドレス</th>
                                        <th style={{ fontWeight: "500" }}>生年月</th>
                                        <th style={{ fontWeight: "500" }}>性別</th>
                                        <th style={{ fontWeight: "500" }}>居住地</th>
                                        <th style={{ fontWeight: "500" }}>登録日</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{indexOfFirstUser + index + 1}</td>
                                            <td>{user.nickname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.dob}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.location}</td>
                                            <td>{user.registrationDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Overlay for Spinner or "No Data" */}
                            <div
                                className="d-flex justify-content-center align-items-center position-absolute w-100"
                                style={{
                                    top: "60px", // Adjust this to center within the table
                                    height: "300px", // Approximate table body height
                                    backgroundColor: "#F8F5F0", // Match container background
                                    zIndex: loading || filteredUsers.length === 0 ? 0 : -1, // Dynamic zIndex
                                }}
                            >
                                {loading ? (
                                    <div
                                        className="spinner-border text-warning"
                                        role="status"
                                        style={{ width: "2rem", height: "2rem" }}
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : filteredUsers.length === 0 ? (
                                    <span style={{ fontSize: "16px", fontWeight: "500" }}>表示するデータがありません</span>
                                ) : null}
                            </div>

                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <span>{users.length}人中 - {filteredUsers.length}人表示</span>
                            <nav>
                                <ul className="pagination mb-0">
                                    {/* Previous Button */}
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => changePage(currentPage - 1)}
                                            style={{ color: "#000000", borderRadius: "5px" }}
                                        >
                                            &lt;
                                        </button>
                                    </li>

                                    {/* Pagination Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <li
                                            className={`page-item ${page === currentPage ? "active" : ""}`}
                                            key={page}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => changePage(page)}
                                                style={{ color: "#000000", borderRadius: "5px" }}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}

                                    {/* Next Button */}
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => changePage(currentPage + 1)}
                                            style={{ color: "#000000", borderRadius: "5px" }}
                                        >
                                            &gt;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserList;
