const adinkraData = [
  {
    id: 1,
    skill: "Sabedoria",
    premise: "Premissa 2",
    color: "#FFF04A",
    phrase:
      "Quando planeja e estuda o roteiro, compreende o contexto da turma e preserva a intencionalidade pedagógica da formação.",
    route:
      "C1: Quando articula o roteiro com a prática docente, demonstrando segurança, intencionalidade pedagógica e engajamento."
  },
  {
    id: 2,
    skill: "Criatividade",
    premise: "Premissa 18",
    color: "#00E5FF",
    phrase:
      "Quando ocorre a mediação das atividades de forma didática e pedagógica, transformando o conteúdo do roteiro em experiências significativas de aprendizagem.",
    route:
      "C2: Quando domina o tema, utiliza metodologias ativas e torna o conteúdo acessível para diferentes perfis de cursistas."
  },
  {
    id: 3,
    skill: "Pensamento estratégico",
    premise: "Premissa 12",
    color: "#39FF88",
    phrase:
      "Quando organiza o tempo da reunião, conduz cada momento com clareza e garante espaço para avaliação, dúvidas e consolidação da aprendizagem.",
    route:
      "C1/C2: Quando o formador desenvolve o roteiro com segurança, foco nos objetivos formativos e coerência durante toda a reunião."
  },
  {
    id: 4,
    skill: "Inovação",
    premise: "Premissa 29",
    color: "#FFB703",
    phrase:
      "Quando incentiva a produção, o compartilhamento e a valorização de boas práticas, fortalecendo novas possibilidades para a formação docente.",
    route:
      "C2: Quando participa ativamente das trocas, apresenta sugestões, colabora no processo formativo e incentiva experiências inovadoras."
  },
  {
    id: 5,
    skill: "Adaptação",
    premise: "Premissa 16",
    color: "#8DFFCD",
    phrase:
      "Quando compreende com empatia os diferentes níveis e estilos de aprendizagem dos cursistas, ajustando sua mediação às necessidades da turma.",
    route:
      "C1/C2: Quando realiza adaptações conscientes, sem alterar a intencionalidade, os objetivos formativos e a identidade visual do roteiro."
  },
  {
    id: 6,
    skill: "Superação",
    premise: "Premissa 27",
    color: "#FF4D6D",
    phrase:
      "Quando realiza ações de engajamento e busca ativa, apoiando os cursistas para que avancem nas atividades e permaneçam no percurso formativo.",
    route:
      "C2: Quando apoia o desenvolvimento dos cursistas com comunicação assertiva, não violenta, acolhedora e contínua."
  },
  {
    id: 7,
    skill: "Inteligência e engenhosidade",
    premise: "Premissa 34",
    color: "#A855F7",
    phrase:
      "Quando exerce ação modelar, lidera pelo exemplo e conecta sua atuação nas reuniões à prática pedagógica da escola.",
    route:
      "C2: Quando atua como referência, estabelece conexões entre teoria e prática e inspira os cursistas por meio de sua própria ação formativa."
  }
];

const introScreen = document.getElementById("introScreen");
const adinkraScreen = document.getElementById("adinkraScreen");
const routeScreen = document.getElementById("routeScreen");
const summaryScreen = document.getElementById("summaryScreen");
const thankYouScreen = document.getElementById("thankYouScreen");
const c2Screen = document.getElementById("c2Screen");

const startExperienceButton = document.getElementById("startExperienceButton");
const backHomeButton = document.getElementById("backHomeButton");
const returnToAdinkraButton = document.getElementById("returnToAdinkraButton");
const returnFromSummaryButton = document.getElementById("returnFromSummaryButton");
const returnFromThankYouButton = document.getElementById("returnFromThankYouButton");
const backToSummaryButton = document.getElementById("backToSummaryButton");
const thankYouButton = document.getElementById("thankYouButton");
const goToC2Button = document.getElementById("goToC2Button");
const returnFromC2Button = document.getElementById("returnFromC2Button");
const backToThankYouButton = document.getElementById("backToThankYouButton");

const skillButtons = document.querySelectorAll(".skill-btn");
const rayGroups = document.querySelectorAll(".ray-group");

const routeButton = document.getElementById("routeButton");
const centerInstruction = document.getElementById("centerInstruction");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const summaryInstruction = document.getElementById("summaryInstruction");
const summaryButton = document.getElementById("summaryButton");
const resetButton = document.getElementById("resetButton");

const routeSkillTitle = document.getElementById("routeSkillTitle");
const routePremise = document.getElementById("routePremise");
const routeRay = document.getElementById("routeRay");
const routePhrase = document.getElementById("routePhrase");
const routeProficiency = document.getElementById("routeProficiency");

let currentItem = null;
const activatedRays = new Set();

function showScreen(screen) {
  introScreen.classList.add("hidden-screen");
  adinkraScreen.classList.add("hidden-screen");
  routeScreen.classList.add("hidden-screen");
  summaryScreen.classList.add("hidden-screen");
  thankYouScreen.classList.add("hidden-screen");
  c2Screen.classList.add("hidden-screen");

  screen.classList.remove("hidden-screen");
}

function startExperience() {
  showScreen(adinkraScreen);
}

