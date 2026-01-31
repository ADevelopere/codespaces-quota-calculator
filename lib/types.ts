export type SubscriptionPlan = 'free' | 'pro' | 'team' | 'enterprise'

export interface PlanQuotas {
  coreHours: number
  storageGbMonth: number
  costPerCoreHour2: number
  costPerCoreHour4: number
  costPerCoreHour8: number
  costPerGbMonth: number
}

export interface CalculatorState {
  plan: SubscriptionPlan
  hours2Core: number
  hours4Core: number
  hours8Core: number
  storageGbMonth: number
}

export interface CalculationResult {
  totalCoreHours: number
  quotaUsagePercent: number
  quotaRemaining: number
  computeOverage: number
  storageOverage: number
  computeOverageCost: number
  storageOverageCost: number
  totalEstimatedCost: number
}
