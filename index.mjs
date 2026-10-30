// OpenClaw entry point. The plugin's manifest contributes the Agentry MCP
// server and the skill; this entry adds the two gates OpenClaw needs:
//
//  - On a gateway that serves chat channels, every sender who can reach the
//    agent would otherwise act with the gateway owner's Agentry sign-in, so
//    only a requester OpenClaw resolved as an owner may use the Agentry
//    tools. Runs with no message requester (the owner's own terminal or UI)
//    are the owner's.
//  - OpenClaw declares MCP elicitation only when MCP Apps are on, so a call
//    that confirms a preview, or changes the setup, is held for the person's
//    approval through OpenClaw's own approval prompt.
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { agentryTool, approvalFor } from "./gate.mjs";

export default definePluginEntry({
  id: "agentry",
  name: "Agentry",
  description: "Find, verify, install and run QuickAgents, and build your own.",
  register(api) {
    const config = () => api.pluginConfig ?? {};
    api.on("before_tool_call", async (event, ctx) => {
      if (!agentryTool(event.toolName)) return;
      const requester = ctx?.requester;
      if (requester && requester.senderIsOwner !== true && config().allowNonOwners !== true) {
        return {
          block: true,
          blockReason:
            "Only the owner of this OpenClaw gateway can use Agentry here: its tools act with the owner's Agentry sign-in.",
        };
      }
      const approval = approvalFor(event.toolName, event.params);
      if (!approval) return;
      return {
        requireApproval: {
          ...approval,
          severity: "warning",
          allowedDecisions: ["allow-once", "deny"],
          timeoutMs: 300_000,
        },
      };
    });
  },
});
