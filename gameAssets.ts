export const gameAssets = {
  logo: require('./game/logo.png'),
  loading: require('./game/loading.png'),
  fusionOrb: require('./game/fusion_orb.png'),
  backgrounds: [
    require('./game/bg_level_1.png'),
    require('./game/bg_level_2.png'),
    require('./game/bg_level_3.png'),
    require('./game/bg_level_4.png'),
    require('./game/bg_level_5.png'),
    require('./game/bg_level_6.png'),
    require('./game/bg_level_7.png'),
    require('./game/bg_level_8.png'),
    require('./game/bg_level_9.png'),
    require('./game/bg_level_10.png'),
  ],
  lumens: {
    aether: { opened: require('./game/aether_opened.png'), closed: require('./game/aether_closed.png') },
    verdant: { opened: require('./game/verdant_opened.png'), closed: require('./game/verdant_closed.png') },
    solar: { opened: require('./game/solar_opened.png'), closed: require('./game/solar_closed.png') },
    cosmic: { opened: require('./game/cosmic_opened.png'), closed: require('./game/cosmic_closed.png') },
    blaze: { opened: require('./game/blaze_opened.png'), closed: require('./game/blaze_closed.png') },
    terra: { opened: require('./game/terra_opened.png'), closed: require('./game/terra_closed.png') },
    nova: { opened: require('./game/nova_opened.png'), closed: require('./game/nova_closed.png') },
  },
} as const;

export const audioAssets = {
  homepage: require('./audio/homepage_music.mp3'),
  gameplay: require('./audio/gameplay_music.mp3'),
} as const;