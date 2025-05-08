'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Label
} from "recharts"

export function CostSummary({ fixedCosts, variableCosts }) {
  const totalFixedCosts = fixedCosts.reduce((sum, cost) => sum + parseFloat(cost.value), 0)
  const totalVariableCosts = variableCosts.reduce((sum, cost) => sum + parseFloat(cost.value), 0)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#14B8A6', '#F97316', '#F43F5E']

  const fixedCostsData = fixedCosts.map(cost => ({
    name: cost.name,
    value: parseFloat(cost.value)
  }))

  const variableCostsData = variableCosts.map(cost => ({
    name: cost.name,
    value: parseFloat(cost.value)
  }))

  const renderLabel = ({ name, percent }) =>
    `${name} (${(percent * 100).toFixed(0)}%)`

  return (
    <Card className="bg-white shadow-md rounded-xl">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Custos Fixos */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Custos Fixos</h3>
            <p className="text-3xl font-bold text-indigo-600">{formatCurrency(totalFixedCosts)}</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fixedCostsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    labelLine={false}
                    label={renderLabel}
                  >
                    {fixedCostsData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1.5} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Custos Variáveis */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Custos Variáveis</h3>
            <p className="text-3xl font-bold text-emerald-600">{totalVariableCosts.toFixed(2)}%</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={variableCostsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    labelLine={false}
                    label={renderLabel}
                  >
                    {variableCostsData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1.5} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
