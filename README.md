# Agentry for OpenClaw

Agentry brings QuickAgents into your agent host. Search a registry, read a QuickAgent's capability contract, scan findings and signature, install it, and run it in Agentry's sandboxed runner with a preview you approve first. Build your own QuickAgent, validate it, get an AI Review and test it before you publish. The plugin drives the Agentry CLI on your computer; the CLI keeps your sign-in and enforces each QuickAgent's contract.

## Install

```sh
openclaw plugins install clawhub:@secureagentry/openclaw-agentry
openclaw plugins enable agentry
```

## Requirements

- The Agentry CLI 0.6.63 or newer on the gateway's `PATH`. Install it from https://secureagentry.net/download.
- Node 20 or newer.
- Docker on the gateway host, for runs on that computer.

## How it behaves on a shared gateway

The Agentry tools act with the Agentry sign-in of the person who runs the
gateway. On a gateway that serves chat channels, only senders OpenClaw resolves
as owners can use them, unless `allowNonOwners` is set in the plugin's
configuration. Any call that installs, runs, publishes a change or confirms a
preview waits for approval in OpenClaw's approval prompt.

Signing in stays with the gateway owner, in a terminal on the gateway host
(`agentry login`). Documentation: https://docs.secureagentry.net/agentry/mcp/. Privacy: https://secureagentry.net/privacy.

## Inside a NemoClaw sandbox

Install the same package with the sandbox's OpenClaw:
`nemoclaw <sandbox> exec -- openclaw plugins install clawhub:@secureagentry/openclaw-agentry`.
The Agentry CLI, its sign-in and egress to the registry must then exist inside
the sandbox.
