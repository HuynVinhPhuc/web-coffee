import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // authorize roles
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

    if (url?.startsWith("/admin") && userRole !== "Quản lý" && userRole !== "Nhân viên" ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (url?.startsWith("/admin/products") && userRole !== "Quản lý") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/me/:path*", "/shipping"],
};
