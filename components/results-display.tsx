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
    <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
      {/* Main Usage Card */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-accent/30 rounded-lg sm:rounded-xl p-4 sm:p-6 min-h-32">
        <div className="text-center h-full flex flex-col items-center justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">Monthly Usage</p>
          <div className="text-3xl sm:text-4xl font-bold mb-2">
            {result.quotaUsagePercent > 0
              ? Math.min(result.quotaUsagePercent, 100).toFixed(1)
              : '0'}
            %
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {result.totalCoreHours.toFixed(1)} / {quotas.coreHours} core-hours
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card/30 border border-border/30 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3 text-xs sm:text-sm">
          <span className="font-medium">Usage Progress</span>
          <span className="text-muted-foreground">
            {result.quotaRemaining > 0
              ? `${remainingAs2Core.toFixed(1)}h remaining`
              : 'Over quota'}
          </span>
        </div>
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 auto-rows-fr">
        {/* Compute Overage */}
        <div className="bg-card border border-border rounded-lg p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Compute Overage</p>
            <div className="text-xl sm:text-2xl font-bold mb-3">{formatCurrency(result.computeOverageCost)}</div>
          </div>
          <p className="text-xs text-muted-foreground">
            {result.computeOverage.toFixed(1)} core-hours over
          </p>
        </div>

        {/* Storage Overage */}
        <div className="bg-card border border-border rounded-lg p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Storage Overage</p>
            <div className="text-xl sm:text-2xl font-bold mb-3">{formatCurrency(result.storageOverageCost)}</div>
          </div>
          <p className="text-xs text-muted-foreground">
            {result.storageOverage.toFixed(2)} GB-months over
          </p>
        </div>
      </div>

      {/* Total Estimated Cost */}
      <div
        className={`rounded-lg p-4 sm:p-6 text-center border-2 min-h-28 flex flex-col items-center justify-center ${
          result.totalEstimatedCost > 0
            ? 'bg-destructive/10 border-destructive/30'
            : 'bg-accent/10 border-accent/30'
        }`}
      >
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Estimated Monthly Cost</p>
        <div className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.totalEstimatedCost)}</div>
        {result.totalEstimatedCost === 0 && (
          <p className="text-xs text-accent mt-2">Within free quota!</p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-xs sm:text-sm">Summary</h3>
        <div className="space-y-2 text-xs flex-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">2-Core</span>
            <span>{state.hours2Core}h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">4-Core</span>
            <span>{state.hours4Core}h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">8-Core</span>
            <span>{state.hours8Core}h</span>
          </div>
          <div className="border-t border-border pt-2 mt-auto flex justify-between font-semibold">
            <span>Total</span>
            <span>{result.totalCoreHours.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
