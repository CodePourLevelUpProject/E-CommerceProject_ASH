# ADR : DDD 도메인 설계_안성훈

## 작성일
2025-01-15

## 컨텍스트
- E-Commerce 플랫폼의 복잡한 비즈니스 로직을 체계적으로 관리 필요
- 도메인 전문가와 개발자 간의 공통 언어(Ubiquitous Language) 구축
- 높은 응집도와 낮은 결합도를 가진 도메인 모델 설계
- 트랜잭션 경계와 일관성 보장을 위한 애그리게이트 설계
- 향후 마이크로서비스 전환을 고려한 바운디드 컨텍스트 분리

## 결정
**DDD 전술적 패턴을 활용한 도메인 중심 설계**를 채택

### 바운디드 컨텍스트 (Bounded Context)
1. **사용자 관리 컨텍스트** (User Management)
2. **상품 관리 컨텍스트** (Product Management)  
3. **주문 관리 컨텍스트** (Order Management)
4. **결제 컨텍스트** (Payment)
5. **마케팅 컨텍스트** (Marketing)

### 애그리게이트 설계

#### 1. 사용자 관리 컨텍스트
- **User 애그리게이트**
  - User (애그리게이트 루트)
  - UserProfile (엔티티)
  - PhoneNumber (밸류 객체)
  - Email (밸류 객체)
  - Address (밸류 객체)

#### 2. 상품 관리 컨텍스트
- **Product 애그리게이트**
  - Product (애그리게이트 루트)
  - ProductOption (엔티티)
  - Price (밸류 객체)
  - Stock (밸류 객체)
  - Category (밸류 객체)

#### 3. 주문 관리 컨텍스트
- **Order 애그리게이트**
  - Order (애그리게이트 루트)
  - OrderItem (엔티티)
  - OrderStatus (밸류 객체)
  - DeliveryInfo (밸류 객체)
  - Money (밸류 객체)

- **Cart 애그리게이트**
  - Cart (애그리게이트 루트)
  - CartItem (엔티티)
  - Quantity (밸류 객체)

#### 4. 결제 컨텍스트
- **Payment 애그리게이트**
  - Payment (애그리게이트 루트)
  - PaymentMethod (밸류 객체)
  - PaymentStatus (밸류 객체)
  - Amount (밸류 객체)

#### 5. 마케팅 컨텍스트
- **Coupon 애그리게이트**
  - Coupon (애그리게이트 루트)
  - CouponPolicy (밸류 객체)
  - DiscountAmount (밸류 객체)
  - ValidityPeriod (밸류 객체)

- **Point 애그리게이트**
  - Point (애그리게이트 루트)
  - PointHistory (엔티티)
  - PointAmount (밸류 객체)

### 트랜잭션 경계
- **애그리게이트 단위**: 각 애그리게이트는 독립적인 트랜잭션 경계
- **도메인 이벤트**: 애그리게이트 간 통신은 도메인 이벤트 활용
- **최종 일관성**: 애그리게이트 간에는 최종 일관성 보장

### 도메인 서비스
- **OrderService**: 주문 생성 시 재고 확인 및 차감
- **PaymentService**: 결제 처리 및 주문 상태 변경
- **CouponService**: 쿠폰 적용 및 할인 계산
- **PointService**: 포인트 적립 및 사용

## 결과
### 긍정적 결과
- **도메인 지식 보존**: 비즈니스 로직이 도메인 모델에 집중
- **유지보수성 향상**: 높은 응집도로 변경 영향도 최소화
- **테스트 용이성**: 도메인 로직의 단위 테스트 작성 용이
- **확장성**: 바운디드 컨텍스트 기반 마이크로서비스 전환 가능

### 부정적 결과
- **초기 개발 복잡도**: DDD 패턴 적용으로 초기 개발 시간 증가
- **학습 곡선**: 팀원들의 DDD 개념 학습 필요
- **과도한 추상화**: 단순한 CRUD 작업도 복잡해질 수 있음

## 대안
### 1. 트랜잭션 스크립트 패턴
- **장점**: 단순한 구현, 빠른 개발
- **단점**: 비즈니스 로직 분산, 유지보수 어려움
- **선택하지 않은 이유**: 복잡한 비즈니스 로직 관리 한계

### 2. 액티브 레코드 패턴
- **장점**: ORM과 자연스러운 연동
- **단점**: 도메인 로직과 데이터 접근 로직 혼재
- **선택하지 않은 이유**: 도메인 로직의 응집도 저하

## 관련 문서
- [시스템 아키텍처 ADR](011-system-architecture.md)
- [주문 및 재고 관리 시스템 ADR](007-order-stock-management.md)

## 참고자료
- [Domain-Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)
- [Implementing Domain-Driven Design](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577)

## 담당자
- 작성자: 안성훈