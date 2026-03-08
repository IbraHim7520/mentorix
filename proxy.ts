import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authClient from './lib/auth-client';
 
// This function can be marked `async` if using `await` inside

const protectedPaths = [
  "/dashboard",
  "/dashboard/categories",
  "/dashboard/manage-bookings",
  "/dashboard/manage-users",
  "/dashboard/create-sessions",
  "/dashboard/my-sessions",
  "/dashboard/ratings",
  "/dashboard/my-bookings",
  "/dashboard/reviews",
];


export async function proxy(request: NextRequest) {
 // const session = (await cookies()).getAll();
  const session = await authClient.getSession();
 

  const { pathname } = request.nextUrl;

  // 3. Check if the current path is in our protected list
  // We use .startsWith to cover sub-paths if necessary
  const isProtected = protectedPaths.some((path) => pathname === path);

  if (isProtected && !session) {
    // 4. Redirect to login if no session exists
    const loginUrl = new URL("/login", request.url);
    
    // Optional: Store the attempted URL to redirect back after login
    loginUrl.searchParams.set("callbackUrl", pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ["/dashboard/:path*"],
};