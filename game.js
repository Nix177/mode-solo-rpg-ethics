import { API_BASE } from "./assets/config.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 40;
const SHEET_TILE = 32;
const VIEW_W = Math.floor(canvas.width / TILE_SIZE);
const VIEW_H = Math.floor(canvas.height / TILE_SIZE);
const WORLD_DEFAULT_W = 56;
const WORLD_DEFAULT_H = 42;
const MOVE_SPEED = 3;
const CURRENT_MODEL = "gpt-4o-mini";
const INSIGHTS_REQUIRED = 2;
const FORCE_DECISION_TURNS = 7;
const MINIGAME_INTRO_FRAMES = 105;
const MINIGAME_DEFAULT_MAX_FRAMES = 2400;
const AMBIENT_NPCS_PER_ZONE = 2;
const AMBIENT_NPC_ARCHETYPES = ["A-1", "B-2", "C-3"];
const LEVEL_TEST_ID = "level_0";
const LEVEL0_TERMINAL_MINIGAME = 12; // Math puzzle
const LEVEL0_MINIGAME_POOL = [12, 9, 8]; // puzzle, platform, combat
const DISABLED_MINIGAME_IDS = new Set([1]); // remove space-mash minigame from gameplay
const DEFAULT_TILE_ORDER = ["floor", "wall", "doorClosed", "doorOpen", "terminal", "altFloor", "liquidOrHazard", "panel"];
const AUDIO_DIR = "./assets/audio/";
const SFX = {
  click: "sfx_click.mp3",
  hover: "sfx_hover.mp3",
  error: "sfx_error.mp3",
  next: "sfx_dialog_next.mp3",
  move: "sfx_footstep.mp3",
  mg_start: "mg_start.mp3",
  mg_win: "mg_win.mp3",
  mg_lose: "mg_lose.mp3",
  mg_tick: "mg_tick.mp3",
  combat_swing: "sfx_combat_swing.mp3",
  combat_hit: "sfx_combat_hit.mp3",
  enemy_down: "sfx_enemy_down.mp3",
  player_hurt: "sfx_player_hurt.mp3",
  item_use: "sfx_item_use.mp3"
};

const MUSIC_DIR = "./assets/music/";
const MUSIC_TRACKS = [
  "contemplation.mp3",
  "cosmic.mp3",
  "drift.mp3",
  "grove.mp3",
  "L10_Action.mp3", "L10_Sad.mp3", "L10_T1.mp3", "L10_T2.mp3", "L10_T3.mp3",
  "L1_Action.mp3", "L1_Sad.mp3", "L1_T1.mp3", "L1_T2.mp3", "L1_T3.mp3",
  "L2_Action.mp3", "L2_Main.mp3", "L2_Sad.mp3", "L2_T1.mp3", "L2_T2.mp3", "L2_T3.mp3",
  "L3_Action.mp3", "L3_Main.mp3", "L3_Sad.mp3", "L3_T1.mp3", "L3_T2.mp3", "L3_T3.mp3",
  "L4_Action.mp3", "L4_Sad.mp3", "L4_T1.mp3", "L4_T2.mp3", "L4_T3.mp3",
  "L5_Action.mp3", "L5_Main.mp3", "L5_Sad.mp3", "L5_T1.mp3", "L5_T2.mp3", "L5_T3.mp3",
  "L6_Action.mp3", "L6_Sad.mp3", "L6_T1.mp3", "L6_T2.mp3", "L6_T3.mp3",
  "L7_Action.mp3", "L7_Sad.mp3", "L7_T1.mp3", "L7_T2.mp3", "L7_T3.mp3",
  "L8_Action.mp3", "L8_Main.mp3", "L8_Sad.mp3", "L8_T1.mp3", "L8_T2.mp3", "L8_T3.mp3",
  "L9_Action.mp3", "L9_Main.mp3", "L9_Sad.mp3", "L9_T1.mp3", "L9_T2.mp3", "L9_T3.mp3",
  "resolution.mp3",
  "sunlight.mp3",
  "tension.mp3",
  "thought.mp3",
  "uplifting.mp3",
  "Th�me Bureaucratie (Zone Civique & Conseil).mp3",
  "Th�me Espace (Station Orbitale).mp3",
  "Th�me Laboratoire (Installations Technologiques).mp3",
  "Th�me Nature (La For�t Vivri�re).mp3",
  "Th�me Urbain (Cit� & Ports Logistiques).mp3",
  "Th�me d'Investissement  Dialogue Profond (Le Po�te  R�flexion).mp3",
  "Th�me de Tension (Situation de Crise  Anomalie).mp3",
  "Th�me des Mini-jeux (Piratage  Surcharge).mp3",
  "Situation de Choix �thique (L'Autel).mp3",
  "th�me principal menu.mp3"
];
const MUSIC_GENERIC_FALLBACKS = ["contemplation.mp3", "thought.mp3", "tension.mp3", "uplifting.mp3", "resolution.mp3"];
const HYBRID_SPACE_BUILDINGS = [
  "building_space_observatory_01.png",
  "building_space_observatory_02.png",
  "building_space_gate_large.png",
  "building_space_blast_door_large_01.png",
  "building_space_solar_angled.png",
];
const HYBRID_MIXED_PROPS = [
  "vehicle_rustic_wagon_0_01.png",
  "vehicle_rustic_cart_9_01.png",
  "vehicle_scifi_heavy_15_01.png",
  "vehicle_urban_buggy_24_01.png",
  "vehicle_urban_transport_32_01.png",
  "prop_wind_turbine_40_01.png",
];

const TUTORIAL_STEPS = [
  "Utilise ZQSD ou les Fl�ches pour te d�placer.",
  "Approche un conseiller et appuie sur [E] pour discuter.",
  "R�duis le chat avec '-' puis rouvre-le.",
  "Envoie un message dans le chat pour argumenter.",
  "Utilise le terminal jaune [E] pour d�bloquer la zone.",
  "R�cup�re un module de donn�es lumineux [E].",
  "Rends-toi � l'autel (rouge) pour exprimer un vote. L'humanit� a besoin de tes synth�ses !",
  "Franchis la porte ouverte pour quitter le tutoriel."
];

// --- LOCALIZATION ---
const LANG = {
  fr: {
    start_game: "COMMENCER LA SIMULATION",
    select_mediator: "CHOISISSEZ VOTRE M�DIATEUR",
    level: "Niveau",
    objective: "Objectif",
    interact_prompt: "[E] Interagir",
    prompt_talk: "[E] Parler",
    prompt_enter: "[E] Franchir",
    prompt_vote: "[E] Voter",
    prompt_loot: "[E] R�cup�rer",
    prompt_read: "[E] Lire",
    tutorial_move: "Utilisez ZQSD ou les Fl�ches pour bouger.",
    tutorial_interact: "Approchez un personnage et appuyez sur E pour discuter.",
    tutorial_chat: "R�pondez aux questions pour gagner des points.",
    tutorial_skip: "Passer le tutoriel",
    intro_title: "INTRO NIVEAU",
    intro_continue: "[ESPACE] pour continuer",
    choice_title: "FAITES VOTRE CHOIX",
    choice_waiting: "En attente...",
    game_over: "FIN DE LA SIMULATION",
    thanks: "Merci d'avoir jou�.",
  },
  en: {
    start_game: "START SIMULATION",
    select_mediator: "CHOOSE YOUR MEDIATOR",
    level: "Level",
    objective: "Objective",
    interact_prompt: "[E] Interact",
    prompt_talk: "[E] Talk",
    prompt_enter: "[E] Enter",
    prompt_vote: "[E] Vote",
    prompt_loot: "[E] Loot",
    prompt_read: "[E] Read",
    tutorial_move: "Use WASD or Arrows to move.",
    tutorial_interact: "Approach a character and press E to chat.",
    tutorial_chat: "Answer questions to earn points.",
    tutorial_skip: "Skip Tutorial",
    intro_title: "LEVEL INTRO",
    intro_continue: "[SPACE] to continue",
    choice_title: "MAKE YOUR CHOICE",
    choice_waiting: "Waiting...",
    game_over: "SIMULATION ENDED",
    thanks: "Thanks for playing.",
  },
  de: {
    start_game: "SIMULATION STARTEN",
    select_mediator: "W�HLEN SIE IHREN VERMITTLER",
    level: "Ebene",
    objective: "Ziel",
    interact_prompt: "[E] Interagieren",
    prompt_talk: "[E] Reden",
    prompt_enter: "[E] Eintreten",
    prompt_vote: "[E] Abstimmen",
    prompt_loot: "[E] Pl�ndern",
    prompt_read: "[E] Lesen",
    tutorial_move: "Benutzen Sie WASD oder Pfeile zum Bewegen.",
    tutorial_interact: "Gehen Sie zu einem Charakter und dr�cken Sie E.",
    tutorial_chat: "Beantworten Sie Fragen, um Punkte zu sammeln.",
    tutorial_skip: "Tutorial �berspringen",
    intro_title: "LEVEL EINF�HRUNG",
    intro_continue: "[LEERTASTE] zum Fortfahren",
    choice_title: "TREFFEN SIE IHRE WAHL",
    choice_waiting: "Warten...",
    game_over: "SIMULATION BEENDET",
    thanks: "Danke f�rs Spielen.",
  }
};

const getText = (key) => {
  const lang = state.language || "fr";
  return LANG[lang][key] || key;
};

// --- AUDIO HELPERS ---
function playSound(key) {
  if (state.audio.muted) return;
  const file = SFX[key];
  if (!file) return;
  if (!state.audio.sfxCache[key]) {
    state.audio.sfxCache[key] = new Audio(`${AUDIO_DIR}${file}`);
  }
  const sfx = state.audio.sfxCache[key];
  sfx.currentTime = 0;
  sfx.play().catch(() => { });
}

function playLevelMusic(levelId) {
  if (state.audio.muted) return;

  const levelNum = parseLevelNumber(levelId);
  const trackNum = Math.floor(Math.random() * 3) + 1;
  const canonicalLevel = (Number.isFinite(levelNum) && levelNum >= 1 && levelNum <= 10)
    ? levelNum
    : ((((Number.isFinite(levelNum) ? levelNum : 1) - 1) % 10 + 10) % 10) + 1;
  const preferred = "L" + canonicalLevel + "_T" + trackNum + ".mp3";
  const fallbackLevel = "L1_T" + trackNum + ".mp3";
  const genericTrack = MUSIC_GENERIC_FALLBACKS[Math.floor(Math.random() * MUSIC_GENERIC_FALLBACKS.length)];
  const candidates = [
    { src: AUDIO_DIR + preferred, key: preferred },
    { src: AUDIO_DIR + fallbackLevel, key: fallbackLevel },
    { src: MUSIC_DIR + genericTrack, key: genericTrack },
  ];

  if (state.audio.currentTrack === preferred) return;

  if (state.audio.music) {
    state.audio.music.pause();
    state.audio.music = null;
  }

  const tryCandidate = (idx) => {
    if (idx >= candidates.length) {
      console.warn("[AUDIO] No music candidate playable for", levelId);
      return;
    }
    const candidate = candidates[idx];
    const audio = new Audio(candidate.src);
    audio.loop = true;
    audio.volume = 0.5;
    audio.onerror = () => {
      if (state.audio.music === audio) state.audio.music = null;
      tryCandidate(idx + 1);
    };
    state.audio.music = audio;
    state.audio.currentTrack = candidate.key;
    audio.play().catch(e => {
      console.warn("[AUDIO] Music play blocked until interaction:", e.message);
    });
  };

  tryCandidate(0);
}

function parseLevelNumber(sceneId) {
  if (!sceneId) return 1;
  const m = String(sceneId).match(/\d+/);
  return m ? parseInt(m[0], 10) : 1;
}


const uiLevel = document.getElementById("level-id");
const uiDialog = document.getElementById("dialog-box");
const uiDialogName = document.getElementById("dialog-name");
const uiDialogText = document.getElementById("dialog-text");
const uiChoice = document.getElementById("choice-overlay");
const uiChoiceContainer = document.getElementById("choice-container");
const uiPrompt = document.getElementById("interaction-prompt");

let uiChatContainer = null;
let uiChatTarget = null;
let uiChatAvatar = null;
let uiChatLog = null;
let uiChatInput = null;
let uiChatSend = null;
let uiChatHint = null;
let uiChatCollapse = null;
let uiChatMinimized = null;
let uiChatMiniAvatar = null;
let uiObjective = null;
let uiTutorialBox = null;
let uiTutorialStep = null;
let uiTutorialText = null;
let uiTutorialSkip = null;

const state = {
  scenario: null,
  personas: {},
  currentPersonas: {},
  currentSceneId: null,
  levelData: null,
  player: {
    x: 10,
    y: 12,
    pixelX: 10 * TILE_SIZE,
    pixelY: 12 * TILE_SIZE,
    dir: "down",
    isMoving: false,
  },
  entities: [],
  input: { keys: Object.create(null) },
  isLocked: false,
  isChatting: false,
  hasVoted: false,
  pendingDoorTarget: null,
  currentTheme: "nature",
  world: {
    w: WORLD_DEFAULT_W,
    h: WORLD_DEFAULT_H,
    tiles: [],
    deco: [],
    themes: [],
    zoneNames: [],
    zones: [],
  },
  camera: {
    x: 0,
    y: 0,
  },
  assets: {},
  stars: [],
  chatSessions: {},
  currentChatTarget: null,
  globalHistory: [],
  chatOpen: false,
  meta: {
    intelPoints: 0,
    fastTrackCharges: 0,
    modules: {
      minimap: false,
    },
  },
  sceneProgress: {
    userTurns: 0,
    insightsCollected: 0,
    insightsRequired: INSIGHTS_REQUIRED,
    forceDecisionTurns: FORCE_DECISION_TURNS,
    loopBreakerIndex: 0,
    lastPlayerInput: "",
    miniGamesWon: {},
    terminalPuzzleSolved: false,
  },
  tutorial: {
    active: false,
    completedLevel1: false,
    step: 0,
    movedTiles: 0,
    lastTileX: null,
    lastTileY: null,
    awaitingChatReopen: false,
    flags: {
      npcInteracted: false,
      chatSent: false,
      chatCollapsed: false,
      chatReopenedAfterCollapse: false,
      terminalUsed: false,
      insightUsed: false,
      altarVoted: false,
      doorUsed: false,
    },
  },
  choiceHistory: [], // Track decisions across levels
  audio: {
    music: null,
    currentTrack: null,
    muted: false,
    sfxCache: {}
  }
};

const BASE_SPRITES = {
  player: [
    "   444444   ", "  44444444  ", "  44222244  ", "  42232324  ",
    "  11111111  ", "  11311311  ", "  11111111  ", "  31111113  ",
    "   11  11   ", "   11  11   ", "   11  11   ", "  333  333  ",
  ],
  player_up: [
    "   444444   ", "  44444444  ", "  44444444  ", "  44444444  ",
    "  11111111  ", "  11311311  ", "  11111111  ", "  31111113  ",
    "   11  11   ", "   11  11   ", "   11  11   ", "  333  333  ",
  ],
  player_side: [
    "   444444   ", "  44444444  ", "  44422244  ", "  44232244  ",
    "  11111111  ", "  11311111  ", "  11111111  ", "  31111111  ",
    "   11  11   ", "   11  11   ", "   11  11   ", "  333  333  ",
  ],
  npc: [
    "   444444   ", "  44444444  ", "  22222222  ", "  23222232  ",
    "  11111111  ", "  11133111  ", "  11111111  ", "  11111111  ",
    "   11  11   ", "   11  11   ", "   11  11   ", "  222  222  ",
  ],
  floor: [
    "222222222222", "211111111112", "211111111112", "211111111112",
    "211112211112", "211112211112", "211111111112", "211111111112",
    "211111111112", "211111111112", "211111111112", "222222222222",
  ],
  wall: [
    "222222222222", "333333333333", "111111111111", "113311331111",
    "113311331111", "111111111111", "111133311111", "111111111111",
    "113311331111", "113311331111", "111111111111", "222222222222",
  ],
  computer: [
    "222222222222",
    "224444444422",
    "243333333342",
    "243666666342",
    "243611116342",
    "243666666342",
    "243333333342",
    "224444444422",
    "222222222222",
    "211111111112",
    "222222222222",
    "222222222222",
  ],
  door: [
    "222222222222", "211111111112", "211111111112", "211333333312",
    "211333333312", "211111111112", "211111221112", "211111111112",
    "211111111112", "211111111112", "211111111112", "211111111112",
  ],
  altar: [
    "  44444444  ",
    " 4333333334 ",
    " 4366666634 ",
    " 4361111634 ",
    " 4366666634 ",
    " 4333333334 ",
    "  44444444  ",
    "   222222   ",
    "   222222   ",
    "  22222222  ",
    " 2222222222 ",
    "222222222222",
  ]
};


function generateSprite(key, colorMap, flip = false) {
  const data = BASE_SPRITES[key] || BASE_SPRITES.player;
  const size = 32;
  const pixel = size / 12;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const cctx = c.getContext("2d");
  if (flip) {
    cctx.translate(size, 0);
    cctx.scale(-1, 1);
  }
  for (let y = 0; y < 12; y += 1) {
    for (let x = 0; x < 12; x += 1) {
      const ch = data[y][x];
      if (ch !== " " && colorMap[ch]) {
        cctx.fillStyle = colorMap[ch];
        cctx.fillRect(x * pixel, y * pixel, pixel, pixel);
      }
    }
  }
  return c;
}


