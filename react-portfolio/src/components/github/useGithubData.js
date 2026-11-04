import { startTransition, useEffect, useRef, useState } from "react";
import {
  REMOTE_DATA_URL,
  fetchLive,
  isFresh,
} from "../../lib/github.js";

function pickNewest(...payloads) {
  let best = null;
  for (const p of payloads) {
    if (!p || !p.generatedAt) continue;
    if (!best || new Date(p.generatedAt) > new Date(best.generatedAt)) {
      best = p;
    }
  }
  return best;
}

export function useGithubData(ref) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return undefined;

    let triggered = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            io.unobserve(entry.target);
            loadData();
          }
        }
      },
      { rootMargin: "1600px 0px" },
    );

    io.observe(element);

    async function loadData() {
      if (!mountedRef.current) return;
      setStatus("loading");

      const [localResult, remoteResult] = await Promise.allSettled([
        fetch("/github.json", { cache: "no-cache" }).then((r) => {
          if (!r.ok) throw new Error(`local ${r.status}`);
          return r.json();
        }),
        fetch(REMOTE_DATA_URL, { cache: "no-cache" }).then((r) => {
          if (!r.ok) throw new Error(`remote ${r.status}`);
          return r.json();
        }),
      ]);

      const localPayload =
        localResult.status === "fulfilled" ? localResult.value : null;
      const remotePayload =
        remoteResult.status === "fulfilled" ? remoteResult.value : null;

      const newest = pickNewest(localPayload, remotePayload);

      if (newest && isFresh(newest)) {
        if (mountedRef.current) {
          startTransition(() => {
            setData(newest);
            setStatus("ready");
          });
        }
        return;
      }

      try {
        const live = await fetchLive({
          commitLookups: 5,
          withLanguageBytes: false,
        });
        if (mountedRef.current) {
          setData(live);
          setStatus("ready");
        }
        return;
      } catch {
        // live failed, fall through
      }

      if (newest) {
        if (mountedRef.current) {
          startTransition(() => {
            setData(newest);
            setStatus("ready");
          });
        }
        return;
      }

      if (mountedRef.current) {
        setStatus("empty");
      }
    }

    return () => {
      io.disconnect();
    };
  }, [ref]);

  return { status, data };
}
