import { useState, useMemo } from 'react'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useAdvancedAnimations'

export function ROICalculator() {
  const [employees, setEmployees] = useState(3)
  const [avgSalary, setAvgSalary] = useState(400000)
  const [hoursPerTask, setHoursPerTask] = useState(20)
  const [ref, inView] = useInView<HTMLDivElement>()

  const annualCost = employees * avgSalary
  const tasksPerMonth = employees * 40
  const aiCost = 799 * 12 // Team plan annual
  const savings = annualCost - aiCost
  const hoursSaved = useCountUp(inView ? Math.round(employees * hoursPerTask * 12) : 0, 2000)
  const roi = useMemo(() => Math.round((savings / aiCost) * 100), [savings])

  return (
    <div
      ref={ref}
      className="rounded-2xl p-8 lg:p-10 mt-12"
      style={{
        background: 'rgba(12,14,19,0.8)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <h3
        className="font-bold text-white text-xl mb-2"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Calculate your savings
      </h3>
      <p className="text-white/35 text-sm mb-8">See how much you save by switching to AzoliK's AI workforce.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Employees slider */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Team members
            </span>
            <span className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {employees}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-none"
            style={{
              background: `linear-gradient(to right, #a78bfa ${(employees / 20) * 100}%, rgba(255,255,255,0.08) ${(employees / 20) * 100}%)`,
            }}
          />
        </div>

        {/* Salary slider */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Avg salary (₹/yr)
            </span>
            <span className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              ₹{(avgSalary / 100000).toFixed(1)}L
            </span>
          </label>
          <input
            type="range"
            min={200000}
            max={1500000}
            step={50000}
            value={avgSalary}
            onChange={(e) => setAvgSalary(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-none"
            style={{
              background: `linear-gradient(to right, #4fd1c5 ${(avgSalary / 1500000) * 100}%, rgba(255,255,255,0.08) ${(avgSalary / 1500000) * 100}%)`,
            }}
          />
        </div>

        {/* Hours per task */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Hours/task
            </span>
            <span className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {hoursPerTask}
            </span>
          </label>
          <input
            type="range"
            min={5}
            max={60}
            value={hoursPerTask}
            onChange={(e) => setHoursPerTask(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-none"
            style={{
              background: `linear-gradient(to right, #fb923c ${(hoursPerTask / 60) * 100}%, rgba(255,255,255,0.08) ${(hoursPerTask / 60) * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
        <div className="text-center">
          <p
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "'Outfit', sans-serif", color: '#34d399' }}
          >
            ₹{Math.round(savings / 1000)}K
          </p>
          <p className="text-white/30 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Annual savings
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "'Outfit', sans-serif", color: '#a78bfa' }}
          >
            {hoursSaved.toLocaleString()}h
          </p>
          <p className="text-white/30 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Hours freed
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "'Outfit', sans-serif", color: '#fb923c' }}
          >
            {roi > 999 ? '999+' : roi}%
          </p>
          <p className="text-white/30 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ROI
          </p>
        </div>
      </div>
    </div>
  )
}
