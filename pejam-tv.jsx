import { useState, useEffect } from "react";

const C = {
  bg: "#0A0A0F", surface: "#12121A", card: "#1A1A26",
  border: "#2A2A40", accent: "#E63946", gold: "#F4A300",
  teal: "#00B4D8", text: "#F0EEF6", muted: "#8A8AA0",
  green: "#22C55E", purple: "#7B2FBE",
};

const plans = [
  { id: "baz", name: "Baz", price: 3, color: C.teal, emoji: "📺",
    features: ["Tout chanèl estanda", "Kwalite HD", "2 aparèy"] },
  { id: "plis", name: "PEJAM+", price: 7, color: C.gold, emoji: "⭐", popular: true,
    features: ["Tout chanèl + Premium", "4K Ultra HD", "5 aparèy", "Pa gen piblisite", "Achiv 30 jou"] },
  { id: "vip", name: "VIP", price: 15, color: C.accent, emoji: "👑",
    features: ["Tout sa ki nan PEJAM+", "Tikè evènman gratis x2/mwa", "Sipò prioritè", "Kontni eksklizyf"] },
];

const events = [
  { id: 1, title: "Konpa Festival 2025", date: "Sam 15 Jen", time: "20:00", price: 8, emoji: "🎵", sold: 342, total: 500, hot: true },
  { id: 2, title: "Foutbòl — Ayiti vs Janik", date: "Dim 16 Jen", time: "18:00", price: 5, emoji: "⚽", sold: 189, total: 300, hot: true },
  { id: 3, title: "Debate Politik Nasyonal", date: "Jed 20 Jen", time: "21:00", price: 3, emoji: "🎙️", sold: 78, total: 200, hot: false },
  { id: 4, title: "Kanaval Elektwonik PEJAM", date: "Sam 22 Jen", time: "22:00", price: 10, emoji: "🎭", sold: 456, total: 600, hot: true },
];

const channels = [
  { id: 1, name: "PEJAM 1", category: "Nouvèl", live: true, viewers: "12.4K", color: C.accent, emoji: "📺", premium: false },
  { id: 2, name: "PEJAM Mizik", category: "Mizik & Kilti", live: true, viewers: "8.1K", color: C.gold, emoji: "🎵", premium: false },
  { id: 3, name: "PEJAM Sport", category: "Espò", live: false, viewers: "5.7K", color: C.teal, emoji: "⚽", premium: true },
  { id: 4, name: "PEJAM Enfò", category: "Nouvèl & Politik", live: true, viewers: "9.3K", color: C.purple, emoji: "🗞️", premium: false },
  { id: 5, name: "PEJAM 4K Cinéma", category: "Sinema Premium", live: false, viewers: "3.2K", color: "#2EC4B6", emoji: "🎬", premium: true },
  { id: 6, name: "PEJAM Ayiti", category: "Kilti Ayisyen", live: true, viewers: "15.8K", color: "#FF6B35", emoji: "🇭🇹", premium: false },
];

function LiveBadge() {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setOn(v => !v), 800); return () => clearInterval(t); }, []);
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:C.accent, color:"#fff", fontSize:10, fontWeight:800, letterSpacing:1.5, padding:"2px 8px", borderRadius:3 }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:on?"#fff":"rgba(255,255,255,0.3)", transition:"background 0.3s" }} />
      DIRÈK
    </span>
  );
}

