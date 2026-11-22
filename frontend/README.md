# AarogyaNet AI — Frontend Prototype

Next.js (App Router) implementation of the frontend described in the
**AarogyaNet AI Prototype Blueprint**, following the exact page structure
from blueprint section 8:

```
frontend/
├── app/
│   ├── page.tsx                landing website
│   ├── login/                  patient/doctor/government login
│   ├── register/                demo registration
│   ├── patient/                 patient dashboard + sub-modules
│   ├── doctor/                  doctor dashboard + sub-modules
│   ├── government/              government dashboard + sub-modules
│   └── admin/                   placeholder — see note below
├── components/                  shared, presentational building blocks
├── features/                    stateful blueprint "modules" (one per app/*/<x> route)
├── hooks/                       reusable client-side hooks (e.g. vitals simulator)
├── services/                    API-shaped functions — currently return mock data
├── lib/                         theme tokens, i18n, mock data, global app context
├── public/                      static assets
└── tests/                       unit tests (Vitest)
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Use the **Patient / Doctor / Government** buttons
on the landing page (or the login screen) to enter any of the three demo
portals — no real credentials are required, this is a UI prototype.

## What's real vs. simulated

A FastAPI backend now exists in `../backend` and every `services/*.ts` file
calls it for real — see the root `README.md` for how to run both together.
Each service still falls back to local mock/simulated data if the backend
is unreachable (backend not started, network error, etc.), so the frontend
never hard-fails:

- All data in `lib/mockData.ts` is **synthetic** and doubles as the
  fallback data + the initial render state before a fetch resolves. No real
  patient PII.
- IoT vitals (`hooks/useVitalStream.ts`) simulate a sensor stream
  client-side, standing in for the ESP32/simulator described in blueprint
  section 13 — `features/vitals/VitalsMonitor.tsx` pushes each simulated
  tick to `POST /api/vitals` so it's persisted and broadcast over
  `WS /ws/vitals/{patient_id}` on the backend.
- The GIS map (`components/GISMap.tsx`) is a schematic SVG, not a real
  Leaflet/MapLibre layer, but the cases it plots now come from
  `GET /api/gis/cases` (see `features/map/GISDashboard.tsx`).
- The Digital Health ID QR (`components/DemoQR.tsx`) is a non-scannable,
  illustrative pattern — see blueprint section 17.
- Blockchain "verification" (`services/blockchainService.ts`) calls
  `GET /api/blockchain/verify/{record_id}`, which does a genuine SHA-256
  recompute-and-compare against the backend's stored record hash.
- Auth/session state lives in React context (`lib/context.tsx`) plus a JWT
  held in `lib/apiClient.ts` — both reset on page reload (no
  localStorage/cookie persistence yet).

## Module → route map

| Blueprint module | Route(s) |
|---|---|
| Landing Website | `/` |
| Authentication | `/login`, `/register` |
| Patient Dashboard | `/patient/dashboard` |
| AI Medical Assistant | `/patient/assistant` |
| IoT Vital Monitoring | `/patient/vitals` |
| Health Records + Digital Health ID + Blockchain Verification | `/patient/records` |
| Telemedicine (find doctor) | `/patient/doctors` |
| Telemedicine (appointments) | `/patient/appointments`, `/doctor/appointments`, `/doctor/consultations` |
| Medicine Safety | `/patient/medicines` |
| Emergency Response | `/patient/emergency` |
| Doctor Dashboard (queue + detail) | `/doctor/dashboard`, `/doctor/patients`, `/doctor/patients/[id]` |
| Government Dashboard | `/government/dashboard` |
| GIS Disease Map | `/government/map` |
| Disease case reporting | `/government/diseases` |
| Hospital/ambulance capacity | `/government/hospitals` |
| Admin/Health Worker | `/admin` (placeholder — not specified in blueprint section 8, see note in `app/admin/page.tsx`) |

## Language

The `EN / हिं` toggle in the top bar (and on the landing page) switches every
piece of UI copy via `lib/i18n.ts` — this is the light multilingual layer
from blueprint section 21; voice input/output is not wired up yet.

## Tests

```bash
npm run test
```

A starter Vitest suite lives in `tests/`. Extend it per blueprint section 27
("Testing Checklist") as real screens and backend integration land.
