import React, { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, Bot, UserRound, RotateCcw } from 'lucide-react'

const welcome = { role: 'assistant', text: "Hi! I'm DLife, your personal AI assistant. You can ask me questions, plan your day, learn something new, or talk through what's on your mind. What would you like help with?" }
function replyTo(message) {
  const m = message.toLowerCase()
  if (/(suicid|kill myself|end my life|hurt myself|don't want to live)/.test(m)) return "I'm really sorry you're feeling this way, and I'm glad you told me. I can't assess your safety from a message alone, but you deserve support from a real person right now. Are you in immediate danger or have you already hurt yourself? If yes, contact local emergency services or go to the nearest emergency department, and if possible stay with someone you trust. I can help you think of a person to contact."
  if (/(hello|hi|hey|good morning|good evening)/.test(m)) return "Hello! 😊 I'm glad you're here. What would you like to work on today?"
  if (/(learn|study|code|react|javascript|developer)/.test(m)) return "Absolutely. We can break that into small, practical steps. Tell me your current level and what you want to build, and I'll help you create a clear plan with examples and practice tasks."
  if (/(sad|lonely|stress|anxious|overwhelmed|tired)/.test(m)) return "That sounds like a lot to carry. Thank you for sharing it with me. Would it help to tell me what has been weighing on you most? If this feels intense, reaching out to someone you trust or a qualified professional can also help."
  if (/(life percent|heart|chip|sensor|connected)/.test(m)) return "The heart meter and personal-link chip are visual demo elements right now. They don't measure your actual life, health, or safety. Later we can connect approved hardware and validated sensors for specific functions, with your consent."
  return "I can help you think this through. Here's a good starting point: define what outcome you want, list the information you already have, and tackle the next small step first. If you share a little more detail, I'll tailor my answer to your question."
}
export default function ChatPanel({ full = false }) {
  const [messages, setMessages] = useState(()=>{try{return JSON.parse(sessionStorage.getItem('dlife-chat')) || [welcome]}catch{return [welcome]}})
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)
  useEffect(()=>{sessionStorage.setItem('dlife-chat', JSON.stringify(messages));endRef.current?.scrollIntoView({behavior:'smooth'})},[messages,typing])
  useEffect(()=>{const handler=()=>document.getElementById('assistant-input')?.focus();window.addEventListener('dlife-focus-chat',handler);return()=>window.removeEventListener('dlife-focus-chat',handler)},[])
  function send(e) {
    e?.preventDefault()
    const text = draft.trim()
    if (!text || typing) return
    setMessages(prev=>[...prev,{role:'user',text}]); setDraft(''); setTyping(true)
    window.setTimeout(()=>{setMessages(prev=>[...prev,{role:'assistant',text:replyTo(text)}]);setTyping(false)},650)
  }
  function reset(){setMessages([welcome]);sessionStorage.removeItem('dlife-chat')}
  return <section className={`chat-panel panel ${full?'chat-full':''}`}>
    <div className="panel-heading"><div><span className="section-kicker">PERSONAL ASSISTANT</span><h2>Talk with DLife</h2></div><button className="icon-button subtle-icon" onClick={reset} title="Clear conversation"><RotateCcw size={16}/></button></div>
    <div className="chat-status"><span className="robot-mini"><Bot size={17}/></span><div><b>DLife Assistant</b><small><span className="live-dot"/> Available in demo mode</small></div><span className="demo-label">SIMULATED AI</span></div>
    <div className="chat-messages">{messages.map((msg,i)=><div key={i} className={`message-row ${msg.role==='user'?'message-user':''}`}><div className={`message-avatar ${msg.role==='user'?'user-avatar':''}`}>{msg.role==='user'?<UserRound size={16}/>:<Bot size={17}/>}</div><div className="message-bubble"><p>{msg.text}</p><small>{msg.role==='user'?'You':'DLife'} · {i===0?'Welcome':'Just now'}</small></div></div>)}{typing&&<div className="message-row"><div className="message-avatar"><Bot size={17}/></div><div className="message-bubble typing-bubble"><i/><i/><i/></div></div>}<div ref={endRef}/></div>
    <div className="suggestion-row">{['Help me plan my day','Teach me React','I need to talk'].map(t=><button key={t} onClick={()=>setDraft(t)}>{t}</button>)}</div>
    <form className="chat-composer" onSubmit={send}><input id="assistant-input" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Ask DLife anything..." aria-label="Message DLife"/><button className="send-button" type="submit" aria-label="Send message" disabled={!draft.trim()||typing}><Send size={17}/></button></form>
    <div className="chat-disclaimer">DLife is a prototype, not a clinician or emergency service. Responses are simulated and may be incorrect.</div>
  </section>
}