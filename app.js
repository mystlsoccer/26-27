"use strict";
/* Builds the page from data.js. No need to edit this file. */

/* ---------- calculations ---------- */
// a goal entry is [team, player, minutes[]] or [team, player, count]
function goalCount(g){ return Array.isArray(g[2]) ? g[2].length : g[2]; }
var FORFEIT_SCORE = 3;
function goalsFor(m, team){
  // a forfeited game is recorded 3-0, with no goals credited to any player
  if(m.forfeit) return (m.forfeit === "home") === (team === m.home) ? 0 : FORFEIT_SCORE;
  return (m.goals || []).reduce(function(n, g){ return g[0] === team ? n + goalCount(g) : n; }, 0);
}
var played = ROUNDS.filter(function(r){ return r.played; });
var upcoming = ROUNDS.filter(function(r){ return !r.played; });

/* Handbook order: points, then goal difference, then head to head, then goals
   against. (Disciplinary record is the handbook's last tiebreaker; cards aren't
   recorded here, so teams still level fall back to alphabetical order.) */
function standings(){
  var rows = {}, h2h = {};
  TEAMS.forEach(function(t){ rows[t] = {team:t, p:0, w:0, d:0, l:0, gf:0, ga:0}; });
  played.forEach(function(r){
    r.matches.forEach(function(m){
      var h = goalsFor(m, m.home), a = goalsFor(m, m.away), H = rows[m.home], A = rows[m.away];
      H.p++; A.p++; H.gf += h; H.ga += a; A.gf += a; A.ga += h;
      if(h > a){ H.w++; A.l++; } else if(h < a){ A.w++; H.l++; } else { H.d++; A.d++; }
      h2h[m.home + "|" + m.away] = (h2h[m.home + "|" + m.away] || 0) + (h > a ? 3 : h === a ? 1 : 0);
      h2h[m.away + "|" + m.home] = (h2h[m.away + "|" + m.home] || 0) + (a > h ? 3 : a === h ? 1 : 0);
    });
  });
  var all = TEAMS.map(function(t){
    var r = rows[t]; r.gd = r.gf - r.ga; r.pts = r.w * 3 + r.d; return r;
  }).sort(function(x, y){ return y.pts - x.pts || y.gd - x.gd; });

  // teams still level on points and goal difference: a mini-league between them
  var out = [], i = 0;
  while(i < all.length){
    var j = i;
    while(j + 1 < all.length && all[j + 1].pts === all[i].pts && all[j + 1].gd === all[i].gd) j++;
    var tied = all.slice(i, j + 1);
    if(tied.length > 1){
      tied.sort(function(x, y){
        var xp = 0, yp = 0;
        tied.forEach(function(o){
          if(o.team !== x.team) xp += h2h[x.team + "|" + o.team] || 0;
          if(o.team !== y.team) yp += h2h[y.team + "|" + o.team] || 0;
        });
        return yp - xp || x.ga - y.ga || x.team.localeCompare(y.team);
      });
    }
    out = out.concat(tied);
    i = j + 1;
  }
  return out;
}
function scorers(){
  var map = {}, keys = [];
  played.forEach(function(r){
    r.matches.forEach(function(m){
      m.goals.forEach(function(g){
        if(g[1] === "Own goal" || g[1] === "Unknown") return;   // not a Golden Boot goal
        var k = g[1] + "|" + g[0];
        if(!map[k]){ map[k] = {player:g[1], team:g[0], goals:0}; keys.push(k); }
        map[k].goals += goalCount(g);
      });
    });
  });
  var pinned = typeof SCORER_PRIORITY !== "undefined" ? SCORER_PRIORITY : [];
  function pin(p){ var i = pinned.indexOf(p); return i === -1 ? pinned.length : i; }
  return keys.map(function(k){ return map[k]; }).sort(function(a, b){
    return b.goals - a.goals || pin(a.player) - pin(b.player) || a.player.localeCompare(b.player);
  });
}

