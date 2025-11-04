import React from 'react';
import { Link } from 'react-router-dom';

const QuickNavigationCard = ({ title, description, link }) => {
  return (
    <Link to={link} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default QuickNavigationCard;
