import React, { useEffect } from 'react';
import axios from 'axios';

function Main() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          axios.post("http://localhost:5000/api/location", {
            latitude,
            longitude
          }).then((res) => {
            console.log("✅ Location stored:", res.data);
          }).catch((err) => {
            console.error("❌ Error storing location:", err);
          });
        },
        (error) => {
          console.error("❌ Permission denied or error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return <h1>📍 Fetching and storing your location...</h1>;
}

export default Main;
