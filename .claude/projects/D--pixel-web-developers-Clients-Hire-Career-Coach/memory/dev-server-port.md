---
name: dev-server-port
description: The dev server actually serves on port 8080, not the 8081 in launch.json
metadata:
  type: project
---

`.claude/launch.json` declares port 8081, but `vite dev` (via `@lovable.dev/vite-tanstack-config`, which handles port/host/strictPort itself) actually binds to **8080**. The preview tool reports 8081 but the page only loads at `http://localhost:8080`. When verifying in the preview, navigate to 8080. `preview_screenshot` is flaky/times out here — use `preview_snapshot` and `preview_eval` instead.
