import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmitUser = () => {
    if (selectedUser == "") {
      toast.error("User Type is not Selected");
      return;
    }

    selectedUser == "private" ? navigate("/private") : navigate("/company");
  };

  return (
    <div className="landing-wrapper">
    <div className="overlay"></div>
    <div className="landing-content">
      <h1>Welcome to User Registration Portal</h1>
      <p>Please select your user type to proceed with the registration process.</p>
      <div className="form-box">
        <label htmlFor="userType">Select User Type</label>
        <select
          id="userType"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="" disabled>
            -- Please Select --
          </option>
          <option value="private">Private</option>
          <option value="company">Company</option>
        </select>
        <button onClick={handleSubmitUser}>Submit</button>
      </div>
    </div>
  </div>
  );
};

export default Landing;
