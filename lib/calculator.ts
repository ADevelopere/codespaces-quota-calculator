import { PLAN_QUOTAS } from './constants'
import type { CalculatorState, CalculationResult } from './types'

export function calculateUsage(state: CalculatorState): CalculationResult {
  const quotas = PLAN_QUOTAS[state.plan]

  // Calculate total core-hours used
  const totalCoreHours =
    state.hours2Core * 2 + state.hours4Core * 4 + state.hours8Core * 8

  // Calculate quota usage percentage
  const quotaUsagePercent =
    quotas.coreHours > 0 ? (totalCoreHours / quotas.coreHours) * 100 : 0

  // Calculate remaining quota
  const quotaRemaining = Math.max(0, quotas.coreHours - totalCoreHours)

  // Calculate compute overage (core-hours exceeded)
  const computeOverage = Math.max(0, totalCoreHours - quotas.coreHours)

  // Calculate storage overage (GB-months exceeded)
  const storageOverage = Math.max(0, state.storageGbMonth - quotas.storageGbMonth)

  // Calculate overage costs
  // We need to calculate the actual hours for each machine type that caused overage
  let computeOverageCost = 0
  let remainingOverage = computeOverage

  if (remainingOverage > 0 && state.hours8Core > 0) {
    const overage8Core = Math.min(state.hours8Core * 8, remainingOverage)
    computeOverageCost += (overage8Core / 8) * quotas.costPerCoreHour8
    remainingOverage -= overage8Core
  }

  if (remainingOverage > 0 && state.hours4Core > 0) {
    const overage4Core = Math.min(state.hours4Core * 4, remainingOverage)
    computeOverageCost += (overage4Core / 4) * quotas.costPerCoreHour4
    remainingOverage -= overage4Core
  }

  if (remainingOverage > 0 && state.hours2Core > 0) {
    const overage2Core = Math.min(state.hours2Core * 2, remainingOverage)
    computeOverageCost += (overage2Core / 2) * quotas.costPerCoreHour2
  }

  const storageOverageCost = storageOverage * quotas.costPerGbMonth

  const totalEstimatedCost = computeOverageCost + storageOverageCost

  return {
    totalCoreHours,
    quotaUsagePercent,
    quotaRemaining,
    computeOverage,
    storageOverage,
    computeOverageCost,
    storageOverageCost,
    totalEstimatedCost,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    const minutes = Math.round(hours * 60)
    return `${minutes}m`
  }
  return `${hours.toFixed(1)}h`
}
