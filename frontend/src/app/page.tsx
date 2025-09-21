'use client'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Truck, Shield, Headphones, Gift } from "lucide-react"
import Link from "next/link"
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                  반려동물을 위한
                  <br />
                  <span className="text-primary">최고의 선택</span>
                </h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  건강하고 행복한 반려동물을 위한 프리미엄 용품을 만나보세요. 신규 회원 가입 시 5,000포인트를 드립니다!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8">
                    지금 쇼핑하기
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    카테고리 보기
                  </Button>
                </div>
                {session && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border">
                    <p className="text-sm text-muted-foreground">
                      안녕하세요, <span className="font-semibold text-primary">{session.user?.name}</span>님! 🎉
                    </p>
                  </div>
                )}
              </div>
              <div className="relative">
                <img
                  src="/happy-dog-and-cat-with-pet-supplies.jpg"
                  alt="반려동물과 용품들"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">무료배송</h3>
                <p className="text-sm text-muted-foreground">3만원 이상 구매시</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">품질보장</h3>
                <p className="text-sm text-muted-foreground">100% 정품만 판매</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">고객지원</h3>
                <p className="text-sm text-muted-foreground">평일 9시-6시 상담</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">적립혜택</h3>
                <p className="text-sm text-muted-foreground">구매금액의 1% 적립</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">인기상품 TOP 10</h2>
              <Button variant="outline">전체보기</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={`/pet-product-display.png?height=200&width=200&query=pet product ${i + 1}`}
                        alt={`상품 ${i + 1}`}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-destructive">
                        {[15, 20, 25, 30, 35, 10, 40, 18][i]}% 할인
                      </Badge>
                      <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-medium line-clamp-2">프리미엄 강아지 사료 {i + 1}kg</h3>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-muted-foreground">(127)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground line-through">
                            {[45000, 38000, 42000, 35000, 48000, 40000, 33000, 46000][i].toLocaleString()}원
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {[32000, 28000, 35000, 25000, 38000, 30000, 22000, 34000][i].toLocaleString()}원
                          </p>
                        </div>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          담기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">카테고리별 쇼핑</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/category/dog" className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">🐕</span>
                    </div>
                    <h3 className="font-semibold">강아지 용품</h3>
                    <p className="text-sm text-muted-foreground">사료, 간식, 장난감</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/category/cat" className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">🐱</span>
                    </div>
                    <h3 className="font-semibold">고양이 용품</h3>
                    <p className="text-sm text-muted-foreground">사료, 모래, 스크래처</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/category/health" className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">🏥</span>
                    </div>
                    <h3 className="font-semibold">건강/위생</h3>
                    <p className="text-sm text-muted-foreground">샴푸, 영양제, 의료용품</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/category/toys" className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">🎾</span>
                    </div>
                    <h3 className="font-semibold">장난감</h3>
                    <p className="text-sm text-muted-foreground">공, 인형, 퍼즐</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">특별 혜택</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">신규 회원 혜택</h3>
                    <p className="text-lg opacity-90">지금 가입하고 5,000포인트 받으세요!</p>
                    {session ? (
                      <Button variant="secondary" size="lg" disabled>
                        이미 회원이시네요! 👋
                      </Button>
                    ) : (
                      <Link href="/auth/login">
                        <Button variant="secondary" size="lg">
                          회원가입하기
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">오늘만 특가</h3>
                    <p className="text-lg opacity-90">인기 상품 최대 50% 할인!</p>
                    <Button variant="secondary" size="lg">
                      특가상품 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
