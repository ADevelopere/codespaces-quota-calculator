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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">GitHub Codespaces Quota Calculator</h1>
            <p className="text-muted-foreground mt-1">
              Estimate your monthly usage, remaining quota, and potential overage costs
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">Configuration</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <InputSection state={state} onStateChange={setState} />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">Results</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <ResultsDisplay state={state} />
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border">
          <div className="space-y-2">
            <h3 className="font-semibold">Core-Hour Multipliers</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 1 hour on 2-core = 2 core-hours</li>
              <li>• 1 hour on 4-core = 4 core-hours</li>
              <li>• 1 hour on 8-core = 8 core-hours</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Pricing (Per Overage)</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 2-core: $0.18/hour</li>
              <li>• 4-core: $0.36/hour</li>
              <li>• 8-core: $0.72/hour</li>
              <li>• Storage: $0.07/GB-month</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Free Quotas</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Free: 120 core-hrs/mo</li>
              <li>• Pro: 180 core-hrs/mo</li>
              <li>• Team: Custom (pay-as-go)</li>
              <li>• Enterprise: Custom</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-muted-foreground text-center">
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
