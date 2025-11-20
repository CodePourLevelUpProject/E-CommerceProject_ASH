"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Package, Heart, Gift, Star, CreditCard, MapPin, Bell, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function MyPage() {
  const user = {
    name: "김펫샵",
    email: "petlover@example.com",
    phone: "010-1234-5678",
    membershipLevel: "골드",
    points: 15000,
    nextLevelPoints: 25000,
  }

  const orderStats = {
    pending: 2,
    shipping: 1,
    delivered: 15,
    cancelled: 0,
  }

  const recentOrders = [
    {
      id: "PET240115001",
      date: "2024.01.15",
      status: "배송중",
      items: ["프리미엄 강아지 사료 3kg", "고양이 장난감 세트"],
      total: 70000,
      image: "/placeholder.svg?key=myorder1",
    },
    {
      id: "PET240110002",
      date: "2024.01.10",
      status: "배송완료",
      items: ["강아지 목줄", "배변패드 100매"],
      total: 45000,
      image: "/placeholder.svg?key=myorder2",
    },
  ]

  const membershipProgress = (user.points / user.nextLevelPoints) * 100

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge className="mt-2 bg-yellow-500">{user.membershipLevel} 회원</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Membership Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">멤버십 혜택</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>현재 포인트</span>
                    <span className="font-medium text-primary">{user.points.toLocaleString()}P</span>
                  </div>
                  <Progress value={membershipProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{user.membershipLevel}</span>
                    <span>다이아몬드까지 {(user.nextLevelPoints - user.points).toLocaleString()}P</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                  <p>• 골드 회원: 구매금액의 2% 적립</p>
                  <p>• 다이아몬드 승급 시: 구매금액의 3% 적립</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">빠른 메뉴</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/mypage/profile">
                    <Settings className="h-4 w-4 mr-3" />
                    개인정보 수정
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/mypage/addresses">
                    <MapPin className="h-4 w-4 mr-3" />
                    배송지 관리
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/mypage/payment">
                    <CreditCard className="h-4 w-4 mr-3" />
                    결제수단 관리
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/mypage/notifications">
                    <Bell className="h-4 w-4 mr-3" />
                    알림 설정
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>주문 현황</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/mypage/orders">전체보기</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Package className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{orderStats.pending}</p>
                      <p className="text-sm text-muted-foreground">결제완료</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{orderStats.shipping}</p>
                      <p className="text-sm text-muted-foreground">배송중</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
                      <p className="text-sm text-muted-foreground">배송완료</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-600">{orderStats.cancelled}</p>
                      <p className="text-sm text-muted-foreground">취소/반품</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>최근 주문</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge variant={order.status === "배송완료" ? "default" : "secondary"}>{order.status}</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt="주문 상품"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{order.items[0]}</p>
                        {order.items.length > 1 && (
                          <p className="text-sm text-muted-foreground">외 {order.items.length - 1}개</p>
                        )}
                        <p className="text-sm font-medium text-primary mt-1">{order.total.toLocaleString()}원</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline">
                          주문상세
                        </Button>
                        {order.status === "배송완료" && <Button size="sm">리뷰작성</Button>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Gift className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">쿠폰함</h3>
                  <p className="text-2xl font-bold text-primary mb-1">5장</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/mypage/coupons">관리하기</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">찜한 상품</h3>
                  <p className="text-2xl font-bold text-red-500 mb-1">12개</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/mypage/wishlist">보러가기</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">내 리뷰</h3>
                  <p className="text-2xl font-bold text-yellow-500 mb-1">8개</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/mypage/reviews">관리하기</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
