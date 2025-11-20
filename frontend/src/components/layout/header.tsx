"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Menu, Heart, Bell, LogOut } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🐾</span>
            </div>
            <span className="font-bold text-xl text-primary">펫샵</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="반려동물 용품을 검색해보세요" className="pl-10 pr-4" />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              {session ? (
                <div className="flex items-center space-x-2">
                  <Link href="/mypage">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => signOut()}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex h-12 items-center space-x-8 text-sm font-medium">
          <Link href="/category/dog" className="text-foreground hover:text-primary transition-colors">
            강아지 용품
          </Link>
          <Link href="/category/cat" className="text-foreground hover:text-primary transition-colors">
            고양이 용품
          </Link>
          <Link href="/category/food" className="text-foreground hover:text-primary transition-colors">
            사료/간식
          </Link>
          <Link href="/category/toys" className="text-foreground hover:text-primary transition-colors">
            장난감
          </Link>
          <Link href="/category/health" className="text-foreground hover:text-primary transition-colors">
            건강/위생
          </Link>
          <Link href="/deals" className="text-accent hover:text-accent/80 transition-colors font-semibold">
            특가 할인
          </Link>
        </nav>

        {/* Mobile search - shown when menu is open */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="반려동물 용품을 검색해보세요" className="pl-10 pr-4" />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link href="/category/dog" className="text-foreground hover:text-primary transition-colors">
                강아지 용품
              </Link>
              <Link href="/category/cat" className="text-foreground hover:text-primary transition-colors">
                고양이 용품
              </Link>
              <Link href="/category/food" className="text-foreground hover:text-primary transition-colors">
                사료/간식
              </Link>
              <Link href="/category/toys" className="text-foreground hover:text-primary transition-colors">
                장난감
              </Link>
              <Link href="/category/health" className="text-foreground hover:text-primary transition-colors">
                건강/위생
              </Link>
              <Link href="/deals" className="text-accent hover:text-accent/80 transition-colors font-semibold">
                특가 할인
              </Link>
            </nav>
            <div className="flex items-center justify-around mt-6 pt-4 border-t">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <Bell className="h-5 w-5" />
                <span className="text-xs">알림</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <Heart className="h-5 w-5" />
                <span className="text-xs">찜</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">장바구니</span>
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              {session ? (
                <>
                  <Link href="/mypage">
                    <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                      <User className="h-5 w-5" />
                      <span className="text-xs">마이페이지</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1" onClick={() => signOut()}>
                    <LogOut className="h-5 w-5" />
                    <span className="text-xs">로그아웃</span>
                  </Button>
                </>
              ) : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                    <User className="h-5 w-5" />
                    <span className="text-xs">로그인</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
