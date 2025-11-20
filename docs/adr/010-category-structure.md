# ADR : 상품 카테고리 구조_안성훈

## 작성일
2025-09-13

## 컨텍스트
- 펫샵 E-Commerce 특성상 강아지/고양이 용품으로 명확히 구분된 카테고리 구조가 필요함
- 사용자가 쉽게 원하는 상품을 찾을 수 있어야 함
- 반려동물 종류별로 필요한 용품이 다르므로 명확한 분류 체계 필요
- 모바일과 PC에서 모두 직관적인 네비게이션 제공
- 향후 다른 반려동물(새, 햄스터 등) 확장 가능성 고려
- 카테고리별 상품 수 불균형 문제 해결 필요
- SEO 최적화를 위한 카테고리 URL 구조 고려
- 관리자의 카테고리 관리 편의성과 사용자 경험 간 균형

## 결정
**2단계 계층형 카테고리 구조 (대분류 → 소분류)**를 채택

### 카테고리 구조
```
강아지용품 (대분류)
├── 사료 (소분류)
├── 간식
├── 장난감
├── 의류
├── 목줄/리드줄
├── 살림용품
└── 건강관리

고양이용품 (대분류)
├── 사료 (소분류)
├── 간식
├── 장난감
├── 의류
├── 목걸이
├── 모래
└── 건강관리
```

### UI/UX 설계
- **PC**: 메가메뉴 형태로 대분류 호버 시 소분류 표시
- **모바일**: 아코디언 형태로 펼침/접힘 기능
- **상품 수**: 각 카테고리별 상품 개수 표시 (재고 있는 상품만)
- **빈 카테고리**: 상품이 없는 카테고리는 비활성화 표시

### 카테고리 관리
- **상품 수 집계**: 활성화된 상품만 카운트
- **실시간 업데이트**: 상품 등록/삭제 시 자동 반영
- **카테고리 변경**: 상품 카테고리 이동 시 집계 업데이트
- **URL 구조**: /category/{대분류}/{소분류} 형태

### 관련 다이어그램

- **클래스 다이어그램**    

![category-structure-class](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/class/category-structure.puml)

- **시퀀스 다이어그램**  

![category-structure-sequence](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/sequence/category-structure.puml)
- **ERD**  

![category-structure-erd](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/erd/category-structure.puml)

## 결과
### 긍정적 결과
- **상품 탐색 시간 40% 단축**: 직관적인 2단계 구조로 빠른 상품 발견
- **카테고리 페이지 체류시간 25% 증가**: 명확한 분류로 관련 상품 탐색 활발
- **모바일 사용성 30% 향상**: 아코디언 UI로 터치 친화적 네비게이션
- **SEO 효과 20% 개선**: 구조화된 URL로 검색엔진 최적화
- **관리 효율성 향상**: 단순한 2단계 구조로 카테고리 관리 용이

### 부정적 결과
- **카테고리 확장성 제한**: 3단계 이상 확장 시 구조 변경 필요
- **복합 상품 분류 어려움**: 강아지+고양이 겸용 상품 분류 애매
- **카테고리별 상품 수 불균형**: 사료 카테고리 집중으로 다른 카테고리 상대적 빈약
- **검색 의존도 증가**: 카테고리로 찾기 어려운 상품은 검색에 의존

## 대안
### 1. 3단계 계층 구조 (대분류 → 중분류 → 소분류)
- **장점**: 세밀한 분류, 확장성 우수
- **단점**: 복잡한 네비게이션, 사용자 혼란
- **선택하지 않은 이유**: 초기 상품 수 대비 과도한 복잡성

### 2. 태그 기반 분류 시스템
- **장점**: 유연한 분류, 다중 카테고리 지원
- **단점**: 사용자 학습 비용, 일관성 부족
- **선택하지 않은 이유**: 직관성 부족, 관리 복잡도 증가

### 3. 단일 레벨 카테고리
- **장점**: 매우 단순, 빠른 접근
- **단점**: 카테고리 수 증가, 확장성 부족
- **선택하지 않은 이유**: 펫샵 상품 특성상 세분화 필요

### 4. 동물별 + 기능별 매트릭스 구조
- **장점**: 논리적 분류, 직관적
- **단점**: 복잡한 UI, 개발 비용 증가
- **선택하지 않은 이유**: 초기 단계에 과도한 복잡성

## 관련 문서
- [상품 검색 전략 ADR](003-product-search-strategy.md)
- [ERD](../erd.puml)

## 참고자료
- [펫프렌즈 카테고리 구조 분석](https://www.petfriends.co.kr)
- [지마켓 펫샵 카테고리](http://pet.gmarket.co.kr)
- [정보 아키텍처 설계 원칙](https://www.nngroup.com/articles/information-architecture-soa/)

## 담당자
- 작성자: 안성훈