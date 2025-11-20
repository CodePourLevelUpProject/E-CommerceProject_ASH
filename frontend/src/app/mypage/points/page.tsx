"use client"

import { ArrowLeft, Plus, Minus, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const pointHistory = [
  {
    id: 1,
    type: "earned",
    amount: 5000,
    description: "신규가입 축하 포인트",
    date: "2024-12-01",
    orderId: null,
  },
  {
    id: 2,
    type: "earned",
    amount: 1500,
    description: "상품 구매 적립",
    date: "2024-11-28",
    orderId: "20241128001",
  },
  {
    id: 3,
    type: "used",
    amount: -2000,
    description: "주문 시 포인트 사용",
    date: "2024-11-25",
    orderId: "20241125002",
  },
  {
    id: 4,
    type: "earned",
    amount: 800,
    description: "리뷰 작성 포인트",
    date: "2024-11-20",
    orderId: null,
  },
]

const currentPoints = 5300

export default function PointsPage() {
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
            <h1 className="text-lg font-semibold">포인트 내역</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 현재 포인트 */}
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="w-6 h-6" />
              <h2 className="text-lg font-semibold">보유 포인트</h2>
            </div>
            <p className="text-3xl font-bold">{currentPoints.toLocaleString()}P</p>
            <p className="text-sm opacity-90 mt-1">1P = 1원으로 사용 가능</p>
          </CardContent>
        </Card>

        {/* 포인트 적립 안내 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">포인트 적립 안내</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">상품 구매</span>
              <span>구매금액의 1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">리뷰 작성</span>
              <span>500P</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">사진 리뷰</span>
              <span>800P</span>
            </div>
          </CardContent>
        </Card>

        {/* 포인트 내역 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">포인트 내역</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pointHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === "earned" ? "bg-blue-100" : "bg-red-100"
                    }`}
                  >
                    {item.type === "earned" ? (
                      <Plus className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Minus className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                    {item.orderId && <p className="text-xs text-gray-400">주문번호: {item.orderId}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${item.type === "earned" ? "text-blue-600" : "text-red-600"}`}>
                    {item.amount > 0 ? "+" : ""}
                    {item.amount.toLocaleString()}P
                  </p>
                  <Badge variant={item.type === "earned" ? "default" : "secondary"}>
                    {item.type === "earned" ? "적립" : "사용"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