async function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image load failed: ${path}`));
    img.src = path;
  });
}

function cropTile(sheet, tileIndex, row = 0) {
  const c = document.createElement("canvas");
  c.width = SHEET_TILE;
  c.height = SHEET_TILE;
  const cctx = c.getContext("2d");
  cctx.imageSmoothingEnabled = false;
  cctx.drawImage(
    sheet,
    tileIndex * SHEET_TILE,
    row * SHEET_TILE,
    SHEET_TILE,
    SHEET_TILE,
    0,
    0,
    SHEET_TILE,
    SHEET_TILE,
  );
  return c;
}

function inferThemeFromScene(scene) {
  const txt = safeText(scene?.theme).toLowerCase();
  if (/(forest|foret|nature|eco|riv|village|faune|flore)/.test(txt)) return "nature";
  if (/(cyber|virtual|data|corp|city|urbain|prison|neon|ai)/.test(txt)) return "urbain";
  if (/(lab|medical|hopital|surgery|bio|clinique)/.test(txt)) return "laboratoire";
  if (/(space|mars|luna|orbital|station|cosmo|espace)/.test(txt)) return "espace";
  if (/(vote|government|council|senate|policy|bureau|parliament|state)/.test(txt)) return "bureaucratie";
  const n = parseLevelNumber(scene?.id);
  const fallback = ["nature", "urbain", "laboratoire", "espace", "bureaucratie"];
  return Number.isNaN(n) ? "nature" : fallback[(n - 1) % fallback.length];
}

function tileIndexFromOrder(order, aliases, fallbackIdx) {
  const ord = Array.isArray(order) ? order.map((x) => normalizeText(x)) : [];
  for (const alias of aliases) {
    const idx = ord.indexOf(normalizeText(alias));
    if (idx >= 0) return idx;
  }
  return fallbackIdx;
}

function buildThemeTileSet(theme) {
  const sheet = state.assets.tilesets?.[theme];
  if (!sheet) return null;
  const order = state.assets.tilesetsManifest?.tileOrder || DEFAULT_TILE_ORDER;

  // Helper to safely get a tile or fall back to the main sheet's equivalent if index is out of bounds
  const getTile = (aliases, fallbackIdx) => {
    const idx = tileIndexFromOrder(order, aliases, fallbackIdx);
    // cropTile handles out-of-bounds by returning valid canvas or null, 
    // but we want to ensure we at least try to get *something*
    return cropTile(sheet, idx);
  };

  return {
    floor: getTile(["floor"], 0),
    wall: getTile(["wall"], 1),
    door_closed: getTile(["doorClosed", "door_closed", "doorclosed"], 2),
    door_open: getTile(["doorOpen", "door_open", "dooropen"], 3),
    computer: getTile(["terminal", "computer"], 4),
    alt: getTile(["altFloor", "alt_floor", "panel", "alt"], 5),
    liquid: getTile(["liquidOrHazard", "liquid", "hazard"], 6),
    altar: getTile(["panel", "altar", "altFloor"], 7),
  };
}

function rebuildThemeTiles() {
  state.assets.themeTiles = {};
  const themes = Object.keys(state.assets.tilesets || {});
  themes.forEach((theme) => {
    const set = buildThemeTileSet(theme);
    if (set) state.assets.themeTiles[theme] = set;
  });
}

function applyThemeAssets(theme) {
  const t = state.assets.tilesets?.[theme] ? theme : "nature";
  const set = state.assets.themeTiles?.[t];
  if (!set) return;
  state.currentTheme = t;
  state.assets.floor = set.floor;
  state.assets.wall = set.wall;
  state.assets.door_closed = set.door_closed;
  state.assets.door_open = set.door_open;
  state.assets.computer = set.computer;
  state.assets.alt = set.alt;
  state.assets.liquid = set.liquid;
  state.assets.altar = set.altar;

  // Props
  if (set.building) state.assets.building = set.building;
  if (set.vehicle) state.assets.vehicle = set.vehicle;

  // Decorations
  if (set.decorations) state.assets.decorations = set.decorations;

  // Swap NPCs to match theme
  if (set.npc_1) state.assets["A-1"] = set.npc_1;
  if (set.npc_2) state.assets["B-2"] = set.npc_2;
  if (set.npc_3) state.assets["C-3"] = set.npc_3;
}

function mapPersonas(list) {
  const map = {};
  for (const p of list || []) {
    if (p?.id) map[String(p.id)] = p;
  }
  return map;
}

function safeText(v) {
  return String(v || "").trim();
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function hashStringSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createSeededRandom(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(rng, min, max) {
  return min + Math.floor(rng() * (max - min + 1));
}

function normalizeText(s) {
  return safeText(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(s) {
  const tokens = normalizeText(s).split(" ").filter((t) => t.length >= 3);
  return new Set(tokens);
}

function overlapScore(a, b) {
  const sa = tokenSet(a);
  const sb = tokenSet(b);
  if (!sa.size || !sb.size) return 0;
  let inter = 0;
  sa.forEach((t) => {
    if (sb.has(t)) inter += 1;
  });
  return inter / Math.max(sa.size, sb.size);
}

function worldInBounds(x, y) {
  return x >= 0 && x < state.world.w && y >= 0 && y < state.world.h;
}

function createMatrix(w, h, value) {
  return Array.from({ length: h }, () => Array(w).fill(value));
}

function clearRectInMatrix(matrix, x, y, w, h, value = 0) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) {
      if (yy >= 0 && yy < matrix.length && xx >= 0 && xx < matrix[0].length) {
        matrix[yy][xx] = value;
      }
    }
  }
}

function isBlockingEntityAt(x, y) {
  return state.entities.some((e) => !e.removed && e.blocking !== false && e.x === x && e.y === y);
}

function isTileWalkable(x, y) {
  if (!worldInBounds(x, y)) return false;
  if (state.world.tiles[y]?.[x] === 1) return false;
  if (isBlockingEntityAt(x, y)) return false;
  return true;
}

function placeIfWalkable(x, y, fallbackX, fallbackY) {
  const tx = clamp(Math.round(x), 1, state.world.w - 2);
  const ty = clamp(Math.round(y), 1, state.world.h - 2);
  if (state.world.tiles[ty]?.[tx] === 1) state.world.tiles[ty][tx] = 0;
  if (!isBlockingEntityAt(tx, ty)) return { x: tx, y: ty };
  const fx = clamp(Math.round(fallbackX), 1, state.world.w - 2);
  const fy = clamp(Math.round(fallbackY), 1, state.world.h - 2);
  return { x: fx, y: fy };
}

function updateCamera() {
  const worldPxW = state.world.w * TILE_SIZE;
  const worldPxH = state.world.h * TILE_SIZE;
  state.camera.x = clamp(
    state.player.pixelX - (canvas.width / 2) + (TILE_SIZE / 2),
    0,
    Math.max(0, worldPxW - canvas.width),
  );
  state.camera.y = clamp(
    state.player.pixelY - (canvas.height / 2) + (TILE_SIZE / 2),
    0,
    Math.max(0, worldPxH - canvas.height),
  );
}

function scenarioNarrativeText(scene) {
  const n = scene?.narrative || {};
  return [
    safeText(scene?.theme),
    safeText(scene?.title),
    safeText(n.visual_cues),
    safeText(n.context),
    safeText(n.dilemma),
    safeText(n.question),
  ].join(" ");
}

function buildZonePlan(scene, mainTheme) {
  const text = normalizeText(scenarioNarrativeText(scene));
  const hasWind = /(eolien|eolienne|wind|turbine|mine|carrier)/.test(text);
  const hasPort = /(port|quai|harbor|dock|mer|ocean)/.test(text);
  const hasForest = /(foret|forest|sacre|sacree|bois|village)/.test(text);
  const hasLab = /(lab|labo|medical|clinique|hopital|reacteur)/.test(text);

  if (hasWind) {
    return [
      { name: "Place du village", theme: "bureaucratie", rect: [0.05, 0.08, 0.45, 0.36] },
      { name: "Zone portuaire", theme: "urbain", rect: [0.55, 0.08, 0.95, 0.36] },
      { name: "Foret sacree", theme: "nature", rect: [0.05, 0.48, 0.45, 0.9] },
      { name: "Mine d'extraction", theme: "laboratoire", rect: [0.55, 0.48, 0.95, 0.9] },
    ];
  }

  const zones = [];
  zones.push({ name: "Zone civique", theme: mainTheme, rect: [0.08, 0.1, 0.48, 0.42] });
  zones.push({ name: "Couloir logistique", theme: hasPort ? "urbain" : mainTheme, rect: [0.52, 0.1, 0.92, 0.42] });
  zones.push({ name: hasForest ? "Foret vivriere" : "Reserve", theme: hasForest ? "nature" : mainTheme, rect: [0.08, 0.5, 0.48, 0.9] });
  zones.push({ name: hasLab ? "Annexe technique" : "Zone industrielle", theme: hasLab ? "laboratoire" : "urbain", rect: [0.52, 0.5, 0.92, 0.9] });
  return zones;
}

function applyZonesToThemeMap(themeMap, zones, width, height) {
  zones.forEach((zone) => {
    const x0 = Math.floor(zone.rect[0] * width);
    const y0 = Math.floor(zone.rect[1] * height);
    const x1 = Math.floor(zone.rect[2] * width);
    const y1 = Math.floor(zone.rect[3] * height);
    for (let y = y0; y <= y1; y += 1) {
      for (let x = x0; x <= x1; x += 1) {
        if (x >= 1 && x < width - 1 && y >= 1 && y < height - 1) themeMap[y][x] = zone.theme;
      }
    }
  });
}

function buildZoneVisualProfile(zoneTheme, sceneText = "") {
  const text = normalizeText(sceneText);
  const maritime = /(port|quai|dock|harbor|ocean|mer|bateau)/.test(text);
  const wilderness = /(foret|forest|village|sacre|sacree|nature)/.test(text);

  const defaults = {
    obstacleDensity: 0.12,
    decoDensity: 0.28,
    randomDecoChance: 0.55,
    wallChance: 0.34,
    computerChance: 0.23,
    buildingChance: 0.23,
    vehicleChance: 0.20,
    groundChance: 0.72,
    variants: ["detail", "detail", "detail", "liquid"],
    intents: ["flora", "prop", "ground"],
  };

  if (zoneTheme === "nature") {
    return {
      ...defaults,
      obstacleDensity: 0.08,
      decoDensity: wilderness ? 0.42 : 0.36,
      randomDecoChance: 0.72,
      wallChance: 0.22,
      computerChance: 0.12,
      buildingChance: 0.30,
      vehicleChance: 0.14,
      groundChance: 0.84,
      variants: ["flora", "flora", "flora", "ground", "liquid"],
      intents: ["tree", "bush", "ground"],
    };
  }
  if (zoneTheme === "urbain") {
    return {
      ...defaults,
      obstacleDensity: 0.16,
      decoDensity: maritime ? 0.35 : 0.30,
      randomDecoChance: 0.66,
      wallChance: 0.30,
      computerChance: 0.14,
      buildingChance: 0.28,
      vehicleChance: 0.28,
      groundChance: 0.64,
      variants: ["crate", "metal", "ground", "detail", "detail"],
      intents: maritime ? ["container", "ground", "street"] : ["street", "ground", "ground"],
    };
  }
  if (zoneTheme === "laboratoire") {
    return {
      ...defaults,
      obstacleDensity: 0.14,
      decoDensity: 0.31,
      randomDecoChance: 0.70,
      wallChance: 0.26,
      computerChance: 0.36,
      buildingChance: 0.20,
      vehicleChance: 0.18,
      groundChance: 0.58,
      variants: ["console", "console", "canister", "metal", "liquid"],
      intents: ["terminal", "cable", "ground"],
    };
  }
  if (zoneTheme === "espace") {
    return {
      ...defaults,
      obstacleDensity: 0.14,
      decoDensity: 0.29,
      randomDecoChance: 0.73,
      wallChance: 0.20,
      computerChance: 0.24,
      buildingChance: 0.34,
      vehicleChance: 0.16,
      groundChance: 0.60,
      variants: ["antenna", "panel", "panel", "metal", "detail"],
      intents: ["satellite", "airlock", "ground"],
    };
  }
  if (zoneTheme === "bureaucratie") {
    return {
      ...defaults,
      obstacleDensity: 0.10,
      decoDensity: 0.27,
      randomDecoChance: 0.58,
      wallChance: 0.30,
      computerChance: 0.18,
      buildingChance: 0.32,
      vehicleChance: 0.12,
      groundChance: 0.67,
      variants: ["banner", "desk", "detail", "ground"],
      intents: ["banner", "street", "ground"],
    };
  }

  return defaults;
}

function makeRandomDeco(theme, seed, variant, intent = "") {
  return {
    type: "random",
    theme,
    seed,
    variant: safeText(variant) || "detail",
    intent: safeText(intent) || "ground",
  };
}

function generateWorld(scene) {
  const w = WORLD_DEFAULT_W;
  const h = WORLD_DEFAULT_H;
  const tiles = createMatrix(w, h, 0);
  const deco = createMatrix(w, h, null);
  const theme = inferThemeFromScene(scene);
  const themes = createMatrix(w, h, theme);
  const zones = buildZonePlan(scene, theme);
  applyZonesToThemeMap(themes, zones, w, h);
  const rng = createSeededRandom(hashStringSeed(`${safeText(scene?.id)}|${theme}`));
  const sceneText = scenarioNarrativeText(scene);

  // Draw outer walls
  for (let x = 0; x < w; x += 1) {
    tiles[0][x] = 1;
    tiles[h - 1][x] = 1;
  }
  for (let y = 0; y < h; y += 1) {
    tiles[y][0] = 1;
    tiles[y][w - 1] = 1;
  }

  const spawnX = Math.floor(w / 2);
  const spawnY = Math.floor(h * 0.72);
  const doorX = spawnX;
  const doorY = Math.max(1, spawnY - 14);

  // Clear spawn and path to door
  clearRectInMatrix(tiles, spawnX - 8, spawnY - 7, 17, 14, 0);
  clearRectInMatrix(tiles, doorX - 1, doorY, 3, spawnY - doorY + 2, 0);

  // Helper: draw room boundaries for a zone (walls around edges)
  const drawRoomBoundaries = (zone) => {
    const x0 = Math.floor(zone.rect[0] * w);
    const y0 = Math.floor(zone.rect[1] * h);
    const x1 = Math.floor(zone.rect[2] * w);
    const y1 = Math.floor(zone.rect[3] * h);

    // Draw walls around the zone perimeter (with gaps for doors)
    for (let x = x0; x <= x1; x += 1) {
      if (x >= 1 && x < w - 1 && y0 >= 1 && y0 < h - 1) {
        if (Math.abs(x - (x0 + x1) / 2) > 2) tiles[y0][x] = 1;
      }
      if (x >= 1 && x < w - 1 && y1 >= 1 && y1 < h - 1) {
        if (Math.abs(x - (x0 + x1) / 2) > 2) tiles[y1][x] = 1;
      }
    }
    for (let y = y0; y <= y1; y += 1) {
      if (y >= 1 && y < h - 1 && x0 >= 1 && x0 < w - 1) {
        if (Math.abs(y - (y0 + y1) / 2) > 2) tiles[y][x0] = 1;
      }
      if (y >= 1 && y < h - 1 && x1 >= 1 && x1 < w - 1) {
        if (Math.abs(y - (y0 + y1) / 2) > 2) tiles[y][x1] = 1;
      }
    }
  };
  zones.forEach(drawRoomBoundaries);

  // Clear spawn area and main path again (after zone walls)
  clearRectInMatrix(tiles, spawnX - 6, spawnY - 5, 13, 10, 0);
  clearRectInMatrix(tiles, doorX - 2, doorY, 5, spawnY - doorY + 2, 0);

  // Add thematic obstacles and richer decor inside zones
  zones.forEach((zone) => {
    const x0 = Math.floor(zone.rect[0] * w) + 1;
    const y0 = Math.floor(zone.rect[1] * h) + 1;
    const x1 = Math.floor(zone.rect[2] * w) - 1;
    const y1 = Math.floor(zone.rect[3] * h) - 1;
    const zoneW = x1 - x0;
    const zoneH = y1 - y0;
    if (zoneW <= 0 || zoneH <= 0) return;

    const profile = buildZoneVisualProfile(zone.theme, sceneText);

    const nearbyDecoCount = (tx, ty, radius = 2, matcher = null) => {
      let count = 0;
      for (let yy = Math.max(y0, ty - radius); yy <= Math.min(y1, ty + radius); yy += 1) {
        for (let xx = Math.max(x0, tx - radius); xx <= Math.min(x1, tx + radius); xx += 1) {
          if (xx === tx && yy === ty) continue;
          const v = deco[yy]?.[xx];
          if (!v) continue;
          if (!matcher || matcher(v)) count += 1;
        }
      }
      return count;
    };

    const obstacleCount = Math.floor(zoneW * zoneH * profile.obstacleDensity);
    for (let i = 0; i < obstacleCount; i += 1) {
      const ox = randomInt(rng, x0, x1);
      const oy = randomInt(rng, y0, y1);
      if (Math.abs(ox - spawnX) < 6 && Math.abs(oy - spawnY) < 5) continue;
      if (Math.abs(ox - doorX) < 3 && oy <= spawnY && oy >= doorY - 1) continue;
      if (tiles[oy][ox] === 1 || deco[oy][ox]) continue;

      const r = rng();
      let obstacleKind = "wall";
      if (r < profile.wallChance) obstacleKind = "wall";
      else if (r < profile.wallChance + profile.computerChance) obstacleKind = "computer";
      else if (r < profile.wallChance + profile.computerChance + profile.buildingChance) obstacleKind = "building";
      else obstacleKind = "vehicle";

      if (obstacleKind === "vehicle" && nearbyDecoCount(ox, oy, 3, (v) => v === "vehicle") >= 1) continue;
      if (obstacleKind === "building" && nearbyDecoCount(ox, oy, 3, (v) => v === "building") >= 1) continue;
      if (obstacleKind !== "wall" && nearbyDecoCount(ox, oy, 2) >= 4) continue;

      if (obstacleKind === "wall") {
        tiles[oy][ox] = 1;
      } else {
        deco[oy][ox] = obstacleKind;
        tiles[oy][ox] = 1;
      }
    }

    const decoCount = Math.floor(zoneW * zoneH * profile.decoDensity);
    for (let i = 0; i < decoCount; i += 1) {
      const dx = randomInt(rng, x0, x1);
      const dy = randomInt(rng, y0, y1);
      if (tiles[dy][dx] === 1 || deco[dy][dx]) continue;
      if (Math.abs(dx - spawnX) < 5 && Math.abs(dy - spawnY) < 4) continue;
      if (nearbyDecoCount(dx, dy, 2) >= 5) continue;

      if (rng() < profile.randomDecoChance) {
        const variant = profile.variants[Math.floor(rng() * profile.variants.length)] || "detail";
        const intent = profile.intents[Math.floor(rng() * profile.intents.length)] || "ground";
        deco[dy][dx] = makeRandomDeco(zone.theme, rng(), variant, intent);
      } else {
        deco[dy][dx] = rng() < profile.groundChance ? "alt" : "liquid";
      }
    }
  });

  // Add scattered decoration outside zones
  const scatterCount = 150;
  for (let i = 0; i < scatterCount; i += 1) {
    const x = randomInt(rng, 2, w - 3);
    const y = randomInt(rng, 2, h - 3);
    if (tiles[y][x] === 1 || deco[y][x]) continue;
    if (Math.abs(x - spawnX) < 5 && Math.abs(y - spawnY) < 4) continue;
    let localDense = 0;
    for (let yy = Math.max(2, y - 2); yy <= Math.min(h - 3, y + 2); yy += 1) {
      for (let xx = Math.max(2, x - 2); xx <= Math.min(w - 3, x + 2); xx += 1) {
        if (xx === x && yy === y) continue;
        if (deco[yy]?.[xx]) localDense += 1;
      }
    }
    if (localDense >= 6) continue;
    const cellTheme = themes[y]?.[x] || theme;
    if (rng() < 0.52) {
      deco[y][x] = makeRandomDeco(cellTheme, rng(), "detail", "ground");
    } else {
      deco[y][x] = rng() < 0.75 ? "alt" : "liquid";
    }
  }

  return { w, h, tiles, deco, themes, zoneNames: zones.map((z) => z.name), zones, spawnX, spawnY, doorX, doorY };
}


function getAdjacentInteractable() {
  const p = state.player;
  const pTileX = Math.round(p.pixelX / TILE_SIZE);
  const pTileY = Math.round(p.pixelY / TILE_SIZE);
  // Check if player is directly adjacent (distance <= 1)
  return state.entities.find((e) => {
    if (e.removed || typeof e.interact !== "function") return false;
    const eTileX = Math.round((e.pixelX ?? (e.x * TILE_SIZE)) / TILE_SIZE);
    const eTileY = Math.round((e.pixelY ?? (e.y * TILE_SIZE)) / TILE_SIZE);
    return Math.abs(eTileX - pTileX) <= 1 && Math.abs(eTileY - pTileY) <= 1;
  });
}

// Mini-game state
const minigameState = {
  active: false,
  type: 0,
  progress: 0,
  target: 0,
  speed: 4,
  timer: 0,
  lives: 3,
  score: 0,
  sequence: [],
  playerSeq: [],
  keys: {},
  onComplete: null,
  onFail: null,
  frameCount: 0,
  maxFrames: 0,
  phase: "intro",
  introFrames: 0,
  contextTitle: "",
  contextHint: "",
  resumeLabel: "",
  allowSkipIntro: true,
};

// 8 Mini-Game Types
const MINIGAMES = [
  {
    name: "Timing (Barre)",
    desc: "Appuie sur [ESPACE] dans la zone verte.",
    init: (state) => {
      state.progress = 0; state.speed = 3 + Math.random() * 3; state.dir = 1;
      state.target = 70 + Math.random() * 60; // Zone start
      state.width = 60; // Zone width
    },
    update: (state, keys) => {
      state.progress += state.dir * state.speed;
      if (state.progress > 200 || state.progress < 0) state.dir *= -1;
      if (keys[" "]) {
        keys[" "] = false;
        if (state.progress >= state.target && state.progress <= state.target + state.width) return true;
        else state.speed = Math.max(2, state.speed - 0.5); // Penalty
      }
      return false;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#333"; ctx.fillRect(cx - 100, cy + 5, 200, 20);
      ctx.fillStyle = "#4caf50"; ctx.fillRect(cx - 100 + state.target, cy + 5, state.width, 20);
      ctx.fillStyle = "#ffeb3b"; ctx.fillRect(cx - 100 + state.progress - 2, cy + 3, 4, 24);
    }
  },
  {
    name: "Spam (Mash)",
    desc: "Mart�le [ESPACE] pour remplir la jauge !",
    init: (state) => { state.progress = 0; },
    update: (state, keys) => {
      if (state.progress > 0) state.progress -= 0.5; // Drain
      if (keys[" "]) { keys[" "] = false; state.progress += 8; }
      return state.progress >= 100;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#333"; ctx.fillRect(cx - 50, cy + 5, 100, 20);
      ctx.fillStyle = "#f44336"; ctx.fillRect(cx - 50, cy + 5, state.progress, 20);
    }
  },
  {
    name: "Hold (Maintien)",
    desc: "Maintiens [ESPACE] pour stabiliser l'onde.",
    init: (state) => { state.progress = 50; state.target = 0; }, // Progress = position, Target = time held
    update: (state, keys) => {
      state.progress += (Math.random() - 0.5) * 8; // Noise
      if (keys[" "]) state.progress += (50 - state.progress) * 0.1; // Stabilize towards center
      else state.progress += (state.progress > 50 ? 2 : -2); // Drift

      state.progress = Math.max(0, Math.min(100, state.progress));

      if (state.progress > 40 && state.progress < 60) state.target += 1;
      else state.target = Math.max(0, state.target - 2);

      return state.target > 60; // Hold for 1 second approx
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#333"; ctx.fillRect(cx - 50, cy + 5, 100, 20);
      ctx.fillStyle = "#4caf50"; ctx.fillRect(cx - 10, cy + 5, 20, 20); // Safe zone
      ctx.fillStyle = "#fff"; ctx.fillRect(cx - 50 + state.progress - 2, cy + 3, 4, 24); // Cursor
      ctx.fillStyle = "#2196f3"; ctx.fillRect(cx - 50 + 50 - 2, cy + 30, (state.target / 60) * 100, 5); // Time bar
    }
  },
  {
    name: "Sequence (Simon)",
    desc: "M�morise et r�p�te (Haut, Bas, Gauche, Droite)",
    init: (state) => {
      const dirs = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      state.sequence = Array.from({ length: 4 }, () => dirs[Math.floor(Math.random() * 4)]);
      state.playerSeq = [];
      state.timer = 60; // Show time
    },
    update: (state, keys) => {
      if (state.timer > 0) { state.timer--; return false; }

      const input = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].find(k => keys[k]);
      if (input) {
        keys[input] = false;
        if (input === state.sequence[state.playerSeq.length]) {
          state.playerSeq.push(input);
          if (state.playerSeq.length === state.sequence.length) return true;
        } else {
          state.playerSeq = []; // Mistake, start over
          state.timer = 30; // Brief pause to show error
        }
      }
      return false;
    },
    draw: (ctx, state, cx, cy) => {
      const map = { ArrowUp: "?", ArrowDown: "?", ArrowLeft: "?", ArrowRight: "?" };
      ctx.fillStyle = "white"; ctx.font = "20px Arial";
      if (state.timer > 0 && state.playerSeq.length === 0) {
        ctx.fillText(state.sequence.map(k => map[k]).join(" "), cx, cy + 20);
      } else if (state.timer > 0) {
        ctx.fillStyle = "red"; ctx.fillText("ERREUR", cx, cy + 20);
      } else {
        const display = state.sequence.map((k, i) => i < state.playerSeq.length ? map[k] : "_").join(" ");
        ctx.fillText(display, cx, cy + 20);
      }
    }
  },
  {
    name: "Catch (Attrape)",
    desc: "Attrape la cible avec [GAUCHE]/[DROITE] !",
    init: (state) => { state.progress = 50; state.target = Math.random() * 80 + 10; state.speed = 1; },
    update: (state, keys) => {
      // Target moves erratically
      state.target += (Math.random() - 0.5) * 6;
      state.target = Math.max(10, Math.min(90, state.target));

      if (keys["ArrowLeft"] || keys["a"]) state.progress -= 3;
      if (keys["ArrowRight"] || keys["d"]) state.progress += 3;
      state.progress = Math.max(0, Math.min(100, state.progress));

      if (Math.abs(state.progress - state.target) < 10) state.timer++;
      else state.timer = 0;

      return state.timer > 30;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#333"; ctx.fillRect(cx - 50, cy + 5, 100, 20);
      ctx.fillStyle = "#ffeb3b"; ctx.fillRect(cx - 50 + state.target - 5, cy + 5, 10, 20); // Target
      ctx.fillStyle = "#2196f3"; ctx.fillRect(cx - 50 + state.progress - 5, cy + 10, 10, 10); // Player
    }
  },
  {
    name: "Dodge (Esquive)",
    desc: "Evite le mur rouge avec [HAUT]/[BAS] ! (Survis 3s)",
    init: (state) => { state.progress = 50; state.target = 50; state.timer = 0; },
    update: (state, keys) => {
      // Wall moves towards you
      state.target -= 2;
      let gapPos = state.speed; // We reuse speed for gap position

      if (state.target < 0) {
        state.target = 100; // Reset wall
        state.speed = Math.random() * 80 + 10; // New gap position
      }

      if (keys["ArrowUp"] || keys["w"]) state.progress -= 3;
      if (keys["ArrowDown"] || keys["s"]) state.progress += 3;
      state.progress = Math.max(0, Math.min(100, state.progress));

      if (state.target < 10 && state.target > 0) {
        if (Math.abs(state.progress - state.speed) > 15) state.timer = 0; // Hit wall, reset timer
      }

      state.timer++;
      return state.timer > 180; // Survived
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#333"; ctx.fillRect(cx - 50, cy - 20, 100, 40); // Arena
      ctx.fillStyle = "#2196f3"; ctx.beginPath(); ctx.arc(cx - 40, cy - 20 + state.progress * 0.4, 5, 0, Math.PI * 2); ctx.fill(); // Player

      ctx.fillStyle = "red";
      ctx.fillRect(cx - 50 + state.target, cy - 20, 5, state.speed * 0.4 - 10); // Top wall
      ctx.fillRect(cx - 50 + state.target, cy - 20 + state.speed * 0.4 + 10, 5, 40); // Bottom wall

      ctx.fillStyle = "white"; ctx.fillRect(cx - 50, cy + 25, (state.timer / 180) * 100, 4); // Time
    }
  },
  {
    name: "Stop (Reflexe)",
    desc: "Appuie sur [ESPACE] d�s que le rond devient VERT.",
    init: (state) => { state.timer = 60 + Math.random() * 120; state.target = 0; },
    update: (state, keys) => {
      state.timer--;
      if (state.timer <= 0) state.target = 1; // Green

      if (keys[" "]) {
        keys[" "] = false;
        if (state.target === 1) return true; // Success
        else { state.timer = 60 + Math.random() * 120; } // Early punish
      }
      return false;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = state.target === 1 ? "#4caf50" : "#f44336";
      ctx.beginPath(); ctx.arc(cx, cy + 15, 15, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    name: "Balance (Equilibre)",
    desc: "Maintiens la barre au centre avec [GAUCHE]/[DROITE]",
    init: (state) => { state.progress = 50; state.speed = (Math.random() < 0.5 ? -1 : 1); state.timer = 0; },
    update: (state, keys) => {
      state.speed += (Math.random() - 0.5) * 0.5; // Wind
      state.progress += state.speed;

      if (keys["ArrowLeft"] || keys["a"]) state.progress -= 2;
      if (keys["ArrowRight"] || keys["d"]) state.progress += 2;

      if (state.progress < 10 || state.progress > 90) { state.progress = 50; state.timer = 0; state.speed = 0; } // Fall off

      state.timer++;
      return state.timer > 120;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#333"; ctx.fillRect(cx - 50, cy + 5, 100, 5); // Pivot
      ctx.fillStyle = "#ffeb3b"; ctx.fillRect(cx - 50 + state.progress - 5, cy, 10, 15); // Player
      ctx.fillStyle = "#fff"; ctx.fillRect(cx - 50, cy + 25, (state.timer / 120) * 100, 4); // Progress
    }
  },
  {
    name: "Combat (Duel tactique)",
    desc: "GAUCHE/DROITE: bouger | BAS: garde | ESPACE: frapper au bon timing",
    init: (state) => {
      state.p_hp = 120;
      state.e_hp = 120;
      state.x = 16;
      state.ex = 84;
      state.guard = 0;
      state.attackWindup = 0;
      state.attackCooldown = 0;
      state.enemyIntent = "advance";
      state.enemyIntentTimer = 0;
      state.enemyAttackTimer = 0;
      state.enemyHitDone = false;
      state.enemyDecisionCooldown = 28;
      state.hitFlash = 0;
      state.timer = 0;
      state.enemyDownSfxDone = false;
    },
    update: (state, keys) => {
      state.timer += 1;
      if (state.hitFlash > 0) state.hitFlash -= 1;

      const left = keys["ArrowLeft"] || keys["a"];
      const right = keys["ArrowRight"] || keys["d"];
      const guarding = keys["ArrowDown"] || keys["s"];
      if (left) state.x = Math.max(0, state.x - 1.45);
      if (right) state.x = Math.min(90, state.x + 1.45);
      state.guard = guarding ? Math.min(16, state.guard + 2) : Math.max(0, state.guard - 1);

      if (state.attackCooldown > 0) state.attackCooldown -= 1;
      if (state.attackWindup > 0) {
        state.attackWindup -= 1;
        if (state.attackWindup === 4 && Math.abs(state.x - state.ex) < 22) {
          state.e_hp = Math.max(0, state.e_hp - 16);
          state.hitFlash = 8;
          playSound("combat_hit");
        }
      }
      if (keys[" "] && state.attackCooldown === 0 && state.attackWindup === 0) {
        keys[" "] = false;
        playSound("combat_swing");
        state.attackWindup = 14;
        state.attackCooldown = 24;
      }

      const dist = state.ex - state.x;

      if (state.enemyIntentTimer > 0) {
        state.enemyIntentTimer -= 1;
        if (state.enemyIntentTimer === 0) {
          state.enemyAttackTimer = state.enemyIntent === "dash" ? 20 : 14;
          state.enemyHitDone = false;
        }
      } else if (state.enemyAttackTimer > 0) {
        state.enemyAttackTimer -= 1;
        if (state.enemyIntent === "dash") state.ex = Math.max(state.x + 8, state.ex - 1.25);
        if (!state.enemyHitDone && state.enemyAttackTimer <= 8 && Math.abs(state.ex - state.x) < 24) {
          const base = state.enemyIntent === "dash" ? 14 : 10;
          const mitigated = state.guard > 2 ? Math.floor(base * 0.45) : base;
          state.p_hp = Math.max(0, state.p_hp - mitigated);
          state.enemyHitDone = true;
          state.hitFlash = 8;
          playSound("player_hurt");
        }
        if (state.enemyAttackTimer === 0) {
          state.enemyDecisionCooldown = 28;
          state.enemyIntent = "advance";
        }
      } else {
        if (dist > 26) {
          state.ex -= 1.0;
        } else if (dist < 12) {
          state.ex += 0.45;
        }
        state.ex = Math.max(state.x + 8, Math.min(96, state.ex));

        state.enemyDecisionCooldown -= 1;
        if (state.enemyDecisionCooldown <= 0 && dist < 34) {
          state.enemyIntent = Math.random() < 0.35 ? "dash" : "jab";
          state.enemyIntentTimer = state.enemyIntent === "dash" ? 30 : 24;
          state.enemyDecisionCooldown = 30;
        }
      }

      if (state.e_hp <= 0 && !state.enemyDownSfxDone) {
        state.enemyDownSfxDone = true;
        playSound("enemy_down");
      }
      return state.e_hp <= 0;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#141a24";
      ctx.fillRect(cx - 155, cy - 18, 310, 82);
      ctx.fillStyle = "#28384d";
      ctx.fillRect(cx - 155, cy + 52, 310, 8);

      ctx.fillStyle = "#991f2e";
      ctx.fillRect(cx - 148, cy - 56, Math.max(0, state.p_hp) * 1.1, 8);
      ctx.fillStyle = "#2f82d6";
      ctx.fillRect(cx + 16, cy - 56, Math.max(0, state.e_hp) * 1.1, 8);

      const playerX = cx - 140 + state.x * 2.5;
      const enemyX = cx - 140 + state.ex * 2.5;

      ctx.fillStyle = state.guard > 2 ? "#ffd166" : "#ff6b6b";
      ctx.fillRect(playerX, cy + 12, 18, 28);
      if (state.attackWindup > 2) {
        ctx.fillStyle = "#fff1a8";
        ctx.fillRect(playerX + 16, cy + 18, 14, 6);
      }

      if (state.enemyIntentTimer > 0) {
        ctx.fillStyle = "#f59e0b";
      } else if (state.enemyAttackTimer > 0) {
        ctx.fillStyle = "#67e8f9";
      } else {
        ctx.fillStyle = "#5fa8ff";
      }
      ctx.fillRect(enemyX, cy + 12, 18, 28);
      if (state.enemyAttackTimer > 4) {
        ctx.fillStyle = "#dff6ff";
        ctx.fillRect(enemyX - 12, cy + 18, 12, 6);
      }

      if (state.hitFlash > 0) {
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.strokeRect(cx - 155.5, cy - 18.5, 311, 83);
      }

      ctx.fillStyle = "#c6def5";
      ctx.font = "12px Segoe UI";
      const intentLabel = state.enemyIntentTimer > 0 ? `Adversaire prepare: ${state.enemyIntent}` : "";
      if (intentLabel) ctx.fillText(intentLabel, cx - 72, cy + 74);
    }
  },
  {
    name: "Plateforme (Parcours)",
    desc: "ESPACE: sauter | Traverse le secteur sans tomber dans les zones a risque.",
    init: (state) => {
      state.y = 0;
      state.vy = 0;
      state.runnerX = 26;
      state.playerW = 14;
      state.distance = 0;
      state.speed = 2.1;
      state.goal = 760;
      state.failFlash = 0;

      state.obstacles = [];
      let cursor = 120;
      while (cursor < state.goal - 80) {
        if (Math.random() < 0.55) {
          const w = 26 + Math.floor(Math.random() * 18);
          state.obstacles.push({ x: cursor, w, type: "gap" });
          cursor += 80 + Math.floor(Math.random() * 40);
        } else {
          const w = 18 + Math.floor(Math.random() * 12);
          state.obstacles.push({ x: cursor, w, type: "crate" });
          cursor += 70 + Math.floor(Math.random() * 36);
        }
      }
    },
    update: (state, keys) => {
      state.speed = Math.min(2.8, state.speed + 0.0008);
      if (state.failFlash > 0) state.failFlash -= 1;

      state.vy += 0.82;
      state.y += state.vy;
      if (state.y > 0) { state.y = 0; state.vy = 0; }

      if (keys[" "] && state.y === 0) {
        keys[" "] = false;
        state.vy = -9.8;
      }

      state.distance += state.speed;
      const front = state.distance + state.runnerX + state.playerW;
      const back = state.distance + state.runnerX;

      for (const obs of state.obstacles) {
        const overlaps = front > obs.x && back < obs.x + obs.w;
        if (!overlaps) continue;

        if (obs.type === "gap" && state.y === 0) {
          state.distance = Math.max(0, state.distance - 42);
          state.failFlash = 24;
          break;
        }
        if (obs.type === "crate" && state.y > -6) {
          state.distance = Math.max(0, state.distance - 34);
          state.y = -4;
          state.vy = -3;
          state.failFlash = 24;
          break;
        }
      }

      return state.distance >= state.goal;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#10202a";
      ctx.fillRect(cx - 170, cy - 30, 340, 110);
      ctx.fillStyle = "#244458";
      ctx.fillRect(cx - 170, cy + 54, 340, 10);

      for (const obs of state.obstacles) {
        const ox = cx - 170 + obs.x - state.distance;
        if (ox < cx - 180 || ox > cx + 180) continue;
        if (obs.type === "gap") {
          ctx.fillStyle = "#04070b";
          ctx.fillRect(ox, cy + 54, obs.w, 10);
          ctx.strokeStyle = "#58a6c9";
          ctx.strokeRect(ox, cy + 54.5, obs.w, 9);
        } else {
          ctx.fillStyle = "#b08968";
          ctx.fillRect(ox, cy + 36, obs.w, 18);
        }
      }

      const px = cx - 170 + state.runnerX;
      const py = cy + 38 + state.y;
      ctx.fillStyle = "#75f79c";
      ctx.fillRect(px, py, state.playerW, 16);

      const finishX = cx - 170 + state.goal - state.distance;
      ctx.fillStyle = "#ffffff";
      if (finishX < cx + 180) ctx.fillRect(finishX, cy + 20, 6, 34);

      ctx.fillStyle = "#d7e7f6";
      ctx.fillRect(cx - 170, cy + 76, 340, 6);
      ctx.fillStyle = "#52d3a5";
      ctx.fillRect(cx - 170, cy + 76, Math.max(0, Math.min(340, (state.distance / state.goal) * 340)), 6);

      if (state.failFlash > 0) {
        ctx.fillStyle = "#ffd166";
        ctx.font = "12px Segoe UI";
        ctx.fillText("Observe les obstacles et garde ton rythme", cx - 92, cy - 8);
      }
    }
  },
  {
    name: "Precision (Sniper)",
    desc: "Vise les 3 cibles mouvantes et tire avec [ESPACE] !",
    init: (state) => {
      state.x = 50; state.y = 50; // Cursor
      state.cx = 70; state.cy = 30; // Target
      state.score = 0; state.tdx = 2; state.tdy = 2;
    },
    update: (state, keys) => {
      // Mouvement du curseur
      if (keys["ArrowLeft"] || keys["a"]) state.x = Math.max(0, state.x - 3);
      if (keys["ArrowRight"] || keys["d"]) state.x = Math.min(100, state.x + 3);
      if (keys["ArrowUp"] || keys["w"]) state.y = Math.max(0, state.y - 3);
      if (keys["ArrowDown"] || keys["s"]) state.y = Math.min(100, state.y + 3);

      // Mouvement cible
      state.cx += state.tdx; state.cy += state.tdy;
      if (state.cx < 10 || state.cx > 90) state.tdx *= -1;
      if (state.cy < 10 || state.cy > 90) state.tdy *= -1;

      // Tir
      if (keys[" "]) {
        keys[" "] = false;
        let dist = Math.hypot(state.x - state.cx, state.y - state.cy);
        if (dist < 15) {
          state.score++;
          state.cx = Math.random() * 80 + 10;
          state.cy = Math.random() * 80 + 10;
          state.tdx = (Math.random() < 0.5 ? 1 : -1) * (2 + state.score); // s'acc�l�re
          state.tdy = (Math.random() < 0.5 ? 1 : -1) * (2 + state.score);
        }
      }
      return state.score >= 3;
    },
    draw: (ctx, state, cx, cy) => {
      ctx.fillStyle = "#222"; ctx.fillRect(cx - 50, cy - 50, 100, 100); // Area

      // Cible
      ctx.fillStyle = "red";
      ctx.beginPath(); ctx.arc(cx - 50 + state.cx, cy - 50 + state.cy, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(cx - 50 + state.cx, cy - 50 + state.cy, 6, 0, Math.PI * 2); ctx.fill();

      // Curseur joueur (Croix)
      let px = cx - 50 + state.x; let py = cy - 50 + state.y;
      ctx.strokeStyle = "#0f0"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px - 10, py); ctx.lineTo(px + 10, py); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px, py - 10); ctx.lineTo(px, py + 10); ctx.stroke();

      // Score
      ctx.fillStyle = "yellow"; ctx.fillText(state.score + "/3", cx + 60, cy);
    }
  },
  {
    name: "Direction (DDR)",
    desc: "Appuie sur les directions qui apparaissent !",
    init: (state) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      state.target = keys[Math.floor(Math.random() * 4)];
      state.score = 0;
      state.timer = 60;
    },
    update: (state, keys) => {
      state.timer--;
      const dirs = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      for (const k of dirs) {
        if (keys[k]) {
          keys[k] = false;
          if (k === state.target) {
            state.score++;
            state.target = dirs[Math.floor(Math.random() * dirs.length)];
            state.timer = 60; // Reset timer for next
          } else {
            state.timer = Math.max(0, state.timer - 20); // Penalty
          }
        }
      }
      if (state.timer <= 0) { state.score = 0; state.timer = 60; }
      return state.score >= 5;
    },
    draw: (ctx, state, cx, cy) => {
      const map = { ArrowUp: "?", ArrowDown: "?", ArrowLeft: "?", ArrowRight: "?" };
      ctx.fillStyle = "#2196f3";
      ctx.font = "bold 40px Arial";
      ctx.fillText(map[state.target], cx, cy + 20);
      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.fillText(`Score: ${state.score}/5 | Temps: ${Math.ceil(state.timer / 6)}`, cx, cy + 50);
    }
  },
  {
    name: "Math (Terminal multi-etapes)",
    desc: "GAUCHE/DROITE: choisir | ESPACE: valider | Reussis 3 etapes",
    init: (state) => {
      const buildRound = () => {
        const mode = Math.floor(Math.random() * 3);
        if (mode === 0) {
          const a = randomInt(() => Math.random(), 2, 9);
          const b = randomInt(() => Math.random(), 1, 9);
          return { expr: String(a) + " + " + String(b), ans: a + b };
        }
        if (mode === 1) {
          const a = randomInt(() => Math.random(), 5, 12);
          const b = randomInt(() => Math.random(), 1, 6);
          return { expr: String(a) + " - " + String(b), ans: a - b };
        }
        const a = randomInt(() => Math.random(), 2, 6);
        const b = randomInt(() => Math.random(), 2, 5);
        return { expr: String(a) + " x " + String(b), ans: a * b };
      };

      state.rounds = Array.from({ length: 3 }, () => buildRound());
      state.round = 0;
      state.score = 0;
      state.strikes = 0;
      state.selected = 0;
      state.flash = 0;

      const fillOptions = () => {
        const current = state.rounds[state.round];
        const wrong1 = current.ans + (Math.random() < 0.5 ? -1 : 1) * randomInt(() => Math.random(), 1, 3);
        const wrong2 = current.ans + (Math.random() < 0.5 ? -1 : 1) * randomInt(() => Math.random(), 2, 5);
        const wrong3 = current.ans + (Math.random() < 0.5 ? -1 : 1) * randomInt(() => Math.random(), 3, 6);
        state.options = [current.ans, wrong1, wrong2, wrong3]
          .map((v) => Math.max(0, v))
          .filter((v, i, arr) => arr.indexOf(v) === i);
        while (state.options.length < 4) state.options.push(current.ans + state.options.length + 2);
        state.options = state.options.sort(() => Math.random() - 0.5);
        state.selected = 0;
      };

      state.prepareRound = fillOptions;
      state.prepareRound();
    },
    update: (state, keys) => {
      if (state.flash > 0) state.flash -= 1;

      if (keys["ArrowLeft"] || keys["a"]) {
        keys["ArrowLeft"] = false;
        keys["a"] = false;
        state.selected = (state.selected + state.options.length - 1) % state.options.length;
      }
      if (keys["ArrowRight"] || keys["d"]) {
        keys["ArrowRight"] = false;
        keys["d"] = false;
        state.selected = (state.selected + 1) % state.options.length;
      }

      if (keys[" "]) {
        keys[" "] = false;
        const current = state.rounds[state.round];
        const chosen = state.options[state.selected];

        if (chosen === current.ans) {
          state.score += 1;
          state.round += 1;
          state.flash = 12;
          if (state.round >= state.rounds.length) return true;
          state.prepareRound();
        } else {
          state.strikes += 1;
          state.flash = 12;
          if (state.strikes >= 2) {
            state.strikes = 0;
            state.round = Math.max(0, state.round - 1);
          }
          state.prepareRound();
        }
      }
      return false;
    },
    draw: (ctx, state, cx, cy) => {
      const current = state.rounds[state.round] || state.rounds[state.rounds.length - 1];
      ctx.fillStyle = "#15283b";
      ctx.fillRect(cx - 155, cy - 38, 310, 118);
      ctx.strokeStyle = state.flash > 0 ? "#7fe6c0" : "#3f6688";
      ctx.strokeRect(cx - 154.5, cy - 37.5, 309, 117);

      ctx.fillStyle = "#d8ecff";
      ctx.font = "15px Segoe UI";
      ctx.fillText("Etape " + String(Math.min(state.round + 1, 3)) + " / 3", cx, cy - 16);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px Segoe UI";
      ctx.fillText(String(current.expr) + " = ?", cx, cy + 14);

      state.options.forEach((opt, idx) => {
        const bx = cx - 132 + idx * 66;
        const by = cy + 30;
        ctx.fillStyle = state.selected === idx ? "#4caf50" : "#2d4d66";
        ctx.fillRect(bx, by, 56, 28);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px Segoe UI";
        ctx.fillText(String(opt), bx + 28, by + 19);
      });

      ctx.fillStyle = "#f6d365";
      ctx.font = "13px Segoe UI";
      ctx.fillText("Erreurs: " + String(state.strikes) + "/2", cx - 98, cy + 74);
      ctx.fillText("Validation: " + String(state.score) + "/3", cx + 70, cy + 74);
    }
  }
];

function startNpcChat(personaId) {
  markTutorialEvent("npc_interact");
  setChatTarget(personaId);
  openChatPanel();
  if (uiChatInput) uiChatInput.focus();
  checkAutoGreeting(personaId);
}

function buildMiniGameBrief(type, options = {}) {
  const sceneText = normalizeText((safeText(state.levelData?.theme) + " " + safeText(state.levelData?.narrative?.context)).trim());
  const personaName = safeText(options.personaName) || "Conseiller";
  const zoneName = safeText(options.zoneName) || "secteur";
  const gameName = MINIGAMES[type]?.name || "Epreuve";

  let contextTitle = gameName;
  let contextHint = "Observe bien les consignes, puis agis calmement.";

  if (type === 8) {
    contextTitle = /justice|securite|police|crise/.test(sceneText) ? "Intervention de crise" : "Simulation de duel";
    contextHint = "Lis les controles, garde tes distances et frappe au bon moment.";
  } else if (type === 9) {
    contextTitle = /nature|foret|village|mine/.test(sceneText) ? "Traversee du terrain" : "Parcours de mobilite";
    contextHint = "Observe les obstacles avant de sauter. Le rythme est plus important que la vitesse.";
  } else if (type === 12) {
    contextTitle = /lab|tech|ia|data|terminal/.test(sceneText) ? "Calibration du terminal" : "Verification logique";
    contextHint = "Choisis calmement la bonne reponse pour valider le module.";
  } else if (type === 3 || type === 11) {
    contextTitle = "Synchronisation tactique";
    contextHint = "Mets le focus sur les signaux visuels et reponds sans te precipiter.";
  }

  const resumeLabel = personaName + " - " + zoneName;
  return { contextTitle, contextHint, resumeLabel };
}

function resetMiniGameSession() {
  minigameState.active = false;
  minigameState.onComplete = null;
  minigameState.onFail = null;
  minigameState.frameCount = 0;
  minigameState.maxFrames = 0;
  minigameState.phase = "intro";
  minigameState.introFrames = 0;
  minigameState.contextTitle = "";
  minigameState.contextHint = "";
  minigameState.resumeLabel = "";
}

function minigameLoseCondition() {
  // Combat arcade loss: player HP reached zero.
  if (minigameState.type === 8 && Number.isFinite(minigameState.p_hp)) {
    return minigameState.p_hp <= 0;
  }
  return false;
}

function failMiniGame(reason = "failed") {
  if (!minigameState.active) return;
  playSound("mg_lose");
  const onFail = minigameState.onFail;
  resetMiniGameSession();
  state.isLocked = false;
  if (typeof onFail === "function") {
    onFail(reason);
    return;
  }
  addMessage(
    "system",
    "[SYSTEME] Mini-jeu non valide. Reessaie en reparlant au personnage ou au terminal.",
    state.currentChatTarget,
    true,
  );
}

function startMiniGame(type, onSuccess, onFail = null, options = {}) {
  playSound("mg_start");
  state.isLocked = true;
  minigameState.active = true;
  const enabledIds = MINIGAMES
    .map((_, i) => i)
    .filter((i) => !DISABLED_MINIGAME_IDS.has(i));
  const randomType = enabledIds.length ? enabledIds[Math.floor(Math.random() * enabledIds.length)] : 0;
  minigameState.type = (type !== undefined ? type : randomType) % MINIGAMES.length;
  if (DISABLED_MINIGAME_IDS.has(minigameState.type)) minigameState.type = randomType;
  minigameState.frameCount = 0;
  minigameState.maxFrames = Number.isFinite(options.maxFrames) ? options.maxFrames : MINIGAME_DEFAULT_MAX_FRAMES;
  minigameState.onFail = onFail;
  minigameState.phase = "intro";
  minigameState.introFrames = Number.isFinite(options.introFrames) ? options.introFrames : MINIGAME_INTRO_FRAMES;
  minigameState.allowSkipIntro = options.allowSkipIntro !== false;

  const brief = buildMiniGameBrief(minigameState.type, options);
  minigameState.contextTitle = brief.contextTitle;
  minigameState.contextHint = brief.contextHint;
  minigameState.resumeLabel = brief.resumeLabel;

  if (!state.sceneProgress.miniGamesWon) state.sceneProgress.miniGamesWon = {};
  minigameState.onComplete = () => {
    playSound("mg_win");
    state.isLocked = false;
    const wonType = minigameState.type;
    resetMiniGameSession();
    state.sceneProgress.miniGamesWon[wonType] = true;
    if (onSuccess) onSuccess();
  };

  MINIGAMES[minigameState.type].init(minigameState);

  // Prevent the intro screen from being skipped instantly by key carry-over.
  state.input.keys[" "] = false;
  state.input.keys.Space = false;
}

function interactionLabel(entity) {
  if (!entity) return getText("interact_prompt");
  if (entity.type === "npc") return getText("prompt_talk");
  if (entity.type === "door") return getText("prompt_enter");
  if (entity.type === "altar") return getText("prompt_vote");
  if (entity.type === "insight") return getText("prompt_loot");
  if (entity.type === "computer") return getText("prompt_read");
  return getText("interact_prompt");
}

function resolveAvatarUrl(raw) {
  const value = safeText(raw);
  if (!value) return "./assets/avatar_architecte.png";
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:")) return value;
  if (value.startsWith("../") || value.startsWith("./")) return value;
  if (value.startsWith("assets/")) return `./${value}`;
  return `./assets/${value}`;
}

function setChatAvatar(url) {
  const safe = resolveAvatarUrl(url);
  if (uiChatAvatar) uiChatAvatar.src = safe;
  if (uiChatMiniAvatar) uiChatMiniAvatar.src = safe;
}

function openChatPanel() {
  state.chatOpen = true;
  if (uiChatContainer) uiChatContainer.classList.remove("collapsed");
  if (uiChatMinimized) uiChatMinimized.classList.add("hidden");
}

function collapseChatPanel() {
  state.chatOpen = false;
  state.isChatting = false;
  if (uiChatInput && document.activeElement === uiChatInput) uiChatInput.blur();
  if (uiChatContainer) uiChatContainer.classList.add("collapsed");
  if (uiChatMinimized) uiChatMinimized.classList.remove("hidden");
  markTutorialEvent("chat_collapse");
}


function nextSceneFallback(fromSceneId = state.currentSceneId) {
  const n = parseLevelNumber(fromSceneId);
  if (!Number.isNaN(n)) {
    const candidate = `level_${n + 1}`;
    if (state.scenario?.scenes?.[candidate]) return candidate;
  }
  const keys = Object.keys(state.scenario?.scenes || {});
  if (!keys.length) return null;
  return keys.find((k) => k !== fromSceneId) || keys[0];
}

function saveGame() {
  const saveData = {
    currentSceneId: state.currentSceneId,
    choiceHistory: state.choiceHistory,
    // We could save globalHistory too, but it might get large
    intelPoints: state.meta.intelPoints,
    fastTrackCharges: state.meta.fastTrackCharges,
    tutorialCompleted: state.tutorial.completedLevel1,
  };
  localStorage.setItem("rpg_save", JSON.stringify(saveData));
  console.log("Game Saved:", state.currentSceneId);
}

function loadSavedGame() {
  const raw = localStorage.getItem("rpg_save");
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    state.currentSceneId = data.currentSceneId;
    state.choiceHistory = data.choiceHistory || [];
    state.meta.intelPoints = data.intelPoints || 0;
    state.meta.fastTrackCharges = data.fastTrackCharges || 0;
    state.tutorial.completedLevel1 = !!data.tutorialCompleted;
    return data.currentSceneId;
  } catch (e) {
    console.error("Load error:", e);
    return null;
  }
}

function buildTutorialScene() {
  const nextId = state.scenario?.scenes?.level_2 ? "level_2" : nextSceneFallback("level_1");
  return {
    id: "level_1",
    isTutorialLevel: true,
    theme: "nature",
    narrative: {
      visual_cues: "Zone d'entrainement de l'Observatoire: balises lumineuses, modules tactiques, couloir nord securise.",
      context: "Ici, tu apprends les outils du RPG avant les dilemmes philosophiques des niveaux narratifs.",
    },
    exits: [
      {
        id: "READY",
        description: "Tutoriel valide, passage vers le premier niveau narratif.",
        target: nextId,
      },
    ],
  };
}

function buildTutorialPersonas() {
  const mentor = {
    id: "mentor_guide",
    archetype: "A-1",
    displayName: "Iris Kade (Guide de simulation)",
    name: "Iris Kade",
    role: "Guide",
    bio: "Te forme aux commandes et a la boucle exploration -> argumentation -> decision.",
    avatar: "avatar_sibyl.png",
  };
  const tactician = {
    id: "tech_operateur",
    archetype: "B-2",
    displayName: "Noor Halim (Operateur tactique)",
    name: "Noor Halim",
    role: "Operateur",
    bio: "Explique les modules concrets: minimap, charges de synthese, progression de porte.",
    avatar: "avatar_neo_hacktivist.png",
  };
  ensureSession(mentor.id);
  ensureSession(tactician.id);
  return {
    current: {
      [mentor.id]: mentor,
      [tactician.id]: tactician,
    },
    narratorId: mentor.id,
  };
}

function ensureChatUI() {
  uiChatContainer = document.getElementById("chat-container");
  if (!uiChatContainer) {
    const container = document.createElement("div");
    container.id = "chat-container";
    container.innerHTML = `
      <div id="chat-header">
        <div id="chat-target-wrap">
          <img id="chat-target-avatar" src="../assets/avatar_architecte.png" alt="avatar">
          <div id="chat-target-meta">
            <div id="chat-target">Conseiller</div>
            <div id="chat-target-sub">E dans le champ = texte normal</div>
          </div>
        </div>
        <button id="chat-collapse" type="button" title="Reduire le chat">-</button>
      </div>
      <div id="chat-log"></div>
      <div id="chat-input-row">
        <input type="text" id="chat-input" placeholder="Explique ta decision..." autocomplete="off">
        <button id="chat-send" type="button">Envoyer</button>
      </div>
      <div id="chat-hint">Enter = envoyer | E (hors chat) = interagir</div>
    `;
    document.getElementById("game-container").appendChild(container);
    uiChatContainer = container;

    const mini = document.createElement("button");
    mini.id = "chat-minimized";
    mini.className = "hidden";
    mini.type = "button";
    mini.title = "Ouvrir le chat";
    mini.innerHTML = `<img id="chat-mini-avatar" src="../assets/avatar_architecte.png" alt="avatar">`;
    document.getElementById("game-container").appendChild(mini);
    uiChatMinimized = mini;
  }

  uiChatTarget = document.getElementById("chat-target");
  uiChatAvatar = document.getElementById("chat-target-avatar");
  uiChatLog = document.getElementById("chat-log");
  uiChatInput = document.getElementById("chat-input");
  uiChatSend = document.getElementById("chat-send");
  uiChatHint = document.getElementById("chat-hint");
  uiChatCollapse = document.getElementById("chat-collapse");
  uiChatMinimized = document.getElementById("chat-minimized");
  uiChatMiniAvatar = document.getElementById("chat-mini-avatar");

  const stopKeyPropagation = (ev) => {
    ev.stopPropagation();
  };

  uiChatInput.addEventListener("keydown", (ev) => {
    stopKeyPropagation(ev);
    if (ev.key === "Enter") {
      ev.preventDefault();
      sendPlayerAction();
    }
  });
  uiChatInput.addEventListener("keyup", stopKeyPropagation);
  uiChatInput.addEventListener("focus", () => {
    state.isChatting = true;
  });
  uiChatInput.addEventListener("blur", () => {
    setTimeout(() => {
      state.isChatting = document.activeElement === uiChatInput;
    }, 0);
  });

  uiChatSend.addEventListener("click", () => {
    sendPlayerAction();
    uiChatInput.focus();
  });

  uiChatCollapse.addEventListener("click", () => {
    collapseChatPanel();
  });

  uiChatMinimized.addEventListener("click", () => {
    markTutorialEvent("chat_reopen");
    openChatPanel();
    uiChatInput.focus();
  });

  if (state.chatOpen) openChatPanel();
  else collapseChatPanel();
}

function ensureObjectiveUI() {
  uiObjective = document.getElementById("objective-info");
  if (!uiObjective) {
    const box = document.createElement("div");
    box.id = "objective-info";
    document.getElementById("ui-layer").appendChild(box);
    uiObjective = box;
  }

  // Ensure Quest Tracker UI
  let tracker = document.getElementById("quest-tracker");
  if (!tracker) {
    tracker = document.createElement("div");
    tracker.id = "quest-tracker";
    tracker.style.cssText = "position:absolute; top:50px; right:10px; background:rgba(0,0,0,0.7); color:#fff; padding:10px; border:1px solid #0f0; border-radius:4px; font-family:monospace; min-width:150px; pointer-events:none;";
    document.getElementById("ui-layer").appendChild(tracker);
  }
}

function ensureTutorialUI() {
  uiTutorialBox = document.getElementById("tutorial-box");
  if (!uiTutorialBox) {
    const box = document.createElement("div");
    box.id = "tutorial-box";
    box.className = "hidden";
    box.innerHTML = `
      <div id="tutorial-head">
        <span id="tutorial-step">Tutoriel</span>
        <button id="tutorial-skip" type="button">Passer</button>
      </div>
      <div id="tutorial-text"></div>
    `;
    document.getElementById("ui-layer").appendChild(box);
    uiTutorialBox = box;
  }
  uiTutorialStep = document.getElementById("tutorial-step");
  uiTutorialText = document.getElementById("tutorial-text");
  uiTutorialSkip = document.getElementById("tutorial-skip");
  if (uiTutorialSkip && !uiTutorialSkip.dataset.bound) {
    uiTutorialSkip.dataset.bound = "1";
    uiTutorialSkip.addEventListener("click", () => {
      completeTutorialLevel1(true);
      addMessage("system", "[SYSTEME] Tutoriel passe. Tu es libre d'explorer.", state.currentChatTarget, true);
    });
  }
}

function isTutorialActive() {
  return state.tutorial.active && state.currentSceneId === "level_1";
}

function tutorialCanUseAltar() {
  return !isTutorialActive() || state.tutorial.step >= 6;
}

function tutorialCanUseDoor() {
  return !isTutorialActive() || state.tutorial.step >= 7;
}

function resetTutorialFlags() {
  state.tutorial.step = 0;
  state.tutorial.movedTiles = 0;
  state.tutorial.lastTileX = state.player.x;
  state.tutorial.lastTileY = state.player.y;
  state.tutorial.awaitingChatReopen = false;
  state.tutorial.flags.npcInteracted = false;
  state.tutorial.flags.chatSent = false;
  state.tutorial.flags.chatCollapsed = false;
  state.tutorial.flags.chatReopenedAfterCollapse = false;
  state.tutorial.flags.terminalUsed = false;
  state.tutorial.flags.insightUsed = false;
  state.tutorial.flags.altarVoted = false;
  state.tutorial.flags.doorUsed = false;
}

function startTutorialLevel1() {
  state.tutorial.active = true;
  resetTutorialFlags();
  updateTutorialUI();
}

function completeTutorialLevel1(skipped = false) {
  state.tutorial.active = false;
  state.tutorial.completedLevel1 = true;
  if (uiTutorialBox) uiTutorialBox.classList.add("hidden");
  updateObjectiveInfo();
  if (!skipped) {
    addMessage("system", "[SYSTEME] Tutoriel termine. Jeu libre active.", state.currentChatTarget, true);
  }
}

function tutorialRequirementMet(step) {
  const t = state.tutorial;
  if (step === 0) return t.movedTiles >= 4;
  if (step === 1) return t.flags.npcInteracted;
  if (step === 2) return t.flags.chatCollapsed && t.flags.chatReopenedAfterCollapse;
  if (step === 3) return t.flags.chatSent;
  if (step === 4) return t.flags.terminalUsed;
  if (step === 5) return t.flags.insightUsed;
  if (step === 6) return t.flags.altarVoted;
  if (step === 7) return t.flags.doorUsed;
  return false;
}

function advanceTutorialIfNeeded() {
  if (!isTutorialActive()) return;
  let changed = false;
  while (state.tutorial.step < TUTORIAL_STEPS.length && tutorialRequirementMet(state.tutorial.step)) {
    state.tutorial.step += 1;
    changed = true;
  }
  if (state.tutorial.step >= TUTORIAL_STEPS.length) {
    completeTutorialLevel1(false);
    return;
  }
  if (changed) updateTutorialUI();
  updateObjectiveInfo();
}

function updateTutorialUI() {
  if (!uiTutorialBox || !uiTutorialStep || !uiTutorialText) return;
  if (!isTutorialActive()) {
    uiTutorialBox.classList.add("hidden");
    return;
  }
  const step = state.tutorial.step;
  const total = TUTORIAL_STEPS.length;
  uiTutorialStep.textContent = `Tutoriel ${step + 1}/${total}`;
  uiTutorialText.textContent = TUTORIAL_STEPS[step] || "Tutoriel termine.";
  uiTutorialBox.classList.remove("hidden");
}

function markTutorialEvent(eventName) {
  if (!isTutorialActive()) return;
  const t = state.tutorial;
  if (eventName === "move_tile") {
    t.movedTiles += 1;
  } else if (eventName === "npc_interact") {
    t.flags.npcInteracted = true;
  } else if (eventName === "chat_send") {
    t.flags.chatSent = true;
  } else if (eventName === "chat_collapse") {
    t.flags.chatCollapsed = true;
    t.awaitingChatReopen = true;
  } else if (eventName === "chat_reopen") {
    if (t.awaitingChatReopen) {
      t.flags.chatReopenedAfterCollapse = true;
      t.awaitingChatReopen = false;
    }
  } else if (eventName === "terminal_use") {
    t.flags.terminalUsed = true;
  } else if (eventName === "insight_use") {
    t.flags.insightUsed = true;
  } else if (eventName === "altar_vote") {
    t.flags.altarVoted = true;
  } else if (eventName === "door_use") {
    t.flags.doorUsed = true;
  }
  advanceTutorialIfNeeded();
}

function grantInsightReward() {
  state.meta.intelPoints += 1;
  const rewards = [];
  if (!state.meta.modules.minimap) {
    state.meta.modules.minimap = true;
    rewards.push("Mini-carte debloquee");
  } else {
    state.meta.fastTrackCharges += 1;
    rewards.push(`/trancher +1 (total ${state.meta.fastTrackCharges})`);
  }
  return rewards.join(" | ");
}

function tryUseFastTrackCommand(inputText) {
  const normalized = normalizeText(inputText);
  const isFastTrack = normalized === "trancher" || normalized.startsWith("trancher ");
  if (!isFastTrack) return false;

  if (isTutorialActive()) {
    addMessage("system", "[SYSTEME] Tutoriel: commande /trancher desactivee jusqu'a la fin du niveau.", state.currentChatTarget, true);
    return true;
  }
  if (!allDebateNpcsTalked()) {
    const missing = listUntalkedDebateNpcNames().join(", ");
    addMessage("system", `[SYSTEME] /trancher bloque: consulte d'abord tous les conseillers (${missing}).`, state.currentChatTarget, true);
    return true;
  }
  if (sceneNeedsTerminalPuzzle() && !state.sceneProgress.terminalPuzzleSolved) {
    addMessage("system", "[SYSTEME] /trancher bloque: puzzle du terminal non resolu sur le level 0.", state.currentChatTarget, true);
    return true;
  }
  if (state.meta.fastTrackCharges <= 0) {
    addMessage("system", "[SYSTEME] Aucune charge disponible. Explore des modules pour gagner /trancher.", state.currentChatTarget, true);
    return true;
  }

  state.meta.fastTrackCharges -= 1;
  const exitId = chooseExitHeuristically(inputText);
  const exit = resolveExitById(exitId);
  unlockDoor(exit?.target || nextSceneFallback());
  addMessage(
    "system",
    `[SYSTEME] /trancher active. Decision rapide: ${exit?.id || "AUTO"}. Charges restantes: ${state.meta.fastTrackCharges}.`,
    state.currentChatTarget,
    true,
  );
  updateObjectiveInfo();
  return true;
}
function updateObjectiveInfo() {
  if (!uiObjective) return;
  const p = state.sceneProgress;
  const npcs = getDebateNpcs();
  const talkedTotal = npcs.filter((e) => e.talkedTo).length;
  const targetTotal = npcs.length;

  const lockText = state.hasVoted ? "PORTE: OUVERTE" : "PORTE: VERROUILLEE";
  const turns = "Debat " + p.userTurns + "/" + p.forceDecisionTurns;
  const quest = "Conseillers: " + talkedTotal + "/" + targetTotal;
  const tutorialLabel = safeText(TUTORIAL_STEPS[state.tutorial.step]);
  const tutorialShort = tutorialLabel.length > 56 ? tutorialLabel.slice(0, 56) + "..." : tutorialLabel;
  const targetText = isTutorialActive()
    ? "Tutoriel " + (state.tutorial.step + 1) + "/" + TUTORIAL_STEPS.length + ": " + tutorialShort
    : state.hasVoted
      ? "Passe au nord"
      : sceneNeedsTerminalPuzzle() && !state.sceneProgress.terminalPuzzleSolved
        ? "Level 0: resols le puzzle du terminal avant le vote"
        : talkedTotal < targetTotal
          ? "Parle a tous (" + talkedTotal + "/" + targetTotal + ")"
          : "Vote a l'autel ou tranche dans le chat";

  uiObjective.textContent = turns + " | " + quest + " | " + lockText + " | " + targetText;

  const tracker = document.getElementById("quest-tracker");
  if (tracker) {
    let html = "<b>CONSEILLERS:</b><br>";
    npcs.forEach((npc) => {
      const persona = state.currentPersonas[npc.personaId] || state.personas[npc.personaId];
      const name = persona?.name || npc.personaId;
      const check = npc.talkedTo ? "[OK]" : "[ ]";
      html += check + " " + name + "<br>";
    });
    tracker.innerHTML = html;
  }
}
function setChatTarget(personaId) {
  state.currentChatTarget = personaId;
  const persona = state.currentPersonas[personaId] || state.personas[personaId];
  uiChatTarget.textContent = persona?.displayName || persona?.name || personaId || "Conseiller";
  uiChatHint.textContent = "Enter = envoyer | E (hors chat) = interagir";
  setChatAvatar(persona?.avatar);
  restoreChatHistory(personaId);
}

