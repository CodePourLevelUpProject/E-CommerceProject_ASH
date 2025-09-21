"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { signIn, getProviders } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [providers, setProviders] = useState<any>(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password })
  }

  const handleOAuthLogin = (providerId: string) => {
    signIn(providerId)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">🐾</span>
            </div>
            <span className="font-bold text-2xl text-primary">펫샵</span>
          </div>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>반려동물을 위한 최고의 쇼핑몰에 오신 것을 환영합니다</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OAuth Login Buttons */}
          <div className="space-y-3">
            {providers &&
              Object.values(providers).map((provider: any) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  className="w-full h-12 text-left justify-start space-x-3 bg-transparent"
                  onClick={() => handleOAuthLogin(provider.id)}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    provider.id === 'kakao' ? 'bg-yellow-400' :
                    provider.id === 'google' ? 'bg-white border' :
                    'bg-green-500'
                  }`}>
                    <span className={`text-xs font-bold ${
                      provider.id === 'kakao' ? 'text-black' :
                      provider.id === 'google' ? 'text-blue-500' :
                      'text-white'
                    }`}>
                      {provider.id === 'kakao' ? 'K' :
                       provider.id === 'google' ? 'G' : 'N'}
                    </span>
                  </div>
                  <span>
                    {provider.id === 'kakao' && '카카오로 시작하기'}
                    {provider.id === 'google' && '구글로 시작하기'}
                    {provider.id === 'naver' && '네이버로 시작하기'}
                  </span>
                </Button>
              ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">또는</span>
            </div>
          </div>

          {/* Email/Password Login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/auth/forgot-password" className="text-primary hover:underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12">
              로그인
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">아직 계정이 없으신가요? </span>
            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
