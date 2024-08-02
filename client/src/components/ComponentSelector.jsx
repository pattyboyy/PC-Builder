// src/components/ComponentSelector.jsx
import React, { useState } from 'react';
import PriceHistory from './PriceHistory';

const components = {
  CPU: [
    'AMD Ryzen 3 3300X',
    'AMD Ryzen 5 3600',
    'AMD Ryzen 5 5600X',
    'AMD Ryzen 7 3700X',
    'AMD Ryzen 7 5800X',
    'AMD Ryzen 9 5900X',
    'AMD Ryzen 9 5950X',
    'Intel Core i3-10100',
    'Intel Core i3-10300',
    'Intel Core i5-10400',
    'Intel Core i5-10600K',
    'Intel Core i5-11400',
    'Intel Core i5-11600K',
    'Intel Core i7-10700K',
    'Intel Core i7-11700K',
    'Intel Core i9-10900K',
    'Intel Core i9-11900K',
    'AMD Ryzen 5 5600G',
    'AMD Ryzen 7 5700G',
    'AMD Threadripper 3960X',
    'Intel Core i5-12600K',
    'Intel Core i7-12700K',
    'Intel Core i9-12900K',
    'AMD Ryzen 7 5800X3D',
    'AMD Ryzen 5 7600X',
    'AMD Ryzen 7 7700X',
    'AMD Ryzen 9 7900X',
    'AMD Ryzen 9 7950X',
    'Intel Core i5-13600K',
    'Intel Core i7-13700K',
    'Intel Core i9-13900K'
  ],
  GPU: [
    'NVIDIA GeForce GTX 1650 Super',
    'NVIDIA GeForce GTX 1660 Super',
    'NVIDIA GeForce RTX 3060',
    'NVIDIA GeForce RTX 3060 Ti',
    'NVIDIA GeForce RTX 3070',
    'NVIDIA GeForce RTX 3070 Ti',
    'NVIDIA GeForce RTX 3080',
    'NVIDIA GeForce RTX 3080 Ti',
    'NVIDIA GeForce RTX 3090',
    'AMD Radeon RX 570',
    'AMD Radeon RX 580',
    'AMD Radeon RX 5600 XT',
    'AMD Radeon RX 5700 XT',
    'AMD Radeon RX 6600',
    'AMD Radeon RX 6600 XT',
    'AMD Radeon RX 6700 XT',
    'AMD Radeon RX 6800',
    'AMD Radeon RX 6800 XT',
    'AMD Radeon RX 6900 XT',
    'NVIDIA GeForce RTX 2060',
    'NVIDIA GeForce RTX 2070 Super',
    'NVIDIA GeForce RTX 2080 Ti',
    'AMD Radeon RX 6500 XT',
    'NVIDIA GeForce RTX 3050',
    'NVIDIA GeForce RTX 4070 Ti',
    'NVIDIA GeForce RTX 4080',
    'NVIDIA GeForce RTX 4090',
    'AMD Radeon RX 7900 XT',
    'AMD Radeon RX 7900 XTX'
  ],
  RAM: [
    'Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200',
    'G.Skill Ripjaws V 16GB (2x8GB) DDR4-3600',
    'Crucial Ballistix 32GB (2x16GB) DDR4-3600',
    'Kingston HyperX Fury 16GB (2x8GB) DDR4-3200',
    'Patriot Viper Steel 32GB (2x16GB) DDR4-3200',
    'Team T-Force Delta RGB 16GB (2x8GB) DDR4-3200',
    'Corsair Dominator Platinum RGB 32GB (2x16GB) DDR4-3200',
    'G.Skill Trident Z Neo 32GB (2x16GB) DDR4-3600',
    'Crucial Ballistix MAX 64GB (2x32GB) DDR4-4000',
    'Kingston HyperX Predator 64GB (4x16GB) DDR4-3600',
    'Corsair Vengeance RGB Pro 32GB (4x8GB) DDR4-3600',
    'G.Skill Ripjaws V 64GB (2x32GB) DDR4-3600',
    'Patriot Viper 4 Blackout 16GB (2x8GB) DDR4-3600',
    'Team T-Force Xtreem ARGB 16GB (2x8GB) DDR4-3600',
    'Crucial Ballistix Elite 32GB (4x8GB) DDR4-4000',
    'Corsair Vengeance LPX 64GB (2x32GB) DDR4-3200',
    'G.Skill Trident Z Royal 32GB (2x16GB) DDR4-4000',
    'Kingston HyperX Fury RGB 32GB (2x16GB) DDR4-3466',
    'Patriot Viper Steel 16GB (2x8GB) DDR4-4400',
    'Team T-Force Dark Pro 32GB (2x16GB) DDR4-3200',
    'Corsair Vengeance RGB Pro SL 32GB (2x16GB) DDR4-3600',
    'G.Skill Flare X 16GB (2x8GB) DDR4-3200',
    'Crucial Ballistix RGB 32GB (2x16GB) DDR4-3600',
    'ADATA XPG Spectrix D60G 32GB (2x16GB) DDR4-3600',
    'Corsair Vengeance DDR5 32GB (2x16GB) DDR5-5200',
    'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6000'
  ],
  Storage: [
    'Samsung 970 EVO Plus 1TB NVMe SSD',
    'Western Digital Black SN750 1TB NVMe SSD',
    'Crucial P5 1TB NVMe SSD',
    'Sabrent Rocket Q 2TB NVMe SSD',
    'Samsung 870 EVO 1TB SATA SSD',
    'Crucial MX500 2TB SATA SSD',
    'Western Digital Blue 4TB HDD',
    'Seagate Barracuda 2TB HDD',
    'Intel 660p 1TB NVMe SSD',
    'ADATA XPG SX8200 Pro 1TB NVMe SSD',
    'Corsair MP600 1TB NVMe SSD',
    'Toshiba X300 4TB HDD',
    'Samsung 980 Pro 500GB NVMe SSD',
    'Western Digital Black 6TB HDD',
    'Crucial P2 500GB NVMe SSD',
    'Seagate FireCuda 520 1TB NVMe SSD',
    'Samsung 870 QVO 4TB SATA SSD',
    'Western Digital Red Plus 4TB NAS HDD',
    'Intel Optane 905P 480GB NVMe SSD',
    'Sabrent Rocket 4 Plus 2TB NVMe SSD',
    'Crucial X8 1TB Portable SSD',
    'Seagate IronWolf Pro 8TB NAS HDD',
    'Kingston A2000 1TB NVMe SSD',
    'Western Digital Blue SN550 1TB NVMe SSD',
    'Samsung 990 Pro 1TB NVMe SSD',
    'Seagate FireCuda 530 2TB NVMe SSD'
  ],
  Motherboard: [
    'ASUS ROG Strix B550-F Gaming (WiFi)',
    'MSI MPG B550 Gaming Edge WiFi',
    'Gigabyte X570 AORUS Elite',
    'ASRock B450M PRO4',
    'ASUS TUF Gaming X570-Plus (WiFi)',
    'MSI MAG B550 Tomahawk',
    'Gigabyte B550 AORUS Pro AC',
    'ASRock X570 Phantom Gaming 4',
    'ASUS Prime Z490-A',
    'MSI MEG Z490 Ace',
    'Gigabyte Z490 AORUS Ultra',
    'ASRock Z490 Taichi',
    'ASUS ROG Maximus XII Hero (WiFi)',
    'MSI MPG Z490 Gaming Carbon WiFi',
    'Gigabyte B460M DS3H',
    'ASRock H470 Steel Legend',
    'ASUS ROG Strix Z590-E Gaming WiFi',
    'MSI MPG Z590 Gaming Edge WiFi',
    'Gigabyte Z590 AORUS Pro AX',
    'ASRock Z590 Extreme',
    'ASUS ProArt Z490-Creator 10G',
    'MSI MEG X570 Unify',
    'Gigabyte X570 I AORUS Pro WiFi',
    'ASRock B550 Phantom Gaming-ITX/ax',
    'ASUS ROG Crosshair VIII Dark Hero',
    'MSI MAG X570S Tomahawk Max WiFi',
    'Gigabyte Z690 AORUS Master',
    'ASRock Z690 Taichi',
    'ASUS ROG Maximus Z690 Hero'
  ],
  PowerSupply: [
    'Corsair RM750x 750W 80+ Gold',
    'EVGA SuperNOVA G3 650W 80+ Gold',
    'Seasonic Focus GX-650 650W 80+ Gold',
    'be quiet! Straight Power 11 750W 80+ Platinum',
    'Thermaltake Toughpower GF1 750W 80+ Gold',
    'Cooler Master MWE Gold 650W 80+ Gold',
    'NZXT C650 650W 80+ Gold',
    'Phanteks AMP 650W 80+ Gold',
    'Silverstone SX600-G 600W SFX 80+ Gold',
    'FSP Dagger Pro 650W SFX 80+ Gold',
    'Corsair SF600 600W SFX 80+ Platinum',
    'EVGA SuperNOVA 550 GM 550W SFX 80+ Gold',
    'Seasonic FOCUS SGX-650 650W SFX-L 80+ Gold',
    'be quiet! Dark Power Pro 12 1200W 80+ Titanium',
    'Thermaltake Toughpower PF1 850W 80+ Platinum',
    'Cooler Master V850 SFX Gold 850W 80+ Gold',
    'NZXT E650 650W 80+ Gold Digital',
    'Phanteks Revolt X 1000W 80+ Platinum',
    'Silverstone NJ600 600W 80+ Titanium Fanless',
    'FSP Hydro PTM Pro 1000W 80+ Platinum',
    'Corsair AX1600i 1600W 80+ Titanium Digital',
    'EVGA SuperNOVA 1000 T2 1000W 80+ Titanium',
    'Seasonic PRIME TX-1000 1000W 80+ Titanium',
    'be quiet! Pure Power 11 FM 750W 80+ Gold',
    'Corsair RM850x 850W 80+ Gold',
    'Thermaltake Toughpower GF3 1000W 80+ Gold'
  ],
  Case: [
    'NZXT H510',
    'Fractal Design Meshify C',
    'Corsair 4000D Airflow',
    'Phanteks Eclipse P300A',
    'Lian Li PC-O11 Dynamic',
    'be quiet! Pure Base 500DX',
    'Cooler Master MasterBox NR600',
    'Thermaltake Core V1',
    'NZXT H210',
    'Fractal Design Define 7 Compact',
    'Corsair 275R Airflow',
    'Phanteks Enthoo Pro M TG',
    'Lian Li Lancool II Mesh',
    'be quiet! Silent Base 802',
    'Cooler Master HAF X',
    'Thermaltake View 71 TG RGB',
    'NZXT H710i',
    'Fractal Design Torrent',
    'Corsair 5000D Airflow',
    'Phanteks Enthoo Evolv X',
    'Lian Li O11 Dynamic XL',
    'be quiet! Dark Base Pro 900',
    'Cooler Master Cosmos C700M',
    'Thermaltake Level 20 HT',
    'NZXT H7 Flow',
    'Fractal Design Pop Air'
  ],
  Cooling: [
    'Noctua NH-D15',
    'be quiet! Dark Rock Pro 4',
    'Scythe Mugen 5 Rev.B',
    'Cooler Master Hyper 212 EVO',
    'Arctic Freezer 34 eSports DUO',
    'Cryorig H7 Quad Lumi',
    'Thermaltake Floe Riing RGB 360 TT Premium Edition',
    'NZXT Kraken X53 240mm',
    'Corsair H100i RGB Platinum 240mm',
    'Arctic Liquid Freezer II 280',
    'Noctua NH-U12S',
    'be quiet! Pure Rock 2',
    'Scythe Fuma 2',
    'Cooler Master MasterLiquid ML240R RGB',
    'Arctic Freezer 50',
    'Cryorig C7',
    'Thermaltake UX100 ARGB',
    'NZXT Kraken Z73 360mm',
    'Corsair iCUE H150i Elite Capellix 360mm',
    'Arctic Liquid Freezer II 420',
    'Noctua NH-L9i',
    'be quiet! Shadow Rock 3',
    'Scythe Big Shuriken 3',
    'Cooler Master MasterAir MA410M',
    'Thermaltake Toughliquid Ultra 360',
    'NZXT Kraken Elite 360mm'
  ]
};

