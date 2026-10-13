/* MYSTL League 26-27 — league data.
   This is the only file you need to edit after each matchday:
   1. In that round, add each match's goals, one entry per scorer:
        ["Team", "Player", [minute, minute]]   e.g. ["Haramball", "Aarizz Mohammed", [4, 13, 14]]
      If goal times weren't recorded, put the number of goals instead of minutes:
        ["Chevapi FC", "Adam Altrakrouri", 5]
      An own goal goes to the team that benefited, with the player name "Own goal".
      Friendlies are not league games — leave them out of this file.
      A forfeit is goals:[] plus forfeit:"home" or forfeit:"away" naming the side that
      forfeited; the other side is given a 3-0 win.
   2. Set played: true on the round.
   The table, top scorers, season numbers and next matchday all update themselves. */

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
  {round:3, name:"Rounds 3 & 4", day:"Saturday 3 October", played:true, note:"Doubleheader", matches:[
    {home:"Taim FC", away:"Ilyes FC", goals:[["Taim FC","Malik Helwani",[7,13]]]},
    {home:"Outcast FC", away:"Brazilian Pharaohs", goals:[["Outcast FC","Fuzail Pasha",[3]],["Brazilian Pharaohs","Hamza Ahmad",[2,5,5,14]],["Brazilian Pharaohs","Omar Elbealy",[7]],["Brazilian Pharaohs","Ahmed Elbealy",[14]]]},
    {home:"Caballo Court FC", away:"Taim FC", goals:[["Caballo Court FC","Khalaf Alrashid",[7]],["Taim FC","Own goal",[1]],["Taim FC","Ibrahim Taher",[14]]]},
    {home:"Chevapi FC", away:"Haramball", goals:[["Chevapi FC","Adam Altrakrouri",[13]],["Haramball","Saad Salahudiin",[2,13]]]},
    {home:"Outcast FC", away:"Haramball", goals:[["Haramball","Muad Yussuf",[3,10,11]],["Haramball","Aarizz Mohammed",[4,10]],["Haramball","Saad Salahudiin",[13]]]},
    // forfeits: the handbook awards a 3-0 win. "forfeit" names the side that forfeited.
    {home:"Ilyes FC", away:"Chevapi FC", goals:[], forfeit:"away"},
    {home:"Brazilian Pharaohs", away:"Golden Dawn", goals:[], forfeit:"away"},
    {home:"Caballo Court FC", away:"Golden Dawn", goals:[], forfeit:"away"}
  ]},
  {round:5, day:"Sunday 11 October", played:true, matches:[
    {home:"Ilyes FC", away:"Haramball", goals:[["Haramball","Saad Salahudiin",[2]],["Haramball","Aarizz Mohammed",[9]]]},
    {home:"Taim FC", away:"Golden Dawn", goals:[["Taim FC","Ikhana Hildebolt",[5]],["Taim FC","Hamzah Alhamad",[12]],["Taim FC","Om Uppara",[12]],["Golden Dawn","Ali Shahab",[13]],["Taim FC","Ibrahim Taher",[14]]]},
    {home:"Chevapi FC", away:"Brazilian Pharaohs", goals:[["Chevapi FC","Mujahed",[1]],["Brazilian Pharaohs","Hamza Ahmad",[2,6,14]],["Chevapi FC","Ismail",[5]],["Chevapi FC","Farooq",[13]]]},
    {home:"Caballo Court FC", away:"Outcast FC", goals:[], forfeit:"away"}
  ]}
];

/* Players listed here come first when several players are level on goals.
   Everyone else is alphabetical. */
var SCORER_PRIORITY = ["Malik Helwani"];

/* Players listed here get their own position number instead of sharing it
   with the player above on the same goals (e.g. 2nd and 3rd, not 2nd and 2nd). */
var SCORER_OWN_RANK = ["Adam Altrakrouri"];

/* Squads — names only. Add a player by adding their name to the list. */
var ROSTERS = [
  {team:"Outcast FC", players:["Mohammed Rayhaan","Fuzail Pasha","Daris Halilic","Fakhir Haque","Fahim Salam","Shaharyar Fareed"]},
  {team:"Caballo Court FC", players:["Behzad Sedeiqi","Ahmed Alyahya","Mezo Abuawwad","Hamzah Alrashid","Mohammad Moktad","Khalaf Alrashid","Paxton Husted"]},
  {team:"Chevapi FC", players:["Mujahed","Abdallah","Farooq","Ismail","Adam Altrakrouri","Zaid","Zain","Noor"]},
  {team:"Taim FC", players:["Ibrahim Taher","Ikhana Hildebolt","Om Uppara","Malik Helwani","Hamzah Alhamad","Ali Abdulsattar","Taim Abdulnabi","Rayan Haq"]},
  {team:"Haramball", players:["Muad Yussuf","Saad Salahudiin","Aarizz Mohammed","Hashiir Khan","Ameer Darbadwan","Zaidan Alhemiary","Ashaz"]},
  {team:"Golden Dawn", players:["Ariyan Hoque","Murtaza","Zaid Paracha","Omar Koder","Ibrahim Eljourni","Muayd Munsoor","Ahsan","Ali Shahab"]},
  {team:"Brazilian Pharaohs", players:["Marawan Mostafa","Hamza Ahmad","Omar Elbealy","Ahmed Elbealy","Yaseen Fekry","Moemen Mostafa","Zeyad Elolemy"]},
  {team:"Ilyes FC", players:["Ibrahim Sumic","Ilyes Nair","Zayd Khan","Ibrahim Albarcha","Belal Safi","Samy Dake","Ahmed Hagras","Zayd Alkhiyat"]}
];

/* Official handbook rules. */
var RULES = [
  {title:"League details", wide:true, items:[
    ["Ages", "14–18"],
    ["Teams", "8 teams, majority Muslim"],
    ["Sign-up fee", "$5 per player"],
    ["Season launch", "Sep 12, 1:30 PM"],
    ["Team check-in", "2:00–2:20 PM (mandatory)"],
    ["Location", "IFGSTL Gym"]
  ]},
  {title:"Match rules & timing", wide:true, items:[
    ["Matches", "Two 7-minute halves (running clock)"],
    ["Interval", "2-minute break"],
    ["Field format", "5v5 — 4 on field + 1 goalkeeper"],
    ["Roster", "8 players total (3 subs max)"],
    ["Substitutions", "On the fly at the bench (exit before entry)"],
    ["Offsides", "None"],
    ["Slide tackling", "Not allowed for field players — direct free kick"],
    ["Pass-back", "No GK handling of deliberate foot passes"],
    ["Forfeit", "5-minute grace period, then a 3–0 loss"],
    ["Roster lock", "No team switching in the middle of the league"]
  ]},
  {title:"Discipline", items:[
    ["Yellow card", "Warning"],
    ["Red card", "Immediate ejection from the game"],
    ["Zero tolerance", "Fighting or dissent is a yellow or red card as applicable"]
  ]},
  {title:"Standings & prizes", items:[
    ["Points", "Win 3 · Draw 1 · Loss 0"],
    ["1st place", "$400 per team"],
    ["2nd place", "$200 per team"],
    ["Tiebreakers", "1. Goal difference · 2. Head to head · 3. Goals against · 4. Disciplinary record"]
  ]}
];
