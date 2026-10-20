import React from 'react'
import { HeartPulse, Wifi, Mic, Volume2, BatteryCharging, Sparkles } from 'lucide-react'

export default function RobotCompanion({ lifePercent, connected, onAsk }) {
  return <section className="robot-card panel">
    <div className="panel-heading"><div><span className="section-kicker">YOUR COMPANION</span><h2>DLife Robot</h2></div><span className={`status-pill ${connected ? 'status-good' : 'status-warn'}`}><span className="live-dot"/>{connected ? 'Connected' : 'Reconnecting'}</span></div>
    <div className="robot-stage">
      <div className="robot-halo halo-a"/><div className="robot-halo halo-b"/>
      <div className="robot">
        <div className="robot-antenna"><span/></div>
        <div className="robot-head">
          <div className="robot-ear ear-left"/><div className="robot-ear ear-right"/>
          <div className="robot-face">
            <div className="robot-eyes"><span className="robot-eye"/><span className="robot-eye"/></div>
            <div className="robot-smile"/>
            <span className="face-glint"/>
          </div>
        </div>
        <div className="robot-neck"/>
        <div className="robot-body">
          <div className="chest-glass">
            <div className="chest-top"><span className="chip-led"/><span>DLIFE CORE <b>• CONNECTED</b></span></div>
            <div className="chest-heart"><HeartPulse className="heart-icon" size={24}/><strong>{lifePercent}%</strong><small>DEMO LIFE METER</small></div>
            <div className="chest-photo"><img src="/daniel-avatar.jpeg" alt="Your chosen personal avatar" onError={e=>{e.currentTarget.style.display='none'}}/><span className="photo-caption">PERSONAL LINK</span></div>
            <div className="chip-lines"><i/><i/><i/><i/><i/></div>
          </div>
          <div className="body-light"/>
        </div>
        <div className="robot-arm arm-left"/><div className="robot-arm arm-right"/>
        <div className="robot-leg leg-left"/><div className="robot-leg leg-right"/>
      </div>
      <div className="floating-tag tag-heart"><HeartPulse size={15}/><span><b>{lifePercent}%</b><small>Life meter</small></span></div>
      <div className="floating-tag tag-link"><span className="link-wave"><Wifi size={15}/></span><span><b>Personal link</b><small>{connected ? 'Signal stable' : 'Checking signal'}</small></span></div>
      <div className="robot-ground"/>
    </div>
    <div className="robot-caption"><div><h3>Hello, {localStorage.getItem('dlife-name') || 'Daniel'} 👋</h3><p>I'm here to help you learn, plan, and talk things through.</p></div><span className="battery"><BatteryCharging size={16}/> 96%</span></div>
    <div className="robot-actions"><button className="secondary-button" onClick={onAsk}><Sparkles size={16}/> Ask assistant</button><button className="secondary-button" onClick={()=>window.dispatchEvent(new Event('dlife-checkin'))}><Mic size={16}/> Start check-in</button><button className="round-button" title="Voice is simulated in this prototype" onClick={()=>alert('Voice interaction will be connected in a future version.')}><Volume2 size={17}/></button></div>
    <p className="prototype-warning">Demo only: the life meter, heart chip, connection and battery are visual simulations. They do not measure or predict real human life or health.</p>
  </section>
}