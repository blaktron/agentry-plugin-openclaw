# Security policy

**Do not open a public issue for a security vulnerability.**

Email **security@secureagentry.net** with what you found, how to reproduce it
and what an attacker gains. A person reads every report within 2 business
days, sends an assessment within 5, and ships a fix or mitigation for high
and critical issues within 30 days. Credit goes in the advisory if you want
it. You can also report privately through this repository's Security tab.

Of particular interest in this plugin:

- **Server substitution**: the plugin starting an MCP server other than the
  bundled `server/agentry-mcp.mjs`, or a bundled server that does not match
  the signed release named in `server/PROVENANCE.json`.
- **Consent bypass**: a skill or command that leads the host to install, run or
  publish without the person seeing and approving the preview, or that passes
  `acceptUnsigned`, `acceptUnscanned` or a confirmation digest the person did
  not agree to.
- **Credential exposure**: the plugin asking for a token, password or model key
  in the chat, or putting one in a tool argument, a log or the host's
  configuration.

Malicious content in a QuickAgent is reported to the registry that serves it
(the report control on the QuickAgent's page), not here.
