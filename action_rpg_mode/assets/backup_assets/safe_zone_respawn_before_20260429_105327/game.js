
const TILE_SIZE = 48;
const DEFAULT_WORLD_TILES = { w: 92, h: 58 };
const MAX_ENEMIES = 120;
const ASSET_VERSION = "20260429_village_zones1";

const RESOURCE_RULES = {
  runStaminaPerSecond: 24,
  basicStamina: { warrior: 10, mage: 0, hunter: 9 },
  basicMana: { warrior: 0, mage: 7, hunter: 0 },
  skillStamina: { warrior: { skill1: 15, skill2: 24 }, mage: { skill1: 0, skill2: 0 }, hunter: { skill1: 13, skill2: 22 } },
  skill1Mana: { warrior: 16, mage: 20, hunter: 15 },
  skill2Mana: { warrior: 26, mage: 34, hunter: 24 }
};

const CLASS_DEFS = {
  warrior: {
    id: "warrior",
    name: "Guerrier",
    desc: "Epee + bouclier. Solide au corps a corps.",
    icon: "./assets/sprite_frames/player/warrior/walk/down/01.png",
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
    icon: "./assets/sprite_frames/player/mage/walk/down/01.png",
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
    icon: "./assets/sprite_frames/player/hunter/walk/down/01.png",
    baseHp: 120,
    baseAttack: 16,
    baseDefense: 3,
    speed: 172,
    color: "#7de57f",
    basicKind: "projectile"
  }
};

const HERO_PRESETS = [
  { id: "ayla", label: "Ayla", color: "#33c4ff", icon: "./assets/profiles/hero_ayla.svg" },
  { id: "noah", label: "Noah", color: "#ffd166", icon: "./assets/profiles/hero_noah.svg" },
  { id: "mina", label: "Mina", color: "#6ee7b7", icon: "./assets/profiles/hero_mina.svg" },
  { id: "iris", label: "Iris", color: "#9ca3ff", icon: "./assets/profiles/hero_iris.svg" },
  { id: "kai", label: "Kai", color: "#f97316", icon: "./assets/profiles/hero_kai.svg" },
  { id: "nora", label: "Nora", color: "#f472b6", icon: "./assets/profiles/hero_nora.svg" }
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
  gate: "../assets/buildings_space/building_space_gate_large.png",
  chest: "../assets/downloaded assets folders/sprites/objects/chest_02.png",
  rockWater: "../assets/downloaded assets folders/sprites/objects/rock_in_water_02.png",
  rockWaterAlt: "../assets/downloaded assets folders/sprites/objects/rock_in_water_05.png"
};

const GENERATED_PROP_IMAGE_PATHS = {
  tree: "./assets/generated_props/nature_tree_pine.png",
  treeBroad: "./assets/generated_props/nature_tree_pine.png",
  stoneCircle: "./assets/generated_props/nature_stone_circle.png",
  houseSmall: "./assets/generated_props/nature_small_house.png",
  shrine: "./assets/generated_props/nature_house_shrine.png",
  ore: "./assets/generated_props/mine_rocks_block.png",
  oreBlue: "./assets/generated_props/mine_rocks_block.png",
  oreGold: "./assets/generated_props/mine_rubble_pile.png",
  rock: "./assets/generated_props/mine_rubble_pile.png",
  mineCart: "./assets/generated_props/mine_cart_rails.png",
  terminal: "./assets/generated_props/labo_terminal_desk.png",
  antenna: "./assets/generated_props/labo_server_rack.png",
  solar: "./assets/generated_props/labo_control_station.png",
  energyPillar: "./assets/generated_props/labo_med_terminal.png",
  boat: "./assets/generated_props/port_fishing_boat.png",
  rowboat: "./assets/generated_props/port_rowboat.png",
  dock: "./assets/generated_props/port_dock_small.png"
};

// REGION_ASSETS_START
const REGION_PROP_IMAGE_PATHS = {
  "village_house_small": "./assets/region_assets/props/village_buildings/village_house_small.png",
  "village_house_chimney": "./assets/region_assets/props/village_buildings/village_house_chimney.png",
  "village_cottage_thatched": "./assets/region_assets/props/village_buildings/village_cottage_thatched.png",
  "village_blacksmith": "./assets/region_assets/props/village_buildings/village_blacksmith.png",
  "village_tavern": "./assets/region_assets/props/village_buildings/village_tavern.png",
  "village_general_store": "./assets/region_assets/props/village_buildings/village_general_store.png",
  "village_stable": "./assets/region_assets/props/village_buildings/village_stable.png",
  "village_well_roof": "./assets/region_assets/props/village_buildings/village_well_roof.png",
  "village_barn": "./assets/region_assets/props/village_buildings/village_barn.png",
  "village_windmill": "./assets/region_assets/props/village_buildings/village_windmill.png",
  "village_garden_hut": "./assets/region_assets/props/village_buildings/village_garden_hut.png",
  "village_notice_board": "./assets/region_assets/props/village_buildings/village_notice_board.png",
  "village_cart": "./assets/region_assets/props/village_props/village_cart.png",
  "village_barrel_stack": "./assets/region_assets/props/village_props/village_barrel_stack.png",
  "village_crate_stack": "./assets/region_assets/props/village_props/village_crate_stack.png",
  "village_market_stall": "./assets/region_assets/props/village_props/village_market_stall.png",
  "village_bench": "./assets/region_assets/props/village_props/village_bench.png",
  "village_lamp_post": "./assets/region_assets/props/village_props/village_lamp_post.png",
  "village_signpost": "./assets/region_assets/props/village_props/village_signpost.png",
  "village_water_trough": "./assets/region_assets/props/village_props/village_water_trough.png",
  "village_chopping_block": "./assets/region_assets/props/village_props/village_chopping_block.png",
  "village_sacks": "./assets/region_assets/props/village_props/village_sacks.png",
  "village_flower_planter": "./assets/region_assets/props/village_props/village_flower_planter.png",
  "village_fence_gate": "./assets/region_assets/props/village_props/village_fence_gate.png",
  "port_dock_section": "./assets/region_assets/props/port/port_dock_section.png",
  "port_warehouse": "./assets/region_assets/props/port/port_warehouse.png",
  "port_fish_market_stall": "./assets/region_assets/props/port/port_fish_market_stall.png",
  "port_boat_repair_shed": "./assets/region_assets/props/port/port_boat_repair_shed.png",
  "port_lighthouse": "./assets/region_assets/props/port/port_lighthouse.png",
  "port_mooring_posts": "./assets/region_assets/props/port/port_mooring_posts.png",
  "port_crane_hoist": "./assets/region_assets/props/port/port_crane_hoist.png",
  "port_fishing_boat": "./assets/region_assets/props/port/port_fishing_boat.png",
  "port_rowboat": "./assets/region_assets/props/port/port_rowboat.png",
  "port_fishing_nets": "./assets/region_assets/props/port/port_fishing_nets.png",
  "port_cargo_stack": "./assets/region_assets/props/port/port_cargo_stack.png",
  "port_harbor_office": "./assets/region_assets/props/port/port_harbor_office.png",
  "mine_entrance": "./assets/region_assets/props/mine/mine_entrance.png",
  "mine_cart_prop": "./assets/region_assets/props/mine/mine_cart_prop.png",
  "mine_rail_segment": "./assets/region_assets/props/mine/mine_rail_segment.png",
  "mine_pickaxe_rack": "./assets/region_assets/props/mine/mine_pickaxe_rack.png",
  "mine_ore_pile": "./assets/region_assets/props/mine/mine_ore_pile.png",
  "mine_crystal_ore_node": "./assets/region_assets/props/mine/mine_crystal_ore_node.png",
  "mine_support_beam": "./assets/region_assets/props/mine/mine_support_beam.png",
  "mine_lantern_post": "./assets/region_assets/props/mine/mine_lantern_post.png",
  "mine_supply_crates": "./assets/region_assets/props/mine/mine_supply_crates.png",
  "mine_rope_winch": "./assets/region_assets/props/mine/mine_rope_winch.png",
  "mine_lift_platform": "./assets/region_assets/props/mine/mine_lift_platform.png",
  "mine_workbench": "./assets/region_assets/props/mine/mine_workbench.png",
  "forest_large_magical_tree": "./assets/region_assets/props/forest_large/forest_large_magical_tree.png",
  "forest_twisted_glowing_tree": "./assets/region_assets/props/forest_large/forest_twisted_glowing_tree.png",
  "forest_fairy_mushroom_house": "./assets/region_assets/props/forest_large/forest_fairy_mushroom_house.png",
  "forest_rune_stone_large": "./assets/region_assets/props/forest_large/forest_rune_stone_large.png",
  "forest_glowing_crystal_cluster": "./assets/region_assets/props/forest_large/forest_glowing_crystal_cluster.png",
  "forest_ancient_arch": "./assets/region_assets/props/forest_large/forest_ancient_arch.png",
  "forest_magical_shrine": "./assets/region_assets/props/forest_large/forest_magical_shrine.png",
  "forest_enchanted_stump": "./assets/region_assets/props/forest_large/forest_enchanted_stump.png",
  "forest_vine_monolith": "./assets/region_assets/props/forest_large/forest_vine_monolith.png",
  "forest_luminous_flower_patch_large": "./assets/region_assets/props/forest_large/forest_luminous_flower_patch_large.png",
  "forest_magical_pond": "./assets/region_assets/props/forest_large/forest_magical_pond.png",
  "forest_portal_stone_circle": "./assets/region_assets/props/forest_large/forest_portal_stone_circle.png",
  "forest_glowing_mushroom_cluster": "./assets/region_assets/props/forest_small/forest_glowing_mushroom_cluster.png",
  "forest_lantern_plant": "./assets/region_assets/props/forest_small/forest_lantern_plant.png",
  "forest_small_rune_stone": "./assets/region_assets/props/forest_small/forest_small_rune_stone.png",
  "forest_enchanted_bush": "./assets/region_assets/props/forest_small/forest_enchanted_bush.png",
  "forest_fairy_signpost": "./assets/region_assets/props/forest_small/forest_fairy_signpost.png",
  "forest_vine_log": "./assets/region_assets/props/forest_small/forest_vine_log.png",
  "forest_crystal_plant": "./assets/region_assets/props/forest_small/forest_crystal_plant.png",
  "forest_floating_candle_altar": "./assets/region_assets/props/forest_small/forest_floating_candle_altar.png",
  "forest_spell_totem": "./assets/region_assets/props/forest_small/forest_spell_totem.png",
  "forest_magical_herb_patch": "./assets/region_assets/props/forest_small/forest_magical_herb_patch.png",
  "forest_fae_mailbox": "./assets/region_assets/props/forest_small/forest_fae_mailbox.png",
  "forest_luminous_root_cluster": "./assets/region_assets/props/forest_small/forest_luminous_root_cluster.png"
};

const REGION_TILE_IMAGE_PATHS = {
  "village": {
    "floor": [
      "./assets/region_assets/tiles/village/00_grass_var_a.png",
      "./assets/region_assets/tiles/village/01_grass_var_b.png",
      "./assets/region_assets/tiles/village/02_grass_var_c.png",
      "./assets/region_assets/tiles/village/03_grass_var_d.png",
      "./assets/region_assets/tiles/village/04_dirt_var_a.png",
      "./assets/region_assets/tiles/village/05_dirt_var_b.png",
      "./assets/region_assets/tiles/village/06_dirt_var_c.png",
      "./assets/region_assets/tiles/village/07_dirt_var_d.png",
      "./assets/region_assets/tiles/village/48_flowers_grass_tile.png",
      "./assets/region_assets/tiles/village/49_grass_tile.png",
      "./assets/region_assets/tiles/village/56_grass_tile.png",
      "./assets/region_assets/tiles/village/57_grass_tile.png"
    ],
    "floorAlt": [
      "./assets/region_assets/tiles/village/32_full_paved_tile.png",
      "./assets/region_assets/tiles/village/39_full_paved_tile_circular_pattern.png",
      "./assets/region_assets/tiles/village/40_wood_floorboard.png",
      "./assets/region_assets/tiles/village/41_wooden_planks.png",
      "./assets/region_assets/tiles/village/42_wood_floorboard_planks_north-south.png",
      "./assets/region_assets/tiles/village/43_wood_floorboard_other_pattern.png",
      "./assets/region_assets/tiles/village/50_hay_tile.png",
      "./assets/region_assets/tiles/village/51_old_planks_floorboard_mossy.png",
      "./assets/region_assets/tiles/village/52_dirt_tile_field.png",
      "./assets/region_assets/tiles/village/53_dirt_tile_field_with-plants.png",
      "./assets/region_assets/tiles/village/54_dirt_with_plants_field.png",
      "./assets/region_assets/tiles/village/55_wood_fence_field_north-south_east-side-alligned.png",
      "./assets/region_assets/tiles/village/58_dirt_tile.png",
      "./assets/region_assets/tiles/village/59_dirt_tile.png"
    ],
    "path": [
      "./assets/region_assets/tiles/village/08_path_horizontal.png",
      "./assets/region_assets/tiles/village/09_path_vertical.png",
      "./assets/region_assets/tiles/village/10_path_corner_a.png",
      "./assets/region_assets/tiles/village/11_path_corner_b.png",
      "./assets/region_assets/tiles/village/16_grass_dirt_road_east-west.png",
      "./assets/region_assets/tiles/village/17_grass_dirt_road_north-south.png",
      "./assets/region_assets/tiles/village/28_grass_dirt_road_south-north.png",
      "./assets/region_assets/tiles/village/29_grass_dirt_road_east_west.png",
      "./assets/region_assets/tiles/village/32_full_paved_tile.png",
      "./assets/region_assets/tiles/village/33_paved_road_east-west.png",
      "./assets/region_assets/tiles/village/34_paved_road_north-south.png",
      "./assets/region_assets/tiles/village/40_wood_floorboard.png",
      "./assets/region_assets/tiles/village/41_wooden_planks.png",
      "./assets/region_assets/tiles/village/42_wood_floorboard_planks_north-south.png",
      "./assets/region_assets/tiles/village/43_wood_floorboard_other_pattern.png",
      "./assets/region_assets/tiles/village/60_paved_road_east-to.grass_transition.png",
      "./assets/region_assets/tiles/village/61_paved_south_east_grass_northwest-corner.png"
    ],
    "wall": [
      "./assets/region_assets/tiles/village/44_wooden_fence_east-west.png",
      "./assets/region_assets/tiles/village/45_wood_fence_north_south.png",
      "./assets/region_assets/tiles/village/46_wood_fence_south_west_corner_L-shape.png",
      "./assets/region_assets/tiles/village/47_wood_fence_door_east-west.png",
      "./assets/region_assets/tiles/village/55_wood_fence_field_north-south_east-side-alligned.png"
    ],
    "water": [
      "./assets/region_assets/tiles/village/00_grass_var_a.png",
      "./assets/region_assets/tiles/village/01_grass_var_b.png",
      "./assets/region_assets/tiles/village/02_grass_var_c.png",
      "./assets/region_assets/tiles/village/03_grass_var_d.png"
    ]
  },
  "port": {
    "water": [
      "./assets/region_assets/tiles/port/00_deep_water_dark_a.png",
      "./assets/region_assets/tiles/port/01_deep_water_dark_b.png",
      "./assets/region_assets/tiles/port/02_deep_water_dark_c.png",
      "./assets/region_assets/tiles/port/03_deep_water_dark_d.png",
      "./assets/region_assets/tiles/port/04_deep_water_foam.png",
      "./assets/region_assets/tiles/port/05_shallow_water_a.png",
      "./assets/region_assets/tiles/port/06_shallow_reef_water_a.png",
      "./assets/region_assets/tiles/port/07_shallow_reef_water_b.png",
      "./assets/region_assets/tiles/port/08_shallow_water_foam_a.png",
      "./assets/region_assets/tiles/port/09_shallow_water_foam_b.png",
      "./assets/region_assets/tiles/port/10_shallow_water_green_a.png",
      "./assets/region_assets/tiles/port/11_deep_to_shallow_water.png",
      "./assets/region_assets/tiles/port/12_seaweed_water_edge_a.png",
      "./assets/region_assets/tiles/port/13_seaweed_water_edge_b.png",
      "./assets/region_assets/tiles/port/40_water_with_small_platform.png"
    ],
    "floor": [
      "./assets/region_assets/tiles/port/14_wet_sand_shore_a.png",
      "./assets/region_assets/tiles/port/15_wet_sand_shore_b.png",
      "./assets/region_assets/tiles/port/16_beach_water_edge_a.png",
      "./assets/region_assets/tiles/port/17_beach_water_edge_b.png",
      "./assets/region_assets/tiles/port/18_beach_water_edge_c.png",
      "./assets/region_assets/tiles/port/19_beach_corner_water_edge.png",
      "./assets/region_assets/tiles/port/56_seaweed_on_sand.png",
      "./assets/region_assets/tiles/port/57_shells_on_sand.png",
      "./assets/region_assets/tiles/port/58_tide_pool_sand.png",
      "./assets/region_assets/tiles/port/59_pebble_sand.png",
      "./assets/region_assets/tiles/port/60_wet_stone_puddles.png"
    ],
    "floorAlt": [
      "./assets/region_assets/tiles/port/20_stone_quay_plain.png",
      "./assets/region_assets/tiles/port/21_stone_quay_with_plank_edge.png",
      "./assets/region_assets/tiles/port/48_cargo_crate_floor.png",
      "./assets/region_assets/tiles/port/49_fish_crate_market_floor.png",
      "./assets/region_assets/tiles/port/50_barrels_and_cargo_crates.png",
      "./assets/region_assets/tiles/port/51_open_barrel_cargo.png",
      "./assets/region_assets/tiles/port/52_stone_quay_plain_b.png",
      "./assets/region_assets/tiles/port/53_circular_stone_quay.png",
      "./assets/region_assets/tiles/port/54_stone_quay_wood_edge.png",
      "./assets/region_assets/tiles/port/61_broken_stone_water_edge.png",
      "./assets/region_assets/tiles/port/62_dock_debris.png",
      "./assets/region_assets/tiles/port/63_plank_debris_floor.png"
    ],
    "path": [
      "./assets/region_assets/tiles/port/20_stone_quay_plain.png",
      "./assets/region_assets/tiles/port/21_stone_quay_with_plank_edge.png",
      "./assets/region_assets/tiles/port/22_wooden_dock_planks_horizontal.png",
      "./assets/region_assets/tiles/port/24_weathered_dock_planks_horizontal.png",
      "./assets/region_assets/tiles/port/25_vertical_wood_planks.png",
      "./assets/region_assets/tiles/port/26_dock_with_round_posts_horizontal.png",
      "./assets/region_assets/tiles/port/30_vertical_wood_dock.png",
      "./assets/region_assets/tiles/port/31_vertical_wood_dock_water_edge.png",
      "./assets/region_assets/tiles/port/32_dock_water_edge_horizontal.png",
      "./assets/region_assets/tiles/port/34_dock_edge_with_posts.png",
      "./assets/region_assets/tiles/port/36_dock_planks_plain.png",
      "./assets/region_assets/tiles/port/37_stone_quay_rope_edge.png",
      "./assets/region_assets/tiles/port/38_coiled_rope_on_dock.png",
      "./assets/region_assets/tiles/port/43_dock_post_plank_edge.png",
      "./assets/region_assets/tiles/port/55_worn_wood_plank_floor.png",
      "./assets/region_assets/tiles/port/63_plank_debris_floor.png"
    ],
    "wall": [
      "./assets/region_assets/tiles/port/20_stone_quay_plain.png",
      "./assets/region_assets/tiles/port/21_stone_quay_with_plank_edge.png",
      "./assets/region_assets/tiles/port/52_stone_quay_plain_b.png",
      "./assets/region_assets/tiles/port/53_circular_stone_quay.png",
      "./assets/region_assets/tiles/port/54_stone_quay_wood_edge.png"
    ]
  },
  "mine": {
    "floor": [
      "./assets/region_assets/tiles/mine/00_rocky_floor_a.png",
      "./assets/region_assets/tiles/mine/01_dark_gravel_floor.png",
      "./assets/region_assets/tiles/mine/02_cracked_stone_floor.png",
      "./assets/region_assets/tiles/mine/03_pebble_stone_floor.png",
      "./assets/region_assets/tiles/mine/08_dirt_cave_wall_edge.png",
      "./assets/region_assets/tiles/mine/31_stone_pile_floor.png",
      "./assets/region_assets/tiles/mine/32_lantern_light_floor.png",
      "./assets/region_assets/tiles/mine/37_light_stone_floor.png",
      "./assets/region_assets/tiles/mine/38_cracked_rock_detail.png",
      "./assets/region_assets/tiles/mine/39_dark_rock_detail.png",
      "./assets/region_assets/tiles/mine/54_mixed_mine_floor_a.png",
      "./assets/region_assets/tiles/mine/55_mixed_mine_floor_b.png",
      "./assets/region_assets/tiles/mine/56_green_ore_floor.png",
      "./assets/region_assets/tiles/mine/57_orange_ore_floor.png",
      "./assets/region_assets/tiles/mine/58_white_ore_floor.png",
      "./assets/region_assets/tiles/mine/59_blue_ore_floor.png"
    ],
    "floorAlt": [
      "./assets/region_assets/tiles/mine/04_cave_wall_top_a.png",
      "./assets/region_assets/tiles/mine/05_cave_wall_top_b.png",
      "./assets/region_assets/tiles/mine/06_cave_wall_corner_a.png",
      "./assets/region_assets/tiles/mine/07_cave_wall_corner_b.png",
      "./assets/region_assets/tiles/mine/10_cave_wall_round_corner_a.png",
      "./assets/region_assets/tiles/mine/11_cave_wall_round_corner_b.png",
      "./assets/region_assets/tiles/mine/40_green_crystal_detail.png",
      "./assets/region_assets/tiles/mine/41_purple_crystal_detail.png",
      "./assets/region_assets/tiles/mine/42_red_crystal_detail.png",
      "./assets/region_assets/tiles/mine/43_blue_crystal_detail.png",
      "./assets/region_assets/tiles/mine/44_white_ore_detail.png",
      "./assets/region_assets/tiles/mine/45_gold_ore_detail.png",
      "./assets/region_assets/tiles/mine/46_blue_crystal_floor_detail.png",
      "./assets/region_assets/tiles/mine/47_purple_crystal_floor_detail.png",
      "./assets/region_assets/tiles/mine/60_cracked_mine_wall_a.png",
      "./assets/region_assets/tiles/mine/61_gravel_mine_wall_b.png",
      "./assets/region_assets/tiles/mine/62_dark_mine_wall_c.png",
      "./assets/region_assets/tiles/mine/63_mossy_mine_wall_d.png"
    ],
    "path": [
      "./assets/region_assets/tiles/mine/12_wooden_support_floor.png",
      "./assets/region_assets/tiles/mine/13_rail_base_horizontal.png",
      "./assets/region_assets/tiles/mine/14_rail_base_vertical.png",
      "./assets/region_assets/tiles/mine/15_rail_curve_base.png",
      "./assets/region_assets/tiles/mine/16_rail_grid_base.png",
      "./assets/region_assets/tiles/mine/17_rail_cross_base.png",
      "./assets/region_assets/tiles/mine/18_rail_horizontal_broken.png",
      "./assets/region_assets/tiles/mine/19_rail_vertical_with_planks.png",
      "./assets/region_assets/tiles/mine/20_rail_corner_with_ore.png",
      "./assets/region_assets/tiles/mine/21_rail_corner_crystal.png",
      "./assets/region_assets/tiles/mine/22_ore_rocks_floor.png",
      "./assets/region_assets/tiles/mine/23_coal_patch_floor.png",
      "./assets/region_assets/tiles/mine/24_broken_rail_stones_a.png",
      "./assets/region_assets/tiles/mine/25_broken_rail_stones_b.png",
      "./assets/region_assets/tiles/mine/26_wood_plank_path_a.png",
      "./assets/region_assets/tiles/mine/27_lantern_wood_plank.png",
      "./assets/region_assets/tiles/mine/34_dirt_stone_transition.png",
      "./assets/region_assets/tiles/mine/35_stone_wood_transition.png",
      "./assets/region_assets/tiles/mine/36_gravel_stone_path.png",
      "./assets/region_assets/tiles/mine/50_rail_detail_blue.png",
      "./assets/region_assets/tiles/mine/51_rail_detail_light_blue.png",
      "./assets/region_assets/tiles/mine/52_support_detail_orange.png",
      "./assets/region_assets/tiles/mine/53_support_detail_gold.png"
    ],
    "wall": [
      "./assets/region_assets/tiles/mine/04_cave_wall_top_a.png",
      "./assets/region_assets/tiles/mine/05_cave_wall_top_b.png",
      "./assets/region_assets/tiles/mine/06_cave_wall_corner_a.png",
      "./assets/region_assets/tiles/mine/07_cave_wall_corner_b.png",
      "./assets/region_assets/tiles/mine/08_dirt_cave_wall_edge.png",
      "./assets/region_assets/tiles/mine/09_dark_cave_wall_edge.png",
      "./assets/region_assets/tiles/mine/10_cave_wall_round_corner_a.png",
      "./assets/region_assets/tiles/mine/11_cave_wall_round_corner_b.png",
      "./assets/region_assets/tiles/mine/60_cracked_mine_wall_a.png",
      "./assets/region_assets/tiles/mine/61_gravel_mine_wall_b.png",
      "./assets/region_assets/tiles/mine/62_dark_mine_wall_c.png",
      "./assets/region_assets/tiles/mine/63_mossy_mine_wall_d.png"
    ],
    "water": [
      "./assets/region_assets/tiles/mine/00_rocky_floor_a.png",
      "./assets/region_assets/tiles/mine/01_dark_gravel_floor.png",
      "./assets/region_assets/tiles/mine/02_cracked_stone_floor.png",
      "./assets/region_assets/tiles/mine/03_pebble_stone_floor.png"
    ]
  },
  "forest": {
    "floor": [
      "./assets/region_assets/tiles/forest/00_lush_grass_flowers_a.png",
      "./assets/region_assets/tiles/forest/01_dark_lush_grass_flowers.png",
      "./assets/region_assets/tiles/forest/02_mossy_grass_a.png",
      "./assets/region_assets/tiles/forest/03_magical_glow_grass.png",
      "./assets/region_assets/tiles/forest/19_white_flowers_grass.png",
      "./assets/region_assets/tiles/forest/20_pink_flowers_grass.png",
      "./assets/region_assets/tiles/forest/21_blue_flowers_grass.png",
      "./assets/region_assets/tiles/forest/22_orange_flowers_grass.png",
      "./assets/region_assets/tiles/forest/23_mixed_flowers_grass.png",
      "./assets/region_assets/tiles/forest/32_magical_leaf_ground.png",
      "./assets/region_assets/tiles/forest/33_enchanted_leaf_ground.png",
      "./assets/region_assets/tiles/forest/56_blue_magic_flame.png",
      "./assets/region_assets/tiles/forest/57_green_magic_symbol.png"
    ],
    "floorAlt": [
      "./assets/region_assets/tiles/forest/12_mossy_stone_plain.png",
      "./assets/region_assets/tiles/forest/13_mossy_stone_variation.png",
      "./assets/region_assets/tiles/forest/14_mossy_stone_rune.png",
      "./assets/region_assets/tiles/forest/15_mossy_stone_cross.png",
      "./assets/region_assets/tiles/forest/24_purple_mushrooms.png",
      "./assets/region_assets/tiles/forest/25_blue_mushrooms.png",
      "./assets/region_assets/tiles/forest/26_orange_glow_mushrooms.png",
      "./assets/region_assets/tiles/forest/27_cyan_crystal_cluster.png",
      "./assets/region_assets/tiles/forest/28_purple_crystal_cluster.png",
      "./assets/region_assets/tiles/forest/29_green_crystal_cluster.png",
      "./assets/region_assets/tiles/forest/30_blue_crystal_plant.png",
      "./assets/region_assets/tiles/forest/31_pink_crystal_plant.png",
      "./assets/region_assets/tiles/forest/34_root_stump_floor.png",
      "./assets/region_assets/tiles/forest/35_dark_soft_glow_floor.png",
      "./assets/region_assets/tiles/forest/36_root_tangle_floor.png",
      "./assets/region_assets/tiles/forest/37_vine_pattern_floor.png",
      "./assets/region_assets/tiles/forest/38_violet_flower_vines.png",
      "./assets/region_assets/tiles/forest/39_water_grass_edge.png",
      "./assets/region_assets/tiles/forest/46_glowing_waterfall_detail.png",
      "./assets/region_assets/tiles/forest/47_enchanted_waterfall_edge.png",
      "./assets/region_assets/tiles/forest/58_golden_magic_spiral.png",
      "./assets/region_assets/tiles/forest/59_pink_magic_sparks.png",
      "./assets/region_assets/tiles/forest/60_yellow_fireflies.png",
      "./assets/region_assets/tiles/forest/61_blue_butterfly_glow.png",
      "./assets/region_assets/tiles/forest/62_purple_magic_flowers.png",
      "./assets/region_assets/tiles/forest/63_cyan_portal_glow.png"
    ],
    "path": [
      "./assets/region_assets/tiles/forest/04_forest_path_vertical.png",
      "./assets/region_assets/tiles/forest/05_forest_path_horizontal.png",
      "./assets/region_assets/tiles/forest/06_forest_path_corner.png",
      "./assets/region_assets/tiles/forest/07_forest_path_t_junction.png",
      "./assets/region_assets/tiles/forest/08_forest_path_corner_b.png",
      "./assets/region_assets/tiles/forest/09_grass_path_transition_diagonal.png",
      "./assets/region_assets/tiles/forest/10_path_horizontal_b.png",
      "./assets/region_assets/tiles/forest/11_path_vertical_b.png",
      "./assets/region_assets/tiles/forest/16_root_ground_a.png",
      "./assets/region_assets/tiles/forest/17_leafy_root_ground.png",
      "./assets/region_assets/tiles/forest/18_magical_root_ground.png",
      "./assets/region_assets/tiles/forest/52_spiral_path_edge.png",
      "./assets/region_assets/tiles/forest/53_purple_path_rune.png"
    ],
    "water": [
      "./assets/region_assets/tiles/forest/40_forest_pond_a.png",
      "./assets/region_assets/tiles/forest/41_glowing_forest_pond.png",
      "./assets/region_assets/tiles/forest/42_magical_green_pool.png",
      "./assets/region_assets/tiles/forest/43_forest_water_edge.png",
      "./assets/region_assets/tiles/forest/44_root_water_detail.png",
      "./assets/region_assets/tiles/forest/45_root_water_edge.png",
      "./assets/region_assets/tiles/forest/46_glowing_waterfall_detail.png",
      "./assets/region_assets/tiles/forest/47_enchanted_waterfall_edge.png"
    ],
    "wall": [
      "./assets/region_assets/tiles/forest/12_mossy_stone_plain.png",
      "./assets/region_assets/tiles/forest/13_mossy_stone_variation.png",
      "./assets/region_assets/tiles/forest/14_mossy_stone_rune.png",
      "./assets/region_assets/tiles/forest/15_mossy_stone_cross.png",
      "./assets/region_assets/tiles/forest/48_spiral_stone_rune.png",
      "./assets/region_assets/tiles/forest/49_blue_circle_rune_stone.png",
      "./assets/region_assets/tiles/forest/50_triangle_rune_stone.png",
      "./assets/region_assets/tiles/forest/51_mossy_stone_tile.png",
      "./assets/region_assets/tiles/forest/54_moon_moss_edge.png",
      "./assets/region_assets/tiles/forest/55_mossy_stone_edge.png"
    ]
  }
};



