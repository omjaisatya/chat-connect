import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">Logout</h3>
              <p className="card-text">
                The logout feature is being implemented and will be available
                soon. Please check back later.
              </p>
              <button
                onClick={handleBackToHome}
                className="btn btn-primary w-100"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
