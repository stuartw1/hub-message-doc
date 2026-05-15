# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

This is the **documentation project** for the HubMessage system. It is currently
near-empty — only a placeholder `README.md` exists. Flesh this file out as real
content lands (build/preview commands, site structure, publishing flow).

## What HubMessage is

HubMessage is a macOS menu bar app that talks to HubSpot's Custom Channels API
through a Cloudflare Worker proxy. The system spans several **separate git repos**;
this `hub-message-doc` repo is meant to document it.

| Component | Location | Role |
|-----------|----------|------|
| API proxy | `/Users/user/code/hub-message-api` | Cloudflare Worker that injects the HubSpot developer key server-side. Has its own detailed `CLAUDE.md`. |
| macOS client | `/Users/user/code/xcode/HubMessage` | The menu bar app. Calls the worker. |
| HubSpot project config | `~/HubMessage` | OAuth scopes and app metadata. |

When documenting behaviour, treat `hub-message-api/CLAUDE.md` as the source of
truth for the proxy's architecture and security properties rather than restating
it from memory.
