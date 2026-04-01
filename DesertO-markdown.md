# Desert Oasis — 7-Day MVP Plan

**COSC 3306** | Presentation: April 7, 2026 · Final submission: April 22, 2026

---

## Priority Key

| Label | Meaning |
|---|---|
| **Must have** | Required by rubric, visible in demo |
| **Should have** | Important but survivable if rough |
| **Nice to have** | Polish — leave for after Apr 7 |

---

## Core Scene — Do These First

### 1. First-person camera with WASD movement
`PointerLockControls` — ~20 lines. Nothing can be demoed without this.
> **Must have**

### 2. Sand terrain + skybox
`PlaneGeometry` + sand texture + `CubeTextureLoader` skybox. Sets the entire visual context.
> **Must have**

### 3. Translucent water area + object in it
Flat plane with opacity + `MeshPhongMaterial`. Torus as an inner tube on top.
> **Must have**

### 4. Directional light (sun) + one point light
Required by rubric. Directional = sunlight. Point = torch or lamp near the building.
> **Must have**

---

## Objects — Populate the Scene

### 5. 1 team-made building (box geometry hut or tent)
Counts toward the 3 required team-made objects. Apply a wood or stone texture.
> **Must have**

### 6. 3 imported GLTF models (cited from Poly Pizza / Sketchfab)
Camel, rock, crate etc. Load with `GLTFLoader`. Cite every URL — unlinked = no grade.
> **Must have**

### 7. Palm tree or cactus (team-made, procedural geometry)
Cylinder trunk + cone or sphere top. Meets 'one tree or plant' and team-made count.
> **Must have**

### 8. Small grass patch
A second small plane next to the water with a grass texture. 15 minutes of work.
> **Must have**

---

## Animations & Interaction — Required by Rubric

### 9. 2 animated elements (bob + sway)
Inner tube bobs on water with `Math.sin(time)`. Palm fronds sway via rotation.
> **Must have**

### 10. 1 user interaction (keypress changes something)
Press **T** to toggle torch on/off — changes point light intensity. Easy to demo live.
> **Must have**

---

## Shader — Technically Required

### 11. Basic water shader (ShaderMaterial with uTime)
Vertex shader nudges Y by `sin(position.x + uTime)`. Cite any example you adapt.
> **Should have**

---

## Leave These for After April 7th

### 12. GitHub Pages hosting
Required for final submission but not needed for the demo. Set up in Week 2.
> **Nice to have**

### 13. Code comments + documentation
Required for final submission. Write during Week 2–3 as you clean up.
> **Nice to have**

### 14. Additional creativity features
Fog, day/night toggle, particle effects. 10 bonus marks — add only after 1–11 are solid.
> **Nice to have**

---

## 7-Day Sprint to April 7th

| Days | Dates | Goals |
|---|---|---|
| Day 1–2 | Apr 1–2 | Camera, terrain, skybox, lighting. Scene is fully walkable. |
| Day 3–4 | Apr 3–4 | Water plane, grass patch, hut building, palm tree. Oasis takes shape. |
| Day 5–6 | Apr 5–6 | Import 3 GLTF models, add animations, keypress interaction, water shader. |
| Day 7 | Apr 7 | Presentation slides, rehearse live demo, fix last-minute bugs. |