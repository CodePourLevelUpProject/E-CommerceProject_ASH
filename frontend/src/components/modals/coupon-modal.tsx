"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Gift, Calendar, Tag } from "lucide-react"

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (couponId: string) => void
  orderAmount: number
}

export function CouponModal({ isOpen, onClose, onApply, orderAmount }: CouponModalProps) {
  const [selectedCoupon, setSelectedCoupon] = useState("")

  const coupons = [
    {
      id: "welcome",
      name: "신규회원 10% 할인",
      discount: Math.floor(orderAmount * 0.1),
      discountType: "percent",
      discountValue: 10,
      minAmount: 30000,
      maxDiscount: 15000,
      expiryDate: "2024.02.15",
      isUsable: orderAmount >= 30000,
    },
    {
      id: "fixed5000",
      name: "5천원 할인 쿠폰",
      discount: 5000,
      discountType: "fixed",
      discountValue: 5000,
      minAmount: 20000,
      maxDiscount: 5000,
      expiryDate: "2024.01.31",
      isUsable: orderAmount >= 20000,
    },
    {
      id: "shipping",
      name: "무료배송 쿠폰",
      discount: 3000,
      discountType: "shipping",
      discountValue: 3000,
      minAmount: 0,
      maxDiscount: 3000,
      expiryDate: "2024.03.01",
      isUsable: true,
    },
    {
      id: "expired",
      name: "15% 할인 쿠폰",
      discount: 0,
      discountType: "percent",
      discountValue: 15,
      minAmount: 50000,
      maxDiscount: 20000,
      expiryDate: "2024.01.10",
      isUsable: false,
      isExpired: true,
    },
  ]

  const usableCoupons = coupons.filter((coupon) => coupon.isUsable && !coupon.isExpired)
  const unusableCoupons = coupons.filter((coupon) => !coupon.isUsable || coupon.isExpired)

  const handleApply = () => {
    if (selectedCoupon) {
      onApply(selectedCoupon)
      onClose()
    }
  }

  const formatDiscountText = (coupon: any) => {
    if (coupon.discountType === "percent") {
      return `${coupon.discountValue}% 할인 (최대 ${coupon.maxDiscount.toLocaleString()}원)`
    } else if (coupon.discountType === "shipping") {
      return "무료배송"
    } else {
      return `${coupon.discountValue.toLocaleString()}원 할인`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5" />
            <span>쿠폰 선택</span>
          </DialogTitle>
          <DialogDescription>사용 가능한 쿠폰을 선택해주세요</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Amount Info */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">주문금액</span>
              <span className="font-medium">{orderAmount.toLocaleString()}원</span>
            </div>
          </div>

          {/* Usable Coupons */}
          {usableCoupons.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">사용 가능한 쿠폰 ({usableCoupons.length}장)</h3>
              <RadioGroup value={selectedCoupon} onValueChange={setSelectedCoupon}>
                <div className="space-y-3">
                  {usableCoupons.map((coupon) => (
                    <div key={coupon.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={coupon.id} id={coupon.id} className="mt-1" />
                        <Label htmlFor={coupon.id} className="flex-1 cursor-pointer">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{coupon.name}</h4>
                              <Badge className="bg-primary">-{coupon.discount.toLocaleString()}원</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{formatDiscountText(coupon)}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Tag className="h-3 w-3" />
                                <span>최소 {coupon.minAmount.toLocaleString()}원 이상</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{coupon.expiryDate}까지</span>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Unusable Coupons */}
          {unusableCoupons.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-muted-foreground">사용 불가능한 쿠폰 ({unusableCoupons.length}장)</h3>
                <div className="space-y-3">
                  {unusableCoupons.map((coupon) => (
                    <div key={coupon.id} className="border rounded-lg p-4 opacity-50">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{coupon.name}</h4>
                          <Badge variant="secondary">{coupon.isExpired ? "만료됨" : "조건 미충족"}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDiscountText(coupon)}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Tag className="h-3 w-3" />
                            <span>최소 {coupon.minAmount.toLocaleString()}원 이상</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{coupon.expiryDate}까지</span>
                          </div>
                        </div>
                        {!coupon.isExpired && (
                          <p className="text-xs text-destructive">
                            {(coupon.minAmount - orderAmount).toLocaleString()}원 더 구매하면 사용 가능
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              취소
            </Button>
            <Button onClick={handleApply} disabled={!selectedCoupon} className="flex-1">
              적용하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
