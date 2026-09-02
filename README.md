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
4. **글리움 (Glium)** — 개인 원장과 공유 원장이 분리된 관계형 일상 네트워크
5. **멍냥레코드 (MungNyang Records)** — 스마트 OCR 기반 반려동물 평생 의료기록실
6. **기술 기반 & 로드맵** — Phase 1 → Phase 4

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

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다 (예: `funnysquare-site`, **Public**).
2. 이 폴더를 push 합니다.

   ```bash
   git remote add origin https://github.com/<계정명>/funnysquare-site.git
   git push -u origin main
   ```

3. 저장소 **Settings → Pages**에서 **Source**를 `Deploy from a branch`, **Branch**를 `main` / `(root)`로 지정합니다.
4. 1~2분 뒤 `https://<계정명>.github.io/funnysquare-site/` 에서 열립니다.

### 대표 도메인(funny-square.com) 연결

1. 저장소 루트에 도메인 한 줄만 담긴 `CNAME` 파일을 추가합니다.

   ```bash
   echo "funny-square.com" > CNAME
   ```

2. 도메인 DNS에 아래 레코드를 추가합니다.
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` `CNAME` → `<계정명>.github.io`
3. **Settings → Pages → Custom domain**에 `funny-square.com`을 입력하고, DNS 검증이 끝나면 **Enforce HTTPS**를 켭니다.

## 배포 전 확인할 것

- [ ] `index.html`의 문의 메일 주소 — 현재 `contact@funny-square.com` 자리표시자입니다. 실제 주소로 교체하세요. (`TODO` 주석으로 표시해 두었습니다)
- [ ] 푸터의 법인 정보 — 필요하다면 사업자등록번호 · 주소 · 대표자명을 추가하세요.
- [ ] 서비스 표기 — 브랜드 자료에는 `Gleaum`, 웹 카피에는 `Glium`으로 되어 있습니다. 한쪽으로 통일이 필요합니다.
- [ ] 앱 스토어 링크가 준비되면 각 서비스 섹션에 다운로드 버튼을 추가하세요.

---

© FunnySquare Inc.
