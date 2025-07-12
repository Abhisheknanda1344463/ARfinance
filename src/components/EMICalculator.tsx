import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, IndianRupee, Calendar, Percent, DollarSign } from 'lucide-react';

interface EMIData {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  totalPayment: number;
}

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [chartData, setChartData] = useState<EMIData[]>([]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / (12 * 100);
    const months = tenure * 12;

    if (monthlyRate === 0) {
      const calculatedEmi = principal / months;
      setEmi(calculatedEmi);
      setTotalAmount(principal);
      setTotalInterest(0);
      return;
    }

    const calculatedEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                         (Math.pow(1 + monthlyRate, months) - 1);
    
    setEmi(calculatedEmi);
    setTotalAmount(calculatedEmi * months);
    setTotalInterest((calculatedEmi * months) - principal);

    // Generate chart data
    const data: EMIData[] = [];
    let remainingBalance = principal;

    for (let month = 1; month <= Math.min(months, 240); month++) { // Limit to 20 years for chart performance
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = calculatedEmi - interestPayment;
      remainingBalance -= principalPayment;

      if (month % 12 === 0 || month === 1) { // Show yearly data points
        data.push({
          month: Math.floor(month / 12) || 1,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, remainingBalance),
          totalPayment: calculatedEmi
        });
      }
    }

    setChartData(data);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#3B82F6' },
    { name: 'Interest', value: totalInterest, color: '#EF4444' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="emi-calculator" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-4" />
            <h2 className="text-4xl font-bold text-gray-900">EMI Calculator</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your Equated Monthly Installment and plan your loan repayment with our interactive calculator
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
              <IndianRupee className="h-6 w-6 text-blue-600 mr-2" />
              Loan Details
            </h3>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Loan Amount
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>₹1L</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(loanAmount)}</span>
                    <span>₹1Cr</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Interest Rate (% per annum)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>5%</span>
                    <span className="font-semibold text-blue-600">{interestRate}%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Loan Tenure (Years)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1 Year</span>
                    <span className="font-semibold text-blue-600">{tenure} Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(emi)}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <IndianRupee className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Percent className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalInterest)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-8">
            {/* Principal vs Interest Pie Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                Payment Breakdown
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Principal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Interest</span>
                </div>
              </div>
            </div>

            {/* Balance Over Time Line Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Outstanding Balance Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      label={{ value: 'Years', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), 'Outstanding Balance']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Understanding Your EMI</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">EMI Formula</h4>
              <p className="text-gray-600 text-sm">
                EMI = [P × R × (1+R)^N] / [(1+R)^N-1] where P is principal, R is monthly interest rate, N is tenure in months
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Lower Interest Tips</h4>
              <p className="text-gray-600 text-sm">
                Maintain good credit score, compare rates, consider shorter tenure, and make prepayments when possible
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <IndianRupee className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Planning</h4>
              <p className="text-gray-600 text-sm">
                Keep EMI under 40% of monthly income, factor in other expenses, and maintain emergency fund
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;