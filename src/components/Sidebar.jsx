import React from 'react'
import { LayoutDashboard, Bot, MessageCircle, HeartPulse, BellRing, Users, ChartNoAxesCombined, Settings, ShieldCheck, LogOut, Menu } from 'lucide-react'
import Logo from './Logo'

const items = [
  ['Overview', 'overview', LayoutDashboard],
  ['AI Assistant', 'assistant', MessageCircle],
  ['Robot Companion', 'robot', Bot],
  ['Wellbeing', 'wellbeing', HeartPulse],
  ['Alerts & Check-ins', 'alerts', BellRing],
  ['People & Contacts', 'contacts', Users],
  ['Insights & Reports', 'reports', ChartNoAxesCombined],
  ['Settings', 'settings', Settings],
]
export default function Sidebar({ active, onNavigate, user, onLogout, mobileOpen, setMobileOpen }) {
  return <>
    <button className="mobile-menu-button" onClick={()=>setMobileOpen(!mobileOpen)}><Menu size={20}/></button>
    {mobileOpen && <div className="mobile-scrim" onClick={()=>setMobileOpen(false)}/>}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand"><Logo/></div>
      <div className="sidebar-label">WORKSPACE</div>
      <nav>{items.map(([label,id,Icon])=><button key={id} className={`nav-item ${active===id?'nav-active':''}`} onClick={()=>{onNavigate(id);setMobileOpen(false)}}><Icon size={18}/><span>{label}</span>{id==='alerts'&&<i className="nav-count">2</i>}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="sidebar-safe"><ShieldCheck size={17}/><div><b>Safety first</b><small>Human support matters</small></div></div>
        <div className="profile-row"><div className="profile-avatar">{(user?.name || 'D').slice(0,1).toUpperCase()}</div><div className="profile-info"><b>{user?.name || 'Daniel'}</b><small>Personal workspace</small></div><button className="logout-button" onClick={onLogout} title="Log out"><LogOut size={16}/></button></div>
      </div>
    </aside>
  </>
}