import React from 'react';
import { useStore } from '../store';
import { BarChart3, TrendingUp, PieChart, Calendar } from 'lucide-react';

export function Reports() {
  const { sales, medicines } = useStore();

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageOrderValue = totalSales / (sales.length || 1);
  const lowStockItems = medicines.filter((m) => m.stock <= m.reorderLevel).length;

  const stats = [
    {
      name: 'Total Sales',
      value: `$${totalSales.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Average Order Value',
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: BarChart3,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Orders',
      value: sales.length,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      name: 'Low Stock Items',
      value: lowStockItems,
      icon: PieChart,
      color: 'bg-red-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`rounded-md ${stat.color} p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Sales Overview
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Sales chart will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
}