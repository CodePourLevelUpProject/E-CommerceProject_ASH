import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Gift } from "lucide-react"

export default function SignupCompletePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">🐾</span>
            </div>
            <span className="font-bold text-2xl text-primary">펫샵</span>
          </div>

          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>

          <CardTitle className="text-2xl">회원가입 완료!</CardTitle>
          <CardDescription>펫샵 가족이 되어주셔서 감사합니다</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Welcome Points */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 space-y-3">
            <div className="flex justify-center">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">웰컴 포인트 지급!</h3>
            <p className="text-3xl font-bold text-primary">5,000 포인트</p>
            <p className="text-sm text-muted-foreground">첫 구매 시 바로 사용하실 수 있습니다</p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h4 className="font-semibold">회원 혜택</h4>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>구매금액의 1% 포인트 적립</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>3만원 이상 구매 시 무료배송</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>회원 전용 할인 쿠폰 제공</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>신상품 및 특가 정보 우선 알림</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full h-12">
              <Link href="/">쇼핑 시작하기</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/mypage">마이페이지 가기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
