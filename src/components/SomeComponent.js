// src/components/SomeComponent.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/fetchData';

const SomeComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call fetchData when the component mounts
    fetchData()
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);      
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the fetched data */}
    </div>
  );
};

export default SomeComponent;
