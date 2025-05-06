'use client';

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function DateSelector({ currentDay, setCurrentDay }) {
  const handleDayChange = (e) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= 31) {
      setCurrentDay(value)
    }
  }

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Label htmlFor="currentDay" className="text-lg font-semibold">
            Dia atual do mês
          </Label>
          <Input
            id="currentDay"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={currentDay}
            onChange={handleDayChange}
            className="w-full"
            placeholder="Digite o dia atual (1-31)"
          />
        </div>
      </CardContent>
    </Card>
  )
}
