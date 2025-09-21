"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from "lucide-react"

interface LoginRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  message = "이 기능을 사용하려면 로그인이 필요합니다.",
}: LoginRequiredModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle>로그인이 필요합니다</DialogTitle>
          <DialogDescription className="text-center">{message}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-6">
          <Button asChild className="w-full">
            <Link href="/auth/login">로그인하기</Link>
          </Button>
          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/auth/signup">회원가입하기</Link>
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            취소
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
