import { useEffect, useState } from 'react';

const format = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });

/** Current time in Kerala — tells visitors in other time zones when a reply is likely. */
export function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {format.format(now)} IST
    </time>
  );
}
