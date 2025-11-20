package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/banners")
@Tag(name = "배너", description = "광고 배너 API")
public class BannerController {

    @Operation(summary = "활성 배너 조회", description = "현재 활성화된 배너 목록 (우선순위 순)")
    @GetMapping("/active")
    public ResponseEntity<List<Map<String, Object>>> getActiveBanners() {
        return ResponseEntity.ok(List.of(
                Map.of("bannerId", 1, "title", "신상품 출시", "imageUrl", "/images/banner1.jpg", "linkUrl", "/products/new", "priority", 100),
                Map.of("bannerId", 2, "title", "할인 이벤트", "imageUrl", "/images/banner2.jpg", "linkUrl", "/events/sale", "priority", 90),
                Map.of("bannerId", 3, "title", "무료배송", "imageUrl", "/images/banner3.jpg", "linkUrl", "/shipping", "priority", 80)
        ));
    }

    @Operation(summary = "배너 클릭 추적", description = "배너 클릭 시 통계 수집")
    @PostMapping("/{bannerId}/click")
    public ResponseEntity<Map<String, Object>> trackBannerClick(@PathVariable Long bannerId) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "bannerId", bannerId,
                "message", "클릭이 기록되었습니다"
        ));
    }

    @Operation(summary = "배너 조회 추적", description = "배너 노출 시 통계 수집")
    @PostMapping("/{bannerId}/view")
    public ResponseEntity<Map<String, Object>> trackBannerView(@PathVariable Long bannerId) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "bannerId", bannerId,
                "message", "조회가 기록되었습니다"
        ));
    }

    @Operation(summary = "배너 관리 (관리자)", description = "배너 생성/수정/삭제")
    @PostMapping
    public ResponseEntity<Map<String, Object>> createBanner(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "bannerId", 123,
                "message", "배너가 생성되었습니다"
        ));
    }

    @Operation(summary = "배너 통계 조회 (관리자)", description = "배너별 클릭/조회 통계")
    @GetMapping("/{bannerId}/stats")
    public ResponseEntity<Map<String, Object>> getBannerStats(@PathVariable Long bannerId) {
        return ResponseEntity.ok(Map.of(
                "bannerId", bannerId,
                "viewCount", 1250,
                "clickCount", 85,
                "clickRate", 6.8,
                "advertisingCost", 500000,
                "priority", 95
        ));
    }
}