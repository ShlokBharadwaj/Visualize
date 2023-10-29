'use client'

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import Header from '../components/Header/Header';
import SideMenu from '../components/SideMenu/SideMenu';

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
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex bg-gray-100">
          <SideMenu />
        </div>
        <div className="w-full overflow-y-auto p-4">
          {/* Main Content */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-red-300 p-60 rounded-md">Main Data Visualization</div>
            <div className="bg-green-300 p-4 rounded-md">Data Visualization 1</div>
            <div className="bg-yellow-300 p-4 rounded-md">Data Visualization 2</div>
            <div className="bg-purple-300 p-4 rounded-md">Data Visualization 3</div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="bg-yellow-300 p-60 rounded-md">Data Visualization 4</div>
            <div className="bg-blue-300 p-4 rounded-md">Data Visualization 5</div>
            <div className="bg-indigo-300 p-4 rounded-md">Data Visualization 6</div>
            <div className="bg-pink-300 p-10 rounded-md">Data Visualization 7</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
