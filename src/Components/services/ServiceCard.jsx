

import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, title, price, duration, description, image } = service;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={title} className="w-full h-60 object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p className="font-semibold">Price: ${price}</p>
        <p className="font-medium">Duration: {duration}</p>

        {/* ⭐ Service Details Button */}
        <div className="mt-4">
          <Link to={`/services/${_id}`}>
            <button className="btn btn-primary w-full">
              Service Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
