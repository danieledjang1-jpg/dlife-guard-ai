import React, { useState } from 'react'
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles, Eye, EyeOff } from 'lucide-react'
import Logo from './Logo'

export default function SplashScreen({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState(localStorage.getItem('dlife-name') || '')
  const [email, setEmail] = useState(localStorage.getItem('dlife-email') || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim() || (mode === 'signup' && !name.trim())) {
      setError('Please complete all required fields.')
      return
    }
    // Local-only prototype authentication. Do not use this as production security.
    localStorage.setItem('dlife-email', email.trim())
    localStorage.setItem('dlife-name', name.trim() || email.split('@')[0])
    localStorage.setItem('dlife-session', 'demo-session')
    onLogin({ name: name.trim() || email.split('@')[0], email: email.trim() })
  }

  return <main className="auth-shell">
    <div className="auth-glow glow-a"/><div className="auth-glow glow-b"/>
    <header className="auth-top"><Logo/><div className="secure-pill"><ShieldCheck size={15}/> Private demo space</div></header>
    <section className="auth-grid">
      <div className="auth-copy">
        <div className="eyebrow"><Sparkles size={14}/> YOUR PERSONAL AI COMPANION</div>
        <h1>Protect what matters.<br/><span>Stay connected to life.</span></h1>
        <p className="auth-lede">Meet your personal AI assistant — a calm, helpful companion designed to support your questions, wellbeing check-ins, and daily routines.</p>
        <div className="auth-points">
          <div><span className="point-icon"><HeartPulse size={19}/></span><div><b>Wellbeing at a glance</b><small>Understand your demo wellbeing status and check-ins.</small></div></div>
          <div><span className="point-icon"><Sparkles size={19}/></span><div><b>Ask your AI assistant</b><small>Get help with learning, planning, and everyday questions.</small></div></div>
          <div><span className="point-icon"><ShieldCheck size={19}/></span><div><b>Designed around you</b><small>Your profile and demo settings stay in this browser.</small></div></div>
        </div>
        <div className="auth-note"><span className="live-dot"/> Prototype mode <span className="note-divider"/> Sensors and life percentage are simulated.</div>
      </div>
      <div className="auth-card">
        <div className="card-orbit"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-core"><HeartPulse size={38}/></div></div>
        <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <p className="muted">{mode === 'login' ? 'Sign in to continue to your DLife space.' : 'Start your personal DLife Guard demo.'}</p>
        <form onSubmit={submit}>
          {mode === 'signup' && <label>Your name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" autoComplete="name"/></label>}
          <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"/></label>
          <label>Password<div className="password-wrap"><input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter any demo password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'}/><button type="button" className="icon-button" onClick={()=>setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-button full-button" type="submit">{mode === 'login' ? 'Enter DLife Guard AI' : 'Create demo account'} <ArrowRight size={17}/></button>
        </form>
        <div className="switch-auth">{mode === 'login' ? "New to DLife Guard AI?" : 'Already have an account?'} <button onClick={()=>{setMode(mode === 'login' ? 'signup' : 'login');setError('')}}>{mode === 'login' ? 'Create account' : 'Sign in'}</button></div>
        <div className="auth-foot"><ShieldCheck size={14}/> Demo authentication only — not production account security.</div>
      </div>
    </section>
    <footer className="auth-footer">DLife Guard AI <span>•</span> A prototype for compassionate, human-centred support</footer>
  </main>
}