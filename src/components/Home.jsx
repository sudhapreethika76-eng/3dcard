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

  const handleMouseMove = (e) => {
    const scene = e.currentTarget;
    const rect = scene.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Compute tilt angles (up to 15 degrees max tilt)
    const tiltX = -py * 16;
    const tiltY = px * 16;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
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
                  <span className="price-amount">$39</span>
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

              {/* Action Button */}
              <button className="choose-btn-centered">Choose Date</button>
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
                  <span className="price-amount">$29</span>
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

              {/* Action Button */}
              <button className="choose-btn-centered">Choose Date</button>
            </div>

            {/* Bottom-right 3D Mossy Forest Rock Accent */}
            <div className="rock-container rock-camping">
              <img src={rockCampingImg} className="rock-img" alt="Mossy Rock Accent" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
