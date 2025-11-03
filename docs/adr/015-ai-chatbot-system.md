# ADR : AI 챗봇 시스템 설계_안성훈

## 작성일
2025-01-15

## 컨텍스트
- 고객 문의 응답 시간 단축 및 24시간 고객 지원 필요
- 반복적인 문의 사항에 대한 자동 응답 시스템 구축
- 상품 추천 및 주문 관련 안내 자동화
- 고객 만족도 향상을 위한 개인화된 서비스 제공
- 고객센터 운영 비용 절감 목표
- Spring AI를 활용한 MCP(Model Context Protocol) 구현

## 결정
**Spring AI + OpenAI GPT-4 + RAG(Retrieval-Augmented Generation)**를 채택

### AI 챗봇 아키텍처
```
[Client] → [WebSocket] → [Spring Boot] → [Spring AI] → [OpenAI API]
                              ↓              ↓
                         [Vector DB]    [Knowledge Base]
                              ↓
                         [Elasticsearch]
```

### Spring AI 설정
```yaml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      chat:
        options:
          model: gpt-4
          temperature: 0.7
          max-tokens: 1000
    vectorstore:
      elasticsearch:
        uri: http://localhost:9200
        index-name: knowledge-base
```

### 챗봇 기능
1. **상품 문의**: 상품 정보, 재고, 배송 관련 질문 응답
2. **주문 지원**: 주문 조회, 배송 추적, 취소/교환 안내
3. **상품 추천**: 사용자 선호도 기반 개인화 추천
4. **FAQ 응답**: 자주 묻는 질문 자동 응답
5. **실시간 상담**: 복잡한 문의 시 상담원 연결

### RAG 시스템 구현
```java
@Service
public class ChatbotService {
    
    @Autowired
    private ChatClient chatClient;
    
    @Autowired
    private VectorStore vectorStore;
    
    public String processQuery(String userQuery) {
        // 1. 벡터 검색으로 관련 문서 조회
        List<Document> relevantDocs = vectorStore
            .similaritySearch(userQuery, 5);
        
        // 2. 컨텍스트 구성
        String context = relevantDocs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\n"));
        
        // 3. 프롬프트 생성
        String prompt = String.format("""
            다음 정보를 바탕으로 사용자 질문에 답변해주세요:
            
            컨텍스트: %s
            
            사용자 질문: %s
            
            답변은 친절하고 정확하게 해주세요.
            """, context, userQuery);
        
        // 4. AI 응답 생성
        return chatClient.call(prompt);
    }
}
```

### 지식 베이스 구축
- **상품 정보**: 상품 상세, 사용법, 주의사항
- **정책 문서**: 배송, 교환, 환불 정책
- **FAQ 데이터**: 기존 고객센터 문의 데이터
- **사용자 매뉴얼**: 주문, 결제, 회원가입 가이드

### 대화 플로우 관리
```java
@Component
public class ConversationManager {
    
    private final Map<String, ConversationContext> sessions = new ConcurrentHashMap<>();
    
    public String processMessage(String sessionId, String message) {
        ConversationContext context = sessions.computeIfAbsent(
            sessionId, k -> new ConversationContext());
        
        // 의도 분석
        Intent intent = intentClassifier.classify(message);
        
        switch (intent) {
            case PRODUCT_INQUIRY:
                return handleProductInquiry(context, message);
            case ORDER_STATUS:
                return handleOrderStatus(context, message);
            case RECOMMENDATION:
                return handleRecommendation(context, message);
            default:
                return handleGeneralQuery(context, message);
        }
    }
}
```

### 성능 최적화
- **응답 캐싱**: 자주 묻는 질문 응답 캐시
- **스트리밍**: 긴 응답의 실시간 스트리밍
- **배치 처리**: 지식 베이스 업데이트 배치 작업
- **로드 밸런싱**: OpenAI API 호출 분산

## 결과
### 긍정적 결과
- **응답 시간**: 평균 3초 이내 즉시 응답
- **고객 만족도**: 24시간 지원으로 30% 향상 예상
- **운영 비용**: 고객센터 인력 50% 절감
- **문의 해결률**: 80% 이상 자동 해결 예상
- **개인화**: 사용자별 맞춤 상품 추천

### 부정적 결과
- **API 비용**: OpenAI API 사용료 월 100만원 예상
- **정확도 한계**: 복잡한 문의는 여전히 상담원 필요
- **할루시네이션**: AI 모델의 잘못된 정보 제공 위험
- **개인정보**: 대화 내용 보안 및 프라이버시 고려 필요

## 대안
### 1. 룰 기반 챗봇
- **장점**: 정확한 응답, 낮은 비용
- **단점**: 유연성 부족, 유지보수 복잡
- **선택하지 않은 이유**: 자연어 처리 한계

### 2. 오픈소스 LLM (Llama, Mistral)
- **장점**: 비용 절약, 데이터 보안
- **단점**: 성능 한계, 인프라 부담
- **선택하지 않은 이유**: GPT-4 대비 성능 차이

### 3. 외부 챗봇 서비스 (Dialogflow)
- **장점**: 관리형 서비스, 빠른 구축
- **단점**: 커스터마이징 제약, 종속성
- **선택하지 않은 이유**: E-Commerce 특화 기능 부족

## 관련 문서
- [시스템 아키텍처 ADR](011-system-architecture.md)
- [검색 시스템 ADR](014-search-system.md)

## 참고자료
- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [RAG 시스템 설계](https://arxiv.org/abs/2005.11401)

## 담당자
- 작성자: 안성훈