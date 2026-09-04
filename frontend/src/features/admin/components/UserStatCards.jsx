import React from 'react'
import { Users, UserCheck, Shield, Zap } from 'lucide-react'

/**
 * UserStatCards — Four summary cards displayed at the top of the Users page.
 *
 * Each card shows:
 * - An icon
 * - A label
 * - A large number
 * - A sub-label (trend indicators are static/disabled per scope)
 *
 * @param {Object} props
 * @param {number} props.totalUsers
 * @param {number} props.activeUsers
 * @param {number} props.adminCount
 * @param {number} props.newThisMonth
 */

const statCards = [
  {
    key: 'total',
    label: 'Total Users',
    icon: Users,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    getValue: (p) => p.totalUsers,
    subLabel: '+12% from last month',
    subIcon: '↗',
    subColor: 'text-primary',
  },
  {
    key: 'active',
    label: 'Active Users',
    icon: UserCheck,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    getValue: (p) => p.activeUsers,
    subLabel: '94.1% engagement rate',
    subIcon: '⊘',
    subColor: 'text-primary',
  },
  {
    key: 'admins',
    label: 'Admins & Staff',
    icon: Shield,
    iconBg: 'bg-on-surface/10',
    iconColor: 'text-on-surface',
    getValue: (p) => p.adminCount,
    subLabel: 'Across 4 permission groups',
    subIcon: null,
    subColor: 'text-on-surface-variant',
  },
  {
    key: 'new',
    label: 'New This Month',
    icon: Zap,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    getValue: (p) => p.newThisMonth,
    subLabel: '+8.4% velocity',
    subIcon: '↗',
    subColor: 'text-primary',
  },
]

const UserStatCards = ({ totalUsers = 0, activeUsers = 0, adminCount = 0, newThisMonth = 0 }) => {
  const props = { totalUsers, activeUsers, adminCount, newThisMonth }

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {statCards.map(({ key, label, icon: Icon, iconBg, iconColor, getValue, subLabel, subIcon, subColor }) => (
        <div
          key={key}
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-5 py-4"
        >
          {/* Top row: label + icon */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-on-surface-variant">{label}</span>
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
              <Icon size={16} className={iconColor} />
            </div>
          </div>

          {/* Large number */}
          <p className="text-3xl font-bold text-on-surface mb-1">
            {getValue(props).toLocaleString()}
          </p>

          {/* Sub-label (trend indicators are static per scope) */}
          <p className={`text-xs ${subColor} flex items-center gap-1`}>
            {subIcon && <span>{subIcon}</span>}
            {subLabel}
          </p>
        </div>
      ))}
    </div>
  )
}

export default UserStatCards
