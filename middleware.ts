import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/tournaments",
  // '/teams',
  "/profile",
];

// Define auth routes that should redirect to dashboard if authenticated
const authRoutes = ["/sign-in", "/sign-up", "/verify"];

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  try {
    // Redirect authenticated users trying to access auth routes to dashboard
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect unauthenticated users trying to access protected routes to sign-in
    if (!token && isProtectedRoute) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Redirect to error page with the error message
    const errorUrl = new URL("/auth/error", request.url);
    errorUrl.searchParams.set("error", "ServerError");
    return NextResponse.redirect(errorUrl);
  }
}
