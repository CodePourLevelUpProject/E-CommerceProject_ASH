package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@Tag(name = "상품", description = "상품 검색, 조회, 랭킹 API")
public class ProductController {

    @Operation(summary = "상품 검색", description = "키워드로 상품 검색")
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(Map.of(
                "products", List.of(
                        Map.of("id", 1, "name", "강아지 사료", "price", 25000, "rating", 4.5),
                        Map.of("id", 2, "name", "고양이 사료", "price", 30000, "rating", 4.8)
                ),
                "totalCount", 2
        ));
    }

    @Operation(summary = "인기 상품 조회", description = "판매량 기준 인기 상품 TOP 10")
    @GetMapping("/popular")
    public ResponseEntity<List<Map<String, Object>>> getPopularProducts() {
        return ResponseEntity.ok(List.of(
                Map.of("id", 1, "name", "강아지 사료", "price", 25000, "salesCount", 150),
                Map.of("id", 2, "name", "고양이 간식", "price", 15000, "salesCount", 120)
        ));
    }

    @Operation(summary = "베스트 상품 조회", description = "리뷰 기준 베스트 상품")
    @GetMapping("/best")
    public ResponseEntity<List<Map<String, Object>>> getBestProducts() {
        return ResponseEntity.ok(List.of(
                Map.of("id", 3, "name", "강아지 장난감", "price", 12000, "rating", 4.9, "reviewCount", 45),
                Map.of("id", 4, "name", "고양이 모래", "price", 18000, "rating", 4.7, "reviewCount", 32)
        ));
    }

    @Operation(summary = "카테고리별 상품 조회", description = "카테고리별 상품 목록")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Map<String, Object>>> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(List.of(
                Map.of("id", 5, "name", "카테고리 상품 1", "price", 20000, "categoryId", categoryId),
                Map.of("id", 6, "name", "카테고리 상품 2", "price", 35000, "categoryId", categoryId)
        ));
    }
}