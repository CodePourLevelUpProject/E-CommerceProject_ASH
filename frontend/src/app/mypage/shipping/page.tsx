"use client"

import { useState } from "react"
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const shippingData = [
  {
    id: "20241201001",
    productName: "프리미엄 강아지 사료 3kg",
    orderDate: "2024-12-01",
    status: "delivered",
    trackingNumber: "CJ1234567890",
    steps: [
      { status: "ordered", date: "2024-12-01 10:30", completed: true },
      { status: "preparing", date: "2024-12-01 14:20", completed: true },
      { status: "shipped", date: "2024-12-02 09:15", completed: true },
      { status: "delivered", date: "2024-12-03 16:45", completed: true },
    ],
  },
  {
    id: "20241130002",
    productName: "고양이 장난감 세트",
    orderDate: "2024-11-30",
    status: "shipped",
    trackingNumber: "CJ0987654321",
    steps: [
      { status: "ordered", date: "2024-11-30 15:20", completed: true },
      { status: "preparing", date: "2024-12-01 11:30", completed: true },
      { status: "shipped", date: "2024-12-02 08:45", completed: true },
      { status: "delivered", date: "", completed: false },
    ],
  },
]

const statusConfig = {
  ordered: { label: "주문접수", icon: Package, color: "bg-blue-500" },
  preparing: { label: "상품준비중", icon: Clock, color: "bg-yellow-500" },
  shipped: { label: "배송중", icon: Truck, color: "bg-orange-500" },
  delivered: { label: "배송완료", icon: CheckCircle, color: "bg-green-500" },
}

export default function ShippingPage() {
  const [selectedOrder, setSelectedOrder] = useState(shippingData[0])

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
            <h1 className="text-lg font-semibold">배송 조회</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 주문 목록 */}
        <div className="space-y-3">
          {shippingData.map((order) => (
            <Card
              key={order.id}
              className={`cursor-pointer transition-colors ${
                selectedOrder.id === order.id ? "ring-2 ring-emerald-500" : ""
              }`}
              onClick={() => setSelectedOrder(order)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">{order.productName}</p>
                    <p className="text-xs text-gray-500">주문번호: {order.id}</p>
                  </div>
                  <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                    {statusConfig[order.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">운송장번호: {order.trackingNumber}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 배송 상태 추적 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">배송 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedOrder.steps.map((step, index) => {
              const config = statusConfig[step.status as keyof typeof statusConfig]
              const Icon = config.icon

              return (
                <div key={step.status} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? config.color : "bg-gray-200"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${step.completed ? "text-white" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${step.completed ? "text-gray-900" : "text-gray-400"}`}>
                      {config.label}
                    </p>
                    {step.date && <p className="text-xs text-gray-500">{step.date}</p>}
                  </div>
                  {step.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* 배송 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">배송 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">택배사</span>
              <span>CJ대한통운</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">운송장번호</span>
              <span>{selectedOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">배송지</span>
              <span>서울시 강남구 테헤란로 123</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
