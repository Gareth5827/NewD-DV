// Example data
const races = [
  { name: "Dwarf", set: "Basic", stats: { STR:2, CON:1, WIZ:-1, CHA:-1, INT:-1 } },
  { name: "Elf", set: "Otherworldly beings", stats: { DEX:2, WIZ:1, INT:1, CON:-1 } }
];

const classes = [
  { name: "Barbarian", set: "Steel and blood", stats: { STR:1, CON:2, INT:-2, WIZ:-1 } },
  { name: "Wizard", set: "Deep magics", stats: { WIZ:3, INT:2, STR:-1, CON:-1 } }
];

let selectedRace = null;
let selectedClass = null;

// Page navigation
function goToPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(pageId).style.display = "block";

  if (pageId === "SelectRacePage") renderRaceGrid();
  if (pageId === "SelectClassPage") renderClassGrid();
  if (pageId === "GeneratePage") renderOverview();
}

// Render race cards
function renderRaceGrid() {
  const grid = document.getElementById("raceGrid");
  grid.innerHTML = "";
  races.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${r.name}</strong>`;
    card.onclick = () => showRace(r);
    grid.appendChild(card);
  });
}

function showRace(race) {
  selectedRace = race;
  document.getElementById("raceName").textContent = race.name;
  document.getElementById("raceDetails").textContent = JSON.stringify(race.stats);
  goToPage("RacePage");
}

function selectRace() {
  goToPage("SelectClassPage");
}

// Render class cards
function renderClassGrid() {
  const grid = document.getElementById("classGrid");
  grid.innerHTML = "";
  classes.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${c.name}</strong>`;
    card.onclick = () => showClass(c);
    grid.appendChild(card);
  });
}

function showClass(cls) {
  selectedClass = cls;
  document.getElementById("className").textContent = cls.name;
  document.getElementById("classDetails").textContent = JSON.stringify(cls.stats);
  goToPage("ClassPage");
}

function selectClass() {
  goToPage("GeneratePage");
}

// Overview
function renderOverview() {
  const stats = calculateStats(selectedRace, selectedClass);
  document.getElementById("overview").textContent = JSON.stringify(stats);
}

function calculateStats(race, cls) {
  const base = { STR:0, CON:0, DEX:0, WIZ:0, CHA:0, INT:0, HP:0, AC:0, SPD:0, INI:0 };
  for (let key in base) {
    base[key] = (race.stats[key] || 0) + (cls.stats[key] || 0);
  }
  return base;
}

function resetBuilder() {
  selectedRace = null;
  selectedClass = null;
  goToPage("CreatePage");
}

// PDF download (placeholder)
function downloadPDF() {
  alert("PDF download coming soon!");
}
