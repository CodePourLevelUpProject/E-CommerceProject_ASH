package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "주문", description = "주문 및 결제 API")
public class OrderController {

    @Operation(summary = "주문 생성", description = "장바구니 상품으로 주문 생성")
    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "orderId", 12345,
                "status", "PENDING",
                "totalAmount", 65000,
                "message", "주문이 생성되었습니다"
        ));
    }

    @Operation(summary = "주문 목록 조회", description = "사용자 주문 내역 조회")
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getOrders() {
        return ResponseEntity.ok(List.of(
                Map.of("orderId", 12345, "status", "DELIVERED", "totalAmount", 65000, "orderDate", "2024-09-14"),
                Map.of("orderId", 12344, "status", "SHIPPED", "totalAmount", 45000, "orderDate", "2024-09-13")
        ));
    }

    @Operation(summary = "주문 상세 조회", description = "특정 주문의 상세 정보 조회")
    @GetMapping("/{orderId}")
    public ResponseEntity<Map<String, Object>> getOrderDetail(@PathVariable Long orderId) {
        return ResponseEntity.ok(Map.of(
                "orderId", orderId,
                "status", "DELIVERED",
                "items", List.of(
                        Map.of("productId", 1, "name", "강아지 사료", "price", 25000, "quantity", 2),
                        Map.of("productId", 3, "name", "강아지 장난감", "price", 12000, "quantity", 1)
                ),
                "totalAmount", 65000,
                "shippingFee", 3000,
                "orderDate", "2024-09-14"
        ));
    }

    @Operation(summary = "주문 취소", description = "주문 취소 요청")
    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<Map<String, Object>> cancelOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "주문이 취소되었습니다",
                "orderId", orderId
        ));
    }
}