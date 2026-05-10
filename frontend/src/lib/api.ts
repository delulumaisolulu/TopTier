/**
 * FastAPI Client Helper
 * Centralizes all communication with the Python backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, token } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

// ── Upload & Processing ──
export async function processDocument(docId: string, token?: string) {
  return apiFetch<{ status: string; topics: Array<{ name: string; weightage: number; exam_probability: number }> }>(
    `/api/process/${docId}`,
    { method: "POST", token }
  );
}

// ── Test Generation ──
export interface TestConfig {
  question_types: string[];
  difficulty: string;
  question_count: number;
  filter_mode: string;
  topic_ids?: string[];
}

export async function generateTest(config: TestConfig, token?: string) {
  return apiFetch<{ test_id: string; questions: Array<unknown> }>(
    "/api/test/generate",
    { method: "POST", body: config, token }
  );
}

// ── Test Evaluation ──
export async function evaluateTest(
  testId: string,
  answers: Array<{ question_id: string; answer_text: string; time_spent: number }>,
  token?: string
) {
  return apiFetch<{ score: number; analytics: unknown }>(
    `/api/test/${testId}/evaluate`,
    { method: "POST", body: { answers }, token }
  );
}

// ── Analytics ──
export async function fetchAnalytics(userId: string, token?: string) {
  return apiFetch<{ readiness_score: number; weak_topics: unknown[]; strong_topics: unknown[] }>(
    `/api/analytics/${userId}`,
    { token }
  );
}
