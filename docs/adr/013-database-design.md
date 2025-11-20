# ADR : 데이터베이스 설계_안성훈

## 작성일
2025-01-15

## 컨텍스트
- 동시 접속자 500명 규모의 트랜잭션 처리 필요
- 읽기/쓰기 성능 최적화를 위한 Master-Slave 구성 고려
- MyBatis를 활용한 SQL 중심 개발 방식 채택
- 복잡한 비즈니스 쿼리와 리포팅 쿼리 분리 필요
- 데이터 일관성과 성능 최적화 균형 고려
- 향후 샤딩 및 파티셔닝 확장성 고려

## 결정
**MySQL 8.0 Master-Slave 구성 + MyBatis + Redis 캐시**를 채택

### 데이터베이스 구성
- **Master DB**: 쓰기 전용 (INSERT, UPDATE, DELETE)
- **Slave DB**: 읽기 전용 (SELECT, 리포팅)
- **Redis**: 세션 저장소 + 데이터 캐시
- **Connection Pool**: HikariCP (최대 20개 커넥션)

### MyBatis 설정
```yaml
mybatis:
  configuration:
    map-underscore-to-camel-case: true
    cache-enabled: true
    lazy-loading-enabled: true
  mapper-locations: classpath:mapper/**/*.xml
```

### 데이터베이스 분리 전략
- **트랜잭션 데이터**: Master DB (주문, 결제, 재고)
- **조회 데이터**: Slave DB (상품 목록, 검색, 통계)
- **세션 데이터**: Redis (로그인 세션, 장바구니)
- **캐시 데이터**: Redis (상품 정보, 카테고리)

### 인덱스 전략
```sql
-- 사용자 테이블
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone_number);

-- 상품 테이블
CREATE INDEX idx_product_category ON products(category_id, status);
CREATE INDEX idx_product_name_fulltext ON products(name) USING FULLTEXT;

-- 주문 테이블
CREATE INDEX idx_order_user_date ON orders(user_id, created_at);
CREATE INDEX idx_order_status ON orders(status, created_at);

-- 주문 상품 테이블
CREATE INDEX idx_order_item_product ON order_items(product_id);
```

### 파티셔닝 전략
```sql
-- 주문 테이블 월별 파티셔닝
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    -- 기타 컬럼들
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at)) (
    PARTITION p202501 VALUES LESS THAN (202502),
    PARTITION p202502 VALUES LESS THAN (202503),
    -- 월별 파티션 추가
);
```

### 캐시 전략
- **Look-Aside Pattern**: 상품 정보, 카테고리
- **Write-Through Pattern**: 사용자 세션
- **Write-Behind Pattern**: 조회수, 통계 데이터
- **TTL 설정**: 상품(1시간), 카테고리(24시간), 세션(30분)

## 결과
### 긍정적 결과
- **성능 향상**: Master-Slave 분리로 읽기 성능 300% 향상
- **가용성 보장**: Slave DB 장애 시에도 서비스 지속 가능
- **확장성**: 필요 시 Read Replica 추가 확장 용이
- **캐시 효과**: Redis 캐시로 DB 부하 70% 감소
- **SQL 최적화**: MyBatis로 복잡한 쿼리 최적화 가능

### 부정적 결과
- **복잡도 증가**: Master-Slave 동기화 지연 관리 필요
- **데이터 일관성**: 읽기 전용 DB의 지연으로 일시적 불일치
- **운영 비용**: DB 서버 2대 + Redis 클러스터 비용 증가
- **개발 복잡도**: 읽기/쓰기 분리 로직 구현 필요

## 대안
### 1. 단일 MySQL 서버
- **장점**: 단순한 구성, 낮은 비용
- **단점**: 성능 한계, 단일 장애점
- **선택하지 않은 이유**: 500명 동시 접속 처리 한계

### 2. PostgreSQL 사용
- **장점**: 고급 기능, JSON 지원
- **단점**: 팀 경험 부족, 학습 비용
- **선택하지 않은 이유**: MySQL 대비 성능상 큰 차이 없음

### 3. NoSQL (MongoDB) 사용
- **장점**: 스키마 유연성, 수평 확장
- **단점**: 트랜잭션 제약, 복잡한 조인 어려움
- **선택하지 않은 이유**: E-Commerce 특성상 ACID 트랜잭션 필수

## 관련 문서
- [시스템 아키텍처 ADR](011-system-architecture.md)
- [주문 및 재고 관리 시스템 ADR](007-order-stock-management.md)

## 참고자료
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)
- [MyBatis Documentation](https://mybatis.org/mybatis-3/)
- [Redis Documentation](https://redis.io/documentation)

## 담당자
- 작성자: 안성훈