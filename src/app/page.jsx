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
  normal: [100,82,62,28, 72,78,30,24, 128,78,30,24, 100,72,36,22, 80,70,22,18, 120,70,22,18],
  sad: [100,86,64,22, 68,84,32,18, 132,83,28,17, 100,78,38,16, 78,77,24,14, 118,78,20,13],
};
var CREAM_FILLS = ["#f0e4d0","#f5ead8","#f5ead8","#f9f0e3","#f9f0e3","#f9f0e3"];

var CHERRY_POS = { neutral: [100,58,0], solid: [100,58,0], partial: [100,58,-20], not_jtbd: [32,239,85] };
var EXTRA_CHERRY1 = { hidden: [-20,-20,-45], landed: [78,56,-15] };
var EXTRA_CHERRY2 = { hidden: [-10,-30,-30], landed: [65,70,12] };

var BROW_POINTS = {
  neutral: [72,140,82,136,92,140, 108,140,118,136,128,140], solid: [72,136,82,130,92,136, 108,136,118,130,128,136],
  partial: [72,139,82,134,92,140, 108,136,118,134,128,140], not_jtbd: [72,143,82,138,92,135, 108,135,118,138,128,143],
};
function browToPath(p) { return "M"+p[0]+" "+p[1]+" Q"+p[2]+" "+p[3]+" "+p[4]+" "+p[5]; }

var EYE_POINTS = {
  neutral: [82,155,10,11,84,156,6,87,153,2.5, 118,155,10,11,120,156,6,123,153,2.5],
  partial: [82,155,10,11,86,157,6,89,154,2.5, 118,155,10,11,122,157,6,125,154,2.5],
  not_jtbd: [82,155,11,13,82,153,6,85,150,2.5, 118,155,11,13,118,153,6,121,150,2.5],
  solid: [82,155,10,11,84,156,6,87,153,2.5, 118,155,10,11,120,156,6,123,153,2.5],
};

var MOUTH_POINTS = {
  neutral: [90,180,95,184,100,184,105,184,110,180], partial: [88,183,95,180,100,183,105,186,112,183],
  not_jtbd: [86,186,93,179,100,178,107,179,114,186], solid: [90,180,95,184,100,184,105,184,110,180],
};
function mouthToPath(p) { return "M"+p[0]+" "+p[1]+" Q"+p[2]+" "+p[3]+" "+p[4]+" "+p[5]+" Q"+p[6]+" "+p[7]+" "+p[8]+" "+p[9]; }

var SHEEN_POINTS = { visible: [82,162,8,3,118,162,8,3,0.4], hidden: [82,162,8,0,118,162,8,0,0] };

function Milkshake({ state, size, bounce }) {
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
  var wrapStyle = { display: "inline-block" };
  if (bounce) wrapStyle.animation = "sipsyBounce 2s ease-in-out infinite";

  return (
    <div style={wrapStyle}>
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
    </div>
  );
}

var EXAMPLES = [
  "When I'm running late for work and haven't eaten, I want to grab something filling and portable so I can stay focused through the morning.",
  "As a product manager, I want a dashboard that shows key metrics.",
  "Help teams collaborate better using Slack.",
  "Minimize the time it takes to verify all ingredients are available before cooking.",
  "Be more productive at work.",
  "Upload a file to the cloud.",
  "When I'm preparing for a meeting with my manager, I want to feel confident that I can answer any question about my team's progress so I don't look disorganized.",
  "I want an AI-powered search feature.",
];

var VERDICTS = {
  solid: { label: "Solid JTBD", labelColor: "#15703a", bg: "#f0faf3", border: "#c6e9d0", rewriteBg: "#e2f4e8", icon: "✓" },
  partial: { label: "Partially There", labelColor: "#854d0e", bg: "#fefce8", border: "#fde68a", rewriteBg: "#fef9c3", icon: "◐" },
  not_jtbd: { label: "Not a JTBD Statement", labelColor: "#b91c1c", bg: "#fef2f2", border: "#fecaca", rewriteBg: "#fee2e2", icon: "✗" },
};

var LOADING_VERBS = ["Blending...", "Stirring...", "Sipping...", "Shaking...", "Whipping...", "Pouring...", "Mixing...", "Tasting...", "Chilling...", "Sampling...", "Swirling...", "Drizzling...", "Scooping...", "Garnishing...", "Frosting...", "Sprinkling..."];

