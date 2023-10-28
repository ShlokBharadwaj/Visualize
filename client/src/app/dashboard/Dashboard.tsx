'use client'

import React, { useState } from 'react';

interface IData {
  end_year: string | number;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string | number;
  impact: number | number;
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
