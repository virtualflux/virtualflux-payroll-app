export const formatCurrency = (value) => {
    if (value === null || value === undefined) return "₦0.00";
  
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(Number(value));
  };
  