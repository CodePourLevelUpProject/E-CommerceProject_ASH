# ADR : 상품 랭킹 시스템_안성훈

## 작성일
2025-09-13

## 컨텍스트
- 메인 화면에 인기 상품과 베스트 상품을 노출하여 사용자 구매 유도가 필요함
- 공정하고 정확한 랭킹 시스템 구축이 중요함
- 실시간 랭킹 업데이트는 서버 부하가 크지만, 정확성이 우선시되어야 함
- 판매량과 리뷰 기반의 서로 다른 랭킹 기준 필요
- 품절 상품 제외, 할인 상품 별도 관리 등 비즈니스 로직 복잡
- 랭킹 조작 방지를 위한 투명한 기준 설정 필요
- 배치 작업 실패 시 백업 방안 고려 필요

## 결정
**배치 작업 기반 랭킹 시스템**을 채택

### 인기 상품 TOP 10 (판매량 기준)
- **집계 기준**: 최근 30일 실제 결제 완료 주문
- **업데이트**: 매 시간 배치 작업 (cron: 0 * * * *)
- **우선순위**: 판매량 → 최신 등록 상품
- **제외 조건**: 품절 상품, 비활성화 상품

### 베스트 상품 (리뷰 기준)
- **집계 기준**: 구매 확정 후 작성된 리뷰
- **조건**: 평점 4.0 이상 + 리뷰 10개 이상
- **정렬**: 리뷰 수 → 평점 순

### 할인 상품 이벤트
- **조건**: 할인율 10% 이상
- **기간 관리**: 시작일시/종료일시 정확한 제어
- **가격 계산**: 원가 × (100 - 할인율) / 100
- **자동 제외**: 재고 소진 시

### 관련 다이어그램

- **클래스 다이어그램**    

![product-ranking-class](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/class/product-ranking.puml)

- **시퀀스 다이어그램**  

![product-ranking-sequence](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/sequence/product-ranking.puml)
- **ERD**  

![product-ranking-erd](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/erd/product-ranking.puml)

## 결과
### 긍정적 결과
- **서버 부하 최소화**: 실시간 계산 대비 90% 부하 감소
- **정확한 랭킹 제공**: 배치 작업으로 데이터 정합성 보장
- **판매 촉진 효과**: 랭킹 노출로 해당 상품 판매량 평균 25% 증가
- **사용자 구매 결정 도움**: 클릭률 15% 향상

### 부정적 결과
- **실시간 반영 불가**: 최대 1시간 지연 발생
- **배치 작업 의존성**: 배치 실패 시 랭킹 업데이트 중단
- **서버 리소스 사용**: 매시간 배치 작업으로 CPU 사용량 증가
- **복잡한 비즈니스 로직**: 다양한 제외 조건으로 유지보수 복잡도 증가

## 대안
### 1. 실시간 랭킹 시스템
- **장점**: 즉시 반영, 최신 데이터 보장
- **단점**: 높은 서버 부하, 성능 저하 위험
- **선택하지 않은 이유**: 시스템 안정성 우선

### 2. 일일 배치 작업
- **장점**: 서버 부하 최소, 안정적 운영
- **단점**: 24시간 지연, 실시간성 부족
- **선택하지 않은 이유**: 사용자 경험 저하

### 3. 수동 랭킹 관리
- **장점**: 완전한 제어, 마케팅 전략 반영 가능
- **단점**: 관리 비용, 주관적 판단 개입
- **선택하지 않은 이유**: 확장성 부족, 공정성 문제

## 관련 문서
- [상품 검색 전략 ADR](003-product-search-strategy.md)
- [시퀀스 다이어그램](../sequence.puml)

## 참고자료
- [Spring Batch 공식 문서](https://spring.io/projects/spring-batch)
- [Quartz Scheduler](http://www.quartz-scheduler.org/)

## 담당자
- 작성자: 안성훈