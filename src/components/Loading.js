import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "75vh",
          gap: "20px",
        }}
      >
        <Spinner animation="border" variant="dark" size="sm" />
        <span>Loading...</span>
      </div>
    </>
  );
}
