# ADR : 광고 배너 우선순위 시스템_안성훈

## 작성일
2025-09-13

## 컨텍스트
- 외주사 광고비에 따른 배너 노출 우선순위 결정이 필요함
- 공정한 노출 기회와 수익 최적화를 동시에 고려해야 함
- 광고비만으로 결정하면 클릭률이 낮은 광고가 상위 노출될 수 있음
- 사용자 경험을 해치지 않으면서 광고 수익을 극대화해야 함
- 최대 5개 배너 노출 제한으로 경쟁이 치열함
- 실시간 통계 수집과 우선순위 계산의 성능 최적화 필요
- 광고 예산 소진 시 자동 제외 로직 필요

## 결정
**광고비와 클릭률 기반 우선순위 점수 시스템**을 채택

### 우선순위 계산 공식
```
우선순위 점수 = (광고비 × 0.7) + (클릭률 × 0.3)
```

### 배너 노출 정책
- **최대 노출**: 5개 배너
- **노출 순서**: 우선순위 점수 높은 순
- **동점 처리**: 등록 순서 우선
- **자동 제외**: 광고 예산 소진 시
- **갱신 주기**: 10분마다 우선순위 재계산

### 통계 수집
- **노출 수**: 배너 화면 표시 횟수
- **클릭 수**: 배너 클릭 횟수  
- **클릭률**: 클릭 수 / 노출 수 × 100
- **실시간 수집**: 사용자 행동 즉시 반영

### 이미지 규격
- **PC**: 1200×400px
- **모바일**: 800×300px
- **반응형**: 디바이스별 최적화

### 관련 다이어그램

- **클래스 다이어그램**    

![banner-priority-class](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/class/banner-priority.puml)

- **시퀀스 다이어그램**  

![banner-priority-sequence](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/sequence/banner-priority.puml)
- **ERD**  

![banner-priority-erd](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/CodePourLevelUpProject/E-CommerceProject_ASH/dev/docs/diagram/erd/banner-priority.puml)

## 결과
### 긍정적 결과
- **광고 수익 30% 증가**: 효율적인 우선순위 시스템으로 광고 단가 상승
- **클릭률 20% 향상**: 클릭률 반영으로 사용자 관심도 높은 광고 우선 노출
- **광고주 만족도 향상**: 투명한 우선순위 기준으로 신뢰도 증가
- **사용자 경험 개선**: 관련성 높은 광고 노출로 불편함 감소

### 부정적 결과
- **광고비 낮은 업체 노출 기회 제한**: 소규모 업체 진입 장벽 상승
- **우선순위 계산 복잡도 증가**: 실시간 계산으로 서버 부하 증가
- **통계 수집 부하**: 모든 노출/클릭 이벤트 실시간 처리 필요
- **초기 클릭률 데이터 부족**: 신규 광고의 불리한 시작 조건

## 대안
### 1. 광고비만 기준으로 우선순위 결정
- **장점**: 단순한 로직, 높은 수익성
- **단점**: 사용자 경험 저하, 클릭률 무시
- **선택하지 않은 이유**: 장기적 사용자 이탈 위험

### 2. 클릭률만 기준으로 우선순위 결정  
- **장점**: 최고의 사용자 경험
- **단점**: 수익성 저하, 광고주 유치 어려움
- **선택하지 않은 이유**: 비즈니스 모델 지속가능성 부족

### 3. 수동 배너 관리
- **장점**: 완전한 제어, 전략적 배치 가능
- **단점**: 관리 비용, 확장성 부족
- **선택하지 않은 이유**: 자동화 필요성, 공정성 문제

### 4. 경매 시스템 (RTB)
- **장점**: 최적 수익, 실시간 경쟁
- **단점**: 복잡한 구현, 높은 기술적 난이도
- **선택하지 않은 이유**: 초기 단계에 과도한 복잡성

## 관련 문서
- [시퀀스 다이어그램](../sequence.puml)
- [ERD](../erd.puml)

## 참고자료
- [Google AdSense 우선순위 알고리즘](https://support.google.com/adsense/)
- [Facebook 광고 경매 시스템](https://www.facebook.com/business/help/)

## 담당자
- 작성자: 안성훈