"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type VisualizationData = {
  title: string;
  description: string;
  // Define other properties based on the structure of your data
};

const Home = () => {
  const [data, setData] = useState<VisualizationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data'); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Data Visualization Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {data.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-md">
            {/* Render your data visualization components here */}
            {/* Example: */}
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
