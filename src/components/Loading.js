import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <Spinner animation="grow" /> <h3>Loading...</h3>
    </>
  );
}
