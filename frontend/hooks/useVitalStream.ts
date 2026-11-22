"use client";

// Simulates an IoT vitals stream (see blueprint section 13/14 "IoT Prototype"
// and "Real-Time Vital Monitoring"). When `active` is true it ticks once a
// second, producing SpO2/heart-rate/temperature readings that drift into the
// blueprint's abnormal-alert scenario after a few ticks so the demo can show
// the full alert -> emergency flow without physical hardware.
import { useEffect, useRef, useState } from "react";

export type VitalPoint = { t: string; spo2: number; hr: number; temp: number };

export function useVitalStream(active: boolean): [VitalPoint[], boolean] {
  const [data, setData] = useState<VitalPoint[]>(() => {
    const arr: VitalPoint[] = [];
    for (let i = 0; i < 10; i++) arr.push({ t: `-${10 - i}s`, spo2: 97, hr: 76, temp: 98.4 });
    return arr;
  });
  const [alarm, setAlarm] = useState(false);
  const tick = useRef(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      tick.current += 1;
      setData((prev) => {
        const last = prev[prev.length - 1];
        const drama = tick.current > 6;
        const spo2 = drama ? Math.max(88, last.spo2 - Math.random() * 2.2) : Math.min(99, last.spo2 + (Math.random() - 0.5));
        const hr = drama ? Math.min(112, last.hr + Math.random() * 5) : Math.max(70, last.hr + (Math.random() - 0.5) * 3);
        const temp = drama ? Math.min(102.5, last.temp + Math.random() * 0.15) : last.temp + (Math.random() - 0.5) * 0.1;
        const next: VitalPoint = { t: `${tick.current * 3}s`, spo2: +spo2.toFixed(1), hr: Math.round(hr), temp: +temp.toFixed(1) };
        setAlarm(next.spo2 < 92 || next.hr > 100);
        return [...prev.slice(-14), next];
      });
    }, 1000);
    return () => clearInterval(id);
  }, [active]);

  return [data, alarm];
}
