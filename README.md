
# Chaos Engineering Frontend

[![Run Tests](https://github.com/Bellangelo/chaos-engineering-frontend/actions/workflows/run-tests.yml/badge.svg)](https://github.com/Bellangelo/chaos-engineering-frontend/actions)

Chaos Engineering Frontend is a JavaScript library for introducing controlled chaos into frontend applications. It uses a **service worker** to simulate failure scenarios like latency, errors, tampering, and offline mode, helping developers test the resilience of their applications.

---

## Features

- **Latency Simulation**: Introduce random or configurable delays in API responses.
- **Error Injection**: Simulate HTTP errors like `500`, `404`, or `503` on selected requests.
- **Response Tampering**: Modify the content of API responses to test frontend handling.
- **Offline Simulation**: Block requests to simulate offline scenarios.
- **Dynamic Configuration**: Update chaos settings at runtime.

---

## Installation

Install the library using npm:

```bash
npm install chaos-engineering-frontend
```

---

## Usage

### 1. Register the Service Worker

Register the service worker in your application:

```javascript
import { registerChaosWorker } from 'chaos-engineering-frontend';

registerChaosWorker('/chaos-worker.js');
```

Make sure the `chaos-worker.js` file is available in your public directory.

---

### 2. Configure Chaos Scenarios

You can configure chaos scenarios like latency, errors, and more:

```javascript
import { configureChaos } from 'chaos-engineering-frontend';

configureChaos({
  enabled: true,
  latency: {
    enabled: true,
    min: 200, // Minimum latency in milliseconds
    max: 1000, // Maximum latency in milliseconds
  },
  errors: {
    enabled: true,
    rate: 0.2, // 20% error rate
    statusCodes: [500, 503], // Simulate server errors
  },
  offline: {
    enabled: false,
    rate: 0, // No offline simulation
  },
});
```

---

### 3. Update Chaos Settings Dynamically

Update configurations at runtime using the `updateChaosConfig` method:

```javascript
import { updateChaosConfig } from 'chaos-engineering-frontend';

updateChaosConfig({
  latency: { enabled: false }, // Disable latency
  errors: { rate: 0.5 }, // Increase error rate to 50%
});
```

---

## Development

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/bellangelo/chaos-engineering-frontend
   cd chaos-engineering-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```