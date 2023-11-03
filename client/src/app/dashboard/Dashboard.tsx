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
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      createBarChart(data);
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

  const createBarChart = (data: IData[]) => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.intensity.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity) || 0])
      .range([height, 0]);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.intensity.toString()) || 0)
      .attr('y', d => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.intensity))
      .attr('fill', 'steelblue');

    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.intensity)
      .attr('x', d => x(d.intensity.toString()) || 0)
      .attr('y', d => y(d.intensity) - 4)
      .attr('font-size', '10px');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex bg-gray-100">
          <SideMenu />
        </div>
        <div className="w-full overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div ref={chartRef} className="bg-red-300 md:p-10 p-4 rounded-md">Main Data Visualization</div>
            <div className="bg-green-300 md:p-60 p-28 rounded-md">Data Visualization 1</div>
            <div className="bg-yellow-300 p-10 rounded-md">Data Visualization 2</div>
            <div className="bg-purple-300 p-10 rounded-md">Data Visualization 3</div>
            <div className="bg-yellow-300 md:p-60 p-28 rounded-md">Data Visualization 4</div>
            <div className="bg-blue-300 md:p-60 p-28 rounded-md">Data Visualization 5</div>
            <div className="bg-indigo-300 p-20 md:p-10 rounded-md">Data Visualization 6</div>
            <div className="bg-pink-300 p-20 md:p-10 rounded-md">Data Visualization 7</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
