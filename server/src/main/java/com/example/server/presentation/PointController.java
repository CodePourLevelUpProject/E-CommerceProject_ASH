package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/points")
@Tag(name = "포인트", description = "포인트 적립 및 사용 API")
public class PointController {

    @Operation(summary = "포인트 잔액 조회", description = "사용자 포인트 잔액 조회")
    @GetMapping("/balance")
    public ResponseEntity<Map<String, Object>> getPointBalance() {
        return ResponseEntity.ok(Map.of(
                "balance", 5000,
                "totalEarned", 15000,
                "totalUsed", 10000
        ));
    }

    @Operation(summary = "포인트 내역 조회", description = "포인트 적립/사용 내역")
    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> getPointHistory() {
        return ResponseEntity.ok(List.of(
                Map.of("type", "CHARGE", "amount", 5000, "description", "회원가입 축하 포인트", "date", "2024-09-14"),
                Map.of("type", "CHARGE", "amount", 100, "description", "리뷰 작성", "date", "2024-09-13"),
                Map.of("type", "USE", "amount", -3000, "description", "주문 결제", "date", "2024-09-12")
        ));
    }

    @Operation(summary = "포인트 사용", description = "주문 시 포인트 사용")
    @PostMapping("/use")
    public ResponseEntity<Map<String, Object>> usePoints(@RequestBody Map<String, Integer> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "usedAmount", request.get("amount"),
                "remainingBalance", 2000,
                "message", "포인트가 사용되었습니다"
        ));
    }
}