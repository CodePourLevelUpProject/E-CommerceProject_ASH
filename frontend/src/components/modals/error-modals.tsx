"use client"

import { AlertTriangle, X, RefreshCw, Phone, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  onRetry?: () => void
}

export function StockOutModal({ isOpen, onClose }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-5 h-5" />
            재고 부족
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            죄송합니다. 선택하신 상품의 재고가 부족합니다. 다른 상품을 선택해주세요.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              다른 상품 보기
            </Button>
            <Button onClick={onClose} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PaymentFailedModal({ isOpen, onClose, onRetry }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <X className="w-5 h-5" />
            결제 실패
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">결제 처리 중 오류가 발생했습니다.</p>
            <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-1">
              <p>
                <strong>실패 사유:</strong> 카드 한도 초과
              </p>
              <p>
                <strong>결제 금액:</strong> 45,000원
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              취소
            </Button>
            <Button onClick={onRetry} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              재시도
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PhoneVerificationFailedModal({ isOpen, onClose, onRetry }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Phone className="w-5 h-5" />
            인증 실패
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">인증번호가 일치하지 않습니다. 다시 확인해주세요.</p>
          <div className="bg-yellow-50 p-3 rounded-lg text-xs">
            <p className="text-yellow-800">
              • 인증번호는 3분 내에 입력해주세요
              <br />• 인증번호가 오지 않으면 재발송을 눌러주세요
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onRetry} className="flex-1 bg-transparent">
              재발송
            </Button>
            <Button onClick={onClose} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              다시 입력
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CouponUnavailableModal({ isOpen, onClose }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <Ticket className="w-5 h-5" />
            쿠폰 사용 불가
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">선택하신 쿠폰은 현재 주문에 사용할 수 없습니다.</p>
          <div className="bg-orange-50 p-3 rounded-lg text-xs space-y-1">
            <p className="text-orange-800">
              <strong>사용 조건:</strong>
            </p>
            <p className="text-orange-700">• 최소 주문금액: 30,000원 이상</p>
            <p className="text-orange-700">• 현재 주문금액: 25,000원</p>
          </div>
          <Button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-700">
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
