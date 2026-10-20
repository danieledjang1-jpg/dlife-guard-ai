import React, { useState } from "react";
import {
  Bot,
  HeartPulse,
  BellRing,
  Users,
  ChartNoAxesCombined,
  Settings,
  Wifi,
  BatteryCharging,
  CheckCircle2,
  Plus,
  Save,
  ShieldCheck,
  Clock3,
  Phone,
  Mail,
  Activity,
  Download,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import RobotCompanion from "../components/RobotCompanion";
import ChatPanel from "../components/ChatPanel";

function PageHeader({ kicker, title, description, action }) {
  return (
    <div className="section-page-header">
      <div>
        <span className="section-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
function RobotPage({ lifePercent, connected }) {
  return (
    <div className="page-content">
      <PageHeader
        kicker="COMPANION"
        title="Robot companion"
        description="Meet your animated DLife companion and inspect simulated device status."
      />
      <div className="single-feature-grid">
        <RobotCompanion
          lifePercent={lifePercent}
          connected={connected}
          onAsk={() => window.dispatchEvent(new Event("dlife-focus-chat"))}
        />
        <section className="panel device-details">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">DEVICE DETAILS</span>
              <h2>DL-CORE-001</h2>
            </div>
            <span className="status-pill status-good">Demo device</span>
          </div>
          <div className="device-visual">
            <div className="device-orb">
              <Bot size={35} />
            </div>
            <div>
              <b>DLife Personal Companion</b>
              <p>Virtual robot model · Browser simulation</p>
            </div>
          </div>
          {[
            ["Connection", "Connected (simulated)", Wifi],
            ["Battery", "96% (simulated)", BatteryCharging],
            ["Core status", "Running demo mode", Activity],
            ["Last sync", "Just now", RefreshCw],
          ].map(([a, b, I]) => (
            <div className="detail-row" key={a}>
              <span>
                <I size={16} />
                {a}
              </span>
              <b>{b}</b>
            </div>
          ))}
          <div className="info-callout">
            <ShieldCheck size={18} />
            <p>
              No physical robot or real sensor is connected. This page
              demonstrates the interface only.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
function WellbeingPage() {
  const [mood, setMood] = useState("Okay");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <div className="page-content">
      <PageHeader
        kicker="PERSONAL WELLBEING"
        title="How are you feeling?"
        description="A private moment to pause. There are no right or wrong answers."
      />
      <section className="panel wellbeing-form">
        <div className="wellbeing-illustration">
          <div className="wellbeing-heart">
            <HeartPulse size={44} />
          </div>
          <h2>Check in with yourself</h2>
          <p>Take a breath. Notice how you feel, without judging yourself.</p>
        </div>
        <h3>How would you describe your mood right now?</h3>
        <div className="mood-options">
          {[
            ["Great", "☀️"],
            ["Good", "😊"],
            ["Okay", "😌"],
            ["Low", "🌧️"],
            ["Overwhelmed", "🌊"],
          ].map(([label, emoji]) => (
            <button
              className={mood === label ? "mood-selected" : ""}
              key={label}
              onClick={() => {
                setMood(label);
                setSaved(false);
              }}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
        <label className="note-label">
          Anything you'd like to note? <span>Optional</span>
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setSaved(false);
            }}
            placeholder="Write a little about what's on your mind..."
            rows="4"
          />
        </label>
        <button
          className="primary-button"
          onClick={() => {
            localStorage.setItem(
              "dlife-last-checkin",
              JSON.stringify({ mood, note, at: new Date().toISOString() }),
            );
            setSaved(true);
          }}
        >
          <CheckCircle2 size={17} /> Save check-in
        </button>
        {saved && (
          <div className="success-message">
            <CheckCircle2 size={17} /> Your demo check-in has been saved in this
            browser. Thank you for taking a moment for yourself.
          </div>
        )}
        <div className="info-callout">
          <ShieldCheck size={18} />
          <p>
            This check-in is not a diagnosis or a risk assessment. If you're in
            immediate danger, seek urgent local human help.
          </p>
        </div>
      </section>
    </div>
  );
}
function AlertsPage() {
  const [resolved, setResolved] = useState([]);

  const data = [
    [
      "Reminder",
      "Take a short break",
      "A gentle reminder to pause and stretch.",
      "blue",
    ],
    [
      "Wellbeing check-in",
      "Check in when you're ready",
      "You can take a moment to note how you feel.",
      "green",
    ],
  ];

  return (
    <div className="page-content">
      <PageHeader
        kicker="NOTIFICATIONS"
        title="Alerts & check-ins"
        description="Gentle reminders and demo notifications. No real monitoring is active."
      />
      <section className="panel alerts-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">DEMO INBOX</span>
            <h2>{data.length - resolved.length} items to review</h2>
          </div>
          <span className="status-pill status-good">No live alerts</span>
        </div>
        {data
          .filter((_, i) => !resolved.includes(i))
          .map((d) => {
            const idx = data.indexOf(d);
            return (
              <div className="alert-row" key={d[0]}>
                <span className={`alert-symbol alert-${d[3]}`}>
                  <BellRing size={18} />
                </span>
                <div className="alert-copy">
                  <b>{d[1]}</b>
                  <p>{d[2]}</p>
                  <small>
                    <Clock3 size={13} /> Sample notification · Today
                  </small>
                </div>
                <button
                  className="secondary-button"
                  onClick={() => setResolved((v) => [...v, idx])}
                >
                  Mark reviewed
                </button>
              </div>
            );
          })}
        {resolved.length === data.length && (
          <div className="empty-state">
            <CheckCircle2 size={27} />
            <b>You're all caught up</b>
            <p>There are no demo notifications left to review.</p>
            <button className="text-button" onClick={() => setResolved([])}>
              Restore demo alerts
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
function ContactsPage() {
  const [contacts, setContacts] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("dlife-contacts")) || [
          {
            name: "My trusted person",
            relation: "Trusted contact",
            phone: "",
            email: "",
          },
        ]
      );
    } catch {
      return [];
    }
  });
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    name: "",
    relation: "Trusted contact",
    phone: "",
    email: "",
  });
  function save() {
    if (!form.name.trim()) return;
    const next = [...contacts, form];
    setContacts(next);
    localStorage.setItem("dlife-contacts", JSON.stringify(next));
    setForm({ name: "", relation: "Trusted contact", phone: "", email: "" });
    setAdding(false);
  }
  return (
    <div className="page-content">
      <PageHeader
        kicker="YOUR PEOPLE"
        title="Support network"
        description="Keep the details of people you choose to contact when you need support."
        action={
          <button className="primary-button" onClick={() => setAdding(!adding)}>
            <Plus size={17} /> Add contact
          </button>
        }
      />
      {adding && (
        <section className="panel add-contact-form">
          <h2>Add a trusted contact</h2>
          <div className="form-grid">
            <label>
              Full name
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contact name"
              />
            </label>
            <label>
              Relationship
              <input
                value={form.relation}
                onChange={(e) => setForm({ ...form, relation: e.target.value })}
                placeholder="e.g. Friend, family"
              />
            </label>
            <label>
              Phone number
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Optional"
              />
            </label>
            <label>
              Email
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Optional"
              />
            </label>
          </div>
          <button className="primary-button" onClick={save}>
            <Save size={16} /> Save contact
          </button>
        </section>
      )}
      <div className="contacts-grid">
        {contacts.map((c, i) => (
          <section className="panel contact-card" key={`${c.name}-${i}`}>
            <div className="contact-avatar">
              {c.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="contact-main">
              <h3>{c.name}</h3>
              <p>{c.relation || "Trusted contact"}</p>
              {c.phone && (
                <span>
                  <Phone size={14} />
                  {c.phone}
                </span>
              )}
              {c.email && (
                <span>
                  <Mail size={14} />
                  {c.email}
                </span>
              )}
            </div>
            <button
              className="icon-button subtle-icon"
              onClick={() => {
                const n = contacts.filter((_, j) => j !== i);
                setContacts(n);
                localStorage.setItem("dlife-contacts", JSON.stringify(n));
              }}
              title="Remove contact"
            >
              ×
            </button>
          </section>
        ))}
      </div>
      <div className="info-callout">
        <ShieldCheck size={18} />
        <p>
          Contacts are stored locally in this browser for this demo. No message
          or call is sent automatically.
        </p>
      </div>
    </div>
  );
}
function ReportsPage() {
  return (
    <div className="page-content">
      <PageHeader
        kicker="INSIGHTS"
        title="Insights & reports"
        description="Illustrative interface for personal routines and system activity."
      />
      <div className="stats-grid">
        <div className="stat-card tone-green">
          <div className="stat-top">
            <span>Check-ins saved</span>
            <HeartPulse size={17} />
          </div>
          <strong>
            {localStorage.getItem("dlife-last-checkin") ? "1" : "0"}
          </strong>
          <small>This browser session</small>
        </div>
        <div className="stat-card tone-blue">
          <div className="stat-top">
            <span>Assistant sessions</span>
            <MessageIcon />
          </div>
          <strong>4</strong>
          <small>Illustrative sample</small>
        </div>
        <div className="stat-card tone-purple">
          <div className="stat-top">
            <span>Robot uptime</span>
            <Bot size={17} />
          </div>
          <strong>99.2%</strong>
          <small>Mock data only</small>
        </div>
        <div className="stat-card tone-amber">
          <div className="stat-top">
            <span>Data source</span>
            <Activity size={17} />
          </div>
          <strong>Demo</strong>
          <small>No live health readings</small>
        </div>
      </div>
      <section className="panel report-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">WEEKLY OVERVIEW</span>
            <h2>Activity trend</h2>
          </div>
          <button
            className="secondary-button"
            onClick={() => {
              const report = {
                product: "DLife Guard AI",
                createdAt: new Date().toISOString(),
                note: "Demo-only report; not medical data.",
                checkin: localStorage.getItem("dlife-last-checkin") || null,
              };
              const blob = new Blob([JSON.stringify(report, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "dlife-demo-report.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download size={16} /> Export demo report
          </button>
        </div>
        <div className="bars-chart">
          {[45, 64, 50, 78, 58, 84, 70].map((h, i) => (
            <div className="bar-column" key={i}>
              <div className="bar-track">
                <span style={{ height: `${h}%` }} />
              </div>
              <small>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </small>
            </div>
          ))}
        </div>
        <p className="chart-caption">
          Decorative sample activity — not a wellbeing or suicide-risk
          prediction.
        </p>
      </section>
    </div>
  );
}
function MessageIcon() {
  return <BellRing size={17} />;
}
function SettingsPage({
  lifePercent,
  setLifePercent,
  connected,
  setConnected,
}) {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(() => ({
    motion: localStorage.getItem("dlife-motion") !== "false",
    notifications: localStorage.getItem("dlife-notifications") !== "false",
    privacy: true,
  }));
  return (
    <div className="page-content">
      <PageHeader
        kicker="PREFERENCES"
        title="Settings"
        description="Personalise this prototype. Changes are saved in your browser."
      />
      <div className="settings-layout">
        <section className="panel settings-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">PREFERENCES</span>
              <h2>General settings</h2>
            </div>
          </div>
          {[
            [
              "Animation effects",
              "motion",
              "Smooth robot movement and transitions",
            ],
            [
              "In-app notifications",
              "notifications",
              "Show demo reminders in the workspace",
            ],
            ["Privacy mode", "privacy", "Keep demo data in this browser"],
          ].map(([label, key, desc]) => (
            <div className="setting-row" key={key}>
              <div>
                <b>{label}</b>
                <p>{desc}</p>
              </div>
              <button
                className={`toggle ${settings[key] ? "toggle-on" : ""}`}
                onClick={() => {
                  const next = { ...settings, [key]: !settings[key] };
                  setSettings(next);
                  if (key === "motion")
                    localStorage.setItem("dlife-motion", String(next[key]));
                  if (key === "notifications")
                    localStorage.setItem(
                      "dlife-notifications",
                      String(next[key]),
                    );
                  document.body.classList.toggle("reduce-motion", !next.motion);
                  setSaved(false);
                }}
                aria-label={`Toggle ${label}`}
              >
                <i />
              </button>
            </div>
          ))}
          <div className="setting-row">
            <div>
              <b>Simulated life meter</b>
              <p>Adjust the visual percentage shown in the robot heart.</p>
            </div>
            <div className="meter-control">
              <input
                type="range"
                min="65"
                max="100"
                value={lifePercent}
                onChange={(e) => {
                  setLifePercent(Number(e.target.value));
                  setSaved(false);
                }}
              />
              <b>{lifePercent}%</b>
            </div>
          </div>
          <div className="setting-row">
            <div>
              <b>Simulated robot connection</b>
              <p>Toggle the demo status badge.</p>
            </div>
            <button
              className={`toggle ${connected ? "toggle-on" : ""}`}
              onClick={() => {
                setConnected(!connected);
                setSaved(false);
              }}
            >
              <i />
            </button>
          </div>
          <button
            className="primary-button"
            onClick={() => {
              localStorage.setItem("dlife-settings", JSON.stringify(settings));
              setSaved(true);
            }}
          >
            <Save size={16} /> Save settings
          </button>
          {saved && (
            <div className="success-message">
              <CheckCircle2 size={16} /> Settings saved locally.
            </div>
          )}
        </section>
        <section className="panel privacy-panel">
          <span className="privacy-icon">
            <ShieldCheck size={23} />
          </span>
          <h2>Privacy & safety</h2>
          <p>
            This prototype keeps its demo profile, check-in, contacts, and
            preferences in browser storage.
          </p>
          <ul>
            <li>Do not enter sensitive medical information.</li>
            <li>Authentication is not secure production login.</li>
            <li>No real emergency alert is sent.</li>
            <li>Remove browser storage to clear local demo data.</li>
          </ul>
          <div className="info-callout">
            <ShieldCheck size={18} />
            <p>
              Before a real launch, we must add secure server authentication,
              consent management, encryption, and human-supervised safety
              workflows.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
export {
  RobotPage,
  WellbeingPage,
  AlertsPage,
  ContactsPage,
  ReportsPage,
  SettingsPage,
};
