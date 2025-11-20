"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, X, ShoppingBag, Truck, Gift } from "lucide-react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "프리미엄 강아지 사료 3kg",
      price: 45000,
      originalPrice: 60000,
      quantity: 2,
      option: "3kg",
      image: "/placeholder.svg?key=cart1",
      inStock: true,
      selected: true,
    },
    {
      id: 2,
      name: "고양이 장난감 세트",
      price: 25000,
      originalPrice: 35000,
      quantity: 1,
      option: "기본형",
      image: "/placeholder.svg?key=cart2",
      inStock: true,
      selected: true,
    },
    {
      id: 3,
      name: "강아지 목줄 (대형견용)",
      price: 18000,
      originalPrice: 22000,
      quantity: 1,
      option: "블랙",
      image: "/placeholder.svg?key=cart3",
      inStock: false,
      selected: false,
    },
  ])

  const [allSelected, setAllSelected] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const toggleItemSelection = (id: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const toggleAllSelection = () => {
    const newAllSelected = !allSelected
    setAllSelected(newAllSelected)
    setCartItems((items) => items.map((item) => ({ ...item, selected: newAllSelected && item.inStock })))
  }

  const selectedItems = cartItems.filter((item) => item.selected)
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalOriginalPrice = selectedItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const totalDiscount = totalOriginalPrice - totalPrice
  const shippingFee = totalPrice >= 30000 ? 0 : 3000
  const finalPrice = totalPrice + shippingFee

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
            <div>
              <h1 className="text-2xl font-bold mb-2">장바구니가 비어있습니다</h1>
              <p className="text-muted-foreground">원하는 상품을 장바구니에 담아보세요!</p>
            </div>
            <Button asChild size="lg">
              <Link href="/">쇼핑 계속하기</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">장바구니</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Select All */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox checked={allSelected} onCheckedChange={toggleAllSelection} />
                    <span className="font-medium">
                      전체선택 ({selectedItems.length}/{cartItems.filter((item) => item.inStock).length})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const selectedIds = selectedItems.map((item) => item.id)
                      setCartItems((items) => items.filter((item) => !selectedIds.includes(item.id)))
                    }}
                    disabled={selectedItems.length === 0}
                  >
                    선택삭제
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className={!item.inStock ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Checkbox */}
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                        disabled={!item.inStock}
                      />

                      {/* Product Image */}
                      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">옵션: {item.option}</p>
                            {!item.inStock && (
                              <Badge variant="secondary" className="mt-1">
                                품절
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Price */}
                          <div className="space-y-1">
                            {item.originalPrice > item.price && (
                              <p className="text-sm text-muted-foreground line-through">
                                {item.originalPrice.toLocaleString()}원
                              </p>
                            )}
                            <p className="text-lg font-bold text-primary">{item.price.toLocaleString()}원</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || !item.inStock}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Shipping Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="font-medium">배송 정보</span>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>일반배송</span>
                    <span>2-3일</span>
                  </div>
                  <div className="flex justify-between">
                    <span>당일배송</span>
                    <span>오후 6시까지 주문시</span>
                  </div>
                  <div className="text-primary font-medium">3만원 이상 구매시 무료배송</div>
                </div>
              </CardContent>
            </Card>

            {/* Coupon */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-primary" />
                  <span className="font-medium">쿠폰 & 포인트</span>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-between bg-transparent">
                    <span>쿠폰 선택</span>
                    <span className="text-primary">3장 보유</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-between bg-transparent">
                    <span>포인트 사용</span>
                    <span className="text-primary">5,000P 보유</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">결제 예정 금액</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>상품금액</span>
                    <span>{totalOriginalPrice.toLocaleString()}원</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-destructive">
                      <span>할인금액</span>
                      <span>-{totalDiscount.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span>{shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제금액</span>
                  <span className="text-primary">{finalPrice.toLocaleString()}원</span>
                </div>

                {totalPrice < 30000 && (
                  <div className="text-sm text-muted-foreground text-center bg-muted p-3 rounded">
                    {(30000 - totalPrice).toLocaleString()}원 더 구매하면 무료배송!
                  </div>
                )}

                <Button asChild className="w-full h-12" disabled={selectedItems.length === 0}>
                  <Link href="/checkout">주문하기 ({selectedItems.length}개)</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild size="lg">
            <Link href="/">쇼핑 계속하기</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
