---
{
  "title": "Sentinel",
  "description": "Distributed API monitoring platform with multi-region health checks, automated incident detection, real-time dashboard updates, and latency analytics.",
  "image": "/projects/sentinel.webp",
  "technologies": [
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redis",
    "BullMQ",
    "Socket.IO",
    "Zod",
    "JWT"
  ],
  "github": "https://github.com/pulkitdotio/Sentinel",
  "live": "https://sentinel-jet-one.vercel.app",
  "status": "Live"
}
---

## Overview

Sentinel monitors HTTP and HTTPS APIs across multiple regions, detects incidents and recovery, and updates a live dashboard with uptime and p50/p95/p99 latency metrics.

## Capabilities

- Multi-region HTTP/HTTPS monitoring with distributed probe workers.
- Automated check scheduling and BullMQ + Redis background job processing.
- Incident detection and recovery with configurable failure/recovery thresholds.
- Real-time dashboard updates using Socket.IO.
- SSRF-aware outbound requests.
- JWT authentication and per-user monitor isolation.
- Optional asynchronous AI health and incident analysis.

## Architecture

The modular monolith separates the API server, scheduler, regional probe workers, incident worker, and optional AI worker. MongoDB stores application data, Redis and BullMQ coordinate background work, and the React frontend presents monitoring results.

Health and incident decisions remain deterministic. Optional AI analysis runs asynchronously instead of controlling monitor state.

## Supporting technologies

Vite, React Router, TanStack Query, React Hook Form, Tailwind CSS, Motion, Mongoose, Pino, Argon2, Vitest, and Supertest.