const VILLAGE_TILE_PATHS = {
  grass: [
    "./assets/region_assets/tiles/village/00_grass_var_a.png",
    "./assets/region_assets/tiles/village/01_grass_var_b.png",
    "./assets/region_assets/tiles/village/02_grass_var_c.png",
    "./assets/region_assets/tiles/village/03_grass_var_d.png",
    "./assets/region_assets/tiles/village/56_grass_tile.png",
    "./assets/region_assets/tiles/village/57_grass_tile.png"
  ],
  dirt: [
    "./assets/region_assets/tiles/village/04_dirt_var_a.png",
    "./assets/region_assets/tiles/village/05_dirt_var_b.png",
    "./assets/region_assets/tiles/village/06_dirt_var_c.png",
    "./assets/region_assets/tiles/village/07_dirt_var_d.png"
  ],
  dirtPathH: "./assets/region_assets/tiles/village/08_path_horizontal.png",
  dirtPathV: "./assets/region_assets/tiles/village/09_path_vertical.png",
  dirtRoadH: "./assets/region_assets/tiles/village/29_grass_dirt_road_east_west.png",
  dirtRoadV: "./assets/region_assets/tiles/village/28_grass_dirt_road_south-north.png",
  pavedFull: "./assets/region_assets/tiles/village/32_full_paved_tile.png",
  pavedH: "./assets/region_assets/tiles/village/33_paved_road_east-west.png",
  pavedV: "./assets/region_assets/tiles/village/34_paved_road_north-south.png",
  pavedCircle: "./assets/region_assets/tiles/village/39_full_paved_tile_circular_pattern.png",
  woodA: "./assets/region_assets/tiles/village/40_wood_floorboard.png",
  woodB: "./assets/region_assets/tiles/village/41_wooden_planks.png",
  woodV: "./assets/region_assets/tiles/village/42_wood_floorboard_planks_north-south.png",
  fieldPlain: "./assets/region_assets/tiles/village/52_dirt_tile_field.png",
  fieldRows: "./assets/region_assets/tiles/village/53_dirt_tile_field_with-plants.png",
  fieldPlants: "./assets/region_assets/tiles/village/54_dirt_with_plants_field.png",
  fieldDirt: "./assets/region_assets/tiles/village/58_dirt_tile.png",
  hay: "./assets/region_assets/tiles/village/50_hay_tile.png",
  fenceH: "./assets/region_assets/tiles/village/44_wooden_fence_east-west.png",
  fenceV: "./assets/region_assets/tiles/village/45_wood_fence_north_south.png",
  fenceCorner: "./assets/region_assets/tiles/village/46_wood_fence_south_west_corner_L-shape.png",
  fenceGate: "./assets/region_assets/tiles/village/47_wood_fence_door_east-west.png",
  flowers: "./assets/region_assets/tiles/village/48_flowers_grass_tile.png"
};

const REGION_ENEMY_SHEET_PATHS = {
  village: "./assets/region_assets/enemies/village_bandit/walk.png",
  port: "./assets/region_assets/enemies/port_pirate/walk.png",
  mine: "./assets/region_assets/enemies/mine_goblin/walk.png",
  forest: "./assets/region_assets/enemies/forest_goblin/walk.png"
};

const MAIN_NPC_SPRITE_PATHS = {
  char_l1_ceo: "./assets/region_assets/npcs/main/marcus_vane.png",
  char_l1_elder: "./assets/region_assets/npcs/main/elara.png",
  char_l1_gov: "./assets/region_assets/npcs/main/prefet_morel.png"
};

const REGION_MAIN_NPC_SPRITE_PATHS = {
  village: "./assets/region_assets/npcs/main/maitre_village.png",
  mine: "./assets/region_assets/npcs/main/marcus_vane.png",
  forest: "./assets/region_assets/npcs/main/elara.png",
  port: "./assets/region_assets/npcs/main/prefet_morel.png"
};

function getMainNpcSpritePath(character = null, region = null) {
  if (character?.id && MAIN_NPC_SPRITE_PATHS[character.id]) return MAIN_NPC_SPRITE_PATHS[character.id];
  if (region?.type && REGION_MAIN_NPC_SPRITE_PATHS[region.type]) return REGION_MAIN_NPC_SPRITE_PATHS[region.type];
  return REGION_MAIN_NPC_SPRITE_PATHS.village;
}

function getRegionAssetKey(world = state.world) {
  return world?.region?.type || world?.regionId || "village";
}

function getRegionEnemySheetPath(regionIdOrType) {
  return REGION_ENEMY_SHEET_PATHS[regionIdOrType] || null;
}

function getRegionTilePath(world, tileType, tx, ty) {
  const regionTiles = REGION_TILE_IMAGE_PATHS[getRegionAssetKey(world)];
  const variants = regionTiles?.[tileType] || regionTiles?.floor;
  if (!variants || !variants.length) return null;
  const seed = Math.abs((tx * 73856093) ^ (ty * 19349663) ^ ((world?.levelNumber || 1) * 83492791));
  return variants[seed % variants.length];
}

function getRegionAssetPreloadPaths() {
  const tilePaths = Object.values(REGION_TILE_IMAGE_PATHS)
    .flatMap((entry) => Object.values(entry).flat());
  return [...new Set([
    ...Object.values(REGION_PROP_IMAGE_PATHS),
    ...tilePaths,
    ...Object.values(REGION_ENEMY_SHEET_PATHS),
    ...Object.values(VILLAGE_TILE_PATHS).flat(),
    ...Object.values(MAIN_NPC_SPRITE_PATHS),
    ...Object.values(REGION_MAIN_NPC_SPRITE_PATHS)
  ].filter(Boolean))];
}
// REGION_ASSETS_END

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
    healthPotion: "./assets/items/health_potion.svg",
    manaPotion: "./assets/items/mana_potion.svg",
    gold: "./assets/items/gold.svg",
    xp: "./assets/items/xp_orb.svg"
  }
};

const PLAYER_SHEET_ACTIONS = ["idle", "walk", "run", "attack_basic", "skill_1", "skill_2", "hurt", "death"];
const ENEMY_SHEET_ACTIONS = ["idle", "walk", "attack", "hurt", "death"];
const BOSS_SHEET_ACTIONS = ["idle", "walk", "attack", "hurt", "death"];
const SHEET_LAYOUT = { cols: 6, rows: 6 };
const USE_PLAYER_SPRITESHEETS = true;
const USE_PLAYER_FRAME_IMAGES = true;
const USE_BOSS_FRAME_IMAGES = true;
const USE_ENEMY_SPRITESHEETS = false;

const TUTORIAL_STEPS = [
  { title: "Se d\u00e9placer", body: "Utilise ZQSD ou les fl\u00e8ches pour marcher. Le h\u00e9ros garde maintenant la derni\u00e8re direction au repos.", keys: ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"], label: "Appuie sur une touche de d\u00e9placement" },
  { title: "Courir", body: "Maintiens MAJ pendant un d\u00e9placement pour courir. Cela consomme la stamina, qui revient apr\u00e8s une courte pause.", keys: ["ShiftLeft", "ShiftRight"], label: "Appuie sur MAJ" },
  { title: "Attaque de base", body: "Appuie sur ESPACE pour attaquer dans la direction regard\u00e9e. Les attaques physiques consomment de la stamina.", keys: ["Space"], label: "Appuie sur ESPACE" },
  { title: "Skill principal", body: "La touche F sert au premier skill de classe, mais il se débloque au niveau 3. Au début, utilise surtout ESPACE et ta barre rapide.", keys: ["KeyF"], label: "Appuie sur F" },
  { title: "Inventaire", body: "Appuie sur I pour ouvrir ton inventaire 6x7 et \u00e9quiper les objets trouv\u00e9s. Le tutoriel ne l\u2019ouvre pas ici, il v\u00e9rifie juste la touche.", keys: ["KeyI"], label: "Appuie sur I" },
  { title: "Interaction", body: "Appuie sur E pr\u00e8s d\u2019un marchand, d\u2019un conseiller ou de la porte finale. Les dialogues restent l\u2019histoire, pas tout le gameplay.", keys: ["KeyE"], label: "Appuie sur E" },
  { title: "Pause", body: "Appuie sur P pour ouvrir le menu pause pendant le jeu. Tu y gardes les contr\u00f4les musique.", keys: ["KeyP"], label: "Appuie sur P pour terminer le tutoriel" }
];

const EIGHT_DIRECTIONS = ["down", "downRight", "right", "upRight", "up", "upLeft", "left", "downLeft"];
const FRAME_DIRECTION_PATH = {
  down: "down",
  downRight: "down_right",
  right: "right",
  upRight: "up_right",
  up: "up",
  upLeft: "up_left",
  left: "left",
  downLeft: "down_left"
};
const EIGHT_DIRECTION_FRAME_SEQUENCE = [0, 1, 2, 3, 4, 5];
const EIGHT_DIRECTION_ROW_MAP = {
  down: 0,
  downRight: 1,
  right: 2,
  upRight: 3,
  up: 4,
  upLeft: 5,
  left: 6,
  downLeft: 7
};

function createEightDirectionFrames() {
  return {
    down: { row: 0, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE },
    downRight: { row: 1, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE },
    right: { row: 2, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE },
    upRight: { row: 3, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE },
    up: { row: 4, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE },
    upLeft: { row: 5, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE },
    left: { row: 6, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE },
    downLeft: { row: 7, idle: 0, seq: EIGHT_DIRECTION_FRAME_SEQUENCE }
  };
}

function createEightDirectionProfile(yAnchor = 0.9) {
  return {
    cols: 6,
    rows: 8,
    yAnchor,
    directionFrames: createEightDirectionFrames(),
    rowMap: EIGHT_DIRECTION_ROW_MAP,
    horizontalFrameSequence: EIGHT_DIRECTION_FRAME_SEQUENCE,
    verticalFrameSequence: EIGHT_DIRECTION_FRAME_SEQUENCE,
    mirrorLeft: false,
    trueDiagonals: true
  };
}

const PLAYER_SHEET_PROFILES = {
  warrior: createEightDirectionProfile(0.9),
  mage: createEightDirectionProfile(0.9),
  hunter: createEightDirectionProfile(0.9)
};

const BOSS_SHEET_PROFILE = createEightDirectionProfile(0.88);
function getPlayerSheetPath(classId, action) {
  return `./assets/spritesheets/player/${classId}/${action}.png`;
}

function getEnemySheetPath(enemyId, action) {
  return `./assets/spritesheets/enemies/${enemyId}/${action}.png`;
}

function getBossSheetPath(levelId, action) {
  return `./assets/spritesheets/bosses/${levelId}/${action}.png`;
}

function getPlayerFramePath(classId, action, dir, frame) {
  const safeDir = FRAME_DIRECTION_PATH[dir] || "down";
  const safeAction = action === "run" ? "walk" : "walk";
  return `./assets/sprite_frames/player/${classId}/${safeAction}/${safeDir}/${String(frame).padStart(2, "0")}.png`;
}

function getBossFramePath(levelId, action, dir, frame) {
  const safeDir = FRAME_DIRECTION_PATH[dir] || "down";
  return `./assets/sprite_frames/bosses/${levelId}/${action}/${safeDir}/${String(frame).padStart(2, "0")}.png`;
}

const NPC_NEUTRAL_SHEETS = {
  forest: [
    "./assets/spritesheets/npc_neutral/generated/shaman_female_walk.png",
    "./assets/spritesheets/npc_neutral/generated/shaman_male_walk.png"
  ],
  mine: [
    "./assets/spritesheets/npc_neutral/generated/mineur_femme_walk.png",
    "./assets/spritesheets/npc_neutral/generated/mineur_homme_walk.png"
  ],
  port: [
    "./assets/spritesheets/npc_neutral/generated/pecheur_femme_walk.png",
    "./assets/spritesheets/npc_neutral/generated/pecheur_homme_walk.png"
  ],
  default: [
    "./assets/spritesheets/npc_neutral/generated/shaman_female_walk.png",
    "./assets/spritesheets/npc_neutral/generated/pecheur_femme_walk.png"
  ]
};
function getNeutralWalkerSheetPaths(zoneType) {
  return NPC_NEUTRAL_SHEETS[zoneType] || NPC_NEUTRAL_SHEETS.default || [];
}

const LEVEL_REGION_CONFIGS = {
  level_1: {
    start: "village",
    requiredRegions: ["mine", "forest", "port"],
    regions: {
      village: {
        id: "village",
        label: "Village de Kymal",
        shortLabel: "Village",
        biome: "coast",
        type: "village",
        tilesW: 70,
        tilesH: 44,
        color: "#eab308",
        intro: "Le village attend ton arbitrage. Les routes menent a la mine, au port et a la foret sacree.",
        master: {
          id: "master_l1_village",
          name: "Maitre Lior",
          role: "Hote du conseil",
          bio: "Il organise le conseil final et refuse de voter a la place du mediateur.",
          prompt: "Reviens me voir quand tu auras entendu les trois camps: travail local, foret sacree et transition energetique."
        },
        portals: [
          { target: "mine", label: "Mine", color: "#f59e0b", x: 0.84, y: 0.48 },
          { target: "port", label: "Port", color: "#38bdf8", x: 0.50, y: 0.84 }
        ],
        walkers: 9,
        enemies: 7
      },
      mine: {
        id: "mine",
        label: "Mine en construction",
        shortLabel: "Mine",
        biome: "forest",
        type: "mine",
        tilesW: 66,
        tilesH: 42,
        color: "#f97316",
        characterIndex: 0,
        questTitle: "Securiser la galerie du gisement",
        questMain: "Ecouter Marcus Vane sur le travail et l'urgence industrielle.",
        questOptional: "Repousser la menace dans la galerie pour aider les ouvriers.",
        values: ["travail", "urgence climatique", "responsabilite economique"],
        viewpoint: "La mine peut ramener du travail et fournir le lithium necessaire aux eoliennes. Refuser le projet peut condamner le village a l'immobilisme.",
        shortLine: "Ce chantier peut ramener du travail et donner au village un role dans la transition.",
        consequence: "Des familles gagnent un revenu, mais le sol de la foret est ouvert et transforme.",
        counter: "Le travail compte, mais aucun salaire ne remplace facilement un sanctuaire perdu.",
        rewardHint: "Recompense: or, XP et objet rare adapte a ta classe.",
        portals: [
          { target: "village", label: "Village", color: "#eab308", x: 0.10, y: 0.52 },
          { target: "forest", label: "Foret", color: "#22c55e", x: 0.88, y: 0.36 }
        ],
        walkers: 5,
        enemies: 10
      },
      forest: {
        id: "forest",
        label: "Foret enchantee",
        shortLabel: "Foret",
        biome: "forest",
        type: "forest",
        tilesW: 68,
        tilesH: 46,
        color: "#22c55e",
        characterIndex: 1,
        questTitle: "Proteger le sanctuaire ancien",
        questMain: "Ecouter Elara sur la valeur spirituelle et vivante de la foret.",
        questOptional: "Calmer les creatures affolees pres du sanctuaire.",
        values: ["patrimoine", "vivant", "irreversibilite"],
        viewpoint: "La foret n'est pas seulement un decor: c'est une memoire, un habitat et un lieu sacre que l'on ne reconstruit pas apres coup.",
        shortLine: "Ils vont detruire une foret que personne ne sait remplacer.",
        consequence: "Sauver la foret preserve un monde vivant, mais peut retarder un projet energetique attendu.",
        counter: "La protection du sacre ne suffit pas toujours a repondre aux besoins d'energie et de travail.",
        rewardHint: "Recompense: or, XP et objet rare adapte a ta classe.",
        portals: [
          { target: "mine", label: "Mine", color: "#f59e0b", x: 0.10, y: 0.50 },
          { target: "village", label: "Village", color: "#eab308", x: 0.52, y: 0.88 }
        ],
        walkers: 6,
        enemies: 9
      },
      port: {
        id: "port",
        label: "Port des eoliennes",
        shortLabel: "Port",
        biome: "coast",
        type: "port",
        tilesW: 68,
        tilesH: 44,
        color: "#38bdf8",
        characterIndex: 2,
        questTitle: "Inspecter le quai des eoliennes",
        questMain: "Ecouter le Prefet Morel sur l'energie verte et la decision publique.",
        questOptional: "Degager la route des pieces d'eolienne au bord du quai.",
        values: ["transition energetique", "independance", "prudence publique"],
        viewpoint: "Les eoliennes peuvent etre un premier pas vers l'independance aux energies fossiles, meme si leur bilan n'est pas parfait.",
        shortLine: "Produire une energie plus verte peut etre imparfait, mais rester aux fossiles a aussi un cout.",
        consequence: "Le port gagne une mission collective, mais la promesse energetique reste incertaine.",
        counter: "Une solution verte imparfaite ne doit pas devenir une excuse pour ignorer les degats locaux.",
        rewardHint: "Recompense: or, XP et objet rare adapte a ta classe.",
        portals: [
          { target: "village", label: "Village", color: "#eab308", x: 0.50, y: 0.12 }
        ],
        walkers: 7,
        enemies: 8
      }
    }
  }
};

function getSceneRegionConfig(scene = state.currentScene) {
  return scene ? LEVEL_REGION_CONFIGS[scene.id] || null : null;
}

function getRegionDefinition(regionId, scene = state.currentScene) {
  const config = getSceneRegionConfig(scene);
  if (!config) return null;
  return config.regions[regionId] || config.regions[config.start] || null;
}

function getRequiredFactionRegions(scene = state.currentScene) {
  const config = getSceneRegionConfig(scene);
  return config ? config.requiredRegions || [] : [];
}


const AUDIO_PATHS = {
  hitEnemy: "../assets/audio/mg_tick.mp3",
  hitPlayer: "../assets/audio/sfx_error.mp3",
  enemyDead: "../assets/audio/mg_win.mp3",
  itemUse: "../assets/audio/sfx_click.mp3",
  uiClick: "../assets/audio/sfx_click.mp3"
};


const MUSIC_PLAYLIST_PATHS = [
  "../assets/music/contemplation.mp3",
  "../assets/music/cosmic.mp3",
  "../assets/music/drift.mp3",
  "../assets/music/grove.mp3",
  "../assets/music/resolution.mp3",
  "../assets/music/sunlight.mp3",
  "../assets/music/tension.mp3",
  "../assets/music/thought.mp3",
  "../assets/music/uplifting.mp3"
];

const SFX_COOLDOWNS = {
  hitEnemy: 0.065,
  hitPlayer: 0.13,
  enemyDead: 0.09,
  itemUse: 0.08,
  uiClick: 0.05
};


const INVENTORY_SIZE = 42;
const EQUIPMENT_SLOTS = ["necklace", "cape", "chest", "legs", "gloves", "weapon"];
const RARITIES = {
  common: { label: "Commun", color: "#8aa0ad", weight: 58, mult: 1 },
  magic: { label: "Magique", color: "#5db8ff", weight: 25, mult: 1.35 },
  rare: { label: "Rare", color: "#f6c445", weight: 12, mult: 1.75 },
  epic: { label: "Epique", color: "#c084fc", weight: 4, mult: 2.25 },
  legendary: { label: "Legendaire", color: "#fb923c", weight: 1, mult: 3 }
};
const SLOT_LABELS = { necklace: "Collier", cape: "Cape", chest: "Torse", legs: "Jambes", gloves: "Gants", weapon: "Arme" };
const CLASS_GEAR_NAMES = {
  warrior: { weapon: "Epee", chest: "Cuirasse", legs: "Jambieres", gloves: "Gantelets", cape: "Cape de garde", necklace: "Medaille" },
  mage: { weapon: "Baton", chest: "Robe", legs: "Bottes runiques", gloves: "Gants de canalisation", cape: "Cape astrale", necklace: "Amulette" },
  hunter: { weapon: "Arc", chest: "Tunique", legs: "Bottes de piste", gloves: "Gants d'archer", cape: "Cape de camouflage", necklace: "Talisman" }
};
const SLOT_STAT_FOCUS = {
  weapon: ["attack"], gloves: ["attack", "maxStamina"], chest: ["defense", "maxHp"],
  legs: ["defense", "maxStamina"], cape: ["maxMana", "defense"], necklace: ["maxMana", "attack"]
};
const ITEM_ICON_PATHS = {
  healthPotion: "./assets/items/health_potion.svg",
  manaPotion: "./assets/items/mana_potion.svg",
  gold: "./assets/items/gold.svg",
  xp: "./assets/items/xp_orb.svg"
};

const TALENT_DEFS = {
  warrior: [
    { id: "vigor", name: "Mur de garde", icon: "./assets/talents/vigor.svg", max: 3, desc: "+12 vie et +1 defense par rang.", stats: { maxHp: 12, defense: 1 } },
    { id: "agility", name: "Charge stable", icon: "./assets/talents/agility.svg", max: 2, desc: "+8 stamina et +4 vitesse par rang.", stats: { maxStamina: 8, speed: 4 } },
    { id: "skill1", name: "Fente renforcee", icon: "./assets/talents/skill1.svg", max: 3, levelReq: 3, desc: "Ameliore l attaque F.", skill: "skill1" },
    { id: "special", name: "Onde de bouclier", icon: "./assets/talents/special.svg", max: 1, levelReq: 3, desc: "Debloque l'attaque speciale R.", unlockSkill: "skill2" },
    { id: "mastery", name: "Maitrise d'acier", icon: "./assets/talents/mastery.svg", max: 4, desc: "+2 attaque par rang.", stats: { attack: 2 } },
    { id: "focus", name: "Discipline", icon: "./assets/talents/focus.svg", max: 2, desc: "+10 mana par rang.", stats: { maxMana: 10 } }
  ],
  mage: [
    { id: "focus", name: "Reservoir astral", icon: "./assets/talents/focus.svg", max: 4, desc: "+14 mana par rang.", stats: { maxMana: 14 } },
    { id: "mastery", name: "Canalisation", icon: "./assets/talents/mastery.svg", max: 4, desc: "+2 attaque magique par rang.", stats: { attack: 2 } },
    { id: "skill1", name: "Orbe instable", icon: "./assets/talents/skill1.svg", max: 3, levelReq: 3, desc: "Ameliore le sort F.", skill: "skill1" },
    { id: "special", name: "Nova ethique", icon: "./assets/talents/special.svg", max: 1, levelReq: 3, desc: "Debloque le sort special R.", unlockSkill: "skill2" },
    { id: "vigor", name: "Peau de rune", icon: "./assets/talents/vigor.svg", max: 2, desc: "+10 vie et +1 defense par rang.", stats: { maxHp: 10, defense: 1 } },
    { id: "agility", name: "Pas leger", icon: "./assets/talents/agility.svg", max: 2, desc: "+5 vitesse par rang.", stats: { speed: 5 } }
  ],
  hunter: [
    { id: "agility", name: "Piste rapide", icon: "./assets/talents/agility.svg", max: 3, desc: "+6 vitesse et +6 stamina par rang.", stats: { speed: 6, maxStamina: 6 } },
    { id: "mastery", name: "Tir precis", icon: "./assets/talents/mastery.svg", max: 4, desc: "+2 attaque par rang.", stats: { attack: 2 } },
    { id: "skill1", name: "Triple fleche", icon: "./assets/talents/skill1.svg", max: 3, levelReq: 3, desc: "Ameliore l attaque F.", skill: "skill1" },
    { id: "special", name: "Roulade-lame", icon: "./assets/talents/special.svg", max: 1, levelReq: 3, desc: "Debloque l'attaque speciale R.", unlockSkill: "skill2" },
    { id: "vigor", name: "Instinct de survie", icon: "./assets/talents/vigor.svg", max: 2, desc: "+12 vie par rang.", stats: { maxHp: 12 } },
    { id: "focus", name: "Concentration", icon: "./assets/talents/focus.svg", max: 2, desc: "+10 mana par rang.", stats: { maxMana: 10 } }
  ]
};
const BIOME_ENEMY_LOADOUTS = {
  forest: ["stalker", "raider"], lab: ["drone", "stalker"], hospital: ["drone", "raider"],
  space: ["drone", "juggernaut"], coast: ["raider", "stalker"], urban: ["raider", "drone", "juggernaut"]
};
const BIOME_SKIN_COLORS = {
  forest: ["#65a30d", "#92400e", "#3f6212"],
  lab: ["#22d3ee", "#60a5fa", "#a3e635"],
  hospital: ["#e5e7eb", "#38bdf8", "#fca5a5"],
  space: ["#818cf8", "#a78bfa", "#22d3ee"],
  coast: ["#38bdf8", "#f59e0b", "#0ea5e9"],
  urban: ["#f97316", "#64748b", "#eab308"]
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
  barXpFill: document.getElementById("bar-xp-fill"),
  barXpText: document.getElementById("bar-xp-text"),
  hotbar: document.getElementById("hotbar"),
  hudObjective: document.getElementById("hud-objective"),
  chatPanel: document.getElementById("chat-panel"),
  chatName: document.getElementById("chat-npc-name"),
  chatLog: document.getElementById("chat-log"),
  chatInput: document.getElementById("chat-input"),
  chatSend: document.getElementById("chat-send"),
  chatClose: document.getElementById("chat-close"),
  chatChoices: document.getElementById("chat-choices"),
  chatContext: document.getElementById("chat-context"),
  questPanel: document.getElementById("quest-panel"),
  questClose: document.getElementById("quest-close"),
  questList: document.getElementById("quest-list"),
  questLore: document.getElementById("quest-lore"),
  votePanel: document.getElementById("vote-panel"),
  voteDilemma: document.getElementById("vote-dilemma"),
  voteOptions: document.getElementById("vote-options"),
  voteJustification: document.getElementById("vote-justification"),
  voteCancel: document.getElementById("vote-cancel"),
  voteSubmit: document.getElementById("vote-submit"),
  pausePanel: document.getElementById("pause-panel"),
  toggleAudio: document.getElementById("toggle-audio"),
  musicPrev: document.getElementById("music-prev"),
  musicNext: document.getElementById("music-next"),
  musicNowPlaying: document.getElementById("music-now-playing"),
  musicVolume: document.getElementById("music-volume"),
  sfxVolume: document.getElementById("sfx-volume"),
  changeCharacter: document.getElementById("change-character"),
  merchantPanel: document.getElementById("merchant-panel"),
  merchantClose: document.getElementById("merchant-close"),
  buyPotion: document.getElementById("buy-potion"),
  buyManaPotion: document.getElementById("buy-mana-potion"),
  inventoryPanel: document.getElementById("inventory-panel"),
  inventoryClose: document.getElementById("inventory-close"),
  inventoryGrid: document.getElementById("inventory-grid"),
  inventoryDetails: document.getElementById("inventory-details"),
  itemTooltip: document.getElementById("item-tooltip"),
  inventoryStats: document.getElementById("inventory-stats"),
  inventoryTrash: document.getElementById("inventory-trash"),
  grimoirePanel: document.getElementById("grimoire-panel"),
  grimoireClose: document.getElementById("grimoire-close"),
  skillGrid: document.getElementById("skill-grid"),
  talentGrid: document.getElementById("talent-grid"),
  talentPoints: document.getElementById("talent-points"),
  inventoryPlayerPreview: document.getElementById("inventory-player-preview"),
  equipmentSlots: document.getElementById("equipment-slots"),
  guideButton: document.getElementById("guide-button"),
  guidePanel: document.getElementById("guide-panel"),
  guideClose: document.getElementById("guide-close"),
  guideText: document.getElementById("guide-text"),
  tutorialPanel: document.getElementById("tutorial-panel"),
  tutorialTitle: document.getElementById("tutorial-title"),
  tutorialBody: document.getElementById("tutorial-body"),
  tutorialAction: document.getElementById("tutorial-action"),
  tutorialProgress: document.getElementById("tutorial-progress"),
  tutorialSkip: document.getElementById("tutorial-skip")
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
  musicEnabled: true,
  musicVolume: 0.42,
  sfxVolume: 0.65,
  musicStarted: false,
  player: null,
  world: null,
  currentScene: null,
  sceneOrder: [],
  scenes: {},
  sceneIndex: 0,
  currentRegion: null,
  personas: [],
  worldLore: null,
  keysDown: new Set(),
  tutorial: { active: false, step: 0 },
  hotbar: new Array(8).fill(null),
  notifications: [],
  chatNpc: null,
  history: [],
  camera: { x: 0, y: 0 },
  assets: {
    images: {},
    audio: {},
    bgm: null,
    musicPlaylist: [],
    musicIndex: -1,
    sfxLastPlayed: {}
  },
  selectedInventoryIndex: null,
  quest: {
    talked: new Set(),
    seals: new Set(),
    challenges: {},
    regionProgress: {},
    journalEntries: [],
    rewarded: new Set(),
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

function mojibakeScore(value) {
  const text = String(value || "");
  const suspectCodes = new Set([0x00c3, 0x00c2, 0x00e2, 0xfffd, 0x0192, 0x20ac, 0x2122]);
  let score = 0;
  for (const ch of text) {
    if (suspectCodes.has(ch.codePointAt(0))) score += 1;
  }
  return score;
}

const MOJIBAKE_CP1252 = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84], [0x2026, 0x85],
  [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88], [0x2030, 0x89], [0x0160, 0x8a],
  [0x2039, 0x8b], [0x0152, 0x8c], [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92],
  [0x201c, 0x93], [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b], [0x0153, 0x9c],
  [0x017e, 0x9e], [0x0178, 0x9f]
]);

