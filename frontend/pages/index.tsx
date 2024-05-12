import React from "react";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/test/")
      .then((res) => res.json())
      .then((data) => setData(data.data));
  });
  return (
    <div>
      <h1>An Awesome Blog </h1>
      <h3>On Django, React, Postgres, and Docker </h3>

      <p>{data}</p>
    </div>
  );
};

export default HomePage;
