export function workCopy(messages, entry) {
  const copy = messages.projects[entry.slug] || {};
  return {
    title: copy.title || entry.title,
    summary: copy.summary || "",
    built: copy.built || "",
  };
}
