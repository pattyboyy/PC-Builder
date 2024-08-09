import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const componentScores = {
  CPU: {
    // Existing CPUs...
    'AMD Ryzen 3 3300X': { single: 130, multi: 520 },
    'AMD Ryzen 5 3600': { single: 135, multi: 710 },
    'AMD Ryzen 5 5600X': { single: 160, multi: 820 },
    'AMD Ryzen 7 3700X': { single: 140, multi: 870 },
    'AMD Ryzen 7 5800X': { single: 165, multi: 1020 },
    'AMD Ryzen 9 5900X': { single: 170, multi: 1500 },
    'AMD Ryzen 9 5950X': { single: 170, multi: 1700 },
    'Intel Core i3-10100': { single: 125, multi: 465 },
    'Intel Core i3-10300': { single: 130, multi: 480 },
    'Intel Core i5-10400': { single: 135, multi: 720 },
    'Intel Core i5-10600K': { single: 145, multi: 800 },
    'Intel Core i5-11400': { single: 150, multi: 830 },
    'Intel Core i5-11600K': { single: 155, multi: 850 },
    'Intel Core i7-10700K': { single: 150, multi: 1050 },
    'Intel Core i7-11700K': { single: 160, multi: 1100 },
    'Intel Core i9-10900K': { single: 160, multi: 1300 },
    'Intel Core i9-11900K': { single: 165, multi: 1350 },
    'AMD Ryzen 5 5600G': { single: 150, multi: 780 },
    'AMD Ryzen 7 5700G': { single: 155, multi: 950 },
    'AMD Threadripper 3960X': { single: 165, multi: 2400 },
    'Intel Core i5-12600K': { single: 175, multi: 1050 },
    'Intel Core i7-12700K': { single: 185, multi: 1400 },
    'Intel Core i9-12900K': { single: 190, multi: 1700 },
    'AMD Ryzen 7 5800X3D': { single: 160, multi: 1050 },
    'AMD Ryzen 5 7600X': { single: 185, multi: 1100 },
    'AMD Ryzen 7 7700X': { single: 190, multi: 1400 },
    'AMD Ryzen 9 7900X': { single: 195, multi: 1800 },
    'AMD Ryzen 9 7950X': { single: 200, multi: 2100 },
    'Intel Core i5-13600K': { single: 195, multi: 1300 },
    'Intel Core i7-13700K': { single: 205, multi: 1800 },
    'Intel Core i9-13900K': { single: 210, multi: 2300 },
  },
  GPU: {
    // Existing GPUs...
    'NVIDIA GeForce GTX 1650 Super': { '1080': 60, '4K': 15 },
    'NVIDIA GeForce GTX 1660 Super': { '1080': 75, '4K': 20 },
    'NVIDIA GeForce RTX 3060': { '1080': 100, '4K': 40 },
    'NVIDIA GeForce RTX 3060 Ti': { '1080': 120, '4K': 50 },
    'NVIDIA GeForce RTX 3070': { '1080': 140, '4K': 60 },
    'NVIDIA GeForce RTX 3070 Ti': { '1080': 150, '4K': 65 },
    'NVIDIA GeForce RTX 3080': { '1080': 170, '4K': 80 },
    'NVIDIA GeForce RTX 3080 Ti': { '1080': 180, '4K': 85 },
    'NVIDIA GeForce RTX 3090': { '1080': 190, '4K': 90 },
    'AMD Radeon RX 570': { '1080': 50, '4K': 10 },
    'AMD Radeon RX 580': { '1080': 60, '4K': 15 },
    'AMD Radeon RX 5600 XT': { '1080': 90, '4K': 30 },
    'AMD Radeon RX 5700 XT': { '1080': 110, '4K': 45 },
    'AMD Radeon RX 6600': { '1080': 100, '4K': 35 },
    'AMD Radeon RX 6600 XT': { '1080': 120, '4K': 45 },
    'AMD Radeon RX 6700 XT': { '1080': 140, '4K': 55 },
    'AMD Radeon RX 6800': { '1080': 160, '4K': 70 },
    'AMD Radeon RX 6800 XT': { '1080': 180, '4K': 80 },
    'AMD Radeon RX 6900 XT': { '1080': 190, '4K': 85 },
    'NVIDIA GeForce RTX 2060': { '1080': 85, '4K': 25 },
    'NVIDIA GeForce RTX 2070 Super': { '1080': 110, '4K': 40 },
    'NVIDIA GeForce RTX 2080 Ti': { '1080': 140, '4K': 60 },
    'AMD Radeon RX 6500 XT': { '1080': 70, '4K': 20 },
    'NVIDIA GeForce RTX 3050': { '1080': 80, '4K': 25 },
    'NVIDIA GeForce RTX 4070 Ti': { '1080': 200, '4K': 100 },
    'NVIDIA GeForce RTX 4080': { '1080': 220, '4K': 110 },
    'NVIDIA GeForce RTX 4090': { '1080': 240, '4K': 140 },
    'AMD Radeon RX 7900 XT': { '1080': 230, '4K': 120 },
    'AMD Radeon RX 7900 XTX': { '1080': 240, '4K': 130 },
  },
  RAM: {
    '16GB': { bandwidth: 80, capacity: 80 },
    '32GB': { bandwidth: 90, capacity: 100 },
    '64GB': { bandwidth: 100, capacity: 120 },
  },
  Storage: {
    'NVMe SSD': { read: 100, write: 100 },
    'SATA SSD': { read: 60, write: 60 },
    'HDD': { read: 20, write: 20 },
  },
};