function ensureSession(personaId) {
  if (!state.chatSessions[personaId]) state.chatSessions[personaId] = [];
  return state.chatSessions[personaId];
}

function renderChatLine(role, text) {
  const row = document.createElement("div");
  row.className = `chat-row ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;
  row.appendChild(bubble);
  uiChatLog.appendChild(row);
  uiChatLog.scrollTop = uiChatLog.scrollHeight;
}

function restoreChatHistory(personaId) {
  uiChatLog.innerHTML = "";
  const history = ensureSession(personaId);
  for (const msg of history) {
    const role = msg.role === "user" ? "user" : msg.role === "system" ? "system" : "bot";
    renderChatLine(role, msg.content);
  }
}

function addMessage(role, text, personaId, save = true) {
  if (save && personaId) {
    ensureSession(personaId).push({ role, content: text });
  }
  if (personaId === state.currentChatTarget) {
    const visualRole = role === "assistant" ? "bot" : role;
    renderChatLine(visualRole, text);
  }
}

// --- Advanced Procedural Assets ---

function drawPixelPattern(ctx, pattern, colors) {
  const size = 32;
  const pixel = size / 8; // 8x8 grid for textures
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const char = pattern[y][x];
      if (char !== " " && colors[char]) {
        ctx.fillStyle = colors[char];
        ctx.fillRect(x * pixel, y * pixel, pixel, pixel);
      }
    }
  }
}

// Helper to recolor an existing sprite/canvas with a new palette
function recolorSprite(sourceCanvas, paletteMapping) {
  const c = document.createElement("canvas");
  c.width = sourceCanvas.width;
  c.height = sourceCanvas.height;
  const ctx = c.getContext("2d");
  ctx.drawImage(sourceCanvas, 0, 0);

  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  const data = imageData.data;

  // Create lookup for performance if palette is simple k->v
  // But here we might be strictly mapping hex colors. 
  // Ideally, `paletteMapping` is { "#oldHex": "#newHex" }.
  // For pixel art, exact match is usually fine.

  const hexMap = {};
  Object.keys(paletteMapping).forEach(k => {
    hexMap[k.toLowerCase()] = paletteMapping[k];
  });

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toLowerCase();
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  // Pre-calculate RGB mappings
  const rbgMap = {};
  Object.keys(hexMap).forEach(oldHex => {
    rbgMap[oldHex] = hexToRgb(hexMap[oldHex]);
  });

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue; // Transparent
    const currentHex = rgbToHex(data[i], data[i + 1], data[i + 2]);
    if (rbgMap[currentHex]) {
      const [r, g, b] = rbgMap[currentHex];
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }

  return c;
}


function generateTexture(type, palette) {
  const c = document.createElement("canvas");
  c.width = 32;
  c.height = 32;
  const ctx = c.getContext("2d");

  // Fill base background
  ctx.fillStyle = palette.base || "#000";
  ctx.fillRect(0, 0, 32, 32);

  if (type === "grass") {
    // Advanced Grass: layered noise + tufts
    for (let i = 0; i < 64; i++) {
      ctx.fillStyle = Math.random() < 0.5 ? palette.light : palette.shadow;
      const x = Math.random() * 32;
      const y = Math.random() * 32;
      ctx.fillRect(x, y, 2, 2);
    }
    // Grass tufts
    ctx.strokeStyle = palette.light;
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * 28 + 2;
      const y = Math.random() * 28 + 2;
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x - 2, y - 3);
      ctx.moveTo(x, y); ctx.lineTo(x + 2, y - 3);
      ctx.stroke();
    }
  } else if (type === "bricks") {
    // Detailed Brick pattern with depth
    ctx.fillStyle = palette.mortar || "#333";
    for (let y = 0; y < 32; y += 8) ctx.fillRect(0, y, 32, 1);
    for (let y = 0; y < 32; y += 8) {
      let offset = (y / 8) % 2 === 0 ? 0 : 4;
      for (let x = offset; x < 32; x += 8) ctx.fillRect(x, y, 1, 8);
    }
    // Pixel shading on bricks
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    for (let y = 0; y < 32; y += 8) {
      let offset = (y / 8) % 2 === 0 ? 0 : 4;
      for (let x = offset; x < 32; x += 8) {
        ctx.fillRect(x + 1, y + 7, 7, 1); // Bottom shadow
        ctx.fillRect(x + 7, y + 1, 1, 7); // Right shadow
      }
    }
  } else if (type === "metal") {
    // Brushed metal with rivets
    ctx.strokeStyle = palette.highlight || "rgba(255,255,255,0.1)";
    for (let i = 0; i < 10; i++) {
      const y = Math.random() * 32;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(32, y + Math.random() * 2); ctx.stroke();
    }

    // Panel lines
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(32, 0); ctx.lineTo(32, 32); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(1, 1, 30, 1); ctx.fillRect(1, 1, 1, 30);

    // Rivets
    ctx.fillStyle = palette.shadow || "#000";
    ctx.beginPath();
    ctx.arc(3, 3, 1, 0, Math.PI * 2);
    ctx.arc(29, 3, 1, 0, Math.PI * 2);
    ctx.arc(3, 29, 1, 0, Math.PI * 2);
    ctx.arc(29, 29, 1, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "hazard") {
    // Clean hazard stripes
    ctx.fillStyle = palette.stripes || "#000";
    ctx.beginPath();
    for (let i = -32; i < 32; i += 8) {
      ctx.moveTo(i, 0); ctx.lineTo(i + 4, 0); ctx.lineTo(i + 36, 32); ctx.lineTo(i + 32, 32);
    }
    ctx.fill();
    // Gloss
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(0, 0, 32, 4);
  } else if (type === "carpet") {
    // Rich carpet pattern
    ctx.fillStyle = palette.pattern || "rgba(0,0,0,0.1)";
    for (let y = 0; y < 32; y += 2) {
      for (let x = 0; x < 32; x += 2) {
        if ((x + y) % 4 === 0) ctx.fillRect(x, y, 1, 1);
      }
    }
    // Border
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.strokeRect(0, 0, 32, 32);
  } else if (type === "tiles") {
    // Clean lab/hospital tiles
    ctx.fillStyle = palette.grout || "#ccc";
    ctx.fillRect(15, 0, 1, 32);
    ctx.fillRect(0, 15, 32, 1);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(2, 2, 10, 2); ctx.fillRect(18, 18, 10, 2);
  } else if (type === "noise") {
    // Generic noise fallback
    for (let i = 0; i < 32; i++) {
      ctx.fillStyle = Math.random() < 0.5 ? palette.light : palette.shadow;
      ctx.fillRect(Math.random() * 32, Math.random() * 32, 2, 2);
    }
  }

  return c;
}


function drawDetail(ctx, type, theme) {
  const p = theme === "nature" ? { main: "#2e7d32", sec: "#5d4037" } :
    theme === "urbain" ? { main: "#546e7a", sec: "#263238" } :
      theme === "laboratoire" ? { main: "#00acc1", sec: "#eceff1" } :
        theme === "espace" ? { main: "#ff6f00", sec: "#212121" } :
          { main: "#8d6e63", sec: "#d7ccc8" };

  // Draw based on type...
  if (type === "tree" || type === "column") {
    ctx.fillStyle = p.sec;
    ctx.fillRect(10, 20, 12, 12); // Trunk/Base
    ctx.fillStyle = p.main;
    ctx.beginPath(); ctx.arc(16, 16, 12, 0, Math.PI * 2); ctx.fill(); // Top
    // Highlight
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath(); ctx.arc(12, 12, 4, 0, Math.PI * 2); ctx.fill();
  } else if (type === "computer") {
    ctx.fillStyle = p.sec;
    ctx.fillRect(4, 12, 24, 18); // Desk
    ctx.fillStyle = "#111";
    ctx.fillRect(8, 6, 16, 12); // Monitor
    ctx.fillStyle = "#0f0";
    ctx.font = "8px monospace";
    ctx.fillText(">_", 9, 14);
  }
}

function drawBuilding(theme) {
  const c = document.createElement("canvas");
  c.width = 40; c.height = 40;
  const ctx = c.getContext("2d");

  // Base Facade
  const isUrban = theme === "urbain";
  const isSpace = theme === "espace";
  const isNature = theme === "nature";

  if (isNature) {
    ctx.fillStyle = "#3e2723"; // Wood
    ctx.fillRect(4, 4, 32, 36);
    ctx.fillStyle = "#5d4037";
    ctx.fillRect(8, 8, 24, 32);
    // Roof
    ctx.fillStyle = "#1b5e20"; // Mossy roof
    ctx.beginPath();
    ctx.moveTo(20, 0); ctx.lineTo(0, 16); ctx.lineTo(40, 16); ctx.fill();
    // Door
    ctx.fillStyle = "#263238";
    ctx.fillRect(16, 26, 8, 14);
  } else {
    ctx.fillStyle = isUrban ? "#607d8b" : isSpace ? "#37474f" : "#5d4037";
    ctx.fillRect(2, 6, 36, 34);

    // Roof
    ctx.fillStyle = isUrban ? "#37474f" : isSpace ? "#263238" : "#3e2723";
    ctx.fillRect(0, 0, 40, 8);

    // Window
    ctx.fillStyle = isSpace ? "#00e5ff" : "#fff59d";
    ctx.fillRect(8, 14, 8, 10);
    ctx.fillRect(24, 14, 8, 10);

    // Door
    ctx.fillStyle = "#212121";
    ctx.fillRect(16, 28, 8, 12);
  }

  return c;
}


function drawVehicle(theme) {
  const c = document.createElement("canvas");
  c.width = 32; c.height = 32;
  const ctx = c.getContext("2d");

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath(); ctx.ellipse(16, 28, 12, 4, 0, 0, Math.PI * 2); ctx.fill();

  const isNature = theme === "nature";
  const isSpace = theme === "espace";
  const isLab = theme === "laboratoire";

  if (isNature) {
    // Wooden Cart
    ctx.fillStyle = "#5d4037";
    ctx.fillRect(4, 12, 24, 12);
    // Wheels
    ctx.fillStyle = "#3e2723";
    ctx.beginPath(); ctx.arc(8, 24, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(24, 24, 4, 0, Math.PI * 2); ctx.fill();
  } else if (isSpace || isLab) {
    // Rover / Bot
    ctx.fillStyle = isSpace ? "#ff6f00" : "#eceff1";
    ctx.beginPath();
    ctx.moveTo(4, 24); ctx.lineTo(16, 8); ctx.lineTo(28, 24); ctx.fill();
    // Eye
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(14, 14, 4, 2);
  } else {
    // Car (Urban/Bureau)
    ctx.fillStyle = theme === "urbain" ? "#c62828" : "#1a237e";
    ctx.fillRect(4, 16, 24, 8); // Body
    ctx.fillRect(8, 10, 16, 6); // Top
    // Windows
    ctx.fillStyle = "#81d4fa";
    ctx.fillRect(9, 11, 6, 4); ctx.fillRect(17, 11, 6, 4);
    // Wheels
    ctx.fillStyle = "#111";
    ctx.fillRect(6, 22, 4, 4); ctx.fillRect(22, 22, 4, 4);
  }

  return c;
}



function createProceduralAssets() {
  const pPal = { "1": "#e74c3c", "2": "#f1948a", "3": "#ffffff", "4": "#7b241c" };
  // Keep original players/NPCs for now
  state.assets.player_down = generateSprite("player", pPal);
  state.assets.player_up = generateSprite("player_up", pPal);
  state.assets.player_left = generateSprite("player_side", pPal);
  state.assets.player_right = generateSprite("player_side", pPal, true);

  state.assets["A-1"] = generateSprite("npc", { "1": "#154360", "2": "#2980b9", "3": "#00ffff", "4": "#1a5276" });
  state.assets["B-2"] = generateSprite("npc", { "1": "#145a32", "2": "#27ae60", "3": "#f1c40f", "4": "#1e8449" });
  state.assets["C-3"] = generateSprite("npc", { "1": "#6e2c00", "2": "#d35400", "3": "#111111", "4": "#a04000" });

  state.assets.themeTiles = {};

  // Helper to generate a full theme set
  const makeTheme = (themeName) => {
    const isNature = themeName === "nature";
    const isUrban = themeName === "urbain";
    const isLab = themeName === "laboratoire";
    const isSpace = themeName === "espace";

    // Palettes
    const floorPal = isNature ? { base: "#2e7d32", light: "#66bb6a", shadow: "#1b5e20" } :
      isUrban ? { base: "#455a64", mortar: "#37474f" } :
        isLab ? { base: "#eceff1", grout: "#b0bec5" } :
          isSpace ? { base: "#263238", highlight: "#37474f", shadow: "#102027" } :
            { base: "#5d4037", pattern: "#795548" }; // Bureau

    const wallPal = isNature ? { base: "#4e342e", mortar: "#3e2723" } :
      isUrban ? { base: "#a1887f", mortar: "#5d4037" } :
        isLab ? { base: "#b0bec5", highlight: "#fff", shadow: "#78909c" } :
          isSpace ? { base: "#3e2723", highlight: "#ff6f00", shadow: "#1b0000" } :
            { base: "#d7ccc8", grout: "#a1887f" };

    // Texture Types
    const floorType = isNature ? "grass" : isLab ? "tiles" : isSpace || isUrban ? "metal" : "carpet";
    const wallType = isNature || isUrban ? "bricks" : "metal";

    // Objects
    const computer = generateSprite("computer", isNature ? { "1": "#5d4037", "2": "#795548", "3": "#a5d6a7" } :
      isLab ? { "1": "#eceff1", "2": "#ffffff", "3": "#00bcd4" } :
        { "1": "#263238", "2": "#37474f", "3": "#ffca28" });

    // Helper to extract sprite from sheet
    const extractSprite = (sheet, index) => {
      if (!sheet) return null;
      const c = document.createElement("canvas");
      c.width = 32; c.height = 32;
      const ctx = c.getContext("2d");
      // Assume 32x32 grid, sheet width determines cols
      const cols = Math.floor(sheet.width / 32);
      const row = Math.floor(index / cols);
      const col = index % cols;
      ctx.drawImage(sheet, col * 32, row * 32, 32, 32, 0, 0, 32, 32);
      return c;
    };


    // Buildings: Try high-fidelity first
    let building;
    if (isNature && state.assets.sheets?.buildings_nature) building = extractSprite(state.assets.sheets.buildings_nature, Math.floor(Math.random() * 4));
    else if (isUrban && state.assets.sheets?.buildings_urbain) building = extractSprite(state.assets.sheets.buildings_urbain, Math.floor(Math.random() * 4));
    else if (isLab && state.assets.sheets?.buildings_laboratoire) building = extractSprite(state.assets.sheets.buildings.laboratoire, Math.floor(Math.random() * 4));

    if (!building) building = drawBuilding(themeName); // Fallback

    const vehicle = drawVehicle(themeName); // Vehicles still procedural for now

    // Theme NPCs
    // Map themes to rows in npcs_themes.png (assuming 5 themes * 3 npcs = 15 sprites)
    // Row 0: Nature, Row 1: Urban, Row 2: Lab, Row 3: Space, Row 4: Bureau
    const themeRow = isNature ? 0 : isUrban ? 1 : isLab ? 2 : isSpace ? 3 : 4;

    let npc1, npc2, npc3;
    if (state.assets.sheets?.npcs_themes) {
      npc1 = extractSprite(state.assets.sheets.npcs_themes, themeRow * 3 + 0);
      npc2 = extractSprite(state.assets.sheets.npcs_themes, themeRow * 3 + 1);
      npc3 = extractSprite(state.assets.sheets.npcs_themes, themeRow * 3 + 2);
    }

    // Fallback Procedural Palettes
    const npcPal1 = isNature ? { "1": "#33691e", "2": "#558b2f", "3": "#dcedc8", "4": "#1b5e20" } : // Ranger
      isLab ? { "1": "#ffffff", "2": "#eceff1", "3": "#00bcd4", "4": "#b0bec5" } : // Scientist
        isSpace ? { "1": "#ff6f00", "2": "#ff8f00", "3": "#212121", "4": "#bf360c" } : // Engineer
          isUrban ? { "1": "#607d8b", "2": "#78909c", "3": "#eceff1", "4": "#455a64" } : // Citizen
            { "1": "#5d4037", "2": "#795548", "3": "#d7ccc8", "4": "#3e2723" }; // Bureaucrat

    const npcPal2 = isNature ? { "1": "#5d4037", "2": "#795548", "3": "#a1887f", "4": "#3e2723" } : // Hiker
      isLab ? { "1": "#00acc1", "2": "#26c6da", "3": "#e0f7fa", "4": "#00838f" } : // Assistant
        isSpace ? { "1": "#212121", "2": "#424242", "3": "#76ff03", "4": "#000000" } : // Marine
          isUrban ? { "1": "#37474f", "2": "#546e7a", "3": "#cfd8dc", "4": "#263238" } : // Punk
            { "1": "#4e342e", "2": "#6d4c41", "3": "#ffe0b2", "4": "#3e2723" }; // Manager

    const npcPal3 = isNature ? { "1": "#1b5e20", "2": "#2e7d32", "3": "#81c784", "4": "#003300" } : // Spirit
      isLab ? { "1": "#e91e63", "2": "#f06292", "3": "#fce4ec", "4": "#880e4f" } : // Director
        isSpace ? { "1": "#0277bd", "2": "#29b6f6", "3": "#e1f5fe", "4": "#01579b" } : // Pilot
          isUrban ? { "1": "#212121", "2": "#000000", "3": "#ff5722", "4": "#3e2723" } : // Goth
            { "1": "#8d6e63", "2": "#a1887f", "3": "#ffffff", "4": "#5d4037" }; // Intern

    // Generate Base Textures
    const set = {
      floor: generateTexture(floorType, floorPal),
      wall: generateTexture(wallType, wallPal),
      door_closed: generateSprite("door", { "1": "#424242", "2": "#616161", "3": "#ef5350" }),
      door_open: generateSprite("door", { "1": "#424242", "2": "#616161", "3": "#66bb6a" }),
      computer: computer,
      building: building,
      vehicle: vehicle,
      npc_1: generateSprite("npc", npcPal1),
      npc_2: generateSprite("npc", npcPal2),
      npc_3: generateSprite("npc", npcPal3),
      alt: generateTexture("hazard", { stripes: isLab ? "#29b6f6" : "#fbc02d" }),
      liquid: generateTexture("noise", { base: isNature ? "#0277bd" : "#d32f2f", light: "#fff", shadow: "#000" }),
      altar: generateSprite("wall", { "1": "#607d8b", "2": "#78909c", "3": "#ffffff" })
    };

    // --- OVERRIDES FOR HIGH FIDELITY ASSETS ---
    if (isSpace && state.assets.sheets?.buildings_espace) {
      // Space Buildings
      set.building = extractSprite(state.assets.sheets.buildings_espace, randomInt(rng, 0, 8));
    }

    // Vehicles (Generic handling: row 0=Nature, 1=Urban, 2=Lab, 3=Space?? Checking sheet content is hard, assume grid)
    if (state.assets.sheets?.vehicles) {
      // let's just pick random vehicles for now as improved fallback
      const vRow = isNature ? 0 : isUrban ? 1 : isLab ? 2 : isSpace ? 3 : 4;
      // Assume 5 rows, 4 cols
      set.vehicle = extractSprite(state.assets.sheets.vehicles, vRow * 4 + randomInt(rng, 0, 3));
    }


    // Add Detailed Object Overlays
    // We create a composite canvas for specific complex objects if needed, 
    // but for now we'll just use the sprites we generated.
    // PRO TIP: We can draw *on top* of the generated sprites to add detail.

    const enhance = (baseSprite, type) => {
      const c = document.createElement("canvas");
      c.width = 32; c.height = 32;
      const ctx = c.getContext("2d");
      ctx.drawImage(baseSprite, 0, 0);
      drawDetail(ctx, type, themeName);
      return c;
    };


    // Enhance props
    set.computer = enhance(set.computer, "computer");
    // set.altar = enhance(set.altar, "column"); // Optional

    return set;
  };

  state.assets.themeTiles.nature = makeTheme("nature");
  state.assets.themeTiles.urbain = makeTheme("urbain");
  state.assets.themeTiles.laboratoire = makeTheme("laboratoire");
  state.assets.themeTiles.espace = makeTheme("espace");
  state.assets.themeTiles.bureaucratie = makeTheme("bureaucratie");

  // Set default
  Object.assign(state.assets, state.assets.themeTiles.nature);
}

// Procedural fallback removed in favor of user-provided downloaded pixel art assets

// --- Enrich theme tile sets with building / vehicle / NPC sprites ---
// Called AFTER rebuildThemeTiles() in the external-assets path,
// OR called immediately if we use default (data URL) tiles.
// We map these to `state.assets.sheets.buildings_nature` etc.
function mergeHighFiAssets(assetsHash) {
  const sheets = state.assets.sheets || {};

  // Helper: extract a 32�32 sprite from a sheet image
  const extractSprite = (sheet, index) => {
    if (!sheet) return null;
    const c = document.createElement("canvas");
    c.width = 32; c.height = 32;
    const sctx = c.getContext("2d");
    const cols = Math.max(1, Math.floor(sheet.width / 32));
    const row = Math.floor(index / cols);
    const col = index % cols;
    sctx.drawImage(sheet, col * 32, row * 32, 32, 32, 0, 0, 32, 32);
    return c;
  };

  const themeList = [
    { name: "nature", buildingSheet: sheets.buildings_nature, vRow: 0, npcRow: 0 },
    { name: "urbain", buildingSheet: sheets.buildings_urbain, vRow: 1, npcRow: 1 },
    { name: "laboratoire", buildingSheet: sheets.buildings_laboratoire, vRow: 2, npcRow: 2 },
    { name: "espace", buildingSheet: sheets.buildings_espace, vRow: 3, npcRow: 3 },
    { name: "bureaucratie", buildingSheet: null, vRow: 4, npcRow: 4 },
  ];

  themeList.forEach(({ name, buildingSheet, vRow, npcRow }) => {
    const set = state.assets.themeTiles[name];
    if (!set) return;

    // --- Building ---
    if (buildingSheet) {
      set.building = extractSprite(buildingSheet, Math.floor(Math.random() * 4));
    }
    if (!set.building) set.building = drawBuilding(name);

    // --- Vehicle ---
    if (sheets.vehicles) {
      set.vehicle = extractSprite(sheets.vehicles, vRow * 4 + Math.floor(Math.random() * 4));
    }
    if (!set.vehicle) set.vehicle = drawVehicle(name);

    // --- NPCs ---
    if (sheets.npcs_themes) {
      set.npc_1 = extractSprite(sheets.npcs_themes, npcRow * 3 + 0);
      set.npc_2 = extractSprite(sheets.npcs_themes, npcRow * 3 + 1);
      set.npc_3 = extractSprite(sheets.npcs_themes, npcRow * 3 + 2);
    }
    // Procedural fallback NPCs
    if (!set.npc_1) set.npc_1 = generateSprite("npc", { "1": "#33691e", "2": "#558b2f", "3": "#dcedc8", "4": "#1b5e20" });
    if (!set.npc_2) set.npc_2 = generateSprite("npc", { "1": "#5d4037", "2": "#795548", "3": "#a1887f", "4": "#3e2723" });
    if (!set.npc_3) set.npc_3 = generateSprite("npc", { "1": "#1b5e20", "2": "#2e7d32", "3": "#81c784", "4": "#003300" });

    // --- Computer / alt / liquid / altar fallbacks ---
    if (!set.computer) set.computer = generateSprite("computer", { "1": "#263238", "2": "#37474f", "3": "#ffca28" });
    if (!set.alt) set.alt = generateTexture("hazard", { stripes: "#fbc02d" });
    if (!set.liquid) set.liquid = generateTexture("noise", { base: name === "nature" ? "#0277bd" : "#d32f2f", light: "#fff", shadow: "#000" });
    if (!set.altar) set.altar = generateSprite("wall", { "1": "#607d8b", "2": "#78909c", "3": "#ffffff" });
  });
}


async function createAssets() {
  try {
    const [
      playerManifest,
      npcManifest,
      tilesetsManifest,
      playerSheet,
      npcSheet,
      tilesNature,
      tilesUrbain,
      tilesLab,
      tilesEspace,
      tilesBureau,
      buildingsNature,
      buildingsUrban,
      buildingsLab,
      buildingsEspace, // New
      vehicles,        // New
      npcsThemes,
    ] = await Promise.all([

      loadJson("./assets/player_presets.json").catch(() => null),
      loadJson("./assets/npcs.json").catch(() => null),
      loadJson("./assets/tilesets_manifest.json").catch(() => null),
      loadImage("./assets/player_presets.png").catch(() => null),
      loadImage("./assets/npcs.png").catch(() => null),
      loadImage("./assets/tilesets_nature.png").catch(() => null),
      loadImage("./assets/tilesets_urbain.png").catch(() => null),
      loadImage("./assets/tilesets_laboratoire.png").catch(() => null),
      loadImage("./assets/tilesets_espace.png").catch(() => null),
      loadImage("./assets/tilesets_bureaucratie.png").catch(() => null),
      loadImage("./assets/buildings_nature.png").catch(() => null),
      loadImage("./assets/buildings_urban.png").catch(() => null),
      loadImage("./assets/buildings_lab.png").catch(() => null),
      loadImage("./assets/buildings_espace.png").catch(() => null),
      loadImage("./assets/vehicles.png").catch(() => null),
      loadImage("./assets/npcs_themes.png").catch(() => null),
    ]);



    state.assets.playerManifest = playerManifest;

    state.assets.npcManifest = npcManifest;
    state.assets.tilesetsManifest = tilesetsManifest;
    state.assets.player_sheet = playerSheet;
    state.assets.npc_sheet = npcSheet;
    state.assets.playerPresetIndex = 0;
    state.assets.tilesets = {
      nature: tilesNature,
      urbain: tilesUrbain,
      laboratoire: tilesLab,
      espace: tilesEspace,
      bureaucratie: tilesBureau,
    };

    state.assets.sheets = {
      buildings_nature: buildingsNature,
      buildings_urbain: buildingsUrban,
      buildings_laboratoire: buildingsLab,
      buildings_espace: buildingsEspace,
      vehicles: vehicles,
      npcs_themes: npcsThemes
    };

    // Load user-provided decorative assets
    const [decoNature, decoBureaucracy, decoWater] = await Promise.all([
      loadImage("./assets/decorations/tileset_16x16_final_1.png"),
      loadImage("./assets/decorations/tilesetformattedupdate1.png"),
      loadImage("./assets/decorations/tileset_waterworld.png")
    ]);

    state.assets.publicDecorations = {
      natureSheet: decoNature,
      bureaucracySheet: decoBureaucracy,
      waterSheet: decoWater
    };

    const [hybridSpaceBuildings, hybridMixedProps] = await Promise.all([
      Promise.all(HYBRID_SPACE_BUILDINGS.map((name) =>
        loadImage("./assets/buildings_space/" + name).catch(() => null)
      )),
      Promise.all(HYBRID_MIXED_PROPS.map((name) =>
        loadImage("./assets/vehicles_mixed/" + name).catch(() => null)
      )),
    ]);

    state.assets.hybrid = {
      spaceBuildings: hybridSpaceBuildings.filter(Boolean),
      mixedProps: hybridMixedProps.filter(Boolean),
    };

    rebuildThemeTiles();
    mergeHighFiAssets();
    applyThemeAssets("nature");
    state.assets.useExternal = true;
  } catch (err) {
    console.warn("[ASSETS] External assets unavailable, using procedural fallback:", err.message || err);
    createProceduralAssets();
    if (!state.assets.npc_ambient) state.assets.npc_ambient = generateSprite("npc", { "1": "#37474f", "2": "#607d8b", "3": "#b0bec5", "4": "#1f2a30" });
  }
}

function spawnAmbientNPCs() {
  state.entities = state.entities.filter((e) => !e.isAmbient);

  const zones = Array.isArray(state.world.zones) && state.world.zones.length
    ? state.world.zones
    : [{ name: "Couloir", theme: state.currentTheme, rect: [0.1, 0.1, 0.9, 0.9] }];

  const rng = createSeededRandom(hashStringSeed(safeText(state.currentSceneId) + "|ambient"));

  zones.forEach((zone, zoneIndex) => {
    const x0 = Math.max(2, Math.floor(zone.rect[0] * state.world.w) + 1);
    const y0 = Math.max(2, Math.floor(zone.rect[1] * state.world.h) + 1);
    const x1 = Math.min(state.world.w - 3, Math.floor(zone.rect[2] * state.world.w) - 1);
    const y1 = Math.min(state.world.h - 3, Math.floor(zone.rect[3] * state.world.h) - 1);
    if (x1 <= x0 || y1 <= y0) return;

    const area = (x1 - x0 + 1) * (y1 - y0 + 1);
    const crowdFactor = area > 110 ? 2 : 1;
    const count = Math.max(1, Math.min(AMBIENT_NPCS_PER_ZONE, crowdFactor));

    for (let i = 0; i < count; i += 1) {
      let placed = null;
      for (let attempt = 0; attempt < 28; attempt += 1) {
        const rx = randomInt(rng, x0, x1);
        const ry = randomInt(rng, y0, y1);
        if (!worldInBounds(rx, ry)) continue;
        if (state.world.tiles[ry]?.[rx] === 1) continue;
        if (Math.abs(rx - state.player.x) < 3 && Math.abs(ry - state.player.y) < 2) continue;
        if (state.entities.some((e) => !e.removed && e.x === rx && e.y === ry)) continue;
        placed = { x: rx, y: ry };
        break;
      }
      if (!placed) continue;

      const archetype = AMBIENT_NPC_ARCHETYPES[(zoneIndex + i) % AMBIENT_NPC_ARCHETYPES.length];
      const dirs = ["down", "left", "right", "up"];
      state.entities.push({
        type: "npc",
        x: placed.x,
        y: placed.y,
        pixelX: placed.x * TILE_SIZE,
        pixelY: placed.y * TILE_SIZE,
        dir: dirs[Math.floor(rng() * dirs.length)],
        asset: archetype,
        personaId: archetype,
        isAmbient: true,
        nonRequired: true,
        blocking: false,
        allowedRect: zone.rect,
        ai: { nextMove: Date.now() + 400 + Math.floor(rng() * 2500), state: "idle" },
      });
    }
  });
}

function showPlayerSelection() {
  return new Promise((resolve) => {
    // Overriding the selection modal in RPG mode since there's no pixel picking here.
    state.assets.playerPresetIndex = 0;
    resolve();
  });
}

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Missing file: ${path}`);
  return res.json();
}

