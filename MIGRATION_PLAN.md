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
| `AuthorsPipe` | `libs/ionic-components/src/lib/pipes/` _(moved from app)_ | **Done** — moved into `libs/ionic-components`. Transforms `Author[]` into a comma-separated name string. |

### 1.5 Ionic Framework Components (to replace in v2)

The following 33 Ionic-provided components are used across the codebase and must be replaced if migrating away from Ionic. They are grouped by function.

#### 1.5.1 Layout & Structure (5 components)

| Component | Usage count | Where used | Replacement notes |
|-----------|:-----------:|------------|-------------------|
| `ion-app` | 2 | Root shell in both apps | Replace with a plain `<div>` or framework root element. |
| `ion-split-pane` | 2 | Root shell (`contentId="main-content"`, `type="overlay"`) | Replace with a CSS sidebar layout (flexbox/grid with a responsive breakpoint). |
| `ion-grid` | 11 | Shared components, pages (schedule, activity-card, participant-card, home, registration, admin-dashboard, etc.) | Replace with CSS Grid or a utility framework (Tailwind `grid`). Responsive breakpoints (`size-md`, `size-lg`, `size-xl`) must be preserved. |
| `ion-row` | 12+ | Same locations as `ion-grid` | Replace with `display: flex` row or CSS Grid row. |
| `ion-col` | 15+ | Same locations — uses responsive sizing (`size="12"`, `size-md="6"`, `size-lg="8"`, `size-xl="4"`, `offset="1"`) | Replace with CSS Grid columns or flex items with media queries. Map Ionic's 12-column system to the new grid. |

#### 1.5.2 Navigation & App Shell (9 components)

| Component | Usage count | Where used | Replacement notes |
|-----------|:-----------:|------------|-------------------|
| `ion-menu` | 2 | `app.component.html`, `navigation-menu.component.html` (`type="overlay"`, `contentId="main-content"`) | Replace with a custom sidebar/drawer component. Needs open/close logic and overlay behavior. |
| `ion-menu-button` | 1 | `fillable-content-page` (`slot="start"`) | Replace with a hamburger icon button that toggles the menu. |
| `ion-menu-toggle` | 2 | `app.component.html`, `navigation-menu` (`auto-hide="false"`) | Replace with a click handler that closes the menu on item selection. |
| `ion-router-outlet` | 2 | Root app shells (`id="main-content"`) | Replace with Angular `<router-outlet>` (or framework equivalent). |
| `ion-header` | 1 | `fillable-content-page` | Replace with a `<header>` element + sticky CSS. |
| `ion-toolbar` | 1 | `fillable-content-page` | Replace with a flex container inside `<header>`. |
| `ion-title` | 2 | `fillable-content-page`, `schedule` | Replace with `<h1>`/`<h2>` or a styled span. |
| `ion-content` | 3 | `app.component`, `fillable-content-page`, `navigation-menu` | Replace with a scrollable `<main>` element. Ionic's scroll virtualization is not used here. |
| `ion-buttons` | 1 | `fillable-content-page` (`slot="start"`) | Replace with a flex container for button groups. |

#### 1.5.3 Data Display (12 components)

| Component | Usage count | Where used | Replacement notes |
|-----------|:-----------:|------------|-------------------|
| `ion-card` | 25+ | Every content page, shared components | Replace with a styled card `<div>` (border, shadow, border-radius). Most heavily used component. |
| `ion-card-header` | 20+ | Inside all cards | Replace with a card header `<div>` with padding/background. |
| `ion-card-title` | 15+ | Inside all card headers | Replace with `<h3>` or similar heading. |
| `ion-card-subtitle` | 2 | `activity-card`, `participant-card` | Replace with a `<p>` or `<small>` element. |
| `ion-card-content` | 25+ | Inside all cards | Replace with a card body `<div>` with padding. |
| `ion-text` | 15+ | General-information, home, travel, activity-card, user-profile, admin-dashboard | Replace with `<span>` + CSS class for color (`color="primary"`). |
| `ion-note` | 3 | `fillable-content-page` (`class="ion-hide-md-down"`), `navigation-menu` | Replace with a `<small>` or `<span class="note">`. Note the responsive hide class. |
| `ion-badge` | 2 | `admin-dashboard`, `user-profile` (dynamic `[color]="colorStatusMap[...]"`) | Replace with a `<span class="badge">` with color variants via CSS classes. |
| `ion-avatar` | 2 | `participant-card`, `subject-area` | Replace with a rounded `<img>` wrapper (`border-radius: 50%`). |
| `ion-img` | 4 | `app.component`, `home` (sponsors), `general-information`, `navigation-menu` (logo, featured image) | Replace with native `<img>` with lazy loading (`loading="lazy"`). Ionic's `ion-img` adds lazy loading by default. |
| `ion-thumbnail` | 1 | `schedule` (`slot="start"`, conditional `*ngIf`) | Replace with a fixed-size `<img>` wrapper. |
| `ion-icon` | 20+ | Menu items, buttons, actions throughout | Replace with an icon library (Lucide, Heroicons, Material Icons, or keep Ionicons standalone). Uses `name`, `slot`, `size`, and iOS/MD variants (`[ios]`, `[md]`). |

