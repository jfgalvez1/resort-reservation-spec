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
- [x] T001 Create Next.js project structure with app directory
- [x] T002 Initialize Next.js 14+ with TypeScript and Tailwind CSS
- [x] T003 [P] Configure ESLint, Prettier, and Jest
- [x] T004 Configure Next.js for static export

## Phase 3.2: Types and Mock Data (TDD Foundation)
- [x] T005 [P] User interface in src/types/user.ts
- [x] T006 [P] Reservation interface in src/types/reservation.ts
- [x] T007 [P] FinancialTransaction interface in src/types/transaction.ts
- [x] T008 [P] ResortInfo interface in src/types/resort.ts
- [x] T009 [P] FAQEntry interface in src/types/faq.ts
- [x] T010 [P] Mock users data in src/data/users.json
- [x] T011 [P] Mock reservations data in src/data/reservations.json
- [x] T012 [P] Mock transactions data in src/data/transactions.json
- [x] T013 [P] Mock resort info in src/data/resort-info.json
- [x] T014 [P] Mock FAQ data in src/data/faq.json

## Phase 3.3: Core Components (TDD)
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T015 [P] User component test in tests/components/User.test.tsx
- [x] T016 [P] Calendar component test in tests/components/Calendar.test.tsx
- [x] T017 [P] Dashboard component test in tests/components/Dashboard.test.tsx
- [x] T018 [P] Reservation form test in tests/components/ReservationForm.test.tsx
- [x] T019 [P] Navigation component test in tests/components/Navigation.test.tsx

## Phase 3.4: Component Implementation (ONLY after tests are failing)
- [x] T020 [P] User component in src/components/ui/User.tsx
- [x] T021 [P] Calendar component in src/components/calendar/Calendar.tsx
- [x] T022 [P] Dashboard component in src/components/dashboard/Dashboard.tsx
- [x] T023 [P] Reservation form in src/components/forms/ReservationForm.tsx
- [x] T024 [P] Navigation component in src/components/ui/Navigation.tsx
- [x] T025 [P] Button component in src/components/ui/Button.tsx
- [x] T026 [P] Input component in src/components/ui/Input.tsx
- [x] T027 [P] Modal component in src/components/ui/Modal.tsx

## Phase 3.5: Pages and Routing
- [x] T028 Landing page in src/app/page.tsx
- [x] T029 Dashboard page in src/app/dashboard/page.tsx
- [x] T030 Reservations page in src/app/reservations/page.tsx
- [x] T031 About page in src/app/about/page.tsx
- [x] T032 FAQ page in src/app/faq/page.tsx
- [x] T033 Login page in src/app/(auth)/login/page.tsx
- [x] T034 Register page in src/app/(auth)/register/page.tsx
- [x] T035 Root layout in src/app/layout.tsx
- [x] T036 Global styles in src/app/globals.css

## Phase 3.6: Utilities and Services
- [x] T037 [P] Mock authentication service in src/lib/auth.ts
- [x] T038 [P] Mock data service in src/lib/data.ts
- [x] T039 [P] Utility functions in src/lib/utils.ts
- [x] T040 [P] Date utilities in src/lib/date-utils.ts
- [x] T041 [P] Validation schemas in src/lib/validation.ts

## Phase 3.7: Integration Tests
- [x] T042 [P] Landing page integration test in tests/pages/landing.test.tsx
- [x] T043 [P] Dashboard integration test in tests/pages/dashboard.test.tsx
- [x] T044 [P] Reservation flow integration test in tests/pages/reservations.test.tsx
- [x] T045 [P] Authentication flow integration test in tests/pages/auth.test.tsx
- [x] T046 [P] Navigation integration test in tests/pages/navigation.test.tsx

## Phase 3.8: Polish and Optimization
- [x] T047 [P] Unit tests for utilities in tests/unit/utils.test.ts
- [x] T048 [P] Unit tests for data services in tests/unit/data.test.ts
- [x] T049 Performance optimization (images, bundle size)
- [x] T050 [P] Accessibility improvements (ARIA labels, keyboard navigation)
- [x] T051 [P] Mobile-first responsive design refinements
- [x] T052 [P] Visual regression tests in tests/visual/regression.test.ts
- [x] T053 [P] Update documentation in README.md
- [x] T054 [P] Remove unused code and optimize imports

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
