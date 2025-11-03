# ADR : 시스템 아키텍처 설계_안성훈

## 작성일
2025-01-15

## 컨텍스트
- 동시 접속자 500명 규모의 E-Commerce 플랫폼 구축
- 검색 기능의 고도화를 위한 Elasticsearch 도입 필요
- AI 챗봇 서비스 제공을 위한 Spring AI 연동 필요
- 확장 가능한 마이크로서비스 아키텍처 고려
- 세션 클러스터링 및 캐시 전략 필요
- 데이터 일관성과 성능 최적화 균형 고려

## 결정
**헥사고날 아키텍처 기반 모듈러 모놀리스 + Elasticsearch + Redis + Spring AI**를 채택

### 시스템 아키텍처
```
[Client] → [Load Balancer] → [API Gateway] → [Application Servers]
                                                      ↓
[Redis Cluster] ← [Spring Boot Apps] → [MySQL Master/Slave]
                         ↓                      ↓
                  [Elasticsearch] ← [Logstash] ← [MySQL]
                         ↓
                  [Spring AI] → [OpenAI API]
```

### 핵심 구성 요소
- **Load Balancer**: Nginx (500명 동시 접속 처리)
- **API Gateway**: Spring Cloud Gateway
- **Application**: Spring Boot 3.x (헥사고날 아키텍처)
- **Database**: MySQL 8.0 (Master-Slave 구성)
- **ORM**: MyBatis 3.5
- **Cache**: Redis Cluster (세션 + 데이터 캐시)
- **Search**: Elasticsearch 8.x + Logstash
- **AI**: Spring AI + OpenAI GPT-4
- **Message Queue**: Redis Pub/Sub (쿠폰 대기열)

### 서버 구성
- **Web Server**: 2대 (Active-Active)
- **Database**: Master 1대 + Slave 1대
- **Redis**: 3대 (Cluster 구성)
- **Elasticsearch**: 3대 (Master 1, Data 2)

## 결과
### 긍정적 결과
- **확장성**: 모듈러 모놀리스로 점진적 마이크로서비스 전환 가능
- **성능**: Redis 캐시로 응답시간 80% 단축 예상
- **검색 품질**: Elasticsearch로 검색 정확도 95% 이상 달성
- **사용자 경험**: AI 챗봇으로 고객 만족도 30% 향상 예상
- **가용성**: Master-Slave DB 구성으로 99.9% 가용성 보장

### 부정적 결과
- **복잡도 증가**: 다양한 기술 스택으로 운영 복잡도 상승
- **비용 증가**: 인프라 비용 월 200만원 추가
- **학습 곡선**: 팀원들의 Elasticsearch, Redis 학습 필요
- **의존성**: 외부 AI API 의존으로 장애 전파 위험

## 대안
### 1. 단순 모놀리스 아키텍처
- **장점**: 개발 단순, 운영 용이
- **단점**: 확장성 제한, 기술 부채 누적
- **선택하지 않은 이유**: 향후 확장성 부족

### 2. 완전한 마이크로서비스
- **장점**: 최고 확장성, 기술 독립성
- **단점**: 초기 복잡도 과다, 분산 트랜잭션 문제
- **선택하지 않은 이유**: 초기 단계에 과도한 복잡성

### 3. 클라우드 네이티브 (AWS/GCP)
- **장점**: 관리형 서비스, 자동 확장
- **단점**: 벤더 종속, 높은 비용
- **선택하지 않은 이유**: 비용 대비 효과 부족

## 관련 문서
- [DDD 도메인 설계 ADR](012-ddd-domain-design.md)
- [데이터베이스 설계 ADR](013-database-design.md)
- [검색 시스템 ADR](014-search-system.md)

## 참고자료
- [헥사고날 아키텍처](https://alistair.cockburn.us/hexagonal-architecture/)
- [Spring AI 문서](https://docs.spring.io/spring-ai/reference/)
- [Elasticsearch 가이드](https://www.elastic.co/guide/)

## 담당자
- 작성자: 안성훈