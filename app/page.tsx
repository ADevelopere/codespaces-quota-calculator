'use client'

import { useState } from 'react'
import { InputSection } from '@/components/input-section'
import { ResultsDisplay } from '@/components/results-display'
import type { CalculatorState } from '@/lib/types'

export default function Home() {
  const [state, setState] = useState<CalculatorState>({
    plan: 'free',
    hours2Core: 0,
    hours4Core: 0,
    hours8Core: 0,
    storageGbMonth: 0,
  })

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 border border-accent/30">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">GitHub Codespaces Quota Calculator</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                Estimate your monthly usage, remaining quota, and potential overage costs
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Input Section */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Configuration</h2>
              <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6">
                <InputSection state={state} onStateChange={setState} />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Results</h2>
              <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6">
                <ResultsDisplay state={state} />
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-border">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">Core-Hour Multipliers</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>• 1 hour on 2-core = 2 core-hours</li>
              <li>• 1 hour on 4-core = 4 core-hours</li>
              <li>• 1 hour on 8-core = 8 core-hours</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">Pricing (Per Overage)</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>• 2-core: $0.18/hour</li>
              <li>• 4-core: $0.36/hour</li>
              <li>• 8-core: $0.72/hour</li>
              <li>• Storage: $0.07/GB-month</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">Free Quotas</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>• Free: 120 core-hrs/mo</li>
              <li>• Pro: 180 core-hrs/mo</li>
              <li>• Team: Custom (pay-as-go)</li>
              <li>• Enterprise: Custom</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            This calculator uses the pricing and quotas as of early 2026. Visit{' '}
            <a
              href="https://github.com/features/codespaces"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub Codespaces
            </a>{' '}
            for the most current information.
          </p>
        </div>
      </footer>
    </main>
  )
}
