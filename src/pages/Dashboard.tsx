import React from 'react';
import { useStore } from '../store';
import {
  Users,
  Package,
  Receipt,
  AlertTriangle,
  TrendingUp,
  Clock,
} from 'lucide-react';

export function Dashboard() {
  const { medicines, patients, sales } = useStore();

  const stats = [
    {
      name: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Medicines',
      value: medicines.length,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      name: 'Total Sales',
      value: sales.length,
      icon: Receipt,
      color: 'bg-purple-500',
    },
    {
      name: 'Low Stock Items',
      value: medicines.filter((m) => m.stock <= m.reorderLevel).length,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats */}
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

      {/* Recent Activity */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Sales</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {sales.slice(0, 5).map((sale) => (
                  <li key={sale.id} className="py-5">
                    <div className="flex items-center space-x-4">
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
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Low Stock Alert
              </h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {medicines
                  .filter((m) => m.stock <= m.reorderLevel)
                  .slice(0, 5)
                  .map((medicine) => (
                    <li key={medicine.id} className="py-5">
                      <div className="flex items-center space-x-4">
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