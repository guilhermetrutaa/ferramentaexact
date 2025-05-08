'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
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

    for (let i = 1; i <= currentDay; i++) {
      const lucroValor = dailyProfit * i
      data.push({
        dia: i,
        vendas: dailyAverage * i,
        lucro: lucroValor,
        lucroPositivo: lucroValor >= 0 ? lucroValor : null,
        lucroNegativo: lucroValor < 0 ? lucroValor : null
      })
    }

    const remainingDays = daysInMonth - currentDay
    const projectedDailyProfit = remainingDays > 0 ?
      (projectedMonthlyProfit - currentProfit) / remainingDays : 0
    const projectedDailySales = remainingDays > 0 ?
      (projectedTotalSales - currentSales) / remainingDays : 0

    for (let i = currentDay + 1; i <= daysInMonth; i++) {
      const lucroValor = currentProfit + (projectedDailyProfit * (i - currentDay))
      data.push({
        dia: i,
        vendas: currentSales + (projectedDailySales * (i - currentDay)),
        lucro: lucroValor,
        lucroPositivo: lucroValor >= 0 ? lucroValor : null,
        lucroNegativo: lucroValor < 0 ? lucroValor : null
      })
    }

    return data
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const vendas = payload.find(p => p.dataKey === 'vendas')?.value ?? 0
      const lucro = payload.find(p => ['lucroPositivo', 'lucroNegativo'].includes(p.dataKey))?.value ?? 0

      return (
        <div className="bg-white p-3 border rounded shadow-lg text-sm">
          <p className="font-semibold mb-1">Dia: {label}</p>
          <p className="text-blue-600">Vendas: {formatCurrency(vendas)}</p>
          <p className={lucro >= 0 ? 'text-green-600' : 'text-red-600'}>
            Lucro: {lucro >= 0 
              ? formatCurrency(lucro) 
              : `-${formatCurrency(Math.abs(lucro))}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white shadow-lg border border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Evolução de Vendas e Lucro</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={generateData()}
              margin={{ top: 20, right: 40, left: 60, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dia"
                label={{ value: 'Dias do Mês', position: 'insideBottom', offset: -20 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                label={{
                  value: 'Valores (R$)',
                  angle: -90,
                  position: 'insideLeft',
                  dx: -60,
                  fontSize: 14
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                wrapperStyle={{
                  paddingBottom: "30px",
                  fontSize: "14px"
                }}
              />
              <Line
                type="monotone"
                dataKey="vendas"
                name="Vendas"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lucroPositivo"
                name="Lucro Positivo"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lucroNegativo"
                name="Lucro Negativo"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine
                x={currentDay}
                stroke="#6b7280"
                strokeDasharray="3 3"
                label={{
                  value: 'Hoje',
                  position: 'top',
                  fill: '#6b7280',
                  fontSize: 12,
                  dy: -10
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
