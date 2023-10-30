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
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = chartRef.current?.clientWidth || 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map((d, i) => String(i)))
      .padding(0.2);
    const y = d3.scaleLinear().range([height, 0]);

    const formattedData: [number, number][] = data.map((d, i) => [
      i,
      d.intensity as number,
    ]);

    y.domain(d3.extent(formattedData, (d) => d[1]) as [number, number]);

    const valueline = d3.line<[number, number]>()
      .x((d) => x(String(d[0])) || 0)
      .y((d) => y(d[1]));

    svg
      .append('path')
      .datum(formattedData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', valueline)
      .attr('transform', `translate(${x.bandwidth() / 2},0)`);

    svg
      .append('text')
      .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
      .attr('stroke', 'steelblue')
      .style('text-anchor', 'middle')
      .text('Likelihood');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('stroke', 'steelblue')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Intensity');
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
