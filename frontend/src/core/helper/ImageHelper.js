import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://pngfree.io/upload/cache/upload/imgs/homepngwing/free-png-baaoe-f350x360.png`;

  return (
    <div className="rounded border border-warning p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-2 rounded"
      />
    </div>
  );
};

export default ImageHelper;
