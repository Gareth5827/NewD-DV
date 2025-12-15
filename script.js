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
    grid.appendChild(renderCard(r, "race"));
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
    grid.appendChild(renderCard(c, "class"));
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

function renderCard(entity, type) {
  const card = document.createElement("div");
  card.className = "card";

  // Name
  const nameDiv = document.createElement("div");
  nameDiv.className = "card-name";
  nameDiv.textContent = entity.name;
  card.appendChild(nameDiv);

  // Image
  const img = document.createElement("img");
  img.className = "card-image";
  img.src = `images/${entity.name.toLowerCase()}.png`; // adjust path
  card.appendChild(img);

  // Stats table
  const table = document.createElement("table");
  table.className = "stats-table";

  const topRow = document.createElement("tr");
  ["STR","DEX","CON","WIZ","CHA"].forEach(stat => {
    const td = document.createElement("td");
    td.textContent = `${stat}: ${formatStat(entity.stats[stat]||0)}`;
    td.className = statClass(entity.stats[stat]||0);
    topRow.appendChild(td);
  });
  table.appendChild(topRow);

  const bottomRow = document.createElement("tr");
  ["INT","HP","AC","SPD","INI"].forEach(stat => {
    const td = document.createElement("td");
    td.textContent = `${stat}: ${formatStat(entity.stats[stat]||0)}`;
    td.className = statClass(entity.stats[stat]||0);
    bottomRow.appendChild(td);
  });
  table.appendChild(bottomRow);

  card.appendChild(table);

  // Click behavior
  card.onclick = () => {
    if (type === "race") showRace(entity);
    else showClass(entity);
  };

  return card;
}

function formatStat(value) {
  if (value > 0) return `+${value}`;
  return value.toString();
}

function statClass(value) {
  if (value > 0) return "pos";
  if (value < 0) return "neg";
  return "neutral";
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
