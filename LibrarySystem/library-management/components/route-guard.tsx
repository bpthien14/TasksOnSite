'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

interface RouteGuardProps {
  children: React.ReactNode
}

// Các đường dẫn công khai, không cần đăng nhập
const publicPaths = ['/login', '/forgot-password', '/reset-password']

export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // Nếu không đăng nhập và không ở trang công khai, chuyển hướng về trang đăng nhập
      if (!isAuthenticated && !publicPaths.includes(pathname)) {
        router.push('/login')
      }
      // Nếu đã đăng nhập và đang ở trang đăng nhập, chuyển hướng về trang chủ
      else if (isAuthenticated && pathname === '/login') {
        router.push('/')
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Nếu đang kiểm tra trạng thái xác thực, hiển thị loading...
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Nếu không đăng nhập và không ở trang công khai, không hiển thị nội dung
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return null
  }

  return <>{children}</>
}