function AdBanner({ onClose }) {
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    if (countdown > 0) { const t = setTimeout(() => setCountdown(c => c - 1), 1000); return () => clearTimeout(t); }
  }, [countdown]);
  return (
    <div style={{ background:"linear-gradient(135deg,#1A1A26,#12121A)", border:`1.5px solid ${C.gold}44`, borderRadius:14, padding:"16px 18px", marginBottom:20, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 80% 50%,${C.gold}10,transparent 60%)`, pointerEvents:"none" }} />
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:50, height:50, borderRadius:10, background:C.gold+"22", border:`1px solid ${C.gold}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>📱</div>
        <div style={{ flex:1 }}>
          <div style={{ color:C.gold, fontSize:10, fontWeight:800, letterSpacing:2, marginBottom:3 }}>PIBLISITE • SPONSORED</div>
          <div style={{ color:C.text, fontWeight:700, fontSize:14, fontFamily:"serif" }}>MonCash — Voye Lajan Fasil</div>
          <div style={{ color:C.muted, fontSize:12 }}>Telechaje app la gratis. Voye lajan toupatou an Ayiti.</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
          <button onClick={() => countdown === 0 && onClose()} style={{ background:countdown===0?C.surface:"transparent", border:`1px solid ${countdown===0?C.border:"transparent"}`, color:countdown===0?C.muted:"transparent", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:countdown===0?"pointer":"default" }}>
            {countdown > 0 ? `Fèmen nan ${countdown}s` : "✕ Fèmen"}
          </button>
          <button style={{ background:C.gold, border:"none", color:"#000", borderRadius:6, padding:"5px 14px", fontSize:11, fontWeight:800, cursor:"pointer" }}>Aprann Plis →</button>
        </div>
      </div>
    </div>
  );
}

function SubscribeModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("plis");
  const [method, setMethod] = useState("moncash");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const plan = plans.find(p => p.id === selected);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 2200);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={onClose}>
      <div style={{ background:C.surface, borderRadius:20, border:`1.5px solid ${C.border}`, width:"100%", maxWidth:520, overflow:"hidden", boxShadow:"0 40px 80px rgba(0,0,0,0.7)", maxHeight:"90vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ background:`linear-gradient(135deg,${C.accent}22,${C.gold}11)`, padding:"20px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:1 }}>
          <div>
            <div style={{ fontFamily:"serif", fontWeight:900, fontSize:20, color:C.text }}>📺 Abònman PEJAM TV</div>
            <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>
              {step===1 && "Chwazi plan ou a"}{step===2 && `Plan ${plan.name} — $${plan.price}/mwa`}{step===3 && "Peman konfime!"}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, borderRadius:8, padding:"6px 12px", cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ padding:24 }}>
          {step===1 && (
            <div>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
                {plans.map(p => (
                  <div key={p.id} onClick={() => setSelected(p.id)} style={{ background:selected===p.id?p.color+"18":C.card, border:`2px solid ${selected===p.id?p.color:C.border}`, borderRadius:14, padding:"14px 16px", cursor:"pointer", transition:"all 0.2s", position:"relative" }}>
                    {p.popular && <span style={{ position:"absolute", top:-1, right:14, background:C.gold, color:"#000", fontSize:9, fontWeight:900, padding:"2px 8px", borderRadius:"0 0 6px 6px", letterSpacing:1 }}>PI POPILÈ</span>}
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ fontSize:28 }}>{p.emoji}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ color:C.text, fontWeight:700, fontSize:15, fontFamily:"serif" }}>{p.name}</div>
                        <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>{p.features.slice(0,2).join(" · ")}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ color:p.color, fontWeight:900, fontSize:20, fontFamily:"serif" }}>${p.price}</div>
                        <div style={{ color:C.muted, fontSize:10 }}>/mwa</div>
                      </div>
                    </div>
                    {selected===p.id && (
                      <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${p.color}33`, display:"flex", flexWrap:"wrap", gap:6 }}>
                        {p.features.map(f => <span key={f} style={{ color:p.color, fontSize:11, background:p.color+"18", padding:"2px 8px", borderRadius:4 }}>✓ {f}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} style={{ width:"100%", background:C.accent, border:"none", color:"#fff", borderRadius:12, padding:"14px", fontSize:15, fontWeight:800, cursor:"pointer" }}>Kontinye → Peman</button>
            </div>
          )}
          {step===2 && (
            <div>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:C.muted, fontSize:13 }}>Plan chwazi:</span>
                <span style={{ color:plan.color, fontWeight:800, fontSize:15 }}>{plan.emoji} {plan.name} — ${plan.price}/mwa</span>
              </div>
              <div style={{ marginBottom:16 }}>
                <div style={{ color:C.muted, fontSize:12, fontWeight:700, letterSpacing:1, marginBottom:10 }}>METÒD PEMAN</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {[{id:"moncash",label:"MonCash",emoji:"📱"},{id:"paypal",label:"PayPal",emoji:"💙"},{id:"card",label:"Kat Kredi",emoji:"💳"},{id:"natcash",label:"NatCash",emoji:"🏦"}].map(m => (
                    <div key={m.id} onClick={() => setMethod(m.id)} style={{ background:method===m.id?C.accent+"22":C.card, border:`1.5px solid ${method===m.id?C.accent:C.border}`, borderRadius:10, padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}>
                      <span style={{ fontSize:20 }}>{m.emoji}</span>
                      <span style={{ color:C.text, fontWeight:600, fontSize:13 }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <div style={{ color:C.muted, fontSize:12, fontWeight:700, letterSpacing:1, marginBottom:8 }}>
                  {method==="moncash"||method==="natcash"?"NIMEWO TELEFÒN":method==="paypal"?"IMEL PAYPAL":"NIMEWO KAT"}
                </div>
                <input value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder={method==="moncash"||method==="natcash"?"509-XXXX-XXXX":method==="paypal"?"email@example.com":"XXXX XXXX XXXX XXXX"}
                  style={{ width:"100%", background:C.card, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"12px 16px", color:C.text, fontSize:14, outline:"none", boxSizing:"border-box" }}
                  onFocus={e => e.target.style.borderColor=C.accent}
                  onBlur={e => e.target.style.borderColor=C.border}
                />
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => setStep(1)} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, borderRadius:10, padding:"12px 20px", fontSize:13, cursor:"pointer" }}>← Tounen</button>
                <button onClick={handlePay} disabled={loading||!phone} style={{ flex:1, background:loading||!phone?C.border:C.accent, border:"none", color:"#fff", borderRadius:10, padding:"12px", fontSize:14, fontWeight:800, cursor:loading||!phone?"not-allowed":"pointer" }}>
                  {loading?"⏳ Tretman...":`💳 Peye $${plan.price}`}
                </button>
              </div>
            </div>
          )}
          {step===3 && (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:60, marginBottom:16 }}>🎉</div>
              <div style={{ fontFamily:"serif", fontWeight:900, fontSize:22, color:C.text, marginBottom:8 }}>Peman Konfime!</div>
              <div style={{ color:C.muted, fontSize:14, marginBottom:20 }}>Bienveni nan PEJAM {plan.name}! Kont ou aktive kounye a.</div>
              <div style={{ background:C.green+"18", border:`1px solid ${C.green}44`, borderRadius:12, padding:"14px 20px", marginBottom:20 }}>
                <div style={{ color:C.green, fontWeight:700, fontSize:13 }}>✓ Plan: {plan.emoji} {plan.name} — ${plan.price}/mwa</div>
                <div style={{ color:C.green, fontWeight:700, fontSize:13, marginTop:4 }}>✓ Renouvèlman otomatik chak mwa</div>
              </div>
              <button onClick={() => { onSuccess(plan); onClose(); }} style={{ background:C.accent, border:"none", color:"#fff", borderRadius:12, padding:"14px 40px", fontSize:15, fontWeight:800, cursor:"pointer" }}>Kòmanse Gade ▶</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TicketModal({ event, onClose }) {
  const [qty, setQty] = useState(1);
  const [method, setMethod] = useState("moncash");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const total = event.price * qty;
  const pct = Math.round((event.sold / event.total) * 100);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={onClose}>
      <div style={{ background:C.surface, borderRadius:20, border:`1.5px solid ${C.border}`, width:"100%", maxWidth:460, overflow:"hidden", boxShadow:"0 40px 80px rgba(0,0,0,0.7)" }} onClick={e => e.stopPropagation()}>
        <div style={{ background:`linear-gradient(135deg,${C.purple}33,${C.teal}11)`, padding:"20px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"serif", fontWeight:900, fontSize:18, color:C.text }}>{event.emoji} {event.title}</div>
            <div style={{ color:C.muted, fontSize:13, marginTop:4 }}>{event.date} · {event.time}</div>
          </div>
          <button onClick={onClose} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, borderRadius:8, padding:"6px 12px", cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ padding:24 }}>
          {step===1 ? (
            <>
              <div style={{ marginBottom:18 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ color:C.muted, fontSize:12 }}>Tikè disponib</span>
                  <span style={{ color:pct>80?C.accent:C.green, fontSize:12, fontWeight:700 }}>{event.total-event.sold} rete</span>
                </div>
                <div style={{ background:C.card, borderRadius:4, height:6, overflow:"hidden" }}>
                  <div style={{ background:`linear-gradient(90deg,${C.green},${pct>80?C.accent:C.teal})`, width:`${pct}%`, height:"100%" }} />
                </div>
                {pct>80 && <div style={{ color:C.accent, fontSize:11, marginTop:4, fontWeight:700 }}>⚠️ Prèske vann!</div>}
              </div>
              <div style={{ marginBottom:18 }}>
                <div style={{ color:C.muted, fontSize:12, fontWeight:700, letterSpacing:1, marginBottom:8 }}>KANTITE TIKÈ</div>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <button onClick={() => qty>1&&setQty(q=>q-1)} style={{ width:36, height:36, background:C.card, border:`1px solid ${C.border}`, color:C.text, borderRadius:8, fontSize:18, cursor:"pointer" }}>−</button>
                  <span style={{ color:C.text, fontWeight:800, fontSize:20, fontFamily:"serif", minWidth:30, textAlign:"center" }}>{qty}</span>
                  <button onClick={() => qty<5&&setQty(q=>q+1)} style={{ width:36, height:36, background:C.card, border:`1px solid ${C.border}`, color:C.text, borderRadius:8, fontSize:18, cursor:"pointer" }}>+</button>
                  <span style={{ color:C.muted, fontSize:13, marginLeft:8 }}>× ${event.price} = <strong style={{ color:C.gold }}>${total}</strong></span>
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <div style={{ color:C.muted, fontSize:12, fontWeight:700, letterSpacing:1, marginBottom:8 }}>PEMAN</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {[{id:"moncash",label:"MonCash",emoji:"📱"},{id:"paypal",label:"PayPal",emoji:"💙"}].map(m => (
                    <div key={m.id} onClick={() => setMethod(m.id)} style={{ background:method===m.id?C.accent+"22":C.card, border:`1.5px solid ${method===m.id?C.accent:C.border}`, borderRadius:10, padding:"10px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}>
                      <span style={{ fontSize:20 }}>{m.emoji}</span>
                      <span style={{ color:C.text, fontWeight:600, fontSize:13 }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setStep(2); }, 2000); }} disabled={loading} style={{ width:"100%", background:loading?C.border:C.accent, border:"none", color:"#fff", borderRadius:12, padding:"14px", fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer" }}>
                {loading?"⏳ Tretman...":`🎟️ Achte ${qty} Tikè — $${total}`}
              </button>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:60, marginBottom:12 }}>🎟️</div>
              <div style={{ fontFamily:"serif", fontWeight:900, fontSize:20, color:C.text, marginBottom:8 }}>Tikè Konfime!</div>
              <div style={{ color:C.muted, fontSize:13, marginBottom:20 }}>Tikè ou yo ap voye nan {method==="moncash"?"MonCash":"PayPal"} ou a.</div>
              <div style={{ background:C.green+"18", border:`1px solid ${C.green}44`, borderRadius:12, padding:14, marginBottom:20, textAlign:"left" }}>
                <div style={{ color:C.green, fontWeight:700, fontSize:13 }}>✓ {qty} tikè — {event.title}</div>
                <div style={{ color:C.green, fontWeight:700, fontSize:13, marginTop:4 }}>✓ {event.date} · {event.time}</div>
                <div style={{ color:C.green, fontWeight:700, fontSize:13, marginTop:4 }}>✓ Total: ${total} via {method}</div>
              </div>
              <button onClick={onClose} style={{ background:C.accent, border:"none", color:"#fff", borderRadius:12, padding:"12px 40px", fontSize:14, fontWeight:800, cursor:"pointer" }}>Fèmen ✕</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PejamTV() {
  const [activeNav, setActiveNav] = useState("Akèy");
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [showAd, setShowAd] = useState(true);
  const [playerChannel, setPlayerChannel] = useState(null);

  const liveCount = channels.filter(c => c.live).length;
  const nav = ["Akèy", "Chanèl", "Evènman", "Abònman"];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'Trebuchet MS', sans-serif", color:C.text }}>
      {showSubscribe && <SubscribeModal onClose={() => setShowSubscribe(false)} onSuccess={p => setUserPlan(p)} />}
      {selectedEvent && <TicketModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

      {/* NAV */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:50, padding:"0 20px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", height:58 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:24, flexShrink:0 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:`linear-gradient(135deg,${C.accent},${C.gold})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📺</div>
            <div>
              <div style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize:17, letterSpacing:1, color:C.text, lineHeight:1 }}>PEJAM</div>
              <div style={{ color:C.accent, fontSize:9, fontWeight:800, letterSpacing:3, lineHeight:1 }}>TELEVIZYON</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:2, flex:1, overflow:"auto" }}>
            {nav.map(n => (
              <button key={n} onClick={() => setActiveNav(n)} style={{ background:"transparent", border:"none", color:activeNav===n?C.accent:C.muted, fontWeight:activeNav===n?700:500, fontSize:13, padding:"6px 12px", cursor:"pointer", borderBottom:activeNav===n?`2px solid ${C.accent}`:"2px solid transparent", whiteSpace:"nowrap", transition:"all 0.2s" }}>{n}</button>
            ))}
          </div>
          {userPlan ? (
            <div style={{ display:"flex", alignItems:"center", gap:8, background:C.green+"18", border:`1px solid ${C.green}44`, borderRadius:8, padding:"5px 12px", flexShrink:0 }}>
              <span style={{ fontSize:14 }}>{userPlan.emoji}</span>
              <span style={{ color:C.green, fontSize:11, fontWeight:800 }}>{userPlan.name}</span>
            </div>
          ) : (
            <button onClick={() => setShowSubscribe(true)} style={{ background:C.accent, border:"none", color:"#fff", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:800, cursor:"pointer", flexShrink:0 }}>⭐ Abòne</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 20px" }}>

        {/* ── AKÈY ── */}
        {activeNav==="Akèy" && (
          <>
            {!userPlan && showAd && <AdBanner onClose={() => setShowAd(false)} />}
            <div style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:20, padding:"28px", marginBottom:24, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${C.accent}15,${C.gold}08,transparent)`, pointerEvents:"none" }} />
              <div style={{ position:"absolute", right:20, top:"50%", transform:"translateY(-50%)", fontSize:80, opacity:0.12 }}>🇭🇹</div>
              <div style={{ position:"relative" }}>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <LiveBadge />
                  <span style={{ background:C.gold+"22", color:C.gold, fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:3, letterSpacing:1 }}>🔥 12.4K K AP GADE</span>
                </div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:900, color:C.text, lineHeight:1.2, marginBottom:6 }}>Nouvèl 7 Zè</div>
                <div style={{ color:C.muted, fontSize:13, marginBottom:18 }}>PEJAM 1 · Kounye a an dirèk</div>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <button onClick={() => setPlayerChannel(channels[0])} style={{ background:C.accent, border:"none", color:"#fff", borderRadius:10, padding:"10px 24px", fontSize:13, fontWeight:800, cursor:"pointer" }}>▶ Gade Dirèk</button>
                  {!userPlan && <button onClick={() => setShowSubscribe(true)} style={{ background:"transparent", border:`1.5px solid ${C.gold}`, color:C.gold, borderRadius:10, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>⭐ Abòne — Pa Gen Piblisite</button>}
                </div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
              {[
                {label:"Chanèl Dirèk", value:liveCount, icon:"📡", color:C.accent},
                {label:"Moun k ap Gade", value:"54.5K", icon:"👁", color:C.teal},
                {label:"Evènman Semèn Sa", value:events.length, icon:"🎟️", color:C.gold},
              ].map(s => (
                <div key={s.label} style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"14px 16px", textAlign:"center" }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                  <div style={{ color:s.color, fontWeight:900, fontSize:22, fontFamily:"serif" }}>{s.value}</div>
                  <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily:"serif", fontWeight:800, fontSize:16, color:C.text, marginBottom:12 }}>🎟️ Evènman k ap Vini</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:8 }}>
              {events.slice(0,2).map(ev => (
                <div key={ev.id} style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:28 }}>{ev.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:C.text, fontWeight:700, fontSize:14, fontFamily:"serif" }}>{ev.title}</div>
                    <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{ev.date} · {ev.time}</div>
                  </div>
                  {ev.hot && <span style={{ background:C.gold+"22", color:C.gold, fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:3 }}>🔥</span>}
                  <button onClick={() => setSelectedEvent(ev)} style={{ background:C.accent, border:"none", color:"#fff", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:800, cursor:"pointer" }}>${ev.price} →</button>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveNav("Evènman")} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, borderRadius:10, padding:"10px", width:"100%", fontSize:13, cursor:"pointer", marginTop:4 }}>Wè Tout Evènman →</button>
          </>
        )}

        {/* ── CHANÈL ── */}
        {activeNav==="Chanèl" && (
          <>
            {!userPlan && showAd && <AdBanner onClose={() => setShowAd(false)} />}
            <div style={{ fontFamily:"serif", fontWeight:800, fontSize:18, color:C.text, marginBottom:16 }}>Tout Chanèl</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {channels.map(ch => (
                <div key={ch.id} style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", transition:"border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=ch.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor=C.border}
                  onClick={() => { if(ch.premium&&!userPlan){setShowSubscribe(true);return;} setPlayerChannel(ch); }}>
                  <div style={{ width:50, height:50, borderRadius:12, background:ch.color+"22", border:`1.5px solid ${ch.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{ch.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ color:C.text, fontWeight:700, fontSize:15, fontFamily:"serif" }}>{ch.name}</span>
                      {ch.premium && <span style={{ background:C.gold+"22", color:C.gold, fontSize:10, fontWeight:800, padding:"1px 7px", borderRadius:3 }}>⭐ PREMIUM</span>}
                    </div>
                    <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{ch.category} · 👁 {ch.viewers}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                    {ch.live && <LiveBadge />}
                    {ch.premium&&!userPlan
                      ? <button onClick={e=>{e.stopPropagation();setShowSubscribe(true);}} style={{ background:C.gold, border:"none", color:"#000", borderRadius:6, padding:"5px 12px", fontSize:11, fontWeight:800, cursor:"pointer" }}>Debloke</button>
                      : <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, borderRadius:6, padding:"5px 12px", fontSize:11, cursor:"pointer" }}>▶ Gade</button>
                    }
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── EVÈNMAN ── */}
        {activeNav==="Evènman" && (
          <>
            <div style={{ fontFamily:"serif", fontWeight:800, fontSize:18, color:C.text, marginBottom:16 }}>🎟️ Tikè Evènman</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {events.map(ev => {
                const pct = Math.round((ev.sold/ev.total)*100);
                return (
                  <div key={ev.id} style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"20px", position:"relative", overflow:"hidden" }}>
                    {ev.hot && <div style={{ position:"absolute", top:12, right:12, background:C.gold+"22", color:C.gold, fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:3 }}>🔥 CHO</div>}
                    <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                      <div style={{ width:56, height:56, borderRadius:14, background:C.surface, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{ev.emoji}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:"serif", fontWeight:800, fontSize:17, color:C.text, marginBottom:4 }}>{ev.title}</div>
                        <div style={{ color:C.muted, fontSize:13, marginBottom:12 }}>📅 {ev.date} · 🕐 {ev.time}</div>
                        <div style={{ marginBottom:10 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                            <span style={{ color:C.muted, fontSize:12 }}>Tikè vann</span>
                            <span style={{ color:pct>80?C.accent:C.green, fontSize:12, fontWeight:700 }}>{ev.sold}/{ev.total} ({pct}%)</span>
                          </div>
                          <div style={{ background:C.surface, borderRadius:4, height:6, overflow:"hidden" }}>
                            <div style={{ background:`linear-gradient(90deg,${C.green},${pct>80?C.accent:C.teal})`, width:`${pct}%`, height:"100%", borderRadius:4 }} />
                          </div>
                          {pct>80 && <div style={{ color:C.accent, fontSize:11, marginTop:4, fontWeight:700 }}>⚠️ Prèske vann!</div>}
                        </div>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                          <div>
                            <span style={{ color:C.gold, fontWeight:900, fontSize:22, fontFamily:"serif" }}>${ev.price}</span>
                            <span style={{ color:C.muted, fontSize:12 }}> / tikè</span>
                            {userPlan?.id==="vip" && <span style={{ color:C.green, fontSize:11, fontWeight:700, marginLeft:8, background:C.green+"18", padding:"2px 8px", borderRadius:4 }}>✓ VIP — 1 gratis</span>}
                          </div>
                          <button onClick={() => setSelectedEvent(ev)} style={{ background:C.accent, border:"none", color:"#fff", borderRadius:10, padding:"10px 24px", fontSize:13, fontWeight:800, cursor:"pointer" }}>🎟️ Achte Tikè</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── ABÒNMAN ── */}
        {activeNav==="Abònman" && (
          <>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ fontFamily:"serif", fontWeight:900, fontSize:24, color:C.text, marginBottom:8 }}>Chwazi Plan Ou</div>
              <div style={{ color:C.muted, fontSize:14 }}>Pa gen kontrak. Kanpe nenpòt ki lè.</div>
            </div>
            {userPlan && (
              <div style={{ background:C.green+"18", border:`1px solid ${C.green}44`, borderRadius:14, padding:"14px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:24 }}>{userPlan.emoji}</span>
                <div>
                  <div style={{ color:C.green, fontWeight:800, fontSize:15 }}>Ou abòne nan {userPlan.name}!</div>
                  <div style={{ color:C.muted, fontSize:12 }}>Renouvèlman: ${userPlan.price}/mwa</div>
                </div>
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {plans.map(p => (
                <div key={p.id} style={{ background:C.card, border:`2px solid ${userPlan?.id===p.id?p.color:C.border}`, borderRadius:18, padding:"20px", position:"relative", overflow:"hidden" }}>
                  {p.popular && <div style={{ position:"absolute", top:0, right:20, background:C.gold, color:"#000", fontSize:9, fontWeight:900, padding:"3px 12px", borderRadius:"0 0 8px 8px", letterSpacing:1 }}>PI POPILÈ</div>}
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
                    <span style={{ fontSize:36 }}>{p.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"serif", fontWeight:900, fontSize:20, color:C.text }}>{p.name}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ color:p.color, fontWeight:900, fontSize:28, fontFamily:"serif" }}>${p.price}</div>
                      <div style={{ color:C.muted, fontSize:12 }}>/mwa</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ color:p.color }}>✓</span>
                        <span style={{ color:C.text, fontSize:13 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setShowSubscribe(true)} style={{ width:"100%", background:userPlan?.id===p.id?C.green:p.color, border:"none", color:"#fff", borderRadius:10, padding:"12px", fontSize:14, fontWeight:800, cursor:"pointer" }}>
                    {userPlan?.id===p.id?"✓ Plan Aktyèl Ou":`Abòne — $${p.price}/mwa`}
                  </button>
                </div>
              ))}
            </div>

            {/* Revenue calculator */}
            <div style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"20px", marginTop:24 }}>
              <div style={{ fontFamily:"serif", fontWeight:800, fontSize:16, color:C.text, marginBottom:14 }}>💰 Estimasyon Revni pou Ou (Pwopriytè)</div>
              {[[100,7],[500,7],[1000,7]].map(([n,p]) => (
                <div key={n} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:C.muted, fontSize:13 }}>👥 {n.toLocaleString()} abònen (PEJAM+)</span>
                  <span style={{ color:C.green, fontWeight:800, fontSize:15, fontFamily:"serif" }}>${(n*p).toLocaleString()}/mwa</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted, fontSize:13 }}>🎟️ 4 Evènman/mwa (mwayèn $500)</span>
                <span style={{ color:C.gold, fontWeight:800, fontSize:15, fontFamily:"serif" }}>+$2,000/mwa</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0" }}>
                <span style={{ color:C.muted, fontSize:13 }}>📺 Piblisite (1,000+ vizitè/jou)</span>
                <span style={{ color:C.teal, fontWeight:800, fontSize:15, fontFamily:"serif" }}>+$300-800/mwa</span>
              </div>
              <div style={{ color:C.muted, fontSize:11, marginTop:8, fontStyle:"italic" }}>* Estimasyon sèlman. Revni reyèl depann sou trafik ak negosyasyon piblisite.</div>
            </div>
          </>
        )}
      </div>

      {/* Player modal */}
      {playerChannel && (
        <div style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(0,0,0,0.9)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={() => setPlayerChannel(null)}>
          <div style={{ background:C.surface, borderRadius:20, border:`1.5px solid ${C.border}`, width:"100%", maxWidth:600, overflow:"hidden" }} onClick={e => e.stopPropagation()}>
            <div style={{ background:"#000", aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 30% 40%,${playerChannel.color}33,transparent 60%)` }} />
              <div style={{ textAlign:"center", position:"relative" }}>
                <div style={{ fontSize:56, marginBottom:8 }}>{playerChannel.emoji}</div>
                <div style={{ color:C.text, fontFamily:"serif", fontSize:20, fontWeight:700 }}>{playerChannel.name}</div>
                <div style={{ color:C.muted, fontSize:12, marginTop:4 }}>Transmisyon ap chaje...</div>
              </div>
              {playerChannel.live && <div style={{ position:"absolute", top:12, left:12 }}><LiveBadge /></div>}
              {!userPlan && (
                <div style={{ position:"absolute", bottom:12, left:0, right:0, textAlign:"center" }}>
                  <div style={{ background:"rgba(0,0,0,0.85)", border:`1px solid ${C.gold}55`, borderRadius:10, padding:"8px 16px", display:"inline-flex", alignItems:"center", gap:10 }}>
                    <span style={{ color:C.gold, fontSize:12 }}>⭐ Abòne pou 4K + Pa gen piblisite</span>
                    <button onClick={e=>{e.stopPropagation();setPlayerChannel(null);setShowSubscribe(true);}} style={{ background:C.gold, border:"none", color:"#000", borderRadius:6, padding:"4px 12px", fontSize:11, fontWeight:800, cursor:"pointer" }}>Abòne</button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding:"14px 20px", display:"flex", gap:10, alignItems:"center" }}>
              <button style={{ background:C.accent, border:"none", color:"#fff", borderRadius:10, width:42, height:42, fontSize:18, cursor:"pointer" }}>⏸</button>
              <div style={{ flex:1 }}>
                <div style={{ color:C.text, fontWeight:700, fontSize:14, fontFamily:"serif" }}>{playerChannel.name}</div>
                <div style={{ color:C.muted, fontSize:12 }}>{playerChannel.category}</div>
              </div>
              <button onClick={() => setPlayerChannel(null)} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, borderRadius:8, padding:"6px 14px", fontSize:12, cursor:"pointer" }}>✕ Fèmen</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-thumb { background:#2A2A40; border-radius:2px; }
        input::placeholder { color:#8A8AA0; }
      `}</style>
    </div>
  );
}
