
const TILE_SIZE = 48;
const DEFAULT_WORLD_TILES = { w: 92, h: 58 };
const MAX_ENEMIES = 120;

const RESOURCE_RULES = {
  runStaminaPerSecond: 24,
  basicStamina: { warrior: 10, mage: 8, hunter: 9 },
  skill1Mana: { warrior: 16, mage: 20, hunter: 15 },
  skill2Mana: { warrior: 26, mage: 34, hunter: 24 }
};

const CLASS_DEFS = {
  warrior: {
    id: "warrior",
    name: "Guerrier",
    desc: "Epee + bouclier. Solide au corps a corps.",
    icon: "../assets/rpg/class_icons/warrior.png",
    baseHp: 150,
    baseAttack: 15,
    baseDefense: 5,
    speed: 165,
    color: "#5db8ff",
    basicKind: "melee"
  },
  mage: {
    id: "mage",
    name: "Mage",
    desc: "Baton + sorts. Controle de zone.",
    icon: "../assets/rpg/class_icons/mage.png",
    baseHp: 105,
    baseAttack: 18,
    baseDefense: 2,
    speed: 160,
    color: "#b27cff",
    basicKind: "projectile"
  },
  hunter: {
    id: "hunter",
    name: "Chasseur",
    desc: "Arc + dague. Mobile et precis.",
    icon: "../assets/rpg/class_icons/hunter.png",
    baseHp: 120,
    baseAttack: 16,
    baseDefense: 3,
    speed: 172,
    color: "#7de57f",
    basicKind: "projectile"
  }
};

const HERO_PRESETS = [
  { id: "ayla", label: "Ayla", color: "#33c4ff", icon: "../assets/avatar_poete.png" },
  { id: "noah", label: "Noah", color: "#ffd166", icon: "../assets/avatar_architecte.png" },
  { id: "mina", label: "Mina", color: "#6ee7b7", icon: "../assets/avatar_sarah.png" },
  { id: "iris", label: "Iris", color: "#9ca3ff", icon: "../assets/avatar_elara.png" },
  { id: "kai", label: "Kai", color: "#f97316", icon: "../assets/avatar_julian.png" },
  { id: "nora", label: "Nora", color: "#f472b6", icon: "../assets/avatar_maya.png" }
];

const BIOME_PRESETS = {
  forest: {
    floor: "#2d4b2f",
    floorAlt: "#355b36",
    path: "#8d7f55",
    water: "#2b5c79",
    wall: "#213321"
  },
  urban: {
    floor: "#5a606c",
    floorAlt: "#656c79",
    path: "#7b8290",
    water: "#3f5676",
    wall: "#3f4351"
  },
  lab: {
    floor: "#6b7d85",
    floorAlt: "#748992",
    path: "#8b9ea6",
    water: "#41627c",
    wall: "#4a5a62"
  },
  hospital: {
    floor: "#95a6b0",
    floorAlt: "#a9b9c2",
    path: "#d9e2e7",
    water: "#6f8da0",
    wall: "#7a8d99"
  },
  space: {
    floor: "#2a2e45",
    floorAlt: "#313856",
    path: "#4a4f6a",
    water: "#253a52",
    wall: "#21233a"
  },
  coast: {
    floor: "#738b6b",
    floorAlt: "#85a076",
    path: "#e1c48c",
    water: "#2c6f99",
    wall: "#57705e"
  }
};

const ENEMY_TYPES = [
  {
    id: "raider",
    label: "Raiders",
    color: "#ef4444",
    hp: 42,
    speed: 90,
    atk: 9,
    range: 26,
    vision: 260,
    radius: 15,
    ranged: false
  },
  {
    id: "drone",
    label: "Drones",
    color: "#fb923c",
    hp: 30,
    speed: 110,
    atk: 7,
    range: 26,
    vision: 300,
    radius: 13,
    ranged: true
  },
  {
    id: "juggernaut",
    label: "Juggernauts",
    color: "#eab308",
    hp: 62,
    speed: 70,
    atk: 12,
    range: 30,
    vision: 220,
    radius: 18,
    ranged: false
  },
  {
    id: "stalker",
    label: "Stalkers",
    color: "#a855f7",
    hp: 34,
    speed: 132,
    atk: 8,
    range: 24,
    vision: 320,
    radius: 13,
    ranged: false
  }
];

const FX_PATHS = {
  slash_warrior: "../assets/rpg/fx/slash_warrior.png",
  burst_mage: "../assets/rpg/fx/burst_mage.png",
  slash_hunter: "../assets/rpg/fx/slash_hunter.png"
};

const PROP_IMAGE_PATHS = {
  wind: "../assets/vehicles_mixed/prop_wind_turbine_40_01.png",
  wagon: "../assets/vehicles_mixed/vehicle_rustic_wagon_3_01.png",
  buggy: "../assets/vehicles_mixed/vehicle_urban_buggy_26_01.png",
  transport: "../assets/vehicles_mixed/vehicle_urban_transport_34_01.png",
  habitat: "../assets/buildings_space/building_space_habitat_long.png",
  observatory: "../assets/buildings_space/building_space_observatory_03.png",
  gate: "../assets/buildings_space/building_space_gate_large.png"
};

const LOCAL_SPRITE_PATHS = {
  player: {
    warrior: "./assets/sprites/player/player_warrior.png",
    mage: "./assets/sprites/player/player_mage.png",
    hunter: "./assets/sprites/player/player_hunter.png"
  },
  enemy: {
    raider: "./assets/sprites/enemies/enemy_raider.png",
    drone: "./assets/sprites/enemies/enemy_drone.png",
    juggernaut: "./assets/sprites/enemies/enemy_juggernaut.png",
    stalker: "./assets/sprites/enemies/enemy_stalker.png"
  },
  item: {
    potion: "./assets/sprites/items/item_potion.svg",
    gold: "./assets/sprites/items/item_gold.svg"
  }
};

const PLAYER_SHEET_ACTIONS = ["idle", "walk", "run", "attack_basic", "skill_1", "skill_2", "hurt", "death"];
const ENEMY_SHEET_ACTIONS = ["idle", "walk", "attack", "hurt", "death"];
const SHEET_LAYOUT = { cols: 6, rows: 6 };

const PLAYER_SHEET_PROFILES = {
  warrior: {
    cols: 6,
    rows: 6,
    rowMap: { down: 0, left: 2, right: 3, up: 5 },
    yAnchor: 0.9,
    horizontalFrameSequence: [0, 1, 2, 3],
    verticalFrameSequence: [0, 1, 2, 3, 4, 5],
    mirrorLeft: false
  },
  mage: {
    cols: 6,
    rows: 4,
    rowMap: { down: 0, left: 1, right: 2, up: 3 },
    yAnchor: 0.9,
    horizontalFrameSequence: [0, 1, 2, 3, 4, 5],
    verticalFrameSequence: [0, 1, 2, 3, 4, 5],
    mirrorLeft: false
  },
  hunter: {
    cols: 6,
    rows: 4,
    rowMap: { down: 0, left: 1, right: 2, up: 3 },
    yAnchor: 0.9,
    horizontalFrameSequence: [0, 1, 2, 3, 4, 5],
    verticalFrameSequence: [0, 1, 2, 3, 4, 5],
    mirrorLeft: false
  }
};

function getPlayerSheetPath(classId, action) {
  return `./assets/spritesheets/player/${classId}/${action}.png`;
}

function getEnemySheetPath(enemyId, action) {
  return `./assets/spritesheets/enemies/${enemyId}/${action}.png`;
}

const NPC_NEUTRAL_SHEETS = {
  1: [
    "./assets/spritesheets/npc_neutral/level_1/npc_neutral_l01_a_walk.png",
    "./assets/spritesheets/npc_neutral/level_1/npc_neutral_l01_b_walk.png"
  ],
  2: [
    "./assets/spritesheets/npc_neutral/level_2/npc_neutral_l02_a_walk.png",
    "./assets/spritesheets/npc_neutral/level_2/npc_neutral_l02_b_walk.png"
  ]
};

function getNeutralWalkerSheetPaths(levelNumber) {
  return NPC_NEUTRAL_SHEETS[levelNumber] || [];
}

const AUDIO_PATHS = {
  hitEnemy: "../assets/audio/mg_tick.mp3",
  hitPlayer: "../assets/audio/sfx_error.mp3",
  enemyDead: "../assets/audio/mg_win.mp3",
  itemUse: "../assets/audio/sfx_click.mp3",
  uiClick: "../assets/audio/sfx_click.mp3"
};


const SFX_COOLDOWNS = {
  hitEnemy: 0.065,
  hitPlayer: 0.13,
  enemyDead: 0.09,
  itemUse: 0.08,
  uiClick: 0.05
};

const DOM = {
  canvas: document.getElementById("gameCanvas"),
  miniMap: document.getElementById("miniMap"),
  classPanel: document.getElementById("class-panel"),
  classGrid: document.getElementById("class-grid"),
  avatarGrid: document.getElementById("avatar-grid"),
  startBtn: document.getElementById("start-btn"),
  hudScene: document.getElementById("hud-scene"),
  hudClass: document.getElementById("hud-class"),
  hudHero: document.getElementById("hud-hero"),
  hudLevel: document.getElementById("hud-level"),
  hudHp: document.getElementById("hud-hp"),
  hudXp: document.getElementById("hud-xp"),
  hudGold: document.getElementById("hud-gold"),
  barHpFill: document.getElementById("bar-hp-fill"),
  barHpText: document.getElementById("bar-hp-text"),
  barStaminaFill: document.getElementById("bar-stamina-fill"),
  barStaminaText: document.getElementById("bar-stamina-text"),
  barManaFill: document.getElementById("bar-mana-fill"),
  barManaText: document.getElementById("bar-mana-text"),
  hudObjective: document.getElementById("hud-objective"),
  chatPanel: document.getElementById("chat-panel"),
  chatName: document.getElementById("chat-npc-name"),
  chatLog: document.getElementById("chat-log"),
  chatInput: document.getElementById("chat-input"),
  chatSend: document.getElementById("chat-send"),
  chatClose: document.getElementById("chat-close"),
  votePanel: document.getElementById("vote-panel"),
  voteDilemma: document.getElementById("vote-dilemma"),
  voteOptions: document.getElementById("vote-options"),
  voteJustification: document.getElementById("vote-justification"),
  voteCancel: document.getElementById("vote-cancel"),
  voteSubmit: document.getElementById("vote-submit"),
  pausePanel: document.getElementById("pause-panel"),
  toggleAudio: document.getElementById("toggle-audio"),
  merchantPanel: document.getElementById("merchant-panel"),
  merchantClose: document.getElementById("merchant-close"),
  buyPotion: document.getElementById("buy-potion"),
  buyWeapon: document.getElementById("buy-weapon"),
  buyArmor: document.getElementById("buy-armor"),
  guideButton: document.getElementById("guide-button"),
  guidePanel: document.getElementById("guide-panel"),
  guideClose: document.getElementById("guide-close"),
  guideText: document.getElementById("guide-text")
};

const ctx = DOM.canvas.getContext("2d", { alpha: false });
const miniCtx = DOM.miniMap.getContext("2d", { alpha: false });

