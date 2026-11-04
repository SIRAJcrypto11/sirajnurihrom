export const GITHUB_LOGIN = "SIRAJcrypto11";
export const REMOTE_DATA_URL =
  "https://raw.githubusercontent.com/SIRAJcrypto11/sirajnurihrom/github-data/github.json";
export const STALE_MS = 36 * 3600 * 1000;

export function computeStreaks(days) {
  if (!Array.isArray(days) || days.length === 0) {
    return { longest: 0, current: 0 };
  }

  let longest = 0;
  let run = 0;
  for (const entry of days) {
    const count = Number(entry[1]) || 0;
    if (count > 0) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  let current = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    const count = Number(days[i][1]) || 0;
    if (count > 0) {
      current += 1;
    } else if (i === days.length - 1) {
      continue;
    } else {
      break;
    }
  }

  return { longest, current };
}

function buildLanguages(languagesByRepo, repos) {
  const isFork = (repo) => Boolean(repo && repo.fork);
  const colorOrder = ["#1239c7", "#3b5bff", "#6d8bff", "#9fb3ff", "#c5d2ff"];
  const otherDark = "#9aa8bf";

  if (languagesByRepo && typeof languagesByRepo === "object") {
    const totals = {};
    for (const repo of repos) {
      if (isFork(repo)) continue;
      const entry = languagesByRepo[repo.name] || languagesByRepo[repo.full_name];
      if (!entry || typeof entry !== "object") continue;
      for (const [lang, bytes] of Object.entries(entry)) {
        totals[lang] = (totals[lang] || 0) + (Number(bytes) || 0);
      }
    }
    const total = Object.values(totals).reduce((sum, v) => sum + v, 0);
    if (total === 0) return { method: "bytes", items: [] };
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5);
    const rest = sorted.slice(5);
    const items = top.map(([name, value]) => ({
      name,
      value,
      share: Number((value / total).toFixed(4)),
    }));
    const otherValue = rest.reduce((sum, [, v]) => sum + v, 0);
    if (otherValue > 0) {
      items.push({
        name: "__other",
        value: otherValue,
        share: Number((otherValue / total).toFixed(4)),
      });
    }
    return { method: "bytes", items, colors: colorOrder, otherColor: otherDark };
  }

  const counts = {};
  for (const repo of repos) {
    if (isFork(repo)) continue;
    const lang = repo.language;
    if (!lang) continue;
    counts[lang] = (counts[lang] || 0) + 1;
  }
  const total = Object.values(counts).reduce((sum, v) => sum + v, 0);
  if (total === 0) return { method: "repos", items: [] };
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5);
  const rest = sorted.slice(5);
  const items = top.map(([name, value]) => ({
    name,
    value,
    share: Number((value / total).toFixed(4)),
  }));
  const otherValue = rest.reduce((sum, [, v]) => sum + v, 0);
  if (otherValue > 0) {
    items.push({
      name: "__other",
      value: otherValue,
      share: Number((otherValue / total).toFixed(4)),
    });
  }
  return { method: "repos", items, colors: colorOrder, otherColor: otherDark };
}

function buildActivity(activity) {
  if (!Array.isArray(activity)) return [];
  return activity.slice(0, 5).map((entry) => ({
    repo: entry.repo,
    branch: entry.branch,
    message: String(entry.message || "").slice(0, 140),
    sha: String(entry.sha || "").slice(0, 7),
    url: entry.url,
    date: entry.date,
  }));
}