#### 1.5.4 List & Item (4 components)

| Component | Usage count | Where used | Replacement notes |
|-----------|:-----------:|------------|-------------------|
| `ion-list` | 5 | `app.component`, `navigation-menu`, `schedule`, `fillable-content-page`, `user-profile` | Replace with `<ul>` or `<div role="list">`. |
| `ion-list-header` | 4 | `app.component`, `navigation-menu`, `schedule`, `submit-abstract-revision` | Replace with a styled heading above the list. |
| `ion-item` | 25+ | Menu links, form fields, schedule rows, abstract lists | **Most complex to replace.** Ionic `ion-item` provides: label/input layout, ripple effect, `routerLink` integration, `detail` arrow, `lines` dividers, slot-based content placement. Replace with a custom list-item component or styled `<li>` / `<div>`. |
| `ion-label` | 28+ | Inside every `ion-item` for form fields, list items, display text | Replace with `<label>` for forms or `<span>` for display. The `position="stacked"` variant needs floating-label CSS. |

#### 1.5.5 Form Controls (5 components)

| Component | Usage count | Where used | Replacement notes |
|-----------|:-----------:|------------|-------------------|
| `ion-input` | 5 | `user-profile` (email, name fields), `submit-abstract-revision` (file upload) | Replace with native `<input>` + styling. Supports `type="text"`, `type="email"`, `type="file"`, `formControlName`, `[disabled]`. |
| `ion-select` | 3 | `user-profile` (courtesy title, country), `abstract-review` (status) | Replace with native `<select>` or a custom dropdown. Used with `formControlName` and `placeholder`. |
| `ion-select-option` | 3 | Inside `ion-select` components | Replace with native `<option>` elements. |
| `ion-textarea` | 1 | `abstract-review` (`formControlName="review"`, `rows="5"`) | Replace with native `<textarea>`. |
| `ion-toggle` | 1 | `user-profile` (`formControlName="wantsToEvaluatePapers"`) | Replace with a custom toggle/switch component or a styled `<input type="checkbox">`. |

#### 1.5.6 Actions (1 component)

| Component | Usage count | Where used | Replacement notes |
|-----------|:-----------:|------------|-------------------|
| `ion-button` | 20+ | Everywhere — login, logout, submit, download, navigation, abstract actions | Replace with `<button>` + CSS classes. Uses: `color="primary"/"danger"`, `expand="block"`, `[disabled]`, `[href]`+`[target]` (acts as `<a>`), `slot`, `[routerLink]`+`[queryParams]`. The `[href]` variant needs a separate `<a>` element. |

#### 1.5.7 Programmatic Overlays (1 controller)

| Controller | Usage count | Where used | Replacement notes |
|------------|:-----------:|------------|-------------------|
| `AlertController` | 4 | `user-profile`, `abstract-review`, `abstract-submission`, `submit-abstract-revision` — used via `inject(AlertController).create({ header, message, buttons })` | Replace with a custom modal/toast service or a library (e.g. SweetAlert2, Radix Dialog, headless UI). All 4 usages follow the same pattern: success/error feedback after form submission. |

#### 1.5.8 Ionic CSS Utilities used in templates

These Ionic utility classes are used directly in templates and need CSS replacements:

| Utility class | Purpose | Occurrences |
|---------------|---------|:-----------:|
| `ion-padding` | Padding on all sides | 10+ |
| `ion-padding-horizontal` | Horizontal padding | 3 |
| `ion-padding-top` | Top padding | 1 |
| `ion-no-padding` | Remove padding | 3 |
| `ion-margin-bottom` | Bottom margin | 2 |
| `ion-margin-top` | Top margin | 1 |
| `ion-text-center` | Center text | 5 |
| `ion-text-justify` | Justify text | 3 |
| `ion-text-right` | Right-align text | 1 |
| `ion-hide-md-down` | Hide on medium and smaller screens | 1 |
| `ion-flex-container` | Flex container | 1 |

