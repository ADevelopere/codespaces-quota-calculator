'use client'

import { useState } from 'react'
import { PLAN_LABELS, PLAN_DESCRIPTIONS } from '@/lib/constants'
import type { CalculatorState, SubscriptionPlan } from '@/lib/types'

interface InputSectionProps {
  state: CalculatorState
  onStateChange: (state: CalculatorState) => void
}

const PLAN_DETAILED_DESCRIPTIONS: Record<SubscriptionPlan, string> = {
  free: 'GitHub Free plan includes 120 core-hours per month at no cost. Additional usage beyond the quota is billed at standard rates.',
  pro: 'GitHub Pro plan includes 180 core-hours per month. Designed for individual developers needing more compute resources than the Free plan.',
  team: 'GitHub Team plan offers custom billing with pay-as-you-go pricing. No fixed quota - you only pay for what you use. Best for team collaboration.',
  enterprise: 'GitHub Enterprise plan includes custom billing and quotas negotiated directly with GitHub. Contact sales for pricing details.',
}

export function InputSection({ state, onStateChange }: InputSectionProps) {
  const [selectedPlanInfo, setSelectedPlanInfo] = useState<SubscriptionPlan | null>(null)

  const handlePlanChange = (plan: SubscriptionPlan) => {
    onStateChange({ ...state, plan })
  }

  const handleInputChange = (key: keyof Omit<CalculatorState, 'plan'>, value: number) => {
    onStateChange({ ...state, [key]: Math.max(0, value) })
  }

  const plans: SubscriptionPlan[] = ['free', 'pro', 'team', 'enterprise']

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Plan Selection */}
      <div>
        <label className="text-xs sm:text-sm font-semibold text-muted-foreground mb-3 sm:mb-4 block">
          Select Your Subscription Plan
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 auto-rows-max">
          {plans.map((plan) => (
            <div key={plan} className="relative group h-full">
              <button
                onClick={() => handlePlanChange(plan)}
                className={`w-full h-full p-3 sm:p-4 rounded-lg border-2 transition-all text-left flex flex-col ${
                  state.plan === plan
                    ? 'border-accent bg-accent text-foreground'
                    : 'border-border bg-card/50 hover:border-accent/50 text-foreground'
                }`}
              >
                <div className="flex items-start justify-between gap-2 flex-1">
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className={`font-semibold text-xs sm:text-sm ${state.plan === plan ? 'text-foreground' : ''}`}>
                      {PLAN_LABELS[plan]}
                    </div>
                    <div className={`text-xs opacity-75 mt-1 line-clamp-2 flex-1 ${state.plan === plan ? 'text-foreground/80' : ''}`}>
                      {PLAN_DESCRIPTIONS[plan]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPlanInfo(selectedPlanInfo === plan ? null : plan)
                    }}
                    className="flex-shrink-0 ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-foreground/20 transition-colors"
                    aria-label="More information"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </button>
              
              {/* Info Tooltip */}
              {selectedPlanInfo === plan && (
                <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-card border border-accent/50 rounded-lg p-3 shadow-lg max-w-xs">
                  <p className="text-xs sm:text-sm text-foreground">{PLAN_DETAILED_DESCRIPTIONS[plan]}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanInfo(null)}
                    className="mt-2 text-xs text-accent hover:underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compute Usage */}
      <div className="bg-card/30 border border-border/30 rounded-lg p-3 sm:p-4">
        <label className="text-xs sm:text-sm font-semibold text-muted-foreground mb-3 sm:mb-4 block">
          Compute Usage (Hours)
        </label>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <div className="flex flex-col h-full">
            <label className="text-xs text-muted-foreground mb-2 block font-medium">2-Core</label>
            <input
              type="number"
              min="0"
              value={state.hours2Core}
              onChange={(e) => handleInputChange('hours2Core', Number(e.target.value))}
              placeholder="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm flex-1"
            />
          </div>
          <div className="flex flex-col h-full">
            <label className="text-xs text-muted-foreground mb-2 block font-medium">4-Core</label>
            <input
              type="number"
              min="0"
              value={state.hours4Core}
              onChange={(e) => handleInputChange('hours4Core', Number(e.target.value))}
              placeholder="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm flex-1"
            />
          </div>
          <div className="flex flex-col h-full">
            <label className="text-xs text-muted-foreground mb-2 block font-medium">8-Core</label>
            <input
              type="number"
              min="0"
              value={state.hours8Core}
              onChange={(e) => handleInputChange('hours8Core', Number(e.target.value))}
              placeholder="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm flex-1"
            />
          </div>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="bg-card/30 border border-border/30 rounded-lg p-3 sm:p-4">
        <label className="text-xs sm:text-sm font-semibold text-muted-foreground mb-3 sm:mb-4 block">
          Storage Usage (GB-Month)
        </label>
        <div>
          <input
            type="number"
            min="0"
            step="0.1"
            value={state.storageGbMonth}
            onChange={(e) => handleInputChange('storageGbMonth', Number(e.target.value))}
            placeholder="0"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Repository size (GB) × active hours, or total GB-hours
          </p>
        </div>
      </div>
    </div>
  )
}
