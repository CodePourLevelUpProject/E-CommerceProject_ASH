package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@Tag(name = "결제", description = "결제 처리 API")
public class PaymentController {

    @Operation(summary = "결제 요청", description = "주문에 대한 결제 요청")
    @PostMapping("/request")
    public ResponseEntity<Map<String, Object>> requestPayment(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Map.of(
                "paymentId", "PAY_12345",
                "orderId", request.get("orderId"),
                "amount", request.get("amount"),
                "method", request.get("method"),
                "status", "PENDING",
                "redirectUrl", "https://payment.gateway.com/pay/12345"
        ));
    }

    @Operation(summary = "결제 완료 처리", description = "결제 완료 후 처리")
    @PostMapping("/complete")
    public ResponseEntity<Map<String, Object>> completePayment(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "paymentId", request.get("paymentId"),
                "status", "COMPLETED",
                "message", "결제가 완료되었습니다"
        ));
    }

    @Operation(summary = "결제 취소", description = "결제 취소 요청")
    @PostMapping("/{paymentId}/cancel")
    public ResponseEntity<Map<String, Object>> cancelPayment(@PathVariable String paymentId) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "paymentId", paymentId,
                "status", "CANCELLED",
                "refundAmount", 65000,
                "message", "결제가 취소되었습니다"
        ));
    }

    @Operation(summary = "결제 내역 조회", description = "사용자 결제 내역")
    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> getPaymentHistory() {
        return ResponseEntity.ok(List.of(
                Map.of("paymentId", "PAY_12345", "orderId", 12345, "amount", 65000, "method", "CARD", "status", "COMPLETED", "date", "2024-09-14"),
                Map.of("paymentId", "PAY_12344", "orderId", 12344, "amount", 45000, "method", "KAKAO_PAY", "status", "COMPLETED", "date", "2024-09-13")
        ));
    }
}