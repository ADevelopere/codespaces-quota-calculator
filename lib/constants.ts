import type { SubscriptionPlan, PlanQuotas } from './types'

export const PLAN_QUOTAS: Record<SubscriptionPlan, PlanQuotas> = {
  free: {
    coreHours: 120,
    storageGbMonth: 15,
    costPerCoreHour2: 0.18,
    costPerCoreHour4: 0.36,
    costPerCoreHour8: 0.72,
    costPerGbMonth: 0.07,
  },
  pro: {
    coreHours: 180,
    storageGbMonth: 20,
    costPerCoreHour2: 0.18,
    costPerCoreHour4: 0.36,
    costPerCoreHour8: 0.72,
    costPerGbMonth: 0.07,
  },
  team: {
    coreHours: 0, // Pay-as-you-go
    storageGbMonth: 0, // Pay-as-you-go
    costPerCoreHour2: 0.18,
    costPerCoreHour4: 0.36,
    costPerCoreHour8: 0.72,
    costPerGbMonth: 0.07,
  },
  enterprise: {
    coreHours: 0, // Custom
    storageGbMonth: 0, // Custom
    costPerCoreHour2: 0.18,
    costPerCoreHour4: 0.36,
    costPerCoreHour8: 0.72,
    costPerGbMonth: 0.07,
  },
}

export const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  free: 'GitHub Free (Personal)',
  pro: 'GitHub Pro (Student Developer Pack)',
  team: 'GitHub Team',
  enterprise: 'GitHub Enterprise',
}

export const PLAN_DESCRIPTIONS: Record<SubscriptionPlan, string> = {
  free: 'Includes 120 core-hours per month',
  pro: 'Includes 180 core-hours per month',
  team: 'Custom billing - Pay as you go',
  enterprise: 'Custom billing and quotas',
}
