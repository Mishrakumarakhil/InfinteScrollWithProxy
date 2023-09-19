import React from "react";

const Card = ({ data, loading }) => {
  return (
    <>
      <h1>Infinite Scroll</h1>
      <div className="data-list">
        {data.map((data) => (
          <div className="data" key={data.node.nid}>
            <div className="left">
              <img
                src={data.node.field_photo_image_section}
                alt={data.node.title}
              />
            </div>
            <div className="right">
              <p>{data.node.title}</p>
              <p>Last Update: {data.node.last_update}</p>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default Card;