function decodeMojibakeOnce(value) {
  const bytes = [];
  for (const ch of value) {
    const code = ch.codePointAt(0);
    if (code <= 0xff) bytes.push(code);
    else if (MOJIBAKE_CP1252.has(code)) bytes.push(MOJIBAKE_CP1252.get(code));
    else return value;
  }
  try {
    return new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(bytes));
  } catch (error) {
    return value;
  }
}

function fixText(input) {
  if (!input || typeof input !== "string") {
    return "";
  }
  let best = input;
  for (let i = 0; i < 4; i += 1) {
    if (!mojibakeScore(best)) break;
    const decoded = decodeMojibakeOnce(best);
    if (!decoded || decoded === best || mojibakeScore(decoded) > mojibakeScore(best)) break;
    best = decoded;
  }
  return best;
}

function repairStaticTextNodes() {
  if (!document.body) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const repaired = fixText(node.nodeValue);
    if (repaired !== node.nodeValue) node.nodeValue = repaired;
  }
  for (const el of document.querySelectorAll("[placeholder],[title],[aria-label]")) {
    for (const attr of ["placeholder", "title", "aria-label"]) {
      if (!el.hasAttribute(attr)) continue;
      const repaired = fixText(el.getAttribute(attr));
      if (repaired !== el.getAttribute(attr)) el.setAttribute(attr, repaired);
    }
  }
}

function addNotification(text, ttl = 2.8, color = "#d9eef8") {
  state.notifications.push({ id: uid("note"), text: fixText(text), ttl, color });
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
    const separator = String(path).includes("?") ? "&" : "?";
    img.src = encodeURI(`${path}${separator}v=${ASSET_VERSION}`);
  });
}

function cloneAudio(src) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = state.sfxVolume;
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
  g.gain.value = 0.05 * state.sfxVolume;
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
    instance.volume = clamp(volume * state.sfxVolume, 0, 1);
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

