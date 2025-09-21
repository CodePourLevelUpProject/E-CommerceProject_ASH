import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Gift, Star } from "lucide-react"

export default function CheckoutCompletePage() {
  const orderInfo = {
    orderNumber: "PET240115001",
    orderDate: "2024.01.15 14:30",
    totalAmount: 100000,
    paymentMethod: "신용카드",
    deliveryDate: "2024.01.17 (수)",
  }

  const orderItems = [
    {
      id: 1,
      name: "프리미엄 강아지 사료 3kg",
      price: 45000,
      quantity: 2,
      image: "/placeholder.svg?key=complete1",
    },
    {
      id: 2,
      name: "고양이 장난감 세트",
      price: 25000,
      quantity: 1,
      image: "/placeholder.svg?key=complete2",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-20 w-20 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">주문이 완료되었습니다!</h1>
            <p className="text-muted-foreground">주문해 주셔서 감사합니다. 빠른 시일 내에 배송해드리겠습니다.</p>
          </div>

          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>주문 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">주문번호</span>
                  <p className="font-medium">{orderInfo.orderNumber}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">주문일시</span>
                  <p className="font-medium">{orderInfo.orderDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">결제금액</span>
                  <p className="font-medium text-primary">{orderInfo.totalAmount.toLocaleString()}원</p>
                </div>
                <div>
                  <span className="text-muted-foreground">결제방법</span>
                  <p className="font-medium">{orderInfo.paymentMethod}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">배송 예정일</p>
                    <p className="text-sm text-muted-foreground">일반배송</p>
                  </div>
                </div>
                <Badge className="bg-primary">{orderInfo.deliveryDate}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>주문 상품</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-muted-foreground">수량: {item.quantity}개</span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>적립 혜택</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">구매 적립 포인트</p>
                    <p className="text-sm text-muted-foreground">구매금액의 1% 적립</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">1,000P</p>
                    <p className="text-xs text-muted-foreground">배송완료 후 지급</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>• 포인트는 배송완료 후 자동으로 적립됩니다.</p>
                <p>• 적립된 포인트는 다음 구매 시 현금처럼 사용 가능합니다.</p>
              </div>
            </CardContent>
          </Card>

          {/* Review Invitation */}
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <Star className="h-12 w-12 text-yellow-400 mx-auto" />
              <div>
                <h3 className="font-semibold mb-2">상품은 어떠셨나요?</h3>
                <p className="text-sm text-muted-foreground">리뷰를 작성하시면 추가 포인트를 드립니다!</p>
              </div>
              <Button variant="outline">리뷰 작성하고 500P 받기</Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link href="/mypage/orders">주문 내역 보기</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/">쇼핑 계속하기</Link>
            </Button>
          </div>

          {/* Customer Service */}
          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">주문 관련 문의사항이 있으시면 고객센터로 연락주세요.</p>
              <p className="font-medium">📞 1588-1234 (평일 09:00-18:00)</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