function buildFeatured(pinned, repos) {
  if (Array.isArray(pinned) && pinned.length > 0) {
    const items = pinned.slice(0, 6).map((item) => ({
      name: item.name,
      fullName: item.fullName || item.nameWithOwner || item.name,
      description: item.description || "",
      language: item.primaryLanguage?.name || item.language || "",
      stars: Number(item.stars ?? item.stargazerCount ?? 0),
      forks: Number(item.forks ?? item.forkCount ?? 0),
      url: item.url || item.htmlUrl || "",
      homepage: item.homepage || item.homepageUrl || "",
    }));
    return { source: "pinned", items };
  }

  const nonFork = (repos || []).filter((r) => !r.fork);
  nonFork.sort((a, b) => {
    const starDiff = (b.stargazers_count || 0) - (a.stargazers_count || 0);
    if (starDiff !== 0) return starDiff;
    return (b.pushed_at || "").localeCompare(a.pushed_at || "");
  });
  const items = nonFork.slice(0, 6).map((r) => ({
    name: r.name,
    fullName: r.full_name,
    description: r.description || "",
    language: r.language || "",
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
    url: r.html_url,
    homepage: r.homepage || "",
  }));
  return { source: "top", items };
}

export function buildPayload({
  user,
  contributions,
  repos,
  languagesByRepo = null,
  activity,
  pinned = null,
  source,
}) {
  const days = (contributions.days || contributions.contributions || []).map((d) =>
    Array.isArray(d)
      ? [String(d[0]), Number(d[1]) || 0, Number(d[2]) || 0]
      : [String(d.date), Number(d.count) || 0, Number(d.level) || 0],
  );
  const total = Number(contributions.total) || 0;
  const { longest, current } = computeStreaks(days);
  const activeDays = days.filter((d) => d[1] > 0).length;
  const year = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date(user.created_at).getFullYear();

  return {
    schema: 1,
    generatedAt: new Date().toISOString(),
    source: source || "live",
    login: user.login,
    user: {
      login: user.login,
      name: user.name || "",
      htmlUrl: user.html_url,
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      createdAt: user.created_at,
    },
    contributions: { total, days },
    stats: {
      total,
      longestStreak: longest,
      currentStreak: current,
      publicRepos: user.public_repos,
      since: year,
      activeDays,
    },
    languages: buildLanguages(languagesByRepo, repos),
    activity: buildActivity(activity),
    featured: buildFeatured(pinned, repos),
  };
}

export function isFresh(payload, now = Date.now()) {
  if (!payload || payload.schema !== 1) return false;
  if (!Array.isArray(payload.contributions?.days)) return false;
  const generated = new Date(payload.generatedAt).getTime();
  if (Number.isNaN(generated)) return false;
  return now - generated < STALE_MS;
}

function ghHeaders(token) {
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function ghFetch(url, token) {
  const res = await fetch(url, { headers: ghHeaders(token) });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
  return res.json();
}

async function fetchContributions() {
  const url = `https://github-contributions-api.jogruber.de/v4/${GITHUB_LOGIN}?y=last`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Contributions API ${res.status}`);
  return res.json();
}

function extractPushEvents(events) {
  const seen = new Set();
  const pushes = [];
  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    const head = event.payload?.head;
    if (!head || seen.has(head)) continue;
    seen.add(head);
    pushes.push({
      repo: event.repo?.name,
      head,
      ref: event.payload?.ref || "",
      date: event.created_at,
    });
  }
  return pushes;
}

async function resolveCommit(repo, sha, token) {
  try {
    const data = await ghFetch(
      `https://api.github.com/repos/${repo}/commits/${sha}`,
      token,
    );
    const message = (data.commit?.message || "").split("\n")[0].slice(0, 140);
    return {
      repo,
      branch: "",
      message,
      sha: data.sha?.slice(0, 7) || sha.slice(0, 7),
      url: data.html_url,
      date: data.commit?.author?.date,
    };
  } catch {
    return null;
  }
}

async function buildActivityFromEvents(events, token, commitLookups) {
  const pushes = extractPushEvents(events);
  const results = [];
  for (const push of pushes) {
    if (results.length >= commitLookups) break;
    const resolved = await resolveCommit(push.repo, push.head, token);
    if (resolved) {
      const branch = push.ref.replace("refs/heads/", "");
      results.push({ ...resolved, branch });
    }
  }
  return results;
}

