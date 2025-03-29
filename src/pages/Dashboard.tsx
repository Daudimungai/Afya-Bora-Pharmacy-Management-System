import React from 'react';
import { useStore } from '../store';
import {
  Users,
  Package,
  Receipt,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
} from 'lucide-react';

export function Dashboard() {
  const { medicines, patients, sales } = useStore();

  // Calculate some statistics
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSale = sales.length > 0 ? totalSales / sales.length : 0;
  const lowStockItems = medicines.filter((m) => m.stock <= m.reorderLevel);
  const totalPatients = patients.length;
  const totalMedicines = medicines.length;

  const stats = [
    {
      name: 'Total Patients',
      value: totalPatients,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Medicines',
      value: totalMedicines,
      change: '+5%',
      trend: 'up',
      icon: Package,
      color: 'bg-green-500',
    },
    {
      name: 'Total Sales',
      value: `$${totalSales.toLocaleString()}`,
      change: '+8%',
      trend: 'up',
      icon: Receipt,
      color: 'bg-purple-500',
    },
    {
      name: 'Low Stock Items',
      value: lowStockItems.length,
      change: '-2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your pharmacy today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Generate Report
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
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
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`ml-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Recent Sales</h2>
                <p className="mt-1 text-sm text-gray-500">Latest transactions from your pharmacy</p>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {sales.slice(0, 5).map((sale) => (
                  <li key={sale.id} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Sale #{sale.id}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {new Date(sale.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ${sale.total}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Low Stock Alert</h2>
                <p className="mt-1 text-sm text-gray-500">Items that need to be reordered</p>
              </div>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {lowStockItems.slice(0, 5).map((medicine) => (
                  <li key={medicine.id} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {medicine.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Stock: {medicine.stock} / {medicine.reorderLevel}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Reorder
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}