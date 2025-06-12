import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { validateCompanyInputData } from "../utils/validate";
import { API_URL } from "../utils/constants";

const Company = () => {
  const [inputData, setInputData] = useState({
    CompanyName: "",
    CompanyEmail: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    DOB: "",
    MobileNo: "",
    Address: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [filterUsers, setFilterUsers] = useState([]);

  const handleChangeInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmitUserData = async (e) => {
    try {
      e.preventDefault();

      let validateError = validateCompanyInputData(inputData);
      setError(validateError);

      if (Object.keys(validateError).length > 0) {
        return;
      }

      let data;

      if (editIndex == null) {
        data = await axios.post(`${API_URL}/addCompanyUser`, inputData, {
          withCredentials: true,
        });
      } else {
        data = await axios.put(
          `${API_URL}/editCompanyUser/${editIndex}`,
          inputData,
          { withCredentials: true }
        );
      }

      if (data?.status == 200) {
        toast.success(data?.data?.message);
        setInputData({
          CompanyName: "",
          CompanyEmail: "",
          FirstName: "",
          MiddleName: "",
          LastName: "",
          Gender: "",
          DOB: "",
          MobileNo: "",
          Address: "",
        });
        setEditIndex(null);
        fetchUserData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/companyUser`, {
        withCredentials: true,
      });
      setUsers(response?.data?.data);
      setFilterUsers(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditUserData = async (uId) => {
    try {
      setEditIndex(uId);
      const filterUserData = users.find((x) => x._id == uId);
      if (filterUserData) {
        setInputData({
          CompanyName: filterUserData.CompanyName || "",
          CompanyEmail: filterUserData.CompanyEmail || "",
          FirstName: filterUserData.FirstName || "",
          MiddleName: filterUserData.MiddleName || "",
          LastName: filterUserData.LastName || "",
          Gender: filterUserData.Gender || "",
          DOB: filterUserData.DOB || "",
          MobileNo: filterUserData.MobileNo || "",
          Address: filterUserData.Address || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (uId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/deleteCompanyUser/${uId}`,
        { withCredentials: true }
      );

      if (response.status == 200) {
        toast.success(response?.data?.message);
      }

      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message || error);
    }
  };

  const handleSearchUser = () => {
    try {
      if (searchText.trim() === "") {
        setFilterUsers(users);
        return;
      }

      const lowerSearch = searchText.toLowerCase();

      const searchData = users.filter((user) => {
        const fullName =
          `${user.FirstName} ${user.MiddleName} ${user.LastName}`.toLowerCase();
        return (
          user.CompanyName?.toLowerCase().includes(lowerSearch) ||
          user.CompanyEmail?.toLowerCase().includes(lowerSearch) ||
          fullName.includes(lowerSearch) ||
          user.MobileNo?.toString().includes(searchText) ||
          user.Address?.toLowerCase().includes(lowerSearch)
        );
      });

      setFilterUsers(searchData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="company-page">
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
      <div className="content">
        <div className="form-section">
          <h2>Company User Registration</h2>
          <form onSubmit={handleSubmitUserData}>
            <input
              type="text"
              name="CompanyName"
              value={inputData.CompanyName}
              onChange={handleChangeInput}
              placeholder="Company Name"
            />
            {error?.CompanyName && (
              <p style={{ color: "red" }}>{error?.CompanyName}</p>
            )}

            <input
              type="text"
              name="CompanyEmail"
              value={inputData.CompanyEmail}
              onChange={handleChangeInput}
              placeholder="Company Email"
            />
            {error?.CompanyEmail && (
              <p style={{ color: "red" }}>{error?.CompanyEmail}</p>
            )}

            <input
              type="text"
              name="FirstName"
              value={inputData.FirstName}
              onChange={handleChangeInput}
              placeholder="First Name"
            />
            {error?.FirstName && (
              <p style={{ color: "red" }}>{error?.FirstName}</p>
            )}

            <input
              type="text"
              name="MiddleName"
              value={inputData.MiddleName}
              onChange={handleChangeInput}
              placeholder="Middle Name"
            />
            {error?.MiddleName && (
              <p style={{ color: "red" }}>{error?.MiddleName}</p>
            )}

            <input
              type="text"
              name="LastName"
              value={inputData.LastName}
              onChange={handleChangeInput}
              placeholder="Last Name"
            />
            {error?.LastName && (
              <p style={{ color: "red" }}>{error?.LastName}</p>
            )}

            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="Gender"
                  value="Male"
                  checked={inputData.Gender === "Male"}
                  onChange={handleChangeInput}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="Gender"
                  value="Female"
                  checked={inputData.Gender === "Female"}
                  onChange={handleChangeInput}
                />
                Female
              </label>
              {error?.Gender && <p style={{ color: "red" }}>{error?.Gender}</p>}
            </div>

            <input
              type="date"
              name="DOB"
              value={inputData.DOB}
              onChange={handleChangeInput}
            />
            {error?.DOB && <p style={{ color: "red" }}>{error?.DOB}</p>}

            <input
              type="text"
              name="MobileNo"
              value={inputData.MobileNo}
              onChange={handleChangeInput}
              placeholder="Mobile No"
            />
            {error?.MobileNo && (
              <p style={{ color: "red" }}>{error?.MobileNo}</p>
            )}

            <input
              type="text"
              name="Address"
              value={inputData.Address}
              onChange={handleChangeInput}
              placeholder="Address"
            />
            {error?.Address && <p style={{ color: "red" }}>{error?.Address}</p>}

            <button type="submit">
              {editIndex == null ? "Submit" : "Save"}
            </button>
          </form>
        </div>

        <div className="table-section">
          <h2>Company Users</h2>
          <div className="search-bar">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search user..."
            />
            <button onClick={handleSearchUser}>Search</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>UID</th>
                <th>Company Name</th>
                <th>Company Email</th>
                <th>Full Name</th>
                <th>Mobile No</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers.length > 0 ? (
                filterUsers.map((user, i) => (
                  <tr key={user?._id}>
                    <td>{i + 1}</td>
                    <td>{user?._id}</td>
                    <td>{user?.CompanyName}</td>
                    <td>{user?.CompanyEmail}</td>
                    <td>
                      {user?.FirstName} {user?.MiddleName} {user?.LastName}
                    </td>
                    <td>{user?.MobileNo}</td>
                    <td>{user?.DOB}</td>
                    <td>{user?.Address}</td>
                    <td>
                      <button onClick={() => handleEditUserData(user?._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteUser(user?._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Company;
