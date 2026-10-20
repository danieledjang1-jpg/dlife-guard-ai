import React from 'react'
import { Activity, Bot, BellRing, MessageCircle, HeartPulse, ArrowUpRight, CalendarDays, CheckCircle2, CircleHelp, Zap } from 'lucide-react'
import StatCard from '../components/StatCard'
import RobotCompanion from '../components/RobotCompanion'
import ChatPanel from '../components/ChatPanel'

export default function Overview({ user, lifePercent, connected, setPage }) {
  const activities = [
    {icon: CheckCircle2, tone:'green', title:'Daily check-in completed', desc:'You completed a demo wellbeing check-in.', time:'9:12 AM'},
    {icon: MessageCircle, tone:'blue', title:'Assistant conversation', desc:'You explored learning and daily planning.', time:'Yesterday'},
    {icon: CircleHelp, tone:'amber', title:'Reminder available', desc:'Take a short break and check how you feel.', time:'Yesterday'},
  ]
  return <div className="page-content">
    <div className="welcome-row"><div><div className="eyebrow"><span className="live-dot"/> YOUR PERSONAL SPACE</div><h1>Good morning, {user?.name?.split(' ')[0] || 'Daniel'} <span className="wave">✦</span></h1><p>Here's your DLife overview. One small step at a time.</p></div><button className="date-pill"><CalendarDays size={16}/>{new Date().toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}</button></div>
    <div className="demo-banner"><span className="banner-icon"><Zap size={17}/></span><div><b>Prototype environment</b><p>All robot readings, connection states, alerts, and wellbeing metrics are simulated sample data.</p></div><span className="banner-tag">DEMO</span></div>
    <div className="stats-grid">
      <StatCard icon={HeartPulse} label="Demo life meter" value={`${lifePercent}%`} hint="Visual simulation only" tone="green"/>
      <StatCard icon={Bot} label="Robot connection" value={connected?'Online':'Checking'} hint={connected?'Personal link active':'Reconnecting demo'} tone="blue"/>
      <StatCard icon={BellRing} label="Open check-ins" value="2" hint="Review when convenient" tone="amber"/>
      <StatCard icon={MessageCircle} label="Assistant chats" value="4" hint="Conversations this week" tone="purple"/>
    </div>
    <div className="overview-grid"><RobotCompanion lifePercent={lifePercent} connected={connected} onAsk={()=>setPage('assistant')}/><ChatPanel/></div>
    <div className="bottom-grid">
      <section className="panel activity-panel"><div className="panel-heading"><div><span className="section-kicker">YOUR SPACE</span><h2>Recent activity</h2></div><button className="text-button" onClick={()=>setPage('alerts')}>View all <ArrowUpRight size={15}/></button></div><div className="activity-list">{activities.map((a,i)=><div className="activity-item" key={i}><span className={`activity-icon activity-${a.tone}`}><a.icon size={17}/></span><div className="activity-copy"><b>{a.title}</b><p>{a.desc}</p></div><time>{a.time}</time></div>)}</div></section>
      <section className="panel quick-panel"><div className="panel-heading"><div><span className="section-kicker">QUICK ACTIONS</span><h2>What do you need?</h2></div></div><div className="quick-actions"><button onClick={()=>setPage('assistant')}><span className="quick-icon quick-blue"><MessageCircle size={18}/></span><span><b>Ask DLife</b><small>Ask a question or brainstorm</small></span><ArrowUpRight size={16}/></button><button onClick={()=>setPage('wellbeing')}><span className="quick-icon quick-green"><HeartPulse size={18}/></span><span><b>Check in with myself</b><small>Pause and reflect for a moment</small></span><ArrowUpRight size={16}/></button><button onClick={()=>setPage('contacts')}><span className="quick-icon quick-purple"><CircleHelp size={18}/></span><span><b>My support people</b><small>View trusted contacts</small></span><ArrowUpRight size={16}/></button></div></section>
    </div>
  </div>
}