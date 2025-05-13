"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Lock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await api.auth.login(email, password)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại')
      }
      
      // Lưu token vào localStorage
      localStorage.setItem('token', data.token)
      
      // Thông báo thành công
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn đến với hệ thống quản lý thư viện",
      })
      
      // Chuyển hướng đến trang chính
      router.push('/')
    } catch (error) {
      console.error('Lỗi đăng nhập:', error)
      toast({
        title: "Đăng nhập thất bại",
        description: error instanceof Error ? error.message : "Đã xảy ra lỗi khi đăng nhập",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">Library Management System</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@library.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Lock className="mr-2 h-4 w-4" />
              {isLoading ? "Đang đăng nhập..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <span>Staff access only. Contact your administrator for account issues.</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
