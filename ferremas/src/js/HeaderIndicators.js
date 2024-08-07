import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HeaderIndicators.css';

const HeaderIndicators = () => {
  const [indicators, setIndicators] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/indicators');
        setIndicators(response.data);
      } catch (error) {
        console.error('Error fetching indicators:', error);
        setError('Error fetching indicators');
      }
    };

    fetchIndicators();
  }, []);

  return (
    <div className="header-indicators-container">
      {Object.keys(indicators).length > 0 ? (
        <div className="header-indicators">
          <p>UF: {indicators.uf.toLocaleString()} CLP</p>
          <p>Dólar: {indicators.dolar.toLocaleString()} CLP</p>
          <p>Euro: {indicators.euro.toLocaleString()} CLP</p>
          <p>UTM: {indicators.utm.toLocaleString()} CLP</p>
        </div>
      ) : (
        <div className="header-indicators"><p className="loading">Loading...</p></div>
      )}
      {error && <div className="header-indicators"><p>{error}</p></div>}
    </div>
  );
};

export default HeaderIndicators;
