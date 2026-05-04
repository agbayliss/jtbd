"use client";
// @ts-nocheck

import { useState, useEffect, useRef } from "react";

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpArray(a, b, t) {
  var result = [];
  for (var i = 0; i < a.length; i++) {
    result.push(a[i] + (b[i] - a[i]) * t);
  }
  return result;
}

function useAnimatedValues(targetValues, duration) {
  var dur = duration || 500;
  var currentRef = useRef(targetValues);
  var startRef = useRef(targetValues);
  var targetRef = useRef(targetValues);
  var animRef = useRef(null);
  var _v = useState(targetValues);
  var values = _v[0]; var setValues = _v[1];
  useEffect(function() {
    if (targetValues === targetRef.current) return;
    startRef.current = currentRef.current.slice();
    targetRef.current = targetValues;
    var startTime = performance.now();
    function animate() {
      var elapsed = performance.now() - startTime;
      var t = Math.min(elapsed / dur, 1);
      var interpolated = lerpArray(startRef.current, targetRef.current, easeInOut(t));
      currentRef.current = interpolated;
      setValues(interpolated);
      if (t < 1) animRef.current = requestAnimationFrame(animate);
    }
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
    return function() { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [targetValues]);
  return values;
}

function useAnimatedCherryFall(targetValues, duration, arcAmount) {
  var dur = duration || 700;
  var arcRef = useRef(arcAmount || 0);
  arcRef.current = arcAmount || 0;
  var currentRef = useRef(targetValues);
  var startRef = useRef(targetValues);
  var targetRef = useRef(targetValues);
  var animRef = useRef(null);
  var _v = useState(targetValues);
  var values = _v[0]; var setValues = _v[1];
  useEffect(function() {
    if (targetValues === targetRef.current) return;
    startRef.current = currentRef.current.slice();
    targetRef.current = targetValues;
    var startTime = performance.now();
    var animArc = arcRef.current;
    function animate() {
      var elapsed = performance.now() - startTime;
      var t = Math.min(elapsed / dur, 1);
      var eased = easeInOut(t);
      var y = startRef.current[1] + (targetRef.current[1] - startRef.current[1]) * eased;
      var rot = startRef.current[2] + (targetRef.current[2] - startRef.current[2]) * eased;
      var baseX = startRef.current[0] + (targetRef.current[0] - startRef.current[0]) * eased;
      var arcOffset = Math.sin(t * Math.PI) * (1 - t * t) * animArc;
      var interpolated = [baseX + arcOffset, y, rot];
      currentRef.current = interpolated;
      setValues(interpolated);
      if (t < 1) animRef.current = requestAnimationFrame(animate);
    }
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
    return function() { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [targetValues]);
  return values;
}

var STRAW_POINTS = {
  neutral: [121,108,121,46,121,40,127,37,155,22], solid: [121,108,121,46,121,28,121,16,121,10],
  partial: [121,108,121,46,121,40,127,38,150,32], not_jtbd: [121,108,121,46,121,40,128,42,152,52],
};
function strawToPath(p) { return "M"+p[0]+" "+p[1]+" L"+p[2]+" "+p[3]+" Q"+p[4]+" "+p[5]+" "+p[6]+" "+p[7]+" L"+p[8]+" "+p[9]; }

var CREAM_POINTS = {
  normal: [100,82,62,28,72,78,30,24,128,78,30,24,100,72,36,22,80,70,22,18,120,70,22,18],
  sad: [100,86,64,22,68,84,32,18,132,83,28,17,100,78,38,16,78,77,24,14,118,78,20,13],
};
var CREAM_FILLS = ["#f0e4d0","#f5ead8","#f5ead8","#f9f0e3","#f9f0e3","#f9f0e3"];

var CHERRY_POS = { neutral: [100,58,0], solid: [100,58,0], partial: [100,58,-20], not_jtbd: [32,239,85] };
var EXTRA_CHERRY1 = { hidden: [-20,-20,-45], landed: [78,56,-15] };
var EXTRA_CHERRY2 = { hidden: [-10,-30,-30], landed: [65,70,12] };

var BROW_POINTS = {
  neutral: [72,140,82,136,92,140,108,140,118,136,128,140], solid: [72,136,82,130,92,136,108,136,118,130,128,136],
  partial: [72,139,82,134,92,140,108,136,118,134,128,140], not_jtbd: [72,143,82,138,92,135,108,135,118,138,128,143],
};
function browToPath(p) { return "M"+p[0]+" "+p[1]+" Q"+p[2]+" "+p[3]+" "+p[4]+" "+p[5]; }

var EYE_POINTS = {
  neutral: [82,155,10,11,84,156,6,87,153,2.5,118,155,10,11,120,156,6,123,153,2.5],
  partial: [82,155,10,11,86,157,6,89,154,2.5,118,155,10,11,122,157,6,125,154,2.5],
  not_jtbd: [82,155,11,13,82,153,6,85,150,2.5,118,155,11,13,118,153,6,121,150,2.5],
  solid: [82,155,10,11,84,156,6,87,153,2.5,118,155,10,11,120,156,6,123,153,2.5],
};

var MOUTH_POINTS = {
  neutral: [90,180,95,184,100,184,105,184,110,180], partial: [88,183,95,180,100,183,105,186,112,183],
  not_jtbd: [86,186,93,179,100,178,107,179,114,186], solid: [90,180,95,184,100,184,105,184,110,180],
};
function mouthToPath(p) { return "M"+p[0]+" "+p[1]+" Q"+p[2]+" "+p[3]+" "+p[4]+" "+p[5]+" Q"+p[6]+" "+p[7]+" "+p[8]+" "+p[9]; }

var SHEEN_POINTS = { visible: [82,162,8,3,118,162,8,3,0.4], hidden: [82,162,8,0,118,162,8,0,0] };

function Milkshake({ state, size }) {
  var w = size || 200;
  var s = state || "neutral";
  var strawValues = useAnimatedValues(STRAW_POINTS[s] || STRAW_POINTS.neutral, 550);
  var creamValues = useAnimatedValues(s === "not_jtbd" ? CREAM_POINTS.sad : CREAM_POINTS.normal, 660);
  var cherryValues = useAnimatedCherryFall(CHERRY_POS[s] || CHERRY_POS.neutral, s === "not_jtbd" ? 880 : 550, s === "not_jtbd" ? -35 : 0);
  var extra1Values = useAnimatedValues(s === "solid" ? EXTRA_CHERRY1.landed : EXTRA_CHERRY1.hidden, 660);
  var extra2Values = useAnimatedValues(s === "solid" ? EXTRA_CHERRY2.landed : EXTRA_CHERRY2.hidden, 825);
  var browValues = useAnimatedValues(BROW_POINTS[s] || BROW_POINTS.neutral, 550);
  var eyeValues = useAnimatedValues(EYE_POINTS[s] || EYE_POINTS.neutral, 550);
  var mouthValues = useAnimatedValues(MOUTH_POINTS[s] || MOUTH_POINTS.neutral, 550);
  var sheenValues = useAnimatedValues(s === "not_jtbd" ? SHEEN_POINTS.visible : SHEEN_POINTS.hidden, 660);
  var isHappy = s === "solid";
  var isSad = s === "not_jtbd";
  var tr = "opacity 0.5s ease";

  return (
    <svg viewBox="0 0 200 280" width={w} height={w * 1.4} xmlns="http://www.w3.org/2000/svg">
      <path d={strawToPath(strawValues)} stroke="#5b9be6" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {CREAM_FILLS.map(function(fill, i) { var b=i*4; return <ellipse key={i} cx={creamValues[b]} cy={creamValues[b+1]} rx={creamValues[b+2]} ry={creamValues[b+3]} fill={fill} />; })}
      <path d="M48 100 L58 230 Q60 245 75 248 L125 248 Q140 245 142 230 L152 100 Z" fill="#93c5fd" />
      <path d="M56 100 L62 210 Q63 218 68 220 L68 110 Z" fill="rgba(255,255,255,0.35)" />
      <rect x="44" y="94" width="112" height="12" rx="6" fill="#7db8f8" />
      <rect x="48" y="96" width="104" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
      <g style={{ opacity: isSad ? 1 : 0, transition: tr }}>
        <path d="M54 98 Q48 98 48 106 Q48 120 50 135 Q51 145 54 148 Q57 145 57 135 Q58 120 57 106 Q57 98 54 98 Z" fill="#f0e4d0" />
        <path d="M148 98 Q144 98 144 105 Q144 115 145 126 Q146 132 148 134 Q150 132 151 126 Q152 115 151 105 Q151 98 148 98 Z" fill="#f5ead8" />
        <path d="M139 100 Q136 100 136 106 Q136 112 138 117 Q139 119 140 117 Q142 112 142 106 Q142 100 139 100 Z" fill="#f0e4d0" />
      </g>
      <g transform={"translate("+cherryValues[0]+","+cherryValues[1]+") rotate("+cherryValues[2]+")"}><circle cx="0" cy="0" r="10" fill="#e53e3e" /><ellipse cx="-3" cy="-3" rx="3" ry="2" fill="#fc8181" opacity="0.7" /><path d="M0 -8 Q-4 -16 -12 -18" stroke="#a62929" strokeWidth="2.5" fill="none" strokeLinecap="round" /></g>
      <line x1="65" y1="150" x2="135" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <line x1="62" y1="175" x2="138" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <line x1="60" y1="200" x2="140" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <ellipse cx="68" cy="172" rx="9" ry="6" fill="#feb2b2" opacity="0.5" />
      <ellipse cx="132" cy="172" rx="9" ry="6" fill="#feb2b2" opacity="0.5" />
      <g transform={"translate("+extra1Values[0]+","+extra1Values[1]+") rotate("+extra1Values[2]+")"}><circle cx="0" cy="0" r="9" fill="#e53e3e" /><ellipse cx="-3" cy="-3" rx="2.5" ry="1.8" fill="#fc8181" opacity="0.7" /><path d="M0 -8 Q-5 -14 -12 -16" stroke="#a62929" strokeWidth="2.5" fill="none" strokeLinecap="round" /></g>
      <g transform={"translate("+extra2Values[0]+","+extra2Values[1]+") rotate("+extra2Values[2]+")"}><circle cx="0" cy="0" r="8.5" fill="#dc2626" /><ellipse cx="-3" cy="-3" rx="2.5" ry="1.8" fill="#fc8181" opacity="0.7" /><path d="M0 -7 Q-5 -13 -11 -15" stroke="#a62929" strokeWidth="2.5" fill="none" strokeLinecap="round" /></g>
      <g style={{ opacity: isSad ? 1 : 0, transition: tr }}><ellipse cx="68" cy="178" rx="3" ry="5" fill="#93c5fd" opacity="0.6" /></g>
      <path d={browToPath(browValues.slice(0,6))} stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={browToPath(browValues.slice(6,12))} stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <g style={{ opacity: isHappy ? 0 : 1, transition: tr }}>
        <ellipse cx={eyeValues[0]} cy={eyeValues[1]} rx={eyeValues[2]} ry={eyeValues[3]} fill="white" /><circle cx={eyeValues[4]} cy={eyeValues[5]} r={eyeValues[6]} fill="#2d3748" /><circle cx={eyeValues[7]} cy={eyeValues[8]} r={eyeValues[9]} fill="white" />
        <ellipse cx={eyeValues[10]} cy={eyeValues[11]} rx={eyeValues[12]} ry={eyeValues[13]} fill="white" /><circle cx={eyeValues[14]} cy={eyeValues[15]} r={eyeValues[16]} fill="#2d3748" /><circle cx={eyeValues[17]} cy={eyeValues[18]} r={eyeValues[19]} fill="white" />
      </g>
      <g style={{ opacity: isHappy ? 1 : 0, transition: tr }}>
        <path d="M72 155 Q82 146 92 155" stroke="#2d3748" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M108 155 Q118 146 128 155" stroke="#2d3748" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx={sheenValues[0]} cy={sheenValues[1]} rx={sheenValues[2]} ry={sheenValues[3]} fill="#bfdbfe" opacity={sheenValues[8]} />
      <ellipse cx={sheenValues[4]} cy={sheenValues[5]} rx={sheenValues[6]} ry={sheenValues[7]} fill="#bfdbfe" opacity={sheenValues[8]} />
      <g style={{ opacity: isHappy ? 0 : 1, transition: tr }}><path d={mouthToPath(mouthValues)} stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="round" /></g>
      <g style={{ opacity: isHappy ? 1 : 0, transition: tr }}>
        <path d="M82 178 Q100 202 118 178" fill="white" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="82" y1="178" x2="118" y2="178" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="85" y1="182" x2="115" y2="182" stroke="#2d3748" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function MilkshakeDemo() {
  var _s = useState("neutral"); var state = _s[0]; var setState = _s[1];
  var _h = useState(""); var hovered = _h[0]; var setHovered = _h[1];

  var states = [
    { key: "neutral", label: "Neutral", desc: "Default / resting" },
    { key: "solid", label: "Happy", desc: "Solid JTBD" },
    { key: "partial", label: "So-So", desc: "Partially there" },
    { key: "not_jtbd", label: "Sad", desc: "Not a JTBD" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif", padding: "48px 24px" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em", color: "#1a1a2e" }}>Play with Sipsy</h1>
        <p style={{ fontSize: 15, color: "#525566", margin: "0 0 32px" }}>Click between states to watch Sipsy the Milkshake react.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {states.map(function(st) {
            var isActive = state === st.key;
            return (
              <button key={st.key} onClick={function() { setState(st.key); }} onMouseEnter={function() { setHovered(st.key); }} onMouseLeave={function() { setHovered(""); }}
                style={{ padding: "8px 18px", borderRadius: 100, border: isActive ? "2px solid #1a1a2e" : "1px solid #d1d5db", background: isActive ? "#1a1a2e" : (hovered === st.key ? "#f5f6f8" : "#ffffff"), color: isActive ? "#ffffff" : "#525566", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                {st.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Milkshake state={state} size={220} />
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#1a1a2e" }}>{states.find(function(st) { return st.key === state; }).label}</div>
          <div style={{ fontSize: 13, color: "#6b7084", marginTop: 2 }}>{states.find(function(st) { return st.key === state; }).desc}</div>
        </div>
        <div style={{ marginTop: 40 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, border: "1px solid #d1d5db", background: "#ffffff", color: "#525566", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "inherit", cursor: "pointer" }}>
            Open JTBD Checker
          </a>
        </div>
      </div>
    </div>
  );
}
