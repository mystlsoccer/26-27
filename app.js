"use strict";
/* Builds the page from data.js. No need to edit this file. */
function goalsFor(m, team){
  return (m.goals || []).reduce(function(n, g){ return g[0] === team ? n + g[2] : n; }, 0);
}
var played = ROUNDS.filter(function(r){ return r.played; });
var upcoming = ROUNDS.filter(function(r){ return !r.played; });

function standings(){
  var rows = {};
  Object.keys(TEAMS).forEach(function(t){ rows[t] = {team:t, p:0, w:0, d:0, l:0, gf:0, ga:0, form:[]}; });
  played.forEach(function(r){
    r.matches.forEach(function(m){
      var h = goalsFor(m, m.home), a = goalsFor(m, m.away), H = rows[m.home], A = rows[m.away];
      H.p++; A.p++; H.gf += h; H.ga += a; A.gf += a; A.ga += h;
      if(h > a){ H.w++; A.l++; H.form.push("w"); A.form.push("l"); }
      else if(h < a){ A.w++; H.l++; A.form.push("w"); H.form.push("l"); }
      else { H.d++; A.d++; H.form.push("d"); A.form.push("d"); }
    });
  });
  return Object.keys(rows).map(function(t){
    var r = rows[t]; r.gd = r.gf - r.ga; r.pts = r.w * 3 + r.d; return r;
  }).sort(function(x, y){
    return y.pts - x.pts || y.gd - x.gd || y.gf - x.gf || x.team.localeCompare(y.team);
  });
}
function scorers(){
  var map = {}, keys = [];
  played.forEach(function(r){
    r.matches.forEach(function(m){
      m.goals.forEach(function(g){
        var k = g[1] + "|" + g[0];
        if(!map[k]){ map[k] = {player:g[1], team:g[0], goals:0}; keys.push(k); }
        map[k].goals += g[2];
      });
    });
  });
  return keys.map(function(k){ return map[k]; }).sort(function(a, b){
    return b.goals - a.goals || a.player.localeCompare(b.player);
  });
}

/* ===================== RENDER ===================== */
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function color(t){ return "hsl(" + TEAMS[t].hue + " 56% 44%)"; }
function crest(t){ return '<span class="crest" style="background:' + color(t) + '" aria-hidden="true">' + TEAMS[t].code + '</span>'; }
function el(id){ return document.getElementById(id); }
function word(n){ return ["No","One","Two","Three","Four","Five","Six","Seven","Eight"][n] || String(n); }
function scorerList(m, team){
  var gs = m.goals.filter(function(g){ return g[0] === team; });
  if(!gs.length) return '<span class="none">—</span>';
  return gs.map(function(g){ return esc(g[1]) + (g[2] > 1 ? " ×" + g[2] : ""); }).join(", ");
}

var tbl = standings(), sc = scorers();
var totalGoals = sc.reduce(function(n, s){ return n + s.goals; }, 0);
var last = played[played.length - 1];

el("stamp").textContent = "Updated " + UPDATED;
el("footStamp").textContent = "Results through Round " + last.round + " · updated " + UPDATED;

// season numbers under the wordmark
var unbeaten = tbl.filter(function(r){ return r.l === 0 && r.p > 0; }).length;
el("facts").innerHTML =
  '<div><b>' + last.round + '</b><span>Rounds played</span></div>' +
  '<div><b>' + totalGoals + '</b><span>Goals</span></div>' +
  '<div><b>' + unbeaten + '</b><span>Unbeaten</span></div>';

// latest scores
el("latestTitle").textContent = "Round " + last.round + " scores";
el("latestSub").textContent = last.day;
el("scores").innerHTML = last.matches.map(function(m){
  var h = goalsFor(m, m.home), a = goalsFor(m, m.away);
  function row(t, g, lost){ return '<div class="row' + (lost ? " lost" : "") + '">' + crest(t) + '<span class="t">' + esc(t) + '</span><span class="g">' + g + '</span></div>'; }
  return '<div class="card score"><span class="ft">FULL TIME</span>' + row(m.home, h, h < a) + row(m.away, a, a < h) + '</div>';
}).join("");

// table
el("tableSub").textContent = "After Round " + last.round;
el("tbody").innerHTML = tbl.map(function(r, i){
  var gd = (r.gd > 0 ? "+" : r.gd < 0 ? "−" : "") + Math.abs(r.gd);
  var form = r.form.map(function(f){ return '<span class="pill ' + f + '" title="' + ({w:"Win",d:"Draw",l:"Loss"})[f] + '">' + f.toUpperCase() + '</span>'; }).join("");
  return '<tr' + (i === 0 ? ' class="lead"' : '') + '>' +
    '<td class="pos">' + (i + 1) + '</td>' +
    '<td class="l"><div class="team">' + crest(r.team) + '<span>' + esc(r.team) + '</span></div></td>' +
    '<td class="n">' + r.p + '</td><td class="n">' + r.w + '</td><td class="n">' + r.d + '</td><td class="n">' + r.l + '</td>' +
    '<td class="gd">' + gd + '</td><td class="pts">' + r.pts + '</td>' +
    '<td class="l"><span class="form">' + form + '</span></td></tr>';
}).join("");