function backToHomeScreen() {
  showScreen(introScreen);
}

function returnToAdinkra() {
  showScreen(adinkraScreen);
}

function openThankYouScreen() {
  showScreen(thankYouScreen);
}

function backToSummary() {
  showScreen(summaryScreen);
}

function openC2Screen() {
  showScreen(c2Screen);
}

function backToThankYouScreen() {
  showScreen(thankYouScreen);
}

function selectSkill(id) {
  const item = adinkraData.find((entry) => entry.id === id);

  if (!item) return;

  currentItem = item;
  activatedRays.add(item.id);

  routeButton.classList.remove("hidden");

  centerInstruction.innerHTML = `
    <span class="selected-label">Habilidade selecionada:</span>
    <span class="selected-skill-name">${item.skill}</span>
  `;

  updateButtons(item);
  updateRays(item);
  updateProgress();
  updateSummaryButton();
}

function updateButtons(item) {
  skillButtons.forEach((button) => {
    const buttonId = Number(button.dataset.index);
    const buttonData = adinkraData.find((entry) => entry.id === buttonId);

    button.classList.remove("active");

    if (activatedRays.has(buttonId)) {
      button.classList.add("visited");
    } else {
      button.classList.remove("visited");
    }

    if (buttonId === item.id) {
      button.classList.add("active");
      button.style.setProperty("--active-color", item.color);
    }

    if (buttonData && activatedRays.has(buttonId)) {
      button.style.borderLeft = `10px solid ${buttonData.color}`;
    } else {
      button.style.borderLeft = "10px solid transparent";
    }
  });
}

function updateRays(item) {
  rayGroups.forEach((group) => {
    const groupId = Number(group.dataset.index);
    const groupData = adinkraData.find((entry) => entry.id === groupId);

    group.classList.remove("selected");

    if (activatedRays.has(groupId) && groupData) {
      group.classList.add("lit");
      group.style.setProperty("--ray-color", groupData.color);
    } else {
      group.classList.remove("lit");
      group.style.removeProperty("--ray-color");
    }

    if (groupId === item.id) {
      group.classList.add("selected");
    }
  });
}

function updateProgress() {
  const total = adinkraData.length;
  const completed = activatedRays.size;
  const percentage = (completed / total) * 100;

  progressText.textContent = `${completed} de ${total} raios ativados`;
  progressFill.style.width = `${percentage}%`;
}

function updateSummaryButton() {
  const total = adinkraData.length;
  const completed = activatedRays.size;

  if (completed === total) {
    summaryButton.disabled = false;
    summaryButton.classList.remove("hidden");
    summaryInstruction.textContent =
      "Todos os 7 raios foram acesos. Agora você pode abrir a síntese da experiência.";
  } else {
    summaryButton.disabled = true;
    summaryButton.classList.add("hidden");
    summaryInstruction.textContent =
      "Acenda os 7 raios da Adinkra para liberar a síntese da experiência.";
  }
}

function openRouteScreen() {
  if (!currentItem) return;

  routeSkillTitle.textContent = currentItem.skill;
  routePremise.textContent = currentItem.premise;
  routeRay.textContent = `Raio ${currentItem.id}`;
  routePhrase.textContent = currentItem.phrase;
  routeProficiency.textContent = currentItem.route;

  showScreen(routeScreen);
}

function openSummaryScreen() {
  if (activatedRays.size !== adinkraData.length) return;

  showScreen(summaryScreen);
}

function resetExperience() {
  currentItem = null;
  activatedRays.clear();

  routeButton.classList.add("hidden");
  centerInstruction.textContent =
    "Selecione uma habilidade para interagir com a Adinkra.";

  skillButtons.forEach((button) => {
    button.classList.remove("active");
    button.classList.remove("visited");
    button.style.removeProperty("--active-color");
    button.style.borderLeft = "10px solid transparent";
  });

  rayGroups.forEach((group) => {
    group.classList.remove("lit");
    group.classList.remove("selected");
    group.style.removeProperty("--ray-color");
  });

  updateProgress();
  updateSummaryButton();
  showScreen(adinkraScreen);
}

startExperienceButton.addEventListener("click", startExperience);
backHomeButton.addEventListener("click", backToHomeScreen);
returnToAdinkraButton.addEventListener("click", returnToAdinkra);
returnFromSummaryButton.addEventListener("click", returnToAdinkra);
returnFromThankYouButton.addEventListener("click", returnToAdinkra);
backToSummaryButton.addEventListener("click", backToSummary);
thankYouButton.addEventListener("click", openThankYouScreen);
goToC2Button.addEventListener("click", openC2Screen);
returnFromC2Button.addEventListener("click", returnToAdinkra);
backToThankYouButton.addEventListener("click", backToThankYouScreen);

skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = Number(button.dataset.index);
    selectSkill(id);
  });
});

rayGroups.forEach((group) => {
  group.addEventListener("click", () => {
    const id = Number(group.dataset.index);
    selectSkill(id);
  });
});

routeButton.addEventListener("click", openRouteScreen);
summaryButton.addEventListener("click", openSummaryScreen);
resetButton.addEventListener("click", resetExperience);

updateProgress();
updateSummaryButton();