async function fillActivityFromRepos(repos, token, existing, limit) {
  if (existing.length >= limit) return existing;
  const existingShas = new Set(existing.map((e) => e.sha));
  const candidates = repos
    .filter((r) => !r.fork)
    .sort((a, b) => (b.pushed_at || "").localeCompare(a.pushed_at || ""))
    .slice(0, 4);

  const extra = [];
  for (const repo of candidates) {
    if (extra.length + existing.length >= limit) break;
    try {
      const commits = await ghFetch(
        `https://api.github.com/repos/${repo.full_name}/commits?author=${GITHUB_LOGIN}&per_page=3`,
        token,
      );
      for (const c of commits) {
        if (existingShas.has(c.sha?.slice(0, 7))) continue;
        existingShas.add(c.sha?.slice(0, 7));
        extra.push({
          repo: repo.full_name,
          branch: "",
          message: (c.commit?.message || "").split("\n")[0].slice(0, 140),
          sha: c.sha?.slice(0, 7) || "",
          url: c.html_url,
          date: c.commit?.author?.date,
        });
        if (extra.length + existing.length >= limit) break;
      }
    } catch {
      // skip repo on failure
    }
  }
  return [...existing, ...extra];
}

async function fetchPinned(token) {
  if (!token) return null;
  const query = `query { user(login: "${GITHUB_LOGIN}") { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { name nameWithOwner description url homepageUrl stargazerCount forkCount primaryLanguage { name } } } } } }`;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...ghHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const nodes = json?.data?.user?.pinnedItems?.nodes;
    if (!Array.isArray(nodes)) return null;
    return nodes.map((n) => ({
      name: n.name,
      fullName: n.nameWithOwner,
      description: n.description || "",
      language: n.primaryLanguage?.name || "",
      stars: n.stargazerCount || 0,
      forks: n.forkCount || 0,
      url: n.url,
      homepage: n.homepageUrl || "",
    }));
  } catch {
    return null;
  }
}

async function fetchLanguageBytes(repos, token) {
  const map = {};
  for (const repo of repos) {
    if (repo.fork) continue;
    try {
      const data = await ghFetch(
        `https://api.github.com/repos/${repo.full_name}/languages`,
        token,
      );
      map[repo.name] = data;
    } catch {
      // skip
    }
  }
  return map;
}

export async function fetchLive({
  fetchImpl = fetch,
  token = null,
  withLanguageBytes = false,
  commitLookups = 5,
} = {}) {
  const originalFetch = globalThis.fetch;
  if (fetchImpl && fetchImpl !== originalFetch) {
    globalThis.fetch = fetchImpl;
  }
  try {
    const [contribData, user, repos, events] = await Promise.all([
      fetchContributions(),
      ghFetch(`https://api.github.com/users/${GITHUB_LOGIN}`, token),
      ghFetch(
        `https://api.github.com/users/${GITHUB_LOGIN}/repos?per_page=100&type=owner&sort=pushed`,
        token,
      ),
      ghFetch(
        `https://api.github.com/users/${GITHUB_LOGIN}/events/public?per_page=100`,
        token,
      ),
    ]);

    const contributions = {
      total: contribData.total?.lastYear || 0,
      days: (contribData.contributions || []).map((d) => [d.date, d.count, d.level]),
    };

    let activity = await buildActivityFromEvents(events, token, commitLookups);
    activity = await fillActivityFromRepos(repos, token, activity, 5);
    activity.sort(
      (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
    );
    activity = activity.slice(0, 5);

    const languagesByRepo = withLanguageBytes
      ? await fetchLanguageBytes(repos, token)
      : null;

    const pinned = await fetchPinned(token);

    return buildPayload({
      user,
      contributions,
      repos,
      languagesByRepo,
      activity,
      pinned,
      source: "live",
    });
  } finally {
    if (fetchImpl && fetchImpl !== originalFetch) {
      globalThis.fetch = originalFetch;
    }
  }
}
