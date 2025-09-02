import { AiOutlineDown } from 'react-icons/ai';

const BarChart = ({ title, data, dropdownValue = "Last 30days" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
          <span>{dropdownValue}</span>
          <AiOutlineDown size={16} />
        </button>
      </div>
      
      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>2200000</span>
          <span>1750000</span>
          <span>1100000</span>
          <span>550000</span>
          <span>0</span>
        </div>
        
        {/* Chart bars */}
        <div className="ml-16 h-full flex items-end space-x-8">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-black rounded-t-sm transition-all duration-300 hover:bg-gray-800"
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: '8px'
                }}
              ></div>
              <span className="text-sm text-gray-600 mt-3">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;