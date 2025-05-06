'use client';

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

export function ProfitDisplay({ 
  currentProfit, 
  projectedMonthlyProfit, 
  currentDay, 
  daysRemaining, 
  breakEvenPoint,
  dailyAverage,
  projectedRemainingDaysSales,
  projectedTotalSales
}) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="space-y-4">
      {/* Ponto de Equilíbrio */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white ">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">Ponto de Equilíbrio</h3>
          <p className="text-lg mb-3">
            Você precisa vender {formatCurrency(breakEvenPoint)} para cobrir todos os custos
          </p>
          <div className="w-full bg-purple-700/30 rounded-full h-3">
            <div
              className="bg-purple-200 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((currentProfit / breakEvenPoint) * 100, 100)}%`
              }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Situação Atual (Dia {currentDay})</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Média diária: {formatCurrency(dailyAverage)}</span>
                  <span className="text-sm text-white/70">•</span>
                  <span className="text-sm">{daysRemaining} dias restantes</span>
                </div>
              </div>
              <div className={`p-4 rounded-lg ${currentProfit >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {currentProfit >= 0 ? (
                    <ArrowUp className="w-5 h-5 text-green-200" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-red-200" />
                  )}
                  <span className="font-medium">
                    {currentProfit >= 0 ? 'Lucro' : 'Prejuízo'} Atual
                  </span>
                </div>
                <p className={`text-2xl font-bold ${currentProfit >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  {formatCurrency(currentProfit)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Projeção para o Mês</h3>
                <div className="text-sm space-y-1">
                  <p>Vendas atuais + Projeção para {daysRemaining} dias</p>
                  <p>Projeção de vendas: {formatCurrency(projectedRemainingDaysSales)}</p>
                  <p>Total esperado: {formatCurrency(projectedTotalSales)}</p>
                </div>
              </div>
              <div className={`p-4 rounded-lg ${projectedMonthlyProfit >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {projectedMonthlyProfit >= 0 ? (
                    <ArrowUp className="w-5 h-5 text-green-200" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-red-200" />
                  )}
                  <span className="font-medium">
                    {projectedMonthlyProfit >= 0 ? 'Lucro' : 'Prejuízo'} Projetado
                  </span>
                </div>
                <p className={`text-2xl font-bold ${projectedMonthlyProfit >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  {formatCurrency(projectedMonthlyProfit)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
