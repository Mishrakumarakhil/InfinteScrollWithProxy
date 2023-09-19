import React from 'react'

const  Card=({data,loading})=> {

     return (
    <div>
      <h1>Infinite Scroll</h1>
      <div className="data-list">
        {data.map((data) => (
          <div className="data.node" key={data.node.nid}>
            <img src={data.node.field_photo_image_section} alt={data.node.title} />
            <p>{data.node.title}</p>
            <p>Author: {data.node.author_name}</p>
            <p>Last Update: {data.node.last_update}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
  
    </div>
  );
}

export default  Card