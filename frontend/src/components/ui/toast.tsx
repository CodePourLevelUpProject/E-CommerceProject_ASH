"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X, AlertTriangle, Info } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
  onClose: () => void
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: CheckCircle,
    error: X,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }

  const Icon = icons[type]

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[300px] animate-in slide-in-from-top-2`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-sm">{message}</span>
      <button onClick={onClose} className="ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Toast 관리를 위한 훅
export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{
      id: number
      message: string
      type: "success" | "error" | "warning" | "info"
    }>
  >([])

  const showToast = (message: string, type: "success" | "error" | "warning" | "info") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    showToast,
    removeToast,
    success: (message: string) => showToast(message, "success"),
    error: (message: string) => showToast(message, "error"),
    warning: (message: string) => showToast(message, "warning"),
    info: (message: string) => showToast(message, "info"),
  }
}
