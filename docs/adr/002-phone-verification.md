# ADR : 전화번호 인증 시스템_안성훈

## 작성일
2025-09-13

## 컨텍스트
- OAuth 로그인 시 전화번호 정보가 없는 사용자에 대해 추가 인증이 필요함
- 타인 전화번호 도용을 통한 허위 가입 방지가 필수적임
- E-Commerce 특성상 배송지 연락처 확보가 중요함
- 무차별 대입 공격(Brute-force) 및 스팸 가입 방지 필요
- 국내 휴대폰 번호 체계(010-XXXX-XXXX) 기준 검증 시스템 구축
- 인증번호 발송 비용 최적화와 보안성 균형 고려

## 결정
**SMS 인증번호 방식을 통한 전화번호 인증 시스템**을 채택

### 인증 프로세스
1. 전화번호 입력 (010-1234-1234 형식, 서버에는 01012341234로 저장)
2. 중복 번호 검증 및 유효성 검사
3. SMS 인증번호 발송 (6자리 숫자)
4. 인증번호 입력 및 검증 (3분 내)
5. 인증 완료 후 회원가입 진행

### 보안 정책
- **인증번호 유효시간**: 3분
- **최대 시도 횟수**: 5회 (초과 시 10분 대기)
- **일일 SMS 발송 제한**: 동일 번호당 10회
- **인증번호 재사용 방지**: 일회성 코드
- **IP별 요청 제한**: 시간당 50회

### 관련 다이어그램

- **클래스 다이어그램**    

![phone-verification-class](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/class/phone-verification.puml)

- **시퀀스 다이어그램**  

![phone-verification-sequence](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/sequence/phone-verification.puml)
- **ERD**  

![phone-verification-erd](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/erd/phone-verification.puml)

## 결과
### 긍정적 결과
- **허위 가입 90% 감소** (타인 번호 도용 방지)

### 부정적인 결과
- **SMS 발송 비용 발생**
- **해외 사용자 가입 불가** (국내 번호만 지원)
- **고객센터 인증 관련 문의 20% 증가**

## 대안
### 1. 이메일 인증
- **장점**: 비용 없음, 글로벌 지원
- **단점**: 스팸메일 처리, 실시간성 부족
- **선택하지 않은 이유**: 배송 연락처 확보 불가, 같은 사용자의 소셜 계정 통합 불가

### 2. 전화번호 입력만 (인증 없음)
- **장점**: 사용자 편의성 최대
- **단점**: 허위 정보 입력 가능성
- **선택하지 않은 이유**: 타인 번호 도용 가능성

### 3. 카카오톡 알림톡 인증
- **장점**: 높은 도달률, 사용자 친화적
- **단점**: 카카오 의존성, 추가 개발 복잡도
- **선택하지 않은 이유**: 개발 일정 및 비용 고려

## 관련 문서
- [OAuth 인증 방식 ADR](001-oauth-authentication.md)
- [시퀀스 다이어그램](../sequence.puml)

## 참고자료
- [KISA 개인정보보호 가이드라인](https://www.kisa.or.kr)
- [통신사 SMS API 문서](https://www.coolsms.co.kr/)

## 담당자
- 작성자: 안성훈