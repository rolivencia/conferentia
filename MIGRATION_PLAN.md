# Conferentia v2 — Migration Plan

## Current State Summary

Conferentia is an Nx monorepo (v15) for conference management, built with:

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend framework | Angular | 14.2.7 |
| UI toolkit | Ionic | 6.3.3 |
| Backend API | NestJS | 9.0.0 |
| CMS | Sanity Studio | v2 (legacy) |
| Auth | Auth0 | angular-sdk v1.x |
| Mobile | Capacitor | 4.4.0 |
| Monorepo | Nx | 15.0.1 |
| Language | TypeScript | 4.8.4 |

### Workspace structure

```
apps/
  app/                        # Generic conference mobile/web app (Ionic)
  landing-unl-seminar-v1/     # Event-specific landing site (Ionic + Auth0)
  api/                        # NestJS backend (Sanity connector)
  studio/                     # Sanity Studio v2 CMS
libs/
  models/                     # Domain interfaces (framework-agnostic)
  angular-services/           # Frontend services, guards, HTTP layer
  ionic-components/           # Reusable Ionic/Angular UI components
  ionic-pages/                # Shared page modules (user-profile)
  nest-modules/               # Backend utilities (sorting)
```

---

## Part 1 — Reusable Frontend Components to Migrate

### 1.1 Shared UI Component Library (`libs/ionic-components`)

These 6 components are already extracted into a shared library and are the primary candidates for migration. Each is a presentational component with `@Input()` bindings and minimal logic.