### 1.6 Routing & Navigation

| Asset | Location | Migration notes |
|-------|----------|-----------------|
| `ConferentiaRoute` / `ConferentiaRouteData` | `libs/models` | Good — already framework-agnostic interfaces. Keep. |
| `ROUTE_TREE` | `libs/ionic-pages` | Only has `HOME` and `USER_PROFILE`. Extend or make configurable per-app. |
| `APP_ROUTE_TREE` | `apps/landing-unl-seminar-v1` | Event-specific. Now injectable via `APP_ROUTE_TREE_TOKEN`. |
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

### 3.1 Cross-project coupling — RESOLVED

All 7 cross-boundary relative imports have been eliminated:

1. ~~`IonicComponentsModule` imports `PipesModule` from app~~ — **Fixed**: `AuthorsPipe` + `PipesModule` moved to `libs/ionic-components/src/lib/pipes/`.
2. ~~`ScheduleComponent` imports `APP_ROUTE_TREE` from app~~ — **Fixed**: Removed import; `navigableActivityTypes` is now an `@Input()`.
3. ~~`AbstractController` uses relative path to models~~ — **Fixed**: Uses `@conferentia/models` alias.
4. ~~`adminDashboardGuard` imported via relative path~~ — **Fixed**: Exported from `@conferentia/angular-services` barrel.
5. ~~`AbstractService` (API) uses relative path to models~~ — **Fixed**: Uses `@conferentia/models` alias.
6. ~~`AbstractService` (frontend) uses relative path to models~~ — **Fixed**: Uses `@conferentia/models` alias.
7. ~~`UserProfilePage` imports `colorStatusMap` and `APP_ROUTE_TREE` from app~~ — **Fixed**: `colorStatusMap` moved to `@conferentia/models`; routes injected via `APP_ROUTE_TREE_TOKEN`.

### 3.2 Framework leaks in domain models — RESOLVED

- ~~`abstract.interface.ts` imports `SafeResourceUrl` from `@angular/platform-browser`~~ — **Fixed**: `posterUrl` is now `string`; `SafeResourceUrl` moved to component-level `SanitizedActivity` view-model in `ActivityCardComponent`.

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

---

## Part 5 — Legacy v1 Codebase Analysis (`conferentia-v1`)