const state = {
  selectedClassId: null,
  selectedHeroId: null,
  mode: "class",
  paused: false,
  overlay: null,
  audioEnabled: true,
  player: null,
  world: null,
  currentScene: null,
  sceneOrder: [],
  scenes: {},
  sceneIndex: 0,
  keysDown: new Set(),
  notifications: [],
  chatNpc: null,
  history: [],
  camera: { x: 0, y: 0 },
  assets: {
    images: {},
    audio: {},
    bgm: null,
    sfxLastPlayed: {}
  },
  quest: {
    talked: new Set(),
    seals: new Set(),
    challenges: {},
    voteUnlocked: false
  },
  lastTime: performance.now(),
  uid: 1
};

function uid(prefix) {
  const id = `${prefix}_${state.uid}`;
  state.uid += 1;
  return id;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function fixText(input) {
  if (!input || typeof input !== "string") {
    return "";
  }
  if (!/[ÃÂ]/.test(input)) {
    return input;
  }
  try {
    const bytes = Uint8Array.from(Array.from(input).map((ch) => ch.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder("utf-8").decode(bytes);
    return decoded || input;
  } catch (error) {
    return input;
  }
}

function addNotification(text, ttl = 2.8, color = "#d9eef8") {
  state.notifications.push({ id: uid("note"), text, ttl, color });
}

function updateNotifications(dt) {
  for (const note of state.notifications) {
    note.ttl -= dt;
  }
  state.notifications = state.notifications.filter((note) => note.ttl > 0);
}

function loadImage(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = path;
  });
}

function cloneAudio(src) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = 0.5;
  return audio;
}

function playTone(key) {
  if (!state.audioEnabled) {
    return;
  }
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return;
  }
  if (!state.assets.toneCtx) {
    state.assets.toneCtx = new AudioCtx();
  }
  const ctxTone = state.assets.toneCtx;
  const o = ctxTone.createOscillator();
  const g = ctxTone.createGain();
  const map = {
    hitEnemy: 420,
    hitPlayer: 180,
    enemyDead: 260,
    itemUse: 520,
    uiClick: 600
  };
  o.frequency.value = map[key] || 440;
  o.type = "triangle";
  g.gain.value = 0.05;
  o.connect(g);
  g.connect(ctxTone.destination);
  o.start();
  o.stop(ctxTone.currentTime + 0.1);
}

function playSfx(key, volume = 0.5) {
  if (!state.audioEnabled) {
    return;
  }

  const now = performance.now() / 1000;
  const minGap = SFX_COOLDOWNS[key] || 0;
  const last = state.assets.sfxLastPlayed[key] || -99;
  if (now - last < minGap) {
    return;
  }
  state.assets.sfxLastPlayed[key] = now;

  const audio = state.assets.audio[key];
  if (audio) {
    const instance = audio.cloneNode();
    instance.volume = volume;
    try {
      instance.currentTime = 0;
    } catch (error) {
      // ignore currentTime reset errors for unsupported codecs
    }
    instance.play().catch(() => {});
    return;
  }
  playTone(key);
}


async function preloadAssets() {
  const imageTasks = [];
  for (const cls of Object.values(CLASS_DEFS)) {
    imageTasks.push(loadImage(cls.icon).then((img) => {
      state.assets.images[cls.icon] = img;
    }));
  }
  for (const hero of HERO_PRESETS) {
    imageTasks.push(loadImage(hero.icon).then((img) => {
      state.assets.images[hero.icon] = img;
    }));
  }
  for (const path of Object.values(FX_PATHS)) {
    imageTasks.push(loadImage(path).then((img) => {
      state.assets.images[path] = img;
    }));
  }
  for (const path of Object.values(PROP_IMAGE_PATHS)) {
    imageTasks.push(loadImage(path).then((img) => {
      state.assets.images[path] = img;
    }));
  }

  for (const path of Object.values(LOCAL_SPRITE_PATHS.player)) {
    imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
  }
  for (const path of Object.values(LOCAL_SPRITE_PATHS.enemy)) {
    imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
  }
  for (const path of Object.values(LOCAL_SPRITE_PATHS.item)) {
    imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
  }

  for (const classId of Object.keys(CLASS_DEFS)) {
    for (const action of PLAYER_SHEET_ACTIONS) {
      const path = getPlayerSheetPath(classId, action);
      imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
    }
  }

  for (const enemyType of ENEMY_TYPES) {
    for (const action of ENEMY_SHEET_ACTIONS) {
      const path = getEnemySheetPath(enemyType.id, action);
      imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
    }
  }

  for (const levelPaths of Object.values(NPC_NEUTRAL_SHEETS)) {
    for (const path of levelPaths) {
      imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
    }
  }

  await Promise.all(imageTasks);

  for (const [key, path] of Object.entries(AUDIO_PATHS)) {
    state.assets.audio[key] = cloneAudio(path);
  }
}

function deriveBiome(themeRaw) {
  const theme = (themeRaw || "").toLowerCase();
  if (theme.includes("forest") || theme.includes("for") || theme.includes("wind") || theme.includes("tour")) return "forest";
  if (theme.includes("space") || theme.includes("mars") || theme.includes("digital") || theme.includes("cloud")) return "space";
  if (theme.includes("medical") || theme.includes("hospital") || theme.includes("clinic") || theme.includes("genetic")) return "hospital";
  if (theme.includes("justice") || theme.includes("media") || theme.includes("automation") || theme.includes("censor")) return "urban";
  if (theme.includes("lab") || theme.includes("ai") || theme.includes("art")) return "lab";
  if (theme.includes("island") || theme.includes("tourism") || theme.includes("coast")) return "coast";
  return "urban";
}

function fillTiles(world, tileType) {
  world.tileData.fill(tileType);
}

function paintPatches(world, tileType, count, minSize, maxSize) {
  for (let i = 0; i < count; i += 1) {
    const sx = Math.floor(Math.random() * world.tilesW);
    const sy = Math.floor(Math.random() * world.tilesH);
    const rw = Math.floor(minSize + Math.random() * (maxSize - minSize + 1));
    const rh = Math.floor(minSize + Math.random() * (maxSize - minSize + 1));
    for (let y = sy; y < sy + rh; y += 1) {
      for (let x = sx; x < sx + rw; x += 1) {
        if (x >= 0 && x < world.tilesW && y >= 0 && y < world.tilesH) {
          world.tileData[y * world.tilesW + x] = tileType;
        }
      }
    }
  }
}

function paintRect(world, x, y, w, h, tileType) {
  const minTx = Math.floor(x / TILE_SIZE);
  const minTy = Math.floor(y / TILE_SIZE);
  const maxTx = Math.floor((x + w) / TILE_SIZE);
  const maxTy = Math.floor((y + h) / TILE_SIZE);
  for (let ty = minTy; ty <= maxTy; ty += 1) {
    for (let tx = minTx; tx <= maxTx; tx += 1) {
      if (tx >= 0 && tx < world.tilesW && ty >= 0 && ty < world.tilesH) {
        world.tileData[ty * world.tilesW + tx] = tileType;
      }
    }
  }
}

function paintRoad(world, from, to, widthTiles) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const steps = Math.max(1, Math.floor(Math.hypot(dx, dy) / (TILE_SIZE * 0.8)));
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const px = from.x + dx * t;
    const py = from.y + dy * t;
    paintRect(world, px - (widthTiles * TILE_SIZE) / 2, py - (widthTiles * TILE_SIZE) / 2, widthTiles * TILE_SIZE, widthTiles * TILE_SIZE, "path");
  }
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

function buildBoundaries(world) {
  const wall = 3 * TILE_SIZE;
  world.obstacles.push({ x: 0, y: 0, w: world.width, h: wall, kind: "wall" });
  world.obstacles.push({ x: 0, y: world.height - wall, w: world.width, h: wall, kind: "wall" });
  world.obstacles.push({ x: 0, y: 0, w: wall, h: world.height, kind: "wall" });
  world.obstacles.push({ x: world.width - wall, y: 0, w: wall, h: world.height, kind: "wall" });
}

function choosePropByBiome(biome, idx) {
  if (biome === "forest") return idx % 2 === 0 ? PROP_IMAGE_PATHS.wind : PROP_IMAGE_PATHS.wagon;
  if (biome === "space") return idx % 2 === 0 ? PROP_IMAGE_PATHS.habitat : PROP_IMAGE_PATHS.observatory;
  if (biome === "coast") return idx % 2 === 0 ? PROP_IMAGE_PATHS.transport : PROP_IMAGE_PATHS.buggy;
  if (biome === "hospital") return idx % 2 === 0 ? PROP_IMAGE_PATHS.transport : PROP_IMAGE_PATHS.gate;
  return idx % 2 === 0 ? PROP_IMAGE_PATHS.buggy : PROP_IMAGE_PATHS.transport;
}

function populateDecorations(world, zoneCenters, hub) {
  const reserved = [{ x: hub.x, y: hub.y, r: 250 }, ...zoneCenters.map((z) => ({ x: z.x, y: z.y, r: 180 }))];
  for (let i = 0; i < 42; i += 1) {
    const imagePath = choosePropByBiome(world.biome, i);
    const size = 70 + Math.random() * 70;
    let placed = false;
    for (let tries = 0; tries < 24 && !placed; tries += 1) {
      const x = 160 + Math.random() * (world.width - 320);
      const y = 160 + Math.random() * (world.height - 320);
      const blocked = reserved.some((r) => Math.hypot(x - r.x, y - r.y) < r.r);
      if (blocked) continue;
      const overlaps = world.obstacles.some((o) => rectsOverlap(x - size / 2, y - size / 2, size, size, o.x, o.y, o.w, o.h));
      if (overlaps) continue;

      const colliderPadding = size * 0.18;
      world.deco.push({ x, y, w: size, h: size, imagePath, collidable: true });
      world.obstacles.push({
        x: x - size / 2 + colliderPadding,
        y: y - size / 2 + colliderPadding,
        w: size - colliderPadding * 2,
        h: size - colliderPadding * 2,
        kind: "prop"
      });
      placed = true;
    }
  }
}
function createNpcs(world, scene, zoneCenters) {
  const chars = (scene.narrative && Array.isArray(scene.narrative.characters) ? scene.narrative.characters : []).slice(0, 3);
  while (chars.length < 3) {
    chars.push({
      id: `fallback_${chars.length}`,
      name: `Conseiller ${chars.length + 1}`,
      role: "Perspective",
      bio: "Un point de vue supplementaire sur ce dilemme.",
      avatar: "../assets/avatar_architecte.png"
    });
  }

  chars.forEach((char, index) => {
    const zone = zoneCenters[index % zoneCenters.length];
    const npc = {
      id: char.id || uid("npc"),
      talkable: true,
      x: zone.x,
      y: zone.y,
      r: 20,
      name: fixText(char.name || `Conseiller ${index + 1}`),
      role: fixText(char.role || "Perspective"),
      bio: fixText(char.bio || ""),
      avatar: char.avatar ? `../${String(char.avatar).replace(/^\.\//, "")}` : "../assets/avatar_architecte.png",
      spoken: false,
      factionIndex: index
    };
    world.npcs.push(npc);
  });
}

