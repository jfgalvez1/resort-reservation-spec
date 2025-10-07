# Tasks: Modern Resort Reservation System

**Input**: Design documents from `/specs/001-i-m-building/`
**Prerequisites**: plan.md (required), research.md, data-model.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: component tests, integration tests
   → Core: types, mock data, components
   → Integration: pages, routing, authentication
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All entities have types?
   → All components have tests?
   → All pages implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Static Web App**: `src/`, `public/`, `tests/` at repository root
- Next.js 14+ app directory structure
- TypeScript interfaces and mock data

## Phase 3.1: Setup
- [ ] T001 Create Next.js project structure with app directory
- [ ] T002 Initialize Next.js 14+ with TypeScript and Tailwind CSS
- [ ] T003 [P] Configure ESLint, Prettier, and Jest
- [ ] T004 [P] Setup Playwright for E2E testing
- [ ] T005 Configure Next.js for static export

## Phase 3.2: Types and Mock Data (TDD Foundation)
- [ ] T006 [P] User interface in src/types/user.ts
- [ ] T007 [P] Reservation interface in src/types/reservation.ts
- [ ] T008 [P] FinancialTransaction interface in src/types/transaction.ts
- [ ] T009 [P] ResortInfo interface in src/types/resort.ts
- [ ] T010 [P] FAQEntry interface in src/types/faq.ts
- [ ] T011 [P] Mock users data in src/data/users.json
- [ ] T012 [P] Mock reservations data in src/data/reservations.json
- [ ] T013 [P] Mock transactions data in src/data/transactions.json
- [ ] T014 [P] Mock resort info in src/data/resort-info.json
- [ ] T015 [P] Mock FAQ data in src/data/faq.json

## Phase 3.3: Core Components (TDD)
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T016 [P] User component test in tests/components/User.test.tsx
- [ ] T017 [P] Calendar component test in tests/components/Calendar.test.tsx
- [ ] T018 [P] Dashboard component test in tests/components/Dashboard.test.tsx
- [ ] T019 [P] Reservation form test in tests/components/ReservationForm.test.tsx
- [ ] T020 [P] Navigation component test in tests/components/Navigation.test.tsx

## Phase 3.4: Component Implementation (ONLY after tests are failing)
- [ ] T021 [P] User component in src/components/ui/User.tsx
- [ ] T022 [P] Calendar component in src/components/calendar/Calendar.tsx
- [ ] T023 [P] Dashboard component in src/components/dashboard/Dashboard.tsx
- [ ] T024 [P] Reservation form in src/components/forms/ReservationForm.tsx
- [ ] T025 [P] Navigation component in src/components/ui/Navigation.tsx
- [ ] T026 [P] Button component in src/components/ui/Button.tsx
- [ ] T027 [P] Input component in src/components/ui/Input.tsx
- [ ] T028 [P] Modal component in src/components/ui/Modal.tsx

## Phase 3.5: Pages and Routing
- [ ] T029 Landing page in src/app/page.tsx
- [ ] T030 Dashboard page in src/app/dashboard/page.tsx
- [ ] T031 Reservations page in src/app/reservations/page.tsx
- [ ] T032 About page in src/app/about/page.tsx
- [ ] T033 FAQ page in src/app/faq/page.tsx
- [ ] T034 Login page in src/app/(auth)/login/page.tsx
- [ ] T035 Register page in src/app/(auth)/register/page.tsx
- [ ] T036 Root layout in src/app/layout.tsx
- [ ] T037 Global styles in src/app/globals.css

## Phase 3.6: Utilities and Services
- [ ] T038 [P] Mock authentication service in src/lib/auth.ts
- [ ] T039 [P] Mock data service in src/lib/data.ts
- [ ] T040 [P] Utility functions in src/lib/utils.ts
- [ ] T041 [P] Date utilities in src/lib/date-utils.ts
- [ ] T042 [P] Validation schemas in src/lib/validation.ts

