// Example data with explicit image paths
const races = [
  { 
    name: "Dwarf", 
    set: "Basic", 
    image: "images/Dwarf.png", 
    stats: { CON:2, STR:1, INT:-1, CHA:-1, INI:-1 }, 
    bonuses: [
      { name: "Speech", desc: "Ability to speak and read Common and Dwarvish" },
      { name: "Steady", desc: "No speed penalty while wearing any armour" },
      { name: "Dark vision", desc: "Ability to see in the dark up to 60 ft" },
      { name: "Hearty", desc: "+1 to CON saves" }
    ],
    variations: [
      {
        name: "Mountain Dwarf",
        desc: `
          <b>Warhammer:</b> 2D6 + STR<br>
          <b>Stout armour:</b> Take 1D8 less slashing damage<br>
          <b>Stone pick:</b> Deal 1D8 + STR<br>
          <b>Fire kit:</b> 3 uses<br>
          <b>Food rations:</b> 5<br>
          <b>Darker vision:</b> +20 ft dark vision
        `,
        inventory: ["Warhammer", "Stone pick", "Fire kit (3 uses)", "5 Food Rations"],
        spellMods: []
      },
      {
        name: "Arctic Dwarf",
        desc: `
          <b>Cold resistance:</b> Take 1D6 less cold damage<br>
          <b>Ice pick:</b> Deal 1D10 + STR<br>
          <b>Medium armour:</b> Take 1D4 less damage from attacks<br>
          <b>Fire kit:</b> 5 uses<br>
          <b>Medium sized blanket:</b> 3<br>
          <b>Shield:</b> +2 AC when raised<br>
          <b>Food rations:</b> 5<br>
          <b>Northern resistance:</b> Take 1D6 less cold damage
        `,
        inventory: ["Ice pick", "Medium armour", "Fire kit (5 uses)", "Medium blanket (3)", "Shield", "5 Food Rations"],
        spellMods: []
      }
    ]
  },
  { 
    name: "Elf", 
    set: "Basic", 
    image: "images/Elf.png", 
    stats: { DEX:2, WIZ:1, INT:1, CON:-1 } 
  }
];

const classes = [
  { 
    name: "Barbarian", 
    set: "Steel and blood", 
    image: "images/Barbarian.png", 
    stats: { STR:1, CON:2, INT:-2, WIZ:-1 } 
  },
  { 
    name: "Wizard", 
    set: "Deep magics", 
    image: "images/Wizard.png", 
    stats: { WIZ:3, INT:2, STR:-1, CON:-1 } 
  }
];

let selectedRace = null;
let selectedClass = null;
let inventory = [];
let spells = [];
let selectedVariation = null;

function addToInventory(item) {
  inventory.push(item);
}

function applySpellMod(mod) {
  // Example: find spell by name and apply modification
  const spell = spells.find(s => s.name === mod.spell);
  if (spell) {
    spell.desc += " " + mod.effect;
  }
}

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

  // Stats split
  const posStats = [];
  const negStats = [];
  for (let stat in race.stats) {
    const val = race.stats[stat];
    if (val > 0) posStats.push(`${stat}: +${val}`);
    if (val < 0) negStats.push(`${stat}: ${val}`);
  }
  document.getElementById("raceStats").innerHTML =
    `<div class="pos">${posStats.join("<br>")}</div>
     <div class="neg">${negStats.join("<br>")}</div>`;
  
  // Bonuses
  const bonusesDiv = document.getElementById("raceBonuses");
  bonusesDiv.innerHTML = "";
  (race.bonuses || []).forEach(b => {
    const line = document.createElement("div");
    line.innerHTML = `<b>${b.name}:</b> ${b.desc}`;
    bonusesDiv.appendChild(line);
  });

  // Variations
  const container = document.getElementById("raceVariations");
  container.innerHTML = "";
  (race.variations || []).forEach(v => {
    const div = document.createElement("div");
    div.className = "variation";
    div.innerHTML = `
      <div class="variation-name">${v.name}</div>
      <div class="variation-desc">${v.desc}</div>
      <button onclick="selectVariation('${v.name}')">Select</button>
    `;
    container.appendChild(div);
  });

  goToPage("RacePage");
}

function selectVariation(name) {
  // look up the variation object by name
  const variation = selectedRace.variations.find(v => v.name === name);
  if (!variation) return; // safety check

  // Add inventory items
  variation.inventory?.forEach(item => addToInventory(item));

  // Add spell modifications
  variation.spellMods?.forEach(mod => applySpellMod(mod));

  // Move to class selection page
  goToPage("SelectClassPage");
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

// Card rendering
function renderCard(entity, type) {
  const card = document.createElement("div");
  card.className = "card";

  const nameDiv = document.createElement("div");
  nameDiv.className = "card-name";
  nameDiv.textContent = entity.name;
  card.appendChild(nameDiv);

  const img = document.createElement("img");
  img.className = "card-image";
  img.src = entity.image;
  card.appendChild(img);

  const table = document.createElement("table");
  table.className = "stats-table";

  const row = document.createElement("tr");
  Object.keys(entity.stats).forEach(stat => {
    const val = entity.stats[stat];
    if (val !== 0) {
      const td = document.createElement("td");
      td.textContent = `${stat}: ${formatStat(val)}`;
      td.className = statClass(val);
      row.appendChild(td);
    }
  });
  table.appendChild(row);

  card.appendChild(table);

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
