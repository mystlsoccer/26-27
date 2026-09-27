/* MYSTL League 26-27 — league data.
   This is the only file you need to edit after each matchday:
   1. Change UPDATED to today's date.
   2. In that round, add each match's goals as ["Team", "Player", number of goals].
   3. Set played: true on the round.
   The table, Golden Boot, season numbers and next matchday all update themselves. */

var UPDATED = "27 September 2026";

var TEAMS = {
  "Chevapi FC":         {code:"CHV", hue:268},
  "Haramball":          {code:"HRB", hue:4},
  "Caballo Court FC":   {code:"CAB", hue:152},
  "Brazilian Pharaohs": {code:"BPH", hue:45},
  "Outcast FC":         {code:"OUT", hue:212},
  "Ilyes FC":           {code:"ILY", hue:352},
  "Taim FC":            {code:"TAI", hue:190},
  "Golden Dawn":        {code:"GLD", hue:30}
};

// goals: [scoring team, player, count]
var ROUNDS = [
  {round:1, day:"Saturday 12 September", played:true, note:"Opening game",
   halaqa:"Halaqa: “Beyond the Scoreboard: Islam & Sportsmanship” with Mufti Asif Umar",
   matches:[
    {home:"Ilyes FC", away:"Outcast FC", goals:[["Ilyes FC","Zayd Khan",2],["Outcast FC","Fakhir Haque",2]]},
    {home:"Brazilian Pharaohs", away:"Caballo Court FC", goals:[["Brazilian Pharaohs","Ahmed Elbealy",1],["Caballo Court FC","Behzad Sedeiqi",1],["Caballo Court FC","Khalaf Alrashid",1]]},
    {home:"Golden Dawn", away:"Chevapi FC", goals:[["Chevapi FC","Adam",5],["Chevapi FC","Farooq",1]]},
    {home:"Haramball", away:"Taim FC", goals:[["Haramball","Aarizz Mohammed",2],["Taim FC","Om Uppara",1]]}
  ]},
  {round:2, day:"Saturday 26 September", played:true, matches:[
    {home:"Ilyes FC", away:"Caballo Court FC", goals:[["Caballo Court FC","Behzad Sedeiqi",1]]},
    {home:"Outcast FC", away:"Chevapi FC", goals:[["Outcast FC","Fakhir Haque",1],["Outcast FC","Fuzail Pasha",1],["Chevapi FC","Adam",2],["Chevapi FC","Ismail",1]]},
    {home:"Brazilian Pharaohs", away:"Taim FC", goals:[["Brazilian Pharaohs","Omar Elbealy",1],["Brazilian Pharaohs","Hamza Ahmad",2],["Taim FC","Ibrahim Taher",2]]},
    {home:"Golden Dawn", away:"Haramball", goals:[["Golden Dawn","Ali Shahab",1],["Haramball","Aarizz Mohammed",3],["Haramball","Saad Salahudiin",1],["Haramball","Ameer Darbadwan",1]]}
  ]},
  {round:3, day:"Saturday 3 October", note:"Doubleheader", matches:[
    {home:"Ilyes FC", away:"Chevapi FC"},
    {home:"Caballo Court FC", away:"Taim FC"},
    {home:"Outcast FC", away:"Haramball"},
    {home:"Brazilian Pharaohs", away:"Golden Dawn"}
  ]},
  {round:4, day:"Saturday 3 October", note:"Doubleheader", matches:[
    {home:"Ilyes FC", away:"Taim FC"},
    {home:"Chevapi FC", away:"Haramball"},
    {home:"Caballo Court FC", away:"Golden Dawn"},
    {home:"Outcast FC", away:"Brazilian Pharaohs"}
  ]},
  {round:5, day:"Sunday 11 October", matches:[
    {home:"Ilyes FC", away:"Haramball"},
    {home:"Taim FC", away:"Golden Dawn"},
    {home:"Chevapi FC", away:"Brazilian Pharaohs"},
    {home:"Caballo Court FC", away:"Outcast FC"}
  ]},
  {round:6, day:"Sunday 18 October", matches:[
    {home:"Ilyes FC", away:"Golden Dawn"},
    {home:"Haramball", away:"Brazilian Pharaohs"},
    {home:"Taim FC", away:"Outcast FC"},
    {home:"Chevapi FC", away:"Caballo Court FC"}
  ]}
];
