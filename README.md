# Discord Permission Calculator

A production-ready, zero-dependency (except CDN QR library) Discord permission calculator built with vanilla HTML/CSS/JS.

## Files

```text
discord-permission-calculator/
├── index.html
├── style.css
└── app.js
```

## Run

No install needed.

1. Open `index.html` in any modern browser.
2. Start toggling permissions and copy the generated bitfield/invite URL.

## Features

- Full Discord permission set (51 flags) using `BigInt`
- Permission cards with categories, danger levels, and search/filter
- Live decimal/hex/binary bitfield display with copy actions
- Decode existing bitfields (decimal or `0x...`)
- Invite URL + QR code generator
- Built-in presets + custom presets stored in `localStorage` (`dcalc_presets`)
- Warnings for risky/conflicting permission combinations
- Export snippets for `discord.js`, `discord.py`, `JDA`, and raw integer
- Shareable URL hash state restore (`#p=...&cid=...`)

## Notes

- Bitfield math is fully `BigInt`-based for correctness with large flags.
- Works fully offline after initial font/CDN script load.
