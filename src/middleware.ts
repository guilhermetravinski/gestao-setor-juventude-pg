import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  if (!token && !request.nextUrl.pathname.startsWith('/login'))
    return NextResponse.redirect(new URL('/login', request.url))

  if (token && request.nextUrl.pathname.startsWith('/login'))
    return NextResponse.redirect(new URL('/', request.url))

  switch (token?.role) {
    case 'admin':
      if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/grupos', request.url))
      }
      break

    case 'user':
      if (!request.nextUrl.pathname.startsWith('/unauthorized')) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
      break

    default:
      if (!request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
  }
}

export const config = { matcher: ['/admin/:path*', '/login'] }