/* ---------- helpers ---------- */
function roundName(r){ return r.name || ("Round " + r.round); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function el(id){ return document.getElementById(id); }
function signed(n){ return n > 0 ? "+" + n : n < 0 ? "−" + Math.abs(n) : "0"; }
function scorerLines(m, team){
  var gs = (m.goals || []).filter(function(g){ return g[0] === team; });
  return gs.map(function(g){
    var detail = Array.isArray(g[2])
      ? " " + g[2].map(function(min){ return min + "'"; }).join(", ")
      : (g[2] > 1 ? " ×" + g[2] : "");
    return '<span>' + esc(g[1]) + '<em>' + detail + '</em></span>';
  }).join("");
}
function matchCard(m){
  var h = goalsFor(m, m.home), a = goalsFor(m, m.away);
  return '<article class="match' + (m.forfeit ? " is-forfeit" : "") + '">' +
    '<div class="match-top">' +
      '<h4 class="club home">' + esc(m.home) + '</h4>' +
      '<span class="score">' + h + '<i>–</i>' + a + '</span>' +
      '<h4 class="club away">' + esc(m.away) + '</h4>' +
    '</div>' +
    (m.forfeit
      ? '<p class="forfeit">Forfeited</p>'
      : m.goals.length ? '<div class="scorers"><div class="home">' + scorerLines(m, m.home) + '</div><div class="away">' + scorerLines(m, m.away) + '</div></div>' : '') +
  '</article>';
}
function fixtureRow(m){
  return '<li class="fixture"><span class="club home">' + esc(m.home) + '</span><span class="vs">VS</span><span class="club away">' + esc(m.away) + '</span></li>';
}

/* ---------- render ---------- */
var tbl = standings(), sc = scorers();
// every league goal, own goals included
var totalGoals = played.reduce(function(n, r){
  return n + r.matches.reduce(function(k, m){
    return k + (m.forfeit ? 0 : (m.goals || []).reduce(function(j, g){ return j + goalCount(g); }, 0));
  }, 0);
}, 0);
var matchesPlayed = played.reduce(function(n, r){ return n + r.matches.length; }, 0);
var last = played[played.length - 1];

el("stats").innerHTML =
  '<span>IFGSTL Gym</span><b aria-hidden="true">·</b>' +
  '<span>' + matchesPlayed + ' matches</span><b aria-hidden="true">·</b>' +
  '<span>' + totalGoals + ' goals</span>';

// league table
el("tableSub").textContent = roundName(last) + " standings";
el("tbody").innerHTML = tbl.map(function(r, i){
  return '<tr>' +
    '<td class="pos">' + (i + 1) + '</td>' +
    '<td class="name">' + esc(r.team) + '</td>' +
    '<td class="n">' + r.w + '</td><td class="n">' + r.d + '</td><td class="n">' + r.l + '</td>' +
    '<td class="pill-cell"><span class="pill lime">' + signed(r.gd) + '</span></td>' +
    '<td class="pill-cell"><span class="pill green">' + r.pts + '</span></td>' +
  '</tr>';
}).join("");

// top scorers: everyone on 2+, the rest folded away
var shown = sc.filter(function(s){ return s.goals >= 2; });
var rest = sc.filter(function(s){ return s.goals < 2; });
var rank = 0, prev = null;
var ownRank = typeof SCORER_OWN_RANK !== "undefined" ? SCORER_OWN_RANK : [];
el("boot").innerHTML = shown.map(function(s, i){
  if(s.goals !== prev || ownRank.indexOf(s.player) !== -1){ rank = i + 1; prev = s.goals; }
  return '<li><span class="rk">' + rank + '</span><span class="who">' + esc(s.player) + '</span>' +
    '<span class="club">' + esc(s.team) + '</span><span class="pill lime">' + s.goals + (s.goals === 1 ? " goal" : " goals") + '</span></li>';
}).join("");
if(rest.length){
  el("bootMoreLabel").textContent = rest.length + " more players on 1 goal";
  el("bootRest").textContent = rest.map(function(s){ return s.player + " (" + s.team + ")"; }).join(" · ");
} else { el("bootMore").hidden = true; }

// latest round
el("latestTitle").textContent = roundName(last) + " Results";
el("latestSub").textContent = last.day;
el("latest").innerHTML = last.matches.map(matchCard).join("");

// next matchday: every upcoming round on the first upcoming date
if(upcoming.length){
  var nextDay = upcoming[0].day;
  var sameDay = upcoming.filter(function(r){ return r.day === nextDay; });
  el("nextSub").textContent = nextDay + (sameDay.length > 1 ? " · Doubleheader" : "");
  if(sameDay.length > 1) el("nextBody").classList.add("two");
  el("nextBody").innerHTML = sameDay.map(function(r){
    return '<div class="fx-group"><h4>' + esc(roundName(r)) + '</h4><ul class="fixtures">' + r.matches.map(fixtureRow).join("") + '</ul></div>';
  }).join("");
  var later = upcoming.filter(function(r){ return r.day !== nextDay; });
  if(later.length > 1) el("laterBody").classList.add("two");
  el("laterBody").innerHTML = later.length
    ? later.map(function(r){ return '<div class="fx-group"><h4>' + esc(roundName(r)) + ' · ' + esc(r.day) + '</h4><ul class="fixtures">' + r.matches.map(fixtureRow).join("") + '</ul></div>'; }).join("")
    : '<p class="note">More fixtures coming soon.</p>';
} else {
  el("nextSub").textContent = "To be announced";
  el("laterBody").innerHTML = '<p class="note">More fixtures coming soon.</p>';
}

// notices (e.g. a weekend off) sit at the top of Next Matchday
var notices = typeof NOTICES !== "undefined" ? NOTICES : [];
if(notices.length){
  el("next").querySelector(".title").insertAdjacentHTML("afterend", notices.map(function(n){
    return '<p class="notice">' + esc(n) + '</p>';
  }).join(""));
}

// earlier rounds, newest first
var earlier = played.slice(0, -1).reverse();
el("earlier").innerHTML = earlier.length ? earlier.map(function(r){
  return '<div class="round"><div class="label"><h3>' + esc(roundName(r)) + '</h3><span>' + esc(r.day) + (r.note ? " · " + esc(r.note) : "") + '</span></div>' +
    '<div class="matches">' + r.matches.map(matchCard).join("") + '</div>' +
    (r.halaqa ? '<p class="halaqa">' + esc(r.halaqa) + '</p>' : '') + '</div>';
}).join("") : '';
if(!earlier.length) el("earlierSection").hidden = true;

// sponsors
el("sponsorList").innerHTML = SPONSORS.map(function(s){
  return '<li><img src="' + esc(s.logo) + '" alt="' + esc(s.name) + '" loading="lazy"></li>';
}).join("");
if(!SPONSORS.length) el("sponsors").hidden = true;

// squads
el("rosters").innerHTML = ROSTERS.map(function(t){
  return '<article class="squad"><h3>' + esc(t.team) + '<span>' + t.players.length + '</span></h3>' +
    '<ol>' + t.players.map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("") + '</ol></article>';
}).join("");

// official rules
el("rules").innerHTML = RULES.map(function(g){
  return '<article class="rulecard' + (g.wide ? " wide" : "") + '"><h3>' + esc(g.title) + '</h3><dl>' +
    g.items.map(function(it){ return '<div><dt>' + esc(it[0]) + '</dt><dd>' + esc(it[1]) + '</dd></div>'; }).join("") +
    '</dl></article>';
}).join("");
