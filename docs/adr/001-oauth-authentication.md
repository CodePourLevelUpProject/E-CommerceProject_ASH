# ADR : OAuth 인증 방식 선택_안성훈

## 작성일
2025-09-13

## 컨텍스트
- E-Commerce 플랫폼에서 사용자 회원가입/로그인 방식을 결정해야 함
- 사용자 편의성 향상을 위해 복잡한 회원가입 절차 간소화 필요
- 비밀번호 분실, 관리 부담 등 전통적인 인증 방식의 문제점 해결 필요
- 국내 사용자 특성상 카카오, 네이버 등 국내 플랫폼 연동 필수
- 글로벌 확장 가능성을 고려한 구글 OAuth 지원 필요
- 보안성과 사용자 경험을 동시에 만족하는 인증 시스템 구축 필요

## 결정
**카카오, 구글, 네이버 OAuth 2.0 인증 방식과 JWT + Cookie 세션 관리**를 채택

### 선택한 OAuth 제공자
- **카카오**: 국내 사용자 점유율 90% 이상
- **구글**: 글로벌 사용자 지원 및 안정성
- **네이버**: 국내 중장년층 사용자 접근성

### 인증 플로우
1. OAuth 제공자 선택 → 인증 페이지 리다이렉트
2. 사용자 정보 수집 (이메일, 이름)
3. 전화번호 없는 경우 → 전화번호 입력/인증 페이지
4. 기존 회원인 경우 → 메인페이지 리다이렉트
5. 신규 회원인 경우 → 회원가입 완료 + 웰컴 포인트 5000점 지급

### 관련 다이어그램

- **클래스 다이어그램**    

![oauth-authentication-class](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/class/oauth-authentication.puml)

- **시퀀스 다이어그램**  

![oauth-authentication-sequence](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/sequence/oauth-authentication.puml)
- **ERD**  

![oauth-authentication-erd](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/erd/oauth-authentication.puml)

## 결과
### 긍정적 결과
- **회원가입 전환율 향상** 
- **로그인 시간 단축**

### 부정적 결과
- **외부 서비스 의존성으로 인한 가용성 리스크**
- **OAuth 제공자 정책 변경 시 대응 비용 발생**
- **각 제공자별 API 차이점 관리 복잡도 증가**
- **초기 개발 비용 20% 증가**

## 대안
### 1. 전통적인 이메일/비밀번호 인증
- **장점**: 외부 의존성 없음, 완전한 제어 가능
- **단점**: 사용자 경험 저하, 비밀번호 관리 부담
- **선택하지 않은 이유**: 사용자 편의성 부족

### 2. 단일 OAuth 제공자 (카카오만)
- **장점**: 개발 복잡도 낮음, 국내 사용자 커버리지 높음
- **단점**: 글로벌 확장성 제한, 단일 장애점
- **선택하지 않은 이유**: 확장성 부족

### 3. 생체 인증 (지문, 얼굴 인식)
- **장점**: 높은 보안성, 편리한 사용자 경험
- **단점**: 디바이스 의존성, 개발 복잡도 높음
- **선택하지 않은 이유**: 기술적 복잡도와 비용 대비 효과 부족

## 관련 문서
- [전화번호 인증 시스템 ADR](002-phone-verification.md)
- [시퀀스 다이어그램](../sequence.puml)

## 참고자료
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [카카오 로그인 API 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
- [구글 OAuth 2.0 가이드](https://developers.google.com/identity/protocols/oauth2)

## 담당자
- 작성자: 안성훈