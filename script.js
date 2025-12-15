<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Character Builder</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- CreatePage -->
  <div id="CreatePage" class="page">
    <h1>Create Character</h1>
    <h2>Race Toggles</h2>
    <label><input type="checkbox" checked disabled> Basic</label>
    <label><input type="checkbox" id="raceHybrid"> Strange hybrids</label>
    <label><input type="checkbox" id="raceOtherworld"> Otherworldly beings</label>
    <label><input type="checkbox" id="raceOther"> Other</label>

    <h2>Class Toggles</h2>
    <label><input type="checkbox" checked disabled> Basic</label>
    <label><input type="checkbox" id="classMagic"> Deep magics</label>
    <label><input type="checkbox" id="classSteel"> Steel and blood</label>
    <label><input type="checkbox" id="classConstruct"> Constructs</label>
    <label><input type="checkbox" id="classOther"> Other</label>

    <button onclick="goToPage('SelectRacePage')">Next: Select Race</button>
  </div>

  <!-- SelectRacePage -->
  <div id="SelectRacePage" class="page" style="display:none;">
    <h1>Select Race</h1>
    <div id="raceGrid" class="grid"></div>
    <button onclick="goToPage('CreatePage')">Back</button>
  </div>

  <!-- RacePage -->
  <div id="RacePage" class="page" style="display:none;">
    <h1 id="raceName"></h1>
    <div id="raceDetails"></div>
    <button onclick="goToPage('SelectRacePage')">Back</button>
    <button onclick="selectRace()">Select Race</button>
  </div>

  <!-- SelectClassPage -->
  <div id="SelectClassPage" class="page" style="display:none;">
    <h1>Select Class</h1>
    <div id="classGrid" class="grid"></div>
    <button onclick="goToPage('SelectRacePage')">Back</button>
  </div>

  <!-- ClassPage -->
  <div id="ClassPage" class="page" style="display:none;">
    <h1 id="className"></h1>
    <div id="classDetails"></div>
    <button onclick="goToPage('SelectClassPage')">Back</button>
    <button onclick="selectClass()">Select Class</button>
  </div>

  <!-- GeneratePage -->
  <div id="GeneratePage" class="page" style="display:none;">
    <h1>Character Overview</h1>
    <div id="overview"></div>
    <button onclick="goToPage('SelectClassPage')">Back</button>
    <button onclick="resetBuilder()">Reset</button>
    <button onclick="downloadPDF()">Download PDF</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