function resolveSceneId(sceneId) {
  if (state.scenario.scenes[sceneId]) return sceneId;
  const fallback = `level_${sceneId}`;
  if (state.scenario.scenes[fallback]) return fallback;
  return null;
}

function buildScenePersonas(scene) {
  const current = {};
  const chars = scene?.narrative?.characters || [];
  const fallbackArchetypes = ["A-1", "B-2", "C-3"];
  if (chars.length) {
    chars.forEach((char, idx) => {
      if (!char) return;
      const archetype = safeText(char.archetype) || fallbackArchetypes[idx % fallbackArchetypes.length];
      const base = state.personas[archetype] || {};
      const id = safeText(char.id) || `${scene.id}_char_${idx + 1}`;
      const name = safeText(char.name) || base.displayName || `Intervenant ${idx + 1}`;
      const role = safeText(char.role);
      current[id] = {
        id,
        archetype,
        displayName: role ? `${name} (${role})` : name,
        name,
        role,
        bio: safeText(char.bio) || safeText(base.bio) || "Intervenant du dilemme.",
        avatar: safeText(char.avatar) || safeText(base.avatar),
      };
      ensureSession(id);
    });
  } else {
    for (const [id, p] of Object.entries(state.personas)) {
      current[id] = {
        id,
        archetype: id,
        displayName: p.displayName || id,
        name: p.displayName || id,
        role: "",
        bio: p.bio || "",
        avatar: p.avatar || "",
      };
      ensureSession(id);
    }
  }

  const narratorId = Object.keys(current)[0] || Object.keys(state.personas)[0] || "A-1";
  return { current, narratorId };
}

