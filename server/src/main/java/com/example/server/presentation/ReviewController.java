package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "리뷰", description = "상품 리뷰 API")
public class ReviewController {

    @Operation(summary = "리뷰 작성", description = "구매한 상품에 대한 리뷰 작성")
    @PostMapping
    public ResponseEntity<Map<String, Object>> createReview(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "reviewId", 456,
                "message", "리뷰가 작성되었습니다",
                "pointsEarned", 100
        ));
    }

    @Operation(summary = "상품 리뷰 조회", description = "특정 상품의 리뷰 목록 조회")
    @GetMapping("/product/{productId}")
    public ResponseEntity<Map<String, Object>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(Map.of(
                "reviews", List.of(
                        Map.of("reviewId", 1, "rating", 5, "content", "정말 좋은 상품입니다", "userName", "김**", "createdAt", "2024-09-10"),
                        Map.of("reviewId", 2, "rating", 4, "content", "배송이 빨라요", "userName", "이**", "createdAt", "2024-09-12")
                ),
                "averageRating", 4.5,
                "totalCount", 2
        ));
    }

    @Operation(summary = "내 리뷰 조회", description = "사용자가 작성한 리뷰 목록")
    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> getMyReviews() {
        return ResponseEntity.ok(List.of(
                Map.of("reviewId", 1, "productId", 1, "productName", "강아지 사료", "rating", 5, "content", "정말 좋은 상품입니다", "createdAt", "2024-09-10"),
                Map.of("reviewId", 2, "productId", 3, "productName", "강아지 장난감", "rating", 4, "content", "우리 강아지가 좋아해요", "createdAt", "2024-09-08")
        ));
    }
}