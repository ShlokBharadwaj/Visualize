'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IData {
  end_year: string | number;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string | number;
  impact: string | number;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<IData[]>('http://localhost:3001/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