function createWalkers(world, count) {
  const spritePaths = getNeutralWalkerSheetPaths(world.levelNumber);
  for (let i = 0; i < count; i += 1) {
    const spritePath = spritePaths.length ? spritePaths[i % spritePaths.length] : null;
    world.walkers.push({
      id: uid("walker"),
      talkable: false,
      x: 240 + Math.random() * (world.width - 480),
      y: 220 + Math.random() * (world.height - 440),
      r: 14,
      dir: Math.random() * Math.PI * 2,
      speed: 30 + Math.random() * 30,
      wanderT: 0.8 + Math.random() * 2,
      spritePath,
      facing: "down",
      moveVX: 0,
      moveVY: 0,
      animOffset: Math.random() * 6
    });
  }
}

function createMerchant(world, hub) {
  world.merchants = [{ id: "merchant_main", x: hub.x - 160, y: hub.y + 80, r: 20, name: "Forgeron-Marchand" }];
}

function createGate(world, hub) {
  world.gate = { x: hub.x + 360, y: hub.y, w: 82, h: 120, open: false };
}

function extractLevelNumber(id) {
  const match = String(id || "").match(/level_(\d+)/i);
  return match ? Number(match[1]) : 1;
}

function createEnemies(world, count) {
  const level = world.levelNumber;
  for (let i = 0; i < count && world.enemies.length < MAX_ENEMIES; i += 1) {
    const type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
    const scale = 1 + Math.max(0, level - 1) * 0.12;
    let x = 200 + Math.random() * (world.width - 400);
    let y = 200 + Math.random() * (world.height - 400);

    if (Math.hypot(x - world.spawn.x, y - world.spawn.y) < 260) {
      x += 320;
      y += 200;
    }

    world.enemies.push({
      id: uid("enemy"),
      type,
      elite: false,
      x,
      y,
      r: type.radius,
      hp: Math.round(type.hp * scale),
      maxHp: Math.round(type.hp * scale),
      speed: type.speed * (1 + Math.max(0, level - 1) * 0.05),
      atk: Math.round(type.atk * scale),
      range: type.range,
      vision: type.vision,
      ranged: type.ranged,
      vx: 0,
      vy: 0,
      wanderT: 0,
      lastAttack: 0,
      immuneUntil: 0,
      facing: "down",
      moveVX: 0,
      moveVY: 0
    });
  }
}

function createEmptyWorld(scene) {
  const tilesW = DEFAULT_WORLD_TILES.w;
  const tilesH = DEFAULT_WORLD_TILES.h;
  const width = tilesW * TILE_SIZE;
  const height = tilesH * TILE_SIZE;
  const biome = deriveBiome(scene.theme);
  const palette = BIOME_PRESETS[biome];

  const world = {
    id: scene.id,
    levelNumber: extractLevelNumber(scene.id),
    scene,
    biome,
    palette,
    tilesW,
    tilesH,
    width,
    height,
    tileData: new Array(tilesW * tilesH).fill("floor"),
    obstacles: [],
    deco: [],
    npcs: [],
    walkers: [],
    merchants: [],
    gate: null,
    enemies: [],
    projectiles: [],
    fx: [],
    loot: [],
    spawn: { x: width * 0.5, y: height * 0.55 }
  };

  fillTiles(world, "floor");
  paintPatches(world, "floorAlt", 140, 3, 9);

  const hub = { x: width * 0.5, y: height * 0.55 };
  const zoneCenters = [
    { x: width * 0.23, y: height * 0.24 },
    { x: width * 0.78, y: height * 0.26 },
    { x: width * 0.55, y: height * 0.83 }
  ];

  for (const zone of zoneCenters) {
    paintRoad(world, hub, zone, 4);
  }
  paintRect(world, hub.x - 8 * TILE_SIZE, hub.y - 6 * TILE_SIZE, 16 * TILE_SIZE, 12 * TILE_SIZE, "path");

  buildBoundaries(world);
  populateDecorations(world, zoneCenters, hub);
  createNpcs(world, scene, zoneCenters);
  createWalkers(world, 8);
  createMerchant(world, hub);
  createGate(world, hub);
  createEnemies(world, 12 + world.levelNumber * 2);
  return world;
}

function spawnEliteForNpc(npc) {
  const world = state.world;
  if (!world || state.quest.challenges[npc.id]) return;

  const levelScale = 1 + Math.max(0, world.levelNumber - 1) * 0.14;
  const eliteType = ENEMY_TYPES[(npc.factionIndex + 1) % ENEMY_TYPES.length];

  const elite = {
    id: uid("elite"),
    type: eliteType,
    elite: true,
    x: npc.x + 140,
    y: npc.y + 90,
    r: eliteType.radius + 3,
    hp: Math.round(88 * levelScale),
    maxHp: Math.round(88 * levelScale),
    speed: eliteType.speed * 0.9,
    atk: Math.round((eliteType.atk + 4) * levelScale),
    range: eliteType.range + 4,
    vision: eliteType.vision + 120,
    ranged: true,
    vx: 0,
    vy: 0,
    wanderT: 0,
    lastAttack: 0,
    immuneUntil: 0,
    challengeNpcId: npc.id,
    facing: "down",
    moveVX: 0,
    moveVY: 0
  };

  world.enemies.push(elite);
  state.quest.challenges[npc.id] = { active: true, completed: false, eliteId: elite.id };
  addNotification(`Alerte: menace activee pres de ${npc.name}.`, 3.4, "#ffc857");
}

async function loadScenarioData() {
  let data = null;
  try {
    const response = await fetch("../data/scenario.json", { cache: "no-cache" });
    data = await response.json();
  } catch (error) {
    console.warn("Impossible de charger scenario.json, fallback utilise.", error);
  }

  let scenesRaw = data && data.scenes ? data.scenes : null;
  if (!scenesRaw || typeof scenesRaw !== "object") {
    scenesRaw = {
      level_1: {
        id: "level_1",
        theme: "Sacred Forest vs Wind Energy",
        narrative: {
          context: "Conflit entre extraction de lithium pour un projet eolien et preservation d'une foret sacree.",
          characters: [
            { id: "char_l1_ceo", name: "Marcus Vane", role: "Industrie", bio: "Il defend l'urgence energetique." },
            { id: "char_l1_elder", name: "Elara", role: "Gardienne", bio: "Elle defend la valeur spirituelle de la foret." },
            { id: "char_l1_gov", name: "Prefet Morel", role: "Arbitre public", bio: "Il rappelle les contraintes politiques." }
          ]
        },
        exits: [
          { id: "EXTRACT", description: "Autoriser l'extraction", target: "level_7" },
          { id: "PROTECT", description: "Sanctuariser la foret", target: "level_9" }
        ]
      }
    };
  }

  const entries = Object.entries(scenesRaw)
    .map(([id, scene]) => ({ ...scene, id: scene && scene.id ? scene.id : id }))
    .filter((scene) => scene.id && scene.id !== "level_0")
    .sort((a, b) => extractLevelNumber(a.id) - extractLevelNumber(b.id));

  state.scenes = {};
  state.sceneOrder = entries.map((scene) => scene.id);

  for (const scene of entries) {
    if (!scene.narrative) scene.narrative = { context: "", characters: [] };
    scene.theme = fixText(scene.theme || "Dilemme");
    scene.narrative.context = fixText(scene.narrative.context || "");
    if (Array.isArray(scene.narrative.characters)) {
      scene.narrative.characters = scene.narrative.characters.map((character) => ({
        ...character,
        name: fixText(character.name || "Conseiller"),
        role: fixText(character.role || "Perspective"),
        bio: fixText(character.bio || "")
      }));
    } else {
      scene.narrative.characters = [];
    }
    state.scenes[scene.id] = scene;
  }
}

function createClassSelectionUI() {
  DOM.classGrid.innerHTML = "";
  DOM.avatarGrid.innerHTML = "";

  Object.values(CLASS_DEFS).forEach((cls) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "class-item";
    card.dataset.classId = cls.id;
    card.innerHTML = `<img src="${cls.icon}" alt="${cls.name}"><div><strong>${cls.name}</strong></div><div>${cls.desc}</div>`;
    card.addEventListener("click", () => {
      state.selectedClassId = cls.id;
      updateClassAvatarSelectionUI();
      playSfx("uiClick", 0.35);
    });
    DOM.classGrid.appendChild(card);
  });

  HERO_PRESETS.forEach((hero) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "avatar-item";
    card.dataset.heroId = hero.id;
    card.innerHTML = `<img src="${hero.icon}" alt="${hero.label}"><div><strong>${hero.label}</strong></div>`;
    card.addEventListener("click", () => {
      state.selectedHeroId = hero.id;
      updateClassAvatarSelectionUI();
      playSfx("uiClick", 0.35);
    });
    DOM.avatarGrid.appendChild(card);
  });

  updateClassAvatarSelectionUI();
}

function updateClassAvatarSelectionUI() {
  for (const item of DOM.classGrid.querySelectorAll(".class-item")) {
    item.classList.toggle("selected", item.dataset.classId === state.selectedClassId);
  }
  for (const item of DOM.avatarGrid.querySelectorAll(".avatar-item")) {
    item.classList.toggle("selected", item.dataset.heroId === state.selectedHeroId);
  }
  DOM.startBtn.disabled = !(state.selectedClassId && state.selectedHeroId);
}

function createPlayer() {
  const cls = CLASS_DEFS[state.selectedClassId];
  const hero = HERO_PRESETS.find((h) => h.id === state.selectedHeroId);
  return {
    id: uid("player"),
    classId: cls.id,
    className: cls.name,
    heroId: hero.id,
    heroName: hero.label,
    heroColor: hero.color,
    x: state.world.spawn.x,
    y: state.world.spawn.y,
    r: 17,
    dirX: 1,
    dirY: 0,
    facing: "down",
    baseSpeed: cls.speed,
    speed: cls.speed,
    runMultiplier: 1.62,
    maxHp: cls.baseHp,
    hp: cls.baseHp,
    maxStamina: 100,
    stamina: 100,
    staminaRegenRate: 28,
    staminaRegenDelay: 1,
    lastStaminaSpend: -99,
    maxMana: cls.id === "mage" ? 130 : cls.id === "hunter" ? 90 : 70,
    mana: cls.id === "mage" ? 130 : cls.id === "hunter" ? 90 : 70,
    manaRegenRate: cls.id === "mage" ? 30 : 24,
    manaRegenDelay: 1,
    lastManaSpend: -99,
    running: false,
    attack: cls.baseAttack,
    defense: cls.baseDefense,
    level: 1,
    xp: 0,
    xpToNext: 120,
    gold: 50,
    potions: 2,
    weaponLevel: 1,
    armorLevel: 1,
    skillLevels: { skill1: 1, skill2: 1 },
    lastBasic: -99,
    lastSkill1: -99,
    lastSkill2: -99,
    invulnUntil: 0,
    lastResourceWarn: -99
  };
}

function resetQuestProgress() {
  state.quest.talked = new Set();
  state.quest.seals = new Set();
  state.quest.challenges = {};
  state.quest.voteUnlocked = false;
}

