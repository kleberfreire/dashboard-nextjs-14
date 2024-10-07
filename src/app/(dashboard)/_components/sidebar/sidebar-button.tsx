'use client'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SideBarButtonProps extends ButtonProps {
  href: string
  children: React.ReactNode
}

const SideBarButton = (props: SideBarButtonProps) => {
  const pathname = usePathname()
  const { href, className, children } = props
  return (
    <Button
      variant={pathname === href ? 'secondary' : 'ghost'}
      className={cn(`justify-start gap-2`, className)}
      asChild
      {...props}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default SideBarButton
