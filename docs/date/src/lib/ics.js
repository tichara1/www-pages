(function () {
  window.Evora = window.Evora || {};

  function pad(n) { return String(n).padStart(2, '0'); }

  function fmtLocal(d) {
    return (
      d.getFullYear() +
      pad(d.getMonth() + 1) +
      pad(d.getDate()) + 'T' +
      pad(d.getHours()) +
      pad(d.getMinutes()) +
      pad(d.getSeconds())
    );
  }

  function escText(s) {
    return String(s == null ? '' : s)
      .replace(/\\/g, '\\\\')
      .replace(/\r?\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;');
  }

  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID() + '@evora';
    return Math.random().toString(36).slice(2) + '-' + Date.now() + '@evora';
  }

  window.Evora.buildICS = function ({ title, start, end, description, location }) {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Evora//F1//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + uid(),
      'DTSTAMP:' + fmtLocal(new Date()),
      'DTSTART:' + fmtLocal(start),
      'DTEND:' + fmtLocal(end),
      'SUMMARY:' + escText(title),
      'DESCRIPTION:' + escText(description || ''),
    ];
    if (location) lines.push('LOCATION:' + escText(location));
    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.join('\r\n') + '\r\n';
  };

  window.Evora.downloadICS = function (filename, content) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
})();
