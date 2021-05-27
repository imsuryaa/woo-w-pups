import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import ServiceCard from "./ServiceCard";
import { getServices } from "../admin/helper/adminapicall";

export default function ServicePage() {
  // fetching products from backend and initially it will be an empty array
  const [services, setServices] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getServices().then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setServices(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base>
      <br />
      <h1 className="text-white text-center">
        Looking for pet sitter? Checkout these profiles below...!
      </h1>
      <br />
      <div className="row text-center">
          {services?.map((service, index) => {
            return (
              <div key={index} className="col-md-3">
                <ServiceCard service={service} />
              </div>
            );
          })}
      </div>
    </Base>
  );
}