> Source: [github.com/rolivencia/conferentia-v1](https://github.com/rolivencia/conferentia-v1)
> This is the original production version of Conferentia, built for the ENIEF 2019 conference.

### 5.1 v1 Tech Stack

| Layer | Technology | Version | v2 Equivalent |
|-------|-----------|---------|---------------|
| Frontend framework | Angular | 5.0.2 | Angular 14 |
| UI toolkit | Ionic | 3.9.9 | Ionic 6 |
| Native bridge | Cordova | — | Capacitor 4 |
| Backend API | PHP (REST) | — | NestJS 9 |
| Database | MySQL (+ Airtable) | — | Sanity CMS |
| Auth | JWT (custom) | — | Auth0 |
| Push notifications | OneSignal (`@ionic-native/onesignal` 4.5.2) | — | Not implemented in v2 |
| Barcode scanner | `@ionic-native/barcode-scanner` 4.5.2 | — | Not implemented in v2 |
| Geolocation | `@ionic-native/geolocation` 4.3.2 | — | Not implemented in v2 |
| i18n | `@ngx-translate/core` 9.x | — | Not implemented in v2 |
| QR codes | `ng-qrcode` 1.x | — | Not implemented in v2 |
| Date handling | `moment.js` 2.24 | — | Not used in v2 |
| Local storage | `@ionic/storage` 2.1.3 | — | Not implemented in v2 |
| HTTP (legacy) | `@angular/http` (deprecated) | 5.0.2 | `HttpClient` |
| RxJS | 5.5.2 | — | RxJS 7.x |

### 5.2 v1 Frontend Components — Shared (`src/components/`)

These 7 shared components should be evaluated for migration into the new platform:

| # | Component | Purpose | v2 Status | Migration recommendation |
|---|-----------|---------|-----------|--------------------------|
| 1 | **CardActividadComponent** | Activity card with favorites toggle (star icon), date/time, type badge, location | Partially covered by `ActivityCardComponent` | **Merge** — v1 has favorites support that v2 lacks. Port the favorites toggle. |
| 2 | **CardDisertanteComponent** | Speaker card with avatar, name, institution | Covered by `ParticipantCardComponent` | **Skip** — v2 version is more complete. |
| 3 | **CardDiaOcupadoComponent** | Day grouping header card for schedule view (shows day name + date) | Not in v2 | **Migrate** — useful schedule UI element for grouping activities by day. |
| 4 | **HeaderBarComponent** | Page header with profile button and navigation | Partially covered by `FillableContentPageComponent` | **Skip** — v2 has a more complete app shell. |
| 5 | **ButtonBarComponent** | Social media / action button bar (WhatsApp, competitions link, external URLs) | Not in v2 | **Migrate as optional module** — useful for events that want social links. |
| 6 | **SponsorComponent** | Sponsor carousel/slider with auto-rotation | Not in v2 (v2 has a sponsors page but no carousel) | **Migrate** — carousel display is a common sponsor showcase pattern. |
| 7 | **AssistanceCounterComponent** | Visual attendance progress counter | Not in v2 | **Migrate** — needed for QR attendance workflow. |

### 5.3 v1 Frontend Pages — Full Inventory (`src/pages/`)

The v1 app has 21 page components. This table maps each to its v2 status and migration priority.

| # | Page | Purpose | v2 equivalent | Priority | Migration notes |
|---|------|---------|---------------|----------|-----------------|
| 1 | **InicioPage** | Home/landing with logo, sponsors carousel, button bar | `home` page (both apps) | — | Already exists in v2. Port sponsor carousel. |
| 2 | **MiCronogramaPage** | Full schedule with multi-dimensional filtering (day, type, area, venue) + favorites system | `schedule` (shared component) | **High** | v2 schedule is simpler. **Port filtering system and favorites.** ~450 lines of rich logic. |
| 3 | **ActividadPage** | Single activity detail view | `activity-detail` (landing app) | — | Already exists in v2. |
| 4 | **AsistenciaPage** | QR-based attendance with barcode scanner (different UIs for organizers vs attendees) | Not in v2 | **High** | **Migrate** — core event workflow. Needs Capacitor barcode plugin. |
| 5 | **ProximaActividadPage** | "Next activity" — shows upcoming activities with countdown timer | Not in v2 | **High** | **Migrate** — valuable UX feature for live events. Uses `moment.js` for time calculations. |
| 6 | **DisertantesPage** | Speaker list | `participants` / `invited-speakers` | — | Already exists in v2. |
| 7 | **DisertantePage** | Speaker detail with their activities and moderated sessions | `participant-detail` variant | — | Partially in v2. Port "moderated sessions" view. |
| 8 | **ChairsPage** | Organizing committee list | `committees` (landing app) | — | Already exists in v2. |
| 9 | **ChairPage** | Committee member detail | Part of `committees` | — | Already in v2. |
| 10 | **AreasTematicasPage** | Subject/thematic areas list | Not a standalone page in v2 | **Medium** | **Migrate** — useful for larger conferences. v2 uses subject areas only in abstract submission. |
| 11 | **AreaTematicaPage** | Single thematic area detail | Not in v2 | **Medium** | **Migrate** — paired with AreasTematicasPage. |
| 12 | **LocalizacionPage** | Location hub with links to maps, transit apps | Not in v2 | **Medium** | **Migrate** — valuable for in-person events. Platform-specific deep links (Google Maps, Apple Maps, transit). |
| 13 | **MapaCiudadPage** | Interactive Google Maps with markers, search, category filtering | Not in v2 | **Medium** | **Migrate** — rich feature (~250 lines). Needs Google Maps API integration. |
| 14 | **MapaInstalacionesPage** | Facility floor plans via iframe (DomSanitizer) | Not in v2 | **Low** | **Migrate as optional** — simple iframe page. |
| 15 | **InicioSesionPage** | Login page with username/password | Handled by Auth0 redirect in v2 | — | **Skip** — v2 uses Auth0 hosted login. |
| 16 | **PerfilPage** | User profile with QR code display and logout | `user-profile` (shared) | — | Already in v2. **Port QR code display.** |
| 17 | **SponsorsPage** | Sponsor list with optional detail view | `sponsors` (app) | — | Already in v2. |
| 18 | **SettingsPage** | Language selection | Not in v2 | **Medium** | **Migrate** — needed if i18n is implemented. |
| 19 | **CompetitionsPage** | Competition standings/leaderboard | Not in v2 | **Low** | **Migrate as optional module** — niche feature for gamified events. |
| 20 | **AboutPage** | Developer/app info | Not in v2 | **Low** | **Migrate as optional** — standard mobile app page. |
| 21 | **TabsPage** | Tab bar controller with dynamic visibility per page | Root navigation in v2 | — | v2 uses side menu instead. Consider offering both layouts. |

### 5.4 v1 Services — Full Inventory (`src/shared/`)

| # | Service | Purpose | v2 equivalent | Migration recommendation |
|---|---------|---------|---------------|--------------------------|
| 1 | **GlobalService** | Static singleton with feature flags, page access config, JWT token, event name | `IFrontendEnvironmentConfig` (partial) | **Replace** with a dynamic feature-flag system and runtime configuration service. See §6.3. |
| 2 | **ActividadService** | Activity CRUD, 22 activity types, filtering, sorting, image assignment | `ActivityService` | **Covered** — v2 version is cleaner. Port the 22 activity-type definitions. |
| 3 | **DisertanteService** | Speaker fetching with random avatar generation | `ParticipantService` | **Covered** — v2 version is cleaner. |
| 4 | **AsistenciaService** | Attendance registration (entry/exit) via legacy `@angular/http` | Not in v2 | **Migrate** — core workflow for live events. Rewrite with `HttpClient`. |
| 5 | **DataBaseAccess** | HTTP wrapper for PHP/MySQL API calls | `HttpService` (abstract base) | **Skip** — replaced by NestJS + Sanity in v2. |
| 6 | **LoginService** | Credential management, activity assignment to users | Auth0 in v2 | **Skip** — replaced by Auth0. Security issues noted (plaintext password storage). |
| 7 | **UsuarioService** | User CRUD with static logged-in user state | `UserService` | **Covered** — v2 version uses BehaviorSubject properly. |
| 8 | **AreaTematicaService** | 23 hardcoded thematic areas | `SubjectAreaService` (via Sanity) | **Skip** — v2 fetches from CMS. |
| 9 | **ChairService** | 25+ hardcoded committee members | `CommitteeService` (via Sanity) | **Skip** — v2 fetches from CMS. |
| 10 | **LugarService** | Venue/room definitions (hardcoded) | Not standalone in v2 (part of Activity model) | **Skip** — locations should be CMS-managed in v2. |
| 11 | **MarcadorService** | Hundreds of location markers (restaurants, hotels, landmarks in Santa Fe) | Not in v2 | **Migrate pattern** — implement a map marker service backed by a database, not hardcoded data. |
| 12 | **SponsorService** | Sponsor fetching with timestamp-based cache invalidation | `SponsorService` (via Sanity) | **Covered** — but port the **caching pattern** (timestamp comparison for local vs remote). |
| 13 | **CompetitionService** | Competition/standings management | Not in v2 | **Migrate as optional** — backed by API. |
| 14 | **NotificacionesService** | OneSignal push notifications | Not in v2 | **Migrate** — push notifications are critical for live events. See §6.6. |
| 15 | **RouterService** | Static navigation methods for all pages (~200 lines) | `NavigationService` | **Skip** — v2 uses Angular Router. v1 used imperative `NavController.push()`. |
| 16 | **OrganizadorService** | Organizer contact info with phone load balancing | Not in v2 | **Migrate as optional** — useful for "Contact" pages. |
| 17 | **AlertasService** | Alert/confirmation dialog helpers | `AlertController` (Ionic) | **Covered** — standardize as a notification service in v2. |
| 18 | **LayoutService** | Empty placeholder (TODO) | — | **Skip** — never implemented. |
| 19 | **SponsorService (v2)** | (duplicate entry — same as #12) | — | — |
| 20 | **MarcadorObject** | Marker class with getters/setters | — | **Skip** — use a plain interface. |

### 5.5 v1 Domain Models (`src/shared/dtoClasses.ts`)

All ~20 DTOs defined in a single file. This table maps them to v2 equivalents:

| v1 DTO | Fields | v2 Equivalent | Gap |
|--------|--------|---------------|-----|
| `Actividad` | id, nombre, descripcion, moderadores, disertantes, lugar, fecha, areaTematica, tipoActividad, etc. | `IActivity` | v1 has `lugar` (venue/room) as a first-class field |
| `ActividadRaw` | Same but with IDs instead of nested objects | — | Internal API DTO; v2 uses Sanity references |
| `ActividadList` / `ActividadLink` | Simplified activity references | — | Not needed in v2 |
| `Disertante` | idDisertante, nombreCompleto, gender, institucion, imgString, curriculum | `IParticipant` | v1 has `gender` field (used for avatar generation) |
| `Chair` | idChair, nombreCompleto, cargo, email, etc. | `ICommitteeMember` | Equivalent |
| `AreaTematica` | idAreaTematica, nombre, descripcion, imgString | `ISubjectArea` | Equivalent |
| `TipoActividad` | idTipo, nombre, color, backgroundColor | `IActivityType` | v1 has **22 hardcoded types with colors** — v2 should load from CMS |
| `Lugar` | idLugar, nombre, marcador | `ILocation` | v1 ties venue to map markers |
| `Usuario` | id, registration_id, names, dni, username, password, is_organizer, assigned_activities, team | `User` | v1 has `is_organizer` flag, `assigned_activities`, `team` — v2 has roles |
| `Team` | id, name, members | — | **New in v1** — used for competitions |
| `Marcador` | lat, lng, name, type, color, icon | — | **New in v1** — map markers |
| `TipoMarcador` | id, name, icon, color | — | **New in v1** — marker categories |
| `Organizador` | name, phones, email, social | — | **New in v1** — organizer contact |
| `Sponsor` | id, name, image, url | `IEventSponsor` | Equivalent |
| `Asistencia` | user, activity, timestamp, type | `IAttendance` | v2 has the model but no workflow |
| `Favorito` | IdUsuario, IdActividad | — | **New in v1** — personal schedule favorites |
| `Developer` | imgSource, fullName, institution, email, resume | — | App meta (not needed) |
| `MapaInstalaciones` | nombre, url | — | Facility map links |
| `ButtonBarEnabledElements` | Booleans for each button | — | Feature flags for UI |
| `ImplementedModuleStatus` | Module on/off flags | — | Feature flags for pages |
| `NotificationParameters` | OneSignal config | — | Push notification config |
| `PageInterface` | title, icon, component, tabEnabled | `ConferentiaRouteData` | v2 equivalent exists |

### 5.6 v1 Features Missing in v2 — Carry Forward

These features existed in v1 but are **not present in the current v2 codebase**. They represent functional regressions that should be restored in the new platform:

| # | Feature | v1 Implementation | Priority | New platform recommendation |
|---|---------|-------------------|----------|----------------------------|
| 1 | **QR-based attendance tracking** | `AsistenciaPage` + `AsistenciaService` + BarcodeScanner. Organizers scan attendee QR codes; attendees show their QR. Time-frame validation. | **Critical** | Implement with Capacitor barcode plugin. Add backend attendance API. |
| 2 | **Personal schedule / Favorites** | `MiCronogramaPage` stores favorited activities in `@ionic/storage`. Star toggle on activity cards. | **Critical** | Implement with local storage + optional server sync. Add `Favorito` model. |
| 3 | **Advanced schedule filtering** | Multi-dimensional: day, activity type, thematic area, venue/room. ActionSheet-based filter UI. | **High** | Port filtering logic into the shared ScheduleComponent. |
| 4 | **"Next activity" view** | `ProximaActividadPage` with countdown timers using `moment.js`. | **High** | Implement with `date-fns` or native `Intl.RelativeTimeFormat`. |
| 5 | **Push notifications** | OneSignal integration (`NotificacionesService`). | **High** | Implement with Firebase Cloud Messaging or OneSignal. Abstract behind a notification adapter. |
| 6 | **Internationalization (i18n)** | `@ngx-translate` with JSON files (`assets/i18n/`). `SettingsPage` for language selection. | **High** | Use Angular's built-in i18n or `@ngx-translate` (maintained for Angular 17+). |
| 7 | **Interactive maps** | Google Maps integration with marker management, search, filtering by place type. | **Medium** | Use `@angular/google-maps` or Mapbox. Abstract behind a map adapter. |
| 8 | **Facility floor plans** | Iframe-based floor plan viewer with multiple map selection. | **Medium** | Implement as a configurable image/PDF viewer component. |
| 9 | **Offline data caching** | `@ionic/storage` with timestamp-based cache invalidation for activities, speakers, sponsors. | **Medium** | Implement a service worker caching strategy or use `@ionic/storage` with Capacitor. |
| 10 | **Competitions / Gamification** | `CompetitionsPage` + `CompetitionService` with team leaderboards. | **Low** | Implement as an optional module with dedicated API endpoints. |
| 11 | **Platform-specific navigation** | Deep links to Google Maps, Apple Maps, Uber, transit apps based on platform. | **Low** | Use Capacitor App Launcher plugin. |
| 12 | **Dynamic page visibility** | `GlobalService.pageAccessEnabled` controls which pages appear in tabs/menu per event. | **High** | Implement as part of the SaaS configuration system. See §6.3. |

---

## Part 6 — Architectural Concerns for the New SaaS Platform

Based on analysis of both v1 (conferentia-v1) and v2 (conferentia), the following architectural concerns must be addressed when building the new modern Angular-based SaaS platform.

### 6.1 Multi-Tenancy & Event Configuration

**Current state**: Both v1 and v2 are single-event apps. v1 hardcodes "ENIEF 2019" in `GlobalService`. v2 loads a single event ID from the environment config file.

**Requirements**:
- Support multiple concurrent events under a single deployment
- Each event should have its own branding, feature set, and URL (subdomain or path-based routing)
- Event configuration should be runtime-loaded, not build-time (no separate builds per event)
- Admin portal to manage events, configure features, and customize branding

**Recommended approach**:
- Tenant-aware routing (`{eventSlug}.conferentia.app` or `conferentia.app/{eventSlug}`)
- Runtime configuration service that fetches event config on app bootstrap
- Feature-flag system (see §6.3) to enable/disable modules per event
- Shared database with tenant isolation (row-level or schema-level)

### 6.2 Backend Architecture

**Current state**: v1 uses PHP + MySQL with raw SQL queries and no input validation. v2 uses NestJS + Sanity CMS with GROQ queries inlined in services.

**Requirements**:
- Replace Sanity CMS with a self-hosted database for full control over data and pricing
- Proper input validation and error handling
- RESTful or GraphQL API with consistent patterns
- File upload management (abstract PDFs, images)
- Authentication and authorization middleware

**Recommended approach**:
- Keep NestJS as the backend framework
- Replace Sanity with PostgreSQL + Prisma (or TypeORM) for relational data
- Add `class-validator` and `class-transformer` for DTO validation
- Implement a repository pattern to decouple business logic from data access
- Use cloud storage (S3, Cloudinary, or similar) for file uploads via an adapter
- Implement proper RBAC (Role-Based Access Control) middleware

### 6.3 Feature Flag & Module System

**Current state**: v1 has a primitive feature-flag system in `GlobalService` (`pageAccessEnabled`, `ButtonBarEnabledElements`, `ImplementedModuleStatus`). v2 has no feature-flag system.

**Requirements**:
- Enable/disable entire page modules per event (attendance, competitions, maps, abstracts, etc.)
- Control UI elements dynamically (button bars, menu items, tab visibility)
- Support A/B testing and gradual rollouts

**Recommended approach**:
- Define a `ModuleRegistry` where each feature module registers itself with metadata (name, routes, menu items, required role)
- Store enabled modules per event in the database
- Frontend loads the module manifest at bootstrap and conditionally renders routes, menu items, and components
- Consider a lazy-loading strategy: only load JS bundles for enabled modules

### 6.4 Authentication & Authorization

**Current state**: v1 uses custom JWT with plaintext password storage (security vulnerability). v2 uses Auth0 with `@auth0/auth0-angular`.

**Requirements**:
- Support multiple auth providers (Auth0, Firebase, Supabase, custom OAuth)
- Role-based access control (admin, organizer, reviewer, attendee, speaker)
- Per-event role assignments (a user can be admin for one event and attendee for another)

**Recommended approach**:
- Keep the `AuthAdapter` interface created in Phase 2 and extend it
- Add role/permission resolution per event context
- Backend: JWT validation middleware with event-scoped claims
- Consider OAuth 2.0 / OpenID Connect as the standard protocol

### 6.5 Data Caching & Offline Support

**Current state**: v1 has timestamp-based caching via `@ionic/storage` (compares local data timestamp against server). v2 has no caching strategy.

**Requirements**:
- Conference apps are used in venues with poor connectivity
- Schedule, speaker, and map data should work offline
- Data should sync when connectivity is restored

**Recommended approach**:
- Service Worker with `@angular/service-worker` for asset caching
- IndexedDB (via `@ionic/storage` or `idb`) for data caching
- Implement a `SyncService` with last-modified timestamp comparison (port v1 pattern)
- Cache-first strategy for read-heavy data (schedule, speakers, sponsors)
- Network-first strategy for write operations (attendance, abstract submission)

### 6.6 Push Notifications

**Current state**: v1 uses OneSignal via `@ionic-native/onesignal`. v2 has no push notification support.

**Requirements**:
- Notify attendees of schedule changes, new announcements, upcoming sessions
- Per-event notification channels
- Support both web push (PWA) and native push (iOS/Android via Capacitor)

**Recommended approach**:
- Abstract behind a `NotificationAdapter` interface
- Implement Firebase Cloud Messaging (FCM) adapter (free, widely supported)
- Backend: notification scheduling service with event-scoped topics
- Frontend: Capacitor Push Notifications plugin + Web Push API fallback

### 6.7 Internationalization (i18n)

**Current state**: v1 uses `@ngx-translate` with JSON translation files and a language settings page. v2 has no i18n support.

**Requirements**:
- Support at least English and Spanish (the two languages used in prior events)
- Per-event default language
- RTL support for future expansion

**Recommended approach**:
- Use `@ngx-translate/core` (well-maintained, works with Angular 17+) or Angular built-in i18n
- Translation keys organized by module (shared, schedule, abstracts, etc.)
- Language selector in settings with `@ionic/storage` persistence
- Backend: Accept-Language header support for API responses

### 6.8 Navigation Architecture

**Current state**: v1 uses Ionic 3 imperative navigation (`NavController.push/pop`). v2 uses Angular Router with Ionic router-outlet.

**Requirements**:
- Support both tab-based and side-menu navigation layouts (v1 used tabs, v2 uses side menu)
- Dynamic navigation based on enabled modules and user role
- Deep linking support for web sharing

**Recommended approach**:
- Angular Router with lazy-loaded feature modules
- Navigation layout as a configurable option per event (tabs, side menu, or both)
- Route guards composed from the module registry + auth adapter
- Dynamic route registration based on enabled modules

### 6.9 Activity Type System

**Current state**: v1 defines 22 activity types with hardcoded colors/names in `ActividadService`. v2 stores activity types in Sanity CMS with no fixed set.

**Activity types from v1**:
1. Conferencia Plenaria (Keynote)
2. Presentación de Trabajo (Paper Presentation)
3. Presentación de Poster (Poster Presentation)
4. Sesión de Posters (Poster Session)
5. Sesión de Trabajos (Paper Session)
6. Inauguración (Opening Ceremony)
7. Ceremonia de Clausura (Closing Ceremony)
8. Almuerzo (Lunch)
9. Pausa Café (Coffee Break)
10. Asamblea (Assembly)
11. Recepción (Reception)
12. Mesa Redonda (Round Table)
13. Mini Symposium
14. Evento Cultural (Cultural Event)
15. Clase Especial (Special Class)
16. Tutoriales (Tutorials)
17. Competencias (Competitions)
18. Reunión de Comisión Directiva (Board Meeting)
19. Tour
20. Cocktail
21. Foto Grupal (Group Photo)
22. Cena (Dinner)

**Recommended approach**:
- Store activity types in the database with configurable colors, icons, and behavior flags
- Flag properties: `isNavigable` (can be tapped to see details), `isSchedulable`, `isAttendanceTracked`, `showInPublicSchedule`
- Seed common types but allow per-event customization

### 6.10 Migration from Hardcoded Data

**Current state**: v1 has enormous amounts of hardcoded data — 23 thematic areas, 25+ committee members, hundreds of map markers, venue/room definitions, all embedded directly in service files.

**Recommendation**:
- All conference-specific data must live in the database, managed via the admin portal
- Provide seed data scripts and CSV/JSON import tools for event setup
- Map markers should be managed per-event via an admin interface, not hardcoded

### 6.11 Deployment Model

**Recommended approach for a SaaS platform**:
- **Web**: Angular SSR (or CSR with CDN) deployed as a single instance serving all events
- **Mobile**: Single Capacitor app with event selection / deep linking
- **Backend**: Containerized NestJS API (Docker) with horizontal scaling
- **Database**: Managed PostgreSQL (e.g., Supabase, Neon, or AWS RDS)
- **File storage**: S3-compatible object storage
- **CI/CD**: GitHub Actions with Nx affected builds for monorepo efficiency
