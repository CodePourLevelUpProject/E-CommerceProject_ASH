"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin, CreditCard, Smartphone, Building, Gift, Truck } from "lucide-react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [usePoints, setUsePoints] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState("")

  const orderItems = [
    {
      id: 1,
      name: "프리미엄 강아지 사료 3kg",
      price: 45000,
      quantity: 2,
      option: "3kg",
      image: "/placeholder.svg?key=order1",
    },
    {
      id: 2,
      name: "고양이 장난감 세트",
      price: 25000,
      quantity: 1,
      option: "기본형",
      image: "/placeholder.svg?key=order2",
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 10000 // 쿠폰 할인
  const pointsUsed = usePoints ? 5000 : 0
  const shippingFee = shippingMethod === "express" ? 5000 : 0
  const total = subtotal - discount - pointsUsed + shippingFee

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>배송지 정보</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">받는 분</Label>
                    <Input id="recipient" placeholder="받는 분 성함" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처</Label>
                    <Input id="phone" placeholder="010-0000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">주소</Label>
                  <div className="flex space-x-2">
                    <Input id="zipcode" placeholder="우편번호" className="w-32" />
                    <Button variant="outline">주소검색</Button>
                  </div>
                  <Input placeholder="기본주소" />
                  <Input placeholder="상세주소" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memo">배송 메모</Label>
                  <Textarea id="memo" placeholder="배송 시 요청사항을 입력해주세요" rows={3} />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="saveAddress" />
                  <Label htmlFor="saveAddress" className="text-sm">
                    기본 배송지로 저장
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>배송 방법</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">일반배송</div>
                          <div className="text-sm text-muted-foreground">2-3일 소요</div>
                        </div>
                        <div className="font-medium">무료</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">당일배송</div>
                          <div className="text-sm text-muted-foreground">오후 6시까지 주문시</div>
                        </div>
                        <div className="font-medium">5,000원</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Coupons & Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5" />
                  <span>할인 혜택</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Selection */}
                <div className="space-y-2">
                  <Label>쿠폰 선택</Label>
                  <Button variant="outline" className="w-full justify-between bg-transparent">
                    <span>10% 할인 쿠폰 적용됨</span>
                    <Badge>-10,000원</Badge>
                  </Button>
                </div>

                {/* Points */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>포인트 사용</Label>
                    <span className="text-sm text-muted-foreground">보유: 5,000P</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="usePoints" checked={usePoints} onCheckedChange={setUsePoints} />
                    <Label htmlFor="usePoints" className="flex-1">
                      5,000포인트 모두 사용 (-5,000원)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>결제 방법</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>신용카드</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>계좌이체</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="kakao" id="kakao" />
                    <Label htmlFor="kakao" className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-400 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-black">K</span>
                      </div>
                      <span>카카오페이</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="naver" id="naver" />
                    <Label htmlFor="naver" className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">N</span>
                      </div>
                      <span>네이버페이</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="toss" id="toss" />
                    <Label htmlFor="toss" className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <span>토스페이</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Agreement */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="agreeAll" />
                    <Label htmlFor="agreeAll" className="font-medium">
                      전체 동의
                    </Label>
                  </div>
                  <Separator />
                  <div className="space-y-2 ml-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreeOrder" />
                      <Label htmlFor="agreeOrder" className="text-sm">
                        주문 내용을 확인했으며, 정보 제공 등에 동의합니다. (필수)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreePayment" />
                      <Label htmlFor="agreePayment" className="text-sm">
                        결제 대행 서비스 약관에 동의합니다. (필수)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreeMarketing" />
                      <Label htmlFor="agreeMarketing" className="text-sm">
                        마케팅 정보 수신에 동의합니다. (선택)
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>주문 상품</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">옵션: {item.option}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-medium">{item.price.toLocaleString()}원</span>
                        <span className="text-xs text-muted-foreground">수량: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>결제 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>상품금액</span>
                    <span>{subtotal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span>쿠폰할인</span>
                    <span>-{discount.toLocaleString()}원</span>
                  </div>
                  {usePoints && (
                    <div className="flex justify-between text-destructive">
                      <span>포인트사용</span>
                      <span>-{pointsUsed.toLocaleString()}원</span>
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
                  <span className="text-primary">{total.toLocaleString()}원</span>
                </div>

                <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                  <p>• 결제 완료 후 주문 취소/변경이 어려우니 신중히 확인해주세요.</p>
                  <p>• 상품별 배송일정이 다를 수 있습니다.</p>
                </div>

                <Button className="w-full h-12 text-lg">{total.toLocaleString()}원 결제하기</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
