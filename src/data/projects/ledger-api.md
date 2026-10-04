---
{
  "title": "ledger-api",
  "description": "Backend financial ledger demonstrating immutable double-entry records, atomic transfers, idempotent requests, and JWT-based authentication.",
  "image": "/projects/ledger-api.webp",
  "technologies": [
    "JavaScript",
    "Node.js",
    "Express.js",
    "REST API",
    "MongoDB",
    "Mongoose",
    "JWT"
  ],
  "github": "https://github.com/pulkitdotio/ledger-api",
  "status": "Complete"
}
---

## Overview

ledger-api is a backend financial ledger. Balances are calculated from immutable ledger entries instead of directly mutating a stored balance.

## Capabilities

- User registration, login, and logout.
- JWT and HTTP-only cookie authentication with token blacklist-based logout.
- Account creation and retrieval.
- Balance derived from immutable double-entry debit and credit records.
- Atomic transfers using MongoDB sessions and transactions.
- Idempotency keys to prevent duplicate transactions.
- Transaction state tracking.
- A privileged system-user endpoint for initial funds.

## Supporting technologies

bcryptjs, cookie-parser, dotenv, and MongoDB sessions/transactions.

## Availability

The project is complete and its source is available on GitHub. There is no live deployment.
