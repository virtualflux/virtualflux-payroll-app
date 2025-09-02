const StatCard = ({ title, value, bgColor = "bg-white" }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-sm border border-gray-200`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>

    
  );
};

export default StatCard;