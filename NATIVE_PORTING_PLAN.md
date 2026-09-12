# Lumen Pop Native Port

## Technology decision

The native target is **Expo React Native with TypeScript**, using native React Native views and gestures. This is an application/game project, not a browser game:

- No `index.html`, DOM, CSS layout, browser pointer events, WebView, Capacitor, Cordova, Phaser, or Vite runtime will be used by the game.
- The board will be rendered with native `View`/`Image` nodes and absolute positioning.
- Touch linking will use `PanResponder`, with board-local coordinates converted into row/column cells.
- `Animated`/Reanimated will drive pop, gravity, refill, trail, vortex, and result transitions.
- AsyncStorage will replace `localStorage` for local progress.
- Expo-native audio and haptics will replace Web Audio and HTML audio elements.
- A later native Android build step will produce the installable APK/AAB from this project; the existing Capacitor APK is not the target.

### Why Expo React Native

Godot and Unity would be valid game engines, but they would introduce a second toolchain and make the existing TypeScript gameplay logic and supplied mobile asset workflow harder to maintain in this Replit workspace. Expo React Native gives this project native Android application code, TypeScript reuse, Expo Go iteration, and a practical path to a standalone Android build without wrapping the old website.

## Native project shape

```text
artifacts/lumen-pop-native/
  app/
    _layout.tsx                 # Native providers and route shell
    index.tsx                   # Loading/start route
    map.tsx                     # Native level map
    game/[level].tsx            # Native board/game scene
    settings.tsx                # Native settings scene
  components/
    NativeGameBoard.tsx         # Native board + PanResponder
    LumenTile.tsx               # Native image/animation tile
    ChainTrail.tsx              # Native SVG/animated trail
    GameHud.tsx                 # Score, moves, milestones
    ResultOverlay.tsx           # Native win/lose/pause overlay
  game/
    model.ts                    # Shared gameplay types/constants
    board.ts                    # Playable generation, linking, collapse/refill
    levels.ts                   # Scalable level rules
    progress.ts                 # Progress schema/normalization
  state/
    ProgressProvider.tsx        # AsyncStorage-backed progress
    GameSessionProvider.tsx     # Current level session state
  assets/
    gameAssets.ts               # Static native require() asset registry
    game/                       # Supplied Lumen art/backgrounds/logo
    audio/                      # Supplied homepage/gameplay tracks
```

The current pass adds the `game/` domain foundation and native asset registry only. The screen and gesture files remain intentionally unimplemented until the port is resumed.

## Port map from the current project

| Current web responsibility | Native destination | Port rule |
| --- | --- | --- |
| `Screen` routing in `App.tsx` | Expo Router routes | Split loading, map, game, settings, and overlays into native screens |
| `Tile`, `LumenColor`, level types | `game/model.ts` | Keep seven identities and Prism Vortex representation |
| `makeBoard`, `collapseBoard`, `hasPlayableChain` | `game/board.ts` | Keep guaranteed lines and valid refills; no DOM dependency |
| `levelConfig` and star thresholds | `game/levels.ts` | Keep progression values while allowing future objectives |
| Pointer chain logic | `NativeGameBoard.tsx` + `PanResponder` | Direct touch-drag; no swapping mechanic |
| HTML tile/image elements | `LumenTile.tsx` | Native `Image` plus animated scale/opacity/translation |
| SVG trail overlay | `ChainTrail.tsx` | Native SVG or animated native paths |
| CSS glow/particles | Native Animated/Reanimated layers | Translate only visual effects, not game rules |
| `localStorage` progress | `ProgressProvider.tsx` + AsyncStorage | Normalize persisted data and preserve gift/music/sound settings |
| Web Audio + `<audio>` | Native audio service | Use user-controlled homepage/gameplay loops and sound effects |
| CSS map scene | Native map scene | Use supplied backgrounds and native positioned nodes |
| Result overlay and boosters | Native modal/overlay components | Preserve replay, next level, shuffle, bomb, burst, and currency behavior |

## Safe port phases

1. **Foundation (this pass):** native artifact, palette, supplied asset registry, pure board/level/progress modules.
2. **Playable vertical slice:** one native game route with a 6×6 board, PanResponder linking, score, moves, gravity, refill, and a result state.
3. **Identity parity:** supplied Lumen images, level backgrounds, logo/loading scene, trail/glow/particles, Fusion Orb, and native audio/haptics.
4. **Product parity:** map progression, boosters, settings, AsyncStorage progress, onboarding/loading, and all win/lose states.
5. **Android release hardening:** native Android build configuration, signed APK/AAB workflow, device checks, offline asset/audio checks, and release-only verification.

## Explicit non-goals for this pass

- Do not delete or modify `artifacts/lumen-pop`.
- Do not port the UI wholesale from HTML/CSS.
- Do not create a website fallback for the native game.
- Do not start the full board screen, audio service, or Android release build while daily usage is limited.