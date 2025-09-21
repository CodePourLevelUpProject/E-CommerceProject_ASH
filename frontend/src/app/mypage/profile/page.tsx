"use client"

import { useState } from "react"
import { ArrowLeft, User, Phone, Mail, MapPin, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "김펫샵",
    email: "petlover@example.com",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123, 456호",
  })

  const handleSave = () => {
    // API 호출 로직
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/mypage">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">회원정보 수정</h1>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? "저장" : <Edit className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-5 h-5" />
              개인정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <Button variant="outline" size="sm">
                    인증
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">주소</Label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <Button variant="outline" size="sm">
                    검색
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="mt-6 space-y-3">
            <Button onClick={handleSave} className="w-full bg-emerald-600 hover:bg-emerald-700">
              변경사항 저장
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
