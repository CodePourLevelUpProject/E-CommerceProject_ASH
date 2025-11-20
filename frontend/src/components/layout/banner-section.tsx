"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const banners = [
  {
    id: 1,
    title: "신규회원 특가",
    subtitle: "첫 구매 시 5,000원 할인쿠폰",
    image: "/happy-dog-and-cat-with-pet-supplies.jpg",
    bgColor: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  },
  {
    id: 2,
    title: "프리미엄 사료 특가",
    subtitle: "건강한 우리 아이를 위한 선택",
    image: "/pet-product-display.png",
    bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  {
    id: 3,
    title: "겨울 용품 할인",
    subtitle: "따뜻한 겨울나기 준비",
    image: "/happy-dog-with-toys-and-food.jpg",
    bgColor: "bg-gradient-to-r from-orange-400 to-orange-600",
  },
]

export function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  return (
    <div className="relative h-48 overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-full h-full ${banner.bgColor} relative flex items-center justify-between px-6`}
          >
            <div className="text-white z-10">
              <h2 className="text-xl font-bold mb-2">{banner.title}</h2>
              <p className="text-sm opacity-90 mb-4">{banner.subtitle}</p>
              <Button variant="secondary" size="sm">
                자세히 보기
              </Button>
            </div>
            <div className="relative w-32 h-32">
              <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