function personaAssetKey(persona) {
  const a = safeText(persona?.archetype);
  if (a === "A-1" || a === "B-2" || a === "C-3") return a;
  if (safeText(persona?.id) in state.assets) return safeText(persona.id);
  return "A-1";
}

function resolveExitById(exitId) {
  const exits = Array.isArray(state.levelData?.exits) ? state.levelData.exits : [];
  if (!exits.length) return null;
  if (!exitId) return exits[0];
  const normalized = normalizeText(exitId).toUpperCase();
  return exits.find((e) => normalizeText(e.id).toUpperCase() === normalized) || exits[0];
}

function getDebateNpcs() {
  return state.entities.filter((e) => e.type === "npc" && !e.removed && !e.nonRequired);
}

function getUntalkedDebateNpcs() {
  return getDebateNpcs().filter((e) => !e.talkedTo);
}

function allDebateNpcsTalked() {
  if (isTutorialActive()) return true;
  const npcs = getDebateNpcs();
  return npcs.length > 0 && npcs.every((e) => !!e.talkedTo);
}

function listUntalkedDebateNpcNames() {
  return getUntalkedDebateNpcs().map((e) => state.currentPersonas[e.personaId]?.name || e.personaId);
}

function sceneNeedsTerminalPuzzle() {
  return state.currentSceneId === LEVEL_TEST_ID;
}

function hasMinimalJustification(text) {
  const cleaned = safeText(text).replace(/\s+/g, " ").trim();
  if (!cleaned) return false;
  const words = cleaned.split(" ").filter(Boolean);
  return cleaned.length >= 24 && words.length >= 5;
}

function chooseExitHeuristically(text) {
  const exits = Array.isArray(state.levelData?.exits) ? state.levelData.exits : [];
  if (!exits.length) return null;
  const source = safeText(text) + " " + state.globalHistory
    .filter((h) => h.sceneId === state.currentSceneId && h.role === "user")
    .map((h) => h.content).join(" ");
  const sourceNorm = normalizeText(source);
  const explicit = exits.find((e) => sourceNorm.includes(normalizeText(e.id)));
  if (explicit) return explicit.id;

  let best = exits[0];
  let bestScore = -1;
  for (const e of exits) {
    const score = overlapScore(source, safeText(e.id) + " " + safeText(e.description));
    if (score > bestScore) {
      bestScore = score;
      best = e;
    }
  }
  return best?.id || exits[0].id;
}

