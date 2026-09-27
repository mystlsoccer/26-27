/* MYSTL League 26-27 — league data.
   This is the only file you need to edit after each matchday:
   1. Change UPDATED to today's date.
   2. In that round, add each match's goals, one entry per scorer:
        ["Team", "Player", [minute, minute]]   e.g. ["Haramball", "Aarizz Mohammed", [4, 13, 14]]
      If goal times weren't recorded, put the number of goals instead of minutes:
        ["Chevapi FC", "Adam Altrakrouri", 5]
   3. Set played: true on the round.
   The table, top scorers, season numbers and next matchday all update themselves. */

var UPDATED = "27 September 2026";

// Team names here must match the names used in ROUNDS exactly.
var TEAMS = [
  "Chevapi FC", "Haramball", "Caballo Court FC", "Brazilian Pharaohs",
  "Outcast FC", "Ilyes FC", "Taim FC", "Golden Dawn"
];

var SPONSORS = [
  {name: "Biryani House",    logo: "sponsor-biryani-house.png"},
  {name: "MOTW Coffee",      logo: "sponsor-motw-coffee.png"},
  {name: "Epic Hot Chicken", logo: "sponsor-epic-hot-chicken.png"}
];

var ROUNDS = [
  {round:1, day:"Saturday 12 September", played:true, note:"Opening game",
   halaqa:"Halaqa: “Beyond the Scoreboard: Islam & Sportsmanship” with Mufti Asif Umar",
   matches:[
    {home:"Ilyes FC", away:"Outcast FC", goals:[["Ilyes FC","Zayd Khan",2],["Outcast FC","Fakhir Haque",2]]},
    {home:"Brazilian Pharaohs", away:"Caballo Court FC", goals:[["Brazilian Pharaohs","Ahmed Elbealy",1],["Caballo Court FC","Behzad Sedeiqi",1],["Caballo Court FC","Khalaf Alrashid",1]]},
    {home:"Golden Dawn", away:"Chevapi FC", goals:[["Chevapi FC","Adam Altrakrouri",5],["Chevapi FC","Farooq",1]]},
    {home:"Haramball", away:"Taim FC", goals:[["Haramball","Aarizz Mohammed",2],["Taim FC","Om Uppara",1]]}
  ]},
  {round:2, day:"Saturday 26 September", played:true, matches:[
    {home:"Ilyes FC", away:"Caballo Court FC", goals:[["Caballo Court FC","Behzad Sedeiqi",[12]]]},
    {home:"Outcast FC", away:"Chevapi FC", goals:[["Outcast FC","Fakhir Haque",[8]],["Outcast FC","Fuzail Pasha",[10]],["Chevapi FC","Ismail",[8]],["Chevapi FC","Adam Altrakrouri",[12,12]]]},
    {home:"Brazilian Pharaohs", away:"Taim FC", goals:[["Brazilian Pharaohs","Omar Elbealy",[2]],["Brazilian Pharaohs","Hamza Ahmad",[5,6]],["Taim FC","Ibrahim Taher",[3,6]]]},
    {home:"Golden Dawn", away:"Haramball", goals:[["Golden Dawn","Ali Shahab",[6]],["Haramball","Aarizz Mohammed",[4,13,14]],["Haramball","Saad Salahudiin",[13]],["Haramball","Ameer Darbadwan",[14]]]}
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