function closeAllPanels() {
  DOM.chatPanel.classList.add("hidden");
  DOM.votePanel.classList.add("hidden");
  DOM.pausePanel.classList.add("hidden");
  DOM.merchantPanel.classList.add("hidden");
  DOM.guidePanel.classList.add("hidden");
  state.overlay = null;
  state.chatNpc = null;
}

function computeObjectiveText() {
  const totalTalk = state.world ? state.world.npcs.length : 0;
  const talked = state.quest.talked.size;
  const seals = state.quest.seals.size;
  if (talked < totalTalk) return `Parler aux conseillers (${talked}/${totalTalk})`;
  if (seals < totalTalk) return `Stabiliser les zones de combat (${seals}/${totalTalk})`;
  return "Retourner a la porte pour voter";
}

function setResourceBar(fillNode, textNode, value, maxValue) {
  if (!fillNode || !textNode) return;
  const safeMax = Math.max(1, maxValue);
  const ratio = Math.max(0, Math.min(1, value / safeMax));
  fillNode.style.width = `${(ratio * 100).toFixed(1)}%`;
  textNode.textContent = `${Math.round(value)}/${Math.round(safeMax)}`;
}

function updateHud() {
  if (!state.player || !state.currentScene) return;
  const p = state.player;
  DOM.hudScene.textContent = `Niveau: ${state.currentScene.id.replace("level_", "")}/50`;
  DOM.hudClass.textContent = `Classe: ${p.className}`;
  DOM.hudHero.textContent = `Heros: ${p.heroName}`;
  DOM.hudLevel.textContent = `Lvl: ${p.level}`;
  DOM.hudHp.textContent = `HP: ${Math.max(0, Math.round(p.hp))}/${Math.round(p.maxHp)}`;
  DOM.hudXp.textContent = `XP: ${Math.round(p.xp)}/${Math.round(p.xpToNext)}`;
  DOM.hudGold.textContent = `Or: ${Math.round(p.gold)} | Potions: ${p.potions}`;
  DOM.hudObjective.textContent = `Objectif: ${computeObjectiveText()}`;
  setResourceBar(DOM.barHpFill, DOM.barHpText, p.hp, p.maxHp);
  setResourceBar(DOM.barStaminaFill, DOM.barStaminaText, p.stamina, p.maxStamina);
  setResourceBar(DOM.barManaFill, DOM.barManaText, p.mana, p.maxMana);
}

function updateGuideText() {
  if (!state.currentScene) {
    DOM.guideText.textContent = "Choisis ton heros et ta classe pour commencer.";
    return;
  }
  DOM.guideText.textContent = `${computeObjectiveText()}. Dilemme: ${state.currentScene.theme}.`;
}

function startGameAtScene(sceneId = "level_1") {
  const scene = state.scenes[sceneId] || state.scenes[state.sceneOrder[0]];
  if (!scene) return;
  state.currentScene = scene;
  state.world = createEmptyWorld(scene);
  state.player = createPlayer();
  resetQuestProgress();
  state.mode = "running";
  state.overlay = null;
  DOM.classPanel.classList.add("hidden");
  updateHud();
  updateGuideText();
  addNotification(`Mission: ${scene.theme}`, 3.4, "#67f0c8");
}

function loadSceneById(sceneId, keepPlayerProgress = true) {
  const scene = state.scenes[sceneId];
  if (!scene) return;

  state.currentScene = scene;
  state.world = createEmptyWorld(scene);
  resetQuestProgress();

  if (keepPlayerProgress && state.player) {
    state.player.x = state.world.spawn.x;
    state.player.y = state.world.spawn.y;
    state.player.hp = state.player.maxHp;
    state.player.stamina = state.player.maxStamina;
    state.player.mana = state.player.maxMana;
  } else {
    state.player = createPlayer();
  }

  state.mode = "running";
  state.overlay = null;
  closeAllPanels();
  updateHud();
  updateGuideText();
  addNotification(`Nouveau niveau: ${scene.id.toUpperCase()} - ${scene.theme}`, 3.3, "#67f0c8");
}

function togglePause(force) {
  if (state.mode !== "running") return;
  state.paused = typeof force === "boolean" ? force : !state.paused;
  if (state.paused) {
    state.overlay = "pause";
    DOM.pausePanel.classList.remove("hidden");
  } else {
    if (state.overlay === "pause") state.overlay = null;
    DOM.pausePanel.classList.add("hidden");
  }
}

function openGuide() {
  const hidden = DOM.guidePanel.classList.contains("hidden");
  if (hidden) DOM.guidePanel.classList.remove("hidden");
  else DOM.guidePanel.classList.add("hidden");
}

function circleRectIntersect(cx, cy, r, rect) {
  const nearestX = clamp(cx, rect.x, rect.x + rect.w);
  const nearestY = clamp(cy, rect.y, rect.y + rect.h);
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy < r * r;
}

function moveEntityWithCollision(entity, dx, dy) {
  if (!state.world) return;
  const moveAxis = (axis, delta) => {
    if (!delta) return;
    entity[axis] += delta;
    const r = entity.r || 10;
    entity.x = clamp(entity.x, r, state.world.width - r);
    entity.y = clamp(entity.y, r, state.world.height - r);

    for (const obstacle of state.world.obstacles) {
      if (circleRectIntersect(entity.x, entity.y, r, obstacle)) {
        if (axis === "x") {
          if (delta > 0) entity.x = obstacle.x - r;
          else entity.x = obstacle.x + obstacle.w + r;
        } else if (delta > 0) entity.y = obstacle.y - r;
        else entity.y = obstacle.y + obstacle.h + r;
      }
    }
  };

  moveAxis("x", dx);
  moveAxis("y", dy);
}

function canShowResourceWarning(player, now) {
  return now - player.lastResourceWarn > 0.8;
}

function consumeStamina(amount, now, showWarning) {
  const p = state.player;
  if (!p) return false;
  if (p.stamina < amount) {
    if (showWarning && canShowResourceWarning(p, now)) {
      addNotification("Stamina insuffisante.", 1.3, "#ffc857");
      p.lastResourceWarn = now;
    }
    return false;
  }
  p.stamina = Math.max(0, p.stamina - amount);
  p.lastStaminaSpend = now;
  return true;
}

function consumeMana(amount, now, showWarning) {
  const p = state.player;
  if (!p) return false;
  if (p.mana < amount) {
    if (showWarning && canShowResourceWarning(p, now)) {
      addNotification("Mana insuffisant.", 1.3, "#8ac7ff");
      p.lastResourceWarn = now;
    }
    return false;
  }
  p.mana = Math.max(0, p.mana - amount);
  p.lastManaSpend = now;
  return true;
}

function regenResources(dt, now) {
  const p = state.player;
  if (!p) return;
  if (now - p.lastStaminaSpend >= p.staminaRegenDelay) {
    p.stamina = Math.min(p.maxStamina, p.stamina + p.staminaRegenRate * dt);
  }
  if (now - p.lastManaSpend >= p.manaRegenDelay) {
    p.mana = Math.min(p.maxMana, p.mana + p.manaRegenRate * dt);
  }
}

function updatePlayer(dt, now) {
  const p = state.player;
  if (!p || state.overlay) return;

  let moveX = 0;
  let moveY = 0;
  if (state.keysDown.has("KeyW") || state.keysDown.has("ArrowUp")) moveY -= 1;
  if (state.keysDown.has("KeyS") || state.keysDown.has("ArrowDown")) moveY += 1;
  if (state.keysDown.has("KeyA") || state.keysDown.has("ArrowLeft")) moveX -= 1;
  if (state.keysDown.has("KeyD") || state.keysDown.has("ArrowRight")) moveX += 1;

  const isMoving = moveX !== 0 || moveY !== 0;
  if (isMoving) {
    const rawMoveX = moveX;
    const rawMoveY = moveY;
    const len = Math.hypot(moveX, moveY) || 1;
    moveX /= len;
    moveY /= len;
    p.dirX = moveX;
    p.dirY = moveY;

    if (Math.abs(rawMoveX) > 0) {
      p.facing = rawMoveX > 0 ? "right" : "left";
    } else if (Math.abs(rawMoveY) > 0) {
      p.facing = rawMoveY > 0 ? "down" : "up";
    }
  }

  const wantsSprint = state.keysDown.has("ShiftLeft") || state.keysDown.has("ShiftRight");
  let speedMultiplier = 1;
  p.running = false;
  if (isMoving && wantsSprint && consumeStamina(RESOURCE_RULES.runStaminaPerSecond * dt, now, false)) {
    speedMultiplier = p.runMultiplier;
    p.running = true;
  }

  moveEntityWithCollision(p, moveX * p.baseSpeed * speedMultiplier * dt, moveY * p.baseSpeed * speedMultiplier * dt);
  collectNearbyLoot();
  if (state.keysDown.has("Space")) tryBasicAttack(now);
}

function spawnProjectile(projectile) {
  state.world.projectiles.push({ id: uid("proj"), ...projectile });
}

function spawnFx(x, y, imagePath, ttl, size) {
  state.world.fx.push({ id: uid("fx"), x, y, imagePath, ttl, baseTtl: ttl, size });
}

function applyDamageToEnemy(enemy, rawDamage) {
  if (enemy.hp <= 0) return;
  const damage = Math.max(1, Math.round(rawDamage));
  enemy.hp -= damage;
  playSfx("hitEnemy", enemy.elite ? 0.65 : 0.4);
  if (enemy.hp <= 0) {
    enemy.hp = 0;
    onEnemyDefeated(enemy);
  }
}

function damageEnemiesInCircle(x, y, radius, damage, knockback = 40, stun = 0) {
  const enemies = state.world.enemies;
  let hitCount = 0;
  const now = performance.now() / 1000;

  for (const enemy of enemies) {
    if (enemy.hp <= 0) continue;
    const d = Math.hypot(enemy.x - x, enemy.y - y);
    if (d > radius + enemy.r) continue;
    applyDamageToEnemy(enemy, damage, now);
    const nx = (enemy.x - x) / (d || 1);
    const ny = (enemy.y - y) / (d || 1);
    moveEntityWithCollision(enemy, nx * knockback, ny * knockback);
    if (stun > 0) enemy.immuneUntil = Math.max(enemy.immuneUntil, now + stun);
    hitCount += 1;
  }

}

function tryBasicAttack(now) {
  const p = state.player;
  const cls = CLASS_DEFS[p.classId];
  const cooldown = cls.id === "warrior" ? 0.48 : 0.34;
  if (now - p.lastBasic < cooldown) return;
  const staminaCost = RESOURCE_RULES.basicStamina[p.classId] || 9;
  if (!consumeStamina(staminaCost, now, true)) return;
  p.lastBasic = now;

  if (cls.basicKind === "melee") {
    const center = { x: p.x + p.dirX * 48, y: p.y + p.dirY * 48 };
    const damage = Math.round(p.attack + p.weaponLevel * 2 + p.level * 1.2);
    damageEnemiesInCircle(center.x, center.y, 48, damage, 36);
    spawnFx(center.x, center.y, FX_PATHS.slash_warrior, 0.2, 78);
  } else {
    const baseDamage = Math.round(p.attack + p.weaponLevel * 2 + p.level * 1.1);
    const kind = p.classId === "mage" ? "orb" : "arrow";
    spawnProjectile({
      from: "player",
      kind,
      x: p.x + p.dirX * 24,
      y: p.y + p.dirY * 24,
      vx: p.dirX * 480,
      vy: p.dirY * 480,
      dmg: baseDamage,
      ttl: 1.6,
      r: p.classId === "mage" ? 10 : 7,
      color: p.classId === "mage" ? "#8b5cf6" : "#65a30d"
    });
  }
}