var EMOTION_LABELS = { solid: "Sipsy is happy!", partial: "Sipsy is so-so.", not_jtbd: "Sipsy is sad." };

async function analyzeStatement(statement) {
  var res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ statement: statement }),
  });
  if (!res.ok) {
    var errBody = await res.json().catch(function() { return {}; });
    throw new Error(errBody.error || "Request failed");
  }
  return res.json();
}

async function extractTextFromImage(base64Data, mediaType) {
  var res = await fetch("/api/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64: base64Data, mediaType: mediaType }),
  });
  if (!res.ok) {
    var errBody = await res.json().catch(function() { return {}; });
    throw new Error(errBody.error || "Request failed");
  }
  var data = await res.json();
  return data.text;
}

function useLoadingVerbs(isLoading) {
  var _v = useState(""); var verb = _v[0]; var setVerb = _v[1];
  var _d = useState(0); var displayed = _d[0]; var setDisplayed = _d[1];
  var _fo = useState(1); var fadeOpacity = _fo[0]; var setFadeOpacity = _fo[1];
  var usedRef = useRef("");
  var activeRef = useRef(false);
  useEffect(function() {
    if (!isLoading) { usedRef.current = ""; activeRef.current = false; setVerb(""); setDisplayed(0); return; }
    activeRef.current = true;
    function pickVerb() { var available = LOADING_VERBS.filter(function(v) { return v !== usedRef.current; }); var picked = available[Math.floor(Math.random() * available.length)]; usedRef.current = picked; return picked; }
    function typeVerb(word) {
      if (!activeRef.current || !word) return;
      setVerb(word); setDisplayed(0); setFadeOpacity(1);
      var i = 0;
      var typeInterval = setInterval(function() {
        if (!activeRef.current) { clearInterval(typeInterval); return; }
        i++; setDisplayed(i);
        if (i >= word.length) { clearInterval(typeInterval); setTimeout(function() { if (!activeRef.current) return; setFadeOpacity(0); setTimeout(function() { if (!activeRef.current) return; var next = pickVerb(); if (next) typeVerb(next); }, 500); }, 1500); }
      }, 70);
    }
    var first = pickVerb(); if (first) typeVerb(first);
    return function() { activeRef.current = false; };
  }, [isLoading]);
  return { verb: verb, displayed: displayed, fadeOpacity: fadeOpacity };
}

