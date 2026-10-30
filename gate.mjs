// Decides which Agentry tool calls need a person's approval in the host's own
// UI. The Agentry MCP server asks through MCP elicitation when the host
// supports it; on a host that does not, a call that carries the preview's
// `confirm` digest would go ahead on the model's word alone. This gate makes
// the host ask the person instead, before the call reaches the server.

// Calls that change something without a preview step of their own.
const UNPREVIEWED_WRITES = new Set(["agentry_setup", "agentry_agent_stop"]);

/**
 * The Agentry tool name inside a host's prefixed name, or null. Hosts prefix
 * the server's tools in different ways (`agentry__agentry_run`,
 * `mcp__agentry__agentry_run`, `mcp__plugin_agentry_agentry__agentry_run`,
 * `mcp_agentry_agentry_run`); the tool is the shortest trailing
 * `agentry_<word>[_<word>…]` that starts at a separator, since the server's
 * own tool names never contain `agentry_` twice.
 */
export function agentryTool(hostToolName) {
  const name = String(hostToolName ?? "");
  let found = null;
  for (const m of name.matchAll(/(?:^|[_:.-])(?=(agentry(?:_[a-z]+)+)$)/g)) found = m[1];
  return found;
}

const clip = (s, n) => {
  const t = String(s).replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
};

/**
 * Returns null when the call needs no approval, or { title, description }
 * for the prompt. Only names and short, non-secret arguments are shown: no
 * argument the server treats as a secret is ever a value (they are variable
 * names), and task text is clipped.
 */
export function approvalFor(hostToolName, params = {}) {
  const tool = agentryTool(hostToolName);
  if (!tool) return null;
  const confirming = typeof params.confirm === "string" && params.confirm.length > 0;
  const tasksChange = tool === "agentry_agent_tasks" && typeof params.action === "string" && params.action !== "list";
  if (!confirming && !UNPREVIEWED_WRITES.has(tool) && !tasksChange) return null;

  const verb = tool.replace(/^agentry_/, "").replace(/_/g, " ");
  const facts = [];
  for (const key of ["ref", "name", "dir", "path", "target", "provider", "action", "task"]) {
    if (typeof params[key] === "string" && params[key]) facts.push(`${key}: ${clip(params[key], 80)}`);
  }
  if (typeof params.input === "string" && params.input) facts.push(`task: ${clip(params.input, 120)}`);
  for (const key of ["files", "knowledge", "destinations"]) {
    if (Array.isArray(params[key]) && params[key].length) facts.push(`${key}: ${clip(params[key].join(", "), 120)}`);
  }
  const lead = confirming
    ? "Agentry will carry out the operation it previewed. Check that the preview shown in the conversation is what you want."
    : "Agentry will change this computer's Agentry setup.";
  return {
    title: clip(`Agentry: ${verb}`, 80),
    description: clip([lead, ...facts].join("\n"), 512),
  };
}