function useSkill1(now) {
  const p = state.player;
  if (!p) return;
  const cooldown = 2.3 - Math.min(0.8, (p.skillLevels.skill1 - 1) * 0.08);
  if (now - p.lastSkill1 < cooldown) return;
  const manaCost = RESOURCE_RULES.skill1Mana[p.classId] || 16;
  if (!consumeMana(manaCost, now, true)) return;
  p.lastSkill1 = now;

  if (p.classId === "warrior") {
    moveEntityWithCollision(p, p.dirX * 56, p.dirY * 56);
    const hit = { x: p.x + p.dirX * 42, y: p.y + p.dirY * 42 };
    damageEnemiesInCircle(hit.x, hit.y, 58, Math.round(p.attack * 1.7), 70, 0.7);
    spawnFx(hit.x, hit.y, FX_PATHS.slash_warrior, 0.24, 96);
  } else if (p.classId === "mage") {
    spawnProjectile({
      from: "player",
      kind: "arcane",
      x: p.x + p.dirX * 20,
      y: p.y + p.dirY * 20,
      vx: p.dirX * 360,
      vy: p.dirY * 360,
      dmg: Math.round(p.attack * 1.9),
      ttl: 1.9,
      r: 14,
      color: "#d946ef",
      splash: 54
    });
    spawnFx(p.x + p.dirX * 26, p.y + p.dirY * 26, FX_PATHS.burst_mage, 0.26, 92);
  } else {
    const spread = [-0.16, 0, 0.16];
    for (const angleOffset of spread) {
      const angle = Math.atan2(p.dirY, p.dirX) + angleOffset;
      spawnProjectile({
        from: "player",
        kind: "arrow",
        x: p.x,
        y: p.y,
        vx: Math.cos(angle) * 500,
        vy: Math.sin(angle) * 500,
        dmg: Math.round(p.attack * 1.15),
        ttl: 1.5,
        r: 6,
        color: "#84cc16"
      });
    }
    spawnFx(p.x + p.dirX * 30, p.y + p.dirY * 30, FX_PATHS.slash_hunter, 0.2, 82);
  }
}

function useSkill2(now) {
  const p = state.player;
  if (!p) return;
  const cooldown = 3.6 - Math.min(1.2, (p.skillLevels.skill2 - 1) * 0.12);
  if (now - p.lastSkill2 < cooldown) return;
  const manaCost = RESOURCE_RULES.skill2Mana[p.classId] || 24;
  if (!consumeMana(manaCost, now, true)) return;
  p.lastSkill2 = now;

  if (p.classId === "warrior") {
    damageEnemiesInCircle(p.x, p.y, 76, Math.round(p.attack * 2.15), 84);
    spawnFx(p.x, p.y, FX_PATHS.slash_warrior, 0.3, 116);
  } else if (p.classId === "mage") {
    damageEnemiesInCircle(p.x, p.y, 88, Math.round(p.attack * 2.0), 62);
    spawnFx(p.x, p.y, FX_PATHS.burst_mage, 0.34, 128);
  } else {
    p.invulnUntil = now + 0.38;
    moveEntityWithCollision(p, p.dirX * 120, p.dirY * 120);
    damageEnemiesInCircle(p.x + p.dirX * 10, p.y + p.dirY * 10, 60, Math.round(p.attack * 1.8), 80);
    spawnFx(p.x, p.y, FX_PATHS.slash_hunter, 0.26, 102);
  }
}

function onEnemyDefeated(enemy) {
  const p = state.player;
  const xpGain = enemy.elite ? 90 : 18;
  const goldGain = enemy.elite ? 32 : 6 + Math.floor(Math.random() * 6);

  p.xp += xpGain;
  p.gold += goldGain;
  maybeLevelUp();

  state.world.loot.push({
    id: uid("loot"),
    x: enemy.x,
    y: enemy.y,
    kind: Math.random() < 0.22 ? "potion" : "gold",
    amount: Math.random() < 0.22 ? 1 : 4 + Math.floor(Math.random() * 7),
    ttl: 25
  });

  if (enemy.challengeNpcId) {
    state.quest.seals.add(enemy.challengeNpcId);
    const challenge = state.quest.challenges[enemy.challengeNpcId];
    if (challenge) {
      challenge.active = false;
      challenge.completed = true;
    }
    addNotification("Zone stabilisee. Sceau obtenu.", 2.8, "#67f0c8");
    updateGuideText();
  }

  playSfx("enemyDead", 0.6);
  updateHud();
}

function maybeLevelUp() {
  const p = state.player;
  let leveled = false;
  while (p.xp >= p.xpToNext) {
    p.xp -= p.xpToNext;
    p.level += 1;
    p.xpToNext = Math.round(120 + p.level * 65);
    p.attack += 2;
    p.maxHp += p.classId === "warrior" ? 16 : p.classId === "hunter" ? 12 : 10;
    p.hp = p.maxHp;
    p.maxStamina += 2;
    p.stamina = p.maxStamina;
    p.maxMana += p.classId === "mage" ? 8 : 5;
    p.mana = p.maxMana;
    p.defense += 1;
    if (p.level % 2 === 0) p.skillLevels.skill1 += 1;
    else p.skillLevels.skill2 += 1;
    leveled = true;
  }
  if (leveled) addNotification(`Niveau ${p.level} atteint! Talent ameliore.`, 3.2, "#ffc857");
}

function damagePlayer(rawDamage, now) {
  const p = state.player;
  if (!p || now < p.invulnUntil) return;
  const reduced = Math.max(1, Math.round(rawDamage - p.defense * 0.35));
  p.hp -= reduced;
  p.invulnUntil = now + 0.6;
  playSfx("hitPlayer", 0.65);
  updateHud();

  if (p.hp <= 0) {
    p.hp = p.maxHp;
    p.stamina = p.maxStamina;
    p.mana = p.maxMana;
    p.x = state.world.spawn.x;
    p.y = state.world.spawn.y;
    p.gold = Math.max(0, p.gold - 25);
    addNotification("Defaite temporaire. Repli au camp.", 3.2, "#ff8c8c");
  }
}

function updateProjectiles(dt, now) {
  const arr = state.world.projectiles;
  for (const proj of arr) {
    proj.ttl -= dt;
    proj.x += proj.vx * dt;
    proj.y += proj.vy * dt;

    if (proj.x < 0 || proj.y < 0 || proj.x > state.world.width || proj.y > state.world.height) {
      proj.ttl = -1;
      continue;
    }

    const obstacleHit = state.world.obstacles.some((o) => circleRectIntersect(proj.x, proj.y, proj.r, o));
    if (obstacleHit) {
      proj.ttl = -1;
      continue;
    }

    if (proj.from === "player") {
      for (const enemy of state.world.enemies) {
        if (enemy.hp <= 0) continue;
        const d = Math.hypot(proj.x - enemy.x, proj.y - enemy.y);
        if (d <= proj.r + enemy.r) {
          applyDamageToEnemy(enemy, proj.dmg, now);
          if (proj.splash) damageEnemiesInCircle(proj.x, proj.y, proj.splash, Math.round(proj.dmg * 0.7), 34);
          proj.ttl = -1;
          break;
        }
      }
    } else if (proj.from === "enemy") {
      const p = state.player;
      const d = Math.hypot(proj.x - p.x, proj.y - p.y);
      if (d <= proj.r + p.r) {
        damagePlayer(proj.dmg, now);
        proj.ttl = -1;
      }
    }
  }
  state.world.projectiles = arr.filter((p) => p.ttl > 0);
}

function updateEnemies(dt, now) {
  const p = state.player;
  for (const enemy of state.world.enemies) {
    if (enemy.hp <= 0) continue;
    if (now < enemy.immuneUntil) continue;

    const dx = p.x - enemy.x;
    const dy = p.y - enemy.y;
    const dist = Math.hypot(dx, dy);
    let vx = 0;
    let vy = 0;

    if (dist < enemy.vision) {
      vx = dx / (dist || 1);
      vy = dy / (dist || 1);
    } else {
      enemy.wanderT -= dt;
      if (enemy.wanderT <= 0) {
        const angle = Math.random() * Math.PI * 2;
        enemy.vx = Math.cos(angle);
        enemy.vy = Math.sin(angle);
        enemy.wanderT = 0.8 + Math.random() * 1.7;
      }
      vx = enemy.vx || 0;
      vy = enemy.vy || 0;
    }

    const prevX = enemy.x;
    const prevY = enemy.y;
    moveEntityWithCollision(enemy, vx * enemy.speed * dt, vy * enemy.speed * dt);

    enemy.moveVX = (enemy.x - prevX) / Math.max(dt, 0.0001);
    enemy.moveVY = (enemy.y - prevY) / Math.max(dt, 0.0001);

    if (dist < enemy.vision) {
      enemy.facing = vecToDirection(dx, dy, enemy.facing, 0.05);
    } else {
      enemy.facing = vecToDirection(enemy.moveVX, enemy.moveVY, enemy.facing, 2.0);
    }

    const spacing = p.r + enemy.r + 3;
    if (dist < spacing) {
      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);
      enemy.x = p.x - nx * spacing;
      enemy.y = p.y - ny * spacing;
    }

    if (dist <= enemy.range + p.r && now - enemy.lastAttack > 0.95) {
      enemy.lastAttack = now;
      if (enemy.ranged && dist > enemy.range * 0.6) {
        const nx = dx / (dist || 1);
        const ny = dy / (dist || 1);
        spawnProjectile({
          from: "enemy",
          kind: "enemy_orb",
          x: enemy.x,
          y: enemy.y,
          vx: nx * 320,
          vy: ny * 320,
          dmg: enemy.atk,
          ttl: 1.4,
          r: 8,
          color: "#f97316"
        });
      } else {
        damagePlayer(enemy.atk, now);
      }
    }
  }

  state.world.enemies = state.world.enemies.filter((e) => e.hp > 0);
}

function updateWalkers(dt) {
  for (const walker of state.world.walkers) {
    walker.wanderT -= dt;
    if (walker.wanderT <= 0) {
      walker.dir = Math.random() * Math.PI * 2;
      walker.wanderT = 0.8 + Math.random() * 2;
    }

    const dx = Math.cos(walker.dir) * walker.speed * dt;
    const dy = Math.sin(walker.dir) * walker.speed * dt;
    const prevX = walker.x;
    const prevY = walker.y;
    moveEntityWithCollision(walker, dx, dy);

    walker.moveVX = (walker.x - prevX) / Math.max(dt, 0.0001);
    walker.moveVY = (walker.y - prevY) / Math.max(dt, 0.0001);
    walker.facing = vecToDirection(walker.moveVX, walker.moveVY, walker.facing || "down", 1.5);
  }
}

