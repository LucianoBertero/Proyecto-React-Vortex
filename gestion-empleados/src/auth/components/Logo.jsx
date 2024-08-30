import React, { useEffect, useState } from "react";

const Logo = () => {
  const [showDot, setShowDot] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDot((prev) => !prev);
    }, 1000); // Cambia el tiempo según tus necesidades (1000ms = 1s)

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        src="/assets/LOGO-VORTEX-PNG_4x-230x35notdot.png"
        alt="Vortex"
        style={{
          height: "80px",
          width: "auto",
        }}
      />
      <span
        style={{
          display: "inline-block",
          backgroundColor: "white",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          visibility: showDot ? "visible" : "hidden",
          marginLeft: "10px",
          marginTop: "60px",
        }}
      ></span>
    </div>
  );
};

export default Logo;
