import React, { useEffect, useState } from "react";
import { removeUserData, useAuth } from "../Context/loginauth";
import { useNavigate } from "react-router-dom";
import dashboard from "../Components/dashboard.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dashboardData } from "../Services/action";

const Dashboard = () => {
  const { removeUserData } = useAuth();
  const [card, setCard] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const apierror = useSelector((state) => state.auth.carddata);

  const handleLogout = () => {
    removeUserData();
    navigate("/");
  };

  let today = new Date();
  let a = new Date();
  let month = today.toLocaleString([], { month: "long" });
  let date = ("0" + a.getDate()).slice(-2);

  const dispatch = useDispatch();

  const fetchdata = async () => {
    dispatch(dashboardData());
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSeeMore = (index) => {
    setSelectedCard(index);
  };

  console.log("selectedCard === index", selectedCard);
  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: "calc(100vh - 300px)",
        padding: "20px",
      }}
    >
      <div style={{ position: "absolute", top: "5%", right: "40%" }}>
        Welcome to the Dashboard
      </div>
      <div style={{ position: "absolute", top: "2%", right: "2%" }}>
        <button
          className="logout-button"
          onClick={handleLogout}
          style={{ backgroundColor: "red" }}
        >
          Logout
        </button>
      </div>

      <div
        className="loader"
        style={{ position: "absolute", top: 18, right: "54%" }}
      >
        <div className="song"></div>
        <div className="loading">
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
        </div>
      </div>

      <div style={{ position: "absolute", top: "5%", right: "82%" }}>
        <input
          type="text"
          placeholder="Search cards   title..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="horizantalline"></div>
      <div className="cardHeader">
        {apierror?.length > 0 ? (
          apierror
            .filter((item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, index) => {
              return (
                <div className="parent" key={index}>
                  <div className="card">
                    <div className="content-box">
                      <span className="card-title">Card</span>
                      <p className="card-content"><span style={{ fontWeight: "bold", color: "red", marginRight: 5 }}>Title:</span>{item.title}</p>
                      <span className="see-more" onClick={() => handleSeeMore(index)}> See More</span>
                    </div>
                    <div className="date-box">
                      <span className="month">{month}</span>
                      <span className="date">{date}</span>
                    </div>
                  </div>
                  {selectedCard === index && (
                    <div className="full-card">
                      <p>{item.title}</p>
                    </div>
                  )}
                </div>
              );
            })
        ) : (
          <p>No data available</p>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
