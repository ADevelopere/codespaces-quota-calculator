'use client'

import { PLAN_QUOTAS } from '@/lib/constants'
import { calculateUsage, formatCurrency } from '@/lib/calculator'
import type { CalculatorState } from '@/lib/types'

interface ResultsDisplayProps {
  state: CalculatorState
}

export function ResultsDisplay({ state }: ResultsDisplayProps) {
  const result = calculateUsage(state)
  const quotas = PLAN_QUOTAS[state.plan]

  // Calculate remaining hours as 2-core equivalent
  const remainingAs2Core = quotas.coreHours > 0 ? result.quotaRemaining / 2 : 0

  const isOverQuota = result.totalCoreHours > quotas.coreHours && quotas.coreHours > 0

  return (
    <div className="space-y-6">
      {/* Main Usage Card */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-accent/30 rounded-xl p-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Monthly Usage</p>
          <div className="text-4xl font-bold mb-2">
            {result.quotaUsagePercent > 0
              ? Math.min(result.quotaUsagePercent, 100).toFixed(1)
              : '0'}
            %
          </div>
          <p className="text-sm text-muted-foreground">
            {result.totalCoreHours.toFixed(1)} / {quotas.coreHours} core-hours
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium">Usage Progress</span>
          <span className="text-xs text-muted-foreground">
            {result.quotaRemaining > 0
              ? `${remainingAs2Core.toFixed(1)}h 2-core remaining`
              : 'Over quota'}
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              isOverQuota ? 'bg-destructive' : 'bg-accent'
            }`}
            style={{
              width: `${Math.min(result.quotaUsagePercent, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Compute Overage */}
        <div className="bg-card border border-border rounded-lg p-5">
          <p className="text-xs text-muted-foreground mb-2">Compute Overage</p>
          <div className="text-2xl font-bold mb-2">{formatCurrency(result.computeOverageCost)}</div>
          <p className="text-xs text-muted-foreground">
            {result.computeOverage.toFixed(1)} core-hours over limit
          </p>
        </div>

        {/* Storage Overage */}
        <div className="bg-card border border-border rounded-lg p-5">
          <p className="text-xs text-muted-foreground mb-2">Storage Overage</p>
          <div className="text-2xl font-bold mb-2">{formatCurrency(result.storageOverageCost)}</div>
          <p className="text-xs text-muted-foreground">
            {result.storageOverage.toFixed(2)} GB-months over limit
          </p>
        </div>
      </div>

      {/* Total Estimated Cost */}
      <div
        className={`rounded-lg p-6 text-center border-2 ${
          result.totalEstimatedCost > 0
            ? 'bg-destructive/10 border-destructive/30'
            : 'bg-accent/10 border-accent/30'
        }`}
      >
        <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Cost</p>
        <div className="text-4xl font-bold">{formatCurrency(result.totalEstimatedCost)}</div>
        {result.totalEstimatedCost === 0 && (
          <p className="text-xs text-accent mt-2">You are within your free quota!</p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-3">
        <h3 className="font-semibold text-sm">Summary</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">2-Core Hours</span>
            <span>{state.hours2Core}h ({(state.hours2Core * 2).toFixed(0)} core-hrs)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">4-Core Hours</span>
            <span>{state.hours4Core}h ({(state.hours4Core * 4).toFixed(0)} core-hrs)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">8-Core Hours</span>
            <span>{state.hours8Core}h ({(state.hours8Core * 8).toFixed(0)} core-hrs)</span>
          </div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
            <span>Total Core-Hours</span>
            <span>{result.totalCoreHours.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