const BenchmarkSystem = ({ selectedComponents }) => {
  const [benchmarkScores, setBenchmarkScores] = useState({
    gaming1080p: 0,
    gaming4K: 0,
    productivity: 0,
    overall: 0,
  });

  useEffect(() => {
    const calculateBenchmarks = () => {
      console.log('Selected Components:', JSON.stringify(selectedComponents, null, 2));

      if (Object.keys(selectedComponents).length === 0) {
        console.log('No components selected');
        return;
      }

      const cpu = componentScores.CPU[selectedComponents.CPU] || { single: 0, multi: 0 };
      const gpu = componentScores.GPU[selectedComponents.GPU] || { '1080': 0, '4K': 0 };
      
      // Extract RAM size from the full RAM string
      const ramSize = selectedComponents.RAM?.match(/(\d+)GB/)?.[1] || '16';
      const ram = componentScores.RAM[`${ramSize}GB`] || { bandwidth: 0, capacity: 0 };
      
      console.log('CPU Score:', JSON.stringify(cpu, null, 2));
      console.log('GPU Score:', JSON.stringify(gpu, null, 2));
      console.log('RAM Score:', JSON.stringify(ram, null, 2));

      // Determine storage type and score
      const storageType = selectedComponents.Storage?.includes('NVMe') ? 'NVMe SSD' :
                          selectedComponents.Storage?.includes('SSD') ? 'SATA SSD' : 'HDD';
      const storage = componentScores.Storage[storageType] || { read: 0, write: 0 };

      console.log('Storage Type:', storageType);
      console.log('Storage Score:', JSON.stringify(storage, null, 2));

      // Calculate gaming scores
      const gaming1080p = Math.min(300, (gpu['1080'] * 0.6 + cpu.single * 0.2 + ram.bandwidth * 0.1 + storage.read * 0.1) * (ram.capacity / 100));
      const gaming4K = Math.min(200, (gpu['4K'] * 0.7 + cpu.single * 0.1 + ram.bandwidth * 0.1 + storage.read * 0.1) * (ram.capacity / 100));

      // Calculate productivity score
      const productivity = Math.min(300, (cpu.multi * 0.5 + ram.capacity * 0.2 + storage.write * 0.2 + gpu['1080'] * 0.1) * (ram.capacity / 100));

      // Calculate overall score
      const overall = Math.min(300, (gaming1080p * 0.3 + gaming4K * 0.2 + productivity * 0.5));

      console.log('Calculated Scores:', {
        gaming1080p,
        gaming4K,
        productivity,
        overall
      });

      setBenchmarkScores({
        gaming1080p: Math.round(gaming1080p),
        gaming4K: Math.round(gaming4K),
        productivity: Math.round(productivity),
        overall: Math.round(overall),
      });
    };

    calculateBenchmarks();
  }, [selectedComponents]);

  console.log('Benchmark Scores State:', JSON.stringify(benchmarkScores, null, 2));

  const chartData = [
    { name: 'Gaming 1080p', score: benchmarkScores.gaming1080p },
    { name: 'Gaming 4K', score: benchmarkScores.gaming4K },
    { name: 'Productivity', score: benchmarkScores.productivity },
    { name: 'Overall', score: benchmarkScores.overall },
  ];

  console.log('Chart Data:', JSON.stringify(chartData, null, 2));

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-semibold mb-4">Detailed Benchmark Scores</h2>
      <div className="mb-4">
        <p className="text-sm text-secondary-600 mb-2">
          These scores are estimates based on the selected components. Actual performance may vary depending on specific use cases and optimizations.
        </p>
        <ul className="list-disc list-inside">
          <li>Gaming 1080p: {benchmarkScores.gaming1080p}</li>
          <li>Gaming 4K: {benchmarkScores.gaming4K}</li>
          <li>Productivity: {benchmarkScores.productivity}</li>
          <li>Overall: {benchmarkScores.overall}</li>
        </ul>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 300]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BenchmarkSystem;