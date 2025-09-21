"use client"

import { useState } from "react"
import { ArrowLeft, Ticket, Calendar, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const coupons = {
  available: [
    {
      id: 1,
      name: "신규회원 환영 쿠폰",
      discount: "5,000원",
      minAmount: 30000,
      expiryDate: "2024-12-31",
      type: "amount",
    },
    {
      id: 2,
      name: "강아지 사료 10% 할인",
      discount: "10%",
      minAmount: 20000,
      expiryDate: "2024-12-25",
      type: "percent",
    },
  ],
  used: [
    {
      id: 3,
      name: "첫 구매 할인 쿠폰",
      discount: "3,000원",
      minAmount: 15000,
      usedDate: "2024-11-15",
      type: "amount",
    },
  ],
  expired: [
    {
      id: 4,
      name: "블랙프라이데이 특가",
      discount: "15%",
      minAmount: 50000,
      expiryDate: "2024-11-30",
      type: "percent",
    },
  ],
}

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState("available")

  const CouponCard = ({ coupon, status }: { coupon: any; status: string }) => (
    <Card className={`${status === "expired" ? "opacity-50" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              {coupon.type === "percent" ? (
                <Percent className="w-5 h-5 text-emerald-600" />
              ) : (
                <Ticket className="w-5 h-5 text-emerald-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm">{coupon.name}</h3>
              <p className="text-xs text-gray-500">{coupon.minAmount.toLocaleString()}원 이상 구매시</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-600">{coupon.discount}</p>
            <Badge variant={status === "available" ? "default" : "secondary"}>
              {status === "available" ? "사용가능" : status === "used" ? "사용완료" : "만료"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          {status === "used" ? `사용일: ${coupon.usedDate}` : `만료일: ${coupon.expiryDate}`}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/mypage">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">쿠폰함</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">사용가능 ({coupons.available.length})</TabsTrigger>
            <TabsTrigger value="used">사용완료 ({coupons.used.length})</TabsTrigger>
            <TabsTrigger value="expired">만료 ({coupons.expired.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-3 mt-4">
            {coupons.available.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} status="available" />
            ))}
          </TabsContent>

          <TabsContent value="used" className="space-y-3 mt-4">
            {coupons.used.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} status="used" />
            ))}
          </TabsContent>

          <TabsContent value="expired" className="space-y-3 mt-4">
            {coupons.expired.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} status="expired" />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
