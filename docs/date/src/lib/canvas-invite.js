(function () {
  window.Evora = window.Evora || {};
  const C = () => window.Evora.C;

  // Approximate olive-branch port — single stroked path scaled to fit a box.
  function drawOlive(ctx, x, y, w, color) {
    const h = w * 0.55;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(w / 240, h / 130);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const paths = [
      'M10 70 C 60 65, 110 60, 230 50',
      'M48 67 C 52 52, 68 46, 78 52 C 72 64, 56 70, 48 67 Z',
      'M82 64 C 86 49, 102 43, 112 49 C 106 61, 90 67, 82 64 Z',
      'M118 60 C 122 45, 138 39, 148 45 C 142 57, 126 63, 118 60 Z',
      'M154 56 C 158 41, 174 35, 184 41 C 178 53, 162 59, 154 56 Z',
      'M188 53 C 192 38, 208 32, 218 38 C 212 50, 196 56, 188 53 Z',
      'M62 72 C 58 88, 42 94, 32 88 C 38 76, 54 70, 62 72 Z',
      'M96 68 C 92 84, 76 90, 66 84 C 72 72, 88 66, 96 68 Z',
      'M132 64 C 128 80, 112 86, 102 80 C 108 68, 124 62, 132 64 Z',
      'M168 60 C 164 76, 148 82, 138 76 C 144 64, 160 58, 168 60 Z',
    ];
    for (const d of paths) {
      const p = new Path2D(d);
      ctx.stroke(p);
    }
    // tiny olive
    ctx.beginPath();
    ctx.ellipse(226, 48, 4, 6, -20 * Math.PI / 180, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawQR(ctx, text, x, y, size, color) {
    const qr = window.qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    const cell = size / count;
    ctx.fillStyle = color;
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect(x + c * cell, y + r * cell, cell + 0.5, cell + 0.5);
        }
      }
    }
  }

  // Wraps text into lines that fit `maxW` and draws them, returns final y.
  function drawWrapped(ctx, text, x, y, maxW, lineH) {
    const words = String(text || '').split(/\s+/);
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, y);
        y += lineH;
        line = w;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, x, y);
    return y + lineH;
  }

  window.Evora.renderInvitePNG = async function (state, lang) {
    const W = 1080, H = 1350;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const COL = C();

    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (_) {}
    }

    // Background
    ctx.fillStyle = COL.paper;
    ctx.fillRect(0, 0, W, H);

    // Olive branch
    drawOlive(ctx, W / 2 - 220, 140, 440, COL.accent);

    // Title (Fraunces italic)
    ctx.fillStyle = COL.ink;
    ctx.textAlign = 'center';
    ctx.font = '300 italic 86px "Fraunces", Georgia, serif';
    const title = lang === 'cs' ? 'Večer, sestavený.' : 'An evening, composed.';
    ctx.fillText(title, W / 2, 360);

    // Date / mode line
    ctx.font = '500 22px "Inter", system-ui, sans-serif';
    ctx.fillStyle = COL.inkSoft;
    if (state.dateMode) ctx.fillText(state.dateMode, W / 2, 410);

    // Hairline
    ctx.strokeStyle = COL.hair;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(140, 460); ctx.lineTo(W - 140, 460); ctx.stroke();

    // Timeline rows
    ctx.textAlign = 'left';
    let y = 530;
    const rowH = 64;
    for (const row of state.rows || []) {
      ctx.fillStyle = COL.accent;
      ctx.font = '500 22px "Inter", system-ui, sans-serif';
      ctx.fillText(row.time || '', 160, y);
      ctx.fillStyle = COL.ink;
      ctx.font = '300 italic 32px "Fraunces", Georgia, serif';
      ctx.fillText(row.title || '', 280, y);
      if (row.detail) {
        ctx.fillStyle = COL.inkSoft;
        ctx.font = '400 18px "Inter", system-ui, sans-serif';
        ctx.fillText(row.detail, 280, y + 28);
      }
      y += rowH;
    }

    // Hairline
    ctx.beginPath(); ctx.moveTo(140, H - 320); ctx.lineTo(W - 140, H - 320); ctx.stroke();

    // QR
    if (state.shareUrl) {
      drawQR(ctx, state.shareUrl, W - 320, H - 280, 200, COL.accent);
      ctx.fillStyle = COL.inkSoft;
      ctx.textAlign = 'center';
      ctx.font = '400 14px "Inter", system-ui, sans-serif';
      const cap = lang === 'cs' ? 'Otevři v telefonu' : 'Open on your phone';
      ctx.fillText(cap, W - 220, H - 60);
    }

    // Footer wordmark
    ctx.textAlign = 'left';
    ctx.fillStyle = COL.ink;
    ctx.font = '300 italic 36px "Fraunces", Georgia, serif';
    ctx.fillText('Évora', 140, H - 90);
    ctx.fillStyle = COL.inkMute;
    ctx.font = '400 13px "Inter", system-ui, sans-serif';
    ctx.fillText('tichara1.github.io/www-pages/date/src/', 140, H - 60);

    return await new Promise((resolve) => c.toBlob((b) => resolve(b), 'image/png'));
  };

  window.Evora.downloadPNG = function (filename, blob) {
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
})();
