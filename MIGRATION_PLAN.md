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
