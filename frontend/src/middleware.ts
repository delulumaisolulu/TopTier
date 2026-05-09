import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js Edge Middleware.
 * Runs BEFORE every matched request. Handles:
 * 1. Session refresh (keeps auth tokens alive)
 * 2. Route protection (redirects unauthenticated users)
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

/**
 * Matcher config: run middleware on all routes EXCEPT
 * static assets, images, favicon, and Next.js internals.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