function shuffleMusicPlaylist() {
  const list = [...MUSIC_PLAYLIST_PATHS];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function formatTrackName(path) {
  return String(path || "")
    .split("/")
    .pop()
    .replace(/\.mp3$/i, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

function updateMusicUi() {
  if (DOM.toggleAudio) {
    DOM.toggleAudio.textContent = `Musique: ${state.musicEnabled ? "Pause" : "Lecture"}`;
  }
  if (DOM.musicVolume) DOM.musicVolume.value = Math.round(state.musicVolume * 100);
  if (DOM.sfxVolume) DOM.sfxVolume.value = Math.round(state.sfxVolume * 100);
  if (DOM.musicNowPlaying) {
    const playlist = state.assets.musicPlaylist || [];
    const currentPath = playlist[state.assets.musicIndex] || "";
    DOM.musicNowPlaying.textContent = currentPath
      ? `Lecture: ${formatTrackName(currentPath)}`
      : "Lecture: aucune piste";
  }
}

function setMusicVolume(value) {
  state.musicVolume = clamp(Number(value) / 100, 0, 1);
  if (state.assets.bgm) state.assets.bgm.volume = state.musicVolume;
  updateMusicUi();
}

function setSfxVolume(value) {
  state.sfxVolume = clamp(Number(value) / 100, 0, 1);
  updateMusicUi();
}

function ensureMusicPlaylist() {
  if (state.assets.musicPlaylist && state.assets.musicPlaylist.length) return;
  state.assets.musicPlaylist = shuffleMusicPlaylist();
  state.assets.musicIndex = 0;
}

function stopCurrentMusic() {
  const bgm = state.assets.bgm;
  if (!bgm) return;
  bgm.pause();
  bgm.currentTime = 0;
}

function loadMusicTrack(index, autoplay = true) {
  ensureMusicPlaylist();
  const playlist = state.assets.musicPlaylist;
  if (!playlist.length) return;

  const normalized = ((index % playlist.length) + playlist.length) % playlist.length;
  state.assets.musicIndex = normalized;
  const path = playlist[normalized];

  if (state.assets.bgm) {
    state.assets.bgm.pause();
    state.assets.bgm.src = "";
  }

  const bgm = new Audio(path);
  bgm.preload = "auto";
  bgm.volume = state.musicVolume;
  bgm.addEventListener("ended", () => {
    if (state.musicEnabled) {
      playNextMusic(true);
    }
  });
  state.assets.bgm = bgm;
  updateMusicUi();

  if (autoplay && state.musicEnabled) {
    bgm.play().then(() => {
      state.musicStarted = true;
    }).catch(() => {});
  }
}

function ensureMusicPlayback() {
  if (!state.musicEnabled) {
    updateMusicUi();
    return;
  }

  ensureMusicPlaylist();
  if (!state.assets.bgm) {
    loadMusicTrack(state.assets.musicIndex >= 0 ? state.assets.musicIndex : 0, true);
    return;
  }

  state.assets.bgm.play().then(() => {
    state.musicStarted = true;
  }).catch(() => {});
  updateMusicUi();
}

function playNextMusic(reshuffleAtEnd = false) {
  ensureMusicPlaylist();
  if (reshuffleAtEnd && state.assets.musicIndex >= state.assets.musicPlaylist.length - 1) {
    state.assets.musicPlaylist = shuffleMusicPlaylist();
    state.assets.musicIndex = -1;
  }
  loadMusicTrack(state.assets.musicIndex + 1, true);
}

function playPreviousMusic() {
  ensureMusicPlaylist();
  loadMusicTrack(state.assets.musicIndex - 1, true);
}

function toggleMusicPlayback() {
  state.musicEnabled = !state.musicEnabled;
  if (state.musicEnabled) {
    ensureMusicPlayback();
  } else if (state.assets.bgm) {
    state.assets.bgm.pause();
  }
  updateMusicUi();
}

function primeMusicAutoplay() {
  const unlock = () => {
    ensureMusicPlayback();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
  ensureMusicPlayback();
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
  for (const path of Object.values(GENERATED_PROP_IMAGE_PATHS)) {
    imageTasks.push(loadImage(path).then((img) => {
      state.assets.images[path] = img;
    }));
  }
  for (const path of getRegionAssetPreloadPaths()) {
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
  const generatedIconPaths = [
    ...Object.values(ITEM_ICON_PATHS),
    ...Object.values(TALENT_DEFS).flat().map((talent) => talent.icon),
    ...Object.keys(CLASS_DEFS).flatMap((classId) => EQUIPMENT_SLOTS.map((slot) => getEquipmentIconPath(classId, slot)))
  ];
  for (const path of generatedIconPaths) {
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
    for (const dir of EIGHT_DIRECTIONS) {
      for (let frame = 1; frame <= 6; frame += 1) {
        const path = getPlayerFramePath(classId, "walk", dir, frame);
        imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
      }
    }
  }

  for (const enemyType of ENEMY_TYPES) {
    for (const action of ENEMY_SHEET_ACTIONS) {
      const path = getEnemySheetPath(enemyType.id, action);
      imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
    }
  }

  for (const action of BOSS_SHEET_ACTIONS) {
    const path = getBossSheetPath("level_01", action);
    imageTasks.push(loadImage(path).then((img) => { state.assets.images[path] = img; }));
    for (const dir of EIGHT_DIRECTIONS) {
      for (let frame = 1; frame <= 6; frame += 1) {
        const framePath = getBossFramePath("level_01", action, dir, frame);
        imageTasks.push(loadImage(framePath).then((img) => { state.assets.images[framePath] = img; }));
      }
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
  if (world.tileOverrides) world.tileOverrides.fill(null);
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


function chooseTileVisual(paths, world, tx, ty) {
  if (!paths) return null;
  if (!Array.isArray(paths)) return paths;
  if (!paths.length) return null;
  const seed = Math.abs((tx * 1103515245) ^ (ty * 12345) ^ ((world?.levelNumber || 1) * 2654435761));
  return paths[seed % paths.length];
}

function setTileVisual(world, tx, ty, tileType, visualPath = null) {
  if (tx < 0 || tx >= world.tilesW || ty < 0 || ty >= world.tilesH) return;
  const index = ty * world.tilesW + tx;
  world.tileData[index] = tileType;
  if (world.tileOverrides) world.tileOverrides[index] = visualPath;
}

function paintTileBlock(world, tx, ty, tw, th, tileType, visualPaths = null) {
  for (let yy = ty; yy < ty + th; yy += 1) {
    for (let xx = tx; xx < tx + tw; xx += 1) {
      setTileVisual(world, xx, yy, tileType, chooseTileVisual(visualPaths, world, xx, yy));
    }
  }
}

function paintVillageStraightPath(world, tx, ty, length, orientation, width = 3, style = "dirt") {
  const half = Math.floor(width / 2);
  const horizontal = orientation === "h";
  const corePath = style === "paved"
    ? (horizontal ? VILLAGE_TILE_PATHS.pavedH : VILLAGE_TILE_PATHS.pavedV)
    : (horizontal ? VILLAGE_TILE_PATHS.dirtRoadH : VILLAGE_TILE_PATHS.dirtRoadV);
  const edgePath = style === "paved"
    ? (horizontal ? VILLAGE_TILE_PATHS.pavedH : VILLAGE_TILE_PATHS.pavedV)
    : (horizontal ? VILLAGE_TILE_PATHS.dirtPathH : VILLAGE_TILE_PATHS.dirtPathV);
  for (let i = 0; i < length; i += 1) {
    for (let o = -half; o <= half; o += 1) {
      const px = horizontal ? tx + i : tx + o;
      const py = horizontal ? ty + o : ty + i;
      const path = o === 0 ? corePath : edgePath;
      setTileVisual(world, px, py, "path", path);
    }
  }
}

function paintVillagePlaza(world, tx, ty, tw, th) {
  for (let yy = ty; yy < ty + th; yy += 1) {
    for (let xx = tx; xx < tx + tw; xx += 1) {
      const ornamental = (xx + yy) % 7 === 0;
      setTileVisual(world, xx, yy, "path", ornamental ? VILLAGE_TILE_PATHS.pavedCircle : VILLAGE_TILE_PATHS.pavedFull);
    }
  }
}

function paintVillageWoodDeck(world, tx, ty, tw, th, variant = "woodA") {
  const visual = VILLAGE_TILE_PATHS[variant] || VILLAGE_TILE_PATHS.woodA;
  paintTileBlock(world, tx, ty, tw, th, "path", visual);
}

function paintVillageGarden(world, tx, ty, tw, th) {
  for (let yy = ty; yy < ty + th; yy += 1) {
    for (let xx = tx; xx < tx + tw; xx += 1) {
      const top = yy === ty;
      const bottom = yy === ty + th - 1;
      const left = xx === tx;
      const right = xx === tx + tw - 1;
      const gate = bottom && Math.abs(xx - (tx + Math.floor(tw / 2))) <= 1;
      if (gate) {
        setTileVisual(world, xx, yy, "floorAlt", VILLAGE_TILE_PATHS.fenceGate);
      } else if ((top || bottom) && (left || right)) {
        setTileVisual(world, xx, yy, "floorAlt", VILLAGE_TILE_PATHS.fenceCorner);
      } else if (top || bottom) {
        setTileVisual(world, xx, yy, "floorAlt", VILLAGE_TILE_PATHS.fenceH);
      } else if (left || right) {
        setTileVisual(world, xx, yy, "floorAlt", VILLAGE_TILE_PATHS.fenceV);
      } else {
        const rowPattern = (yy - ty) % 3;
        const visual = rowPattern === 0 ? VILLAGE_TILE_PATHS.fieldRows : rowPattern === 1 ? VILLAGE_TILE_PATHS.fieldPlants : VILLAGE_TILE_PATHS.fieldPlain;
        setTileVisual(world, xx, yy, "floorAlt", visual);
      }
    }
  }
}

function buildVillageTileLayout(world) {
  paintTileBlock(world, 0, 0, world.tilesW, world.tilesH, "floor", VILLAGE_TILE_PATHS.grass);
  const cx = Math.floor(world.tilesW * 0.50);
  const cy = Math.floor(world.tilesH * 0.48);

  paintVillageStraightPath(world, 5, cy + 2, world.tilesW - 10, "h", 3, "dirt");
  paintVillageStraightPath(world, cx, 7, world.tilesH - 13, "v", 3, "dirt");
  paintVillageStraightPath(world, 13, cy + 12, 26, "h", 2, "dirt");
  paintVillageStraightPath(world, cx + 15, cy - 12, 23, "h", 2, "dirt");

  paintVillageStraightPath(world, cx - 19, cy - 9, 39, "h", 2, "paved");
  paintVillageStraightPath(world, cx - 10, cy - 20, 24, "v", 2, "paved");
  paintVillageStraightPath(world, cx + 13, cy - 6, 25, "v", 2, "paved");
  paintVillagePlaza(world, cx - 7, cy - 5, 14, 10);

  paintVillageWoodDeck(world, 18, 12, 9, 5, "woodA");
  paintVillageWoodDeck(world, 33, 9, 9, 5, "woodA");
  paintVillageWoodDeck(world, 60, 10, 10, 5, "woodB");
  paintVillageWoodDeck(world, 21, 34, 10, 6, "woodA");
  paintVillageWoodDeck(world, 60, 34, 11, 6, "woodB");
  paintVillageWoodDeck(world, 75, 36, 8, 5, "woodV");

  paintVillageGarden(world, 73, 42, 12, 8);
  paintVillageGarden(world, 8, 36, 11, 8);
  paintVillageGarden(world, 9, 16, 9, 7);
  paintTileBlock(world, 4, 44, 7, 5, "floorAlt", VILLAGE_TILE_PATHS.hay);
  paintTileBlock(world, 69, 18, 8, 4, "floor", VILLAGE_TILE_PATHS.flowers);
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


function addStructure(world, x, y, w, h, label, color, accent = null) {
  const wallThickness = 18;
  const entranceW = Math.min(120, w * 0.38);
  const roofColor = accent || color;
  world.deco.push({
    kind: "structure",
    x,
    y,
    w,
    h,
    label,
    color,
    roofColor,
    collidable: true,
    occludesPlayer: true
  });
  world.obstacles.push({ x: x - w / 2, y: y - h / 2, w, h: wallThickness, kind: "structure-wall" });
  world.obstacles.push({ x: x - w / 2, y: y + h / 2 - wallThickness, w: (w - entranceW) / 2, h: wallThickness, kind: "structure-wall" });
  world.obstacles.push({ x: x + entranceW / 2, y: y + h / 2 - wallThickness, w: (w - entranceW) / 2, h: wallThickness, kind: "structure-wall" });
  world.obstacles.push({ x: x - w / 2, y: y - h / 2, w: wallThickness, h, kind: "structure-wall" });
  world.obstacles.push({ x: x + w / 2 - wallThickness, y: y - h / 2, w: wallThickness, h, kind: "structure-wall" });
  paintRect(world, x - w / 2 + wallThickness, y - h / 2 + wallThickness, w - wallThickness * 2, h - wallThickness * 2, "floorAlt");
}


function populateStructures(world, zoneCenters, hub) {
  const labelsByBiome = {
    forest: ["Mine de lithium", "For\u00eat sacr\u00e9e", "Village du littoral"],
    city: ["Galerie IA", "Atelier humain", "Agora du march\u00e9"],
    hospital: ["Urgences", "Laboratoire", "Pharmacie"],
    space: ["D\u00f4me colonie", "Labo bio", "Antenne Terre"],
    coast: ["Port", "March\u00e9", "Poste ranger"]
  };
  const labels = labelsByBiome[world.biome] || ["QG", "Atelier", "D\u00e9p\u00f4t"];
  const colors = BIOME_SKIN_COLORS[world.biome] || BIOME_SKIN_COLORS.urban;
  zoneCenters.forEach((zone, index) => {
    const w = 250 + (index % 2) * 48;
    const h = 178 + ((index + 1) % 2) * 44;
    const offsetY = index === 2 ? -110 : 96;
    addStructure(world, zone.x, zone.y + offsetY, w, h, labels[index] || "B\u00e2timent", colors[index % colors.length], colors[(index + 1) % colors.length]);
  });
  if (world.biome === "forest") {
    addStructure(world, hub.x + 260, hub.y - 210, 210, 135, "Port technique", "#1e3a5f", "#38bdf8");
  }
  addStructure(world, hub.x - 260, hub.y + 170, 220, 150, "Boutique", "#3f4c63", "#67e8f9");
}




function pickDecorKind(world, x, y, zoneCenters) {
  if (world.biome === "forest") {
    const nearMine = Math.hypot(x - zoneCenters[0].x, y - zoneCenters[0].y) < 420;
    const nearForest = Math.hypot(x - zoneCenters[1].x, y - zoneCenters[1].y) < 460;
    const nearVillage = Math.hypot(x - zoneCenters[2].x, y - zoneCenters[2].y) < 430;
    if (nearMine) return Math.random() < 0.45 ? "ore" : "mineCart";
    if (nearForest) return Math.random() < 0.75 ? "tree" : "stoneCircle";
    if (nearVillage) return Math.random() < 0.55 ? "houseSmall" : "crate";
    return Math.random() < 0.5 ? "tree" : "windTurbine";
  }
  if (world.biome === "coast") return Math.random() < 0.45 ? "boat" : "crate";
  if (world.biome === "space") return Math.random() < 0.5 ? "antenna" : "solar";
  if (world.biome === "hospital" || world.biome === "lab") return Math.random() < 0.5 ? "terminal" : "crate";
  return Math.random() < 0.5 ? "sign" : "crate";
}

function getDecorImagePath(kind, world) {
  if (kind === "windTurbine") return PROP_IMAGE_PATHS.wind;
  if (kind === "mineCart") return PROP_IMAGE_PATHS.wagon;
  if (kind === "boat") return PROP_IMAGE_PATHS.rockWaterAlt;
  if (kind === "crate") return PROP_IMAGE_PATHS.chest;
  if (kind === "stoneCircle" || kind === "ore") return PROP_IMAGE_PATHS.rockWater;
  if (kind === "terminal" && (world.biome === "lab" || world.biome === "space")) return PROP_IMAGE_PATHS.gate;
  if (kind === "solar" || kind === "antenna") return kind === "solar" ? PROP_IMAGE_PATHS.observatory : PROP_IMAGE_PATHS.habitat;
  return null;
}
function populateDecorations(world, zoneCenters, hub) {
  const reserved = [
    { x: hub.x, y: hub.y, r: 330 },
    ...zoneCenters.map((z) => ({ x: z.x, y: z.y, r: 165 }))
  ];
  const propCount = world.biome === "forest" ? 70 : 46;
  for (let i = 0; i < propCount; i += 1) {
    const size = 38 + Math.random() * 34;
    let placed = false;
    for (let tries = 0; tries < 42 && !placed; tries += 1) {
      const x = 170 + Math.random() * (world.width - 340);
      const y = 170 + Math.random() * (world.height - 340);
      const blocked = reserved.some((r) => Math.hypot(x - r.x, y - r.y) < r.r);
      if (blocked) continue;
      const rect = { x: x - size / 2, y: y - size / 2, w: size, h: size };
      const overlaps = world.obstacles.some((o) => rectsOverlap(rect.x, rect.y, rect.w, rect.h, o.x, o.y, o.w, o.h));
      if (overlaps) continue;

      const kind = pickDecorKind(world, x, y, zoneCenters);
      const collidable = !["grass", "flower"].includes(kind);
      const imagePath = getDecorImagePath(kind, world);
      world.deco.push({ x, y, w: size, h: size, kind, imagePath, collidable, variant: Math.floor(Math.random() * 5), tint: Math.random() });
      if (collidable) {
        const pad = kind === "tree" ? size * 0.34 : size * 0.22;
        world.obstacles.push({ x: x - size / 2 + pad, y: y - size / 2 + pad, w: size - pad * 2, h: size - pad * 2, kind: "prop" });
      }
      placed = true;
    }
  }
}



function createWorldShell(scene, region, biomeOverride = null) {
  const tilesW = region.tilesW || DEFAULT_WORLD_TILES.w;
  const tilesH = region.tilesH || DEFAULT_WORLD_TILES.h;
  const width = tilesW * TILE_SIZE;
  const height = tilesH * TILE_SIZE;
  const biome = biomeOverride || region.biome || deriveBiome(scene.theme);
  const palette = { ...(BIOME_PRESETS[biome] || BIOME_PRESETS.forest), ...(region.palette || {}) };
  return {
    id: scene.id,
    levelNumber: extractLevelNumber(scene.id),
    scene,
    biome,
    palette,
    regionId: region.id || "default",
    regionLabel: region.label || "Region",
    region,
    tilesW,
    tilesH,
    width,
    height,
    tileData: new Array(tilesW * tilesH).fill("floor"),
    tileOverrides: new Array(tilesW * tilesH).fill(null),
    obstacles: [],
    deco: [],
    npcs: [],
    walkers: [],
    merchants: [],
    gate: null,
    master: null,
    portals: [],
    enemies: [],
    projectiles: [],
    fx: [],
    loot: [],
    walkerZones: [],
    enemyZones: [],
    spawn: { x: width * 0.5, y: height * 0.55 }
  };
}

function addRegionPortal(world, portal) {
  const x = portal.x <= 1 ? portal.x * world.width : portal.x;
  const y = portal.y <= 1 ? portal.y * world.height : portal.y;
  world.portals.push({
    id: `portal_${world.regionId}_${portal.target}`,
    x,
    y,
    r: 42,
    target: portal.target,
    label: portal.label || portal.target,
    color: portal.color || "#facc15"
  });
}

function addFactionNpcForRegion(world, scene, region) {
  if (typeof region.characterIndex !== "number") return;
  const chars = scene.narrative && Array.isArray(scene.narrative.characters) ? scene.narrative.characters : [];
  const char = chars[region.characterIndex] || chars[0];
  if (!char) return;
  const npc = {
    id: char.id || `npc_${region.id}`,
    talkable: true,
    regionId: region.id,
    x: world.width * 0.5,
    y: world.height * 0.43,
    r: 20,
    name: fixText(char.name || "Conseiller"),
    role: fixText(char.role || "Perspective"),
    bio: fixText(char.bio || ""),
    avatar: char.avatar ? `../${String(char.avatar).replace(/^\.\//, "")}` : "../assets/avatar_architecte.png",
    spritePath: getMainNpcSpritePath(char, region),
    archetype: char.archetype || null,
    spoken: false,
    factionIndex: region.characterIndex,
    dialogue: {
      shortLine: region.shortLine,
      viewpoint: region.viewpoint,
      consequence: region.consequence,
      counter: region.counter,
      values: region.values || [],
      rewardHint: region.rewardHint || "Recompense: or, XP et objet rare."
    },
    quest: {
      title: region.questTitle,
      main: region.questMain,
      optional: region.questOptional
    }
  };
  if (region.type === "mine") { npc.x = world.width * 0.58; npc.y = world.height * 0.45; }
  if (region.type === "forest") { npc.x = world.width * 0.53; npc.y = world.height * 0.46; }
  if (region.type === "port") { npc.x = world.width * 0.48; npc.y = world.height * 0.50; }
  world.npcs.push(npc);
}

function addVillageMaster(world, region) {
  if (!region.master) return;
  world.master = {
    id: region.master.id,
    x: world.width * 0.50,
    y: world.height * 0.40,
    r: 22,
    name: region.master.name,
    role: region.master.role,
    bio: region.master.bio,
    prompt: region.master.prompt,
    spritePath: REGION_MAIN_NPC_SPRITE_PATHS.village
  };
}

function addRegionalDecor(world, kind, count, area = null) {
  const bounds = area || { x: 160, y: 160, w: world.width - 320, h: world.height - 320 };
  for (let i = 0; i < count; i += 1) {
    const size = 34 + Math.random() * 42;
    const x = bounds.x + Math.random() * bounds.w;
    const y = bounds.y + Math.random() * bounds.h;
    const tooNearSpawn = Math.hypot(x - world.spawn.x, y - world.spawn.y) < 220;
    const tooNearPortal = world.portals.some((portal) => Math.hypot(x - portal.x, y - portal.y) < 120);
    const tooNearNpc = [...world.npcs, ...(world.master ? [world.master] : [])].some((npc) => Math.hypot(x - npc.x, y - npc.y) < 125);
    if (tooNearSpawn || tooNearPortal || tooNearNpc) continue;
    world.deco.push({ id: uid("region_deco"), kind, x, y, w: size, h: size, collidable: kind !== "flower" });
    if (kind !== "flower") world.obstacles.push({ x: x - size * 0.32, y: y - size * 0.28, w: size * 0.64, h: size * 0.48, soft: true });
  }
}
function addPlacedProp(world, kind, x, y, w, h, options = {}) {
  const collidable = options.collidable !== false;
  world.deco.push({
    id: uid("region_prop"),
    kind,
    x,
    y,
    w,
    h,
    collidable,
    occludesPlayer: options.occludesPlayer ?? h > 110,
    drawScale: options.drawScale || 1,
    yAnchor: options.yAnchor ?? 0.5
  });
  if (!collidable) return;
  const footprint = options.footprint || { w: w * 0.62, h: Math.max(18, h * 0.24), y: h * 0.28 };
  world.obstacles.push({
    x: x - footprint.w / 2,
    y: y + (footprint.y || 0) - footprint.h / 2,
    w: footprint.w,
    h: footprint.h,
    kind: options.obstacleKind || "region-prop",
    soft: options.soft !== false
  });
}

function scatterRegionProps(world, kinds, count, area, options = {}) {
  if (!Array.isArray(kinds) || !kinds.length) return;
  const bounds = area || { x: 160, y: 160, w: world.width - 320, h: world.height - 320 };
  const sizeMin = options.sizeMin || 40;
  const sizeMax = options.sizeMax || 78;
  const reserved = [
    { x: world.spawn.x, y: world.spawn.y, r: options.spawnSafeRadius || 220 },
    ...(world.master ? [{ x: world.master.x, y: world.master.y, r: 150 }] : []),
    ...world.npcs.map((npc) => ({ x: npc.x, y: npc.y, r: 150 })),
    ...world.merchants.map((merchant) => ({ x: merchant.x, y: merchant.y, r: 130 })),
    ...world.portals.map((portal) => ({ x: portal.x, y: portal.y, r: 130 }))
  ];
  for (let i = 0; i < count; i += 1) {
    let placed = false;
    for (let tries = 0; tries < 44 && !placed; tries += 1) {
      const kind = kinds[(i + tries) % kinds.length];
      const size = sizeMin + Math.random() * (sizeMax - sizeMin);
      const x = bounds.x + Math.random() * bounds.w;
      const y = bounds.y + Math.random() * bounds.h;
      if (reserved.some((spot) => Math.hypot(x - spot.x, y - spot.y) < spot.r)) continue;
      const rect = { x: x - size * 0.42, y: y - size * 0.35, w: size * 0.84, h: size * 0.7 };
      if (world.obstacles.some((o) => rectsOverlap(rect.x, rect.y, rect.w, rect.h, o.x, o.y, o.w, o.h))) continue;
      const h = size * (options.heightRatio || 1.05);
      addPlacedProp(world, kind, x, y, size, h, {
        collidable: options.collidable ?? true,
        occludesPlayer: options.occludesPlayer ?? h > 90,
        footprint: options.footprint || { w: size * 0.46, h: Math.max(16, size * 0.24), y: h * 0.28 }
      });
      placed = true;
    }
  }
}

function addWaterObstacle(world, x, y, w, h) {
  world.obstacles.push({ x, y, w, h, kind: "deep-water", soft: false });
}

function decorateRegionWorld(world) {
  const region = world.region;
  fillTiles(world, region.type === "mine" ? "wall" : "floor");
  if (region.type !== "village") paintPatches(world, "floorAlt", 96, 3, 7);
  buildBoundaries(world);
  for (const portal of region.portals || []) addRegionPortal(world, portal);

  if (region.type === "village") {
    const hub = { x: world.width * 0.50, y: world.height * 0.48 };
    buildVillageTileLayout(world);

    addPlacedProp(world, "village_notice_board", world.width * 0.50, world.height * 0.31, 150, 110, { footprint: { w: 80, h: 22, y: 40 }, occludesPlayer: false });
    addPlacedProp(world, "village_house_small", world.width * 0.22, world.height * 0.25, 175, 145, { footprint: { w: 132, h: 45, y: 45 } });
    addPlacedProp(world, "village_house_chimney", world.width * 0.38, world.height * 0.20, 190, 155, { footprint: { w: 140, h: 48, y: 48 } });
    addPlacedProp(world, "village_cottage_thatched", world.width * 0.66, world.height * 0.21, 188, 154, { footprint: { w: 138, h: 46, y: 48 } });
    addPlacedProp(world, "village_blacksmith", world.width * 0.27, world.height * 0.62, 206, 165, { footprint: { w: 155, h: 52, y: 55 } });
    addPlacedProp(world, "village_tavern", world.width * 0.66, world.height * 0.62, 210, 165, { footprint: { w: 160, h: 52, y: 55 } });
    addPlacedProp(world, "village_general_store", world.width * 0.80, world.height * 0.33, 190, 150, { footprint: { w: 138, h: 44, y: 48 } });
    addPlacedProp(world, "village_stable", world.width * 0.79, world.height * 0.66, 190, 150, { footprint: { w: 145, h: 46, y: 46 } });
    addPlacedProp(world, "village_well_roof", world.width * 0.42, world.height * 0.56, 92, 118, { footprint: { w: 56, h: 28, y: 36 } });
    addPlacedProp(world, "village_windmill", world.width * 0.16, world.height * 0.78, 170, 205, { footprint: { w: 96, h: 42, y: 72 } });
    addPlacedProp(world, "village_garden_hut", world.width * 0.83, world.height * 0.78, 168, 132, { footprint: { w: 128, h: 38, y: 42 } });
    addPlacedProp(world, "village_barn", world.width * 0.15, world.height * 0.38, 178, 142, { footprint: { w: 132, h: 42, y: 46 } });

    addVillageMaster(world, region);
    createMerchant(world, { x: world.width * 0.32, y: world.height * 0.58 });
    scatterRegionProps(world, ["village_cart", "village_barrel_stack", "village_crate_stack", "village_market_stall", "village_bench", "village_lamp_post", "village_signpost", "village_water_trough", "village_chopping_block", "village_sacks", "village_flower_planter", "village_fence_gate"], 30, { x: world.width * 0.12, y: world.height * 0.18, w: world.width * 0.76, h: world.height * 0.66 }, { sizeMin: 42, sizeMax: 82, collidable: true, spawnSafeRadius: 190 });
    world.walkerZones = [{ x: world.width * 0.52, y: world.height * 0.52, r: 460, type: "default" }];
    world.enemyZones = [
      { x: world.width * 0.10, y: world.height * 0.16 },
      { x: world.width * 0.91, y: world.height * 0.18 },
      { x: world.width * 0.12, y: world.height * 0.88 },
      { x: world.width * 0.91, y: world.height * 0.84 }
    ];
  } else if (region.type === "mine") {
    world.spawn = { x: world.width * 0.14, y: world.height * 0.52 };
    fillTiles(world, "wall");
    paintRect(world, world.width * 0.07, world.height * 0.18, world.width * 0.80, world.height * 0.62, "floorAlt");
    paintRoad(world, world.spawn, { x: world.width * 0.82, y: world.height * 0.36 }, 5);
    paintRect(world, world.width * 0.22, world.height * 0.48, world.width * 0.36, TILE_SIZE * 3, "path");
    addPlacedProp(world, "mine_entrance", world.width * 0.83, world.height * 0.33, 215, 175, { footprint: { w: 130, h: 38, y: 58 } });
    addPlacedProp(world, "mine_workbench", world.width * 0.35, world.height * 0.27, 135, 92, { footprint: { w: 94, h: 26, y: 28 } });
    addPlacedProp(world, "mine_lift_platform", world.width * 0.70, world.height * 0.63, 150, 112, { footprint: { w: 108, h: 36, y: 34 } });
    addPlacedProp(world, "mine_rope_winch", world.width * 0.55, world.height * 0.30, 118, 100, { footprint: { w: 80, h: 28, y: 32 } });
    addFactionNpcForRegion(world, state.currentScene, region);
    scatterRegionProps(world, ["mine_cart_prop", "mine_rail_segment", "mine_pickaxe_rack", "mine_ore_pile", "mine_crystal_ore_node", "mine_support_beam", "mine_lantern_post", "mine_supply_crates"], 36, { x: world.width * 0.20, y: world.height * 0.20, w: world.width * 0.62, h: world.height * 0.56 }, { sizeMin: 44, sizeMax: 92, collidable: true, spawnSafeRadius: 170 });
    world.walkerZones = [{ x: world.width * 0.36, y: world.height * 0.47, r: 310, type: "mine" }];
    world.enemyZones = [{ x: world.width * 0.66, y: world.height * 0.58 }, { x: world.width * 0.80, y: world.height * 0.28 }];
  } else if (region.type === "forest") {
    world.spawn = { x: world.width * 0.13, y: world.height * 0.50 };
    fillTiles(world, "floor");
    paintPatches(world, "floorAlt", 150, 3, 8);
    paintRoad(world, world.spawn, { x: world.width * 0.84, y: world.height * 0.46 }, 4);
    paintRoad(world, { x: world.width * 0.54, y: world.height * 0.46 }, { x: world.width * 0.52, y: world.height * 0.88 }, 3);
    paintRect(world, world.width * 0.39, world.height * 0.30, world.width * 0.25, world.height * 0.24, "floorAlt");
    addPlacedProp(world, "forest_magical_shrine", world.width * 0.54, world.height * 0.30, 175, 150, { footprint: { w: 105, h: 34, y: 50 } });
    addPlacedProp(world, "forest_portal_stone_circle", world.width * 0.62, world.height * 0.52, 145, 118, { footprint: { w: 100, h: 28, y: 34 }, occludesPlayer: false });
    addPlacedProp(world, "forest_ancient_arch", world.width * 0.45, world.height * 0.50, 150, 150, { footprint: { w: 96, h: 26, y: 40 } });
    addFactionNpcForRegion(world, state.currentScene, region);
    scatterRegionProps(world, ["forest_large_magical_tree", "forest_twisted_glowing_tree", "forest_fairy_mushroom_house", "forest_rune_stone_large", "forest_glowing_crystal_cluster", "forest_enchanted_stump", "forest_vine_monolith", "forest_luminous_flower_patch_large", "forest_magical_pond"], 44, { x: world.width * 0.14, y: world.height * 0.14, w: world.width * 0.72, h: world.height * 0.72 }, { sizeMin: 62, sizeMax: 142, collidable: true, spawnSafeRadius: 180 });
    scatterRegionProps(world, ["forest_glowing_mushroom_cluster", "forest_lantern_plant", "forest_small_rune_stone", "forest_enchanted_bush", "forest_fairy_signpost", "forest_vine_log", "forest_crystal_plant", "forest_floating_candle_altar", "forest_spell_totem", "forest_magical_herb_patch", "forest_fae_mailbox", "forest_luminous_root_cluster"], 34, { x: world.width * 0.18, y: world.height * 0.20, w: world.width * 0.66, h: world.height * 0.64 }, { sizeMin: 36, sizeMax: 70, collidable: false, occludesPlayer: false, spawnSafeRadius: 160 });
    world.walkerZones = [{ x: world.width * 0.54, y: world.height * 0.46, r: 380, type: "forest" }];
    world.enemyZones = [{ x: world.width * 0.76, y: world.height * 0.36 }, { x: world.width * 0.70, y: world.height * 0.76 }];
  } else if (region.type === "port") {
    world.spawn = { x: world.width * 0.50, y: world.height * 0.17 };
    fillTiles(world, "floor");
    paintRect(world, 0, world.height * 0.64, world.width, world.height * 0.36, "water");
    paintRect(world, world.width * 0.25, world.height * 0.48, world.width * 0.50, world.height * 0.22, "path");
    paintRect(world, world.width * 0.44, world.height * 0.32, world.width * 0.12, world.height * 0.40, "path");
    addWaterObstacle(world, 0, world.height * 0.66, world.width * 0.41, world.height * 0.34);
    addWaterObstacle(world, world.width * 0.59, world.height * 0.66, world.width * 0.41, world.height * 0.34);
    addWaterObstacle(world, world.width * 0.41, world.height * 0.78, world.width * 0.18, world.height * 0.22);
    addPlacedProp(world, "port_warehouse", world.width * 0.27, world.height * 0.34, 215, 165, { footprint: { w: 160, h: 52, y: 52 } });
    addPlacedProp(world, "port_harbor_office", world.width * 0.72, world.height * 0.39, 190, 150, { footprint: { w: 138, h: 44, y: 48 } });
    addPlacedProp(world, "port_lighthouse", world.width * 0.83, world.height * 0.22, 112, 195, { footprint: { w: 58, h: 34, y: 68 } });
    addPlacedProp(world, "port_crane_hoist", world.width * 0.38, world.height * 0.57, 145, 150, { footprint: { w: 86, h: 32, y: 48 } });
    addPlacedProp(world, "port_fishing_boat", world.width * 0.24, world.height * 0.80, 175, 125, { collidable: false, occludesPlayer: false });
    addPlacedProp(world, "port_rowboat", world.width * 0.76, world.height * 0.78, 125, 82, { collidable: false, occludesPlayer: false });
    addPlacedProp(world, "port_dock_section", world.width * 0.50, world.height * 0.70, 180, 92, { footprint: { w: 150, h: 38, y: 22 }, occludesPlayer: false });
    addFactionNpcForRegion(world, state.currentScene, region);
    scatterRegionProps(world, ["port_fish_market_stall", "port_boat_repair_shed", "port_mooring_posts", "port_fishing_nets", "port_cargo_stack"], 26, { x: world.width * 0.15, y: world.height * 0.28, w: world.width * 0.70, h: world.height * 0.38 }, { sizeMin: 48, sizeMax: 90, collidable: true, spawnSafeRadius: 170 });
    world.walkerZones = [{ x: world.width * 0.48, y: world.height * 0.45, r: 360, type: "port" }];
    world.enemyZones = [{ x: world.width * 0.22, y: world.height * 0.58 }, { x: world.width * 0.78, y: world.height * 0.58 }, { x: world.width * 0.50, y: world.height * 0.70 }];
  }

  createWalkers(world, region.walkers || 5);
  createEnemies(world, region.enemies || 6);
}

function createRegionWorld(scene, regionId) {
  const region = getRegionDefinition(regionId, scene);
  if (!region) return null;
  const world = createWorldShell(scene, region, region.biome);
  decorateRegionWorld(world);
  return world;
}

function getRegionProgress(regionId) {
  if (!state.quest.regionProgress[regionId]) {
    state.quest.regionProgress[regionId] = { visited: false, talked: false, optional: false, rewarded: false };
  }
  return state.quest.regionProgress[regionId];
}

function addJournalEntry(text, regionId = null) {
  const id = `${regionId || "general"}:${text}`;
  if (state.quest.journalEntries.some((entry) => entry.id === id)) return;
  state.quest.journalEntries.push({ id, regionId, text, time: Date.now() });
}

function registerRegionVisit(regionId) {
  const region = getRegionDefinition(regionId);
  if (!region) return;
  const progress = getRegionProgress(regionId);
  if (!progress.visited) {
    progress.visited = true;
    addJournalEntry(`Region decouverte: ${region.label}.`, regionId);
  }
  state.currentRegion = regionId;
}

function requiredFactionTalkCount() {
  return getRequiredFactionRegions().filter((regionId) => getRegionProgress(regionId).talked).length;
}

function allRequiredFactionsHeard() {
  const required = getRequiredFactionRegions();
  return required.length > 0 && required.every((regionId) => getRegionProgress(regionId).talked);
}

function transitionToRegion(targetRegionId) {
  const region = getRegionDefinition(targetRegionId);
  if (!region || !state.currentScene || !state.player) return;
  closeAllPanels();
  state.keysDown.clear();
  const stats = getEffectiveStats();
  state.world = createEmptyWorld(state.currentScene, targetRegionId);
  state.currentRegion = targetRegionId;
  state.player.x = state.world.spawn.x;
  state.player.y = state.world.spawn.y;
  state.player.hp = Math.min(Math.max(1, state.player.hp), stats.maxHp);
  state.player.stamina = stats.maxStamina;
  state.player.mana = Math.min(stats.maxMana, Math.max(state.player.mana, stats.maxMana * 0.45));
  state.camera.x = 0;
  state.camera.y = 0;
  registerRegionVisit(targetRegionId);
  addNotification(`Carte: ${region.label}`, 2.4, region.color || "#facc15");
  updateHud();
  updateGuideText();
  renderQuestJournal();
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
      archetype: char.archetype || null,
      spoken: false,
      factionIndex: index
    };
    world.npcs.push(npc);
  });
}

function createWalkers(world, count) {
  const zones = world.walkerZones && world.walkerZones.length
    ? world.walkerZones
    : [{ x: world.width * 0.5, y: world.height * 0.5, r: 260, type: "default" }];
  for (let i = 0; i < count; i += 1) {
    const zone = zones[i % zones.length];
    const spritePaths = getNeutralWalkerSheetPaths(zone.type);
    const spritePath = spritePaths.length ? spritePaths[i % spritePaths.length] : null;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * zone.r * 0.72;
    world.walkers.push({
      id: uid("walker"),
      talkable: false,
      x: clamp(zone.x + Math.cos(angle) * radius, 120, world.width - 120),
      y: clamp(zone.y + Math.sin(angle) * radius, 120, world.height - 120),
      homeX: zone.x,
      homeY: zone.y,
      leash: zone.r,
      zoneType: zone.type,
      r: 14,
      dir: Math.random() * Math.PI * 2,
      speed: 30 + Math.random() * 24,
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
  const loadout = BIOME_ENEMY_LOADOUTS[world.biome] || BIOME_ENEMY_LOADOUTS.urban;
  const skinColors = BIOME_SKIN_COLORS[world.biome] || BIOME_SKIN_COLORS.urban;
  const zones = world.enemyZones && world.enemyZones.length ? world.enemyZones : [world.spawn];
  const safePoints = [world.spawn, ...(world.master ? [{ x: world.master.x, y: world.master.y }] : []), ...world.npcs.map((npc) => ({ x: npc.x, y: npc.y })), ...world.merchants.map((m) => ({ x: m.x, y: m.y }))];
  const spriteSheetPath = getRegionEnemySheetPath(world.regionId || world.region?.type);
  for (let i = 0; i < count && world.enemies.length < MAX_ENEMIES; i += 1) {
    const typeId = loadout[i % loadout.length];
    const type = ENEMY_TYPES.find((entry) => entry.id === typeId) || ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
    const scale = 1 + Math.max(0, level - 1) * 0.12;
    const zone = zones[i % zones.length];
    let x = zone.x;
    let y = zone.y;
    let placed = false;
    for (let tries = 0; tries < 36 && !placed; tries += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 170 + Math.random() * 360;
      x = clamp(zone.x + Math.cos(angle) * radius, 160, world.width - 160);
      y = clamp(zone.y + Math.sin(angle) * radius, 160, world.height - 160);
      const inSafe = safePoints.some((pt) => Math.hypot(x - pt.x, y - pt.y) < 280);
      const blocked = world.obstacles.some((o) => circleRectIntersect(x, y, type.radius + 8, o));
      placed = !inSafe && !blocked;
    }
    if (!placed) continue;
    world.enemies.push({
      id: uid("enemy"), type, elite: false, x, y, r: type.radius,
      hp: Math.round(type.hp * scale), maxHp: Math.round(type.hp * scale),
      speed: type.speed * (1 + Math.max(0, level - 1) * 0.05), atk: Math.round(type.atk * scale),
      range: type.range, vision: type.vision, ranged: type.ranged, skinColor: skinColors[i % skinColors.length],
      spriteSheetPath,
      homeX: zone.x, homeY: zone.y, leash: 620,
      vx: 0, vy: 0, wanderT: 0, lastAttack: 0, immuneUntil: 0, facing: "down", moveVX: 0, moveVY: 0
    });
  }
}



function decorateMineZone(world, center) {
  if (!center || world.biome !== "forest") return;
  const mineX = center.x - 7 * TILE_SIZE;
  const mineY = center.y + 4 * TILE_SIZE;
  paintRect(world, mineX, mineY, 14 * TILE_SIZE, 9 * TILE_SIZE, "wall");
  paintRect(world, mineX + 2 * TILE_SIZE, mineY + TILE_SIZE, 10 * TILE_SIZE, 7 * TILE_SIZE, "floorAlt");
  paintRect(world, mineX + 3 * TILE_SIZE, mineY + 2 * TILE_SIZE, 8 * TILE_SIZE, 5 * TILE_SIZE, "path");
  for (let i = 0; i < 28; i += 1) {
    const x = mineX + (2 + Math.random() * 10) * TILE_SIZE;
    const y = mineY + (1.5 + Math.random() * 6.5) * TILE_SIZE;
    const size = 22 + Math.random() * 22;
    const kind = i % 4 === 0 ? "oreBlue" : i % 3 === 0 ? "oreGold" : "rock";
    world.deco.push({ id: uid("mine"), kind, x, y, w: size * 1.25, h: size, collidable: i % 3 !== 1 });
    if (i % 3 !== 1) world.obstacles.push({ x: x - size * 0.45, y: y - size * 0.35, w: size * 0.9, h: size * 0.7, soft: true });
  }
  world.deco.push({ id: uid("minecart"), kind: "mineCart", x: mineX + 9.6 * TILE_SIZE, y: mineY + 6.5 * TILE_SIZE, w: 78, h: 44, collidable: true });
  world.obstacles.push({ x: mineX + 9.0 * TILE_SIZE, y: mineY + 6.15 * TILE_SIZE, w: 92, h: 42, soft: true });
}

function bossNameForWorld(world) {
  const names = { forest: "Gardien du chantier", lab: "Prototype instable", hospital: "Crise logistique", space: "Sentinelle de dôme", coast: "Gardien des marées", urban: "Chef de patrouille" };
  return names[world.biome] || "Gardien de zone";
}

function decorateBossZone(world, zone) {
  paintRect(world, zone.x - 7 * TILE_SIZE, zone.y - 5 * TILE_SIZE, 14 * TILE_SIZE, 10 * TILE_SIZE, "floorAlt");
  paintRect(world, zone.x - 5 * TILE_SIZE, zone.y - 3 * TILE_SIZE, 10 * TILE_SIZE, 6 * TILE_SIZE, "path");
  const decorKinds = world.biome === "forest" ? ["wind", "rock", "oreBlue", "treeBroad"] : world.biome === "lab" ? ["terminal", "crate", "energyPillar", "oreBlue"] : world.biome === "coast" ? ["rockWater", "crate", "treePalm", "buoy"] : ["terminal", "crate", "energyPillar", "rock"];
  for (let i = 0; i < 18; i += 1) {
    const angle = (Math.PI * 2 * i) / 18;
    const radius = 170 + (i % 3) * 34;
    const kind = decorKinds[i % decorKinds.length];
    const x = zone.x + Math.cos(angle) * radius;
    const y = zone.y + Math.sin(angle) * radius;
    const w = kind === "wind" ? 78 : 42 + (i % 2) * 14;
    const h = kind === "wind" ? 118 : 42 + (i % 3) * 10;
    world.deco.push({ id: uid("bossdeco"), kind, x, y, w, h, collidable: kind !== "buoy" });
    if (kind !== "buoy") world.obstacles.push({ x: x - w * 0.35, y: y - h * 0.28, w: w * 0.7, h: h * 0.48, soft: true });
  }
}

function createBossEncounter(world, zoneCenters, hub) {
  const loadout = BIOME_ENEMY_LOADOUTS[world.biome] || BIOME_ENEMY_LOADOUTS.urban;
  const typeId = loadout[(world.levelNumber + 1) % loadout.length] || "juggernaut";
  const type = ENEMY_TYPES.find((entry) => entry.id === typeId) || ENEMY_TYPES[2];
  const zone = { x: world.width * 0.84, y: world.height * 0.76 };
  world.bossZone = zone;
  paintRoad(world, hub, zone, 4);
  decorateBossZone(world, zone);
  const scale = 1 + Math.max(0, world.levelNumber - 1) * 0.18;
  const hp = Math.round((190 + world.levelNumber * 34) * scale);
  world.enemies.push({ id: `boss_${world.levelNumber}`, type, boss: true, elite: true, bossName: bossNameForWorld(world), x: zone.x, y: zone.y, r: type.radius + 15, hp, maxHp: hp, speed: type.speed * 0.64, atk: Math.round((type.atk + 8 + world.levelNumber * 1.5) * scale), range: type.range + 20, vision: 560, ranged: true, skinColor: "#facc15", homeX: zone.x, homeY: zone.y, leash: 760, vx: 0, vy: 0, wanderT: 0, lastAttack: 0, lastSpecial: 0, immuneUntil: 0, facing: "down", moveVX: 0, moveVY: 0 });
}

function createEmptyWorld(scene, regionId = null) {
  const regionConfig = getSceneRegionConfig(scene);
  if (regionConfig) {
    const regionalWorld = createRegionWorld(scene, regionId || regionConfig.start);
    if (regionalWorld) return regionalWorld;
  }
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
    walkerZones: [],
    spawn: { x: width * 0.5, y: height * 0.55 }
  };

  fillTiles(world, "floor");
  paintPatches(world, "floorAlt", 140, 3, 9);

  const hub = { x: width * 0.5, y: height * 0.55 };
  const zoneCenters = [
    { x: width * 0.23, y: height * 0.24, type: "mine" },
    { x: width * 0.78, y: height * 0.26, type: "forest" },
    { x: width * 0.55, y: height * 0.83, type: "port" }
  ];
  world.walkerZones = zoneCenters.map((zone) => ({ x: zone.x, y: zone.y, type: zone.type, r: 260 }));
  world.enemyZones = zoneCenters.map((zone, index) => ({ x: zone.x + (index === 1 ? 240 : -120), y: zone.y + (index === 2 ? 220 : 40) }));

  for (const zone of zoneCenters) {
    paintRoad(world, hub, zone, 4);
  }
  paintRect(world, hub.x - 8 * TILE_SIZE, hub.y - 6 * TILE_SIZE, 16 * TILE_SIZE, 12 * TILE_SIZE, "path");

  buildBoundaries(world);
  populateStructures(world, zoneCenters, hub);
  decorateMineZone(world, zoneCenters[0]);
  populateDecorations(world, zoneCenters, hub);
  createNpcs(world, scene, zoneCenters);
  createWalkers(world, 8);
  createMerchant(world, hub);
  createGate(world, hub);
  createEnemies(world, 12 + world.levelNumber * 2);
  createBossEncounter(world, zoneCenters, hub);
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
    skinColor: (BIOME_SKIN_COLORS[world.biome] || BIOME_SKIN_COLORS.urban)[npc.factionIndex % 3],
    spriteSheetPath: getRegionEnemySheetPath(world.regionId || world.region?.type),
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
  state.quest.challenges[npc.id] = { active: true, completed: false, eliteId: elite.id, regionId: npc.regionId || state.currentRegion };
  addNotification(`Quete optionnelle: stabilise la zone de ${npc.name}.`, 3.4, "#ffc857");
}

async function loadScenarioData() {
  let data = null;
  try {
    const response = await fetch("../data/scenario.json", { cache: "no-cache" });
    data = await response.json();
  } catch (error) {
    console.warn("Impossible de charger scenario.json, fallback utilise.", error);
  }

  try {
    const personaResponse = await fetch("../data/personas.json", { cache: "no-cache" });
    state.personas = await personaResponse.json();
  } catch (error) {
    console.warn("Impossible de charger personas.json, fallback utilise.", error);
    state.personas = [];
  }

  try {
    const worldResponse = await fetch("../data/world.json", { cache: "no-cache" });
    state.worldLore = await worldResponse.json();
  } catch (error) {
    console.warn("Impossible de charger world.json, fallback utilise.", error);
    state.worldLore = null;
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
  if (DOM.avatarGrid) DOM.avatarGrid.innerHTML = "";
  state.selectedHeroId = state.selectedHeroId || HERO_PRESETS[0].id;

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

  updateClassAvatarSelectionUI();
}

function updateClassAvatarSelectionUI() {
  for (const item of DOM.classGrid.querySelectorAll(".class-item")) {
    item.classList.toggle("selected", item.dataset.classId === state.selectedClassId);
  }
  if (DOM.avatarGrid) {
    for (const item of DOM.avatarGrid.querySelectorAll(".avatar-item")) {
      item.classList.toggle("selected", item.dataset.heroId === state.selectedHeroId);
    }
  }
  DOM.startBtn.disabled = !state.selectedClassId;
}


function createEmptyEquipment() {
  return EQUIPMENT_SLOTS.reduce((acc, slot) => {
    acc[slot] = null;
    return acc;
  }, {});
}

function createEmptyTalents() {
  return { vigor: 0, focus: 0, agility: 0, skill1: 0, special: 0, mastery: 0 };
}

function chooseWeightedRarity() {
  const entries = Object.entries(RARITIES);
  const total = entries.reduce((sum, [, rarity]) => sum + rarity.weight, 0);
  let roll = Math.random() * total;
  for (const [id, rarity] of entries) {
    roll -= rarity.weight;
    if (roll <= 0) return id;
  }
  return "common";
}

function getEquipmentIconPath(classId, slot) {
  return `./assets/items/${classId || "warrior"}_${slot || "weapon"}.svg`;
}

function getItemIconPath(item) {
  if (!item) return null;
  if (item.iconPath) return item.iconPath;
  if (item.kind === "healthPotion") return ITEM_ICON_PATHS.healthPotion;
  if (item.kind === "manaPotion") return ITEM_ICON_PATHS.manaPotion;
  if (item.kind === "equipment") return getEquipmentIconPath(item.classId, item.slot);
  return null;
}

function createEquipmentDrop(enemy, forcedRarity = null) {
  const p = state.player;
  const rarity = forcedRarity || (enemy && enemy.boss ? (Math.random() < 0.25 ? "epic" : "rare") : (enemy && enemy.elite ? (Math.random() < 0.45 ? "epic" : "rare") : chooseWeightedRarity()));
  const slot = EQUIPMENT_SLOTS[Math.floor(Math.random() * EQUIPMENT_SLOTS.length)];
  const level = Math.max(1, state.world.levelNumber + Math.floor(Math.random() * 2));
  const classId = p ? p.classId : "warrior";
  const baseName = (CLASS_GEAR_NAMES[classId] || CLASS_GEAR_NAMES.warrior)[slot];
  const rarityDef = RARITIES[rarity];
  const stats = {};
  const focuses = SLOT_STAT_FOCUS[slot] || ["attack"];
  for (const stat of focuses) {
    const raw = Math.max(1, Math.round((level + 2) * rarityDef.mult * (stat === "attack" ? 0.85 : 1.15)));
    stats[stat] = raw;
  }
  return {
    id: uid("item"), kind: "equipment", slot, classId, level, rarity,
    name: `${rarityDef.label} ${baseName} +${level}`,
    stats, iconColor: rarityDef.color, iconShape: slot,
    iconPath: getEquipmentIconPath(classId, slot),
    value: Math.round(18 * level * rarityDef.mult)
  };
}

function statLabel(key) {
  return ({ attack: "Attaque", defense: "Defense", maxHp: "Vie", maxMana: "Mana", maxStamina: "Stamina", speed: "Vitesse" })[key] || key;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function itemSummary(item) {
  if (!item) return "Vide";
  if (item.kind === "healthPotion") return "Potion soin: restaure de la vie.";
  if (item.kind === "manaPotion") return "Potion mana: restaure du mana.";
  if (item.kind !== "equipment") return item.name || "Objet";
  const stats = Object.entries(item.stats || {}).map(([key, value]) => `${statLabel(key)} +${value}`).join(" | ");
  return `${item.name} (${SLOT_LABELS[item.slot]}) - ${RARITIES[item.rarity].label} - ${stats}`;
}

function itemDetailsHtml(item) {
  if (!item) return "Survole un objet pour voir ses statistiques. Glisse l'objet vers le bon slot pour l'equiper.";
  if (item.kind === "healthPotion" || item.kind === "manaPotion") return `<strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(itemSummary(item))}`;
  const rarity = RARITIES[item.rarity] || RARITIES.common;
  const stats = Object.entries(item.stats || {}).map(([key, value]) => `<li>${statLabel(key)}: +${value}</li>`).join("");
  return `<strong>${escapeHtml(item.name)}</strong><br><span class="rarity-name" style="color:${rarity.color}">${rarity.label}</span> - ${SLOT_LABELS[item.slot]} niv. ${item.level}<ul>${stats}</ul><small>Classe: ${CLASS_DEFS[item.classId]?.name || item.classId}</small>`;
}

function firstEmptyInventorySlot() {
  const p = state.player;
  return p ? p.inventory.findIndex((item) => !item) : -1;
}

function addItemToInventory(item) {
  const p = state.player;
  if (!p) return false;
  const index = firstEmptyInventorySlot();
  if (index < 0) {
    addNotification("Inventaire plein.", 2.2, "#ff8c8c");
    return false;
  }
  p.inventory[index] = item;
  addNotification(`${item.name} ajoute a l'inventaire.`, 2.4, RARITIES[item.rarity]?.color || "#d9eef8");
  renderInventory();
  return true;
}

function getTalentDefs() {
  const p = state.player;
  return p ? (TALENT_DEFS[p.classId] || TALENT_DEFS.warrior) : TALENT_DEFS.warrior;
}

function getTalentBonusStats() {
  const p = state.player;
  const bonus = { attack: 0, defense: 0, maxHp: 0, maxMana: 0, maxStamina: 0, speed: 0 };
  if (!p) return bonus;
  for (const def of getTalentDefs()) {
    const rank = p.talents?.[def.id] || 0;
    if (!rank || !def.stats) continue;
    for (const [key, value] of Object.entries(def.stats)) bonus[key] = (bonus[key] || 0) + value * rank;
  }
  return bonus;
}

function getEffectiveStats() {
  const p = state.player;
  if (!p) return { attack: 0, defense: 0, maxHp: 1, maxMana: 1, maxStamina: 1, speed: 0 };
  const stats = { attack: p.attack, defense: p.defense, maxHp: p.maxHp, maxMana: p.maxMana, maxStamina: p.maxStamina, speed: p.baseSpeed };
  const talentStats = getTalentBonusStats();
  for (const [key, value] of Object.entries(talentStats)) stats[key] = (stats[key] || 0) + value;
  for (const item of Object.values(p.equipment || {})) {
    if (!item || !item.stats) continue;
    for (const [key, value] of Object.entries(item.stats)) stats[key] = (stats[key] || 0) + value;
  }
  return stats;
}

function clampPlayerToEffectiveCaps() {
  const p = state.player;
  if (!p) return;
  const stats = getEffectiveStats();
  p.hp = Math.min(p.hp, stats.maxHp);
  p.mana = Math.min(p.mana, stats.maxMana);
  p.stamina = Math.min(p.stamina, stats.maxStamina);
}

function equipItemToSlot(index, slot) {
  const p = state.player;
  if (!p) return;
  const item = p.inventory[index];
  if (!item || item.kind !== "equipment") return;
  if (slot && item.slot !== slot) {
    addNotification(`Cet objet va dans le slot ${SLOT_LABELS[item.slot]}.`, 2.0, "#ff8c8c");
    return;
  }
  if (item.classId && item.classId !== p.classId) {
    addNotification("Cet objet ne correspond pas a ta classe.", 2.1, "#ff8c8c");
    return;
  }
  const previous = p.equipment[item.slot] || null;
  p.equipment[item.slot] = item;
  p.inventory[index] = previous;
  clampPlayerToEffectiveCaps();
  addNotification(`${SLOT_LABELS[item.slot]} equipe: ${item.name}`, 2.2, item.iconColor || "#67f0c8");
  updateHud();
  renderInventory();
}

function equipInventoryItem(index) {
  const p = state.player;
  if (!p) return;
  const item = p.inventory[index];
  if (!item) return;
  if (item.kind === "healthPotion") return useHealthPotionFromInventory(index);
  if (item.kind === "manaPotion") return useManaPotionFromInventory(index);
  equipItemToSlot(index, item.slot);
}

function discardInventoryItem(index) {
  const p = state.player;
  if (!p || !p.inventory[index]) return;
  const item = p.inventory[index];
  p.inventory[index] = null;
  addNotification(`${item.name} jete.`, 1.8, "#ff8c8c");
  renderInventory();
}

function unequipSlot(slot) {
  const p = state.player;
  if (!p || !p.equipment[slot]) return;
  const empty = firstEmptyInventorySlot();
  if (empty < 0) return addNotification("Inventaire plein.", 2.0, "#ff8c8c");
  p.inventory[empty] = p.equipment[slot];
  p.equipment[slot] = null;
  clampPlayerToEffectiveCaps();
  updateHud();
  renderInventory();
}

function gainXp(amount) {
  const p = state.player;
  if (!p) return;
  p.xp += amount;
  maybeLevelUp();
  updateHud();
}

function createPlayer() {
  const cls = CLASS_DEFS[state.selectedClassId];
  const hero = HERO_PRESETS.find((h) => h.id === state.selectedHeroId) || HERO_PRESETS[0];
  const startMana = cls.id === "mage" ? 130 : cls.id === "hunter" ? 90 : 70;
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
    dirX: 0,
    dirY: 1,
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
    maxMana: startMana,
    mana: startMana,
    manaRegenRate: cls.id === "mage" ? 30 : 24,
    manaRegenDelay: 1,
    lastManaSpend: -99,
    running: false,
    attack: cls.baseAttack,
    defense: cls.baseDefense,
    level: 1,
    xp: 0,
    xpToNext: 65,
    talentPoints: 0,
    talents: createEmptyTalents(),
    gold: 50,
    potions: 2,
    manaPotions: 1,
    weaponLevel: 1,
    armorLevel: 1,
    inventory: new Array(INVENTORY_SIZE).fill(null),
    equipment: createEmptyEquipment(),
    skillLevels: { skill1: 1, skill2: 1 },
    unlockedSkills: { skill1: false, skill2: false },
    lastBasic: -99,
    lastSkill1: -99,
    lastSkill2: -99,
    invulnUntil: 0,
    lastResourceWarn: -99
  };
}
function renderInventoryStats() {
  if (!DOM.inventoryStats || !state.player) return;
  const p = state.player;
  const stats = getEffectiveStats();
  DOM.inventoryStats.innerHTML = `<h3>Stats</h3><div class="stats-grid">
    <div class="stat-pill">Lvl<strong>${p.level}</strong></div>
    <div class="stat-pill">Points<strong>${p.talentPoints || 0}</strong></div>
    <div class="stat-pill">Attaque<strong>${Math.round(stats.attack)}</strong></div>
    <div class="stat-pill">Defense<strong>${Math.round(stats.defense)}</strong></div>
    <div class="stat-pill">Vie<strong>${Math.round(stats.maxHp)}</strong></div>
    <div class="stat-pill">Mana<strong>${Math.round(stats.maxMana)}</strong></div>
    <div class="stat-pill">Stamina<strong>${Math.round(stats.maxStamina)}</strong></div>
    <div class="stat-pill">Vitesse<strong>${Math.round(stats.speed)}</strong></div>
  </div>`;
}

function canUnlockTalent(def) {
  const p = state.player;
  if (!p) return false;
  const rank = p.talents?.[def.id] || 0;
  if (rank >= def.max) return false;
  if ((p.talentPoints || 0) <= 0) return false;
  if (def.levelReq && p.level < def.levelReq) return false;
  return true;
}

function unlockTalent(id) {
  const p = state.player;
  if (!p) return;
  const def = getTalentDefs().find((node) => node.id === id);
  if (!def || !canUnlockTalent(def)) return;
  p.talentPoints -= 1;
  p.talents[id] = (p.talents[id] || 0) + 1;
  if (def.skill) p.skillLevels[def.skill] = (p.skillLevels[def.skill] || 1) + 1;
  if (def.unlockSkill) p.unlockedSkills[def.unlockSkill] = true;
  const stats = getEffectiveStats();
  p.hp = Math.min(stats.maxHp, p.hp + 9999);
  p.mana = Math.min(stats.maxMana, p.mana + 9999);
  p.stamina = Math.min(stats.maxStamina, p.stamina + 9999);
  addNotification(`Talent appris: ${def.name}`, 2.4, "#ffc857");
  updateHud();
  renderInventory();
  renderGrimoire();
}

function renderTalentTree() {
  if (!DOM.talentGrid || !state.player) return;
  const p = state.player;
  DOM.talentGrid.innerHTML = "";
  if (DOM.talentPoints) DOM.talentPoints.textContent = `${p.talentPoints || 0} point${(p.talentPoints || 0) > 1 ? "s" : ""}`;
  for (const def of getTalentDefs()) {
    const rank = p.talents?.[def.id] || 0;
    const locked = !canUnlockTalent(def) && rank < def.max;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `talent-node ${locked ? "locked" : ""} ${rank >= def.max ? "maxed" : ""}`;
    button.innerHTML = `<img src="${def.icon}" alt=""><div><strong>${def.name} ${rank}/${def.max}</strong><small>${def.desc}${def.levelReq ? ` Niveau requis: ${def.levelReq}.` : ""}</small></div>`;
    button.title = def.desc;
    button.addEventListener("click", () => unlockTalent(def.id));
    DOM.talentGrid.appendChild(button);
  }
}

function skillMeta(skillKey) {
  const p = state.player;
  const defs = getTalentDefs();
  const def = defs.find((node) => node.skill === skillKey || node.unlockSkill === skillKey || node.id === skillKey);
  const fallback = skillKey === "skill1" ? "Compétence F" : "Compétence R";
  return { key: skillKey, label: def?.name || fallback, desc: def?.desc || "Compétence de classe.", icon: def?.icon || `./assets/talents/${skillKey === "skill2" ? "special" : "skill1"}.svg`, unlocked: skillKey === "skill1" ? !!p?.unlockedSkills?.skill1 : !!p?.unlockedSkills?.skill2, levelReq: skillKey === "skill1" ? 3 : (def?.levelReq || 3) };
}

function ensureDefaultHotbar() {
  if (!Array.isArray(state.hotbar) || state.hotbar.length !== 8) state.hotbar = new Array(8).fill(null);
  if (state.hotbar.some(Boolean)) return;
  state.hotbar[0] = { type: "consumable", kind: "healthPotion" };
  state.hotbar[1] = { type: "consumable", kind: "manaPotion" };
  state.hotbar[2] = { type: "skill", skill: "skill1" };
  state.hotbar[3] = { type: "skill", skill: "skill2" };
}

function hotbarEntryInfo(entry) {
  const p = state.player;
  if (!entry || !p) return null;
  if (entry.type === "consumable") {
    const isMana = entry.kind === "manaPotion";
    return { icon: isMana ? ITEM_ICON_PATHS.manaPotion : ITEM_ICON_PATHS.healthPotion, label: isMana ? "Potion mana" : "Potion soin", count: isMana ? p.manaPotions : p.potions, locked: false };
  }
  if (entry.type === "skill") {
    const meta = skillMeta(entry.skill);
    return { icon: meta.icon, label: meta.label, count: meta.unlocked ? "" : "L", locked: !meta.unlocked };
  }
  return null;
}

function setHotbarDragData(event, payload) {
  const json = JSON.stringify(payload);
  event.dataTransfer.setData("application/x-rpg-hotbar", json);
  event.dataTransfer.setData("text/plain", json);
  event.dataTransfer.effectAllowed = "copyMove";
}

function readHotbarDragData(event) {
  const raw = event.dataTransfer.getData("application/x-rpg-hotbar") || event.dataTransfer.getData("text/plain");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function assignHotbarSlot(slotIndex, payload) {
  if (!payload || slotIndex < 0 || slotIndex >= 8) return;
  ensureDefaultHotbar();
  if (payload.type === "skill") state.hotbar[slotIndex] = { type: "skill", skill: payload.skill };
  else if (payload.type === "consumable") state.hotbar[slotIndex] = { type: "consumable", kind: payload.kind };
  else return;
  renderHotbar();
  addNotification(`Raccourci ${slotIndex + 1} mis à jour.`, 1.6, "#67f0c8");
}

function activateHotbarSlot(slotIndex) {
  ensureDefaultHotbar();
  const entry = state.hotbar[slotIndex];
  if (!entry) return;
  const now = performance.now() / 1000;
  if (entry.type === "consumable") {
    if (entry.kind === "manaPotion") useManaPotion();
    else usePotion();
  } else if (entry.type === "skill") {
    if (entry.skill === "skill2") useSkill2(now);
    else useSkill1(now);
  }
}

function renderHotbar() {
  if (!DOM.hotbar || !state.player) return;
  ensureDefaultHotbar();
  DOM.hotbar.innerHTML = "";
  state.hotbar.forEach((entry, index) => {
    const info = hotbarEntryInfo(entry);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `hotbar-slot ${entry ? "" : "empty"} ${info?.locked ? "locked" : ""}`;
    button.dataset.key = String(index + 1);
    button.title = info ? `${index + 1}: ${info.label}` : `Raccourci ${index + 1}`;
    if (info) button.innerHTML = `<span class="hotbar-key">${index + 1}</span><img src="${info.icon}" alt=""><span class="hotbar-count">${info.count ?? ""}</span>`;
    button.addEventListener("click", () => activateHotbarSlot(index));
    button.addEventListener("dragover", (event) => { event.preventDefault(); button.classList.add("drag-over"); });
    button.addEventListener("dragleave", () => button.classList.remove("drag-over"));
    button.addEventListener("drop", (event) => { event.preventDefault(); button.classList.remove("drag-over"); assignHotbarSlot(index, readHotbarDragData(event)); });
    DOM.hotbar.appendChild(button);
  });
}

function renderSkillBook() {
  if (!DOM.skillGrid || !state.player) return;
  const p = state.player;
  const entries = [
    { type: "consumable", kind: "healthPotion", label: "Potion soin", desc: "Restaure une partie de la vie.", icon: ITEM_ICON_PATHS.healthPotion, count: p.potions, unlocked: true },
    { type: "consumable", kind: "manaPotion", label: "Potion mana", desc: "Restaure une partie du mana.", icon: ITEM_ICON_PATHS.manaPotion, count: p.manaPotions, unlocked: true },
    { type: "skill", skill: "skill1", ...skillMeta("skill1") },
    { type: "skill", skill: "skill2", ...skillMeta("skill2") }
  ];
  DOM.skillGrid.innerHTML = "";
  for (const entry of entries) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `skill-card ${entry.unlocked ? "" : "locked"}`;
    card.draggable = entry.unlocked;
    const lockText = entry.unlocked ? (entry.count !== undefined ? `Stock: ${entry.count}` : "Débloqué") : `Débloqué au niveau ${entry.levelReq}`;
    card.innerHTML = `<img src="${entry.icon}" alt=""><strong>${entry.label}</strong><small>${entry.desc}</small><span>${lockText}</span>`;
    if (entry.unlocked) {
      card.addEventListener("dragstart", (event) => setHotbarDragData(event, entry.type === "skill" ? { type: "skill", skill: entry.skill } : { type: "consumable", kind: entry.kind }));
      card.addEventListener("click", () => { const slot = state.hotbar.findIndex((value) => !value); assignHotbarSlot(slot >= 0 ? slot : 0, entry.type === "skill" ? { type: "skill", skill: entry.skill } : { type: "consumable", kind: entry.kind }); });
    }
    DOM.skillGrid.appendChild(card);
  }
}

function renderGrimoire() { renderSkillBook(); renderTalentTree(); renderHotbar(); }
function openGrimoire() { if (!state.player) return; state.overlay = "grimoire"; renderGrimoire(); DOM.grimoirePanel?.classList.remove("hidden"); }
function closeGrimoire() { DOM.grimoirePanel?.classList.add("hidden"); if (state.overlay === "grimoire") state.overlay = null; }

function renderInventory() {
  if (!state.player || !DOM.inventoryGrid) return;
  const p = state.player;
  const stats = getEffectiveStats();
  DOM.inventoryGrid.innerHTML = "";
  p.inventory.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.className = "inventory-cell";
    if (item) {
      const button = document.createElement("button");
      button.type = "button";
      button.draggable = true;
      button.className = `inventory-item rarity-${item.rarity || "common"}`;
      button.title = itemSummary(item);
      const icon = getItemIconPath(item);
      button.innerHTML = `${icon ? `<img class="item-img" src="${icon}" alt="">` : `<div class="inventory-icon" style="background:${item.iconColor || "#8aa0ad"}"></div>`}<span>${item.kind === "equipment" ? SLOT_LABELS[item.slot] : "Conso"}</span><strong>${escapeHtml(item.name)}</strong><span class="inventory-delete" role="button" aria-label="Jeter">x</span>`;
      button.addEventListener("click", () => equipInventoryItem(index));
      button.addEventListener("mouseenter", () => { if (DOM.itemTooltip) DOM.itemTooltip.innerHTML = itemDetailsHtml(item); });
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", String(index));
        if (item.kind === "healthPotion" || item.kind === "manaPotion") setHotbarDragData(event, { type: "consumable", kind: item.kind });
        else event.dataTransfer.effectAllowed = "move";
      });
      button.querySelector(".inventory-delete")?.addEventListener("click", (event) => {
        event.stopPropagation();
        discardInventoryItem(index);
      });
      cell.appendChild(button);
    }
    DOM.inventoryGrid.appendChild(cell);
  });
  if (DOM.inventoryPlayerPreview) {
    const icon = CLASS_DEFS[p.classId].icon;
    DOM.inventoryPlayerPreview.innerHTML = `<div><img src="${icon}" alt="${p.className}"><strong>${p.heroName}</strong><span>${p.className} niv. ${p.level}</span><span>XP ${Math.round(p.xp)}/${Math.round(p.xpToNext)}</span></div>`;
  }
  renderInventoryStats();
  if (DOM.equipmentSlots) {
    for (const button of DOM.equipmentSlots.querySelectorAll(".equipment-slot")) {
      const slot = button.dataset.slot;
      const item = p.equipment[slot];
      const icon = getItemIconPath(item);
      button.className = `equipment-slot ${item ? `rarity-${item.rarity}` : ""}`;
      button.title = itemSummary(item);
      button.dataset.accept = "true";
      button.innerHTML = `<span>${SLOT_LABELS[slot]}</span>${icon ? `<img class="item-img" src="${icon}" alt="">` : ""}<strong>${item ? escapeHtml(item.name) : "Vide"}</strong>`;
      button.onclick = () => unequipSlot(slot);
      button.ondragover = (event) => { event.preventDefault(); button.classList.add("drag-over"); };
      button.ondragleave = () => button.classList.remove("drag-over");
      button.ondrop = (event) => {
        event.preventDefault();
        button.classList.remove("drag-over");
        const index = Number(event.dataTransfer.getData("text/plain"));
        if (Number.isFinite(index)) equipItemToSlot(index, slot);
      };
    }
  }
  if (DOM.inventoryTrash) {
    DOM.inventoryTrash.ondragover = (event) => { event.preventDefault(); DOM.inventoryTrash.classList.add("drag-over"); };
    DOM.inventoryTrash.ondragleave = () => DOM.inventoryTrash.classList.remove("drag-over");
    DOM.inventoryTrash.ondrop = (event) => {
      event.preventDefault();
      DOM.inventoryTrash.classList.remove("drag-over");
      const index = Number(event.dataTransfer.getData("text/plain"));
      if (Number.isFinite(index)) discardInventoryItem(index);
    };
  }
  renderHotbar();
  if (DOM.inventoryDetails) {
    DOM.inventoryDetails.textContent = `Soin: ${p.potions} | Mana: ${p.manaPotions} | Inventaire: ${p.inventory.filter(Boolean).length}/${INVENTORY_SIZE}`;
  }
}

function openInventory() {
  if (!state.player) return;
  state.overlay = "inventory";
  renderInventory();
  DOM.inventoryPanel.classList.remove("hidden");
}

function closeInventory() {
  DOM.inventoryPanel.classList.add("hidden");
  if (state.overlay === "inventory") state.overlay = null;
}


function showTutorialStep(index = 0) {
  state.tutorial.active = true;
  state.tutorial.step = clamp(index, 0, TUTORIAL_STEPS.length - 1);
  state.overlay = "tutorial";
  const step = TUTORIAL_STEPS[state.tutorial.step];
  DOM.tutorialTitle.textContent = fixText(step.title);
  DOM.tutorialBody.textContent = fixText(step.body);
  DOM.tutorialAction.textContent = fixText(step.label);
  DOM.tutorialProgress.textContent = `${state.tutorial.step + 1}/${TUTORIAL_STEPS.length}`;
  DOM.tutorialPanel.classList.remove("hidden");
}

function finishTutorial() {
  state.tutorial.active = false;
  state.overlay = null;
  DOM.tutorialPanel.classList.add("hidden");
  addNotification("Tutoriel termin?. Explore, combats, puis parle aux conseillers.", 3.2, "#67f0c8");
}

function handleTutorialInput(event) {
  const step = TUTORIAL_STEPS[state.tutorial.step];
  if (!step || !step.keys.includes(event.code)) return false;
  event.preventDefault();
  state.keysDown.clear();
  if (state.tutorial.step >= TUTORIAL_STEPS.length - 1) finishTutorial();
  else showTutorialStep(state.tutorial.step + 1);
  return true;
}

function resetQuestProgress() {
  state.quest.talked = new Set();
  state.quest.seals = new Set();
  state.quest.challenges = {};
  state.quest.regionProgress = {};
  state.quest.journalEntries = [];
  state.quest.rewarded = new Set();
  state.quest.voteUnlocked = false;
}

function closeAllPanels() {
  DOM.chatPanel.classList.add("hidden");
  DOM.votePanel.classList.add("hidden");
  DOM.pausePanel.classList.add("hidden");
  DOM.grimoirePanel?.classList.add("hidden");
  DOM.merchantPanel.classList.add("hidden");
  DOM.inventoryPanel.classList.add("hidden");
  DOM.guidePanel.classList.add("hidden");
  DOM.questPanel?.classList.add("hidden");
  DOM.tutorialPanel.classList.add("hidden");
  state.overlay = null;
  state.chatNpc = null;
}

function computeObjectiveText() {
  const config = getSceneRegionConfig();
  if (config) {
    const required = getRequiredFactionRegions();
    const heard = requiredFactionTalkCount();
    const current = getRegionDefinition(state.currentRegion) || state.world?.region;
    if (!allRequiredFactionsHeard()) {
      return `${current?.shortLabel || "Carte"}: ecouter les factions (${heard}/${required.length}) | J journal`;
    }
    return state.currentRegion === config.start
      ? "Parler au Maitre du village pour voter"
      : "Retourner au village pour le conseil final";
  }

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
  const stats = getEffectiveStats();
  DOM.hudScene.textContent = `Niveau: ${state.currentScene.id.replace("level_", "")}/50`;
  DOM.hudClass.textContent = `Classe: ${p.className}`;
  DOM.hudHero.textContent = `Héros: ${p.heroName}`;
  DOM.hudLevel.innerHTML = `Lvl: <strong>${p.level}</strong>${(p.talentPoints || 0) > 0 ? `<span class="talent-plus" title="Points ? d?penser dans le grimoire">+${p.talentPoints}</span>` : ""}`;
  DOM.hudLevel.classList.toggle("has-talent", (p.talentPoints || 0) > 0);
  DOM.hudHp.textContent = `HP: ${Math.max(0, Math.round(p.hp))}/${Math.round(stats.maxHp)}`;
  DOM.hudXp.textContent = `XP: ${Math.round(p.xp)}/${Math.round(p.xpToNext)}`;
  DOM.hudGold.textContent = `Or: ${Math.round(p.gold)} | Soin: ${p.potions} | Mana: ${p.manaPotions}`;
  DOM.hudObjective.textContent = `Objectif: ${computeObjectiveText()}`;
  setResourceBar(DOM.barHpFill, DOM.barHpText, p.hp, stats.maxHp);
  setResourceBar(DOM.barStaminaFill, DOM.barStaminaText, p.stamina, stats.maxStamina);
  setResourceBar(DOM.barManaFill, DOM.barManaText, p.mana, stats.maxMana);
  setResourceBar(DOM.barXpFill, DOM.barXpText, p.xp, p.xpToNext);
}

function showLevelUpAnimation(level) {
  if (!DOM.hudLevel) return;
  DOM.hudLevel.classList.remove("level-bump");
  void DOM.hudLevel.offsetWidth;
  DOM.hudLevel.classList.add("level-bump");
  const root = document.getElementById("game-root") || document.body;
  const pop = document.createElement("div");
  pop.className = "level-up-pop";
  pop.textContent = "NIVEAU " + level;
  root.appendChild(pop);
  window.setTimeout(() => pop.remove(), 1500);
}

function updateGuideText() {
  if (!state.currentScene) {
    DOM.guideText.textContent = "Choisis ton heros et ta classe pour commencer.";
    return;
  }
  const config = getSceneRegionConfig();
  if (config) {
    const region = getRegionDefinition(state.currentRegion);
    DOM.guideText.textContent = `${computeObjectiveText()}. Carte actuelle: ${region?.label || "region"}. Le dilemme reste ouvert: aucune faction n'a automatiquement raison. Ouvre le journal avec J si tu es perdu.`;
    return;
  }
  DOM.guideText.textContent = `${computeObjectiveText()}. Dilemme: ${state.currentScene.theme}.`;
}

function startGameAtScene(sceneId = "level_1") {
  const scene = state.scenes[sceneId] || state.scenes[state.sceneOrder[0]];
  if (!scene) return;
  state.currentScene = scene;
  resetQuestProgress();
  const config = getSceneRegionConfig(scene);
  state.currentRegion = config ? config.start : null;
  state.world = createEmptyWorld(scene, state.currentRegion);
  state.player = createPlayer();
  if (state.currentRegion) registerRegionVisit(state.currentRegion);
  state.mode = "running";
  state.overlay = null;
  DOM.classPanel.classList.add("hidden");
  updateHud();
  updateGuideText();
  ensureDefaultHotbar();
  renderInventory();
  renderHotbar();
  renderQuestJournal();
  showTutorialStep(0);
  addNotification(`Mission: ${scene.theme}`, 3.4, "#67f0c8");
}

function loadSceneById(sceneId, keepPlayerProgress = true) {
  const scene = state.scenes[sceneId];
  if (!scene) return;

  state.currentScene = scene;
  resetQuestProgress();
  const config = getSceneRegionConfig(scene);
  state.currentRegion = config ? config.start : null;
  state.world = createEmptyWorld(scene, state.currentRegion);
  if (state.currentRegion) registerRegionVisit(state.currentRegion);

  if (keepPlayerProgress && state.player) {
    state.player.x = state.world.spawn.x;
    state.player.y = state.world.spawn.y;
    const stats = getEffectiveStats();
    state.player.hp = stats.maxHp;
    state.player.stamina = stats.maxStamina;
    state.player.mana = stats.maxMana;
  } else {
    state.player = createPlayer();
  }

  state.mode = "running";
  state.overlay = null;
  closeAllPanels();
  updateHud();
  updateGuideText();
  ensureDefaultHotbar();
  renderInventory();
  renderHotbar();
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
  const stats = getEffectiveStats();
  if (now - p.lastStaminaSpend >= p.staminaRegenDelay) {
    p.stamina = Math.min(stats.maxStamina, p.stamina + p.staminaRegenRate * dt);
  }
  if (now - p.lastManaSpend >= p.manaRegenDelay) {
    p.mana = Math.min(stats.maxMana, p.mana + p.manaRegenRate * dt);
  }
}



function updatePlayer(dt, now) {
  const p = state.player;
  if (!p || state.overlay) return;
  const stats = getEffectiveStats();

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

    if (Math.abs(rawMoveX) > 0 && Math.abs(rawMoveY) > 0) {
      p.facing = `${rawMoveY > 0 ? "down" : "up"}${rawMoveX > 0 ? "Right" : "Left"}`;
    } else if (Math.abs(rawMoveX) > 0) {
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

  moveEntityWithCollision(p, moveX * stats.speed * speedMultiplier * dt, moveY * stats.speed * speedMultiplier * dt);
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


function consumeSkillResources(skillKey, now) {
  const p = state.player;
  if (!p) return false;
  const manaCost = (skillKey === "skill1" ? RESOURCE_RULES.skill1Mana : RESOURCE_RULES.skill2Mana)[p.classId] || 0;
  const staminaCost = RESOURCE_RULES.skillStamina[p.classId]?.[skillKey] || 0;
  if (p.mana < manaCost) {
    if (canShowResourceWarning(p, now)) { addNotification("Mana insuffisant.", 1.3, "#8ac7ff"); p.lastResourceWarn = now; }
    return false;
  }
  if (p.stamina < staminaCost) {
    if (canShowResourceWarning(p, now)) { addNotification("Stamina insuffisante.", 1.3, "#ffc857"); p.lastResourceWarn = now; }
    return false;
  }
  if (manaCost > 0) consumeMana(manaCost, now, false);
  if (staminaCost > 0) consumeStamina(staminaCost, now, false);
  return true;
}
function tryBasicAttack(now) {
  const p = state.player;
  const cls = CLASS_DEFS[p.classId];
  const stats = getEffectiveStats();
  const cooldown = cls.id === "warrior" ? 0.48 : 0.34;
  if (now - p.lastBasic < cooldown) return;
  const staminaCost = RESOURCE_RULES.basicStamina[p.classId] || 0;
  const manaCost = RESOURCE_RULES.basicMana[p.classId] || 0;
  if (staminaCost > 0 && !consumeStamina(staminaCost, now, true)) return;
  if (manaCost > 0 && !consumeMana(manaCost, now, true)) return;
  p.lastBasic = now;

  if (cls.basicKind === "melee") {
    const center = { x: p.x + p.dirX * 48, y: p.y + p.dirY * 48 };
    const damage = Math.round(stats.attack + p.level * 1.2);
    damageEnemiesInCircle(center.x, center.y, 48, damage, 36);
    spawnFx(center.x, center.y, FX_PATHS.slash_warrior, 0.2, 78);
  } else {
    const baseDamage = Math.round(stats.attack + p.level * 1.1);
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
  if (!p.unlockedSkills?.skill1) {
    addNotification("Skill F verrouillé: atteins le niveau 3 pour le débloquer dans le grimoire.", 2.4, "#c084fc");
    return;
  }
  const stats = getEffectiveStats();
  const cooldown = 2.3 - Math.min(0.8, (p.skillLevels.skill1 - 1) * 0.08);
  if (now - p.lastSkill1 < cooldown) return;
  if (!consumeSkillResources("skill1", now)) return;
  p.lastSkill1 = now;

  if (p.classId === "warrior") {
    moveEntityWithCollision(p, p.dirX * 56, p.dirY * 56);
    const hit = { x: p.x + p.dirX * 42, y: p.y + p.dirY * 42 };
    damageEnemiesInCircle(hit.x, hit.y, 58, Math.round(stats.attack * 1.7), 70, 0.7);
    spawnFx(hit.x, hit.y, FX_PATHS.slash_warrior, 0.24, 96);
  } else if (p.classId === "mage") {
    spawnProjectile({
      from: "player",
      kind: "arcane",
      x: p.x + p.dirX * 20,
      y: p.y + p.dirY * 20,
      vx: p.dirX * 360,
      vy: p.dirY * 360,
      dmg: Math.round(stats.attack * 1.9),
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
        dmg: Math.round(stats.attack * 1.15),
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
  if (!p.unlockedSkills || !p.unlockedSkills.skill2) {
    addNotification("Skill R verrouillé: débloque le talent spécial dans le grimoire.", 2.2, "#c084fc");
    return;
  }
  const stats = getEffectiveStats();
  const cooldown = 3.6 - Math.min(1.2, (p.skillLevels.skill2 - 1) * 0.12);
  if (now - p.lastSkill2 < cooldown) return;
  if (!consumeSkillResources("skill2", now)) return;
  p.lastSkill2 = now;

  if (p.classId === "warrior") {
    damageEnemiesInCircle(p.x, p.y, 76, Math.round(stats.attack * 2.15), 84);
    spawnFx(p.x, p.y, FX_PATHS.slash_warrior, 0.3, 116);
  } else if (p.classId === "mage") {
    damageEnemiesInCircle(p.x, p.y, 88, Math.round(stats.attack * 2.0), 62);
    spawnFx(p.x, p.y, FX_PATHS.burst_mage, 0.34, 128);
  } else {
    p.invulnUntil = now + 0.38;
    moveEntityWithCollision(p, p.dirX * 120, p.dirY * 120);
    damageEnemiesInCircle(p.x + p.dirX * 10, p.y + p.dirY * 10, 60, Math.round(stats.attack * 1.8), 80);
    spawnFx(p.x, p.y, FX_PATHS.slash_hunter, 0.26, 102);
  }
}



function awardFactionQuestReward(npc) {
  if (!npc || state.quest.rewarded.has(npc.id) || !state.player) return;
  state.quest.rewarded.add(npc.id);
  const p = state.player;
  const gold = 55 + state.world.levelNumber * 10;
  const xp = 110 + state.world.levelNumber * 35;
  p.gold += gold;
  gainXp(xp);
  const reward = createEquipmentDrop({ elite: true, boss: false }, Math.random() < 0.24 ? "epic" : "rare");
  reward.name = `${reward.name} - ${npc.name}`;
  addItemToInventory(reward);
  const region = getRegionDefinition(npc.regionId);
  addJournalEntry(`Quete terminee: ${region?.questOptional || "zone stabilisee"}. Recompense recue.`, npc.regionId);
  addNotification(`Quete de ${npc.name}: +${gold} or, +${xp} XP, objet rare.`, 3.4, "#facc15");
  renderQuestJournal();
}

function onEnemyDefeated(enemy) {
  const xpGain = enemy.boss ? 420 + state.world.levelNumber * 80 : (enemy.elite ? 150 : 42);
  const goldGain = enemy.boss ? 90 + state.world.levelNumber * 14 : (enemy.elite ? 32 : 6 + Math.floor(Math.random() * 6));
  const orbCount = enemy.boss ? 12 : (enemy.elite ? 5 : 2 + Math.floor(Math.random() * 3));
  for (let i = 0; i < orbCount; i += 1) {
    const angle = (Math.PI * 2 * i) / orbCount;
    state.world.loot.push({ id: uid("loot"), x: enemy.x + Math.cos(angle) * (16 + Math.random() * 18), y: enemy.y + Math.sin(angle) * (16 + Math.random() * 18), kind: "xp", amount: Math.ceil(xpGain / orbCount), ttl: 30 });
  }
  state.world.loot.push({ id: uid("loot"), x: enemy.x + 10, y: enemy.y - 8, kind: "gold", amount: goldGain, ttl: 30 });
  const dropRoll = Math.random();
  if (enemy.boss) {
    state.world.loot.push({ id: uid("loot"), x: enemy.x - 18, y: enemy.y + 8, kind: "equipment", item: createEquipmentDrop(enemy, Math.random() < 0.18 ? "epic" : "rare"), ttl: 45 });
    addNotification(`${enemy.bossName || "Boss"} vaincu: gros gain d XP et objet rare!`, 3.2, "#facc15");
  } else if (enemy.elite || dropRoll < 0.2) {
    state.world.loot.push({ id: uid("loot"), x: enemy.x - 14, y: enemy.y + 8, kind: "equipment", item: createEquipmentDrop(enemy), ttl: 35 });
  } else if (dropRoll < 0.32) {
    state.world.loot.push({ id: uid("loot"), x: enemy.x - 14, y: enemy.y + 8, kind: Math.random() < 0.55 ? "healthPotion" : "manaPotion", amount: 1, ttl: 30 });
  }
  if (enemy.challengeNpcId) {
    state.quest.seals.add(enemy.challengeNpcId);
    const challenge = state.quest.challenges[enemy.challengeNpcId];
    if (challenge) { challenge.active = false; challenge.completed = true; }
    const npc = state.world.npcs.find((entry) => entry.id === enemy.challengeNpcId);
    const regionId = npc?.regionId || challenge?.regionId;
    if (regionId) getRegionProgress(regionId).optional = true;
    if (npc) awardFactionQuestReward(npc);
    addNotification("Zone stabilisee. Objectif secondaire rempli.", 2.8, "#67f0c8");
    updateGuideText();
    renderQuestJournal();
  }
  updateHud();
}

function maybeLevelUp() {
  const p = state.player;
  let leveled = false;
  let unlockedSkill1 = false;
  while (p.xp >= p.xpToNext) {
    p.xp -= p.xpToNext;
    p.level += 1;
    p.xpToNext = Math.round(65 + p.level * 32 + Math.pow(p.level, 1.22) * 12);
    p.attack += p.classId === "mage" ? 2.2 : 2;
    p.maxHp += p.classId === "warrior" ? 14 : p.classId === "hunter" ? 11 : 9;
    p.maxStamina += p.classId === "mage" ? 1 : 3;
    p.maxMana += p.classId === "mage" ? 10 : 5;
    if (p.level % 2 === 0) p.defense += 1;
    p.talentPoints = (p.talentPoints || 0) + 1;
    if (p.level >= 3 && !p.unlockedSkills?.skill1) {
      p.unlockedSkills = { ...(p.unlockedSkills || {}), skill1: true };
      unlockedSkill1 = true;
    }
    const stats = getEffectiveStats();
    p.hp = stats.maxHp;
    p.stamina = stats.maxStamina;
    p.mana = stats.maxMana;
    leveled = true;
  }
  if (leveled) {
    playSfx("enemyDead", 0.65);
    showLevelUpAnimation(p.level);
    addNotification(`Niveau ${p.level} atteint! ${p.talentPoints} point(s) de talent à dépenser dans le grimoire.`, 3.8, "#ffc857");
    if (unlockedSkill1) addNotification("Compétence F débloquée! Glisse-la depuis le grimoire vers la barre rapide.", 3.4, "#c084fc");
  }
  renderInventory();
  renderGrimoire();
}


function damagePlayer(rawDamage, now) {
  const p = state.player;
  if (!p || now < p.invulnUntil) return;
  const stats = getEffectiveStats();
  const reduced = Math.max(1, Math.round(rawDamage - stats.defense * 0.35));
  p.hp -= reduced;
  p.invulnUntil = now + 0.6;
  playSfx("hitPlayer", 0.65);
  updateHud();

  if (p.hp <= 0) {
    p.hp = stats.maxHp;
    p.stamina = stats.maxStamina;
    p.mana = stats.maxMana;
    p.x = state.world.spawn.x;
    p.y = state.world.spawn.y;
    p.gold = Math.max(0, p.gold - 25);
    addNotification("Défaite temporaire. Repli au camp.", 3.2, "#ff8c8c");
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

    const homeDist = Math.hypot(enemy.x - (enemy.homeX || enemy.x), enemy.y - (enemy.homeY || enemy.y));
    if (homeDist > (enemy.leash || 620)) {
      vx = ((enemy.homeX || enemy.x) - enemy.x) / (homeDist || 1);
      vy = ((enemy.homeY || enemy.y) - enemy.y) / (homeDist || 1);
    } else if (dist < enemy.vision) {
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

    if (enemy.boss && dist < enemy.vision && now - (enemy.lastSpecial || 0) > 3.2) {
      enemy.lastSpecial = now;
      const shots = 8;
      for (let i = 0; i < shots; i += 1) {
        const angle = (Math.PI * 2 * i) / shots + (now % 1) * 0.7;
        spawnProjectile({ from: "enemy", kind: "boss_orb", x: enemy.x, y: enemy.y, vx: Math.cos(angle) * 250, vy: Math.sin(angle) * 250, dmg: Math.round(enemy.atk * 0.72), ttl: 1.65, r: 9, color: "#facc15" });
      }
      spawnFx(enemy.x, enemy.y, FX_PATHS.burst_mage, 0.32, enemy.r * 5);
    }

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
    const homeDx = (walker.homeX || walker.x) - walker.x;
    const homeDy = (walker.homeY || walker.y) - walker.y;
    const homeDist = Math.hypot(homeDx, homeDy);
    if (walker.wanderT <= 0 || homeDist > (walker.leash || 260)) {
      walker.dir = homeDist > (walker.leash || 260)
        ? Math.atan2(homeDy, homeDx) + (Math.random() - 0.5) * 0.55
        : Math.random() * Math.PI * 2;
      walker.wanderT = 0.8 + Math.random() * 2;
    }

    const dx = Math.cos(walker.dir) * walker.speed * dt;
    const dy = Math.sin(walker.dir) * walker.speed * dt;
    const prevX = walker.x;
    const prevY = walker.y;
    moveEntityWithCollision(walker, dx, dy);
    if (Math.hypot(walker.x - (walker.homeX || walker.x), walker.y - (walker.homeY || walker.y)) > (walker.leash || 260) + 36) {
      walker.x = prevX;
      walker.y = prevY;
      walker.dir = Math.atan2((walker.homeY || walker.y) - walker.y, (walker.homeX || walker.x) - walker.x);
      walker.wanderT = 0.4;
    }

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
  const p = state.player;
  for (const loot of state.world.loot) {
    loot.ttl -= dt;
    if (p) {
      const d = Math.hypot(loot.x - p.x, loot.y - p.y);
      if (d < 170) {
        const pull = (loot.kind === "xp" ? 520 : 360) * dt;
        loot.x += ((p.x - loot.x) / (d || 1)) * pull;
        loot.y += ((p.y - loot.y) / (d || 1)) * pull;
      }
    }
  }
  state.world.loot = state.world.loot.filter((loot) => loot.ttl > 0);
}

function collectNearbyLoot() {
  const p = state.player;
  for (const loot of state.world.loot) {
    const d = Math.hypot(loot.x - p.x, loot.y - p.y);
    if (d >= p.r + 34) continue;
    if (loot.kind === "gold") p.gold += loot.amount;
    else if (loot.kind === "xp") gainXp(loot.amount);
    else if (loot.kind === "healthPotion") p.potions += loot.amount || 1;
    else if (loot.kind === "manaPotion") p.manaPotions += loot.amount || 1;
    else if (loot.kind === "equipment") {
      if (!addItemToInventory(loot.item)) continue;
    }
    loot.ttl = -1;
  }
  state.world.loot = state.world.loot.filter((loot) => loot.ttl > 0);
  updateHud();
}
function updateGateState() {
  const config = getSceneRegionConfig();
  const ready = config ? allRequiredFactionsHeard() : (state.quest.talked.size >= state.world.npcs.length && state.quest.seals.size >= state.world.npcs.length);
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
      const tileIndex = ty * world.tilesW + tx;
      const type = world.tileData[tileIndex];
      const px = tx * TILE_SIZE - camX;
      const py = ty * TILE_SIZE - camY;
      const tilePath = world.tileOverrides?.[tileIndex] || getRegionTilePath(world, type, tx, ty);
      const tileImg = tilePath ? state.assets.images[tilePath] : null;
      if (tileImg) {
        ctx.drawImage(tileImg, px, py, TILE_SIZE + 1, TILE_SIZE + 1);
      } else {
        ctx.fillStyle = tileColorForType(type, palette);
        ctx.fillRect(px, py, TILE_SIZE + 1, TILE_SIZE + 1);
      }

      const seed = (tx * 928371 + ty * 364479 + world.levelNumber * 9176) % 17;
      if (type === "path") {
        ctx.fillStyle = seed % 3 === 0 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.045)";
        ctx.fillRect(px + (seed % 5) * 5, py + ((seed * 3) % 5) * 5, 10, 5);
      } else if (type === "floorAlt") {
        ctx.fillStyle = seed % 4 === 0 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.025)";
        ctx.fillRect(px + 5, py + 5, TILE_SIZE - 10, TILE_SIZE - 10);
      }

      if (type === "wall") {
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.strokeRect(px + 0.5, py + 0.5, TILE_SIZE, TILE_SIZE);
      } else if ((tx + ty) % 2 === 0) {
        ctx.strokeStyle = "rgba(255,255,255,0.018)";
        ctx.strokeRect(px + 0.5, py + 0.5, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}



function drawDecor(camX, camY) {
  const p = state.player;
  for (const deco of state.world.deco) {
    const x = deco.x - deco.w / 2 - camX;
    const y = deco.y - deco.h / 2 - camY;
    if (x > window.innerWidth + 64 || y > window.innerHeight + 64 || x + deco.w < -64 || y + deco.h < -64) continue;

    const coversPlayer = p && deco.occludesPlayer && rectsOverlap(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2, deco.x - deco.w / 2, deco.y - deco.h / 2, deco.w, deco.h);
    if (coversPlayer) ctx.globalAlpha = 0.34;

    if (deco.kind === "structure") {
      ctx.fillStyle = deco.color || "#475569";
      ctx.fillRect(x, y, deco.w, deco.h);
      ctx.fillStyle = deco.roofColor || "#1f2937";
      ctx.fillRect(x - 8, y - 16, deco.w + 16, 26);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(x + 26, y + 44, 38, 30);
      ctx.fillRect(x + deco.w - 64, y + 44, 38, 30);
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(x + deco.w / 2 - 34, y + deco.h - 38, 68, 38);
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, deco.w, deco.h);
      ctx.font = "12px Segoe UI";
      ctx.fillStyle = "rgba(255,255,255,0.82)";
      ctx.fillText(deco.label || "Zone", x + 14, y + 22);
    } else {
      drawDecorProp(deco, x, y);
    }
    if (coversPlayer) ctx.globalAlpha = 1;
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


function drawPortals(camX, camY) {
  if (!state.world.portals) return;
  const pulse = 1 + Math.sin(performance.now() * 0.004) * 0.06;
  for (const portal of state.world.portals) {
    const x = portal.x - camX;
    const y = portal.y - camY;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = "rgba(0,0,0,0.42)";
    ctx.beginPath();
    ctx.ellipse(0, 14, 42, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = portal.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-26, 22);
    ctx.lineTo(0, -30);
    ctx.lineTo(26, 22);
    ctx.stroke();
    ctx.fillStyle = portal.color;
    ctx.beginPath();
    ctx.moveTo(0, -38);
    ctx.lineTo(9, -18);
    ctx.lineTo(-9, -18);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    if (Math.hypot(state.player.x - portal.x, state.player.y - portal.y) < 88) {
      drawEntityLabel({ x: portal.x, y: portal.y, r: 24 }, camX, camY, `[E] ${portal.label}`, portal.color);
    }
  }
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
    ctx.fillText(gate.open ? "[E] Voter et quitter" : "Porte verrouillée", x - 24, y - 17);
  }
}

function drawNpcSpriteEntity(entity, camX, camY, fallbackColor = "#ffd166") {
  const x = entity.x - camX;
  const y = entity.y - camY;
  const img = entity.spritePath ? state.assets.images[entity.spritePath] : null;
  if (!img) return false;
  const height = Math.max(56, (entity.r || 20) * (entity.spriteScale || 4.25));
  const width = height * (img.width / Math.max(1, img.height));
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, x - width / 2, y - height * 0.86, width, height);
  ctx.restore();
  return true;
}

function drawNpcs(camX, camY) {
  if (state.world.master) {
    const master = state.world.master;
    const x = master.x - camX;
    const y = master.y - camY;
    const masterDrawn = drawNpcSpriteEntity(master, camX, camY, "#c084fc");
    if (!masterDrawn) {
      ctx.fillStyle = state.quest.voteUnlocked ? "#facc15" : "#c084fc";
      ctx.beginPath();
      ctx.arc(x, y, master.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3b2f16";
      ctx.fillRect(x - 8, y - 20, 16, 20);
    }
    ctx.strokeStyle = "rgba(250, 204, 21, 0.78)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, master.r + 7 + Math.sin(performance.now() * 0.004) * 1.5, 0, Math.PI * 2);
    ctx.stroke();
    if (Math.hypot(state.player.x - master.x, state.player.y - master.y) < 90) drawEntityLabel(master, camX, camY, `${master.name} [E]`, "#facc15");
  }

  for (const npc of state.world.npcs) {
    const x = npc.x - camX;
    const y = npc.y - camY;

    const npcDrawn = drawNpcSpriteEntity(npc, camX, camY, "#ffd166");
    if (!npcDrawn) {
      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.arc(x, y, npc.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#213547";
      ctx.fillRect(x - 6, y - 18, 12, 18);
    }

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
        walker.r * 4.7,
        6.6,
        {
          cols: 6,
          rows: 8,
          frameCount: 6,
          rowMap: EIGHT_DIRECTION_ROW_MAP,
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
  if (ax > deadZone && ay > deadZone) return `${dy >= 0 ? "down" : "up"}${dx >= 0 ? "Right" : "Left"}`;
  if (ax > ay) return dx >= 0 ? "right" : "left";
  return dy >= 0 ? "down" : "up";
}

function getCardinalDirection(dir) {
  if (dir === "downLeft" || dir === "downRight") return "down";
  if (dir === "upLeft" || dir === "upRight") return "up";
  return dir || "down";
}

function getDiagonalSpriteTransform(dir, classId = null) {
  const angle = 0.13;
  const xNudge = 2;
  if (dir === "downRight") return { baseDir: "down", rotation: angle, offsetX: xNudge };
  if (dir === "downLeft") return { baseDir: "down", rotation: -angle, offsetX: -xNudge };
  if (classId === "mage" && dir === "upRight") return { baseDir: "up", rotation: angle, offsetX: xNudge };
  if (classId === "mage" && dir === "upLeft") return { baseDir: "up", rotation: -angle, offsetX: -xNudge };
  if (dir === "upRight") return { baseDir: "up", rotation: -angle, offsetX: xNudge };
  if (dir === "upLeft") return { baseDir: "up", rotation: angle, offsetX: -xNudge };
  return { baseDir: dir || "down", rotation: 0, offsetX: 0 };
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
  const row = typeof options.rowOverride === "number"
    ? clamp(options.rowOverride, 0, rows - 1)
    : clamp(rowMap[dir] ?? rowMap.down ?? 0, 0, rows - 1);

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
  const rotation = options.rotation || 0;
  const offsetX = options.offsetX || 0;
  const offsetY = options.offsetY || 0;

  ctx.save();
  ctx.translate(x + offsetX, y + offsetY);
  if (rotation) ctx.rotate(rotation);
  if (options.flipX) ctx.scale(-1, 1);
  ctx.drawImage(img, sx, sy, sw, sh, -drawW / 2, -drawH * yAnchor, drawW, drawH);
  ctx.restore();
  return true;
}


function drawFrameSequence(pathFactory, dir, x, y, targetHeight, speed = 9, options = {}) {
  const seq = Array.isArray(options.frameSequence) && options.frameSequence.length ? options.frameSequence : EIGHT_DIRECTION_FRAME_SEQUENCE;
  const frameOffset = options.frameOffset || 0;
  const idx = (Math.floor((performance.now() / 1000) * speed + frameOffset) % seq.length + seq.length) % seq.length;
  const frameNo = (seq[idx] || 0) + 1;
  const path = pathFactory(frameNo);
  const img = state.assets.images[path];
  if (!img) return false;
  const yAnchor = typeof options.yAnchor === "number" ? options.yAnchor : 0.88;
  const drawH = targetHeight;
  const drawW = drawH * (img.width / Math.max(1, img.height));
  const offsetX = options.offsetX || 0;
  const offsetY = options.offsetY || 0;
  ctx.save();
  ctx.translate(x + offsetX, y + offsetY);
  if (options.flipX) ctx.scale(-1, 1);
  ctx.drawImage(img, -drawW / 2, -drawH * yAnchor, drawW, drawH);
  ctx.restore();
  return true;
}


function drawDecorProp(deco, x, y) {
  const w = deco.w;
  const h = deco.h;
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  const asset = deco.imagePath ? state.assets.images[deco.imagePath] : null;
  if (asset) {
    const scale = deco.kind === "windTurbine" ? 1.7 : deco.kind === "mineCart" ? 1.45 : 1.15;
    ctx.drawImage(asset, -w * scale / 2, -h * scale / 2, w * scale, h * scale);
    ctx.restore();
    return;
  }
  const regionPath = REGION_PROP_IMAGE_PATHS[deco.kind];
  const regionAsset = regionPath ? state.assets.images[regionPath] : null;
  if (regionAsset) {
    const boxW = w * (deco.drawScale || 1);
    const boxH = h * (deco.drawScale || 1);
    const aspect = regionAsset.width / Math.max(1, regionAsset.height);
    let drawW = boxW;
    let drawH = drawW / Math.max(0.01, aspect);
    if (drawH > boxH) {
      drawH = boxH;
      drawW = drawH * aspect;
    }
    const yAnchor = typeof deco.yAnchor === "number" ? deco.yAnchor : 0.5;
    ctx.drawImage(regionAsset, -drawW / 2, -drawH * yAnchor, drawW, drawH);
    ctx.restore();
    return;
  }
  const generatedPath = GENERATED_PROP_IMAGE_PATHS[deco.kind];
  const generatedAsset = generatedPath ? state.assets.images[generatedPath] : null;
  if (generatedAsset) {
    const scale = deco.kind === "tree" || deco.kind === "treeBroad" ? 1.55 : deco.kind === "houseSmall" ? 1.35 : deco.kind === "boat" ? 1.55 : deco.kind === "terminal" ? 1.28 : 1.18;
    let drawW = w * scale;
    let drawH = drawW * (generatedAsset.height / Math.max(1, generatedAsset.width));
    const minH = h * (deco.kind === "tree" || deco.kind === "treeBroad" ? 1.35 : 0.8);
    if (drawH < minH) {
      drawH = minH;
      drawW = drawH * (generatedAsset.width / Math.max(1, generatedAsset.height));
    }
    ctx.drawImage(generatedAsset, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
    return;
  }
  if (deco.kind === "tree") {
    const variant = deco.variant || 0;
    const leafA = ["#14532d", "#166534", "#365314", "#0f766e"][variant % 4];
    const leafB = ["#22c55e", "#4ade80", "#84cc16", "#14b8a6"][variant % 4];
    ctx.fillStyle = variant === 2 ? "#6b3f1d" : "#5b3a1f";
    ctx.fillRect(-4, 0, 8, h * 0.42);
    if (variant === 1) {
      ctx.fillStyle = leafA;
      ctx.beginPath(); ctx.moveTo(0, -h * 0.46); ctx.lineTo(-w * 0.34, h * 0.08); ctx.lineTo(w * 0.34, h * 0.08); ctx.closePath(); ctx.fill();
      ctx.fillStyle = leafB;
      ctx.beginPath(); ctx.moveTo(0, -h * 0.3); ctx.lineTo(-w * 0.26, h * 0.18); ctx.lineTo(w * 0.26, h * 0.18); ctx.closePath(); ctx.fill();
    } else if (variant === 2) {
      ctx.strokeStyle = "#6b3f1d"; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(0, h * 0.3); ctx.lineTo(-w * 0.16, -h * 0.08); ctx.moveTo(0, h * 0.18); ctx.lineTo(w * 0.18, -h * 0.16); ctx.stroke();
      ctx.fillStyle = leafA; ctx.beginPath(); ctx.ellipse(-w * 0.1, -h * 0.18, w * 0.28, h * 0.22, -0.35, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = leafB; ctx.beginPath(); ctx.ellipse(w * 0.14, -h * 0.2, w * 0.26, h * 0.2, 0.4, 0, Math.PI * 2); ctx.fill();
    } else if (variant === 3) {
      ctx.fillStyle = leafA;
      ctx.beginPath(); ctx.ellipse(0, -h * 0.12, w * 0.18, h * 0.42, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = leafB;
      ctx.beginPath(); ctx.ellipse(-w * 0.08, -h * 0.2, w * 0.12, h * 0.28, -0.3, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = leafA;
      ctx.beginPath(); ctx.arc(0, -4, w * 0.34, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = leafB;
      ctx.beginPath(); ctx.arc(-8, -8, w * 0.24, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(9, -10, w * 0.2, 0, Math.PI * 2); ctx.fill();
    }
  } else if (deco.kind === "ore") {
    ctx.fillStyle = "#334155";
    ctx.beginPath(); ctx.ellipse(0, 6, w * 0.36, h * 0.24, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#93c5fd";
    ctx.fillRect(-5, -2, 10, 8);
  } else if (deco.kind === "mineCart") {
    ctx.fillStyle = "#475569";
    ctx.fillRect(-w * 0.35, -h * 0.12, w * 0.7, h * 0.28);
    ctx.fillStyle = "#111827";
    ctx.beginPath(); ctx.arc(-w * 0.22, h * 0.18, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w * 0.22, h * 0.18, 4, 0, Math.PI * 2); ctx.fill();
  } else if (deco.kind === "stoneCircle") {
    ctx.strokeStyle = "#a8a29e"; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(0, 0, w * 0.3, 0, Math.PI * 2); ctx.stroke();
  } else if (deco.kind === "houseSmall") {
    ctx.fillStyle = "#8b5e34"; ctx.fillRect(-w * 0.32, -h * 0.12, w * 0.64, h * 0.42);
    ctx.fillStyle = "#7f1d1d"; ctx.beginPath(); ctx.moveTo(-w * 0.38, -h * 0.12); ctx.lineTo(0, -h * 0.38); ctx.lineTo(w * 0.38, -h * 0.12); ctx.closePath(); ctx.fill();
  } else if (deco.kind === "boat") {
    ctx.fillStyle = "#92400e";
    ctx.beginPath(); ctx.ellipse(0, 6, w * 0.42, h * 0.16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f8fafc"; ctx.beginPath(); ctx.moveTo(0, -h * 0.35); ctx.lineTo(0, 0); ctx.lineTo(w * 0.25, 0); ctx.closePath(); ctx.fill();
  } else if (deco.kind === "windTurbine") {
    ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, h * 0.34); ctx.lineTo(0, -h * 0.22); ctx.stroke();
    ctx.strokeStyle = "#f8fafc"; ctx.lineWidth = 3; for (let i = 0; i < 3; i += 1) { const a = i * Math.PI * 2 / 3; ctx.beginPath(); ctx.moveTo(0, -h * 0.22); ctx.lineTo(Math.cos(a) * w * 0.28, -h * 0.22 + Math.sin(a) * h * 0.28); ctx.stroke(); }
  } else if (deco.kind === "terminal" || deco.kind === "antenna" || deco.kind === "solar") {
    ctx.fillStyle = deco.kind === "solar" ? "#1d4ed8" : "#0f172a"; ctx.fillRect(-w * 0.28, -h * 0.24, w * 0.56, h * 0.44);
    ctx.strokeStyle = "#67e8f9"; ctx.strokeRect(-w * 0.22, -h * 0.18, w * 0.44, h * 0.28);
  } else {
    ctx.fillStyle = "#8b5e34"; ctx.fillRect(-w * 0.3, -h * 0.25, w * 0.6, h * 0.5);
    ctx.strokeStyle = "#fbbf24"; ctx.strokeRect(-w * 0.3, -h * 0.25, w * 0.6, h * 0.5);
  }
  ctx.restore();
}

function drawProceduralEnemy(enemy, x, y) {
  const color = enemy.skinColor || enemy.type.color;
  const r = enemy.r;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  if (enemy.type.id === "drone") {
    ctx.fillRect(-r, -r * 0.55, r * 2, r * 1.1);
    ctx.fillStyle = "#e0f2fe"; ctx.fillRect(-r * 0.35, -r * 0.2, r * 0.7, r * 0.35);
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-r * 1.15, 0, r * 0.35, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(r * 1.15, 0, r * 0.35, 0, Math.PI * 2); ctx.stroke();
  } else if (enemy.type.id === "juggernaut") {
    ctx.fillRect(-r * 0.75, -r * 1.1, r * 1.5, r * 1.9);
    ctx.fillStyle = "#111827"; ctx.fillRect(-r * 0.38, -r * 0.74, r * 0.76, r * 0.34);
  } else if (enemy.type.id === "stalker") {
    ctx.beginPath(); ctx.moveTo(0, -r * 1.15); ctx.lineTo(r, r * 0.75); ctx.lineTo(-r, r * 0.75); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#fef08a"; ctx.beginPath(); ctx.arc(0, -r * 0.25, 3, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.fillRect(-r * 0.55, -r * 0.9, r * 1.1, r * 1.55);
    ctx.fillStyle = "#0f172a"; ctx.fillRect(-r * 0.32, -r * 0.55, r * 0.64, r * 0.28);
    ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(r * 0.65, -r * 0.2); ctx.lineTo(r * 1.25, r * 0.55); ctx.stroke();
  }
  ctx.restore();
}

function drawProceduralPlayer(p, cls, x, y, moving, action) {
  const t = performance.now() / 1000;
  const bob = moving ? Math.sin(t * (p.running ? 16 : 10)) * 2 : 0;
  const dx = p.dirX || 0;
  const dy = p.dirY || 1;
  const sideX = -dy;
  const sideY = dx;
  const equipment = p.equipment || {};
  const chestColor = equipment.chest?.iconColor || cls.color;
  const capeColor = equipment.cape?.iconColor;
  const gloveColor = equipment.gloves?.iconColor || "#e5e7eb";
  const necklaceColor = equipment.necklace?.iconColor;
  const weaponColor = equipment.weapon?.iconColor || "#f8fafc";
  const legsColor = equipment.legs?.iconColor || "#334155";

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath(); ctx.ellipse(0, 18, 18, 7, 0, 0, Math.PI * 2); ctx.fill();
  if (capeColor) { ctx.fillStyle = capeColor + "77"; ctx.beginPath(); ctx.ellipse(-dx * 8, -dy * 8 + 8, 13, 20, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = legsColor;
  ctx.lineWidth = 4;
  ctx.strokeStyle = legsColor;
  const stride = moving ? Math.sin(t * 12) * 5 : 0;
  ctx.beginPath(); ctx.moveTo(-5, 7); ctx.lineTo(-5 + sideX * stride, 17 + sideY * stride); ctx.moveTo(5, 7); ctx.lineTo(5 - sideX * stride, 17 - sideY * stride); ctx.stroke();
  ctx.fillStyle = chestColor;
  ctx.beginPath(); ctx.moveTo(-5, -12); ctx.lineTo(5, -12); ctx.quadraticCurveTo(11, -12, 11, -6); ctx.lineTo(11, 7); ctx.quadraticCurveTo(11, 13, 5, 13); ctx.lineTo(-5, 13); ctx.quadraticCurveTo(-11, 13, -11, 7); ctx.lineTo(-11, -6); ctx.quadraticCurveTo(-11, -12, -5, -12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = p.heroColor;
  ctx.beginPath(); ctx.arc(0, -25, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0f172a"; ctx.fillRect(-7 + dx * 2, -28 + dy * 2, 14, 4);
  if (necklaceColor) { ctx.strokeStyle = necklaceColor; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -12, 8, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  ctx.fillStyle = gloveColor; ctx.beginPath(); ctx.arc(sideX * 13 - dx * 2, sideY * 13 - dy * 2, 4, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(-sideX * 13 - dx * 2, -sideY * 13 - dy * 2, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = weaponColor;
  ctx.lineWidth = 4;
  if (p.classId === "warrior") { ctx.beginPath(); ctx.moveTo(dx * 10 + sideX * 7, dy * 10 + sideY * 7); ctx.lineTo(dx * 28 + sideX * 7, dy * 28 + sideY * 7); ctx.stroke(); ctx.strokeStyle = "#94a3b8"; ctx.beginPath(); ctx.arc(-sideX * 14, -sideY * 14, 7, 0, Math.PI * 2); ctx.stroke(); }
  else if (p.classId === "mage") { ctx.beginPath(); ctx.moveTo(sideX * 10, sideY * 10); ctx.lineTo(dx * 28, dy * 28); ctx.stroke(); ctx.fillStyle = "#d946ef"; ctx.beginPath(); ctx.arc(dx * 30, dy * 30, action.startsWith("skill") ? 7 : 4, 0, Math.PI * 2); ctx.fill(); }
  else { ctx.beginPath(); ctx.moveTo(-sideX * 12, -sideY * 12); ctx.lineTo(sideX * 12, sideY * 12); ctx.stroke(); ctx.strokeStyle = "#fef9c3"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(dx * 6, dy * 6); ctx.lineTo(dx * 28, dy * 28); ctx.stroke(); }
  ctx.restore();
}

function drawEnemies(camX, camY) {
  const now = performance.now() / 1000;
  for (const enemy of state.world.enemies) {
    if (enemy.hp <= 0) continue;
    const x = enemy.x - camX;
    const y = enemy.y - camY;
    const skinColor = enemy.skinColor || enemy.type.color;

    ctx.fillStyle = skinColor + "33";
    ctx.beginPath();
    ctx.ellipse(x, y + enemy.r * 0.72, enemy.r * 1.1, enemy.r * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();

    const vx = enemy.moveVX || 0;
    const vy = enemy.moveVY || 0;
    const dir = enemy.facing || vecToDirection(vx, vy, "down", 2.0);

    let action = "idle";
    if (now - enemy.lastAttack < 0.28) action = "attack";
    else if (Math.hypot(vx, vy) > 8) action = "walk";

    const spritePath = LOCAL_SPRITE_PATHS.enemy[enemy.type.id];
    const sprite = spritePath ? state.assets.images[spritePath] : null;
    let drawn = false;
    if (enemy.boss) {
      const bossAction = now < enemy.immuneUntil ? "hurt" : action;
      const bossFrame = BOSS_SHEET_PROFILE.directionFrames?.[dir] || BOSS_SHEET_PROFILE.directionFrames.down;
      if (USE_BOSS_FRAME_IMAGES) {
        drawn = drawFrameSequence((frame) => getBossFramePath("level_01", bossAction, dir, frame), dir, x, y, enemy.r * 5.95, bossAction === "attack" ? 10 : 7, {
          yAnchor: BOSS_SHEET_PROFILE.yAnchor,
          frameSequence: bossFrame?.seq || EIGHT_DIRECTION_FRAME_SEQUENCE
        });
      }
      if (!drawn) {
        const bossPath = getBossSheetPath("level_01", bossAction);
        drawn = drawFromSpritesheet(bossPath, bossAction, dir, x, y, enemy.r * 5.4, bossAction === "attack" ? 10 : 7, {
          cols: BOSS_SHEET_PROFILE.cols,
          rows: BOSS_SHEET_PROFILE.rows,
          rowMap: BOSS_SHEET_PROFILE.rowMap,
          rowOverride: bossFrame?.row,
          yAnchor: BOSS_SHEET_PROFILE.yAnchor,
          frameSequence: bossFrame?.seq || EIGHT_DIRECTION_FRAME_SEQUENCE
        });
      }
    }
    if (!drawn && enemy.spriteSheetPath) {
      drawn = drawFromSpritesheet(enemy.spriteSheetPath, "walk", dir, x, y, enemy.r * 4.9, action === "attack" ? 11 : 7.5, {
        cols: 6,
        rows: 8,
        rowMap: EIGHT_DIRECTION_ROW_MAP,
        frameCount: 6,
        yAnchor: 0.9,
        frameOffset: enemy.animOffset || 0
      });
    }
    if (!drawn && sprite) {
      const fallbackSize = enemy.r * 4.4;
      ctx.drawImage(sprite, x - fallbackSize / 2, y - fallbackSize * 0.72, fallbackSize, fallbackSize);
      drawn = true;
    }
    if (!drawn && USE_ENEMY_SPRITESHEETS) {
      const sheetPath = getEnemySheetPath(enemy.type.id, action);
      const idleSheetPath = getEnemySheetPath(enemy.type.id, "idle");
      const walkSheetPath = getEnemySheetPath(enemy.type.id, "walk");
      const size = enemy.r * 3.6;
      drawn = drawFromSpritesheet(sheetPath, action, dir, x, y, size, action === "attack" ? 14 : 9, { yAnchor: 0.86 })
        || drawFromSpritesheet(walkSheetPath, "walk", dir, x, y, size, 9, { yAnchor: 0.86 })
        || drawFromSpritesheet(idleSheetPath, "idle", dir, x, y, size, 5, { yAnchor: 0.86 });
    }
    if (!drawn) drawProceduralEnemy(enemy, x, y);

    ctx.strokeStyle = enemy.boss ? "#facc15" : (enemy.elite ? "#fef08a" : skinColor);
    ctx.lineWidth = enemy.boss ? 4 : (enemy.elite ? 3 : 1.5);
    ctx.beginPath();
    ctx.arc(x, y, enemy.r + (enemy.elite ? 4 : 2), 0, Math.PI * 2);
    ctx.stroke();

    const hpRatio = clamp(enemy.hp / enemy.maxHp, 0, 1);
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(x - 18, y - enemy.r - 13, 36, 5);
    ctx.fillStyle = enemy.boss ? "#facc15" : (enemy.elite ? "#f59e0b" : "#22c55e");
    ctx.fillRect(x - 18, y - enemy.r - 13, 36 * hpRatio, 5);
    if (enemy.boss) {
      ctx.font = "700 12px system-ui";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(0,0,0,0.72)";
      ctx.fillRect(x - 68, y - enemy.r - 35, 136, 16);
      ctx.fillStyle = "#fef3c7";
      ctx.fillText(enemy.bossName || "Boss", x, y - enemy.r - 23);
    }
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
  let drawn = false;
  if (USE_PLAYER_SPRITESHEETS) {
    const profile = PLAYER_SHEET_PROFILES[p.classId] || PLAYER_SHEET_PROFILES.warrior;
    const hasTrueDirection = profile.trueDiagonals && Object.prototype.hasOwnProperty.call(profile.rowMap || {}, dir);
    const visualDir = hasTrueDirection ? { baseDir: dir, rotation: 0, offsetX: 0 } : getDiagonalSpriteTransform(dir, p.classId);
    const baseDir = hasTrueDirection ? dir : getCardinalDirection(visualDir.baseDir);
    const sheetPath = getPlayerSheetPath(p.classId, action);
    const idleSheetPath = getPlayerSheetPath(p.classId, "idle");
    const walkSheetPath = getPlayerSheetPath(p.classId, "walk");
    const directionFrame = profile.directionFrames?.[baseDir] || profile.directionFrames?.down || null;
    const frameSequence = action === "idle"
      ? [directionFrame?.idle ?? 0]
      : (directionFrame?.seq || EIGHT_DIRECTION_FRAME_SEQUENCE);
    const flipX = !hasTrueDirection && profile.mirrorLeft && baseDir === "left";
    const size = p.r * 5.15;
    const drawOpts = {
      cols: profile.cols,
      rows: profile.rows,
      rowMap: profile.rowMap,
      rowOverride: directionFrame?.row,
      yAnchor: profile.yAnchor,
      frameSequence,
      flipX,
      rotation: visualDir.rotation,
      offsetX: visualDir.offsetX
    };
    if (USE_PLAYER_FRAME_IMAGES && hasTrueDirection) {
      drawn = drawFrameSequence((frame) => getPlayerFramePath(p.classId, action, baseDir, frame), baseDir, x, y, p.r * 4.45, p.running ? 13 : 9, {
        yAnchor: profile.yAnchor,
        frameSequence,
        offsetY: 0
      });
    }
    if (!drawn) {
      drawn = drawFromSpritesheet(sheetPath, action, baseDir, x, y, size, p.running ? 13 : 9, drawOpts)
        || drawFromSpritesheet(walkSheetPath, "walk", baseDir, x, y, size, p.running ? 13 : 9, drawOpts)
        || drawFromSpritesheet(idleSheetPath, "idle", baseDir, x, y, size, 5, drawOpts);
    }
  }
  if (!drawn) drawProceduralPlayer(p, cls, x, y, moving, action);
  // Player name/class stays in the HUD to keep the action view clear.
}




function drawProjectiles(camX, camY) {
  for (const proj of state.world.projectiles) {
    const x = proj.x - camX;
    const y = proj.y - camY;
    const angle = Math.atan2(proj.vy || 0, proj.vx || 1);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    if (proj.kind === "arrow") {
      ctx.strokeStyle = "rgba(254,249,195,0.55)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(10, 0);
      ctx.stroke();
      ctx.strokeStyle = proj.color || "#d9f99d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(14, 0);
      ctx.stroke();
      ctx.fillStyle = "#fef9c3";
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(7, -5);
      ctx.lineTo(7, 5);
      ctx.closePath();
      ctx.fill();
    } else {
      const gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, proj.r * 2.4);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.35, proj.color || "#f8fafc");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, proj.r * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = proj.color || "#f8fafc";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, proj.r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
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
  const t = performance.now() / 1000;
  for (const loot of state.world.loot) {
    const x = loot.x - camX;
    const y = loot.y - camY + Math.sin(t * 4 + loot.x * 0.01) * 2;
    const spritePath = loot.kind === "equipment" && loot.item ? getItemIconPath(loot.item) : (LOCAL_SPRITE_PATHS.item[loot.kind] || ITEM_ICON_PATHS[loot.kind]);
    const sprite = spritePath ? state.assets.images[spritePath] : null;
    if (sprite) {
      const size = 22;
      ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
      continue;
    }
    if (loot.kind === "xp") {
      const glow = 7 + Math.sin(t * 7) * 1.5;
      ctx.fillStyle = "rgba(103,240,200,0.22)";
      ctx.beginPath(); ctx.arc(x, y, glow + 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#67f0c8";
      ctx.beginPath(); ctx.arc(x, y, glow, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#eafffb";
      ctx.beginPath(); ctx.arc(x - 2, y - 2, 2.2, 0, Math.PI * 2); ctx.fill();
    } else if (loot.kind === "gold") {
      ctx.fillStyle = "#facc15";
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#fff3a3"; ctx.stroke();
    } else if (loot.kind === "equipment" && loot.item) {
      const color = loot.item.iconColor || "#e5e7eb";
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(x - 11, y - 11, 22, 22);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 11, y - 11, 22, 22);
      ctx.fillStyle = color;
      if (loot.item.slot === "weapon") ctx.fillRect(x - 2, y - 10, 4, 20);
      else if (loot.item.slot === "necklace") { ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke(); }
      else ctx.fillRect(x - 7, y - 7, 14, 14);
    } else if (loot.kind === "manaPotion") {
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(x - 6, y - 8, 12, 16);
      ctx.fillStyle = "#e0f2fe";
      ctx.fillRect(x - 3, y - 5, 6, 10);
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

  if (world.portals) {
    for (const portal of world.portals) {
      miniCtx.fillStyle = portal.color || "#facc15";
      const px = portal.x * sx;
      const py = portal.y * sy;
      miniCtx.beginPath();
      miniCtx.moveTo(px, py - 5);
      miniCtx.lineTo(px + 5, py + 5);
      miniCtx.lineTo(px - 5, py + 5);
      miniCtx.closePath();
      miniCtx.fill();
    }
  }

  if (world.master) {
    miniCtx.fillStyle = state.quest.voteUnlocked ? "#facc15" : "#c084fc";
    miniCtx.fillRect(world.master.x * sx - 3, world.master.y * sy - 3, 6, 6);
  }

  if (getSceneRegionConfig()) {
    miniCtx.fillStyle = "rgba(245, 222, 179, 0.9)";
    miniCtx.font = "10px Georgia";
    miniCtx.fillText(world.regionLabel || "Region", 8, 14);
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
  drawPortals(camX, camY);
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

function getPersonaForNpc(npc) {
  if (!npc || !npc.archetype || !Array.isArray(state.personas)) return null;
  return state.personas.find((persona) => persona.id === npc.archetype) || null;
}

function buildNpcPromptContext(npc) {
  const scene = state.currentScene || {};
  const region = getRegionDefinition(npc?.regionId) || state.world?.region || {};
  const persona = getPersonaForNpc(npc);
  return {
    level: scene.id,
    dilemma: scene.theme,
    region: region.label,
    npc: npc ? { name: npc.name, role: npc.role, archetype: npc.archetype, viewpoint: npc.dialogue?.viewpoint } : null,
    persona,
    worldFacts: state.worldLore?.factsBank || [],
    instruction: "Repondre en francais simple, 3 a 5 lignes maximum, sans dire qu'une solution morale est la seule bonne. Relancer l'eleve avec une question courte."
  };
}

function buildNpcLine(npc) {
  const dialogue = npc.dialogue || {};
  return dialogue.shortLine || `${npc.name} defend une lecture du dilemme: ${npc.role}.`;
}

function appendChatLine(text, author) {
  const line = document.createElement("div");
  line.className = `chat-line ${author === "player" ? "chat-player" : "chat-npc"}`;
  line.textContent = fixText(text);
  DOM.chatLog.appendChild(line);
  DOM.chatLog.scrollTop = DOM.chatLog.scrollHeight;
}

function generateNpcAnswer(npc, playerText, mode = "free") {
  const dialogue = npc.dialogue || {};
  const lower = String(playerText || "").toLowerCase();
  const persona = getPersonaForNpc(npc);
  const tone = persona ? `${persona.displayName}: ` : "";
  if (mode === "position") return `${tone}${dialogue.viewpoint || buildNpcLine(npc)} Quelle valeur te semble la plus importante ici ?`;
  if (mode === "consequence") return `${tone}${dialogue.consequence || "Chaque choix protege quelque chose et expose autre chose."} Qu'est-ce qui te parait le plus grave ?`;
  if (mode === "counter") return `${tone}${dialogue.counter || "L'autre camp voit un risque que je ne veux pas effacer."} Que repondrais-tu a cette objection ?`;
  if (mode === "reward") return `${tone}${dialogue.rewardHint || "Si tu aides la zone, tu recevras une recompense de quete."} Cette aide ne t'oblige pas a voter pour moi.`;
  if (lower.includes("pourquoi")) return `${tone}Parce que ce dilemme oppose plusieurs biens: ${dialogue.values?.join(", ") || "progres, prudence et justice"}. On doit choisir ce qu'on accepte de risquer.`;
  if (lower.includes("autre") || lower.includes("contre")) return `${tone}${dialogue.counter || "L'autre camp rappelle une consequence que je ne dois pas balayer."}`;
  if (lower.includes("vote") || lower.includes("choix")) return `${tone}Ton vote final doit venir de ta justification, pas de ma recompense. Essaie de nommer la valeur que tu veux proteger en premier.`;
  return `${tone}${dialogue.viewpoint || buildNpcLine(npc)} Je peux developper si tu me demandes une consequence, une objection ou un exemple.`;
}

function renderChatChoices(npc) {
  if (!DOM.chatChoices) return;
  DOM.chatChoices.innerHTML = "";
  const choices = [
    ["position", "Ton point de vue"],
    ["consequence", "Consequences"],
    ["counter", "Objection"],
    ["reward", "Quete"],
    ["free", "Question libre"]
  ];
  for (const [key, label] of choices) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chat-choice";
    button.dataset.choice = key;
    button.textContent = label;
    DOM.chatChoices.appendChild(button);
  }
}

function askGuidedNpcQuestion(key) {
  if (!state.chatNpc) return;
  if (key === "free") {
    DOM.chatInput.focus();
    return;
  }
  const labels = { position: "Explique ton point de vue.", consequence: "Quelles consequences ?", counter: "Que dirait l'autre camp ?", reward: "Quelle quete proposes-tu ?" };
  appendChatLine(labels[key] || "Explique.", "player");
  appendChatLine(generateNpcAnswer(state.chatNpc, labels[key], key), "npc");
}

function markNpcConversation(npc) {
  if (state.quest.talked.has(npc.id)) return;
  state.quest.talked.add(npc.id);
  npc.spoken = true;
  if (npc.regionId) {
    const progress = getRegionProgress(npc.regionId);
    progress.talked = true;
    const region = getRegionDefinition(npc.regionId);
    addJournalEntry(`Point de vue entendu: ${npc.name} (${region?.label || npc.role}).`, npc.regionId);
    addJournalEntry(`Question cle: ${npc.dialogue?.consequence || "Quelle consequence acceptes-tu ?"}`, npc.regionId);
  }
  spawnEliteForNpc(npc);
  addNotification(`Point de vue ajoute au journal: ${npc.name}.`, 2.4, "#67f0c8");
  renderQuestJournal();
  updateHud();
  updateGuideText();
}

function openNpcChat(npc) {
  state.chatNpc = npc;
  state.overlay = "chat";
  DOM.chatPanel.classList.remove("hidden");
  DOM.chatName.textContent = `${npc.name} - ${npc.role}`;
  DOM.chatLog.innerHTML = "";
  if (DOM.chatContext) {
    const region = getRegionDefinition(npc.regionId);
    DOM.chatContext.textContent = region ? `${region.label} - ${region.questTitle || "Point de vue"}` : "Dialogue de faction";
  }
  appendChatLine(buildNpcLine(npc), "npc");
  appendChatLine("Tu peux utiliser les boutons pour lire peu, ou poser une question libre si tu veux aller plus loin.", "npc");
  renderChatChoices(npc);
  DOM.chatInput.value = "";
  DOM.chatInput.focus();
  markNpcConversation(npc);
}

function sendChatMessage() {
  if (state.overlay !== "chat" || !state.chatNpc) return;
  const raw = DOM.chatInput.value.trim();
  if (!raw) return;
  appendChatLine(raw, "player");
  appendChatLine(generateNpcAnswer(state.chatNpc, raw, "free"), "npc");
  DOM.chatInput.value = "";
}

function closeChat() {
  DOM.chatPanel.classList.add("hidden");
  state.overlay = null;
  state.chatNpc = null;
}

function renderQuestJournal() {
  if (!DOM.questList) return;
  const config = getSceneRegionConfig();
  DOM.questList.innerHTML = "";
  if (!config) {
    DOM.questList.innerHTML = "<li>Journal disponible surtout dans le prototype level 1.</li>";
    return;
  }
  const current = getRegionDefinition(state.currentRegion);
  if (DOM.questLore) {
    DOM.questLore.textContent = `${state.currentScene?.theme || "Dilemme"} - Carte actuelle: ${current?.label || "Village"}. Objectif: comprendre sans chercher une reponse unique.`;
  }
  const required = getRequiredFactionRegions();
  for (const regionId of [config.start, ...required]) {
    const region = getRegionDefinition(regionId);
    const progress = getRegionProgress(regionId);
    const item = document.createElement("li");
    item.className = progress.talked ? "quest-done" : progress.visited ? "quest-active" : "";
    const main = regionId === config.start ? "Point de depart: revenir parler au Maitre quand les factions sont entendues." : region.questMain;
    const optional = regionId === config.start ? "Zone sure: marchand, repos, conseil final." : region.questOptional;
    item.innerHTML = `<strong>${escapeHtml(region.label)}</strong><span>${progress.visited ? "visitee" : "a explorer"}</span><p>${escapeHtml(main || "Explorer la zone.")}</p><p class="quest-secondary">${progress.optional ? "[fait] " : "[optionnel] "}${escapeHtml(optional || "Objectif secondaire.")}</p>`;
    DOM.questList.appendChild(item);
  }
  for (const entry of state.quest.journalEntries.slice(-6)) {
    const item = document.createElement("li");
    item.className = "quest-note";
    item.textContent = entry.text;
    DOM.questList.appendChild(item);
  }
}

function openQuestJournal() {
  if (!DOM.questPanel) return;
  renderQuestJournal();
  state.overlay = "journal";
  DOM.questPanel.classList.remove("hidden");
}

function closeQuestJournal() {
  DOM.questPanel?.classList.add("hidden");
  if (state.overlay === "journal") state.overlay = null;
}

function openMasterCouncil() {
  if (!state.world?.master) return;
  if (!allRequiredFactionsHeard()) {
    addNotification("Le Maitre attend que tu aies entendu les trois factions.", 3, "#ffc857");
    openQuestJournal();
    return;
  }
  openVotePanel();
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
  if (p.gold < 25) { addNotification("Or insuffisant.", 1.9, "#ff8c8c"); return; }
  p.gold -= 25;
  p.potions += 1;
  playSfx("itemUse", 0.5);
  addNotification("Potion soin achetée.", 1.9, "#67f0c8");
  updateHud();
  renderInventory();
}

function buyManaPotion() {
  const p = state.player;
  if (p.gold < 25) { addNotification("Or insuffisant.", 1.9, "#ff8c8c"); return; }
  p.gold -= 25;
  p.manaPotions += 1;
  playSfx("itemUse", 0.5);
  addNotification("Potion mana achetée.", 1.9, "#67f0c8");
  updateHud();
  renderInventory();
}

function buyWeapon() {
  buyManaPotion();
}

function buyArmor() {
  buyManaPotion();
}

function usePotion() {
  const p = state.player;
  const stats = getEffectiveStats();
  if (!p || p.potions <= 0) { addNotification("Aucune potion soin.", 1.5, "#ff8c8c"); return; }
  if (p.hp >= stats.maxHp) { addNotification("Vie déjà au maximum.", 1.5, "#ffc857"); return; }
  p.potions -= 1;
  p.hp = Math.min(stats.maxHp, p.hp + Math.round(stats.maxHp * 0.45));
  playSfx("itemUse", 0.55);
  addNotification("Potion soin utilisée.", 1.8, "#67f0c8");
  updateHud();
  renderInventory();
}

function useManaPotion() {
  const p = state.player;
  const stats = getEffectiveStats();
  if (!p || p.manaPotions <= 0) { addNotification("Aucune potion mana.", 1.5, "#ff8c8c"); return; }
  if (p.mana >= stats.maxMana) { addNotification("Mana déjà au maximum.", 1.5, "#ffc857"); return; }
  p.manaPotions -= 1;
  p.mana = Math.min(stats.maxMana, p.mana + Math.round(stats.maxMana * 0.55));
  playSfx("itemUse", 0.55);
  addNotification("Potion mana utilisée.", 1.8, "#67f0c8");
  updateHud();
  renderInventory();
}

function useHealthPotionFromInventory(index) {
  const p = state.player;
  const stats = getEffectiveStats();
  if (!p || p.hp >= stats.maxHp) return;
  p.inventory[index] = null;
  p.hp = Math.min(stats.maxHp, p.hp + Math.round(stats.maxHp * 0.45));
  playSfx("itemUse", 0.55);
  updateHud();
  renderInventory();
}

function useManaPotionFromInventory(index) {
  const p = state.player;
  const stats = getEffectiveStats();
  if (!p || p.mana >= stats.maxMana) return;
  p.inventory[index] = null;
  p.mana = Math.min(stats.maxMana, p.mana + Math.round(stats.maxMana * 0.55));
  playSfx("itemUse", 0.55);
  updateHud();
  renderInventory();
}

function openVotePanel() {
  const scene = state.currentScene;
  state.overlay = "vote";
  DOM.votePanel.classList.remove("hidden");
  DOM.voteDilemma.textContent = getSceneRegionConfig() ? `Conseil du village: formule ton avis sur ${scene.theme}. Ta justification sera enregistree, sans score moral.` : (scene.narrative.context || `Dilemme du niveau: ${scene.theme}`);
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
    addNotification("Campagne terminée. Bravo médiateur.", 4, "#67f0c8");
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
    addNotification("Justification trop courte (20+ caractères).", 2.4, "#ff8c8c");
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
  addNotification("Vote enregistré. Transition en cours...", 2.8, "#67f0c8");
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
  if (state.overlay === "inventory") {
    closeInventory();
    return;
  }
  if (state.overlay === "grimoire") {
    closeGrimoire();
    return;
  }
  if (state.overlay === "journal") {
    closeQuestJournal();
    return;
  }
  if (state.overlay === "vote") return;

  const p = state.player;
  if (state.world.master && isNear(state.world.master, p.x, p.y, 90)) {
    openMasterCouncil();
    return;
  }

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

  const portal = (state.world.portals || []).find((entry) => Math.hypot(p.x - entry.x, p.y - entry.y) < 88);
  if (portal) {
    transitionToRegion(portal.target);
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

  if (state.overlay === "tutorial") {
    handleTutorialInput(event);
    return;
  }

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
  } else if (event.code === "KeyI") {
    if (state.overlay === "inventory") closeInventory();
    else if (!state.overlay) openInventory();
    event.preventDefault();
  } else if (event.code === "KeyG") {
    if (state.overlay === "grimoire") closeGrimoire();
    else if (!state.overlay) openGrimoire();
    event.preventDefault();
  } else if (event.code === "KeyJ") {
    if (state.overlay === "journal") closeQuestJournal();
    else if (!state.overlay) openQuestJournal();
    event.preventDefault();
  } else if (/^Digit[1-8]$/.test(event.code) && !state.overlay) {
    activateHotbarSlot(Number(event.code.replace("Digit", "")) - 1);
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

function openCharacterChange() {
  if (state.mode !== "running") return;
  state.overlay = "classChange";
  state.paused = true;
  DOM.pausePanel.classList.add("hidden");
  DOM.classPanel.classList.remove("hidden");
  DOM.startBtn.textContent = "Appliquer";
  updateClassAvatarSelectionUI();
}

function applyCharacterChange() {
  if (!state.player || !state.selectedClassId) return;
  state.selectedHeroId = state.selectedHeroId || HERO_PRESETS[0].id;
  const old = state.player;
  const cls = CLASS_DEFS[state.selectedClassId];
  const hero = HERO_PRESETS.find((h) => h.id === state.selectedHeroId) || HERO_PRESETS[0];
  const hpRatio = old.hp / Math.max(1, getEffectiveStats().maxHp);
  old.classId = cls.id;
  old.className = cls.name;
  old.heroId = hero.id;
  old.heroName = hero.label;
  old.heroColor = hero.color;
  old.baseSpeed = cls.speed;
  old.speed = cls.speed;
  old.attack = cls.baseAttack + Math.max(0, old.level - 1) * 2;
  old.defense = cls.baseDefense + Math.max(0, old.level - 1);
  old.maxHp = cls.baseHp + Math.max(0, old.level - 1) * (cls.id === "warrior" ? 16 : cls.id === "hunter" ? 12 : 10);
  old.maxMana = (cls.id === "mage" ? 130 : cls.id === "hunter" ? 90 : 70) + Math.max(0, old.level - 1) * (cls.id === "mage" ? 10 : 5);
  old.maxStamina = 100 + Math.max(0, old.level - 1) * (cls.id === "mage" ? 1 : 3);
  old.manaRegenRate = cls.id === "mage" ? 30 : 24;
  old.equipment = createEmptyEquipment();
  old.talents = createEmptyTalents();
  old.talentPoints = Math.max(0, old.level - 1);
  old.skillLevels = { skill1: 1, skill2: 1 };
  old.unlockedSkills = { skill1: old.level >= 3, skill2: false };
  const stats = getEffectiveStats();
  old.hp = clamp(Math.round(stats.maxHp * hpRatio), 1, stats.maxHp);
  old.mana = Math.min(old.mana, stats.maxMana);
  old.stamina = Math.min(old.stamina, stats.maxStamina);
  DOM.classPanel.classList.add("hidden");
  DOM.startBtn.textContent = "Démarrer";
  state.paused = false;
  state.overlay = null;
  updateHud();
  renderInventory();
  renderGrimoire();
  renderHotbar();
  addNotification("Personnage et classe mis a jour.", 2.4, "#67f0c8");
}

function setupEvents() {
  window.addEventListener("resize", resizeCanvasToViewport);
  document.addEventListener("keydown", (event) => processInputEvents(event, true));
  document.addEventListener("keyup", (event) => processInputEvents(event, false));

  DOM.startBtn.addEventListener("click", () => {
    if (!state.selectedClassId) return;
    state.selectedHeroId = state.selectedHeroId || HERO_PRESETS[0].id;
    ensureMusicPlayback();
    playSfx("uiClick", 0.4);
    if (state.overlay === "classChange") applyCharacterChange();
    else startGameAtScene("level_1");
  });

  DOM.chatSend.addEventListener("click", sendChatMessage);
  DOM.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendChatMessage();
  });
  DOM.chatClose.addEventListener("click", closeChat);
  DOM.chatChoices?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-choice]");
    if (!button) return;
    askGuidedNpcQuestion(button.dataset.choice);
  });
  DOM.questClose?.addEventListener("click", closeQuestJournal);

  DOM.voteCancel.addEventListener("click", closeVotePanel);
  DOM.voteSubmit.addEventListener("click", submitVote);

  DOM.merchantClose.addEventListener("click", closeMerchant);
  DOM.buyPotion.addEventListener("click", buyPotion);
  DOM.buyManaPotion.addEventListener("click", buyManaPotion);
  DOM.inventoryClose.addEventListener("click", closeInventory);
  DOM.grimoireClose?.addEventListener("click", closeGrimoire);

  DOM.toggleAudio.addEventListener("click", () => {
    toggleMusicPlayback();
    playSfx("uiClick", 0.4);
  });

  DOM.musicPrev.addEventListener("click", () => {
    playPreviousMusic();
    playSfx("uiClick", 0.4);
  });

  DOM.musicNext.addEventListener("click", () => {
    playNextMusic(false);
    playSfx("uiClick", 0.4);
  });

  DOM.musicVolume.addEventListener("input", (event) => setMusicVolume(event.target.value));
  DOM.sfxVolume.addEventListener("input", (event) => setSfxVolume(event.target.value));
  DOM.changeCharacter.addEventListener("click", () => {
    playSfx("uiClick", 0.4);
    openCharacterChange();
  });

  DOM.guideButton.addEventListener("click", openGuide);
  DOM.guideClose.addEventListener("click", () => DOM.guidePanel.classList.add("hidden"));
  DOM.tutorialSkip?.addEventListener("click", () => {
    playSfx("uiClick", 0.35);
    finishTutorial();
  });
}

async function init() {
  resizeCanvasToViewport();
  setupEvents();
  repairStaticTextNodes();
  createClassSelectionUI();
  await preloadAssets();
  await loadScenarioData();
  ensureMusicPlaylist();
  loadMusicTrack(Math.floor(Math.random() * state.assets.musicPlaylist.length), false);
  primeMusicAutoplay();
  updateMusicUi();
  addNotification("Choisis ton personnage puis ta classe pour commencer.", 4.4, "#67f0c8");
  requestAnimationFrame(tick);
}

init();

window.actionRpgMode = {
  state,
  buildPromptContext(npc = state.chatNpc) {
    return buildNpcPromptContext(npc);
  },
  startAt(sceneId) {
    if (!state.selectedClassId) state.selectedClassId = "warrior";
    if (!state.selectedHeroId) state.selectedHeroId = HERO_PRESETS[0].id;
    if (state.mode === "class") startGameAtScene(sceneId || "level_1");
    else loadSceneById(sceneId || "level_1", true);
  }
};
