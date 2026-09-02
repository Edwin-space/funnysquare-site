# FunnySquare — 회사 홈페이지

주식회사 퍼니스퀘어(FunnySquare Inc.)의 공식 회사소개 웹사이트입니다.
빌드 과정이 없는 정적 사이트라, 저장소를 GitHub Pages에 연결하면 그대로 서비스됩니다.

> The Ecosystem of Daily Life — 파편화된 일상을 의미 있는 데이터로, 그리고 새로운 즐거움으로.

## 구성

| 경로 | 설명 |
|---|---|
| `index.html` | 사이트 전체 (마크업 · 스타일 · 스크립트가 한 파일에 들어 있습니다) |
| `assets/logo-mark.svg` | 심볼 (아이소메트릭 큐브). `currentColor`를 따르므로 어떤 배경에도 얹을 수 있습니다 |
| `assets/logo-wordmark.svg` | 워드마크 `Funny Square` |
| `assets/logo-lockup.svg` | 심볼 + 워드마크 세로 조합형 |
| `assets/favicon.svg` | 파비콘 (라이트/다크 자동 반전) |
| `assets/logo.png` / `logo-inverse.png` | 원본 래스터 로고. OG 이미지로도 사용합니다 |
| `robots.txt`, `sitemap.xml` | 검색엔진용 |
| `.nojekyll` | GitHub Pages의 Jekyll 처리를 끕니다 |

## 담고 있는 내용

1. **철학** — 파편화된 일상 → 의미 있는 데이터 → 새로운 즐거움
2. **생태계** — 에코 · 글리움 · 멍냥레코드와 이를 떠받치는 Core Infra
3. **에코 (Echo)** — Return, not reaction. 개인 GPS 운동 트래커
4. **글리움 (Gleaum)** — 개인 원장과 공유 원장이 분리된 관계형 일상 네트워크
5. **멍냥레코드 (MungNyang Records)** — 개발 중. 티저 수준으로만 노출합니다
6. **기술 기반 & 로드맵** — Phase 1 → Phase 4

## 공식 채널

| 서비스 | 웹사이트 | App Store | Google Play |
|---|---|---|---|
| 에코 (Echo) | [echo-space](https://edwin-space.github.io/echo-space/) | [id6795827065](https://apps.apple.com/kr/app/id6795827065) | — |
| 글리움 (Gleaum) | [gleaum.com](https://www.gleaum.com) | [id6795727692](https://apps.apple.com/kr/app/id6795727692) | [com.gleaum.app](https://play.google.com/store/apps/details?id=com.gleaum.app) |
| 멍냥레코드 | 개발 중 | — | — |

각 서비스 섹션과 푸터, `Organization` JSON-LD의 `sameAs` · `downloadUrl`에 모두 반영되어 있습니다.

## 멍냥레코드 공개 범위

개발 중인 서비스라 **의도적으로 축소해 노출**합니다. 아래 내용은 사이트에 싣지 않습니다.

- 스마트 스캐닝 4단계 등 구현 파이프라인
- 기능 상세 (다중 프로필 · 케어 알림 · 지식백과 · 건강 증명 등)
- OCR 등 핵심 기술 방식에 대한 서비스 단위 서술

대신 문제의식 · 시장 규모 · "출시와 함께 공개" 안내와 문의 CTA만 남겼습니다.
출시 시점에 이 섹션을 확장하면 됩니다.

## 기술 메모

- 의존성 없는 순수 HTML/CSS/JS. 번들러도, 프레임워크도 쓰지 않습니다.
- 다크 모드가 기본이며, 우측 상단 버튼으로 라이트 모드 전환이 가능합니다. 선택은 `localStorage`에 남고, 선택이 없으면 OS 설정을 따릅니다.
- 스크롤 리빌 · 섹션 하이라이트 · 숫자 카운트업은 `IntersectionObserver`를 씁니다. 미지원 브라우저에서는 즉시 최종 상태로 표시됩니다.
- `prefers-reduced-motion`을 존중해 모든 애니메이션을 끕니다.
- 폰트는 Pretendard Variable(jsDelivr) + JetBrains Mono(Google Fonts)를 CDN에서 불러옵니다.
- `Organization` JSON-LD 구조화 데이터를 포함합니다.

## 로컬에서 보기

```bash
python3 -m http.server 4321
```

브라우저에서 `http://localhost:4321` 을 엽니다.

## 배포

- **저장소** — [Edwin-space/funnysquare-site](https://github.com/Edwin-space/funnysquare-site) (`main` / root)
- **라이브** — <https://funny-square.com> (GitHub Pages + 커스텀 도메인, 저장소 루트의 `CNAME`으로 연결)

`main`에 push하면 GitHub Pages가 1~2분 안에 자동 반영합니다.

```bash
git push origin main
```

> `CNAME` 파일을 지우면 커스텀 도메인 연결이 끊깁니다. force push나 파일 정리 시 주의하세요.

## 남은 작업

- [ ] `index.html`의 문의 메일 주소 — 현재 `contact@funny-square.com` 자리표시자입니다. 실제 주소로 교체하세요. (`TODO` 주석으로 표시해 두었습니다)
- [ ] 푸터의 법인 정보 — 필요하다면 사업자등록번호 · 주소 · 대표자명을 추가하세요.
- [ ] 멍냥레코드 출시 시 해당 섹션을 확장하고, 스토어 링크를 추가하세요.

---

© FunnySquare Inc.
