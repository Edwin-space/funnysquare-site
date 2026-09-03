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

## 문의 폼 연결

문의 섹션은 메일 링크가 아니라 입력 폼입니다. GitHub Pages에는 서버가 없으므로,
제출된 내용은 **Google Apps Script 웹 앱**이 받아 스프레드시트에 기록합니다.

수신 스크립트는 [`tools/apps-script/contact-form.gs`](tools/apps-script/contact-form.gs)에 있습니다.

### 설치 절차

1. 구글 스프레드시트를 새로 만듭니다. (문의가 쌓일 곳)
2. **확장 프로그램 → Apps Script**를 엽니다.
3. 기본으로 열려 있는 `Code.gs` 내용을 지우고, `tools/apps-script/contact-form.gs`
   전체를 붙여넣은 뒤 저장합니다.
4. 새 문의 알림 메일을 받으려면 파일 상단 `NOTIFY_EMAIL`에 받을 주소를 적습니다.
   비워두면 시트에만 기록합니다.

   여러 명이 받으려면 **쉼표로 구분해 한 줄에** 적습니다.

   ```javascript
   var NOTIFY_EMAIL = 'a@example.com, b@example.com';
   ```

   > 같은 변수를 두 줄로 나눠 선언하면 뒤엣것이 앞엣것을 덮어써 **마지막 주소만**
   > 메일을 받습니다. 오류가 나지 않아 알아채기 어려우니 주의하세요.
   > 수신자 1명당 일일 발송 한도가 차감됩니다(개인 구글 계정 기준 하루 100통).
5. 우측 상단 **배포 → 새 배포 → 유형: 웹 앱**을 선택하고 다음처럼 지정합니다.
   - 실행 사용자: **나**
   - 액세스 권한이 있는 사용자: **모든 사용자**
6. 배포하면 권한 승인 창이 뜹니다. 승인 후 발급되는
   `https://script.google.com/macros/s/.../exec` 주소를 복사합니다.
7. `index.html`의 폼 태그 `data-endpoint`에 그 주소를 붙여넣고 커밋·push 합니다.

```html
<form class="form" id="contactForm" novalidate data-endpoint="https://script.google.com/macros/s/.../exec">
```

**현재 상태: 연결 완료.** 배포된 웹 앱이 `data-endpoint`에 지정되어 있고,
정상 접수 · 허니팟 차단 · 동의 누락 · 이메일 형식 오류 경로를 실제 엔드포인트로 확인했습니다.

배포가 살아 있는지는 `/exec` 주소를 브라우저에서 열어 확인할 수 있습니다.
`{"ok":true,"service":"funnysquare-contact"}`가 보이면 정상입니다.

> 스크립트를 고친 뒤에는 **배포 → 배포 관리 → 버전: 새 버전**으로 다시 배포해야
> 반영됩니다. 같은 배포를 수정하면 `/exec` 주소는 그대로 유지됩니다.

### 시트에 기록되는 항목

| 접수 시각 | 이름 | 이메일 | 회사·소속 | 문의 유형 | 내용 | 유입 페이지 | 처리 상태 |
|---|---|---|---|---|---|---|---|

머리글과 서식은 첫 문의가 들어올 때 자동으로 만들어집니다.
`처리 상태`는 `미처리`로 기록되니, 응대하며 직접 바꿔 쓰시면 됩니다.

### 전송 규격

```json
{
  "name": "...", "email": "...", "organization": "...",
  "type": "제휴 | 투자 | 채용 | 서비스 이용 | 기타",
  "message": "...", "consent": true, "website": "",
  "submittedAt": "ISO 8601", "page": "제출된 페이지 주소"
}
```

`Content-Type`은 `application/json`이 아니라 **`text/plain;charset=utf-8`** 입니다.
`application/json`은 CORS preflight(OPTIONS)를 유발하는데 Apps Script 웹 앱은
OPTIONS를 처리하지 못해 요청이 차단됩니다. `text/plain`은 preflight 없이 통과하고,
서버에서는 `JSON.parse(e.postData.contents)`로 그대로 읽습니다. **이 헤더는 바꾸지 마세요.**

`website`는 봇 차단용 허니팟입니다. 채워져 오면 프론트·서버 양쪽에서 무시합니다.
이름·이메일 형식·동의 여부는 서버에서도 다시 검증하므로, 폼을 우회한 요청은 기록되지 않습니다.

**엔드포인트가 비어 있는 동안**에는 제출 시 내용이 채워진 메일 앱이 열립니다.
문의가 유실되지는 않지만 자동 저장은 되지 않습니다.

## 남은 작업

- [x] ~~문의 폼 `data-endpoint` 연결~~ — 완료
- [ ] Apps Script의 `NOTIFY_EMAIL`을 채우면 새 문의가 올 때 알림 메일을 받을 수 있습니다
- [ ] 연결 확인용으로 넣은 테스트 문의 몇 건이 시트에 있습니다. 확인 후 삭제하세요
- [ ] 전송 실패 시 안내에 쓰이는 폴백 메일 주소가 `contact@funny-square.com` 자리표시자입니다. 실제 주소로 교체하세요
- [ ] 푸터의 법인 정보 — 필요하다면 사업자등록번호 · 주소 · 대표자명을 추가하세요.
- [ ] 멍냥레코드 출시 시 해당 섹션을 확장하고, 스토어 링크를 추가하세요.

---

© FunnySquare Inc.
