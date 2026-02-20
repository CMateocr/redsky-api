# Redsky API (Social Aggregator)

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Apify](https://img.shields.io/badge/Apify-97CA3F?style=for-the-badge&logo=apify&logoColor=white)

A robust, NestJS-based REST API designed to fetch, normalize, and aggregate social media posts from different platforms (Bluesky and Facebook) into a unified, consistent data model. 

## Main Features

- **Unified Data Model:** Transforms platform-specific responses into a standardized `SocialPost` model (Text, Media, Author metadata, Engagement metrics, and nested replies).
- **Bluesky Integration:** Direct integration with the AT Protocol SDK. Resolves user handles to DIDs and recursively fetches post threads.
- **Facebook Integration:** Utilizes Apify (Web Scraping service) to extract post content, media, and metrics from Facebook dynamically.
- **Environment-Aware Configuration:** Strict environment variable validation using `Joi` and `class-validator`.

## Architecture

This project is strictly structured using **Clean Architecture**, **Hexagonal Architecture** and **Domain-Driven Design (DDD)** principles to ensure high maintainability, testability, and framework independence.

* **Interface Layer:** Controllers (`social.controller.ts`) exposing RESTful HTTP endpoints.
* **Application Layer:** Use Cases (`BlueskyUsecase`, `FacebookApifyUsecase`) orchestrating the data flow.
* **Domain Layer:** Core business logic, Service Interfaces (`IBlueskyService`), and the normalized `SocialPost` model.
* **Infrastructure Layer:** External service implementations (AT Protocol Agent, Apify Client) and Data Mappers bridging external APIs to domain models.

## Endpoints

| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/social/bluesky` | Fetches a Bluesky post and its replies | `url` (required), `limit` (default: 5) |
| `GET` | `/social/facebook` | Fetches a Facebook post via Apify | `url` (required) |

## Getting Started

### Prerequisites
- Node.js (v18+)
- Apify Account & API Token
- Bluesky Account

### 1. Environment Setup
Create a `.env` file in the root directory (e.g., `./src/config/environments/dev.env`) with the following required variables:

```env
# Server
PORT=3000
APP_PREFIX=/api/v1
CORS_ALLOWED_ORIGIN=*

# Bluesky Integration
BLUESKY_USERNAME=your_handle.bsky.social
BLUESKY_PASSWORD=your_app_password
BLUESKY_SOCIAL_URL=[https://bsky.social](https://bsky.social)

# Facebook (Apify) Integration
APIFY_API_TOKEN=your_apify_token
APIFY_FACEBOOK_ACTOR=your_actor_id
```
### 2. Run
```run
# Install dependencies
$ npm install

# Run in development watch mode
$ npm run start:dev

# Build and run for production
$ npm run build
$ npm run start:prod
```
