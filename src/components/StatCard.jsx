import React from 'react'
export default function StatCard({ icon: Icon, label, value, hint, tone = 'blue' }) {
  return <div className={`stat-card tone-${tone}`}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={17}/></span></div><strong>{value}</strong><small>{hint}</small></div>
}