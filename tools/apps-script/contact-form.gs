/**
 * 퍼니스퀘어 문의 폼 수신 스크립트
 * ────────────────────────────────────────────────────────────
 * funny-square.com 문의 폼이 보낸 내용을 구글 스프레드시트에 기록하고,
 * 원하면 알림 메일까지 보냅니다.
 *
 * 설치 방법은 저장소 README의 "문의 폼 연결" 항목을 참고하세요.
 * 요약: 스프레드시트 → 확장 프로그램 → Apps Script에 이 파일을 붙여넣고,
 *      배포 → 새 배포 → 웹 앱(액세스 권한: 모든 사용자)으로 배포한 뒤
 *      발급된 /exec 주소를 index.html의 data-endpoint에 넣습니다.
 */

/** 기록할 시트 이름. 없으면 자동으로 만듭니다. */
var SHEET_NAME = '문의';

/** 새 문의가 오면 알림 메일을 받을 주소. 비워두면 메일을 보내지 않습니다. */
var NOTIFY_EMAIL = '';

/** 폼에서 보내오는 문의 유형. 목록에 없는 값은 '기타'로 기록합니다. */
var ALLOWED_TYPES = ['제휴', '투자', '채용', '서비스 이용', '기타'];

var HEADERS = ['접수 시각', '이름', '이메일', '회사·소속', '문의 유형', '내용', '유입 페이지', '처리 상태'];


/** 문의 폼의 POST 요청을 처리합니다. */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'empty' });
    }

    var d = JSON.parse(e.postData.contents);

    // 허니팟: 사람은 절대 채우지 않는 항목. 채워져 있으면 봇이므로 조용히 무시합니다.
    if (d.website) {
      return json({ ok: true });
    }

    var name = trim(d.name, 60);
    var email = trim(d.email, 120);
    var org = trim(d.organization, 80);
    var message = trim(d.message, 2000);
    var type = ALLOWED_TYPES.indexOf(d.type) >= 0 ? d.type : '기타';

    // 프론트엔드 검증을 우회한 직접 요청에 대비해 서버에서도 확인합니다.
    if (!name || !message) {
      return json({ ok: false, error: 'invalid' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json({ ok: false, error: 'email' });
    }
    if (d.consent !== true) {
      return json({ ok: false, error: 'consent' });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      getSheet().appendRow([
        new Date(), name, email, org, type, message, trim(d.page, 300), '미처리'
      ]);
    } finally {
      lock.releaseLock();
    }

    notify(name, email, org, type, message);
    return json({ ok: true });

  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server' });
  }
}


/** 배포가 살아 있는지 브라우저에서 확인할 때 씁니다. */
function doGet() {
  return json({ ok: true, service: 'funnysquare-contact' });
}


/** 기록할 시트를 가져옵니다. 없으면 머리글과 함께 새로 만듭니다. */
function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#f1f3f4');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150);  // 접수 시각
    sheet.setColumnWidth(6, 420);  // 내용
  }
  return sheet;
}


/** 새 문의 알림 메일. 실패해도 접수 자체는 성공 처리합니다. */
function notify(name, email, org, type, message) {
  if (!NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '[퍼니스퀘어 문의] ' + type + ' — ' + name,
      replyTo: email,
      body: [
        '이름: ' + name,
        '이메일: ' + email,
        '회사·소속: ' + (org || '-'),
        '문의 유형: ' + type,
        '',
        message,
        '',
        '─────────────',
        '시트에서 보기: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
      ].join('\n')
    });
  } catch (err) {
    console.error('알림 메일 실패: ' + err);
  }
}


function trim(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}


function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
