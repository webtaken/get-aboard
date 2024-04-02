export { default } from "next-auth/middleware";

export const config = {
  // Protecting only /dashboard path
  matcher: ["/dashboard/:path*"],
};
