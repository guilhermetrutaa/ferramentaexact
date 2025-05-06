'use client';


import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { SalesInput } from "@/components/SalesInput"
import { ProfitDisplay } from "@/components/ProfitDisplay"
import { DateSelector } from "@/components/DateSelector"
import { CostSummary } from "@/components/CostSummary"
import { ProfitChart } from "@/components/ProfitChart"
import Image from 'next/image'

function App() {
  const [fixedCosts, setFixedCosts] = useState(() => {
    const saved = localStorage.getItem('fixedCosts')
    return saved ? JSON.parse(saved) : [] // Garantir que seja um array vazio se não existir no localStorage
  })
  
  const [variableCosts, setVariableCosts] = useState(() => {
    const saved = localStorage.getItem('variableCosts')
    return saved ? JSON.parse(saved) : [] // Garantir que seja um array vazio se não existir no localStorage
  })
  
  const [currentSales, setCurrentSales] = useState(() => {
    const saved = localStorage.getItem('currentSales')
    return saved ? parseFloat(saved) : 0 // Garantir que seja um número, ou 0 se não existir
  })
  
  const [segment, setSegment] = useState(() => {
    const saved = localStorage.getItem('segment')
    return saved || "varejo" // Usar "varejo" como valor padrão se não encontrar no localStorage
  })

  const [currentDay, setCurrentDay] = useState(() => {
    const saved = localStorage.getItem('currentDay')
    return saved ? parseInt(saved) : new Date().getDate() // Garantir que seja um número ou o dia atual
  })

  const [newCostName, setNewCostName] = useState("")
  const [newCostValue, setNewCostValue] = useState("")
  const [newVariableCostName, setNewVariableCostName] = useState("")
  const [newVariableCostValue, setNewVariableCostValue] = useState("")

  useEffect(() => {
    // Salvando no localStorage de forma segura com JSON.stringify
    localStorage.setItem('fixedCosts', JSON.stringify(fixedCosts))
    localStorage.setItem('variableCosts', JSON.stringify(variableCosts))
    localStorage.setItem('currentSales', currentSales.toString())
    localStorage.setItem('segment', segment)
    localStorage.setItem('currentDay', currentDay.toString())
  }, [fixedCosts, variableCosts, currentSales, segment, currentDay])

  const totalFixedCosts = fixedCosts.reduce((sum, cost) => sum + parseFloat(cost.value), 0)
  const totalVariableCostPercentage = variableCosts.reduce((sum, cost) => sum + parseFloat(cost.value), 0)
  const contributionMargin = (100 - totalVariableCostPercentage) / 100
  const breakEvenPoint = totalFixedCosts / contributionMargin
  
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  const daysRemaining = daysInMonth - currentDay
  
  const currentProfit = currentSales * contributionMargin - totalFixedCosts
  const dailyAverage = currentDay > 0 ? currentSales / currentDay : 0
  const projectedRemainingDaysSales = dailyAverage * daysRemaining
  const projectedTotalSales = currentSales + projectedRemainingDaysSales
  const projectedMonthlyProfit = projectedTotalSales * contributionMargin - totalFixedCosts

  const addFixedCost = () => {
    if (!newCostName || !newCostValue) {
      toast({
        title: "Erro",
        description: "Por favor preencha o nome e valor do custo fixo",
        variant: "destructive"
      })
      return
    }

    setFixedCosts([...fixedCosts, { name: newCostName, value: parseFloat(newCostValue) }])
    setNewCostName("")
    setNewCostValue("")
    
    toast({
      title: "Sucesso",
      description: "Custo fixo adicionado com sucesso"
    })
  }

  const addVariableCost = () => {
    if (!newVariableCostName || !newVariableCostValue) {
      toast({
        title: "Erro",
        description: "Por favor preencha o nome e percentual do custo variável",
        variant: "destructive"
      })
      return
    }

    if (parseFloat(newVariableCostValue) < 0 || parseFloat(newVariableCostValue) > 100) {
      toast({
        title: "Erro",
        description: "O percentual deve estar entre 0 e 100",
        variant: "destructive"
      })
      return
    }

    setVariableCosts([...variableCosts, { name: newVariableCostName, value: parseFloat(newVariableCostValue) }])
    setNewVariableCostName("")
    setNewVariableCostValue("")
    
    toast({
      title: "Sucesso",
      description: "Custo variável adicionado com sucesso"
    })
  }

  const removeCost = (index, type) => {
    if (type === 'fixed') {
      setFixedCosts(fixedCosts.filter((_, i) => i !== index))
    } else {
      setVariableCosts(variableCosts.filter((_, i) => i !== index))
    }
    toast({
      title: "Sucesso",
      description: `${type === 'fixed' ? 'Custo fixo' : 'Custo variável'} removido com sucesso`
    })
  }

  const financialTips = {
    varejo: {
      precoVenda: [
        "1. Analise a elasticidade de preços por produto e ajuste valores",
        "2. Implemente preços dinâmicos baseados na demanda",
        "3. Crie combos e pacotes com margens otimizadas",
        "4. Desenvolva uma linha premium com margens maiores",
        "5. Utilize precificação psicológica (ex: R$9,99)"
      ].join("\n"),
      volumeVendas: [
        "1. Crie programa de fidelidade com benefícios progressivos",
        "2. Implemente vendas cruzadas (cross-selling)",
        "3. Desenvolva parcerias com empresas complementares",
        "4. Utilize marketing digital direcionado",
        "5. Ofereça bônus por indicação de novos clientes"
      ].join("\n"),
      custoVariavel: [
        "1. Negocie descontos por volume com fornecedores",
        "2. Otimize rotas de entrega e logística",
        "3. Implemente sistema de controle de perdas",
        "4. Desenvolva fornecedores alternativos",
        "5. Analise terceirização de processos não essenciais"
      ].join("\n"),
      custoFixo: [
        "1. Renegocie contratos de aluguel e serviços",
        "2. Implemente tecnologias para redução de consumo",
        "3. Avalie compartilhamento de espaços e recursos",
        "4. Otimize escala de funcionários",
        "5. Automatize processos operacionais"
      ].join("\n"),
      giroEstoque: [
        "1. Implemente sistema de gestão de estoque",
        "2. Defina níveis mínimos e máximos por produto",
        "3. Realize promoções de produtos com baixo giro",
        "4. Monitore sazonalidade das vendas",
        "5. Estabeleça parcerias para consignação"
      ].join("\n"),
      prazoRecebimento: [
        "1. Ofereça descontos para pagamentos antecipados",
        "2. Implemente múltiplas formas de pagamento",
        "3. Desenvolva política de análise de crédito",
        "4. Utilize sistemas de cobrança automatizada",
        "5. Estabeleça limites de crédito por cliente"
      ].join("\n"),
      prazoPagamento: [
        "1. Negocie prazos escalonados com fornecedores",
        "2. Desenvolva relacionamento com múltiplos fornecedores",
        "3. Planeje compras antecipadas com desconto",
        "4. Utilize ferramentas de gestão de fluxo de caixa",
        "5. Implemente sistema de aprovação de pagamentos"
      ].join("\n")
    },
    servicos: {
      precoVenda: [
        "1. Desenvolva diferentes níveis de serviço (basic, premium)",
        "2. Crie pacotes personalizados por perfil de cliente",
        "3. Implemente preços por valor agregado",
        "4. Ofereça descontos para contratos longos",
        "5. Desenvolva serviços complementares"
      ].join("\n"),
      volumeVendas: [
        "1. Crie programa de indicações premiadas",
        "2. Desenvolva parcerias estratégicas",
        "3. Implemente marketing de conteúdo especializado",
        "4. Ofereça consultoria gratuita inicial",
        "5. Utilize cases de sucesso no marketing"
      ].join("\n"),
      custoVariavel: [
        "1. Otimize processos e tempo de execução",
        "2. Implemente ferramentas de produtividade",
        "3. Desenvolva equipe multifuncional",
        "4. Utilize tecnologia para automação",
        "5. Padronize procedimentos operacionais"
      ].join("\n"),
      custoFixo: [
        "1. Adote modelo híbrido de trabalho",
        "2. Otimize espaço físico utilizado",
        "3. Implemente sistemas em nuvem",
        "4. Renegocie contratos de serviços",
        "5. Compartilhe recursos entre equipes"
      ].join("\n"),
      giroEstoque: [
        "1. Controle materiais de consumo",
        "2. Implemente sistema de requisição",
        "3. Desenvolva parcerias para suprimentos",
        "4. Monitore uso de recursos",
        "5. Estabeleça metas de consumo"
      ].join("\n"),
      prazoRecebimento: [
        "1. Implemente sistema de assinatura",
        "2. Ofereça desconto para pagamento antecipado",
        "3. Desenvolva planos de pagamento flexíveis",
        "4. Utilize cobrança recorrente",
        "5. Automatize processo de faturamento"
      ].join("\n"),
      prazoPagamento: [
        "1. Negocie contratos anuais com fornecedores",
        "2. Desenvolva parcerias estratégicas",
        "3. Implemente sistema de compras programadas",
        "4. Utilize pagamentos recorrentes",
        "5. Mantenha reserva financeira estratégica"
      ].join("\n")
    },
    industria: {
      precoVenda: [
        "1. Desenvolva produtos com maior valor agregado",
        "2. Implemente precificação baseada em valor",
        "3. Crie linhas de produtos premium",
        "4. Ofereça serviços agregados",
        "5. Desenvolva produtos customizados"
      ].join("\n"),
      volumeVendas: [
        "1. Expanda canais de distribuição",
        "2. Desenvolva mercados internacionais",
        "3. Crie parcerias com revendedores",
        "4. Implemente e-commerce B2B",
        "5. Participe de feiras setoriais"
      ].join("\n"),
      custoVariavel: [
        "1. Otimize processos produtivos",
        "2. Implemente controle estatístico",
        "3. Reduza perdas e retrabalho",
        "4. Desenvolva fornecedores estratégicos",
        "5. Automatize linhas de produção"
      ].join("\n"),
      custoFixo: [
        "1. Invista em eficiência energética",
        "2. Implemente manutenção preventiva",
        "3. Otimize layout produtivo",
        "4. Desenvolva plano de automação",
        "5. Renegocie contratos de serviços"
      ].join("\n"),
      giroEstoque: [
        "1. Implemente sistema just-in-time",
        "2. Desenvolva fornecedores locais",
        "3. Otimize lotes de produção",
        "4. Utilize previsão de demanda",
        "5. Monitore giro por produto"
      ].join("\n"),
      prazoRecebimento: [
        "1. Analise opções de factoring",
        "2. Implemente desconto para antecipação",
        "3. Desenvolva política de crédito rígida",
        "4. Utilize sistemas de cobrança automatizada",
        "5. Negocie com grandes compradores"
      ].join("\n"),
      prazoPagamento: [
        "1. Utilize técnicas de financiamento de curto prazo",
        "2. Renegocie prazos com fornecedores estratégicos",
        "3. Utilize descontos por pagamento antecipado",
        "4. Desenvolva reservas financeiras",
        "5. Use factoring para antecipação de recebíveis"
      ].join("\n")
    }
  }

  const selectedFinancialTips = financialTips[segment]

  return (
    <div className="min-h-screen bg-[#ececec] p-2 sm:p-4 md:p-8 text-[#000]">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8">
        <Card className="shadow-[2rem] shadow-[#000000af]">
          <CardHeader >
            <div className="flex gap-[24rem]">
                <CardTitle className="text-xl sm:text-2xl">Calculadora de Ponto de Equilíbrio</CardTitle>
                <Image
                    src="/logo.svg"
                    width={80}
                    height={80}
                    alt="Logo"
                />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Segmento */}
            <div className="space-y-2">
              <Label htmlFor="segment">Segmento</Label>
              <select
                id="segment"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="varejo">Varejo</option>
                <option value="servicos">Serviços</option>
                <option value="industria">Indústria</option>
              </select>
            </div>

            {/* Data Atual */}
            <DateSelector currentDay={currentDay} setCurrentDay={setCurrentDay} />

            {/* Custos Fixos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Custos Fixos</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="costName">Nome do Custo</Label>
                  <Input
                    id="costName"
                    value={newCostName}
                    onChange={(e) => setNewCostName(e.target.value)}
                    placeholder="Ex: Aluguel"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="costValue">Valor (R$)</Label>
                  <Input
                    id="costValue"
                    type="number"
                    value={newCostValue}
                    onChange={(e) => setNewCostValue(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addFixedCost} className="w-full sm:w-auto bg-[#000] text-[#fff]">Adicionar</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {fixedCosts.map((cost, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white rounded-md shadow-sm gap-2">
                    <span>{cost.name}</span>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <span>R$ {cost.value.toFixed(2)}</span>
                      <Button variant="destructive" size="sm" onClick={() => removeCost(index, 'fixed')} className="w-full sm:w-auto bg-[#000] text-[#fff]">
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custos Variáveis */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Custos Variáveis</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="variableCostName">Nome do Custo</Label>
                  <Input
                    id="variableCostName"
                    value={newVariableCostName}
                    onChange={(e) => setNewVariableCostName(e.target.value)}
                    placeholder="Ex: Comissão"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="variableCostValue">Percentual (%)</Label>
                  <Input
                    id="variableCostValue"
                    type="number"
                    value={newVariableCostValue}
                    onChange={(e) => setNewVariableCostValue(e.target.value)}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addVariableCost} className="w-full sm:w-auto bg-[#000] text-[#fff]">Adicionar</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {variableCosts.map((cost, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white rounded-md shadow-sm gap-2">
                    <span>{cost.name}</span>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <span>{cost.value.toFixed(2)}%</span>
                      <Button variant="destructive" size="sm" onClick={() => removeCost(index, 'variable')} className="w-full sm:w-auto">
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo dos Custos */}
            <CostSummary fixedCosts={fixedCosts} variableCosts={variableCosts} />

            {/* Vendas Atuais */}
            <SalesInput currentSales={currentSales} setCurrentSales={setCurrentSales} />
          </CardContent>
        </Card>

        {/* Gráfico de Evolução */}
        <ProfitChart
          currentSales={currentSales}
          currentDay={currentDay}
          daysInMonth={daysInMonth}
          projectedTotalSales={projectedTotalSales}
          breakEvenPoint={breakEvenPoint}
          totalFixedCosts={totalFixedCosts}
          totalVariableCostPercentage={totalVariableCostPercentage}
          currentProfit={currentProfit}
          projectedMonthlyProfit={projectedMonthlyProfit}
        />

        {/* Resultados */}
        <ProfitDisplay
          currentProfit={currentProfit}
          projectedMonthlyProfit={projectedMonthlyProfit}
          currentDay={currentDay}
          daysRemaining={daysRemaining}
          breakEvenPoint={breakEvenPoint}
          dailyAverage={dailyAverage}
          projectedRemainingDaysSales={projectedRemainingDaysSales}
          projectedTotalSales={projectedTotalSales}
        />

        {/* Dicas Financeiras */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader>
            <CardTitle>Dicas para Melhorar seu Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Preço de Venda</h4>
                <div className="text-sm whitespace-pre-line">{tips.precoVenda}</div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Volume de Vendas</h4>
                <div className="text-sm whitespace-pre-line">{tips.volumeVendas}</div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Custo Variável</h4>
                <div className="text-sm whitespace-pre-line">{tips.custoVariavel}</div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Custo Fixo</h4>
                <div className="text-sm whitespace-pre-line">{tips.custoFixo}</div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Giro de Estoque</h4>
                <div className="text-sm whitespace-pre-line">{tips.giroEstoque}</div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Prazo de Recebimento</h4>
                <div className="text-sm whitespace-pre-line">{tips.prazoRecebimento}</div>
              </div>
              <div className="space-y-3 md:col-span-2">
                <h4 className="font-semibold text-lg">Prazo de Pagamento</h4>
                <div className="text-sm whitespace-pre-line">{tips.prazoPagamento}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}

export default App
