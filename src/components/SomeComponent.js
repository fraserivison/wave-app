// src/components/SomeComponent.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/fetchData'; // Import the fetchData function

const SomeComponent = () => {
  const [data, setData] = useState(null);  // State to hold the fetched data
  const [loading, setLoading] = useState(true); // Optional: to manage loading state
  const [error, setError] = useState(null);   // Optional: to manage error state

  useEffect(() => {
    // Call fetchData when the component mounts
    fetchData()
      .then(fetchedData => {
        setData(fetchedData);   // Update the state with fetched data
        setLoading(false);       // Set loading to false once data is fetched
      })
      .catch(err => {
        setError(err);           // Handle error if fetching fails
        setLoading(false);       // Set loading to false even if there's an error
      });
  }, []); // Empty dependency array ensures this runs once after the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>; // Display error message if something went wrong
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the fetched data */}
    </div>
  );
};

export default SomeComponent;