## Phase 3.7: Integration Tests
- [ ] T043 [P] Landing page integration test in tests/pages/landing.test.tsx
- [ ] T044 [P] Dashboard integration test in tests/pages/dashboard.test.tsx
- [ ] T045 [P] Reservation flow integration test in tests/pages/reservations.test.tsx
- [ ] T046 [P] Authentication flow integration test in tests/pages/auth.test.tsx
- [ ] T047 [P] Navigation integration test in tests/pages/navigation.test.tsx

## Phase 3.8: E2E Tests
- [ ] T048 [P] Complete user journey E2E test in tests/e2e/user-journey.spec.ts
- [ ] T049 [P] Mobile responsiveness E2E test in tests/e2e/mobile.spec.ts
- [ ] T050 [P] Accessibility E2E test in tests/e2e/accessibility.spec.ts

## Phase 3.9: Polish and Optimization
- [ ] T051 [P] Unit tests for utilities in tests/unit/utils.test.ts
- [ ] T052 [P] Unit tests for data services in tests/unit/data.test.ts
- [ ] T053 Performance optimization (images, bundle size)
- [ ] T054 [P] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] T055 [P] Mobile-first responsive design refinements
- [ ] T056 [P] Visual regression tests in tests/visual/regression.test.ts
- [ ] T057 [P] Update documentation in README.md
- [ ] T058 [P] Remove unused code and optimize imports

## Dependencies
- Setup (T001-T005) before everything
- Types and mock data (T006-T015) before components
- Component tests (T016-T020) before component implementation (T021-T028)
- Components before pages (T029-T037)
- Utilities (T038-T042) can run in parallel with pages
- Integration tests (T043-T047) after pages are complete
- E2E tests (T048-T050) after integration tests
- Polish (T051-T058) after core functionality

## Parallel Execution Examples

### Phase 3.2: Types and Mock Data (T006-T015)
```bash
# Launch all type definitions and mock data together:
Task: "User interface in src/types/user.ts"
Task: "Reservation interface in src/types/reservation.ts"
Task: "FinancialTransaction interface in src/types/transaction.ts"
Task: "ResortInfo interface in src/types/resort.ts"
Task: "FAQEntry interface in src/types/faq.ts"
Task: "Mock users data in src/data/users.json"
Task: "Mock reservations data in src/data/reservations.json"
Task: "Mock transactions data in src/data/transactions.json"
Task: "Mock resort info in src/data/resort-info.json"
Task: "Mock FAQ data in src/data/faq.json"
```

### Phase 3.3: Component Tests (T016-T020)
```bash
# Launch all component tests together:
Task: "User component test in tests/components/User.test.tsx"
Task: "Calendar component test in tests/components/Calendar.test.tsx"
Task: "Dashboard component test in tests/components/Dashboard.test.tsx"
Task: "Reservation form test in tests/components/ReservationForm.test.tsx"
Task: "Navigation component test in tests/components/Navigation.test.tsx"
```

### Phase 3.4: Component Implementation (T021-T028)
```bash
# Launch all component implementations together:
Task: "User component in src/components/ui/User.tsx"
Task: "Calendar component in src/components/calendar/Calendar.tsx"
Task: "Dashboard component in src/components/dashboard/Dashboard.tsx"
Task: "Reservation form in src/components/forms/ReservationForm.tsx"
Task: "Navigation component in src/components/ui/Navigation.tsx"
Task: "Button component in src/components/ui/Button.tsx"
Task: "Input component in src/components/ui/Input.tsx"
Task: "Modal component in src/components/ui/Modal.tsx"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Follow TDD: Red → Green → Refactor
- Static site generation with Next.js
- Mock data only - no database
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance

## Task Generation Rules
*Applied during main() execution*

1. **From Data Model**:
   - Each entity → type definition task [P]
   - Each entity → mock data task [P]
   
2. **From User Stories**:
   - Each story → component test [P]
   - Each story → integration test [P]
   
3. **From Pages**:
   - Each page → page implementation task
   - Each page → page test [P]

4. **Ordering**:
   - Setup → Types → Tests → Components → Pages → Integration → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All entities have type definitions
- [ ] All entities have mock data
- [ ] All components have tests
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
- [ ] Static site generation configured
- [ ] Mobile-first responsive design
- [ ] Accessibility compliance planned
