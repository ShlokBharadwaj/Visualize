'use client'

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

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
  const chartRef = useRef(null);
  const isChartCreated = useRef(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length && !isChartCreated.current) {
      createLineChart(data);
      isChartCreated.current = true;
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get<IData[]>('http://localhost:3001/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createLineChart = (data: IData[]) => {
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', 400)
      .attr('height', 200);

    const line = d3.line<IData>()
      .x((d, i) => i * 40)
      .y((d) => 200 - 10 * (d.intensity as number));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('d', line);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white text-gray-800 shadow-md p-4">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </header>
      <div ref={chartRef} id="lineChart" className="mt-8 mx-4"></div>
    </div>
  );
};

export default Dashboard;
