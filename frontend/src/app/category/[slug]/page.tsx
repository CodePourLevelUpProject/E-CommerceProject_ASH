"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingCart, Grid, List } from "lucide-react"

export default function CategoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")

  const category = {
    name: "강아지 용품",
    description: "건강하고 행복한 강아지를 위한 모든 용품을 만나보세요",
    subCategories: [
      { id: "all", name: "전체", count: 156 },
      { id: "food", name: "사료", count: 45 },
      { id: "treats", name: "간식", count: 32 },
      { id: "toys", name: "장난감", count: 28 },
      { id: "accessories", name: "용품", count: 51 },
    ],
  }

  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `강아지 ${["사료", "간식", "장난감", "목줄", "집"][i % 5]} ${i + 1}`,
    price: Math.floor(Math.random() * 50000 + 10000),
    originalPrice: Math.floor(Math.random() * 20000 + 60000),
    rating: 4.0 + Math.random(),
    reviewCount: Math.floor(Math.random() * 200 + 20),
    discount: Math.floor(Math.random() * 40 + 5),
    inStock: Math.random() > 0.1,
    isNew: Math.random() > 0.7,
    isBest: Math.random() > 0.8,
    image: `/placeholder.svg?height=200&width=200&query=dog ${["food", "treat", "toy", "leash", "house"][i % 5]} ${i + 1}`,
  }))

  const filteredProducts =
    selectedSubCategory === "all"
      ? products
      : products.filter((_, i) => {
          const categoryMap = { food: 0, treats: 1, toys: 2, accessories: 3 }
          return i % 5 === categoryMap[selectedSubCategory as keyof typeof categoryMap]
        })

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
        </div>

        {/* Category Banner */}
        <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">강아지 전용 특가</h2>
              <p className="text-muted-foreground mb-6">
                프리미엄 브랜드 사료부터 재미있는 장난감까지
                <br />
                최대 50% 할인된 가격으로 만나보세요!
              </p>
              <Button size="lg">특가 상품 보기</Button>
            </div>
            <div className="flex justify-center">
              <img src="/happy-dog-with-toys-and-food.jpg" alt="강아지와 용품들" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Sub Categories */}
        <Tabs value={selectedSubCategory} onValueChange={setSelectedSubCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            {category.subCategories.map((subCat) => (
              <TabsTrigger key={subCat.id} value={subCat.id} className="flex flex-col">
                <span>{subCat.name}</span>
                <span className="text-xs text-muted-foreground">({subCat.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Products Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {category.subCategories.find((cat) => cat.id === selectedSubCategory)?.name} 상품
            </h2>
            <p className="text-muted-foreground">총 {filteredProducts.length}개의 상품</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <Select defaultValue="popular">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="price-low">낮은 가격순</SelectItem>
                <SelectItem value="price-high">높은 가격순</SelectItem>
                <SelectItem value="rating">평점순</SelectItem>
                <SelectItem value="newest">최신순</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" : "space-y-4 mb-12"
          }
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group cursor-pointer hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
            >
              <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className={`object-cover ${
                      viewMode === "list" ? "w-full h-32" : "w-full h-48"
                    } rounded-t-lg ${viewMode === "list" ? "rounded-r-none rounded-l-lg" : ""}`}
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-y-1">
                    {product.isNew && <Badge className="bg-green-500">NEW</Badge>}
                    {product.isBest && <Badge className="bg-orange-500">BEST</Badge>}
                    {product.discount > 0 && <Badge className="bg-destructive">{product.discount}% 할인</Badge>}
                    {!product.inStock && <Badge className="bg-muted-foreground">품절</Badge>}
                  </div>

                  <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className={`p-4 space-y-2 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <h3 className="font-medium line-clamp-2">{product.name}</h3>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-3 w-3 ${
                          j < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                  </div>

                  <div className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}>
                    <div className="space-y-1">
                      {product.originalPrice > product.price && (
                        <p className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString()}원
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary">{product.price.toLocaleString()}원</p>
                    </div>

                    <Button size="sm" disabled={!product.inStock}>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.inStock ? "담기" : "품절"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
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
      </main>

      <Footer />
    </div>
  )
}