export default function JTBDChecker() {
  var _s = useState(""); var input = _s[0]; var setInput = _s[1];
  var _l = useState(false); var loading = _l[0]; var setLoading = _l[1];
  var _r = useState(null); var result = _r[0]; var setResult = _r[1];
  var _e = useState(null); var error = _e[0]; var setError = _e[1];
  var _f = useState(false); var focused = _f[0]; var setFocused = _f[1];
  var _h = useState(-1); var hovered = _h[0]; var setHovered = _h[1];
  var _x = useState(true); var showExamples = _x[0]; var setShowExamples = _x[1];
  var _st = useState(""); var submittedText = _st[0]; var setSubmittedText = _st[1];
  var _rs = useState(-1); var revealStage = _rs[0]; var setRevealStage = _rs[1];
  var _img = useState(null); var setImageFile = _img[1];
  var _ip = useState(null); var imagePreview = _ip[0]; var setImagePreview = _ip[1];
  var _ib = useState(null); var imageBase64 = _ib[0]; var setImageBase64 = _ib[1];
  var _im = useState(null); var imageMediaType = _im[0]; var setImageMediaType = _im[1];
  var _drag = useState(false); var dragging = _drag[0]; var setDragging = _drag[1];
  var fileInputRef = useRef(null);
  var inputRowRef = useRef(null);
  var _ext = useState(false); var extracting = _ext[0]; var setExtracting = _ext[1];
  var _twd = useState(-1); var twDisplayed = _twd[0]; var setTwDisplayed = _twd[1];
  var twActiveRef = useRef(false);
  var _conf = useState(false); var confirming = _conf[0]; var setConfirming = _conf[1];
  var _edited = useState(""); var editedText = _edited[0]; var setEditedText = _edited[1];
  var _editing = useState(false); var isEditing = _editing[0]; var setIsEditing = _editing[1];
  var loadingVerbs = useLoadingVerbs(loading);
  var resultRef = useRef(null);

  useEffect(function() {
    if (!result || result === resultRef.current) return;
    resultRef.current = result;
    setRevealStage(0);
    var t1 = setTimeout(function() { setRevealStage(1); }, 1140);
    var t2 = setTimeout(function() { setRevealStage(2); }, 2584);
    var t3 = setTimeout(function() { setRevealStage(3); }, 3451);
    return function() { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [result]);

  var sipsyState = "neutral";
  if (result && revealStage >= 0) sipsyState = result.verdict;
  var canSubmit = (input.trim().length > 0 || imageBase64) && !loading;
  var appState = "default";
  if (loading) appState = "loading";
  else if (confirming) appState = "confirming";
  else if (result) appState = "result";

  function processFile(file) {
    if (!file) return;
    if (["image/png", "image/jpeg", "image/webp", "image/gif"].indexOf(file.type) === -1) return;
    setImageFile(file); setImageMediaType(file.type);
    var reader = new FileReader();
    reader.onload = function() { var dataUrl = reader.result; setImagePreview(dataUrl); setImageBase64(dataUrl.split(",")[1]); };
    reader.readAsDataURL(file);
  }

  function clearImage() { setImageFile(null); setImagePreview(null); setImageBase64(null); setImageMediaType(null); }

  useEffect(function() {
    function handlePaste(e) {
      if (!e.clipboardData || !e.clipboardData.items) return;
      for (var i = 0; i < e.clipboardData.items.length; i++) {
        var item = e.clipboardData.items[i];
        if (item.type.indexOf("image") !== -1) { var file = item.getAsFile(); if (file) processFile(file); break; }
      }
    }
    window.addEventListener("paste", handlePaste);
    return function() { window.removeEventListener("paste", handlePaste); };
  }, []);

  function handleSubmit() {
    if (!canSubmit) return;
    var text = input.trim();
    var useImage = !text && imageBase64;
    setLoading(true); setResult(null); setError(null); setShowExamples(false); setRevealStage(-1); setExtracting(false); setTwDisplayed(-1); setConfirming(false); setIsEditing(false); twActiveRef.current = false; resultRef.current = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (useImage) {
      setSubmittedText("Extracting statement..."); setExtracting(true);
      extractTextFromImage(imageBase64, imageMediaType)
        .then(function(extracted) {
          setExtracting(false);
          if (!extracted || extracted === "NO_STATEMENT_FOUND") {
            setSubmittedText("No statement found in image");
            setResult({ verdict: "not_jtbd", label: "No statement found", issues: ["Could not extract a statement from image"], explanation: "The uploaded image did not contain a clear statement to evaluate. Try uploading a screenshot that contains a specific statement or job description.", rewrite: null, school_note: null });
            setLoading(false); return;
          }
          setSubmittedText(extracted); setEditedText(extracted); setTwDisplayed(0); twActiveRef.current = true;
          var i = 0;
          var typeInterval = setInterval(function() {
            if (!twActiveRef.current) { clearInterval(typeInterval); return; }
            i++; setTwDisplayed(i);
            if (i >= extracted.length) { clearInterval(typeInterval); twActiveRef.current = false; setTimeout(function() { setConfirming(true); setLoading(false); }, 400); }
          }, 30);
        })
        .catch(function(err) { setExtracting(false); setError(err && err.message ? err.message : "Something went wrong extracting text. Try again."); setLoading(false); });
    } else {
      setSubmittedText(text); setTwDisplayed(-1); setConfirming(false);
      analyzeStatement(text).then(function(r) { setResult(r); }).catch(function(err) { setError(err && err.message ? err.message : "Something went wrong. Try again."); }).finally(function() { setLoading(false); });
    }
  }

  function confirmExtraction() {
    var textToEval = isEditing ? editedText.trim() : submittedText;
    if (!textToEval) return;
    setSubmittedText(textToEval); setConfirming(false); setIsEditing(false); setTwDisplayed(-1); setLoading(true);
    analyzeStatement(textToEval).then(function(r) { setResult(r); }).catch(function(err) { setError(err && err.message ? err.message : "Something went wrong. Try again."); }).finally(function() { setLoading(false); });
  }

  function handleExample(ex) {
    setInput(ex); setResult(null); setError(null);
    setTimeout(function() {
      if (!inputRowRef.current) return;
      var rect = inputRowRef.current.getBoundingClientRect();
      var startY = window.pageYOffset || document.documentElement.scrollTop;
      var targetY = rect.top + startY;
      var diff = targetY - startY;
      if (Math.abs(diff) < 4) return;
      var duration = 1100;
      var startTime = null;
      function step(now) {
        if (startTime === null) startTime = now;
        var t = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + diff * easeInOut(t));
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, 500);
  }

  function handleReset() {
    setInput(""); setResult(null); setError(null); setSubmittedText(""); setShowExamples(true); setRevealStage(-1); setExtracting(false); setTwDisplayed(-1); setConfirming(false); setIsEditing(false); twActiveRef.current = false; resultRef.current = null; clearImage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onKey(e) { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(); }

  var isDefault = appState === "default" || appState === "confirming";
  var labelHeight = isDefault ? 0 : 30;
  var labelMargin = isDefault ? 0 : 12;
  var labelContent = null;
  var labelOpacity = 0;

  if (appState === "loading" && loadingVerbs.verb) {
    var shown = loadingVerbs.verb.slice(0, loadingVerbs.displayed);
    var hidden = loadingVerbs.verb.slice(loadingVerbs.displayed);
    labelContent = (<span><span>{shown}</span><span style={{ color: "transparent" }}>{hidden}</span></span>);
    labelOpacity = loadingVerbs.fadeOpacity;
  } else if (appState === "result" && result && revealStage >= 1) {
    labelContent = EMOTION_LABELS[result.verdict] || "";
    labelOpacity = 1;
  }

  var sipsyLabel = (<div style={{ marginTop: labelMargin, fontSize: 20, fontWeight: 400, color: "#1a1a2e", textAlign: "center", height: labelHeight, opacity: labelOpacity, overflow: "hidden", transition: "height 0.5s ease, margin-top 0.5s ease, opacity 0.4s ease" }}>{labelContent}</div>);

  var cFull = result ? VERDICTS[result.verdict] : null;
  var cardReady = revealStage >= 2;
  var c = cardReady ? cFull : null;

  return (
    <>
    <div style={{ flex: 1, background: "#ffffff", color: "#1a1a2e", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif", padding: "40px 24px" }}>
      <style dangerouslySetInnerHTML={{ __html: "@keyframes sipsyBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } } @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } *:focus { outline: 2px solid #2563eb !important; outline-offset: 2px; } *:focus:not(:focus-visible) { outline: none !important; } *:focus-visible { outline: 2px solid #2563eb !important; outline-offset: 2px; } @media (max-width: 600px) { .jtbd-input-row { flex-direction: column; } .jtbd-input-row > * { flex: none !important; width: 100% !important; } .jtbd-or { justify-content: center; } .desktop-only-break { display: none; } }" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", minHeight: "80vh" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Jobs-To-Be-Done Statement Checker</h1>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <Milkshake state={sipsyState} size={200} />
          {sipsyLabel}
        </div>
        <div>
          {appState === "default" ? (
            <div>
              <p style={{ fontSize: 18, color: "#1a1a2e", margin: "0 0 24px", lineHeight: 1.6, textAlign: "center", fontWeight: 600 }}>Is your statement a genuine JTBD statement? <br className="desktop-only-break" />Will it make Sipsy the Milkshake happy? Enter it here to find out.</p>
              <div ref={inputRowRef} className="jtbd-input-row" style={{ display: "flex", gap: 16, alignItems: "stretch", marginBottom: 16 }}>
                <textarea value={input} onChange={function(e) { setInput(e.target.value); }} onFocus={function() { setFocused(true); }} onBlur={function() { setFocused(false); }} onKeyDown={onKey} placeholder="Type or paste a statement..." rows={5} style={{ flex: 1, background: "#f5f6f8", border: focused ? "1px solid #2563eb" : "1px solid #d1d5db", borderRadius: 10, padding: "14px 16px", fontSize: 16, lineHeight: 1.6, color: "#1a1a2e", fontFamily: "inherit", resize: "none", boxSizing: "border-box", boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.15)" : "none", transition: "border-color 0.2s, box-shadow 0.2s" }} />
                <div className="jtbd-or" style={{ display: "flex", alignItems: "center", color: "#6b7084", fontSize: 14, fontWeight: 500, flexShrink: 0 }}>or</div>
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" style={{ display: "none" }} onChange={function(e) { if (e.target.files && e.target.files[0]) processFile(e.target.files[0]); }} />
                {imagePreview ? (
                  <div style={{ flex: 1, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid #d1d5db", background: "#fafafa", padding: 8, position: "relative", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="Uploaded screenshot preview" style={{ maxWidth: "100%", maxHeight: 160, borderRadius: 6, objectFit: "contain" }} />
                    <button onClick={function(e) { e.stopPropagation(); clearImage(); if (fileInputRef.current) fileInputRef.current.value = ""; }} style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Remove</button>
                  </div>
                ) : (
                  <div onClick={function() { if (fileInputRef.current) fileInputRef.current.click(); }} onDragOver={function(e) { e.preventDefault(); setDragging(true); }} onDragLeave={function() { setDragging(false); }} onDrop={function(e) { e.preventDefault(); setDragging(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }} style={{ flex: 1, border: dragging ? "2px solid #2563eb" : "2px dashed #d1d5db", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: dragging ? "#2563eb" : "#94a3b8", cursor: "pointer", padding: 16, background: dragging ? "#eff6ff" : "#fafafa", transition: "border-color 0.2s, background 0.2s, color 0.2s" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    <span style={{ fontSize: 13, textAlign: "center" }}>Upload a screenshot</span>
                    <span style={{ fontSize: 11, color: "#b0b5c0" }}>Click or drag an image</span>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                <button onClick={handleSubmit} disabled={!canSubmit} style={{ background: canSubmit ? "#1a1a2e" : "rgba(0,0,0,0.08)", color: canSubmit ? "#ffffff" : "#6b7084", border: "none", borderRadius: 8, padding: "12px 36px", fontSize: 16, fontWeight: 600, cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "background 0.2s" }}>Check It</button>
              </div>
              {showExamples ? (
                <div>
                  <div style={{ fontSize: 18, color: "#1a1a2e", marginBottom: 12, lineHeight: 1.6, textAlign: "center", fontWeight: 600 }}>Try an example:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {EXAMPLES.map(function(ex, i) {
                      var isSelected = input.trim() === ex.trim() && input.trim().length > 0;
                      var bg = isSelected ? "#eff6ff" : (hovered === i ? "#eef0f3" : "#f5f6f8");
                      var borderColor = isSelected ? "#2563eb" : "#e2e4e9";
                      var textColor = isSelected ? "#1e40af" : (hovered === i ? "#1a1a2e" : "#525566");
                      var ring = isSelected ? "0 0 0 2px rgba(37,99,235,0.18)" : "none";
                      return (<button key={i} onClick={function() { handleExample(ex); }} onMouseEnter={function() { setHovered(i); }} onMouseLeave={function() { setHovered(-1); }} style={{ background: bg, border: "1px solid " + borderColor, borderRadius: 8, padding: "10px 14px", fontSize: 16, color: textColor, textAlign: "left", cursor: "pointer", fontFamily: "inherit", lineHeight: 1.45, transition: "background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s", boxShadow: ring }}>{"“" + ex + "”"}</button>);
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {(appState === "loading" || appState === "confirming" || appState === "result") ? (
            <div style={{ border: "1px solid " + (c ? c.border : "#bfdbfe"), background: c ? c.bg : "#eff6ff", borderRadius: 12, padding: "24px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 24, textAlign: "center", transition: "background 0.8s ease, border-color 0.8s ease" }}>
              <span style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, display: "block", color: c ? c.labelColor : "transparent", opacity: c ? 1 : 0, maxHeight: c ? 40 : 0, overflow: "hidden", transition: "opacity 0.6s ease, color 0.6s ease, max-height 0.5s ease" }}>{c ? c.icon : ""}</span>
              <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.5, color: "#1a1a2e", width: "100%" }}>
                {extracting ? (<span style={{ color: "#6b7084", fontWeight: 400 }}>Extracting statement...</span>) : isEditing ? (<textarea value={editedText} onChange={function(e) { setEditedText(e.target.value); }} rows={4} style={{ width: "100%", background: "#ffffff", border: "1px solid #2563eb", borderRadius: 8, padding: "12px 14px", fontSize: 16, lineHeight: 1.6, color: "#1a1a2e", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", boxShadow: "0 0 0 3px rgba(37,99,235,0.15)" }} />) : twDisplayed >= 0 && twDisplayed < submittedText.length ? (<span><span>{submittedText.slice(0, twDisplayed)}</span><span style={{ color: "transparent" }}>{submittedText.slice(twDisplayed)}</span></span>) : (submittedText)}
              </div>
            </div>
          ) : null}

          {appState === "confirming" ? (
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <p style={{ fontSize: 14, color: "#6b7084", margin: "0 0 16px" }}>{isEditing ? "Edit the text above, then confirm." : "Does this look right? You can edit it before checking."}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                {isEditing ? (<button onClick={function() { setSubmittedText(editedText.trim()); setIsEditing(false); }} style={{ background: "none", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, color: "#525566", cursor: "pointer", fontFamily: "inherit" }}>Done editing</button>) : (<button onClick={function() { setIsEditing(true); }} style={{ background: "none", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, color: "#525566", cursor: "pointer", fontFamily: "inherit" }}>Edit</button>)}
                <button onClick={confirmExtraction} disabled={isEditing} style={{ background: isEditing ? "rgba(0,0,0,0.08)" : "#1a1a2e", color: isEditing ? "#6b7084" : "#ffffff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: isEditing ? "not-allowed" : "pointer", fontFamily: "inherit" }}>Looks good, check it</button>
              </div>
            </div>
          ) : null}

          {appState === "result" && result && cFull ? (
            <div style={{ opacity: revealStage >= 3 ? 1 : 0, transform: revealStage >= 3 ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.65s ease, transform 0.65s ease" }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: cFull.labelColor, fontWeight: 600, marginBottom: 4 }}>{cFull.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>{result.label}</div>
              {result.issues && result.issues.length > 0 ? (<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>{result.issues.map(function(issue, i) { return (<span key={i} style={{ display: "inline-block", fontSize: 12, fontWeight: 500, color: cFull.labelColor, background: cFull.rewriteBg, border: "1px solid " + cFull.border, borderRadius: 100, padding: "4px 12px", lineHeight: 1.4 }}>{issue}</span>); })}</div>) : null}
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "#525566", margin: "0 0 20px" }}>{result.explanation}</p>
              {result.rewrite ? (<div style={{ padding: "16px 20px", background: "#f5f6f8", borderRadius: 8, borderLeft: "3px solid #d1d5db", marginBottom: 20 }}><div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7084", marginBottom: 8, fontWeight: 600 }}>Suggested rewrite</div><p style={{ fontSize: 16, lineHeight: 1.6, color: "#1a1a2e", margin: 0, fontStyle: "italic" }}>{"“" + result.rewrite + "”"}</p></div>) : null}
              {result.school_note ? (<p style={{ fontSize: 16, lineHeight: 1.65, color: "#525566", margin: "0 0 24px" }}>{result.school_note}</p>) : null}
              {error ? (<div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: 14, color: "#991b1b", marginBottom: 20 }}>{error}</div>) : null}
              <div><button onClick={handleReset} style={{ background: "#1a1a2e", color: "#ffffff", border: "none", borderRadius: 8, padding: "12px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Check Another</button></div>
            </div>
          ) : null}

          {error && appState !== "result" ? (
            <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: 14, color: "#991b1b", marginBottom: 20 }}>{error}</div>
          ) : null}
        </div>
      </div>
    </div>
    <div style={{ background: "#f5f6f8", borderTop: "1px solid #d1d5db", padding: "43px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 16, color: "#525566", margin: "0 0 16px", lineHeight: 1.5 }}>{"If you want to play with the milkshake animations, "}<a href="/playground" style={{ color: "#2563eb", textDecoration: "underline", textUnderlineOffset: 2 }}>click here</a>.</p>
        <p style={{ fontSize: 16, color: "#525566", margin: "20px 0 0", lineHeight: 1.5 }}>{"And if you want to know why a milkshake is the mascot for this tool, "}<a href="https://www.youtube.com/watch?v=Stc0beAxavY" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline", textUnderlineOffset: 2 }}>watch this video<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", marginLeft: 3, verticalAlign: "middle", position: "relative", top: -1 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg></a>.</p>
      </div>
    </div>
    </>
  );
}
