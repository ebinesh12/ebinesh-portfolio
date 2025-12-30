import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Helper function to verify the JWT
const verifyJwtToken = async (token) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    return null;
  }
};

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const isAdminPath = path.startsWith("/admin");
  const isAuthPath = path.startsWith("/auth");

  // SCENARIO 1: User is already logged in but visits Login/Register pages
  // Redirect them to the Admin dashboard immediately.
  if (isAuthPath && token) {
    const payload = await verifyJwtToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // SCENARIO 2: User tries to access Admin pages
  // This is the ONLY area where we force a login.
  if (isAdminPath) {
    // If no token exists, kick them out to login
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Verify the token
    const payload = await verifyJwtToken(token);

    // If token is invalid/expired, clear it and redirect to login
    if (!payload) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("token");
      return response;
    }

    // Valid token? Let them pass to /admin
    return NextResponse.next();
  }

  // SCENARIO 3: All other routes (Home, Portfolio, etc.)
  // We allow the request. If the page doesn't exist, Next.js handles the 404.
  return NextResponse.next();
}

// Matcher Configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (images, docs, etc - add extensions as needed)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};
