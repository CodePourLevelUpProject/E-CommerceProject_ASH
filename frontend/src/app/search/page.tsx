"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Heart, ShoppingCart, Filter, Grid, List } from "lucide-react"

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const categories = ["강아지 사료", "고양이 사료", "간식", "장난감", "용품"]
  const brands = ["로얄캐닌", "힐스", "오리젠", "아카나", "네츄럴발란스"]

  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `프리미엄 강아지 사료 ${i + 1}kg`,
    price: Math.floor(Math.random() * 50000 + 20000),
    originalPrice: Math.floor(Math.random() * 20000 + 60000),
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 200 + 50),
    discount: Math.floor(Math.random() * 30 + 10),
    inStock: Math.random() > 0.1,
    image: `/placeholder.svg?height=200&width=200&query=pet food ${i + 1}`,
  }))

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="flex items-center space-x-2 lg:hidden">
              <Filter className="h-5 w-5" />
              <span className="font-semibold">필터</span>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-semibold">가격대</h3>
              <div className="space-y-4">
                <Slider value={priceRange} onValueChange={setPriceRange} max={100000} step={1000} className="w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span>{priceRange[0].toLocaleString()}원</span>
                  <span>{priceRange[1].toLocaleString()}원</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold">카테고리</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-4">
              <h3 className="font-semibold">브랜드</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <Label htmlFor={brand} className="text-sm">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="space-y-4">
              <h3 className="font-semibold">재고 상태</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="inStock" />
                  <Label htmlFor="inStock" className="text-sm">
                    재고 있음
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="onSale" />
                  <Label htmlFor="onSale" className="text-sm">
                    할인 중
                  </Label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">검색 결과</h1>
                <p className="text-muted-foreground">총 {products.length}개의 상품</p>
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

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`group cursor-pointer hover:shadow-lg transition-shadow ${
                    viewMode === "list" ? "flex" : ""
                  }`}
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
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-destructive">{product.discount}% 할인</Badge>
                      )}
                      {!product.inStock && <Badge className="absolute top-2 left-2 bg-muted-foreground">품절</Badge>}
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

                      <div
                        className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}
                      >
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
            <div className="flex justify-center mt-12">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
