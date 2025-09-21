"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Camera, X } from "lucide-react"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reviewData: any) => void
  product: {
    name: string
    image: string
    orderNumber: string
  }
}

export function ReviewModal({ isOpen, onClose, onSubmit, product }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = () => {
    if (rating === 0) {
      alert("별점을 선택해주세요.")
      return
    }
    if (content.trim().length < 10) {
      alert("리뷰 내용을 10자 이상 입력해주세요.")
      return
    }

    onSubmit({
      rating,
      content,
      images,
      productName: product.name,
      orderNumber: product.orderNumber,
    })

    // Reset form
    setRating(0)
    setContent("")
    setImages([])
    onClose()
  }

  const handleImageUpload = () => {
    // Simulate image upload
    if (images.length < 5) {
      setImages([...images, `/placeholder.svg?key=upload${images.length + 1}`])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>리뷰 작성</DialogTitle>
          <DialogDescription>구매하신 상품은 어떠셨나요? 솔직한 리뷰를 남겨주세요.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
            <div className="w-16 h-16 bg-background rounded overflow-hidden flex-shrink-0">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium line-clamp-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground">주문번호: {product.orderNumber}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <label className="text-sm font-medium">별점 평가 *</label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoveredRating(i + 1)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        i < (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {rating > 0 && (
                  <>
                    {rating}점 - {["매우 불만족", "불만족", "보통", "만족", "매우 만족"][rating - 1]}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-3">
            <label className="text-sm font-medium">리뷰 내용 *</label>
            <Textarea
              placeholder="상품에 대한 솔직한 리뷰를 작성해주세요. (최소 10자 이상)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>최소 10자 이상 입력해주세요.</span>
              <span>{content.length}/500</span>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium">사진 첨부 (선택)</label>
            <div className="space-y-3">
              {/* Upload Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleImageUpload}
                disabled={images.length >= 5}
                className="w-full h-20 border-dashed"
              >
                <div className="text-center">
                  <Camera className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-sm">사진 추가 ({images.length}/5)</span>
                </div>
              </Button>

              {/* Uploaded Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-muted rounded overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`업로드된 이미지 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              • 상품과 관련된 사진을 첨부해주세요. • 최대 5장까지 업로드 가능합니다.
            </p>
          </div>

          {/* Reward Info */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">리뷰 작성 혜택</p>
                <p className="text-sm text-muted-foreground">{images.length > 0 ? "포토리뷰" : "일반리뷰"} 작성 시</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{images.length > 0 ? "1,000P" : "500P"}</p>
                <p className="text-xs text-muted-foreground">즉시 적립</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              취소
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              리뷰 등록하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
