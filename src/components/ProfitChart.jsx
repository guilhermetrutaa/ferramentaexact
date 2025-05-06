'use client';

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts"

export function ProfitChart({
  currentSales,
  currentDay,
  daysInMonth,
  projectedTotalSales,
  currentProfit,
  projectedMonthlyProfit
}) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const generateData = () => {
    const data = []
    const dailyAverage = currentDay > 0 ? currentSales / currentDay : 0
    const dailyProfit = currentDay > 0 ? currentProfit / currentDay : 0

    // Dados reais até o dia atual
    for (let i = 1; i <= currentDay; i++) {
      data.push({
        dia: i,
        vendas: dailyAverage * i,
        lucro: dailyProfit * i
      })
    }

    // Projeção para os dias restantes
    const remainingDays = daysInMonth - currentDay
    const projectedDailyProfit = remainingDays > 0 ? 
      (projectedMonthlyProfit - currentProfit) / remainingDays : 0
    const projectedDailySales = remainingDays > 0 ?
      (projectedTotalSales - currentSales) / remainingDays : 0

    for (let i = currentDay + 1; i <= daysInMonth; i++) {
      data.push({
        dia: i,
        vendas: currentSales + (projectedDailySales * (i - currentDay)),
        lucro: currentProfit + (projectedDailyProfit * (i - currentDay))
      })
    }

    return data
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">Dia: {label}</p>
          <p className="text-blue-600">Vendas: {formatCurrency(payload[0].value)}</p>
          <p className="text-green-600">Lucro: {formatCurrency(payload[1].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white shadow-[2rem] shadow-[#000000af]">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Evolução de Vendas e Lucro</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={generateData()}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dia"
                label={{ value: 'Dias do Mês', position: 'bottom', offset: 0 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                label={{ value: 'Valores (R$)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{
                  paddingBottom: "20px",
                  paddingTop: "10px"
                }}
              />
              
              {/* Área de Vendas */}
              <Area
                type="monotone"
                dataKey="vendas"
                name="Vendas"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              
              {/* Área de Lucro */}
              <Area
                type="monotone"
                dataKey="lucro"
                name="Lucro"
                stroke="#16a34a"
                fill="#22c55e"
                fillOpacity={0.2}
                strokeWidth={2}
              />

              {/* Linha do Dia Atual */}
              <ReferenceLine
                x={currentDay}
                stroke="#6b7280"
                strokeDasharray="3 3"
                label={{
                  value: 'Hoje',
                  position: 'top',
                  fill: '#6b7280'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
