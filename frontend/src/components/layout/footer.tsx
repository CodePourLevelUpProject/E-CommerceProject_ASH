import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🐾</span>
              </div>
              <span className="font-bold text-xl text-primary">펫샵</span>
            </div>
            <p className="text-sm text-muted-foreground">
              반려동물과 함께하는 행복한 일상을 위한
              <br />
              최고의 용품을 제공합니다.
            </p>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">고객센터</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📞 1588-1234</p>
              <p>⏰ 평일 09:00 - 18:00</p>
              <p>📧 help@petshop.co.kr</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">바로가기</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                회사소개
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-primary transition-colors">
                자주묻는질문
              </Link>
            </div>
          </div>

          {/* Social & Payment */}
          <div className="space-y-4">
            <h3 className="font-semibold">소셜 & 결제</h3>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-sm font-bold">K</div>
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-sm font-bold">
                N
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
                F
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>신용카드, 계좌이체, 카카오페이</p>
              <p>네이버페이, 토스페이 결제 가능</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-xs text-muted-foreground">
          <p>© 2024 펫샵. All rights reserved.</p>
          <p className="mt-1">사업자등록번호: 123-45-67890 | 통신판매업신고: 2024-서울강남-1234</p>
        </div>
      </div>
    </footer>
  )
}
