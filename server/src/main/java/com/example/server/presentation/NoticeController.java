package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notices")
@Tag(name = "공지사항", description = "공지사항 및 게시판 API")
public class NoticeController {

    @Operation(summary = "공지사항 목록", description = "공지사항 목록 조회")
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getNotices() {
        return ResponseEntity.ok(List.of(
                Map.of("noticeId", 1, "title", "시스템 점검 안내", "content", "9월 15일 새벽 2시~4시 시스템 점검 예정", "createdAt", "2024-09-14", "isImportant", true),
                Map.of("noticeId", 2, "title", "신상품 출시 안내", "content", "새로운 강아지 사료가 출시되었습니다", "createdAt", "2024-09-13", "isImportant", false),
                Map.of("noticeId", 3, "title", "배송 정책 변경", "content", "무료배송 기준이 3만원으로 변경됩니다", "createdAt", "2024-09-12", "isImportant", true)
        ));
    }

    @Operation(summary = "공지사항 상세", description = "특정 공지사항 상세 조회")
    @GetMapping("/{noticeId}")
    public ResponseEntity<Map<String, Object>> getNoticeDetail(@PathVariable Long noticeId) {
        return ResponseEntity.ok(Map.of(
                "noticeId", noticeId,
                "title", "시스템 점검 안내",
                "content", "안녕하세요. 더 나은 서비스 제공을 위해 시스템 점검을 실시합니다.\n\n점검 시간: 9월 15일 새벽 2시~4시\n점검 내용: 서버 업그레이드 및 보안 패치\n\n점검 시간 동안 서비스 이용이 불가능합니다.\n이용에 불편을 드려 죄송합니다.",
                "createdAt", "2024-09-14",
                "viewCount", 1250,
                "isImportant", true
        ));
    }

    @Operation(summary = "FAQ 목록", description = "자주 묻는 질문 목록")
    @GetMapping("/faq")
    public ResponseEntity<List<Map<String, Object>>> getFAQ() {
        return ResponseEntity.ok(List.of(
                Map.of("faqId", 1, "category", "배송", "question", "배송은 얼마나 걸리나요?", "answer", "주문 후 1-2일 내 배송됩니다."),
                Map.of("faqId", 2, "category", "결제", "question", "어떤 결제 방법을 사용할 수 있나요?", "answer", "신용카드, 카카오페이, 네이버페이를 지원합니다."),
                Map.of("faqId", 3, "category", "교환/환불", "question", "교환/환불은 어떻게 하나요?", "answer", "상품 수령 후 7일 이내 신청 가능합니다.")
        ));
    }

    @Operation(summary = "공지사항 작성 (관리자)", description = "새 공지사항 작성")
    @PostMapping
    public ResponseEntity<Map<String, Object>> createNotice(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "noticeId", 123,
                "message", "공지사항이 작성되었습니다"
        ));
    }

    @Operation(summary = "이벤트 목록", description = "진행 중인 이벤트 목록")
    @GetMapping("/events")
    public ResponseEntity<List<Map<String, Object>>> getEvents() {
        return ResponseEntity.ok(List.of(
                Map.of("eventId", 1, "title", "신규 회원 5000원 쿠폰", "description", "회원가입 시 5000원 할인쿠폰 지급", "startDate", "2024-09-01", "endDate", "2024-12-31"),
                Map.of("eventId", 2, "title", "리뷰 작성 포인트 적립", "description", "리뷰 작성 시 100포인트 적립", "startDate", "2024-09-01", "endDate", "2024-10-31")
        ));
    }
}