function getContextualMinigamePoolFromText(rawText) {
  const text = normalizeText(rawText);
  if (!text) return [];

  if (/(securite|justice|police|arme|weapon|prison|frontiere|conflit|crise)/.test(text)) {
    return [8, 5, 0];
  }
  if (/(nature|foret|climat|eolien|water|tourism|weather|vivant|ecolog)/.test(text)) {
    return [9, 7, 4];
  }
  if (/(ia|ai|robot|digital|data|genet|lab|automation|algorith|reseau|virtual)/.test(text)) {
    return [12, 3, 11];
  }
  if (/(education|langue|vote|societ|travail|econom|culture|egalit)/.test(text)) {
    return [2, 6, 3];
  }
  return [];
}

function getSceneMinigamePool(sceneId) {
  const sanitizePool = (pool) => {
    const cleaned = (Array.isArray(pool) ? pool : [])
      .filter((id, i, arr) => Number.isFinite(id) && id >= 0 && id < MINIGAMES.length && !DISABLED_MINIGAME_IDS.has(id) && arr.indexOf(id) === i);
    return cleaned.length ? cleaned : [12, 9, 8];
  };

  if (sceneId === LEVEL_TEST_ID) return sanitizePool([...LEVEL0_MINIGAME_POOL]);

  const scene = state.scenario?.scenes?.[sceneId];
  const sceneText = [
    safeText(scene?.theme),
    safeText(scene?.narrative?.context),
    safeText(scene?.narrative?.dilemma),
    safeText(scene?.narrative?.question),
    safeText(scene?.narrative?.visual_cues),
  ].join(" ");

  const contextual = getContextualMinigamePoolFromText(sceneText);
  if (contextual.length) return sanitizePool(contextual);

  const total = MINIGAMES.length;
  const parsed = parseLevelNumber(sceneId);
  const levelNum = Number.isFinite(parsed) ? parsed : 1;
  const base = ((Math.max(1, levelNum) - 1) * 2) % total;
  return sanitizePool([base % total, (base + 4) % total, (base + 8) % total]);
}

function pickNpcMinigame(sceneId, zoneTheme, idx, fallbackPool = null) {
  const zoneMap = {
    nature: [9, 7, 4],
    urbain: [8, 0, 5],
    laboratoire: [12, 3, 11],
    espace: [10, 3, 9],
    bureaucratie: [2, 6, 3],
  };
  const sanitizePool = (pool) => {
    const cleaned = (Array.isArray(pool) ? pool : [])
      .filter((id, i, arr) => Number.isFinite(id) && id >= 0 && id < MINIGAMES.length && !DISABLED_MINIGAME_IDS.has(id) && arr.indexOf(id) === i);
    return cleaned.length ? cleaned : [12, 9, 8];
  };
  const scenePool = sanitizePool(Array.isArray(fallbackPool) && fallbackPool.length ? fallbackPool : getSceneMinigamePool(sceneId));
  const zonePool = sanitizePool(zoneMap[zoneTheme] || []);
  const combined = sanitizePool([...zonePool, ...scenePool]);
  return combined[idx % combined.length];
}

function maybeUnlockDoorByProgress(reason = "AUTO") {
  if (state.hasVoted) return false;
  if (isTutorialActive()) return false;
  if (!allDebateNpcsTalked()) return false;
  if (sceneNeedsTerminalPuzzle() && !state.sceneProgress.terminalPuzzleSolved) return false;

  const p = state.sceneProgress;
  if (p.userTurns < p.forceDecisionTurns) return false;
  if (!hasMinimalJustification(p.lastPlayerInput)) return false;

  const exitId = chooseExitHeuristically(p.lastPlayerInput);
  const targetExit = resolveExitById(exitId);
  unlockDoor(targetExit?.target || nextSceneFallback());
  const label = targetExit?.id || "AUTO";
  addMessage("system", "[SYSTEME] Limite de debat atteinte. Decision appliquee: " + label + ". Porte deverrouillee.", state.currentChatTarget, true);
  return true;
}
function getLastAssistantMessage(personaId) {
  const history = ensureSession(personaId).filter((m) => m.role === "assistant");
  return history.length ? history[history.length - 1].content : "";
}

function buildFreshAngleReply(targetId) {
  const persona = state.currentPersonas[targetId] || {};
  const roleName = persona.displayName || persona.name || "Conseiller";
  const templates = [
    `${roleName}: impact humain direct, a court terme, puis cout moral a long terme.`,
    `${roleName}: pense aux externalites invisibles et a qui porte vraiment le risque.`,
    `${roleName}: une solution legitime doit etre defendable publiquement et reversible.`,
    `${roleName}: compare les consequences irreversibles contre les benefices immediats.`,
    `${roleName}: decide avec un critere clair, puis applique-le sans exception opportuniste.`,
  ];
  const idx = state.sceneProgress.loopBreakerIndex % templates.length;
  state.sceneProgress.loopBreakerIndex += 1;
  return templates[idx];
}

function sanitizeReplyChunk(text, turnCount) {
  let out = safeText(text);
  if (!out) return out;
  if (turnCount >= 3) {
    let seenQuestion = false;
    out = out.replace(/\?/g, () => {
      if (seenQuestion) return ".";
      seenQuestion = true;
      return "?";
    });
  }
  if (out.length > 260) out = `${out.slice(0, 257)}...`;
  return out;
}

function avoidLoopReply(targetId, chunk) {
  const last = getLastAssistantMessage(targetId);
  const nowNorm = normalizeText(chunk);
  const lastNorm = normalizeText(last);
  if (!nowNorm) return buildFreshAngleReply(targetId);
  const tooClose = (nowNorm && lastNorm && (nowNorm === lastNorm || nowNorm.includes(lastNorm) || lastNorm.includes(nowNorm)))
    || overlapScore(nowNorm, lastNorm) > 0.84;
  if (!tooClose) return chunk;
  return buildFreshAngleReply(targetId);
}

async function loadLevel(sceneId) {
  const targetId = resolveSceneId(sceneId);
  if (!targetId) return;
  const isTutorialLevel = targetId === "level_1" && !state.tutorial.completedLevel1;
  const scene = isTutorialLevel ? buildTutorialScene() : state.scenario.scenes[targetId];
  state.currentSceneId = targetId;
  state.levelData = scene;
  if (state.assets.useExternal) {
    applyThemeAssets(inferThemeFromScene(scene));
  }
  const world = generateWorld(scene);
  state.world.w = world.w;
  state.world.h = world.h;
  state.world.tiles = world.tiles;
  state.world.deco = world.deco;
  state.world.themes = world.themes;
  state.world.zoneNames = world.zoneNames || [];
  state.world.zones = world.zones || [];
  state.camera.x = 0;
  state.camera.y = 0;

  state.entities = [];
  state.hasVoted = false;
  state.pendingDoorTarget = null;
  state.sceneProgress.userTurns = 0;
  state.sceneProgress.insightsCollected = 0;
  state.sceneProgress.loopBreakerIndex = 0;
  state.sceneProgress.lastPlayerInput = "";
  state.sceneProgress.miniGamesWon = {};
  state.sceneProgress.terminalPuzzleSolved = false;
  state.player.x = world.spawnX;
  state.player.y = world.spawnY;
  state.player.pixelX = world.spawnX * TILE_SIZE;
  state.player.pixelY = world.spawnY * TILE_SIZE;

  const levelNum = parseLevelNumber(targetId);
  uiLevel.textContent = Number.isNaN(levelNum) ? targetId : `${levelNum} / 50`;

  saveGame(); // Save progress at level start

  const { current, narratorId } = isTutorialLevel ? buildTutorialPersonas() : buildScenePersonas(scene);
  state.currentPersonas = current;
  setChatTarget(narratorId);
  if (isTutorialLevel) {
    startTutorialLevel1();
    addMessage(
      "system",
      "[SYSTEME] Tutoriel guide active sur ce niveau. Utilise 'Passer' si besoin.",
      narratorId,
      true,
    );
    if (ensureSession(narratorId).filter((m) => m.role === "assistant").length === 0) {
      addMessage(
        "assistant",
        "Bienvenue a l'Academie. Cette fenetre prend de la place volontairement: reduis-la avec '-' puis rouvre-la via l'avatar pour valider la premiere etape.",
        narratorId,
        true,
      );
    }
  } else {
    state.tutorial.active = false;
    updateTutorialUI();
  }
  playLevelMusic(targetId);

  const context = safeText(scene?.narrative?.context || scene?.theme || "");
  const introLines = [
    `Contexte: ${context || "Aucun contexte."}`,
    state.world.zoneNames?.length ? `Zones: ${state.world.zoneNames.join(" | ")}` : "",
    "Objectif: explorer, debattre puis trancher.",
  ].filter(Boolean).join("\n");
  startDialog("INTRO NIVEAU", introLines);

  const personaList = Object.values(current);
  const worldZones = world.zones || [];
  const minigamePool = getSceneMinigamePool(targetId);

  personaList.forEach((persona, idx) => {
    let nx, ny;

    // Place each NPC in a different zone if zones available
    if (worldZones.length > 0) {
      const zone = worldZones[idx % worldZones.length];
      const zoneX0 = Math.floor(zone.rect[0] * world.w) + 3;
      const zoneY0 = Math.floor(zone.rect[1] * world.h) + 3;
      const zoneX1 = Math.floor(zone.rect[2] * world.w) - 3;
      const zoneY1 = Math.floor(zone.rect[3] * world.h) - 3;
      nx = Math.floor((zoneX0 + zoneX1) / 2);
      ny = Math.floor((zoneY0 + zoneY1) / 2);
    } else {
      // Fallback: spread near spawn
      nx = world.spawnX - 5 + (idx % 3) * 5;
      ny = world.spawnY - 4 + Math.floor(idx / 3) * 2;
    }

    const pos = placeIfWalkable(nx, ny, world.spawnX, world.spawnY - 2);
    const zoneInfo = worldZones.length > 0 ? worldZones[idx % worldZones.length] : null;
    const zoneRect = zoneInfo?.rect || null;
    const zoneName = zoneInfo?.name || "Secteur central";
    const zoneTheme = zoneInfo?.theme || inferThemeFromScene(scene);
    const npcMiniGame = pickNpcMinigame(targetId, zoneTheme, idx, minigamePool);

    state.entities.push({
      type: "npc",
      x: pos.x,
      y: pos.y,
      pixelX: pos.x * TILE_SIZE,
      pixelY: pos.y * TILE_SIZE,
      personaId: persona.id,
      asset: personaAssetKey(persona),
      blocking: true,
      minigameType: npcMiniGame,
      talkedTo: false,
      zoneName,
      zoneTheme,
      allowedRect: zoneRect,
      interact: async () => {
        markTutorialEvent("npc_interact");
        const self = state.entities.find((e) => e.personaId === persona.id);
        if (!self) return;

        if (!self.talkedTo) {
          self.talkedTo = true;
          const others = getDebateNpcs().filter((e) => !e.talkedTo && e.personaId !== persona.id);
          if (others.length > 0) {
            const nextPersona = state.currentPersonas[others[0].personaId] || state.personas[others[0].personaId];
            addMessage("system", "[INFO] Premier contact etabli avec " + persona.name + ". Va aussi voir " + (nextPersona.name || nextPersona.id) + ".", persona.id, true);
          } else {
            addMessage("system", "[INFO] Tous les conseillers ont ete consultes. Le Gardien t'attend a l'autel.", persona.id, true);
          }
          updateObjectiveInfo();
        }

        startNpcChat(persona.id);
      },
    });
  });

  const computerPos = placeIfWalkable(world.spawnX - 4, world.spawnY - 1, world.spawnX - 3, world.spawnY);
  state.entities.push({
    type: "computer",
    x: computerPos.x,
    y: computerPos.y,
    asset: "computer",
    blocking: true,
    interact: () => {
      markTutorialEvent("terminal_use");
      const c = (safeText(scene?.narrative?.visual_cues) + " " + safeText(scene?.narrative?.context)).trim();
      if (sceneNeedsTerminalPuzzle() && !state.sceneProgress.terminalPuzzleSolved) {
        startDialog("TERMINAL", "Authentification requise: complete le puzzle pour deverrouiller le module de vote.");
        startMiniGame(LEVEL0_TERMINAL_MINIGAME, () => {
          state.sceneProgress.terminalPuzzleSolved = true;
          addMessage("system", "[SYSTEME] Puzzle terminal valide. Tu peux maintenant finaliser ton vote.", state.currentChatTarget, true);
          updateObjectiveInfo();
        }, null, {
          personaName: "Terminal central",
          zoneName: "Annexe technique",
          introFrames: 130,
          maxFrames: 3000,
        });
        return;
      }
      startDialog("TERMINAL", c || "Aucune donnee narrative.");
    },
  });

  const altarPos = placeIfWalkable(world.spawnX + 3, world.spawnY - 1, world.spawnX + 2, world.spawnY);
  state.entities.push({
    type: "altar",
    x: altarPos.x,
    y: altarPos.y,
    asset: "altar",
    blocking: true,
    interact: () => {
      if (!tutorialCanUseAltar()) {
        startDialog("TUTORIEL", TUTORIAL_STEPS[state.tutorial.step] || "Termine le tutoriel.");
        return;
      }
      openVotingTerminal(scene);
    },
  });

  const doorPos = placeIfWalkable(world.doorX, world.doorY, world.spawnX, world.spawnY - 12);
  state.entities.push({
    type: "door",
    x: doorPos.x,
    y: doorPos.y,
    asset: "door_closed",
    blocking: true,
    interact: () => {
      if (!tutorialCanUseDoor()) {
        startDialog("TUTORIEL", TUTORIAL_STEPS[state.tutorial.step] || "Termine le tutoriel.");
        return;
      }
      if (!state.hasVoted) {
        startDialog(
          "SYSTEM",
          "Porte verrouillee. Debats + indices ouvrent une synthese auto. Sinon vote manuel a l'autel.",
        );
        return;
      }
      markTutorialEvent("door_use");
      if (state.pendingDoorTarget) {
        loadLevel(state.pendingDoorTarget);
      } else {
        const next = nextSceneFallback();
        if (next) loadLevel(next);
      }
    },
  });

  const insightSpots = [
    placeIfWalkable(world.spawnX - 12, world.spawnY + 6, world.spawnX - 9, world.spawnY + 5),
    placeIfWalkable(world.spawnX + 11, world.spawnY + 5, world.spawnX + 8, world.spawnY + 4),
    placeIfWalkable(world.spawnX + 1, world.spawnY - 10, world.spawnX, world.spawnY - 9),
  ];
  insightSpots.forEach((pos, idx) => {
    state.entities.push({
      type: "insight",
      x: pos.x,
      y: pos.y,
      asset: idx % 2 === 0 ? "alt" : "computer",
      blocking: false,
      interact: () => {
        const self = state.entities.find((e) => e.type === "insight" && e.x === pos.x && e.y === pos.y && !e.removed);
        if (!self) return;
        self.removed = true;
        playSound("item_use");
        markTutorialEvent("insight_use");
        state.sceneProgress.insightsCollected += 1;
        const rewardText = grantInsightReward();
        addMessage(
          "system",
          `[SYSTEME] Module ${state.sceneProgress.insightsCollected}/${state.sceneProgress.insightsRequired} collecte. Recompense: ${rewardText}.`,
          state.currentChatTarget,
          true,
        );
        updateObjectiveInfo();
        maybeUnlockDoorByProgress("INDICE");
      },
    });
  });

  spawnAmbientNPCs();

  // Removed fake props loop to avoid confusion with real interactable objects

  const narrativeText = `${safeText(scene?.narrative?.visual_cues)} ${safeText(scene?.narrative?.context)}`.trim();
  if (!isTutorialLevel && narrativeText && ensureSession(narratorId).length === 0) {
    addMessage("assistant", `*${narrativeText}*`, narratorId, true);
  }

  if (!isTutorialLevel && ensureSession(narratorId).length <= 1) {
    const introPrompt = `
ROLE: ${state.currentPersonas[narratorId].name || state.currentPersonas[narratorId].displayName}.
SCENE: "${safeText(scene?.narrative?.context) || safeText(scene?.theme)}".

TASK:
1) Welcome the mediator briefly.
2) Explain the conflict in a neutral and factual way.
3) Give one immediate decision axis.

FORMAT:
- French language.
- Max 65 words.
- One compact block.
`;
    await callBot(introPrompt, narratorId, true);
  }

  if (isTutorialLevel) {
    addMessage(
      "system",
      "[SYSTEME] Niveau tutoriel: maitrise commandes + modules, puis passe la porte nord.",
      narratorId,
      true,
    );
  } else {
    addMessage(
      "system",
      "[SYSTEME] Objectif: discuter, collecter des indices, puis trancher. Porte au nord.",
      narratorId,
      true,
    );
  }
  updateObjectiveInfo();
}

function startDialog(name, text) {
  state.isLocked = true;
  uiDialogName.textContent = name;
  uiDialogText.textContent = text;
  uiDialog.classList.remove("hidden");
}

function closeDialog() {
  playSound("next");
  uiDialog.classList.add("hidden");
  state.isLocked = false;
}

async function callAIInternal(systemPrompt) {
  let res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: CURRENT_MODEL, messages: [], system: systemPrompt }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_e) {
    data = null;
    // Fallback to text if JSON parsing fails
    const text = await res.text();
    console.warn("AI response not JSON, trying to parse as text:", text);
    return text; // Return raw text for further processing
  }

  if (!res.ok || !data?.reply) {
    res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", messages: [], system: systemPrompt }),
    });
    data = await res.json();
  }

  const reply = String(data?.reply || "").replace(/```json/g, "").replace(/```/g, "").trim();
  return reply;
}

async function callBot(systemPrompt, targetId, isIntro = false) {
  const history = ensureSession(targetId);
  const recentHistory = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-6);
  const messagesToSend = isIntro ? [] : recentHistory;
  const turnCount = state.sceneProgress.userTurns;

  const loadingId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  if (targetId === state.currentChatTarget) {
    renderChatLine("bot", "...");
    if (uiChatLog.lastElementChild) uiChatLog.lastElementChild.dataset.loadingId = loadingId;
  }

  try {
    let res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: CURRENT_MODEL, messages: messagesToSend, system: systemPrompt }),
    });
    let data = null;
    const text = await res.text();
    try {
      data = JSON.parse(text);
    } catch (_e) {
      data = null;
    }

    if (!res.ok || !data?.reply) {
      const fallbackRes = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o-mini", messages: messagesToSend, system: systemPrompt }),
      });
      data = await fallbackRes.json();
    }

    const reply = safeText(data?.reply);
    const chunks = reply
      .split("###")
      .map((x) => x.trim())
      .filter((x) => x.replace(/[\s*]/g, "").length > 0)
      .slice(0, 2);

    if (targetId === state.currentChatTarget) {
      const loadingNode = [...uiChatLog.children].find((el) => el.dataset && el.dataset.loadingId === loadingId);
      if (loadingNode) loadingNode.remove();
    }

    if (!chunks.length) {
      addMessage("assistant", "Je reformule: precise ton choix moral et ses consequences.", targetId, true);
      return;
    }

    for (const rawChunk of chunks) {
      const cleaned = sanitizeReplyChunk(rawChunk, turnCount);
      const noLoop = avoidLoopReply(targetId, cleaned);
      addMessage("assistant", noLoop, targetId, true);
    }
  } catch (e) {
    if (targetId === state.currentChatTarget) {
      const loadingNode = [...uiChatLog.children].find((el) => el.dataset && el.dataset.loadingId === loadingId);
      if (loadingNode) loadingNode.remove();
    }
    addMessage("assistant", `Erreur IA: ${String(e.message || e)}`, targetId, true);
  }
}

function deriveValueTags(text) {
  const norm = normalizeText(text);
  const values = [];
  if (/(justice|egalite|equite|droits?)/.test(norm)) values.push("Justice");
  if (/(securite|proteger|protection|risque|danger)/.test(norm)) values.push("Securite");
  if (/(liberte|autonomie|choix|individu)/.test(norm)) values.push("Liberte");
  if (/(empath|compassion|souffrance|dignite)/.test(norm)) values.push("Empathie");
  if (/(nature|climat|planete|vivant|ecosysteme)/.test(norm)) values.push("Respect du vivant");
  if (/(responsab|consequ|futur|durable)/.test(norm)) values.push("Responsabilite");
  if (!values.length) values.push("Responsabilite");
  return values.slice(0, 3);
}

function buildFallbackVoteSummary(decision, justification, sceneText, decisionId) {
  const values = deriveValueTags(decision + " " + justification);
  return {
    values,
    shortTerm: "Ta decision peut soulager une partie des personnes concernees tout de suite.",
    longTerm: "Sur le long terme, il faudra verifier les effets secondaires et ajuster la regle.",
    blindSpot: "Le camp le moins entendu risque de se sentir exclu du resultat.",
    question: "Si tu devais expliquer ce choix a une classe plus jeune, que dirais-tu ?",
    decisionId: decisionId || "AUTO",
    sceneText: safeText(sceneText),
  };
}

async function generateVoteSummary(decision, justification, sceneText, decisionId) {
  const fallback = buildFallbackVoteSummary(decision, justification, sceneText, decisionId);
  try {
    const prompt = [
      "Tu es un coach philo pour enfants (8 a 11 HarmoS).",
      "Produis une synthese courte, neutre et non-jugeante apres un vote ethique.",
      "Contexte: " + safeText(sceneText),
      "Decision: " + safeText(decision),
      "Justification: " + safeText(justification),
      "Reponds UNIQUEMENT en JSON valide:",
      "{\"values\":[\"...\",\"...\"],\"shortTerm\":\"...\",\"longTerm\":\"...\",\"blindSpot\":\"...\",\"question\":\"...\"}",
      "Contraintes: francais simple, phrases courtes, pas de note morale, pas de bonne/mauvaise reponse."
    ].join("\n");
    const raw = await callAIInternal(prompt);
    const parsed = JSON.parse(raw);
    const values = Array.isArray(parsed.values) ? parsed.values.map((v) => safeText(v)).filter(Boolean).slice(0, 3) : fallback.values;
    return {
      values: values.length ? values : fallback.values,
      shortTerm: safeText(parsed.shortTerm) || fallback.shortTerm,
      longTerm: safeText(parsed.longTerm) || fallback.longTerm,
      blindSpot: safeText(parsed.blindSpot) || fallback.blindSpot,
      question: safeText(parsed.question) || fallback.question,
      decisionId: decisionId || "AUTO",
      sceneText: safeText(sceneText),
    };
  } catch (_e) {
    return fallback;
  }
}

function showVoteSummaryOverlay(summary, title = "SYNTHESE DE TON CHOIX") {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.id = "vote-summary-overlay";
    overlay.style.cssText = "position:absolute; inset:0; background:rgba(4,8,14,0.93); z-index:9100; display:flex; align-items:center; justify-content:center; padding:18px; box-sizing:border-box;";
    const values = (summary.values || []).map((v) => `<li>${safeText(v)}</li>`).join("") || "<li>Responsabilite</li>";
    overlay.innerHTML = `
      <div style="max-width:760px; width:100%; background:#0f1a29; border:1px solid #3d5f82; border-radius:12px; padding:18px; color:#e8f4ff; box-shadow:0 10px 32px rgba(0,0,0,0.45);">
        <h2 style="margin:0 0 10px 0; color:#7fe6c0;">${safeText(title)}</h2>
        <p style="margin:0 0 8px 0; color:#9ec3e6;"><b>Valeurs mobilisees</b></p>
        <ul style="margin-top:0; margin-bottom:12px;">${values}</ul>
        <p style="margin:6px 0;"><b>Court terme:</b> ${safeText(summary.shortTerm)}</p>
        <p style="margin:6px 0;"><b>Long terme:</b> ${safeText(summary.longTerm)}</p>
        <p style="margin:6px 0;"><b>Angle oublie possible:</b> ${safeText(summary.blindSpot)}</p>
        <p style="margin:10px 0 16px 0;"><b>Question bonus:</b> ${safeText(summary.question)}</p>
        <div style="display:flex; justify-content:flex-end;">
          <button id="vote-summary-close" style="background:#2f8cb8; border:1px solid #4ea8d2; color:#fff; padding:8px 14px; border-radius:8px; cursor:pointer;">Continuer</button>
        </div>
      </div>
    `;
    const root = document.getElementById("game-container") || document.body;
    root.appendChild(overlay);
    state.isLocked = true;
    const btn = document.getElementById("vote-summary-close");
    const close = () => {
      overlay.remove();
      state.isLocked = false;
      resolve();
    };
    if (btn) btn.addEventListener("click", close);
    else close();
  });
}