const ComponentSelector = ({ onSelect }) => {
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Mock price history data (replace with actual API call in production)
  const mockPriceHistory = [
    { date: '2023-01-01', price: 299 },
    { date: '2023-02-01', price: 289 },
    { date: '2023-03-01', price: 309 },
    { date: '2023-04-01', price: 279 },
    { date: '2023-05-01', price: 299 },
  ];

  const handleViewPriceHistory = (component) => {
    setSelectedComponent(component);
    setShowPriceHistory(true);
  };

  return (
    <div className="space-y-4">
      {Object.entries(components).map(([category, options]) => (
        <div key={category}>
          <label htmlFor={category} className="block text-sm font-medium text-secondary-700">{category}</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <select
              id={category}
              onChange={(e) => {
                onSelect(category, e.target.value);
                setSelectedComponent(e.target.value);
              }}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md text-base border-secondary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">Select {category}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleViewPriceHistory(selectedComponent)}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-secondary-300 rounded-r-md bg-secondary-50 text-secondary-500 text-sm hover:bg-secondary-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              View Price History
            </button>
          </div>
        </div>
      ))}
      {showPriceHistory && selectedComponent && (
        <PriceHistory data={mockPriceHistory} componentName={selectedComponent} />
      )}
    </div>
  );
};

export default ComponentSelector;