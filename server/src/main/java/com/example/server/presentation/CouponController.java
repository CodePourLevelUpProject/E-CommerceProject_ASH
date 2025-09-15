package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coupons")
@Tag(name = "쿠폰", description = "쿠폰 발급 및 사용 API")
public class CouponController {

    @Operation(summary = "내 쿠폰 조회", description = "사용자가 보유한 쿠폰 목록")
    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> getMyCoupons() {
        return ResponseEntity.ok(List.of(
                Map.of("couponId", 1, "code", "WELCOME5000", "discountAmount", 5000, "minOrderAmount", 30000, "expiryDate", "2024-12-31", "status", "ACTIVE"),
                Map.of("couponId", 2, "code", "REVIEW100", "discountRate", 10, "minOrderAmount", 10000, "expiryDate", "2024-10-31", "status", "ACTIVE")
        ));
    }

    @Operation(summary = "쿠폰 등록", description = "쿠폰 코드로 쿠폰 등록")
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerCoupon(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "쿠폰이 등록되었습니다",
                "couponCode", request.get("code")
        ));
    }

    @Operation(summary = "쿠폰 사용 가능 여부 확인", description = "주문 금액에 대한 쿠폰 사용 가능 여부")
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateCoupon(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "valid", true,
                "discountAmount", 5000,
                "finalAmount", 25000,
                "message", "쿠폰 사용 가능합니다"
        ));
    }

    @Operation(summary = "사용 가능한 쿠폰 조회", description = "특정 주문 금액에 사용 가능한 쿠폰 목록")
    @GetMapping("/available")
    public ResponseEntity<List<Map<String, Object>>> getAvailableCoupons(@RequestParam int orderAmount) {
        return ResponseEntity.ok(List.of(
                Map.of("couponId", 1, "code", "WELCOME5000", "discountAmount", 5000, "finalAmount", orderAmount - 5000),
                Map.of("couponId", 2, "code", "REVIEW100", "discountRate", 10, "discountAmount", orderAmount * 0.1, "finalAmount", orderAmount * 0.9)
        ));
    }
}