function applyDecisionAndUnlock(decisionText, justificationText) {
  const exits = Array.isArray(state.levelData?.exits) ? state.levelData.exits : [];
  const merged = (safeText(decisionText) + " " + safeText(justificationText)).trim();
  let decisionId = "AUTO";
  let target = nextSceneFallback();
  if (exits.length) {
    const inferred = chooseExitHeuristically(merged);
    const exit = exits.find((e) => e.id === inferred) || exits[0];
    decisionId = exit?.id || "AUTO";
    target = exit?.target || target;
  }
  state.choiceHistory.push({ level: state.currentSceneId, decision: decisionId });
  unlockDoor(target);
  return { decisionId, target };
}

async function checkDecisionMade(lastUserAction, theme, turnCount) {
  if (turnCount < 3) return { status: "DEBATING" };

  const lowerInput = safeText(lastUserAction).toLowerCase();
  const keywords = [
    "niveau suivant", "valid", "confirm", "choix fait", "decide", "decidee", "final",
    "passons", "oui", "ok", "daccord", "go", "je choisis", "cest bon", "allez",
    "refuse", "accepte", "accepter", "refuser", "je tranche", "ma decision",
  ];
  const hasKeyword = keywords.some((k) => lowerInput.includes(k));

  if (isTutorialActive()) {
    if (hasKeyword || turnCount >= state.sceneProgress.forceDecisionTurns - 1) {
      return { status: "TUTORIAL_BLOCK", reply: "Tutoriel actif: valide ton vote uniquement a l'autel." };
    }
    return { status: "DEBATING" };
  }

  if (!allDebateNpcsTalked() && (hasKeyword || turnCount >= state.sceneProgress.forceDecisionTurns)) {
    const missing = listUntalkedDebateNpcNames().join(", ");
    return { status: "TALK_REQUIRED", reply: "Tu dois encore consulter: " + missing + "." };
  }

  if (sceneNeedsTerminalPuzzle() && !state.sceneProgress.terminalPuzzleSolved && (hasKeyword || turnCount >= state.sceneProgress.forceDecisionTurns)) {
    return { status: "TASK_REQUIRED", reply: "Level 0: termine d'abord le puzzle du terminal." };
  }

  if (hasKeyword && !hasMinimalJustification(lastUserAction)) {
    return { status: "NEED_JUSTIFICATION", reply: "Explique ton choix en une phrase complete (au moins 5 mots)." };
  }

  const scene = state.levelData || {};
  const exits = Array.isArray(scene.exits) ? scene.exits : [];
  const inferredExitId = chooseExitHeuristically(lastUserAction);

  const transcript = state.globalHistory
    .filter((h) => h.sceneId === state.currentSceneId)
    .map((h) => `${h.role}: ${h.content}`)
    .join("\n");

  if (!exits.length) {
    if (hasKeyword || turnCount >= state.sceneProgress.forceDecisionTurns) {
      return hasMinimalJustification(lastUserAction)
        ? { status: "DECIDED", exitId: null }
        : { status: "NEED_JUSTIFICATION", reply: "Ajoute une justification plus precise avant de valider." };
    }
    return { status: "DEBATING" };
  }

  if (hasKeyword) {
    return { status: "DECIDED", exitId: inferredExitId || exits[0].id };
  }

  if (turnCount >= state.sceneProgress.forceDecisionTurns) {
    return hasMinimalJustification(lastUserAction)
      ? { status: "DECIDED", exitId: inferredExitId || exits[0].id }
      : { status: "NEED_JUSTIFICATION", reply: "Avant de trancher, formule une justification complete." };
  }

  try {
    const exitPrompt = "POSSIBLE EXITS:\n" + exits.map((e) => `- ID: "${e.id}" -> ${e.description}`).join("\n");
    const res = await callAIInternal([
      "ANALYZE PLAYER INPUT.",
      "Theme: \"" + safeText(theme) + "\"",
      "PLAYER INPUT: \"" + safeText(lastUserAction) + "\"",
      exitPrompt,
      "Reply ONLY JSON:",
      "{\"status\":\"DECIDED\",\"exitId\":\"ID\"} OR {\"status\":\"DODGE\",\"reply\":\"...\"} OR {\"status\":\"DEBATING\"}"
    ].join("\n"));
    const parsed = JSON.parse(res);
    if (parsed.status === "DECIDED") {
      const resolved = resolveExitById(parsed.exitId);
      return { status: "DECIDED", exitId: resolved?.id || inferredExitId || exits[0].id };
    }
    return parsed;
  } catch (_e) {
    return { status: "DEBATING" };
  }
}
function unlockDoor(targetSceneId) {
  state.hasVoted = true;
  state.pendingDoorTarget = targetSceneId || nextSceneFallback();
  const door = state.entities.find((e) => e.type === "door");
  if (door) door.asset = "door_open";
  updateObjectiveInfo();
  saveGame(); // Persist the unlocked state
}

async function checkAutoGreeting(personaId) {
  const session = ensureSession(personaId);
  if (session.length > 0) return;
  if (isTutorialActive()) {
    const scripted = personaId === "mentor_guide"
      ? "Etape active: reduis puis rouvre ce chat. Ensuite on passe au deplacement et aux modules."
      : "Modules concrets: le 1er debloque la minimap, les suivants donnent des charges /trancher.";
    addMessage("assistant", scripted, personaId, true);
    return;
  }
  const p = state.currentPersonas[personaId] || state.personas[personaId];
  const greetingPrompt = `
CONTEXT: The mediator just turned to you in "${safeText(state.levelData?.theme)}".
ACTION: Introduce yourself briefly and give your first stance.
FORMAT: French, short (max 40 words).
`;
  await callBot(greetingPrompt, personaId, true);
}

