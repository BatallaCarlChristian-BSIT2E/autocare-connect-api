# AutoCare Connect API

Backend prototype for the AutoCare Connect appointment and vehicle maintenance system from the supplied ITEC 116 labs.

## Stack

- NestJS and TypeScript
- TypeORM with MySQL
- JWT bearer authentication and bcrypt password hashing
- DTO validation with `class-validator`

## Run locally

1. Install Node.js 20 or newer and MySQL 8.
2. Create the database by importing `database/schema.sql` in MySQL/phpMyAdmin, or let TypeORM create tables in a local development database.
3. Copy `.env.example` to `.env`, then set the local MySQL connection values and a private random `JWT_SECRET`.
4. Run `npm install`.
5. Run `npm run start:dev`. The API listens at `http://localhost:3000/api/v1` by default.
6. Import `postman/AutoCare-Connect.postman_collection.json` into Postman. Register a user and log in; the login request saves the returned token in the collection variable.

`DB_SYNCHRONIZE=true` is for a disposable local development database only. Turn it off for a database with data you need to preserve; use the supplied SQL schema or migrations for controlled changes.

## Authentication and roles

- `POST /api/v1/auth/register` creates a customer-role login; it never accepts a role from the request.
- `POST /api/v1/auth/login` returns a JWT. Send it as `Authorization: Bearer <token>` to protected endpoints.
- `GET /api/v1/auth/me` returns the authenticated account.
- All resource routes require a valid JWT. Missing or invalid tokens return `401`.
- Account roles are `customer`, `advisor`, and `admin`. Customer accounts can only see their matching customer profile and its vehicles, appointments, service records, and reminders. Inventory routes are for advisors and admins; service catalog writes need an advisor or admin. Deleting customers, vehicles, services, or inventory requires admin; appointment and service-history changes/deletes require advisor or admin. Insufficient role returns `403`.
- To promote a local demo account after registering it, update that specific user's role in phpMyAdmin: `UPDATE users SET role = 'admin' WHERE email = 'your-login-email@example.com';`. Do not expose a public admin-registration endpoint.

## API resources

Each resource has list and detail reads, create, full update (`PUT`), partial update (`PATCH`), and delete routes.

| Resource | Routes |
| --- | --- |
| Customers | `/api/v1/customers`, `/api/v1/customers/:id` |
| Vehicles | `/api/v1/vehicles`, `/api/v1/vehicles/:id` |
| Appointments | `/api/v1/appointments`, `/api/v1/appointments/:id` |
| Service history | `/api/v1/service-history`, `/api/v1/service-history/:id` |
| Inventory | `/api/v1/inventory`, `/api/v1/inventory/:id` |
| Services | `/api/v1/services`, `/api/v1/services/:id` |
| Reminders | `/api/v1/reminders`, `/api/v1/reminders/:id` |

The Lab 05 reminder path `/api/v1/reminders/vehicles/reminders` supports `status`, `vehicleId`, `page`, and `limit` filters. `GET /api/v1/reports/revenue?from=YYYY-MM-DD&to=YYYY-MM-DD` is admin-only. Together with register, login, and `me`, the controllers expose over 40 REST routes. All use JSON request/response bodies. NestJS returns standard HTTP errors for invalid input, missing resources, unauthenticated requests, and forbidden roles.

## Data model

Customers own vehicles (one-to-many). Each vehicle can have appointments and service-history records (one-to-many). An appointment references both its customer and vehicle, and the service verifies that they belong together. Inventory items remain independent, matching the Lab 04 proposal. Foreign keys prevent deleting referenced customers and vehicles.

## Project structure

`src/<module>` contains controllers, DTOs, and services. `src/entities` defines the TypeORM tables and relations. Controllers validate and route HTTP requests; services enforce business rules and use TypeORM repositories; repositories persist records in MySQL.
