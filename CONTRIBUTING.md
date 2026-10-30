# Contributing to the Agentry plugin for OpenClaw

This repository holds the published Agentry plugin for OpenClaw. Every file
in it is written by the release that publishes the plugin, so nothing is
changed here by hand, and a pull request cannot be merged as it stands.

## Issues

Issues are welcome here: a problem installing or using the plugin in OpenClaw,
a skill or command that leads the agent astray, or a listing detail that is
wrong. Say which plugin version you have (the `version` in its manifest),
which host you use and its version, the output of `agentry --version`, and
your operating system. Never paste a token, password or model key.

Other problems belong elsewhere:

- A QuickAgent that misbehaves: report it to the registry that serves it, with
  the report control on the QuickAgent's page.
- The Agentry MCP server (`server/` in this repository):
  [blaktron/agentry-mcp](https://github.com/blaktron/agentry-mcp).
- The Agentry CLI: [blaktron/agentry-cli](https://github.com/blaktron/agentry-cli).

## Changes

Describe a fix in an issue, or show it in a pull request. A maintainer carries
it into the plugin's source, and it arrives here with the next release.

`server/agentry-mcp.mjs` is the Agentry MCP server, bundled from a signed
release. `server/PROVENANCE.json` names that release and its digests. A change
to the server goes to its own repository.

## Security

Never in a public issue or pull request. See [SECURITY.md](SECURITY.md).

## Code of Conduct

Everyone who takes part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Licence

MIT, see [LICENSE](LICENSE). The bundled server's third-party licences are in
`server/THIRD-PARTY-NOTICES.md`.
