"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Edit, Trash2 } from "lucide-react"

export default function ReviewsPage() {
  const [selectedTab, setSelectedTab] = useState("written")

  const writtenReviews = [
    {
      id: 1,
      productName: "프리미엄 강아지 사료 3kg",
      productImage: "/placeholder.svg?key=review1",
      rating: 5,
      content: "우리 강아지가 정말 잘 먹어요! 털도 윤기가 나고 건강해 보입니다. 다음에도 재구매할 예정입니다.",
      date: "2024.01.10",
      images: ["/placeholder.svg?key=reviewimg1", "/placeholder.svg?key=reviewimg2"],
      helpful: 12,
      orderNumber: "PET240105001",
    },
    {
      id: 2,
      productName: "고양이 장난감 세트",
      productImage: "/placeholder.svg?key=review2",
      rating: 4,
      content: "고양이가 좋아해요. 특히 깃털 장난감을 제일 좋아합니다. 다만 내구성이 조금 아쉬워요.",
      date: "2024.01.08",
      images: [],
      helpful: 8,
      orderNumber: "PET240103002",
    },
  ]

  const pendingReviews = [
    {
      id: 3,
      productName: "강아지 목줄 (대형견용)",
      productImage: "/placeholder.svg?key=review3",
      orderNumber: "PET240110002",
      orderDate: "2024.01.10",
      deliveredDate: "2024.01.12",
    },
    {
      id: 4,
      productName: "배변패드 100매",
      productImage: "/placeholder.svg?key=review4",
      orderNumber: "PET240110002",
      orderDate: "2024.01.10",
      deliveredDate: "2024.01.12",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">내 리뷰</h1>
          <Button variant="outline" asChild>
            <a href="/mypage">마이페이지로</a>
          </Button>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{writtenReviews.length}</div>
              <p className="text-muted-foreground">작성한 리뷰</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">{pendingReviews.length}</div>
              <p className="text-muted-foreground">작성 가능한 리뷰</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {writtenReviews.reduce((sum, review) => sum + review.helpful, 0)}
              </div>
              <p className="text-muted-foreground">받은 도움이 돼요</p>
            </CardContent>
          </Card>
        </div>

        {/* Review Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="written">작성한 리뷰 ({writtenReviews.length})</TabsTrigger>
            <TabsTrigger value="pending">작성 가능한 리뷰 ({pendingReviews.length})</TabsTrigger>
          </TabsList>

          {/* Written Reviews */}
          <TabsContent value="written" className="mt-6">
            <div className="space-y-6">
              {writtenReviews.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">작성한 리뷰가 없습니다</h3>
                    <p className="text-muted-foreground">구매하신 상품의 리뷰를 작성해보세요!</p>
                  </CardContent>
                </Card>
              ) : (
                writtenReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={review.productImage || "/placeholder.svg"}
                            alt={review.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Review Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{review.productName}</h3>
                              <p className="text-xs text-muted-foreground">주문번호: {review.orderNumber}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>

                          {/* Review Text */}
                          <p className="text-sm leading-relaxed">{review.content}</p>

                          {/* Review Images */}
                          {review.images.length > 0 && (
                            <div className="flex space-x-2">
                              {review.images.map((image, index) => (
                                <div key={index} className="w-16 h-16 bg-muted rounded overflow-hidden">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`리뷰 이미지 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Helpful Count */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <Badge variant="secondary" className="text-xs">
                              도움이 돼요 {review.helpful}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Pending Reviews */}
          <TabsContent value="pending" className="mt-6">
            <div className="space-y-6">
              {pendingReviews.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">작성 가능한 리뷰가 없습니다</h3>
                    <p className="text-muted-foreground">배송완료된 상품이 있으면 리뷰를 작성할 수 있어요!</p>
                  </CardContent>
                </Card>
              ) : (
                pendingReviews.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium">{item.productName}</h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>주문번호: {item.orderNumber}</p>
                            <p>주문일: {item.orderDate}</p>
                            <p>배송완료: {item.deliveredDate}</p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-col space-y-2">
                          <Button className="whitespace-nowrap">
                            <Star className="h-4 w-4 mr-1" />
                            리뷰 작성
                          </Button>
                          <p className="text-xs text-center text-muted-foreground">+500P 적립</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