function updateFx(dt) {
  for (const fx of state.world.fx) {
    fx.ttl -= dt;
  }
  state.world.fx = state.world.fx.filter((fx) => fx.ttl > 0);
}

function updateLoot(dt) {
  for (const loot of state.world.loot) {
    loot.ttl -= dt;
  }
  state.world.loot = state.world.loot.filter((loot) => loot.ttl > 0);
}

function collectNearbyLoot() {
  const p = state.player;
  for (const loot of state.world.loot) {
    const d = Math.hypot(loot.x - p.x, loot.y - p.y);
    if (d < p.r + 16) {
      if (loot.kind === "gold") p.gold += loot.amount;
      else p.potions += loot.amount;
      loot.ttl = -1;
    }
  }
  state.world.loot = state.world.loot.filter((loot) => loot.ttl > 0);
}

function updateGateState() {
  const ready = state.quest.talked.size >= state.world.npcs.length && state.quest.seals.size >= state.world.npcs.length;
  state.quest.voteUnlocked = ready;
  if (state.world.gate) state.world.gate.open = ready;
}

function updateCamera() {
  const p = state.player;
  if (!p) return;
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const targetX = p.x - viewportW / 2;
  const targetY = p.y - viewportH / 2;
  state.camera.x += (targetX - state.camera.x) * 0.14;
  state.camera.y += (targetY - state.camera.y) * 0.14;
  state.camera.x = clamp(state.camera.x, 0, Math.max(0, state.world.width - viewportW));
  state.camera.y = clamp(state.camera.y, 0, Math.max(0, state.world.height - viewportH));
}

function resizeCanvasToViewport() {
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(window.innerWidth));
  const height = Math.max(240, Math.floor(window.innerHeight));
  DOM.canvas.width = Math.floor(width * dpr);
  DOM.canvas.height = Math.floor(height * dpr);
  DOM.canvas.style.width = `${width}px`;
  DOM.canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function tileColorForType(type, palette) {
  if (type === "floor") return palette.floor;
  if (type === "floorAlt") return palette.floorAlt;
  if (type === "path") return palette.path;
  if (type === "water") return palette.water;
  return palette.wall;
}

function drawTiles(camX, camY) {
  const world = state.world;
  const palette = world.palette;
  const viewW = window.innerWidth;
  const viewH = window.innerHeight;

  ctx.fillStyle = "#0a0f17";
  ctx.fillRect(0, 0, viewW, viewH);

  const startTx = clamp(Math.floor(camX / TILE_SIZE) - 1, 0, world.tilesW - 1);
  const endTx = clamp(Math.floor((camX + viewW) / TILE_SIZE) + 1, 0, world.tilesW - 1);
  const startTy = clamp(Math.floor(camY / TILE_SIZE) - 1, 0, world.tilesH - 1);
  const endTy = clamp(Math.floor((camY + viewH) / TILE_SIZE) + 1, 0, world.tilesH - 1);

  for (let ty = startTy; ty <= endTy; ty += 1) {
    for (let tx = startTx; tx <= endTx; tx += 1) {
      const type = world.tileData[ty * world.tilesW + tx];
      ctx.fillStyle = tileColorForType(type, palette);
      ctx.fillRect(tx * TILE_SIZE - camX, ty * TILE_SIZE - camY, TILE_SIZE + 1, TILE_SIZE + 1);
    }
  }
}

function drawDecor(camX, camY) {
  for (const deco of state.world.deco) {
    const x = deco.x - deco.w / 2 - camX;
    const y = deco.y - deco.h / 2 - camY;
    if (x > window.innerWidth + 64 || y > window.innerHeight + 64 || x + deco.w < -64 || y + deco.h < -64) continue;
    const img = state.assets.images[deco.imagePath];
    if (img) ctx.drawImage(img, x, y, deco.w, deco.h);
    else {
      ctx.fillStyle = "#6b7280";
      ctx.fillRect(x, y, deco.w, deco.h);
    }
  }
}

function drawEntityLabel(entity, camX, camY, text, color = "#d9eef8") {
  const x = entity.x - camX;
  const y = entity.y - camY;
  ctx.font = "12px Segoe UI";
  const width = ctx.measureText(text).width + 10;
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(x - width / 2, y - (entity.r + 28), width, 18);
  ctx.fillStyle = color;
  ctx.fillText(text, x - width / 2 + 5, y - (entity.r + 15));
}

function drawGate(camX, camY) {
  const gate = state.world.gate;
  if (!gate) return;
  const x = gate.x - gate.w / 2 - camX;
  const y = gate.y - gate.h / 2 - camY;

  const img = state.assets.images[PROP_IMAGE_PATHS.gate];
  if (img) {
    ctx.globalAlpha = gate.open ? 0.9 : 0.72;
    ctx.drawImage(img, x, y, gate.w, gate.h);
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = gate.open ? "#22c55e" : "#a855f7";
    ctx.fillRect(x, y, gate.w, gate.h);
  }

  ctx.strokeStyle = gate.open ? "#67f0c8" : "#ff6b6b";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 4, y - 4, gate.w + 8, gate.h + 8);

  if (Math.hypot(state.player.x - gate.x, state.player.y - gate.y) < 90) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(x - 30, y - 36, 200, 28);
    ctx.fillStyle = "#e5f5ff";
    ctx.font = "14px Segoe UI";
    ctx.fillText(gate.open ? "[E] Voter et quitter" : "Porte verrouillee", x - 24, y - 17);
  }
}

