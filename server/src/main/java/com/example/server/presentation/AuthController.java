package com.example.server.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "인증", description = "OAuth 로그인 및 전화번호 인증 API")
public class AuthController {

    @Operation(summary = "OAuth 로그인", description = "카카오/구글/네이버 OAuth 로그인")
    @GetMapping("/oauth/{provider}/login")
    public ResponseEntity<Map<String, Object>> oauthLogin(@PathVariable String provider) {
        return ResponseEntity.ok(Map.of(
                "redirectUrl", "https://oauth." + provider + ".com/authorize",
                "provider", provider
        ));
    }

    @Operation(summary = "전화번호 인증 요청", description = "SMS 인증번호 발송")
    @PostMapping("/verify-phone")
    public ResponseEntity<Map<String, Object>> verifyPhone(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(Map.of(
                "message", "인증번호가 발송되었습니다",
                "phoneNumber", request.get("phoneNumber")
        ));
    }

    @Operation(summary = "인증번호 확인", description = "SMS 인증번호 검증")
    @PostMapping("/verify-code")
    public ResponseEntity<Map<String, Object>> verifyCode(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "인증이 완료되었습니다",
                "token", "mock-jwt-token"
        ));
    }
}