| # | Component | Selector | Inputs | Reusability | Migration notes |
|---|-----------|----------|--------|-------------|-----------------|
| 1 | **ActivityCardComponent** | `conferentia-activity-card` | `activity: IActivity` | High — used in schedule views across both apps | Sanitizes poster URLs via `DomSanitizer`; template switches on activity type. Decouple the poster sanitization into a pipe. |
| 2 | **ParticipantCardComponent** | `conferentia-participant-card` | `participant: IParticipant`, `title: string` | High — nested inside activity cards and participant lists | Parses `curriculum` by splitting newlines (has a TODO #92 to use a paragraph parser). |
| 3 | **ScheduleComponent** | `conferentia-schedule` | `schedule: Schedule` | High — core schedule display for both apps | **Problem**: Hard-codes import of `APP_ROUTE_TREE` from `landing-unl-seminar-v1` (cross-app coupling). Needs parametrized routing. Also hard-codes navigable activity types — should accept as input. |
| 4 | **NavigationMenuComponent** | `conferentia-navigation-menu` | `event: IEvent`, `pages: ConferentiaRouteData[]` | High — app shell for every page | Uses `EnvironmentInjector.runInContext()` for conditional rendering. Clean and portable. |
| 5 | **FillableContentPageComponent** | `conferentia-fillable-content-page` | `content: TemplateRef<any>` | High — page wrapper used on every content page | **Problem**: Directly depends on Auth0 `AuthService`, `UserService`, `NavigationService`, and `ROUTE_TREE`. Should accept auth state as inputs or via a generic auth adapter. |
| 6 | **SubjectAreaComponent** | `conferentia-subject-area` | `subjectArea: ISubjectArea` | High — simple display component | Pure presentational; ready to migrate as-is. |

**Module-level issue**: `IonicComponentsModule` imports `PipesModule` via a relative path into `apps/landing-unl-seminar-v1`. This cross-project import must be refactored; the `AuthorsPipe` should live in the library itself.

### 1.2 Shared Pages Library (`libs/ionic-pages`)

| # | Component | Current state | Migration notes |
|---|-----------|--------------|-----------------|
| 1 | **UserProfilePage** | Only shared page. Uses `FormBuilder`, Auth0 `AuthService`, `UserService`, `AbstractService`. | Heavy service coupling. Abstract the auth dependency. Port reactive form logic as-is. |

### 1.3 App-level Pages (candidates to generalize)

These pages are currently app-specific but represent reusable conference concepts. In v2 they should be generalized and moved into a shared pages library.

| Page concept | Exists in `app/` | Exists in `landing-unl-seminar-v1/` | Migration strategy |
|-------------|:-:|:-:|-----|
| Home / Landing | Yes | Yes | Generalize into a configurable home page shell |
| Schedule | Yes | Yes (+ nested Activity detail) | Already uses shared `ScheduleComponent`; extract Activity detail page too |
| Participants / Invited Speakers | Yes (`participants`) | Yes (`invited-speakers`) | Same concept, different names. Unify. |
| Registration | Yes | Yes | Near-identical intent. Unify with config. |
| Sponsors | Yes | No | Keep as optional module |
| Committees | No | Yes | Keep as optional module |
| Abstract Submission | No | Yes | Core workflow — generalize and keep |
| Abstract Review | No | Yes | Admin feature — generalize and keep |
| Abstract Revision | No | Yes | Author workflow — generalize and keep |
| Admin Dashboard | No | Yes | Admin feature — generalize and keep |
| General Information | No | Yes | Simple CMS-driven page — make generic |
| Travel Information | No | Yes | Simple CMS-driven page — make generic |
| Contact | No | Yes | Simple CMS-driven page — make generic |
| User Profile | Shared (libs) | Shared (libs) | Already shared |

### 1.4 Custom Pipes

| Pipe | Location | Migration notes |
|------|----------|----------------|
| `AuthorsPipe` | `apps/landing-unl-seminar-v1/src/app/_providers/` | **Must move** into `libs/ionic-components` or a new `libs/pipes` library. Currently imported via relative path from the shared components module — a structural violation. |

### 1.5 Routing & Navigation

| Asset | Location | Migration notes |
|-------|----------|-----------------|
| `ConferentiaRoute` / `ConferentiaRouteData` | `libs/models` | Good — already framework-agnostic interfaces. Keep. |
| `ROUTE_TREE` | `libs/ionic-pages` | Only has `HOME` and `USER_PROFILE`. Extend or make configurable per-app. |
| `APP_ROUTE_TREE` | `apps/landing-unl-seminar-v1` | Event-specific. Should be generated from config in v2. |
| `appRoutes` | Each app has its own | Unify into a single route-builder that composes routes from enabled modules. |

---

## Part 2 — Architectural Modules to Support in v2

### 2.1 Domain Model Layer (`libs/models`) — KEEP & EXTEND

The models library is framework-agnostic (pure TypeScript interfaces) and well-structured. It defines the core domain:

| Model | Interface | Notes |
|-------|-----------|-------|
| Event | `IEvent` | Central entity. Has sponsors, subject areas, images. |
| Activity | `IActivity` | Sessions/talks. Linked to event, participants, abstracts, location. |
| Activity Type | `IActivityType` | Keynote, Presentation, Poster, etc. |
| Participant | `IParticipant` | Speakers/presenters. Has a hardcoded role union type (TODO #62). |
| Abstract | `Abstract` | Paper submissions. Has authors, keywords, subject area, file, status, review. |
| Author | `Author` | Abstract co-authors. |
| User | `User` | Authenticated users with roles (`admin`, `attendee`, `reviewer`). |
| Committee Area | `ICommitteeArea` | Organizational committees. |
| Committee Member | `ICommitteeMember` | People in committees. |
| Subject Area | `ISubjectArea` | Conference topics/tracks. |
| Event Sponsor | `IEventSponsor` | Sponsors with images. |
| Schedule | `Schedule` | `{ day: string; activities: IActivity[] }[]` |
| Attendance | `IAttendance` | Registration/check-in records. |
| Attendee | `IAttendee` | Event attendees. |
| Country | `Country` | Country list with codes. |
| Location | `ILocation` | Venue locations. |
| Image | `IImage` | Image metadata (alt + url). |
| Audit | `IAudit` | Base interface with `_id`, timestamps, etc. |
| Route | `ConferentiaRoute` / `ConferentiaRouteData` | Navigation metadata. |
| Environment Config | `IFrontendEnvironmentConfig` | App config (API URL, Auth0, event ID). |

**Migration action**: Keep all. Fix TODO items (hardcoded participant roles #62, `SafeResourceUrl` import from `@angular/platform-browser` in `abstract.interface.ts` is a framework leak — move to a DTO/viewmodel layer).

### 2.2 Frontend Service Layer (`libs/angular-services`) — REFACTOR

| Service | Purpose | Dependencies | Migration notes |
|---------|---------|-------------|-----------------|
| `HttpService` | Abstract base class for API calls; builds URL prefix from env config | `HttpClient`, `IFrontendEnvironmentConfig` | Good abstraction. Keep pattern but consider replacing with a modern HTTP client (e.g. native `fetch` or `ky`). |
| `EventService` | Fetches and caches current event via `BehaviorSubject` | `HttpService` | Core service. Clean. |
| `ActivityService` | Fetches activities and schedule | `HttpService` | Core service. |
| `AbstractService` | Abstract CRUD + file upload | `HttpService` | Core service. |
| `ParticipantService` | Fetches participants | `HttpService` | Core service. |
| `CommitteeService` | Fetches committee data | `HttpService` | Core service. |
| `UserService` | User CRUD, current user state via `BehaviorSubject` | `HttpService` | Core service. |
| `NavigationService` | Tracks current route via `BehaviorSubject` | Angular `Router` | Tightly coupled to Angular Router. Needs replacement if framework changes. |

**Guards**:

| Guard | Purpose | Migration notes |
|-------|---------|-----------------|
| `authenticationGuard` | Redirects unauthenticated users to home | Depends on Auth0 SDK. Abstract behind an auth adapter interface. |
| `finishedRegistrationGuard` | Redirects users who haven't completed registration | Combines Auth0 + UserService. Same — abstract auth. |
| `adminDashboardGuard` | Restricts admin pages to admin-role users | Currently imported via relative path from `libs/` (not exported in index). Fix export and abstract auth. |

### 2.3 Backend API Layer (`apps/api`) — REFACTOR

**Architecture**: NestJS REST API with a Sanity CMS connector (strategy pattern).

| Module | Controller | Service | Endpoints |
|--------|-----------|---------|-----------|
| Event | `EventController` | `EventService` | `GET /event/:id`, `GET /event` |
| Activity | `ActivityController` | `ActivityService` | Activity CRUD by event |
| Abstract | `AbstractController` | `AbstractService` | CRUD + file upload + review + revision |
| Participant | `ParticipantController` | `ParticipantService` | Participant CRUD by event |
| Committee | `CommitteeController` | `CommitteeService` | Committee data by event |
| Sponsor | `SponsorController` | `SponsorService` | Sponsor data by event |
| Subject Area | `SubjectAreaController` | `SubjectAreaService` | Subject area CRUD by event |
| User | `UserController` | `UserService` | User CRUD |

**Data connector pattern**:
- `ConnectorService` — abstract base class
- `SanityConnector` — concrete implementation using `@sanity/client`
- Injected via `{ provide: ConnectorService, useClass: SanityConnector }`

**Migration actions**:
- The connector abstraction is good but all services build raw GROQ query strings. Consider adding a query-builder or repository layer.
- `ConfigModule` + `.env` for configuration is solid — keep.
- `MulterModule` for file uploads — keep or replace with a cloud storage adapter.
- Add proper DTO validation (class-validator) for incoming payloads — currently no input validation.

### 2.4 CMS Layer (`apps/studio`) — REPLACE

Sanity Studio v2 with 12 schema types. Studio v2 is deprecated.

| Schema | Maps to model | Migration notes |
|--------|--------------|-----------------|
| `event` | `IEvent` | Core |
| `activity` | `IActivity` | Core |
| `activity-type` | `IActivityType` | Core |
| `abstract` | `Abstract` | Core |
| `author` | `Author` | Core |
| `participant` | `IParticipant` | Core |
| `committee-area` | `ICommitteeArea` | Core |
| `committee-member` | `ICommitteeMember` | Core |
| `event-sponsor` | `IEventSponsor` | Core |
| `subject-area` | `ISubjectArea` | Core |
| `role` | `Role` (in User) | Core |
| `user` | `User` | Core |

**Migration action**: Migrate to Sanity Studio v3 or evaluate alternatives (Strapi, Payload CMS, custom admin). The `@sanity/client` in the API also needs updating.

### 2.5 Authentication Module — ABSTRACT

Currently: Auth0 Angular SDK (`@auth0/auth0-angular` v1.x) used directly in:
- `FillableContentPageComponent`
- `authenticationGuard`
- `finishedRegistrationGuard`
- `adminDashboardGuard`
- `UserProfilePage`
- `AppComponent` (landing app)

**Migration action**: Create an `AuthAdapter` interface in `libs/` so the app is not locked to Auth0. Implement an Auth0 adapter and potentially others (Firebase Auth, Supabase, etc.).

### 2.6 Build & Tooling (`nx.json`, `workspace.json`) — UPGRADE

| Tool | Current | Target |
|------|---------|--------|
| Nx | 15.0.1 | Latest LTS (20.x+) |
| Angular | 14.2.7 | 17+ (standalone components, signals) |
| Ionic | 6.3.3 | 8.x |
| NestJS | 9.0.0 | 10.x+ |
| TypeScript | 4.8.4 | 5.x+ |
| Node | >=16.15 | >=20 LTS |
| Capacitor | 4.4.0 | 6.x |

### 2.7 Shared Backend Utilities (`libs/nest-modules`) — KEEP

| Utility | Purpose | Migration notes |
|---------|---------|-----------------|
| `SortingService` | Abstract class with ascending/descending sort functions for `Sortable` entities | Clean and portable. Keep. |
| `EntitySortingService` | Concrete sorting service used by API | Keep. |

---

## Part 3 — Structural Issues to Fix During Migration

### 3.1 Cross-project coupling (critical)

These must be resolved before or during migration:

1. **`IonicComponentsModule`** imports `PipesModule` from `apps/landing-unl-seminar-v1` via relative path — a library should never import from an app.
2. **`ScheduleComponent`** imports `APP_ROUTE_TREE` from `apps/landing-unl-seminar-v1` — couples a shared component to a specific app.
3. **`AbstractController`** imports `SubmittedAbstractRevisionPayload` via relative path from `libs/models` instead of using the `@conferentia/models` alias — inconsistent.
4. **`adminDashboardGuard`** is imported via relative path in `app.routes.ts` instead of being exported from `@conferentia/angular-services`.

### 3.2 Framework leaks in domain models

- `abstract.interface.ts` imports `SafeResourceUrl` from `@angular/platform-browser` — a domain model should be framework-agnostic. Move the sanitized URL to a view-model or component-level type.

### 3.3 Existing TODOs from the codebase

| TODO | Reference | Priority for v2 |
|------|-----------|-----------------|
| SaaS-oriented event configuration | #40 | High — currently event is loaded from environment file |
| Remove route/title redundancy | #43 | Medium |
| Separate infrastructure models into their own library | #47 | Medium |
| Replace hardcoded participant roles | #62 | Medium |
| Implement paragraph parser for curriculum | #92 | Low |

---

## Part 4 — Recommended Migration Phases

### Phase 1: Fix structural violations
- Move `AuthorsPipe` into `libs/ionic-components` or new `libs/pipes`
- Remove all cross-app relative imports from libraries
- Export `adminDashboardGuard` from `@conferentia/angular-services`
- Fix the `abstract.interface.ts` framework leak

### Phase 2: Introduce abstraction layers
- Create an `AuthAdapter` interface to decouple from Auth0
- Parametrize `ScheduleComponent` (accept route tree and navigable types as inputs)
- Parametrize `FillableContentPageComponent` (accept auth state as inputs)
- Add a repository/query-builder layer in the API

### Phase 3: Upgrade framework versions
- Nx 15 -> latest LTS
- Angular 14 -> 17+ (adopt standalone components, signals)
- Ionic 6 -> 8
- NestJS 9 -> 10+
- Sanity Studio v2 -> v3
- Capacitor 4 -> 6

### Phase 4: Generalize app-specific pages
- Extract common page patterns (CMS content page, list page, form page) into `libs/ionic-pages`
- Build a route-composition system from enabled modules
- Implement SaaS-oriented multi-event configuration (TODO #40)

### Phase 5: Testing & validation
- Add missing unit tests for all shared components and services
- Add E2E tests for critical workflows (registration, abstract submission, schedule viewing)
- Validate Capacitor mobile builds on iOS and Android
