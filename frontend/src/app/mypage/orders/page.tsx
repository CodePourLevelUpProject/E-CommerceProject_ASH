"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Package, Search, Truck, Star } from "lucide-react"

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const orders = [
    {
      id: "PET240115001",
      date: "2024.01.15",
      status: "배송중",
      statusColor: "blue",
      items: [
        {
          name: "프리미엄 강아지 사료 3kg",
          option: "3kg",
          quantity: 2,
          price: 45000,
          image: "/placeholder.svg?key=order1",
        },
        {
          name: "고양이 장난감 세트",
          option: "기본형",
          quantity: 1,
          price: 25000,
          image: "/placeholder.svg?key=order2",
        },
      ],
      total: 115000,
      shippingInfo: {
        company: "CJ대한통운",
        trackingNumber: "123456789012",
      },
    },
    {
      id: "PET240110002",
      date: "2024.01.10",
      status: "배송완료",
      statusColor: "green",
      items: [
        {
          name: "강아지 목줄 (대형견용)",
          option: "블랙",
          quantity: 1,
          price: 18000,
          image: "/placeholder.svg?key=order3",
        },
        {
          name: "배변패드 100매",
          option: "대형",
          quantity: 1,
          price: 27000,
          image: "/placeholder.svg?key=order4",
        },
      ],
      total: 45000,
      deliveredDate: "2024.01.12",
    },
    {
      id: "PET240105003",
      date: "2024.01.05",
      status: "주문취소",
      statusColor: "gray",
      items: [
        {
          name: "고양이 사료 2kg",
          option: "연어맛",
          quantity: 1,
          price: 35000,
          image: "/placeholder.svg?key=order5",
        },
      ],
      total: 35000,
      cancelReason: "단순변심",
    },
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "배송완료":
        return "default"
      case "배송중":
        return "secondary"
      case "주문취소":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (selectedTab !== "all") {
      const statusMap = {
        pending: "결제완료",
        shipping: "배송중",
        delivered: "배송완료",
        cancelled: "주문취소",
      }
      if (order.status !== statusMap[selectedTab as keyof typeof statusMap]) {
        return false
      }
    }

    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">주문 내역</h1>
          <Button variant="outline" asChild>
            <a href="/mypage">마이페이지로</a>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">주문번호 검색</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="주문번호를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">기간 선택</label>
                <Select defaultValue="3months">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">최근 1개월</SelectItem>
                    <SelectItem value="3months">최근 3개월</SelectItem>
                    <SelectItem value="6months">최근 6개월</SelectItem>
                    <SelectItem value="1year">최근 1년</SelectItem>
                    <SelectItem value="custom">직접 선택</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">주문 상태</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">결제완료</SelectItem>
                    <SelectItem value="shipping">배송중</SelectItem>
                    <SelectItem value="delivered">배송완료</SelectItem>
                    <SelectItem value="cancelled">취소/반품</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">전체 ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">결제완료 (0)</TabsTrigger>
            <TabsTrigger value="shipping">배송중 (1)</TabsTrigger>
            <TabsTrigger value="delivered">배송완료 (1)</TabsTrigger>
            <TabsTrigger value="cancelled">취소/반품 (1)</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">주문 내역이 없습니다</h3>
                <p className="text-muted-foreground mb-6">아직 주문하신 상품이 없어요.</p>
                <Button asChild>
                  <a href="/">쇼핑하러 가기</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{order.date} 주문</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            옵션: {item.option} | 수량: {item.quantity}개
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {(item.price * item.quantity).toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">총 주문금액</span>
                      <span className="text-lg font-bold text-primary">{order.total.toLocaleString()}원</span>
                    </div>

                    {/* Status Specific Info */}
                    {order.status === "배송중" && order.shippingInfo && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Truck className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-900">배송 정보</span>
                        </div>
                        <p className="text-sm text-blue-800">
                          {order.shippingInfo.company} | 운송장번호: {order.shippingInfo.trackingNumber}
                        </p>
                      </div>
                    )}

                    {order.status === "배송완료" && order.deliveredDate && (
                      <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-green-800">{order.deliveredDate}에 배송완료되었습니다.</p>
                      </div>
                    )}

                    {order.status === "주문취소" && order.cancelReason && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-gray-800">취소사유: {order.cancelReason}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        주문상세
                      </Button>

                      {order.status === "배송중" && (
                        <Button variant="outline" size="sm">
                          배송조회
                        </Button>
                      )}

                      {order.status === "배송완료" && (
                        <>
                          <Button size="sm">
                            <Star className="h-4 w-4 mr-1" />
                            리뷰작성
                          </Button>
                          <Button variant="outline" size="sm">
                            재주문
                          </Button>
                        </>
                      )}

                      {order.status === "결제완료" && (
                        <Button variant="destructive" size="sm">
                          주문취소
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                이전
              </Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">다음</Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
