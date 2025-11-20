# ADR : 검색 시스템 설계_안성훈

## 작성일
2025-01-15

## 컨텍스트
- 기존 MySQL LIKE 검색의 성능 한계 극복 필요
- 한글 형태소 분석 및 동의어 처리 고도화 필요
- 실시간 검색 결과 및 자동완성 기능 제공
- 검색 로그 분석을 통한 개인화 추천 시스템 구축
- 상품 검색 정확도 95% 이상 달성 목표
- 검색 응답시간 100ms 이내 목표

## 결정
**Elasticsearch 8.x + Logstash + Kibana (ELK Stack) + 한글 형태소 분석기**를 채택

### 검색 아키텍처
```
[MySQL] → [Logstash] → [Elasticsearch] → [Spring Boot API]
                            ↓
                       [Kibana Dashboard]
```

### Elasticsearch 설정
```json
{
  "settings": {
    "analysis": {
      "analyzer": {
        "korean_analyzer": {
          "type": "custom",
          "tokenizer": "nori_tokenizer",
          "filter": ["lowercase", "nori_part_of_speech", "korean_synonym"]
        }
      },
      "filter": {
        "korean_synonym": {
          "type": "synonym",
          "synonyms": [
            "강아지,개,멍멍이",
            "고양이,냥이,고냥이",
            "사료,먹이,밥"
          ]
        }
      }
    }
  }
}
```

### 인덱스 매핑
```json
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "korean_analyzer",
        "fields": {
          "keyword": {"type": "keyword"},
          "ngram": {
            "type": "text",
            "analyzer": "ngram_analyzer"
          }
        }
      },
      "description": {
        "type": "text",
        "analyzer": "korean_analyzer"
      },
      "category": {
        "type": "keyword"
      },
      "price": {
        "type": "long"
      },
      "rating": {
        "type": "float"
      },
      "stock": {
        "type": "integer"
      },
      "created_at": {
        "type": "date"
      }
    }
  }
}
```

### 검색 기능
1. **전문 검색**: 상품명, 설명 기반 형태소 분석 검색
2. **자동완성**: N-gram 기반 실시간 검색어 제안
3. **필터링**: 카테고리, 가격대, 평점, 브랜드별 필터
4. **정렬**: 인기순, 가격순, 평점순, 최신순
5. **개인화**: 사용자 검색 이력 기반 추천

### Logstash 파이프라인
```ruby
input {
  jdbc {
    jdbc_driver_library => "/path/to/mysql-connector.jar"
    jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
    jdbc_connection_string => "jdbc:mysql://localhost:3306/ecommerce"
    jdbc_user => "user"
    jdbc_password => "password"
    statement => "SELECT * FROM products WHERE updated_at > :sql_last_value"
    schedule => "*/5 * * * *"
  }
}

filter {
  mutate {
    remove_field => ["@version", "@timestamp"]
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "products"
    document_id => "%{id}"
  }
}
```

### 검색 성능 최적화
- **샤딩**: 3개 샤드로 분산 처리
- **레플리카**: 각 샤드당 1개 레플리카
- **캐싱**: 자주 검색되는 쿼리 결과 캐시
- **배치 인덱싱**: 5분마다 증분 업데이트

## 결과
### 긍정적 결과
- **검색 성능**: 응답시간 50ms 이내 달성
- **검색 정확도**: 한글 형태소 분석으로 95% 이상 달성
- **사용자 경험**: 자동완성으로 검색 편의성 향상
- **분석 기능**: Kibana로 검색 트렌드 분석 가능
- **확장성**: 샤딩으로 데이터 증가에 대응

### 부정적 결과
- **인프라 비용**: Elasticsearch 클러스터 운영 비용 증가
- **복잡도**: ELK 스택 운영 및 모니터링 복잡도 상승
- **데이터 동기화**: MySQL과 Elasticsearch 간 동기화 지연
- **학습 비용**: 팀원들의 Elasticsearch 학습 필요

## 대안
### 1. MySQL 전문 검색 (FULLTEXT)
- **장점**: 추가 인프라 불필요, 단순한 구성
- **단점**: 한글 검색 한계, 성능 제약
- **선택하지 않은 이유**: 검색 품질 및 성능 한계

### 2. Apache Solr
- **장점**: 성숙한 검색 엔진, 풍부한 기능
- **단점**: Elasticsearch 대비 생태계 규모 작음
- **선택하지 않은 이유**: Elasticsearch의 더 나은 한글 지원

### 3. 외부 검색 서비스 (AWS CloudSearch)
- **장점**: 관리형 서비스, 운영 부담 없음
- **단점**: 비용 높음, 커스터마이징 제약
- **선택하지 않은 이유**: 비용 대비 효과 부족

## 관련 문서
- [상품 검색 전략 ADR](003-product-search-strategy.md)
- [시스템 아키텍처 ADR](011-system-architecture.md)

## 참고자료
- [Elasticsearch Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/)
- [Nori Korean Analyzer](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-nori.html)
- [Logstash Reference](https://www.elastic.co/guide/en/logstash/current/)

## 담당자
- 작성자: 안성훈