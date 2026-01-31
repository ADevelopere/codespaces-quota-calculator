'use client'

import { PLAN_LABELS, PLAN_DESCRIPTIONS } from '@/lib/constants'
import type { CalculatorState, SubscriptionPlan } from '@/lib/types'

interface InputSectionProps {
  state: CalculatorState
  onStateChange: (state: CalculatorState) => void
}

export function InputSection({ state, onStateChange }: InputSectionProps) {
  const handlePlanChange = (plan: SubscriptionPlan) => {
    onStateChange({ ...state, plan })
  }

  const handleInputChange = (key: keyof Omit<CalculatorState, 'plan'>, value: number) => {
    onStateChange({ ...state, [key]: Math.max(0, value) })
  }

  const plans: SubscriptionPlan[] = ['free', 'pro', 'team', 'enterprise']

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div>
        <label className="text-sm font-semibold text-muted-foreground mb-4 block">
          Select Your Subscription Plan
        </label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {plans.map((plan) => (
            <button
              key={plan}
              onClick={() => handlePlanChange(plan)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                state.plan === plan
                  ? 'border-accent bg-accent/10 bg-accent text-accent-foreground'
                  : 'border-border bg-card/50 hover:border-accent/50'
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-sm">{PLAN_LABELS[plan]}</div>
                <div className="text-xs opacity-75 mt-2">{PLAN_DESCRIPTIONS[plan]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Compute Usage */}
      <div>
        <label className="text-sm font-semibold text-muted-foreground mb-4 block">
          Compute Usage (Hours)
        </label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">2-Core Machine</label>
            <input
              type="number"
              min="0"
              value={state.hours2Core}
              onChange={(e) => handleInputChange('hours2Core', Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">4-Core Machine</label>
            <input
              type="number"
              min="0"
              value={state.hours4Core}
              onChange={(e) => handleInputChange('hours4Core', Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">8-Core Machine</label>
            <input
              type="number"
              min="0"
              value={state.hours8Core}
              onChange={(e) => handleInputChange('hours8Core', Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Storage Usage */}
      <div>
        <label className="text-sm font-semibold text-muted-foreground mb-4 block">
          Storage Usage
        </label>
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Storage (GB-Month)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={state.storageGbMonth}
            onChange={(e) => handleInputChange('storageGbMonth', Number(e.target.value))}
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Enter the average repository size in GB multiplied by the number of active hours (or
            total GB-hours)
          </p>
        </div>
      </div>
    </div>
  )
}