function drawNpcs(camX, camY) {
  for (const npc of state.world.npcs) {
    const x = npc.x - camX;
    const y = npc.y - camY;

    ctx.fillStyle = "#ffd166";
    ctx.beginPath();
    ctx.arc(x, y, npc.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#213547";
    ctx.fillRect(x - 6, y - 18, 12, 18);

    const highlight = !state.quest.talked.has(npc.id);
    if (highlight) {
      ctx.strokeStyle = "rgba(255, 232, 124, 0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, npc.r + 6 + Math.sin(performance.now() * 0.005) * 1.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    const near = Math.hypot(state.player.x - npc.x, state.player.y - npc.y) < 88;
    if (near) drawEntityLabel(npc, camX, camY, `${npc.name} [E]`, "#ffe08a");
  }

  for (const walker of state.world.walkers) {
    const x = walker.x - camX;
    const y = walker.y - camY;

    let drawn = false;
    if (walker.spritePath) {
      drawn = drawFromSpritesheet(
        walker.spritePath,
        "walk",
        walker.facing || "down",
        x,
        y,
        walker.r * 3.5,
        6.6,
        {
          cols: 6,
          rows: 4,
          frameCount: 6,
          rowMap: { down: 0, left: 1, right: 2, up: 3 },
          yAnchor: 0.9,
          frameOffset: walker.animOffset || 0
        }
      );
    }

    if (!drawn) {
      ctx.fillStyle = "#8f98a8";
      ctx.beginPath();
      ctx.arc(x, y, walker.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4b5563";
      ctx.fillRect(x - 5, y - 14, 10, 14);
    }
  }

  for (const merchant of state.world.merchants) {
    const x = merchant.x - camX;
    const y = merchant.y - camY;
    ctx.fillStyle = "#22d3ee";
    ctx.beginPath();
    ctx.arc(x, y, merchant.r, 0, Math.PI * 2);
    ctx.fill();
    drawEntityLabel(merchant, camX, camY, `${merchant.name} [E]`, "#93ecff");
  }
}

function vecToDirection(dx, dy, previous = "down", deadZone = 0.08) {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (ax < deadZone && ay < deadZone) return previous || "down";
  if (ax > ay) return dx >= 0 ? "right" : "left";
  return dy >= 0 ? "down" : "up";
}


function drawFromSpritesheet(path, action, dir, x, y, size, speed = 10, options = {}) {
  const img = state.assets.images[path];
  if (!img) return false;

  const cols = options.cols || SHEET_LAYOUT.cols;
  const rows = options.rows || SHEET_LAYOUT.rows;
  if (!cols || !rows) return false;

  const xCuts = [];
  const yCuts = [];
  for (let i = 0; i <= cols; i += 1) xCuts.push(Math.round((i * img.width) / cols));
  for (let i = 0; i <= rows; i += 1) yCuts.push(Math.round((i * img.height) / rows));

  const rowMap = options.rowMap || { down: 0, left: 1, right: 2, up: 3 };
  const row = clamp(rowMap[dir] ?? rowMap.down ?? 0, 0, rows - 1);

  const frameOffset = options.frameOffset || 0;
  const seq = Array.isArray(options.frameSequence) && options.frameSequence.length
    ? options.frameSequence.filter((i) => Number.isFinite(i) && i >= 0 && i < cols)
    : null;

  let frame;
  if (seq && seq.length) {
    const idx = (Math.floor((performance.now() / 1000) * speed + frameOffset) % seq.length + seq.length) % seq.length;
    frame = seq[idx];
  } else {
    const frameCount = clamp(options.frameCount || cols, 1, cols);
    frame = (Math.floor((performance.now() / 1000) * speed + frameOffset) % frameCount + frameCount) % frameCount;
  }

  const sx = xCuts[frame];
  const sy = yCuts[row];
  const sw = xCuts[frame + 1] - xCuts[frame];
  const sh = yCuts[row + 1] - yCuts[row];
  if (sw <= 0 || sh <= 0) return false;

  const yAnchor = typeof options.yAnchor === "number" ? options.yAnchor : 0.82;
  const drawW = typeof options.drawWidth === "number" ? options.drawWidth : size;
  const drawH = typeof options.drawHeight === "number"
    ? options.drawHeight
    : size * (sh / Math.max(1, sw));
  const dx = x - drawW / 2;
  const dy = y - drawH * yAnchor;

  if (options.flipX) {
    ctx.save();
    ctx.translate(x, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, sx, sy, sw, sh, -drawW / 2, dy, drawW, drawH);
    ctx.restore();
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, drawW, drawH);
  }
  return true;
}


function drawEnemies(camX, camY) {
  const now = performance.now() / 1000;
  for (const enemy of state.world.enemies) {
    if (enemy.hp <= 0) continue;
    const x = enemy.x - camX;
    const y = enemy.y - camY;

    const vx = enemy.moveVX || 0;
    const vy = enemy.moveVY || 0;
    const dir = enemy.facing || vecToDirection(vx, vy, "down", 2.0);

    let action = "idle";
    if (now - enemy.lastAttack < 0.28) action = "attack";
    else if (Math.hypot(vx, vy) > 8) action = "walk";

    const sheetPath = getEnemySheetPath(enemy.type.id, action);
    const idleSheetPath = getEnemySheetPath(enemy.type.id, "idle");
    const walkSheetPath = getEnemySheetPath(enemy.type.id, "walk");

    const size = enemy.r * 3.6;
    const drawn = drawFromSpritesheet(sheetPath, action, dir, x, y, size, action === "attack" ? 14 : 9, { yAnchor: 0.86 })
      || drawFromSpritesheet(walkSheetPath, "walk", dir, x, y, size, 9, { yAnchor: 0.86 })
      || drawFromSpritesheet(idleSheetPath, "idle", dir, x, y, size, 5, { yAnchor: 0.86 });

    if (!drawn) {
      const spritePath = LOCAL_SPRITE_PATHS.enemy[enemy.type.id];
      const sprite = spritePath ? state.assets.images[spritePath] : null;
      if (sprite) {
        const fallbackSize = enemy.r * 2.4;
        ctx.drawImage(sprite, x - fallbackSize / 2, y - fallbackSize / 2, fallbackSize, fallbackSize);
      } else {
        ctx.fillStyle = enemy.type.color;
        ctx.beginPath();
        ctx.arc(x, y, enemy.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (enemy.elite) {
      ctx.strokeStyle = "#fef08a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, enemy.r + 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    const hpRatio = clamp(enemy.hp / enemy.maxHp, 0, 1);
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(x - 18, y - enemy.r - 13, 36, 5);
    ctx.fillStyle = enemy.elite ? "#f59e0b" : "#22c55e";
    ctx.fillRect(x - 18, y - enemy.r - 13, 36 * hpRatio, 5);
  }
}


function drawPlayer(camX, camY) {
  const p = state.player;
  const cls = CLASS_DEFS[p.classId];
  const x = p.x - camX;
  const y = p.y - camY;

  const moving = (
    state.keysDown.has("KeyW") || state.keysDown.has("ArrowUp")
    || state.keysDown.has("KeyS") || state.keysDown.has("ArrowDown")
    || state.keysDown.has("KeyA") || state.keysDown.has("ArrowLeft")
    || state.keysDown.has("KeyD") || state.keysDown.has("ArrowRight")
  ) && !state.overlay;

  let action = "idle";
  const now = performance.now() / 1000;
  if (now - p.lastSkill2 < 0.34) action = "skill_2";
  else if (now - p.lastSkill1 < 0.28) action = "skill_1";
  else if (now - p.lastBasic < 0.22) action = "attack_basic";
  else if (moving && p.running) action = "run";
  else if (moving) action = "walk";

  const dir = p.facing || vecToDirection(p.dirX, p.dirY, "down", 0.05);
  const sheetPath = getPlayerSheetPath(p.classId, action);
  const idleSheetPath = getPlayerSheetPath(p.classId, "idle");
  const walkSheetPath = getPlayerSheetPath(p.classId, "walk");

  const profile = PLAYER_SHEET_PROFILES[p.classId] || PLAYER_SHEET_PROFILES.warrior;
  const frameSequence = (dir === "left" || dir === "right") ? profile.horizontalFrameSequence : profile.verticalFrameSequence;
  const flipX = profile.mirrorLeft && dir === "left";

  const size = p.r * 4.2;
  const drawOpts = {
    cols: profile.cols,
    rows: profile.rows,
    rowMap: profile.rowMap,
    yAnchor: profile.yAnchor,
    frameSequence,
    flipX
  };

  const drawn = drawFromSpritesheet(sheetPath, action, dir, x, y, size, p.running ? 13 : 9, drawOpts)
    || drawFromSpritesheet(walkSheetPath, "walk", dir, x, y, size, 9, drawOpts)
    || drawFromSpritesheet(idleSheetPath, "idle", dir, x, y, size, 5, drawOpts);

  if (!drawn) {
    const spritePath = LOCAL_SPRITE_PATHS.player[p.classId];
    const sprite = spritePath ? state.assets.images[spritePath] : null;
    if (sprite) {
      const fallbackSize = p.r * 2.8;
      ctx.drawImage(sprite, x - fallbackSize / 2, y - fallbackSize / 2, fallbackSize, fallbackSize);
    } else {
      ctx.fillStyle = p.heroColor;
      ctx.beginPath();
      ctx.arc(x, y, p.r + 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = cls.color;
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111827";
      ctx.fillRect(x - 6, y - 17, 12, 17);
    }
  }

  const facingX = x + p.dirX * 16;
  const facingY = y + p.dirY * 16;

  if (p.classId === "warrior") {
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y - 2);
    ctx.lineTo(facingX, facingY);
    ctx.stroke();

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x - p.dirY * 9, y + p.dirX * 9, 7, 0, Math.PI * 2);
    ctx.stroke();
  } else if (p.classId === "mage") {
    ctx.strokeStyle = "#e9d5ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + 2);
    ctx.lineTo(facingX, facingY);
    ctx.stroke();

    ctx.fillStyle = "#d946ef";
    ctx.beginPath();
    ctx.arc(facingX, facingY, 4, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = "#d9f99d";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - p.dirY * 7, y + p.dirX * 7);
    ctx.lineTo(facingX, facingY);
    ctx.stroke();

    ctx.strokeStyle = "#fef9c3";
    ctx.beginPath();
    ctx.moveTo(x + p.dirY * 4, y - p.dirX * 4);
    ctx.lineTo(x + p.dirY * 12, y - p.dirX * 12);
    ctx.stroke();
  }

  drawEntityLabel({ x: p.x, y: p.y, r: p.r + 12 }, camX, camY, `${p.heroName} - ${p.className}`, "#67f0c8");
}


function drawProjectiles(camX, camY) {
  for (const proj of state.world.projectiles) {
    const x = proj.x - camX;
    const y = proj.y - camY;

    ctx.fillStyle = proj.color || "#f8fafc";
    ctx.beginPath();
    ctx.arc(x, y, proj.r, 0, Math.PI * 2);
    ctx.fill();

    if (proj.kind === "arrow") {
      ctx.strokeStyle = "#fef08a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - proj.vx * 0.01, y - proj.vy * 0.01);
      ctx.lineTo(x + proj.vx * 0.01, y + proj.vy * 0.01);
      ctx.stroke();
    }
  }
}

function drawFx(camX, camY) {
  for (const fx of state.world.fx) {
    const alpha = clamp(fx.ttl / fx.baseTtl, 0, 1);
    const x = fx.x - camX;
    const y = fx.y - camY;
    const size = fx.size;
    const img = state.assets.images[fx.imagePath];
    ctx.globalAlpha = alpha;
    if (img) ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
    else {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.arc(x, y, size / 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

function drawLoot(camX, camY) {
  for (const loot of state.world.loot) {
    const x = loot.x - camX;
    const y = loot.y - camY;
    const spritePath = LOCAL_SPRITE_PATHS.item[loot.kind];
    const sprite = spritePath ? state.assets.images[spritePath] : null;
    if (sprite) {
      const size = 22;
      ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
      continue;
    }
    if (loot.kind === "gold") {
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(x - 6, y - 6, 12, 12);
      ctx.fillStyle = "#fff";
      ctx.fillRect(x - 2, y - 5, 4, 10);
      ctx.fillRect(x - 5, y - 2, 10, 4);
    }
  }
}

function drawNotifications() {
  if (!state.notifications.length) return;
  let y = 94;
  for (const note of state.notifications) {
    ctx.font = "14px Segoe UI";
    const width = ctx.measureText(note.text).width + 22;
    ctx.fillStyle = "rgba(2, 12, 22, 0.75)";
    ctx.fillRect(18, y, width, 24);
    ctx.strokeStyle = "rgba(103, 240, 200, 0.55)";
    ctx.strokeRect(18, y, width, 24);
    ctx.fillStyle = note.color;
    ctx.fillText(note.text, 28, y + 16);
    y += 30;
  }
}

function drawMiniMap() {
  const world = state.world;
  const mmW = DOM.miniMap.width;
  const mmH = DOM.miniMap.height;
  miniCtx.fillStyle = "#07121f";
  miniCtx.fillRect(0, 0, mmW, mmH);

  const sx = mmW / world.width;
  const sy = mmH / world.height;

  miniCtx.fillStyle = "rgba(100, 160, 190, 0.28)";
  for (const o of world.obstacles) {
    if (o.kind === "wall") miniCtx.fillRect(o.x * sx, o.y * sy, o.w * sx, o.h * sy);
  }

  for (const npc of world.npcs) {
    miniCtx.fillStyle = state.quest.talked.has(npc.id) ? "#10b981" : "#facc15";
    miniCtx.fillRect(npc.x * sx - 2, npc.y * sy - 2, 4, 4);
  }
  for (const walker of world.walkers) {
    miniCtx.fillStyle = "#94a3b8";
    miniCtx.fillRect(walker.x * sx - 1, walker.y * sy - 1, 2, 2);
  }
  miniCtx.fillStyle = "#ef4444";
  for (const enemy of world.enemies) {
    miniCtx.fillRect(enemy.x * sx - 1.2, enemy.y * sy - 1.2, 2.4, 2.4);
  }

  if (world.gate) {
    miniCtx.fillStyle = world.gate.open ? "#22c55e" : "#a855f7";
    miniCtx.fillRect(world.gate.x * sx - 3, world.gate.y * sy - 3, 6, 6);
  }

  miniCtx.fillStyle = "#67f0c8";
  miniCtx.fillRect(state.player.x * sx - 2.6, state.player.y * sy - 2.6, 5.2, 5.2);
}

function draw() {
  if (!state.world || !state.player) {
    ctx.fillStyle = "#020814";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    return;
  }

  const camX = state.camera.x;
  const camY = state.camera.y;
  drawTiles(camX, camY);
  drawDecor(camX, camY);
  drawGate(camX, camY);
  drawLoot(camX, camY);
  drawNpcs(camX, camY);
  drawEnemies(camX, camY);
  drawProjectiles(camX, camY);
  drawFx(camX, camY);
  drawPlayer(camX, camY);
  drawNotifications();
  drawMiniMap();
}

function isNear(entity, x, y, range) {
  return Math.hypot(entity.x - x, entity.y - y) <= range;
}

function buildNpcLine(npc) {
  const scene = state.currentScene;
  const context = scene.narrative.context || "Ce conflit demande une decision nuancee.";
  const statements = [
    `Dans ce niveau, ${scene.theme} pose un vrai conflit de valeurs.`,
    "Ce que tu as vecu en combat montre la pression du terrain: ressources, risques, urgence.",
    `Mon point de vue (${npc.role}) ne donne pas une verite unique, mais une lecture du meme monde.`
  ];
  return `${context} ${statements[npc.factionIndex % statements.length]}`;
}

function appendChatLine(text, author) {
  const line = document.createElement("div");
  line.className = `chat-line ${author === "player" ? "chat-player" : "chat-npc"}`;
  line.textContent = fixText(text);
  DOM.chatLog.appendChild(line);
  DOM.chatLog.scrollTop = DOM.chatLog.scrollHeight;
}

function generateNpcAnswer(npc, playerText) {
  const lower = playerText.toLowerCase();
  if (lower.includes("pourquoi") || lower.includes("why")) {
    return `${npc.name}: Parce que chaque option protege quelque chose et sacrifie autre chose. Ce n'est pas binaire.`;
  }
  if (lower.includes("preuve") || lower.includes("evidence") || lower.includes("faits")) {
    return `${npc.name}: Observe les zones autour de nous: ce que tu vois sur le terrain compte autant que les discours.`;
  }
  if (lower.includes("choix") || lower.includes("vote")) {
    return `${npc.name}: Ton vote final doit etre coherent avec ce que tu as ressenti, pas avec une reponse toute faite.`;
  }
  return `${npc.name}: Continue d'explorer, de combattre et d'ecouter les autres factions avant de trancher.`;
}

function openNpcChat(npc) {
  state.chatNpc = npc;
  state.overlay = "chat";
  DOM.chatPanel.classList.remove("hidden");
  DOM.chatName.textContent = `${npc.name} - ${npc.role}`;
  DOM.chatLog.innerHTML = "";
  appendChatLine(`${npc.name}: ${npc.bio}`, "npc");
  appendChatLine(buildNpcLine(npc), "npc");
  DOM.chatInput.value = "";
  DOM.chatInput.focus();

  if (!state.quest.talked.has(npc.id)) {
    state.quest.talked.add(npc.id);
    npc.spoken = true;
    spawnEliteForNpc(npc);
    addNotification(`Conseiller consulte: ${npc.name}.`, 2.2, "#67f0c8");
    updateHud();
    updateGuideText();
  }
}

function sendChatMessage() {
  if (state.overlay !== "chat" || !state.chatNpc) return;
  const raw = DOM.chatInput.value.trim();
  if (!raw) return;
  appendChatLine(raw, "player");
  appendChatLine(generateNpcAnswer(state.chatNpc, raw), "npc");
  DOM.chatInput.value = "";
}

function closeChat() {
  DOM.chatPanel.classList.add("hidden");
  state.overlay = null;
  state.chatNpc = null;
}

function openMerchant() {
  state.overlay = "merchant";
  DOM.merchantPanel.classList.remove("hidden");
}

function closeMerchant() {
  DOM.merchantPanel.classList.add("hidden");
  if (state.overlay === "merchant") state.overlay = null;
}

function buyPotion() {
  const p = state.player;
  if (p.gold < 25) {
    addNotification("Or insuffisant.", 1.9, "#ff8c8c");
    return;
  }
  p.gold -= 25;
  p.potions += 1;
  playSfx("itemUse", 0.5);
  addNotification("Potion achetee.", 1.9, "#67f0c8");
  updateHud();
}

function buyWeapon() {
  const p = state.player;
  const price = 80 + (p.weaponLevel - 1) * 30;
  if (p.gold < price) {
    addNotification("Or insuffisant.", 1.9, "#ff8c8c");
    return;
  }
  p.gold -= price;
  p.weaponLevel += 1;
  p.attack += 3;
  playSfx("itemUse", 0.6);
  addNotification(`Arme amelioree niveau ${p.weaponLevel}.`, 2.2, "#67f0c8");
  updateHud();
}

function buyArmor() {
  const p = state.player;
  const price = 70 + (p.armorLevel - 1) * 30;
  if (p.gold < price) {
    addNotification("Or insuffisant.", 1.9, "#ff8c8c");
    return;
  }
  p.gold -= price;
  p.armorLevel += 1;
  p.defense += 1;
  p.maxHp += 8;
  p.hp = Math.min(p.maxHp, p.hp + 8);
  playSfx("itemUse", 0.6);
  addNotification(`Armure amelioree niveau ${p.armorLevel}.`, 2.2, "#67f0c8");
  updateHud();
}

function usePotion() {
  const p = state.player;
  if (!p || p.potions <= 0) {
    addNotification("Aucune potion.", 1.5, "#ff8c8c");
    return;
  }
  if (p.hp >= p.maxHp && p.stamina >= p.maxStamina && p.mana >= p.maxMana) {
    addNotification("Ressources deja au maximum.", 1.5, "#ffc857");
    return;
  }
  p.potions -= 1;
  p.hp = Math.min(p.maxHp, p.hp + Math.round(p.maxHp * 0.4));
  p.stamina = Math.min(p.maxStamina, p.stamina + 35);
  p.mana = Math.min(p.maxMana, p.mana + 30);
  playSfx("itemUse", 0.55);
  addNotification("Potion utilisee: vie, stamina et mana recuperees.", 1.8, "#67f0c8");
  updateHud();
}

function openVotePanel() {
  const scene = state.currentScene;
  state.overlay = "vote";
  DOM.votePanel.classList.remove("hidden");
  DOM.voteDilemma.textContent = scene.narrative.context || `Dilemme du niveau: ${scene.theme}`;
  DOM.voteJustification.value = "";
  DOM.voteOptions.innerHTML = "";

  let exits = Array.isArray(scene.exits) ? scene.exits : [];
  if (!exits.length && scene.narrative && Array.isArray(scene.narrative.exits)) exits = scene.narrative.exits;
  if (!exits.length) exits = [{ id: "A", description: "Option A" }, { id: "B", description: "Option B" }];

  state.voteChoice = null;
  exits.forEach((exit, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "vote-option";
    button.textContent = `${exit.id} - ${fixText(exit.description || "Option")}`;
    button.addEventListener("click", () => {
      state.voteChoice = { ...exit, index };
      for (const node of DOM.voteOptions.querySelectorAll(".vote-option")) {
        node.classList.remove("selected");
      }
      button.classList.add("selected");
    });
    DOM.voteOptions.appendChild(button);
  });
}

function closeVotePanel() {
  DOM.votePanel.classList.add("hidden");
  if (state.overlay === "vote") state.overlay = null;
}

function advanceToNextScene(preferredTargetId) {
  const currentIdx = state.sceneOrder.indexOf(state.currentScene.id);
  let nextId = null;
  if (preferredTargetId && state.scenes[preferredTargetId] && preferredTargetId !== "level_0") nextId = preferredTargetId;
  if (!nextId) {
    const nextIdx = currentIdx + 1;
    if (nextIdx < state.sceneOrder.length) nextId = state.sceneOrder[nextIdx];
  }
  if (!nextId) {
    addNotification("Campagne terminee. Bravo mediateur.", 4, "#67f0c8");
    return;
  }
  loadSceneById(nextId, true);
}

function submitVote() {
  if (!state.voteChoice) {
    addNotification("Choisis une option avant de valider.", 2.2, "#ff8c8c");
    return;
  }
  const justification = DOM.voteJustification.value.trim();
  if (justification.length < 20) {
    addNotification("Justification trop courte (20+ caracteres).", 2.4, "#ff8c8c");
    return;
  }

  state.history.push({
    sceneId: state.currentScene.id,
    choiceId: state.voteChoice.id,
    target: state.voteChoice.target || null,
    justification,
    timestamp: Date.now()
  });
  closeVotePanel();
  addNotification("Vote enregistre. Transition en cours...", 2.8, "#67f0c8");
  advanceToNextScene(state.voteChoice.target || null);
}

function interactionAction() {
  if (!state.world || !state.player) return;

  if (state.overlay === "chat") {
    closeChat();
    return;
  }
  if (state.overlay === "merchant") {
    closeMerchant();
    return;
  }
  if (state.overlay === "vote") return;

  const p = state.player;
  const merchant = state.world.merchants.find((m) => isNear(m, p.x, p.y, 78));
  if (merchant) {
    openMerchant();
    return;
  }

  const talkable = state.world.npcs.find((npc) => isNear(npc, p.x, p.y, 82));
  if (talkable) {
    openNpcChat(talkable);
    return;
  }

  const gate = state.world.gate;
  if (gate && Math.hypot(p.x - gate.x, p.y - gate.y) < 88) {
    updateGateState();
    if (state.quest.voteUnlocked) openVotePanel();
    else addNotification("Parle aux 3 conseillers et stabilise les 3 zones avant le vote.", 3.1, "#ffc857");
  }
}

function processInputEvents(event, isDown) {
  if (isDown) state.keysDown.add(event.code);
  else state.keysDown.delete(event.code);
  if (!isDown) return;

  if (event.code === "KeyP") {
    if (state.overlay === "pause") togglePause(false);
    else if (!state.overlay) togglePause(true);
    event.preventDefault();
    return;
  }

  if (state.mode !== "running") return;

  const now = performance.now() / 1000;
  if (event.code === "KeyE") {
    interactionAction();
    event.preventDefault();
  } else if (event.code === "Digit1" && !state.overlay) {
    usePotion();
    event.preventDefault();
  } else if (event.code === "KeyF" && !state.overlay) {
    useSkill1(now);
    event.preventDefault();
  } else if (event.code === "KeyR" && !state.overlay) {
    useSkill2(now);
    event.preventDefault();
  }
}

function updateGateAndObjective() {
  updateGateState();
  updateHud();
  updateGuideText();
}

function tick(nowMs) {
  const dt = Math.min(0.033, (nowMs - state.lastTime) / 1000);
  state.lastTime = nowMs;

  if (state.mode === "running" && state.world && state.player) {
    if (!state.paused) {
      const now = nowMs / 1000;
      if (!state.overlay) {
        updatePlayer(dt, now);
        updateEnemies(dt, now);
        updateWalkers(dt);
        updateProjectiles(dt, now);
        updateFx(dt);
        updateLoot(dt);
      }
      regenResources(dt, now);
      updateGateAndObjective();
    }
    updateCamera();
    updateNotifications(dt);
    draw();
  } else {
    updateNotifications(dt);
    draw();
  }

  requestAnimationFrame(tick);
}

function setupEvents() {
  window.addEventListener("resize", resizeCanvasToViewport);
  document.addEventListener("keydown", (event) => processInputEvents(event, true));
  document.addEventListener("keyup", (event) => processInputEvents(event, false));

  DOM.startBtn.addEventListener("click", () => {
    if (!state.selectedClassId || !state.selectedHeroId) return;
    playSfx("uiClick", 0.4);
    startGameAtScene("level_1");
  });

  DOM.chatSend.addEventListener("click", sendChatMessage);
  DOM.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendChatMessage();
  });
  DOM.chatClose.addEventListener("click", closeChat);

  DOM.voteCancel.addEventListener("click", closeVotePanel);
  DOM.voteSubmit.addEventListener("click", submitVote);

  DOM.merchantClose.addEventListener("click", closeMerchant);
  DOM.buyPotion.addEventListener("click", buyPotion);
  DOM.buyWeapon.addEventListener("click", buyWeapon);
  DOM.buyArmor.addEventListener("click", buyArmor);

  DOM.toggleAudio.addEventListener("click", () => {
    state.audioEnabled = !state.audioEnabled;
    DOM.toggleAudio.textContent = `Musique: ${state.audioEnabled ? "ON" : "OFF"}`;
    playSfx("uiClick", 0.4);
  });

  DOM.guideButton.addEventListener("click", openGuide);
  DOM.guideClose.addEventListener("click", () => DOM.guidePanel.classList.add("hidden"));
}

async function init() {
  resizeCanvasToViewport();
  setupEvents();
  createClassSelectionUI();
  await preloadAssets();
  await loadScenarioData();
  addNotification("Choisis ton personnage puis ta classe pour commencer.", 4.4, "#67f0c8");
  requestAnimationFrame(tick);
}

init();

window.actionRpgMode = {
  state,
  startAt(sceneId) {
    if (!state.selectedClassId) state.selectedClassId = "warrior";
    if (!state.selectedHeroId) state.selectedHeroId = HERO_PRESETS[0].id;
    if (state.mode === "class") startGameAtScene(sceneId || "level_1");
    else loadSceneById(sceneId || "level_1", true);
  }
};



