import React from "react";

export default function Disclaimer() {
  const styles = {
    container: {
      backgroundColor: "#222",
      color: "white",
      textAlign: "center",
      padding: "12px 20px",
      fontSize: "20px",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      Disclaimer: This is an Amazon clone project built for learning and educational purposes only.
    </div>
  );
}
