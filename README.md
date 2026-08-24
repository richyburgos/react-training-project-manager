# Project Management App (React Practice Project)

A small single-page project/task manager built while learning React. The goal of this project wasn't to build a production-ready app — it was to take core React concepts learned in a React course (React - The Complete Guide (incl. Next.js, Redux) by Maximilian Schwarzmüller) and create a small practice project (suggested by the course) that could be used to practice those concepts.

There is **no backend, database, or persistence layer** of any kind. All data lives in memory via `useState` and is lost on refresh. This is intentional — the focus of this project is on component structure, state management, and React patterns, not on real-world data persistence.

## What this project does

- Create, view, edit, and delete projects (title, description, due date)
- Add, complete/uncomplete, and remove tasks within a project
- Sidebar navigation to switch between projects, or start a new one
- Modal dialogs for editing and deleting projects, with focus trapping and ESC-to-close
- Toast notifications confirming successful actions (create/update)

## React concepts this project was built to practice

- **`useState`** — for all app data (projects, tasks, current view/mode, modal state, toast state)
- **`useRef`** — for uncontrolled form inputs (project form, task input) and for DOM focus management in modals
- **`forwardRef`** — used in `LabeledInput` so a reusable input component can still expose its underlying `<input>` element to a parent's `ref`
- **Component composition / "render props" style children** — e.g. passing a `<ProjectForm />` element as the `body` prop into a generic `<Modal />` component
- **`createPortal`** — used in `Modal` and `Toast` to render outside the normal component tree, into dedicated DOM nodes (`#modal-root`, `#toast-root`) defined in `index.html`
- **Lifting state up** — all project/task data lives in `App`, with functions passed down as props so child components can request changes without owning the data themselves
- **Prop drilling & function wrapping (partial application)** — e.g. `removeTask(projectId, taskId)` gets progressively wrapped down through `Project` → `ProjectTasks` so each component only has to supply the piece of information it actually knows
- **Conditional rendering** — switching between views (`init` / `create` / `view` modes) and between empty/populated states (no projects, no tasks)
- **One `useEffect`** — used in `Modal` for keyboard accessibility (ESC to close, focus trapping) and in `ProjectForm` to populate fields when switching into edit mode. `useEffect` wasn't formally covered in the course this project accompanies at the time of writing; it was used sparingly, in isolated cases, after independent reading — not as a general pattern applied throughout.

## Known limitations (intentional, not oversights)

These are documented on purpose — they're a result of scope, not things that were missed:

- **IDs are generated with `Date.now()` / `Math.floor(Date.now() / 1000)`**, not a proper UUID or database-assigned ID. This works for a single-user, in-memory demo but would break down under rapid successive creates (two items created within the same second/millisecond could collide) or any multi-user scenario. In a real app, ID generation would be handled by the backend/database.
- **No persistence.** Refreshing the page resets all state back to the seeded sample project. There's no `localStorage`, API, or database wired up.
- **No form validation beyond HTML's built-in `required`.** There's no character limits, date validation, duplicate-title checks, etc.
- **Accessibility is inconsistent by design.** The `Modal` component includes real accessibility work (focus trapping, ESC handling, ARIA roles) because that was an area intentionally explored — but the sidebar's project list is not keyboard-navigable (it uses `<li onClick>` rather than a focusable element). This wasn't an oversight; accessibility polish wasn't the priority for every component in this pass.
- **The `Toast` component's auto-dismiss timer is set up in a way that could re-trigger on unrelated re-renders**, since it isn't wrapped in `useEffect` (see note above on scope). In practice this could cause a toast to disappear earlier than expected if a second toast fires in quick succession. This is a known, deliberate trade-off to stay within the concepts covered so far — a documented "next thing to fix" rather than an unknown bug.

## Tech stack

- React (functional components + hooks only, no class components)
- Tailwind CSS for styling

## Running the project

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── App.jsx                 # Top-level state and view routing
├── components/
│   ├── SideBar.jsx          # Project navigation
│   ├── BlankProject.jsx     # Empty/"no project selected" state
│   ├── Project.jsx          # Single project view (details, tasks, edit/delete modals)
│   ├── ProjectForm.jsx      # Shared create/edit form
│   ├── ProjectTasks.jsx     # Task list for a project
│   └── common/
│       ├── Button.jsx        # Reusable styled button
│       ├── LabeledInput.jsx  # Reusable labeled input (forwardRef)
│       ├── Modal.jsx         # Reusable accessible modal (portal-based)
│       └── Toast.jsx         # Toast notification (portal-based)
```

## Why this exists

This repo is meant to be looked at as a **learning artifact**, not a polished product. If you're reviewing this code (as a mentor, a course reviewer, or just curious), the interesting parts to look at are less "does this app do everything a real project manager would need" and more "does the state flow make sense, is data being updated immutably, and are components composed sensibly." Feedback on those fronts is very welcome.
