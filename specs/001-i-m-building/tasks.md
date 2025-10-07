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
- [ ] T004 Configure Next.js for static export

## Phase 3.2: Types and Mock Data (TDD Foundation)
- [ ] T005 [P] User interface in src/types/user.ts
- [ ] T006 [P] Reservation interface in src/types/reservation.ts
- [ ] T007 [P] FinancialTransaction interface in src/types/transaction.ts
- [ ] T008 [P] ResortInfo interface in src/types/resort.ts
- [ ] T009 [P] FAQEntry interface in src/types/faq.ts
- [ ] T010 [P] Mock users data in src/data/users.json
- [ ] T011 [P] Mock reservations data in src/data/reservations.json
- [ ] T012 [P] Mock transactions data in src/data/transactions.json
- [ ] T013 [P] Mock resort info in src/data/resort-info.json
- [ ] T014 [P] Mock FAQ data in src/data/faq.json

## Phase 3.3: Core Components (TDD)
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T015 [P] User component test in tests/components/User.test.tsx
- [ ] T016 [P] Calendar component test in tests/components/Calendar.test.tsx
- [ ] T017 [P] Dashboard component test in tests/components/Dashboard.test.tsx
- [ ] T018 [P] Reservation form test in tests/components/ReservationForm.test.tsx
- [ ] T019 [P] Navigation component test in tests/components/Navigation.test.tsx

## Phase 3.4: Component Implementation (ONLY after tests are failing)
- [ ] T020 [P] User component in src/components/ui/User.tsx
- [ ] T021 [P] Calendar component in src/components/calendar/Calendar.tsx
- [ ] T022 [P] Dashboard component in src/components/dashboard/Dashboard.tsx
- [ ] T023 [P] Reservation form in src/components/forms/ReservationForm.tsx
- [ ] T024 [P] Navigation component in src/components/ui/Navigation.tsx
- [ ] T025 [P] Button component in src/components/ui/Button.tsx
- [ ] T026 [P] Input component in src/components/ui/Input.tsx
- [ ] T027 [P] Modal component in src/components/ui/Modal.tsx

## Phase 3.5: Pages and Routing
- [ ] T028 Landing page in src/app/page.tsx
- [ ] T029 Dashboard page in src/app/dashboard/page.tsx
- [ ] T030 Reservations page in src/app/reservations/page.tsx
- [ ] T031 About page in src/app/about/page.tsx
- [ ] T032 FAQ page in src/app/faq/page.tsx
- [ ] T033 Login page in src/app/(auth)/login/page.tsx
- [ ] T034 Register page in src/app/(auth)/register/page.tsx
- [ ] T035 Root layout in src/app/layout.tsx
- [ ] T036 Global styles in src/app/globals.css

## Phase 3.6: Utilities and Services
- [ ] T037 [P] Mock authentication service in src/lib/auth.ts
- [ ] T038 [P] Mock data service in src/lib/data.ts
- [ ] T039 [P] Utility functions in src/lib/utils.ts
- [ ] T040 [P] Date utilities in src/lib/date-utils.ts
- [ ] T041 [P] Validation schemas in src/lib/validation.ts

## Phase 3.7: Integration Tests
- [ ] T042 [P] Landing page integration test in tests/pages/landing.test.tsx
- [ ] T043 [P] Dashboard integration test in tests/pages/dashboard.test.tsx
- [ ] T044 [P] Reservation flow integration test in tests/pages/reservations.test.tsx
- [ ] T045 [P] Authentication flow integration test in tests/pages/auth.test.tsx
- [ ] T046 [P] Navigation integration test in tests/pages/navigation.test.tsx

## Phase 3.8: Polish and Optimization
- [ ] T047 [P] Unit tests for utilities in tests/unit/utils.test.ts
- [ ] T048 [P] Unit tests for data services in tests/unit/data.test.ts
- [ ] T049 Performance optimization (images, bundle size)
- [ ] T050 [P] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] T051 [P] Mobile-first responsive design refinements
- [ ] T052 [P] Visual regression tests in tests/visual/regression.test.ts
- [ ] T053 [P] Update documentation in README.md
- [ ] T054 [P] Remove unused code and optimize imports

## Dependencies
- Setup (T001-T004) before everything
- Types and mock data (T005-T014) before components
- Component tests (T015-T019) before component implementation (T020-T027)
- Components before pages (T028-T036)
- Utilities (T037-T041) can run in parallel with pages
- Integration tests (T042-T046) after pages are complete
- Polish (T047-T054) after core functionality

## Parallel Execution Examples

### Phase 3.2: Types and Mock Data (T005-T014)
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
