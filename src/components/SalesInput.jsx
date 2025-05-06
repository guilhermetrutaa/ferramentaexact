
import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function SalesInput({ currentSales, setCurrentSales }) {
  const handleSalesChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '')
    const numberValue = parseInt(value) || 0
    setCurrentSales(numberValue)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Label htmlFor="currentSales" className="text-lg font-semibold">
            Vendas até o momento
          </Label>
          <div className="relative">
            <Input
              id="currentSales"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={currentSales}
              onChange={handleSalesChange}
              className="text-lg"
              placeholder="Digite o valor das vendas"
            />
            <div className="mt-2 text-sm text-gray-600">
              Valor formatado: {formatCurrency(currentSales)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