async function sendPlayerAction(text) {
  if (!text) text = safeText(uiChatInput.value);
  if (!text) return;
  if (!state.currentChatTarget) {
    const first = Object.keys(state.currentPersonas)[0];
    if (!first) return;
    setChatTarget(first);
  }

  uiChatInput.value = "";
  addMessage("user", text, state.currentChatTarget, true);
  const normalizedInput = normalizeText(text);
  if (normalizedInput === "aide" || normalizedInput === "/aide") {
    addMessage(
      "system",
      "[SYSTEME] Commandes: /trancher (si charge dispo), E pour interagir, '-' pour reduire le chat.",
      state.currentChatTarget,
      true,
    );
    return;
  }
  if (normalizedInput === "trancher" || normalizedInput.startsWith("trancher ") || normalizedInput === "/trancher") {
    if (tryUseFastTrackCommand(normalizedInput.replace(/^\//, ""))) return;
  }
  markTutorialEvent("chat_send");
  state.globalHistory.push({
    sceneId: state.currentSceneId,
    role: "user",
    speakerName: "Joueur",
    content: text,
  });
  state.sceneProgress.userTurns += 1;
  state.sceneProgress.lastPlayerInput = text;
  updateObjectiveInfo();

  const turnCount = state.sceneProgress.userTurns;
  const activePersonas = state.currentPersonas;

  const decisionCheck = await checkDecisionMade(text, state.levelData?.theme, turnCount);

  if (decisionCheck.status === "DECIDED") {
    if (!allDebateNpcsTalked()) {
      const missing = listUntalkedDebateNpcNames().join(", ");
      addMessage("system", "[SYSTEME] Decision bloquee: consulte encore " + missing + ".", state.currentChatTarget, true);
      return;
    }
    if (sceneNeedsTerminalPuzzle() && !state.sceneProgress.terminalPuzzleSolved) {
      addMessage("system", "[SYSTEME] Decision bloquee: puzzle terminal requis sur le level 0.", state.currentChatTarget, true);
      return;
    }
    if (!hasMinimalJustification(text)) {
      addMessage("system", "[SYSTEME] Donne une justification complete (au moins 5 mots) avant validation.", state.currentChatTarget, true);
      return;
    }

    const applied = applyDecisionAndUnlock(text, text);
    addMessage("system", "[SYSTEME] Choix enregistre: " + applied.decisionId + ". Porte deverrouillee.", state.currentChatTarget, true);
    const sceneText = safeText(state.levelData?.narrative?.context || state.levelData?.theme || "");
    const summary = await generateVoteSummary(text, text, sceneText, applied.decisionId);
    await showVoteSummaryOverlay(summary);
    return;
  }

  if (decisionCheck.status === "TALK_REQUIRED" || decisionCheck.status === "TASK_REQUIRED" || decisionCheck.status === "NEED_JUSTIFICATION") {
    if (decisionCheck.reply) addMessage("system", decisionCheck.reply, state.currentChatTarget, true);
    return;
  }
  if (decisionCheck.status === "DODGE") {
    if (decisionCheck.reply) addMessage("system", decisionCheck.reply, state.currentChatTarget, true);
    const p = activePersonas[state.currentChatTarget];
    const dodgePrompt = `
CONTEXT: Player proposed a creative dodge: "${text}"
ROLE: ${p?.displayName || "Conseiller"}
React briefly to this unexpected approach, but keep focus on the dilemma.
French only. Max 40 words.
`;
    await callBot(dodgePrompt, state.currentChatTarget, false);
    return;
  }

  if (decisionCheck.status === "TUTORIAL_BLOCK") {
    if (decisionCheck.reply) addMessage("system", decisionCheck.reply, state.currentChatTarget, true);
    return;
  }

  const p = activePersonas[state.currentChatTarget];
  const debatePrompt = `
CONTEXT: Player said "${text}".
SCENE THEME: "${safeText(state.levelData?.theme)}"
CURRENT ROLE: ${p?.displayName || state.currentChatTarget}
BIO: ${safeText(p?.bio)}
OTHER ACTORS: ${Object.values(activePersonas).map((x) => x.name || x.displayName).join(", ")}
TURN: ${turnCount}

INSTRUCTIONS:
- Stay fully in character.
- If player digresses, refocus once, then provide a concrete argument.
- Add one NEW ethical angle (never repeat your previous framing).
- Prefer assertions over questions. At most one question every 3 turns.
- End with one actionable recommendation.
- French language.
FORMAT: Single compact block, max 60 words.
`;
  await callBot(debatePrompt, state.currentChatTarget, false);
  maybeUnlockDoorByProgress("PROGRESSION");
  updateObjectiveInfo();
}

function openVotingTerminal(scene) {
  if (!tutorialCanUseAltar()) {
    startDialog("TUTORIEL", TUTORIAL_STEPS[state.tutorial.step] || "Termine le tutoriel.");
    return;
  }

  if (state.hasVoted) {
    startDialog("SYSTEM", "Vote deja enregistre.");
    return;
  }

  if (!isTutorialActive()) {
    const missing = listUntalkedDebateNpcNames();
    if (missing.length > 0) {
      startDialog("LE GARDIEN", "Verdict impossible. Tu dois encore consulter: " + missing.join(", "));
      return;
    }
  }

  if (sceneNeedsTerminalPuzzle() && !state.sceneProgress.terminalPuzzleSolved) {
    startDialog("LE GARDIEN", "Level 0: termine d'abord le puzzle du terminal.");
    return;
  }

  const existing = document.getElementById("voting-terminal-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "voting-terminal-overlay";
  overlay.style.cssText = "position:absolute; inset:0; background:rgba(5,10,16,0.94); z-index:9000; display:flex; align-items:center; justify-content:center; padding:18px; box-sizing:border-box;";

  const ctxNarrative = safeText(scene?.narrative?.context || scene?.theme || "Aucun dilemme actif.");
  overlay.innerHTML = '<div style="width:min(900px,96%); max-height:92%; overflow:auto; background:#101824; border:1px solid #3d5f82; border-radius:12px; padding:16px; color:#e8f4ff;">' +
      '<h2 style="margin:0 0 10px 0; color:#7fe6c0;">TERMINAL DE VOTE ETHIQUE</h2>' +
      '<p style="margin:0 0 12px 0; color:#9ec3e6;"><b>Dilemme:</b> ' + safeText(ctxNarrative) + '</p>' +
      '<label for="vt-decision" style="display:block; margin:8px 0 6px 0;">1) Ta decision finale</label>' +
      '<textarea id="vt-decision" rows="3" style="width:100%; background:#0a121d; color:#d9eeff; border:1px solid #355372; border-radius:8px; padding:8px; resize:vertical;" placeholder="Ex: Je choisis de ..."></textarea>' +
      '<label for="vt-justification" style="display:block; margin:12px 0 6px 0;">2) Pourquoi ? (au moins 5 mots)</label>' +
      '<textarea id="vt-justification" rows="4" style="width:100%; background:#0a121d; color:#d9eeff; border:1px solid #355372; border-radius:8px; padding:8px; resize:vertical;" placeholder="Explique ton raisonnement et les consequences que tu assumes."></textarea>' +
      '<div id="vt-status" style="min-height:20px; margin-top:10px; color:#ffd27d;"></div>' +
      '<div style="display:flex; justify-content:flex-end; gap:8px; margin-top:12px;">' +
        '<button id="vt-cancel" style="background:#27384b; border:1px solid #456179; color:#e8f4ff; padding:8px 12px; border-radius:8px; cursor:pointer;">Fermer</button>' +
        '<button id="vt-validate" style="background:#2f8cb8; border:1px solid #4ea8d2; color:#fff; padding:8px 12px; border-radius:8px; cursor:pointer;">Valider le vote</button>' +
      '</div>' +
    '</div>';

  const root = document.getElementById("game-container") || document.body;
  root.appendChild(overlay);
  state.isLocked = true;

  const decisionEl = document.getElementById("vt-decision");
  const justifEl = document.getElementById("vt-justification");
  const statusEl = document.getElementById("vt-status");
  const cancelEl = document.getElementById("vt-cancel");
  const validateEl = document.getElementById("vt-validate");

  const closeOverlay = () => {
    overlay.remove();
    state.isLocked = false;
  };

  if (cancelEl) cancelEl.addEventListener("click", closeOverlay);
  if (decisionEl) setTimeout(() => decisionEl.focus(), 60);

  if (validateEl) {
    validateEl.addEventListener("click", async () => {
      const decision = safeText(decisionEl?.value);
      const justification = safeText(justifEl?.value);
      if (!decision) {
        if (statusEl) statusEl.textContent = "Ecris d'abord ta decision.";
        return;
      }
      if (!hasMinimalJustification(justification)) {
        if (statusEl) statusEl.textContent = "Justification trop courte: ecris au moins 5 mots.";
        return;
      }

      validateEl.disabled = true;
      if (statusEl) statusEl.textContent = "Analyse en cours...";

      let accepted = true;
      let reason = "";
      try {
        const prompt = [
          "Tu es le Gardien d'un vote ethique scolaire.",
          "Contexte: " + ctxNarrative,
          "Decision: " + decision,
          "Justification: " + justification,
          "Accepte si la justification repond au dilemme, meme si elle est imparfaite.",
          "Refuse seulement si hors-sujet total.",
          "Reponds uniquement: VALIDE ou REFUSE: raison courte.",
        ].join("\n");
        const reply = safeText(await callAIInternal(prompt)).toUpperCase();
        accepted = reply.includes("VALIDE") || reply.includes("ACCEPTE");
        reason = reply;
      } catch (_e) {
        accepted = hasMinimalJustification(justification);
      }

      if (!accepted) {
        if (statusEl) statusEl.textContent = "Vote refuse: " + safeText(reason).replace(/^REFUSE:?\s*/i, "");
        validateEl.disabled = false;
        return;
      }

      markTutorialEvent("altar_vote");
      const applied = applyDecisionAndUnlock(decision, justification);
      addMessage("system", "[SYSTEME] Choix enregistre: " + applied.decisionId + ". Porte deverrouillee.", state.currentChatTarget, true);

      const summary = await generateVoteSummary(decision, justification, ctxNarrative, applied.decisionId);
      closeOverlay();
      await showVoteSummaryOverlay(summary);
    });
  }
}

function setupInput() {
  window.addEventListener("keydown", (ev) => {
    if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) return;
    if (document.activeElement === uiChatInput) return;
    state.input.keys[ev.key] = true;
    state.input.keys[ev.code] = true;
    if (ev.code === "Space" || ev.code === "KeyE") ev.preventDefault();
  });
  window.addEventListener("keyup", (ev) => {
    if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) return;
    if (document.activeElement === uiChatInput) return;
    state.input.keys[ev.key] = false;
    state.input.keys[ev.code] = false;
  });
}

function updateEntities() {
  if (state.isChatting || state.isLocked) return;

  const now = Date.now();
  state.entities.forEach((e) => {
    if (e.type !== "npc" || e.removed) return;

    // Initialize AI state if missing
    if (!e.ai) e.ai = { nextMove: now + Math.random() * 2000 + 500, state: "idle" };
    if (e.pixelX === undefined) e.pixelX = e.x * TILE_SIZE;
    if (e.pixelY === undefined) e.pixelY = e.y * TILE_SIZE;

    // Smooth movement logic (like player)
    const tx = e.x * TILE_SIZE;
    const ty = e.y * TILE_SIZE;
    const speed = 2; // NPC walking speed

    if (e.pixelX !== tx || e.pixelY !== ty) {
      if (e.pixelX < tx) e.pixelX = Math.min(e.pixelX + speed, tx);
      if (e.pixelX > tx) e.pixelX = Math.max(e.pixelX - speed, tx);
      if (e.pixelY < ty) e.pixelY = Math.min(e.pixelY + speed, ty);
      if (e.pixelY > ty) e.pixelY = Math.max(e.pixelY - speed, ty);
      return; // Don't pick new move while moving
    }

    if (now > e.ai.nextMove) {
      // 30% chance to move, 70% to stay idle longer
      if (Math.random() < 0.3) {
        const dirs = [
          { dx: 0, dy: -1, dir: "up" },
          { dx: 0, dy: 1, dir: "down" },
          { dx: -1, dy: 0, dir: "left" },
          { dx: 1, dy: 0, dir: "right" }
        ];
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const nx = e.x + dir.dx;
        const ny = e.y + dir.dy;

        // Check bounds, walls, and other entities
        if (worldInBounds(nx, ny) && isTileWalkable(nx, ny) && !isBlockingEntityAt(nx, ny)) {
          // Check zone boundary if assigned
          let inZone = true;
          if (e.allowedRect) {
            const z = e.allowedRect;
            const x0 = Math.floor(z[0] * state.world.w);
            const y0 = Math.floor(z[1] * state.world.h);
            const x1 = Math.floor(z[2] * state.world.w);
            const y1 = Math.floor(z[3] * state.world.h);
            if (nx < x0 || nx > x1 || ny < y0 || ny > y1) inZone = false;
          }

          if (inZone && (nx !== state.player.x || ny !== state.player.y)) {
            e.x = nx;
            e.y = ny;
            e.dir = dir.dir;
          }
        }
      }
      e.ai.nextMove = now + Math.random() * 4000 + 2000;
    }
  });
}

function tryInteract() {
  const target = getAdjacentInteractable();
  if (target?.interact) target.interact();
}

function update() {
  updateEntities();
  if (state.isLocked && !minigameState.active) {
    if (state.input.keys[" "]) {
      state.input.keys[" "] = false;
      closeDialog();
    }
    return;
  }

  if (minigameState.active) {
    minigameState.frameCount += 1;

    // Intro phase: pause action briefly so the player can read context + controls.
    if (minigameState.phase === "intro") {
      if (minigameState.allowSkipIntro && (state.input.keys[" "] || state.input.keys.Space)) {
        state.input.keys[" "] = false;
        state.input.keys.Space = false;
        minigameState.introFrames = 0;
      }
      minigameState.introFrames = Math.max(0, minigameState.introFrames - 1);
      if (minigameState.introFrames <= 0) {
        minigameState.phase = "play";
      }
      return;
    }

    const game = MINIGAMES[minigameState.type];
    let won = false;
    try {
      won = game.update(minigameState, state.input.keys);
    } catch (_e) {
      failMiniGame("exception");
      return;
    }

    if (won) {
      if (minigameState.onComplete) minigameState.onComplete();
      return;
    }

    const lost = minigameLoseCondition();
    const timedOut = minigameState.maxFrames > 0 && minigameState.frameCount >= minigameState.maxFrames;
    if (lost || timedOut) {
      failMiniGame(lost ? "defeat" : "timeout");
    }
    return;
  }

  if (state.isChatting) return;

  const p = state.player;
  const targetX = p.x * TILE_SIZE;
  const targetY = p.y * TILE_SIZE;

  if (p.pixelX !== targetX || p.pixelY !== targetY) {
    p.isMoving = true;
    if (p.pixelX < targetX) p.pixelX = Math.min(p.pixelX + MOVE_SPEED, targetX);
    if (p.pixelX > targetX) p.pixelX = Math.max(p.pixelX - MOVE_SPEED, targetX);
    if (p.pixelY < targetY) p.pixelY = Math.min(p.pixelY + MOVE_SPEED, targetY);
    if (p.pixelY > targetY) p.pixelY = Math.max(p.pixelY - MOVE_SPEED, targetY);
  } else {
    p.isMoving = false;
    let dx = 0;
    let dy = 0;
    if (state.input.keys.ArrowUp || state.input.keys.w) dy -= 1;
    if (state.input.keys.ArrowDown || state.input.keys.s) dy += 1;
    if (state.input.keys.ArrowLeft || state.input.keys.a) dx -= 1;
    if (state.input.keys.ArrowRight || state.input.keys.d) dx += 1;

    if (dx !== 0 || dy !== 0) {
      if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) p.dir = dx < 0 ? "left" : "right";
      else if (dy !== 0) p.dir = dy < 0 ? "up" : "down";
    }

    if (dx !== 0 || dy !== 0) {
      let moved = false;
      if (dx !== 0 && dy !== 0) {
        const nx = p.x + dx;
        const ny = p.y + dy;
        const canDiag = worldInBounds(nx, ny)
          && isTileWalkable(nx, ny)
          && isTileWalkable(p.x + dx, p.y)
          && isTileWalkable(p.x, p.y + dy);

        if (canDiag) {
          p.x = nx;
          p.y = ny;
          moved = true;
        } else if (worldInBounds(p.x + dx, p.y) && isTileWalkable(p.x + dx, p.y)) {
          p.x += dx;
          moved = true;
        } else if (worldInBounds(p.x, p.y + dy) && isTileWalkable(p.x, p.y + dy)) {
          p.y += dy;
          moved = true;
        }
      } else {
        const nx = p.x + dx;
        const ny = p.y + dy;
        if (worldInBounds(nx, ny) && isTileWalkable(nx, ny)) {
          p.x = nx;
          p.y = ny;
          moved = true;
        }
      }

      if (moved) {
        markTutorialEvent("move_tile");
      }
    }
  }

  if ((state.input.keys.KeyE || state.input.keys.e || state.input.keys.E) && !p.isMoving) {
    state.input.keys.KeyE = false;
    state.input.keys.e = false;
    state.input.keys.E = false;
    playSound("click");
    tryInteract();
  }
}

function npcSheetIndex(entity) {
  const persona = state.currentPersonas[entity.personaId] || {};
  const archetype = safeText(persona.archetype).toUpperCase();
  const merged = normalizeText(`${persona.id || ""} ${persona.name || ""} ${persona.displayName || ""} ${persona.role || ""}`);

  let npcId = "";
  if (archetype === "A-1") npcId = "architecte";
  else if (archetype === "B-2") npcId = "poete";
  else if (archetype === "C-3") npcId = "sceptique";
  else if (merged.includes("architecte") || merged.includes("strateg")) npcId = "architecte";
  else if (merged.includes("poete") || merged.includes("idealiste")) npcId = "poete";
  else if (merged.includes("sceptique") || merged.includes("skeptic")) npcId = "sceptique";
  else npcId = "architecte";

  const npcList = Array.isArray(state.assets.npcManifest?.npcs) ? state.assets.npcManifest.npcs : [];
  if (npcList.length) {
    const idx = npcList.findIndex((n) => normalizeText(n.id) === normalizeText(npcId));
    if (idx >= 0) return idx;
  }
  if (npcId === "poete") return 1;
  if (npcId === "sceptique") return 2;
  return 0;
}

function drawNpcEntity(entity, camX, camY) {
  const bob = Math.sin(Date.now() * 0.005) * 2;
  const dx = (entity.pixelX ?? entity.x * TILE_SIZE) - camX;
  const dy = (entity.pixelY ?? entity.y * TILE_SIZE) - camY + bob;

  if (entity.isAmbient) {
    if (!state.assets.npc_ambient) {
      state.assets.npc_ambient = generateSprite("npc", { "1": "#37474f", "2": "#607d8b", "3": "#b0bec5", "4": "#1f2a30" });
    }
    const ambient = state.assets.npc_ambient;
    if (ambient) {
      ctx.save();
      ctx.globalAlpha = 0.72;
      ctx.drawImage(ambient, dx + 3, dy + 3, TILE_SIZE - 6, TILE_SIZE - 6);
      ctx.restore();
      return;
    }
  }

  if (!state.assets.useExternal || !state.assets.npc_sheet) {
    const fallback = state.assets[entity.asset];
    if (fallback) ctx.drawImage(fallback, dx, dy, TILE_SIZE, TILE_SIZE);
    return;
  }

  const idx = npcSheetIndex(entity);
  const sx = idx * 3 * SHEET_TILE;
  const sy = 0;
  ctx.drawImage(
    state.assets.npc_sheet,
    sx,
    sy,
    SHEET_TILE,
    SHEET_TILE,
    dx,
    dy,
    TILE_SIZE,
    TILE_SIZE,
  );
}

function drawClassEquipmentOverlay(drawX, drawY, bob = 0) {
  const classId = state.rpg?.classId || "warrior";
  const x = drawX;
  const y = drawY + bob;

  ctx.save();
  if (classId === "warrior") {
    ctx.fillStyle = "#d9e0e6";
    ctx.fillRect(x + 30, y + 1, 3, 7);
    ctx.fillStyle = "#617585";
    ctx.fillRect(x + 6, y + 12, 6, 8);
  } else if (classId === "mage") {
    ctx.strokeStyle = "#9fd6ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 29, y + 8);
    ctx.lineTo(x + 33, y + 22);
    ctx.stroke();
    ctx.fillStyle = "rgba(173, 232, 244, 0.9)";
    ctx.beginPath();
    ctx.arc(x + 28, y + 7, 3, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = "#f6d365";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 7, y + 11);
    ctx.quadraticCurveTo(x + 11, y + 2, x + 16, y + 11);
    ctx.stroke();
    ctx.fillStyle = "#d2a54c";
    ctx.fillRect(x + 24, y + 15, 3, 7);
  }
  ctx.restore();
}

function drawPlayer(camX, camY) {
  const p = state.player;
  const drawX = p.pixelX - camX;
  const drawY = p.pixelY - camY;
  const bob = p.isMoving ? Math.sin(Date.now() / 50) * 2 : 0;

  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.beginPath();
  ctx.ellipse(drawX + 20, drawY + 35, 12, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  if (state.assets.useExternal && state.assets.player_sheet) {
    const row = p.dir === "left" ? 1 : p.dir === "right" ? 2 : p.dir === "up" ? 3 : 0;
    const frame = p.isMoving ? Math.floor(Date.now() / 160) % 3 : 0;
    const preset = state.assets.playerPresetIndex || 0;
    const sx = (preset * 3 + frame) * SHEET_TILE;
    const sy = row * SHEET_TILE;
    ctx.drawImage(
      state.assets.player_sheet,
      sx,
      sy,
      SHEET_TILE,
      SHEET_TILE,
      drawX,
      drawY + bob,
      TILE_SIZE,
      TILE_SIZE,
    );
  } else {
    const pAsset = state.assets[`player_${p.dir}`] || state.assets.player_down;
    if (pAsset) ctx.drawImage(pAsset, drawX, drawY + bob, TILE_SIZE, TILE_SIZE);
  }

  drawClassEquipmentOverlay(drawX, drawY, bob);
}

function drawMinimap() {
  if (!state.meta.modules.minimap) return;
  const mapW = 170;
  const mapH = 116;
  const ox = 12;
  const oy = canvas.height - mapH - 12;
  const sx = mapW / state.world.w;
  const sy = mapH / state.world.h;

  ctx.fillStyle = "rgba(4,10,16,0.86)";
  ctx.fillRect(ox, oy, mapW, mapH);
  ctx.strokeStyle = "#467099";
  ctx.lineWidth = 1;
  ctx.strokeRect(ox + 0.5, oy + 0.5, mapW - 1, mapH - 1);

  for (let y = 0; y < state.world.h; y += 1) {
    for (let x = 0; x < state.world.w; x += 1) {
      if (state.world.tiles[y]?.[x] === 1) {
        ctx.fillStyle = "rgba(94,130,160,0.55)";
        ctx.fillRect(ox + x * sx, oy + y * sy, Math.max(1, sx), Math.max(1, sy));
      }
    }
  }

  const visibleStartX = state.camera.x / TILE_SIZE;
  const visibleStartY = state.camera.y / TILE_SIZE;
  const visibleW = canvas.width / TILE_SIZE;
  const visibleH = canvas.height / TILE_SIZE;
  ctx.strokeStyle = "rgba(154,230,255,0.9)";
  ctx.strokeRect(
    ox + visibleStartX * sx,
    oy + visibleStartY * sy,
    visibleW * sx,
    visibleH * sy,
  );

  state.entities.filter((e) => !e.removed).forEach((e) => {
    if (e.type === "door") ctx.fillStyle = "#ffc857";
    else if (e.type === "npc") ctx.fillStyle = "#67e8f9";
    else if (e.type === "altar") ctx.fillStyle = "#d6a8ff";
    else if (e.type === "insight") ctx.fillStyle = "#86efac";
    else return;
    ctx.fillRect(ox + e.x * sx, oy + e.y * sy, Math.max(2, sx + 0.3), Math.max(2, sy + 0.3));
  });

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(ox + state.player.x * sx, oy + state.player.y * sy, Math.max(2, sx + 0.5), Math.max(2, sy + 0.5));
  ctx.fillStyle = "#9ec8eb";
  ctx.font = "11px Segoe UI";
  ctx.fillText("MINIMAP", ox + 6, oy + 12);
}

function drawPublicDeco(ctx, theme, decoSpec, dx, dy) {
  const assets = state.assets.publicDecorations;
  if (!assets) return;

  const deco = (decoSpec && typeof decoSpec === "object") ? decoSpec : {
    seed: Number.isFinite(decoSpec) ? decoSpec : Math.random(),
    variant: "detail",
    intent: "ground",
  };

  const seed = Number.isFinite(deco.seed) ? deco.seed : Math.random();
  const variant = normalizeText(safeText(deco.variant) || "detail");
  const intent = normalizeText(safeText(deco.intent) || "ground");
  const t = TILE_SIZE;

  const hybrid = state.assets.hybrid || { spaceBuildings: [], mixedProps: [] };
  const drawHybridImage = (img) => {
    if (!img) return false;
    const ratio = Math.min(t / img.width, t / img.height);
    const renderW = Math.max(14, Math.floor(img.width * ratio));
    const renderH = Math.max(14, Math.floor(img.height * ratio));
    const offsetX = dx + Math.floor((t - renderW) / 2);
    const offsetY = dy + Math.floor((t - renderH) / 2);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    return true;
  };

  if ((theme === "espace" || intent.includes("airlock") || intent.includes("satellite")) && hybrid.spaceBuildings.length && seed > 0.44) {
    const idx = Math.floor(seed * hybrid.spaceBuildings.length) % hybrid.spaceBuildings.length;
    if (drawHybridImage(hybrid.spaceBuildings[idx])) return;
  }

  if ((intent.includes("vehicle") || intent.includes("container") || (theme === "urbain" && intent.includes("street"))) && hybrid.mixedProps.length && seed < 0.34) {
    const idx = Math.floor(seed * 997) % hybrid.mixedProps.length;
    if (drawHybridImage(hybrid.mixedProps[idx])) return;
  }

  const selectPool = (sheet, pools, fallbackKey = "detail") => {
    if (!sheet) return null;
    let pool = pools[variant] || pools[intent] || pools[fallbackKey] || pools.detail;
    if (!pool || !pool.length) return null;
    return { sheet, pick: pool[Math.floor(seed * pool.length) % pool.length] };
  };

  const naturePools = {
    detail: [[16, 160, 16, 16], [80, 80, 16, 16], [80, 48, 16, 16], [112, 16, 16, 16], [128, 16, 16, 16], [160, 16, 16, 16]],
    flora: [[112, 48, 16, 32], [160, 48, 16, 32], [144, 48, 16, 32], [96, 48, 16, 32]],
    tree: [[112, 48, 16, 32], [160, 48, 16, 32], [144, 48, 16, 32]],
    bush: [[16, 160, 16, 16], [80, 80, 16, 16], [80, 48, 16, 16]],
    ground: [[112, 16, 16, 16], [128, 16, 16, 16], [160, 16, 16, 16]],
    liquid: [[32, 176, 16, 16], [48, 176, 16, 16], [64, 176, 16, 16]],
  };

  const labPools = {
    detail: [[112, 64, 16, 16], [128, 48, 16, 16], [144, 176, 16, 16], [160, 176, 16, 16]],
    console: [[128, 160, 16, 32], [160, 160, 16, 32], [96, 160, 16, 32]],
    terminal: [[128, 160, 16, 32], [96, 160, 16, 32]],
    canister: [[144, 176, 16, 16], [160, 176, 16, 16]],
    metal: [[112, 64, 16, 16], [128, 48, 16, 16]],
    cable: [[80, 176, 16, 16], [96, 176, 16, 16]],
    liquid: [[32, 176, 16, 16], [48, 176, 16, 16]],
  };

  const bureaucracyPools = {
    detail: [[16, 32, 16, 32], [80, 32, 32, 32], [64, 64, 32, 32], [112, 144, 32, 32]],
    banner: [[64, 112, 32, 48], [96, 112, 32, 48]],
    desk: [[80, 32, 32, 32], [64, 64, 32, 32]],
    street: [[112, 144, 32, 32], [144, 144, 32, 32]],
    crate: [[96, 96, 32, 32], [128, 96, 32, 32]],
    ground: [[112, 144, 32, 32], [144, 144, 32, 32]],
  };

  let selected = null;
  if (theme === "nature") {
    selected = selectPool(assets.natureSheet, naturePools);
  } else if (theme === "laboratoire") {
    selected = selectPool(assets.waterSheet || assets.natureSheet, labPools);
  } else if (theme === "bureaucratie") {
    selected = selectPool(assets.bureaucracySheet, bureaucracyPools);
  } else if (theme === "espace") {
    selected = selectPool(assets.natureSheet, {
      ...naturePools,
      detail: [[160, 16, 16, 16], [128, 16, 16, 16], [80, 96, 16, 16], [112, 16, 16, 16]],
      panel: [[112, 16, 16, 16], [128, 16, 16, 16]],
      antenna: [[112, 48, 16, 32], [144, 48, 16, 32]],
      metal: [[160, 16, 16, 16], [80, 96, 16, 16]],
    });
  } else {
    selected = selectPool(assets.natureSheet, {
      ...naturePools,
      vehicle: [[80, 96, 16, 16], [128, 16, 16, 16]],
      crate: [[80, 80, 16, 16], [16, 160, 16, 16]],
      metal: [[160, 16, 16, 16], [112, 16, 16, 16]],
    });
  }

  if (!selected) return;
  const [sx, sy, sw, sh] = selected.pick;

  let renderW = sw;
  let renderH = sh;
  if (renderW > t || renderH > t) {
    const ratio = Math.min(t / renderW, t / renderH);
    renderW = Math.floor(renderW * ratio);
    renderH = Math.floor(renderH * ratio);
  } else {
    renderW = Math.min(sw * 2, t);
    renderH = Math.min(sh * 2, t);
  }

  const offsetX = dx + Math.floor((t - renderW) / 2);
  const offsetY = dy + Math.floor((t - renderH) / 2);
  ctx.drawImage(selected.sheet, sx, sy, sw, sh, offsetX, offsetY, renderW, renderH);
}

function draw() {
  updateCamera();
  const camX = state.camera.x;
  const camY = state.camera.y;

  ctx.fillStyle = "#020205";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  state.stars.forEach((s) => {
    const sx = ((s.x - (camX * 0.08)) % canvas.width + canvas.width) % canvas.width;
    const sy = ((s.y - (camY * 0.08)) % canvas.height + canvas.height) % canvas.height;
    ctx.fillRect(sx, sy, 1, 1);
    s.y = (s.y + s.speed) % canvas.height;
  });

  const startX = Math.max(0, Math.floor(camX / TILE_SIZE));
  const startY = Math.max(0, Math.floor(camY / TILE_SIZE));
  const endX = Math.min(state.world.w - 1, startX + VIEW_W + 1);
  const endY = Math.min(state.world.h - 1, startY + VIEW_H + 1);

  for (let y = startY; y <= endY; y += 1) {
    for (let x = startX; x <= endX; x += 1) {
      const dx = x * TILE_SIZE - camX;
      const dy = y * TILE_SIZE - camY;
      const isWall = state.world.tiles[y]?.[x] === 1;
      const cellTheme = state.world.themes?.[y]?.[x] || state.currentTheme;
      const themeSet = state.assets.themeTiles?.[cellTheme] || state.assets.themeTiles?.[state.currentTheme] || state.assets;
      const decoKey = state.world.deco[y]?.[x];

      if (decoKey?.type === "random") {
        if (themeSet.floor) ctx.drawImage(themeSet.floor, dx, dy, TILE_SIZE, TILE_SIZE);
        drawPublicDeco(ctx, cellTheme, decoKey, dx, dy);
      } else if (decoKey && themeSet[decoKey]) {
        // Draw floor underneath decor
        if (themeSet.floor) ctx.drawImage(themeSet.floor, dx, dy, TILE_SIZE, TILE_SIZE);
        // Draw decor
        ctx.drawImage(themeSet[decoKey], dx, dy, TILE_SIZE, TILE_SIZE);
      } else {
        const baseTile = isWall ? themeSet.wall : themeSet.floor;
        if (baseTile) ctx.drawImage(baseTile, dx, dy, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  const drawables = state.entities
    .filter((e) => !e.removed)
    .sort((a, b) => a.y - b.y);

  drawables.forEach((e) => {
    const ex = e.x * TILE_SIZE - camX;
    const ey = e.y * TILE_SIZE - camY;
    if (ex < -TILE_SIZE || ey < -TILE_SIZE || ex > canvas.width || ey > canvas.height) return;

    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.beginPath();
    ctx.ellipse(ex + 20, ey + 35, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    if (e.type === "npc") {
      drawNpcEntity(e, camX, camY);
      if (!e.isAmbient) {
        ctx.fillStyle = "#7fe6c0";
        ctx.beginPath();
        ctx.moveTo(ex + 20, ey - 6);
        ctx.lineTo(ex + 26, ey + 2);
        ctx.lineTo(ex + 14, ey + 2);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = "rgba(173, 188, 201, 0.65)";
        ctx.fillRect(ex + 17, ey - 2, 6, 3);
      }
    } else {
      const asset = state.assets[e.asset];
      if (asset) {
        if (e.type === "terminal" || e.type === "altar" || e.type === "insight") {
          // Inner glow for interactables
          ctx.shadowBlur = 10;
          ctx.shadowColor = e.type === "terminal" ? "#00ffff" : e.type === "altar" ? "#ff00ff" : "#ffff00";
        }
        ctx.drawImage(asset, ex, ey, TILE_SIZE, TILE_SIZE);
        ctx.shadowBlur = 0; // Reset
      }
    }
  });

  drawPlayer(camX, camY);

  if (state.currentTheme === "nature") {
    ctx.fillStyle = "rgba(20,60,20,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (state.currentTheme === "urbain") {
    ctx.fillStyle = "rgba(8,22,45,0.10)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (state.currentTheme === "laboratoire") {
    ctx.fillStyle = "rgba(28,40,48,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (state.currentTheme === "espace") {
    ctx.fillStyle = "rgba(40,20,16,0.10)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (state.currentTheme === "bureaucratie") {
    ctx.fillStyle = "rgba(48,38,14,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawMinimap();

  const target = getAdjacentInteractable();
  if (target && !state.isLocked && !state.isChatting && !minigameState.active) {
    uiPrompt.textContent = interactionLabel(target);
    uiPrompt.classList.remove("hidden");
    // Position bubble directly over the entity
    const px = Math.floor((target.pixelX !== undefined ? target.pixelX : (target.x * TILE_SIZE)) - camX + (TILE_SIZE / 2));
    const py = Math.floor((target.pixelY !== undefined ? target.pixelY : (target.y * TILE_SIZE)) - camY - 20); // 20px above object

    // Convert to canvas screen proportion (0 to 1) 
    const propX = px / canvas.width;
    const propY = py / canvas.height;

    uiPrompt.style.left = `${propX * 100}%`;
    uiPrompt.style.top = `${propY * 100}%`;
  } else {
    uiPrompt.classList.add("hidden");
  }

  // Draw dynamic Minigames
  if (minigameState.active) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const game = MINIGAMES[minigameState.type];

    // Background panel to dim everything
    ctx.fillStyle = "rgba(0,0,0,0.86)";
    ctx.fillRect(cx - 230, cy - 130, 460, 260);

    ctx.textAlign = "center";

    if (minigameState.phase === "intro") {
      const countdown = Math.max(1, Math.ceil(minigameState.introFrames / 60));
      ctx.strokeStyle = "rgba(126, 213, 255, 0.6)";
      ctx.strokeRect(cx - 220.5, cy - 120.5, 441, 241);

      ctx.fillStyle = "#9ad8ff";
      ctx.font = "bold 15px Segoe UI";
      ctx.fillText("PREPARATION", cx, cy - 86);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px Segoe UI";
      ctx.fillText(minigameState.contextTitle || game.name, cx, cy - 58);

      ctx.fillStyle = "#c9def0";
      ctx.font = "14px Segoe UI";
      ctx.fillText(game.desc, cx, cy - 28);
      ctx.fillText(minigameState.contextHint || "Observe les consignes puis lance l'epreuve.", cx, cy - 6);
      if (minigameState.resumeLabel) {
        ctx.fillStyle = "#8db6d6";
        ctx.fillText(minigameState.resumeLabel, cx, cy + 18);
      }

      ctx.fillStyle = "#7fe6c0";
      ctx.font = "bold 26px Segoe UI";
      ctx.fillText(String(countdown), cx, cy + 56);

      ctx.fillStyle = "#d7f5ff";
      ctx.font = "13px Segoe UI";
      ctx.fillText("Attends un instant pour lire ou appuie sur [ESPACE] pour commencer", cx, cy + 88);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Segoe UI";
      ctx.fillText(game.name, cx, cy - 82);

      ctx.fillStyle = "#ccc";
      ctx.font = "14px Segoe UI";
      ctx.fillText(game.desc, cx, cy - 58);

      // Draw the individual minigame content
      game.draw(ctx, minigameState, cx, cy);
    }

    ctx.textAlign = "left"; // Reset default
  }
}

function initAudioUI() {
  const btnPrev = document.getElementById("btn-audio-prev");
  const btnPlay = document.getElementById("btn-audio-play");
  const btnNext = document.getElementById("btn-audio-next");
  const btnMute = document.getElementById("btn-audio-mute");
  const volRange = document.getElementById("audio-volume");

  if (!btnPlay) return;

  state.audio.trackIndex = MUSIC_TRACKS.findIndex((t) => normalizeText(t).includes("menu"));
  if (state.audio.trackIndex === -1) state.audio.trackIndex = 0;

  if (btnPrev) btnPrev.textContent = "PREV";
  if (btnNext) btnNext.textContent = "NEXT";

  const updatePlayBtn = () => {
    if (btnPlay) btnPlay.textContent = (state.audio.music && !state.audio.music.paused) ? "PAUSE" : "PLAY";
  };

  const playMusic = () => {
    if (state.audio.muted) return;
    if (state.audio.music) {
      state.audio.music.pause();
    }
    const track = MUSIC_TRACKS[state.audio.trackIndex];
    state.audio.music = new Audio(MUSIC_DIR + track);
    state.audio.music.loop = true;
    state.audio.music.volume = volRange ? parseFloat(volRange.value) : 0.5;
    state.audio.currentTrack = track;
    state.audio.music.play().then(updatePlayBtn).catch(e => console.warn("[AUDIO] Auto-play prevented", e));
  };

  if (btnMute) btnMute.textContent = state.audio.muted ? "UNMUTE" : "MUTE";
  updatePlayBtn();

  btnPlay.addEventListener("click", () => {
    if (!state.audio.music) { playMusic(); return; }
    if (state.audio.music.paused) state.audio.music.play().then(updatePlayBtn);
    else { state.audio.music.pause(); updatePlayBtn(); }
  });

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      state.audio.trackIndex = (state.audio.trackIndex + 1) % MUSIC_TRACKS.length;
      playMusic();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      state.audio.trackIndex = (state.audio.trackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
      playMusic();
    });
  }

  if (btnMute) {
    btnMute.addEventListener("click", () => {
      state.audio.muted = !state.audio.muted;
      btnMute.textContent = state.audio.muted ? "UNMUTE" : "MUTE";
      if (state.audio.muted && state.audio.music) {
        state.audio.music.pause();
        updatePlayBtn();
      } else if (!state.audio.muted && state.audio.music) {
        state.audio.music.play().then(updatePlayBtn);
      }
    });
  }

  if (volRange) {
    volRange.addEventListener("input", (e) => {
      if (state.audio.music) state.audio.music.volume = parseFloat(e.target.value);
    });
  }

  const startAudioOnInteract = () => {
    if (!state.audio.music && !state.audio.muted) playMusic();
    document.removeEventListener("click", startAudioOnInteract);
    document.removeEventListener("keydown", startAudioOnInteract);
  };
  document.addEventListener("click", startAudioOnInteract);
  document.addEventListener("keydown", startAudioOnInteract);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

async function init() {
  ensureChatUI();
  ensureObjectiveUI();
  ensureTutorialUI();
  setupInput();
  initAudioUI();
  if (typeof collapseChatPanel === 'function') collapseChatPanel();

  // Load Language
  state.language = localStorage.getItem("rpg_lang") || "fr";
  const langSel = document.getElementById("language-select");
  if (langSel) langSel.value = state.language;
  // Apply language
  if (typeof window.changeLanguage === 'function') window.changeLanguage(state.language);

  await createAssets();

  if (state.assets.useExternal) {
    console.log("DEBUG: Before showPlayerSelection");
    await showPlayerSelection();
    console.log("DEBUG: After showPlayerSelection");
  }

  for (let i = 0; i < 60; i += 1) {
    state.stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 0.5 + 0.1,
    });
  }

  try {
    const [scenario, personas] = await Promise.all([
      loadJson("./data/scenario.json"),
      loadJson("./data/personas.json"),
    ]);
    state.scenario = scenario;
    state.personas = mapPersonas(personas);
    Object.keys(state.personas).forEach((id) => ensureSession(id));

    const savedScene = loadSavedGame();
    const params = new URLSearchParams(window.location.search);
    const forcedSceneRaw = safeText(params.get("scene"));
    const forcedScene = forcedSceneRaw ? resolveSceneId(forcedSceneRaw) : null;
    const resumedScene = savedScene ? resolveSceneId(savedScene) : null;
    const bootScene = forcedScene || resumedScene || state.scenario.start || "level_1";
    await loadLevel(bootScene);
    loop();
  } catch (e) {
    console.error("Init error:", e);
    uiChatLog.innerHTML = "";
    renderChatLine("system", `Erreur de chargement: ${String(e.message || e)}`);
  }
}

window.sendPlayerAction = sendPlayerAction;
window.sendUserMessage = sendPlayerAction;
window.loadScene = loadLevel;

// --- LANGUAGE ---
window.changeLanguage = (lang) => {
  state.language = lang;
  localStorage.setItem("rpg_lang", lang);

  // Refresh UI
  if (uiLevel) uiLevel.innerHTML = `${getText("level")}: ${state.levelData?.id || 1}`;

  // Refresh Tutorial if active
  if (state.tutorial.active) {
    if (uiTutorialText) uiTutorialText.textContent = TUTORIAL_STEPS[state.tutorial.step] || "...";
  }

  // Refresh Intro if visible
  const intro = document.getElementById("intro-overlay");
  if (intro && intro.style.display !== "none") {
    intro.querySelector("h1").textContent = getText("intro_title");
    intro.querySelector("p").innerText = getText("intro_continue");
  }

  // Refresh Player Selection if visible
  const selBtn = document.getElementById("start-game-btn");
  if (selBtn) selBtn.textContent = getText("start_game");

  const selTitle = document.querySelector(".selection-modal h2");
  if (selTitle) selTitle.textContent = getText("select_mediator");
};

// Expose state for debugging
window.state = state;

init();


