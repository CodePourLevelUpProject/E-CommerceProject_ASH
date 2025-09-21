"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PhoneVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: () => void
  phoneNumber?: string
}

export function PhoneVerificationModal({ isOpen, onClose, onVerified, phoneNumber = "" }: PhoneVerificationModalProps) {
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [phone, setPhone] = useState(phoneNumber)
  const [verificationCode, setVerificationCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleSendCode = async () => {
    if (!phone) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setStep("code")
    setTimeLeft(180) // 3 minutes
  }

  const handleVerifyCode = async () => {
    if (!verificationCode) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Simulate success
    if (verificationCode === "123456") {
      onVerified()
      onClose()
    } else {
      alert("인증번호가 올바르지 않습니다.")
    }
  }

  const handleResendCode = () => {
    setTimeLeft(180)
    // Simulate resend API call
    console.log("Resending verification code to:", phone)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>전화번호 인증</DialogTitle>
          <DialogDescription>
            {step === "phone" ? "전화번호를 입력하고 인증번호를 받아주세요" : "전송된 인증번호를 입력해주세요"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === "phone" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button onClick={handleSendCode} className="w-full" disabled={!phone || isLoading}>
                {isLoading ? "전송 중..." : "인증번호 전송"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="code">인증번호</Label>
                <div className="flex space-x-2">
                  <Input
                    id="code"
                    placeholder="6자리 인증번호"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                  <Button variant="outline" onClick={handleResendCode} disabled={timeLeft > 0}>
                    재전송
                  </Button>
                </div>
                {timeLeft > 0 && <p className="text-sm text-muted-foreground">남은 시간: {formatTime(timeLeft)}</p>}
              </div>

              <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                <p>📱 {phone}로 인증번호를 전송했습니다.</p>
                <p className="mt-1">
                  테스트용 인증번호: <strong>123456</strong>
                </p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep("phone")} className="flex-1">
                  이전
                </Button>
                <Button onClick={handleVerifyCode} className="flex-1" disabled={!verificationCode || isLoading}>
                  {isLoading ? "확인 중..." : "인증 완료"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
