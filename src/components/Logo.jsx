import React from 'react'
import { ShieldCheck, HeartPulse } from 'lucide-react'

export default function Logo({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}>
    <div className="brand-mark"><ShieldCheck size={25}/><HeartPulse className="brand-pulse" size={13}/></div>
    {!compact && <div><strong>DLife Guard AI</strong><span>COMPANION FOR LIFE</span></div>}
  </div>
}