"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert("필수 약관에 동의해주세요.")
      return
    }
    // Handle signup logic here
    console.log("Signup attempt:", formData)
  }

  const handleOAuthSignup = (provider: string) => {
    // Handle OAuth signup
    console.log("OAuth signup:", provider)
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
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>펫샵 가족이 되어주세요! 가입 시 5,000포인트를 드립니다.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OAuth Signup Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 text-left justify-start space-x-3 bg-transparent"
              onClick={() => handleOAuthSignup("kakao")}
            >
              <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-black">K</span>
              </div>
              <span>카카오로 가입하기</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 text-left justify-start space-x-3 bg-transparent"
              onClick={() => handleOAuthSignup("google")}
            >
              <div className="w-5 h-5 bg-white border rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500">G</span>
              </div>
              <span>구글로 가입하기</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 text-left justify-start space-x-3 bg-transparent"
              onClick={() => handleOAuthSignup("naver")}
            >
              <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">N</span>
              </div>
              <span>네이버로 가입하기</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">또는</span>
            </div>
          </div>

          {/* Email/Password Signup */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  placeholder="이름"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  <span className="text-destructive">*</span> 이용약관에 동의합니다
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => handleInputChange("agreePrivacy", checked as boolean)}
                />
                <Label htmlFor="agreePrivacy" className="text-sm">
                  <span className="text-destructive">*</span> 개인정보처리방침에 동의합니다
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) => handleInputChange("agreeMarketing", checked as boolean)}
                />
                <Label htmlFor="agreeMarketing" className="text-sm">
                  마케팅 정보 수신에 동의합니다 (선택)
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full h-12">
              회원가입
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">이미 계정이 있으신가요? </span>
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
