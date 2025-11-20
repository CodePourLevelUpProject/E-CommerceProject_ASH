package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "관리자", description = "관리자 기능 API")
public class AdminController {

    @Operation(summary = "대시보드 통계", description = "관리자 대시보드 통계 정보")
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(Map.of(
                "totalUsers", 1250,
                "totalOrders", 3420,
                "totalSales", 125000000,
                "todayOrders", 45,
                "todaySales", 2300000,
                "topProducts", List.of(
                        Map.of("productId", 1, "name", "강아지 사료", "salesCount", 150),
                        Map.of("productId", 2, "name", "고양이 간식", "salesCount", 120)
                )
        ));
    }

    @Operation(summary = "상품 관리", description = "상품 등록/수정/삭제")
    @PostMapping("/products")
    public ResponseEntity<Map<String, Object>> createProduct(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "productId", 123,
                "message", "상품이 등록되었습니다"
        ));
    }

    @Operation(summary = "재고 관리", description = "상품 재고 조정")
    @PutMapping("/products/{productId}/stock")
    public ResponseEntity<Map<String, Object>> updateStock(@PathVariable Long productId, @RequestBody Map<String, Integer> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "productId", productId,
                "newStock", request.get("stock"),
                "message", "재고가 업데이트되었습니다"
        ));
    }

    @Operation(summary = "주문 관리", description = "주문 상태 변경")
    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Map<String, Object>> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "orderId", orderId,
                "newStatus", request.get("status"),
                "message", "주문 상태가 변경되었습니다"
        ));
    }

    @Operation(summary = "사용자 관리", description = "사용자 목록 조회")
    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getUsers() {
        return ResponseEntity.ok(List.of(
                Map.of("userId", 1, "name", "김철수", "email", "kim@example.com", "joinDate", "2024-09-01", "orderCount", 5),
                Map.of("userId", 2, "name", "이영희", "email", "lee@example.com", "joinDate", "2024-09-05", "orderCount", 3)
        ));
    }
}