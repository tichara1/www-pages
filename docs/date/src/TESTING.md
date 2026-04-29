# Évora F1 — Manual Testing

Run before tagging F1 as done. Test in Chrome and Safari (desktop). At least one full flow on iOS Safari (real device).

## Setup
- Serve: `python3 -m http.server 8080 --directory docs`
- Open: `http://localhost:8080/date/src/`
- Reset between tests: `localStorage.removeItem('evora.v1'); location.reload();`

## Scenarios

1. **Cold load EN**: navigator.language = en, no storage → entry shows EN copy. Full flow Entry → Couple → Mode → Config (toggle dinner, pick place) → Summary → Confirm → Confirmed → Back to start. No console errors at any step.
2. **Cold load CZ**: localStorage cleared, set CZ via toggle → reload → CZ persists. Repeat flow in CZ.
3. **Lang switch mid-flow**: open app in EN, advance to Config, toggle to CZ — labels update, draft state intact (toggles, picked place still set).
4. **Reload mid-flow**: in Config screen, reload page — Entry screen shows `Resume your draft` button. Tap it → returns to Mode (or onward), draft preserved.
5. **Place selection persists**: pick place in dinner sheet → Save → row shows place name → Summary shows place name in detail row.
6. **Browse places**: from Entry tap `Browse places` → category chips filter list → toggle favorite on a place → reload page → favorite is still ♥.
7. **Favorites link**: from Entry tap `Favorites` → list shows only favorited places.
8. **History flow**: Confirm an evening → return to Entry → `History` link visible → open History → entry listed → tap `Replicate` → Summary opens with replicated draft.
9. **History remove**: in History tap `Remove` on an entry → entry gone → reload → still gone.
10. **`.ics` export**: from Summary tap `Add to Calendar` → date prompt appears (no `draft.date` yet) → pick date+time → file downloads → opens cleanly in macOS Calendar with right title/time/description/location.
11. **PNG export**: from Summary tap `Save as Image` (date already set from #10) → PNG downloads → opens with paper background, italic title, timeline rows, terracotta QR bottom-right, wordmark + URL bottom-left. Phone clipboard shows share URL toast `Share link copied ✓` (desktop browsers may block clipboard write — that's fine).
12. **QR scan**: scan the PNG QR with phone camera → opens app at `#s=…` → read-only Summary with `Use this as my draft` and `Decline` buttons. Tap `Use this as my draft` → editable Summary with the shared draft loaded.
13. **Broken share link**: open `…/src/#s=garbage` → no crash, lands on Entry. Console shows no red errors (decodeShared returned null silently).
14. **Empty history hides link**: clear localStorage → Entry screen does *not* show `History` link.
15. **Required experience**: in Config the Experience section's toggle does not turn off (required: true).

Pass criterion: every scenario above passes. Document any deviations as follow-up issues; do not silently skip.
