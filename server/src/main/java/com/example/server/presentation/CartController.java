package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "장바구니", description = "장바구니 관리 API")
public class CartController {

    @Operation(summary = "장바구니 조회", description = "사용자 장바구니 목록 조회")
    @GetMapping
    public ResponseEntity<Map<String, Object>> getCart() {
        return ResponseEntity.ok(Map.of(
                "items", List.of(
                        Map.of("id", 1, "productId", 1, "name", "강아지 사료", "price", 25000, "quantity", 2),
                        Map.of("id", 2, "productId", 3, "name", "강아지 장난감", "price", 12000, "quantity", 1)
                ),
                "totalAmount", 62000,
                "shippingFee", 3000
        ));
    }

    @Operation(summary = "장바구니 추가", description = "상품을 장바구니에 추가")
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "장바구니에 추가되었습니다",
                "cartItemId", 123
        ));
    }

    @Operation(summary = "장바구니 수량 변경", description = "장바구니 상품 수량 변경")
    @PutMapping("/{itemId}")
    public ResponseEntity<Map<String, Object>> updateQuantity(
            @PathVariable Long itemId, 
            @RequestBody Map<String, Integer> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "수량이 변경되었습니다",
                "newQuantity", request.get("quantity")
        ));
    }

    @Operation(summary = "장바구니 삭제", description = "장바구니에서 상품 삭제")
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Map<String, Object>> removeFromCart(@PathVariable Long itemId) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "상품이 삭제되었습니다"
        ));
    }
}