let cash = 1000;
let risk = 0;
let backpack = 0;
let maxBackpack = 50;
let drugPrice = 10; // cena losowa
let drugAmount = 0;

function updateUI() {
  document.getElementById('cash').innerText = cash + ' N₽';
  document.getElementById('risk').innerText = risk + '%';
  document.getElementById('backpack').innerText = backpack + '/' + maxBackpack + 'g';
}

function log(message) {
  const logDiv = document.getElementById('log');
  logDiv.innerHTML = message + '<br>' + logDiv.innerHTML;
}

function nextDay() {
  // Losowa cena (np. 5-25)
  drugPrice = Math.floor(Math.random() * 21) + 5;
  log('Nowa cena narkotyków: ' + drugPrice + ' N₽/g');
  // Ryzyko rośnie o 1-5%
  const riskIncrease = Math.floor(Math.random() * 5) + 1;
  risk = Math.min(100, risk + riskIncrease);
  updateUI();
}

function buyDrugs() {
  const maxBuyable = Math.min(Math.floor(cash / drugPrice), maxBackpack - backpack);
  if (maxBuyable <= 0) {
    log('Nie możesz kupić więcej narkotyków!');
    return;
  }
  const amount = Math.floor(Math.random() * maxBuyable) + 1;
  const cost = amount * drugPrice;
  cash -= cost;
  backpack += amount;
  log('Kupiono ' + amount + 'g za ' + cost + ' N₽');
  updateUI();
}

function sellDrugs() {
  if (backpack <= 0) {
    log('Nie masz co sprzedawać!');
    return;
  }
  const amount = Math.floor(Math.random() * backpack) + 1;
  const income = amount * drugPrice;
  cash += income;
  backpack -= amount;
  log('Sprzedano ' + amount + 'g za ' + income + ' N₽');
  updateUI();
}

function saveGame() {
  const saveData = {
    cash, risk, backpack
  };
  localStorage.setItem('narkoSave', JSON.stringify(saveData));
  log('Gra zapisana!');
}

function loadGame() {
  const save = localStorage.getItem('narkoSave');
  if (!save) {
    log('Brak zapisu gry!');
    return;
  }
  const data = JSON.parse(save);
  cash = data.cash;
  risk = data.risk;
  backpack = data.backpack;
  log('Gra wczytana!');
  updateUI();
}

updateUI();
