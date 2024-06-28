'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function NavLink({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (
    <Link
      href={`/${slug}`}
      className={`${isActive ? 'text-foreground' : 'text-muted-foreground'} transition-colors hover:text-foreground`}
    >
      {children}
    </Link>
  )
}
