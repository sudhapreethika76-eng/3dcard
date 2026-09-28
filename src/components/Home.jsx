import React, { useState } from "react";
import "../assets/style/style.css";
import seaImg from "../assets/images/sea.png";
import grassImg from "../assets/images/grass.png";
import kayakImg from "../assets/images/kayak.png";
import splashImg from "../assets/images/water-splash.png";
import rockKayakImg from "../assets/images/rock-kayak.png";
import tentImg from "../assets/images/tent.png";
import foliageImg from "../assets/images/forest-pine.png";
import rockCampingImg from "../assets/images/rock-camping.png";

export default function Home() {
  const [isCamping, setIsCamping] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Booking states for Kayaking and Camping
  const [kayakBooking, setKayakBooking] = useState({ isBooked: false, date: "" });
  const [campingBooking, setCampingBooking] = useState({ isBooked: false, date: "" });

  // Date Modal state: null | 'kayaking' | 'camping'
  const [modalActivity, setModalActivity] = useState(null);
  const [pickerDate, setPickerDate] = useState("");

  const handleMouseMove = (e) => {
    // Disable tilt while date modal is open
    if (modalActivity) return;
    const scene = e.currentTarget;
    const rect = scene.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Compute tilt angles (up to 16 degrees max tilt)
    const tiltX = -py * 16;
    const tiltY = px * 16;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getTodayString = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const getOffsetDateString = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  const getNextSaturdayString = () => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
    d.setDate(d.getDate() + daysUntilSaturday);
    return d.toISOString().split("T")[0];
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const openDatePicker = (activity) => {
    const current = activity === "kayaking" ? kayakBooking : campingBooking;
    setModalActivity(activity);
    setPickerDate(current.isBooked && current.date ? current.date : getOffsetDateString(1));
    setTilt({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setModalActivity(null);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!pickerDate) return;
    if (modalActivity === "kayaking") {
      setKayakBooking({ isBooked: true, date: pickerDate });
    } else if (modalActivity === "camping") {
      setCampingBooking({ isBooked: true, date: pickerDate });
    }
    setModalActivity(null);
  };

  const handleCancelBooking = () => {
    if (modalActivity === "kayaking") {
      setKayakBooking({ isBooked: false, date: "" });
    } else if (modalActivity === "camping") {
      setCampingBooking({ isBooked: false, date: "" });
    }
    setModalActivity(null);
  };

  const calculateTotal = () => {
    let total = 0;
    if (kayakBooking.isBooked) total += 3299;
    if (campingBooking.isBooked) total += 2499;
    return total.toLocaleString("en-IN");
  };

  const cardStyle = {
    transform: isCamping
      ? `rotateY(${180 - tilt.y}deg) rotateX(${-tilt.x}deg)`
      : `rotateY(${tilt.y}deg) rotateX(${tilt.x}deg)`,
    transition: tilt.x === 0 && tilt.y === 0
      ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
      : "transform 0.1s ease-out"
  };

  return (
    <div className="page">
      {/* Toggle Selector */}
      <div className="toggle-wrapper">
        <div className="toggle" role="tablist" aria-label="Activity selector">
          <button
            className={`toggle-pill ${!isCamping ? "active" : ""}`}
            onClick={() => setIsCamping(false)}
            role="tab"
            aria-selected={!isCamping}
          >
            Kayaking
          </button>
          <button
            className={`toggle-pill ${isCamping ? "active" : ""}`}
            onClick={() => setIsCamping(true)}
            role="tab"
            aria-selected={isCamping}
          >
            Camping
          </button>
        </div>
      </div>

      {/* Main Content Area containing Card and Right Sidebar */}
      <div className="content-container">
        {/* 3D Scene */}
        <div
          className="scene"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`card-wrapper ${isCamping ? "flipped" : ""}`}
            style={cardStyle}
          >
            
            {/* FRONT — Kayaking Card */}
            <div className="card card-front">
              {/* Organic Sea Water Header Texture */}
              <div className="card-visual-header header-kayak">
                <div className="header-texture-container">
                  <img src={seaImg} className="header-texture-img sea-texture" alt="Sea Water Surface" />
                </div>
                {/* Dynamic Water Splash Burst (Top-Right) */}
                <div className="splash-container-3d">
                  <img src={splashImg} className="splash-img" alt="Water Splash" />
                </div>
              </div>

              {/* 3D Pop-Out Yellow Kayak (Top-Left) */}
              <div className="kayak-wrapper-3d">
                <img src={kayakImg} className="kayak-img" alt="Touring Kayak" />
              </div>

              {/* Card Content & Details */}
              <div className="card-content">
                {/* Centered Title with Blue Glow */}
                <div className="card-header-centered">
                  <div className="title-glow-blue"></div>
                  <h2 className="card-title-centered">Kayaking</h2>
                </div>

                {/* Centered Price Block */}
                <div className="card-price-block-centered">
                  <div className="price-main">
                    <span className="price-amount">₹3,299</span>
                    <span className="price-separator">/</span>
                    <span className="price-unit">4hrs</span>
                  </div>
                  <div className="price-subtitle">per person</div>
                </div>

                {/* Location */}
                <div className="card-location-centered">
                  <svg className="location-pin-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div className="location-text">Drina, Serbia</div>
                </div>

                {/* Action / Booking Button */}
                {kayakBooking.isBooked ? (
                  <div className="booking-status-container">
                    <div className="booked-chip">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Booked: {formatDate(kayakBooking.date)}</span>
                    </div>
                    <button className="choose-btn-centered booked-btn" onClick={() => openDatePicker("kayaking")}>
                      Manage Booking
                    </button>
                  </div>
                ) : (
                  <button className="choose-btn-centered" onClick={() => openDatePicker("kayaking")}>
                    Choose Date
                  </button>
                )}
              </div>

              {/* Bottom-right 3D River Rock Accent */}
              <div className="rock-container rock-kayak">
                <img src={rockKayakImg} className="rock-img" alt="River Rock Accent" />
              </div>
            </div>

            {/* BACK — Camping Card */}
            <div className="card card-back">
              {/* Organic Grass Terrain Header Texture */}
              <div className="card-visual-header header-camping">
                <div className="header-texture-container">
                  <img src={grassImg} className="header-texture-img grass-texture" alt="Grass Terrain" />
                </div>
                {/* Dynamic Pine Foliage Burst (Top-Right) */}
                <div className="foliage-container-3d">
                  <img src={foliageImg} className="foliage-img" alt="Pine Foliage" />
                </div>
              </div>

              {/* 3D Pop-Out Camping Tent (Top-Left) */}
              <div className="tent-container-3d">
                <img src={tentImg} className="tent-img" alt="Camping Tent" />
              </div>

              {/* Card Content & Details */}
              <div className="card-content">
                {/* Centered Title with Green Glow */}
                <div className="card-header-centered">
                  <div className="title-glow-green"></div>
                  <h2 className="card-title-centered">Camping</h2>
                </div>

                {/* Centered Price Block */}
                <div className="card-price-block-centered">
                  <div className="price-main">
                    <span className="price-amount">₹2,499</span>
                    <span className="price-separator">/</span>
                    <span className="price-unit">8hrs</span>
                  </div>
                  <div className="price-subtitle">per person</div>
                </div>

                {/* Location */}
                <div className="card-location-centered">
                  <svg className="location-pin-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div className="location-text">Tara, Serbia</div>
                </div>

                {/* Action / Booking Button */}
                {campingBooking.isBooked ? (
                  <div className="booking-status-container">
                    <div className="booked-chip">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Booked: {formatDate(campingBooking.date)}</span>
                    </div>
                    <button className="choose-btn-centered booked-btn" onClick={() => openDatePicker("camping")}>
                      Manage Booking
                    </button>
                  </div>
                ) : (
                  <button className="choose-btn-centered" onClick={() => openDatePicker("camping")}>
                    Choose Date
                  </button>
                )}
              </div>

              {/* Bottom-right 3D Mossy Forest Rock Accent */}
              <div className="rock-container rock-camping">
                <img src={rockCampingImg} className="rock-img" alt="Mossy Rock Accent" />
              </div>
            </div>

          </div>
        </div>

        {/* Right-Side Simple Booking Details Panel */}
        <div className="booking-sidebar-right">
          <div className="sidebar-header">
            <svg className="sidebar-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <h3 className="sidebar-title">Booking Details</h3>
          </div>

          <div className="sidebar-body">
            {/* Kayaking Item */}
            <div
              className={`sidebar-item ${!isCamping ? "active-activity" : ""}`}
              onClick={() => setIsCamping(false)}
            >
              <div className="item-top">
                <span className="item-name">🚣‍♂️ Kayaking</span>
                <span className="item-price">₹3,299</span>
              </div>
              <div className="item-bottom">
                {kayakBooking.isBooked ? (
                  <div className="booked-info">
                    <span className="booked-date">✓ {formatDate(kayakBooking.date)}</span>
                    <button
                      className="mini-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCamping(false);
                        openDatePicker("kayaking");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="unbooked-info">
                    <span className="unbooked-text">Not Booked</span>
                    <button
                      className="mini-btn book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCamping(false);
                        openDatePicker("kayaking");
                      }}
                    >
                      Choose Date
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Camping Item */}
            <div
              className={`sidebar-item ${isCamping ? "active-activity" : ""}`}
              onClick={() => setIsCamping(true)}
            >
              <div className="item-top">
                <span className="item-name">🏕️ Camping</span>
                <span className="item-price">₹2,499</span>
              </div>
              <div className="item-bottom">
                {campingBooking.isBooked ? (
                  <div className="booked-info">
                    <span className="booked-date">✓ {formatDate(campingBooking.date)}</span>
                    <button
                      className="mini-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCamping(true);
                        openDatePicker("camping");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="unbooked-info">
                    <span className="unbooked-text">Not Booked</span>
                    <button
                      className="mini-btn book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCamping(true);
                        openDatePicker("camping");
                      }}
                    >
                      Choose Date
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Total */}
          <div className="sidebar-footer">
            <div className="total-row">
              <span className="total-label">Total Payable</span>
              <span className="total-amount">₹{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Modal Overlay */}
      {modalActivity && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="date-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              ✕
            </button>
            <div className="modal-header">
              <div className={`modal-badge ${modalActivity}`}>
                {modalActivity === "kayaking" ? "🚣‍♂️ Kayaking" : "🏕️ Camping"}
              </div>
              <h3 className="modal-title">Select Booking Date</h3>
              <p className="modal-subtitle">
                {modalActivity === "kayaking" ? "Drina, Serbia • ₹3,299 per person" : "Tara, Serbia • ₹2,499 per person"}
              </p>
            </div>

            <form onSubmit={handleConfirmBooking} className="modal-body">
              <label className="date-input-label" htmlFor="booking-date">Choose Date</label>
              <input
                id="booking-date"
                type="date"
                min={getTodayString()}
                value={pickerDate}
                onChange={(e) => setPickerDate(e.target.value)}
                className="date-input"
                required
              />

              <div className="quick-date-chips">
                <button
                  type="button"
                  className={`chip ${pickerDate === getOffsetDateString(1) ? "active" : ""}`}
                  onClick={() => setPickerDate(getOffsetDateString(1))}
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  className={`chip ${pickerDate === getNextSaturdayString() ? "active" : ""}`}
                  onClick={() => setPickerDate(getNextSaturdayString())}
                >
                  This Saturday
                </button>
                <button
                  type="button"
                  className={`chip ${pickerDate === getOffsetDateString(7) ? "active" : ""}`}
                  onClick={() => setPickerDate(getOffsetDateString(7))}
                >
                  In 1 Week
                </button>
              </div>

              <div className="modal-actions">
                <button type="submit" className="confirm-booking-btn">
                  Confirm Booking
                </button>
                {(modalActivity === "kayaking" ? kayakBooking.isBooked : campingBooking.isBooked) && (
                  <button
                    type="button"
                    className="cancel-booking-btn"
                    onClick={handleCancelBooking}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


