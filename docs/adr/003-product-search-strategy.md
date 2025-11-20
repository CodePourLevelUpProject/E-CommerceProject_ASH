# ADR : 상품 검색 전략_안성훈

## 작성일
2025-09-13

## 컨텍스트
- E-Commerce에서 상품 검색은 매출 직결되는 핵심 기능임
- 초기 MVP는 빠른 출시가 우선이지만, 향후 사용자 증가에 따른 고도화 필요
- 현재 예상 상품 수: 100개 
- 동시 접속자 수: 초기 10명, 목표 1,000명
- 검색 성능 목표: 95% 요청 500ms 이내 응답
- 검색 정확도: 초기 80% 이상, 향후 95% 이상
- 개발 리소스 제한: 초기 2명, 전문 검색 엔진 경험 부족

## 결정
**단계적 검색 시스템 구축 (DB 기반 검색 → Elasticsearch 도입)**을 채택

### Phase 1: DB 기반 검색 (MVP - 3개월)
- **MySQL LIKE 쿼리** 사용
- **상품명, 브랜드 기반** 검색
- **기본 필터링** (가격, 평점, 재고)
- **Redis 캐시** 적용 (TTL 1시간)
- **인덱스 최적화** (name, brand, category_id)

### Phase 2: Elasticsearch 도입 (현재 적용)
- **전문 검색 엔진** 활용 (Elasticsearch 8.x)
- **한글 형태소 분석기** (nori) 적용
- **동의어, 유사어** 처리
- **검색 결과 랭킹** 알고리즘
- **자동완성, 추천 검색어** 기능
- **실시간 인덱싱** (Logstash 연동)
- **검색 분석** (Kibana 대시보드)

### 관련 다이어그램

- **클래스 다이어그램**    

![product-search-class](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/class/product-search.puml)

- **시퀀스 다이어그램**  

![product-search-sequence](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/sequence/product-search.puml)
- **ERD**  

![product-search-erd](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/erd/product-search.puml)

## 결과
### 긍정적 결과
- **빠른 MVP 출시**: 3개월 내 서비스 런칭 가능
- **검색 성능**: Phase 1에서 평균 200ms 응답시간 달성
- **검색 정확도**: Phase 2에서 95% 이상 달성 예상
- **개발 비용 절약**: 초기 단순 구현으로 30% 비용 절감
- **점진적 학습**: 단계별 기술 습득 및 노하우 축적

### 부정적 결과
- **초기 검색 정확도 제한**: 80% 수준 (경쟁사 대비 낮음)
- **DB 부하 증가**: 동시 접속자 500명 이상 시 성능 저하
- **이중 개발 비용**: Phase 2에서 전체 재개발 필요
- **기술 부채**: Elasticsearch 전문 인력 추가 채용 필요

## 대안
### 1. 처음부터 Elasticsearch 도입
- **장점**: 최고 성능, 이중 개발 비용 없음
- **단점**: 개발 기간 6개월, 초기 비용 높음
- **선택하지 않은 이유**: MVP 출시 일정 지연, 리스크 과다

### 2. 단순 DB 검색만 유지
- **장점**: 개발 비용 최소, 단순한 유지보수
- **단점**: 확장성 제한, 경쟁력 부족
- **선택하지 않은 이유**: 장기적 비즈니스 성장 제약

### 3. 외부 검색 API 서비스 활용
- **장점**: 빠른 도입, 전문성 확보
- **단점**: 월 비용 발생, 외부 의존성
- **선택하지 않은 이유**: 데이터 보안 우려, 비용 예측 어려움

## 관련 문서
- [상품 검색 시퀀스 다이어그램](../product_search_sequence.puml)
- [상품 랭킹 시스템 ADR](004-product-ranking-system.md)

## 참고자료
- [Elasticsearch 공식 문서](https://www.elastic.co/guide/)
- [MySQL 전문 검색 최적화](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html)
- [Redis 캐시 전략](https://redis.io/docs/manual/patterns/)

## 담당자
- 작성자: 안성훈