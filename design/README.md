# design

Pencil(`.pen`) 디자인 파일. 코드와 같은 저장소에 두고 함께 커밋한다.

```
design/
  baseline.pen              구현된 코드 기준 시안 (as-built)
  pen-icons.js              공유 아이콘 렌더러 (script 노드가 참조)
  features/
    <feature-name>/
      explore.pen           탐색 시안
      README.md             결정 기록
```

## 두 종류의 파일

**`baseline.pen`** — "코드가 지금 이렇다". 구현을 반영하기만 하고, 여기서 임의로 디자인을 바꾸지 않는다.

**`features/*/explore.pen`** — "이러면 어떨까". 마음껏 버려도 된다. 확정돼서 구현되면 그때 `baseline.pen`에 반영한다. 반대 방향(baseline → explore)은 없다.

## 규칙

**feature 파일은 반드시 `design/features/<name>/` 한 depth에만 둔다.** 상대경로가 깊이에 묶여 있어서, 깊이를 섞으면 아이콘과 이미지가 깨진다.

| 위치 | 아이콘 | 프로젝트 이미지 |
|---|---|---|
| `design/*.pen` | `./pen-icons.js` | `../src/assets/images/...` |
| `design/features/*/*.pen` | `../../pen-icons.js` | `../../../src/assets/images/...` |

같은 depth끼리는 노드를 복사해도 경로가 유지된다. 다른 depth로 옮길 때만 경로를 고치면 된다.

## 아이콘

`src/assets/icons/*.svg`의 좌표를 그대로 옮긴 벡터를 `pen-icons.js`가 렌더한다. lucide 같은 대체 아이콘을 쓰지 말 것. 새 아이콘이 필요하면 `pen-icons.js`의 `I` 객체에 추가한다.

**SVG는 이미지 fill로 렌더되지 않는다.** PNG만 된다(`img_logo`, `img_graphic_*`는 실제 파일을 참조 중).

## Pencil 사용 시 주의

- `.pen`은 암호화 파일이다. Read/Write/Grep 금지, Pencil MCP로만 접근한다.
- 새 `.pen`은 에디터에서 만들어야 한다. MCP는 이미 열린 파일만 다룬다.
- `Replace()`는 동작하지 않는다. Insert + Move + Delete로 교체한다.
- `batch_design` 스코프는 호출 간 유지되지 않는다. 헬퍼는 매번 재정의한다.
- 새로 만든 노드는 렌더가 늦어서 `get_screenshot`이 한동안 빈 이미지를 반환한다. 구조 확인은 `snapshot_layout`이 확실하다.
- 섹션 제목에 `note` 노드를 쓰지 말 것. 지정한 height를 무시하고 커져서 시안을 가린다. 프레임 안의 `text`로 넣는다.