// golden boot: everyone on 2+ listed, the rest folded away
var peak = sc.length ? sc[0].goals : 1;
var shown = sc.filter(function(s){ return s.goals >= 2; });
var rest = sc.filter(function(s){ return s.goals < 2; });
var rank = 0, prev = null;
el("bootSub").textContent = sc.length + " scorers · " + totalGoals + " goals";
el("boot").innerHTML = shown.map(function(s, i){
  if(s.goals !== prev){ rank = i + 1; prev = s.goals; }
  return '<li' + (s.goals === peak ? ' class="top"' : '') + '><span class="rk">' + rank + '</span>' +
    '<span class="who"><span class="name">' + esc(s.player) + '</span><span class="club">' + esc(s.team) + '</span>' +
    '<span class="bar"><i style="width:' + Math.round(s.goals / peak * 100) + '%;background:' + color(s.team) + '"></i></span></span>' +
    '<span class="gl">' + s.goals + '</span></li>';
}).join("");
if(rest.length){
  el("bootMoreLabel").textContent = rest.length + " more on 1 goal";
  el("bootRest").textContent = rest.map(function(s){ return s.player + " (" + TEAMS[s.team].code + ")"; }).join(" · ");
} else { el("bootMore").hidden = true; }

// next matchday: every upcoming round on the first upcoming date
function fxRow(m){
  return '<div class="fx"><span class="h">' + crest(m.home) + '<span>' + esc(m.home) + '</span></span>' +
    '<span class="v">VS</span><span class="a"><span>' + esc(m.away) + '</span>' + crest(m.away) + '</span></div>';
}
if(upcoming.length){
  var nextDay = upcoming[0].day;
  var sameDay = upcoming.filter(function(r){ return r.day === nextDay; });
  el("nextCard").innerHTML =
    '<div class="next-hd"><b>' + esc(nextDay) + '</b><span>' +
      (sameDay.length > 1 ? "Doubleheader · Rounds " + sameDay.map(function(r){ return r.round; }).join(" & ") : "Round " + sameDay[0].round) +
    '</span></div><div class="next-body">' +
    sameDay.map(function(r){ return '<div class="rnd"><h3>Round ' + r.round + '</h3>' + r.matches.map(fxRow).join("") + '</div>'; }).join("") +
    '</div>';
  var laterRounds = upcoming.filter(function(r){ return r.day !== nextDay; });
  el("fixturesSub").textContent = laterRounds.length ? "After the next matchday" : "";
  el("later").innerHTML = laterRounds.length
    ? laterRounds.map(function(r){ return '<h3>Round ' + r.round + ' · ' + esc(r.day) + '</h3>' + r.matches.map(fxRow).join(""); }).join("")
    : '<p class="foot-note" style="padding:14px 18px;margin:0">More fixtures coming soon.</p>';
} else {
  el("nextCard").innerHTML = '<div class="next-hd"><b>Fixtures to be announced</b></div>';
  el("later").innerHTML = '<p class="foot-note" style="padding:14px 18px;margin:0">More fixtures coming soon.</p>';
}

// results, newest round first
el("rounds").innerHTML = played.slice().reverse().map(function(r){
  return '<div class="round"><div class="round-hd"><h3>Round ' + r.round + '</h3><span>' + esc(r.day) + (r.note ? " · " + esc(r.note) : "") + '</span></div>' +
    '<div class="matches">' + r.matches.map(function(m){
      var h = goalsFor(m, m.home), a = goalsFor(m, m.away);
      return '<div class="card m"><div class="m-top">' +
        '<span class="side' + (h < a ? " lost" : "") + '">' + crest(m.home) + '<span>' + esc(m.home) + '</span></span>' +
        '<span class="res">' + h + '–' + a + '</span>' +
        '<span class="side away' + (a < h ? " lost" : "") + '"><span>' + esc(m.away) + '</span>' + crest(m.away) + '</span></div>' +
        '<div class="m-goals"><span>' + scorerList(m, m.home) + '</span><span class="away">' + scorerList(m, m.away) + '</span></div></div>';
    }).join("") + '</div>' +
    (r.halaqa ? '<p class="halaqa">' + esc(r.halaqa) + '</p>' : '') + '</div>';
}).join("");
