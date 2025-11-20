"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Coins, AlertCircle } from "lucide-react"

interface PointsModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (points: number) => void
  availablePoints: number
  orderAmount: number
}

export function PointsModal({ isOpen, onClose, onApply, availablePoints, orderAmount }: PointsModalProps) {
  const [pointsToUse, setPointsToUse] = useState(0)
  const [inputValue, setInputValue] = useState("")

  const maxUsablePoints = Math.min(availablePoints, orderAmount)

  const handleInputChange = (value: string) => {
    const numValue = Number.parseInt(value.replace(/[^0-9]/g, "")) || 0
    setInputValue(value)
    setPointsToUse(Math.min(numValue, maxUsablePoints))
  }

  const handleQuickSelect = (percentage: number) => {
    const points = Math.floor(maxUsablePoints * (percentage / 100))
    setPointsToUse(points)
    setInputValue(points.toString())
  }

  const handleApply = () => {
    onApply(pointsToUse)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>포인트 사용</span>
          </DialogTitle>
          <DialogDescription>보유하신 포인트를 사용해보세요</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Points Info */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">보유 포인트</span>
                <span className="text-lg font-bold text-primary">{availablePoints.toLocaleString()}P</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">사용 가능 포인트</span>
                <span className="font-medium">{maxUsablePoints.toLocaleString()}P</span>
              </div>
            </div>
          </div>

          {/* Points Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="points">사용할 포인트</Label>
              <div className="flex space-x-2">
                <Input
                  id="points"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="0"
                  className="flex-1"
                />
                <Button variant="outline" onClick={() => handleQuickSelect(100)} className="whitespace-nowrap">
                  전액 사용
                </Button>
              </div>
            </div>

            {/* Quick Select Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((percentage) => (
                <Button
                  key={percentage}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickSelect(percentage)}
                  className="text-xs"
                >
                  {percentage}%
                </Button>
              ))}
            </div>
          </div>

          {/* Usage Rules */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">포인트 사용 안내</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• 1포인트 = 1원으로 사용 가능합니다.</p>
              <p>• 주문금액 범위 내에서만 사용 가능합니다.</p>
              <p>• 포인트는 결제 시 즉시 차감됩니다.</p>
              <p>• 주문 취소 시 사용한 포인트는 즉시 복원됩니다.</p>
            </div>
          </div>

          <Separator />

          {/* Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>주문금액</span>
              <span>{orderAmount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-sm text-destructive">
              <span>포인트 사용</span>
              <span>-{pointsToUse.toLocaleString()}원</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>결제예정금액</span>
              <span className="text-primary">{(orderAmount - pointsToUse).toLocaleString()}원</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              취소
            </Button>
            <Button onClick={handleApply} className="flex-1">
              {pointsToUse > 0 ? `${pointsToUse.toLocaleString()}P 사용` : "사용 안함"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
