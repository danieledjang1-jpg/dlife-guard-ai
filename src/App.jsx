import React, { useEffect, useState } from 'react'
import { Bell, Search, CircleHelp, ChevronDown, Sparkles, HeartPulse, ArrowUpRight } from 'lucide-react'
import SplashScreen from './components/SplashScreen'
import Sidebar from './components/Sidebar'
import ChatPanel from './components/ChatPanel'
import Overview from './pages/Overview'
import { RobotPage, WellbeingPage, AlertsPage, ContactsPage, ReportsPage, SettingsPage } from './pages/Sections'

const pageMeta = {
  overview:['Overview','Your personal dashboard'],
  assistant:['AI Assistant','A place to ask, learn, and think out loud'],
  robot:['Robot companion','Your animated personal companion'],
  wellbeing:['Wellbeing','Take a moment for yourself'],
  alerts:['Alerts & check-ins','Gentle reminders and activity'],
  contacts:['Support network','Your chosen people'],
  reports:['Insights & reports','Illustrative activity summaries'],
  settings:['Settings','Personalise your DLife space'],
}
export default function App() {
  const [user,setUser] = useState(()=>localStorage.getItem('dlife-session') ? {name:localStorage.getItem('dlife-name')||'Daniel',email:localStorage.getItem('dlife-email')||''} : null)
  const [active,setActive] = useState('overview')
  const [mobileOpen,setMobileOpen] = useState(false)
  const [lifePercent,setLifePercent] = useState(()=>Number(localStorage.getItem('dlife-life-meter')||92))
  const [connected,setConnected] = useState(true)
  const [search,setSearch] = useState('')
  const [showNotifications,setShowNotifications] = useState(false)
  const [showHelp,setShowHelp] = useState(false)
  useEffect(()=>{localStorage.setItem('dlife-life-meter',String(lifePercent))},[lifePercent])
  useEffect(()=>{document.body.classList.toggle('reduce-motion',localStorage.getItem('dlife-motion')==='false')},[])
  useEffect(()=>{const h=()=>setActive('wellbeing');window.addEventListener('dlife-checkin',h);return()=>window.removeEventListener('dlife-checkin',h)},[])
  function logout(){localStorage.removeItem('dlife-session');setUser(null);setActive('overview')}
  if(!user) return <SplashScreen onLogin={setUser}/>
  const title = pageMeta[active]?.[0] || 'Overview'
  function content(){
    if(active==='overview') return <Overview user={user} lifePercent={lifePercent} connected={connected} setPage={setActive}/>
    if(active==='assistant') return <div className="page-content"><div className="section-page-header"><div><span className="section-kicker">YOUR PERSONAL AI</span><h1>Ask DLife anything.</h1><p>Learn a skill, explore an idea, or organise your next step.</p></div><span className="status-pill status-good"><Sparkles size={14}/> Ready in demo mode</span></div><div className="assistant-page-grid"><div className="assistant-intro panel"><div className="assistant-orb"><HeartPulse size={38}/></div><h2>How can I help today?</h2><p>I'm your personal assistant for questions, learning, planning, and supportive conversation.</p><div className="prompt-cards">{[['🧠','Help me understand something','Break a topic into easy steps.'],['💻','Help me build software','Plan a project and write starter code.'],['🗓️','Help me organise my day','Turn goals into a practical plan.']].map(([e,t,d])=><button key={t} onClick={()=>{setSearch(t);window.dispatchEvent(new Event('dlife-focus-chat'))}}><span>{e}</span><b>{t}</b><small>{d}</small><ArrowUpRight size={15}/></button>)}</div><div className="info-callout"><CircleHelp size={18}/><p>Responses here are simulated. Connect a trusted AI provider in a later development phase for live answers.</p></div></div><ChatPanel full/></div></div>
    if(active==='robot') return <RobotPage lifePercent={lifePercent} connected={connected}/>
    if(active==='wellbeing') return <WellbeingPage/>
    if(active==='alerts') return <AlertsPage/>
    if(active==='contacts') return <ContactsPage/>
    if(active==='reports') return <ReportsPage/>
    if(active==='settings') return <SettingsPage lifePercent={lifePercent} setLifePercent={setLifePercent} connected={connected} setConnected={setConnected}/>
    return null
  }
  return <div className="app-shell"><Sidebar active={active} onNavigate={setActive} user={user} onLogout={logout} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/><main className="main-shell"><header className="topbar"><div className="topbar-title"><span className="topbar-kicker">DLIFE WORKSPACE</span><b>{title}</b></div><div className="topbar-actions"><label className="global-search"><Search size={16}/><input placeholder="Search this workspace..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&search.trim()){setActive('assistant');window.dispatchEvent(new Event('dlife-focus-chat'))}}}/><kbd>↵</kbd></label><button className="top-icon" onClick={()=>setShowNotifications(!showNotifications)} title="Notifications"><Bell size={18}/><i/></button><button className="top-icon" onClick={()=>setShowHelp(!showHelp)} title="Help"><CircleHelp size={18}/></button><button className="top-user" onClick={()=>setActive('settings')}><span className="profile-avatar">{user.name.slice(0,1).toUpperCase()}</span><span><b>{user.name}</b><small>Personal account</small></span><ChevronDown size={14}/></button></div>{showNotifications&&<div className="top-popover"><b>You're all caught up</b><p>There are no live alerts. Demo reminders are available under Alerts & Check-ins.</p><button className="text-button" onClick={()=>{setActive('alerts');setShowNotifications(false)}}>View reminders <ArrowUpRight size={14}/></button></div>}{showHelp&&<div className="top-popover help-popover"><b>Welcome to DLife Guard AI</b><p>This prototype demonstrates a personal assistant dashboard. Sensor readings and the robot life meter are simulated.</p><button className="text-button" onClick={()=>{setActive('settings');setShowHelp(false)}}>View privacy & safety <ArrowUpRight size={14}/></button></div>}</header><div className="main-scroll">{content()}<footer className="app-footer"><span>© {new Date().getFullYear()} DLife Guard AI</span><span><i className="live-dot"/> Prototype mode · Not for emergency use</span></footer></div></main></div>
}