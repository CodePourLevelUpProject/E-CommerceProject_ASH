"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Star, Heart, ShoppingCart, Minus, Plus, Share, Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState("")

  const product = {
    id: 1,
    name: "프리미엄 강아지 사료 3kg",
    price: 45000,
    originalPrice: 60000,
    discount: 25,
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    stockCount: 15,
    description:
      "건강한 성견을 위한 프리미엄 사료입니다. 신선한 닭고기와 연어를 주원료로 하여 단백질 함량이 높고, 오메가-3와 오메가-6가 풍부하게 함유되어 있습니다.",
    images: [
      "/premium-dog-food-package-front.jpg",
      "/premium-dog-food-package-back.jpg",
      "/premium-dog-food-kibble-close-up.jpg",
      "/premium-dog-food-ingredients.jpg",
    ],
    options: ["3kg", "7kg", "15kg"],
    features: ["신선한 닭고기 & 연어 주원료", "오메가-3, 오메가-6 풍부", "인공 첨가물 무첨가", "소화 흡수율 95% 이상"],
  }

  const reviews = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    author: `구매자${i + 1}`,
    rating: 4 + Math.random(),
    date: "2024.01.15",
    content: "우리 강아지가 정말 잘 먹어요! 털도 윤기가 나고 건강해 보입니다.",
    images: i % 2 === 0 ? ["/happy-dog-eating.jpg"] : [],
  }))

  const relatedProducts = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 10,
    name: `관련 상품 ${i + 1}`,
    price: Math.floor(Math.random() * 30000 + 20000),
    rating: 4.5,
    image: `/placeholder.svg?height=200&width=200&query=related pet product ${i + 1}`,
  }))

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <span>홈</span> &gt; <span>강아지 용품</span> &gt; <span>사료</span> &gt;{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount}개 리뷰)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Badge className="bg-destructive">{product.discount}% 할인</Badge>
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              </div>
              <p className="text-3xl font-bold text-primary">{product.price.toLocaleString()}원</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">용량 선택</label>
                <Select value={selectedOption} onValueChange={setSelectedOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="용량을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-2">수량</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">재고: {product.stockCount}개</span>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">총 상품금액</span>
                <span className="text-2xl font-bold text-primary">{(product.price * quantity).toLocaleString()}원</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button className="flex-1 h-12">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  장바구니 담기
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="outline" className="w-full h-12 bg-transparent">
                바로 구매하기
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold">주요 특징</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>3만원 이상 무료배송 (일반 2-3일, 당일배송 가능)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% 정품보장</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>7일 무료 교환/반품</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">상품 상세</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="qna">문의</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">상품 설명</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4">영양 성분</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>조단백질</span>
                          <span className="font-medium">28% 이상</span>
                        </div>
                        <div className="flex justify-between">
                          <span>조지방</span>
                          <span className="font-medium">15% 이상</span>
                        </div>
                        <div className="flex justify-between">
                          <span>조섬유</span>
                          <span className="font-medium">4% 이하</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>조회분</span>
                          <span className="font-medium">8% 이하</span>
                        </div>
                        <div className="flex justify-between">
                          <span>수분</span>
                          <span className="font-medium">10% 이하</span>
                        </div>
                        <div className="flex justify-between">
                          <span>칼슘</span>
                          <span className="font-medium">1.2% 이상</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Review Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{product.rating}</div>
                      <div className="flex items-center justify-center space-x-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{product.reviewCount}개 리뷰</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center space-x-2">
                          <span className="text-sm w-8">{star}점</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${Math.random() * 80 + 10}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{Math.floor(Math.random() * 50)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{review.author[0]}</span>
                          </div>
                          <div>
                            <div className="font-medium">{review.author}</div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(review.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{review.content}</p>
                      {review.images.length > 0 && (
                        <div className="flex space-x-2">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image || "/placeholder.svg"}
                              alt="리뷰 이미지"
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qna" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">아직 문의가 없습니다.</p>
                  <Button className="mt-4">문의하기</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">관련 상품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-muted-foreground">(45)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">{product.price.toLocaleString()}원</p>
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
