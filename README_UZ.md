# NEXUS — original source kod

Bu arxiv https://nexus-gaming.starlabuz.chatgpt.site sayti uchun yozilgan, 8 bo‘limli eng so‘nggi versiyaning source kodidir.

`dist/` ichidagi 10 ta fayl original Git versiyasidan o‘zgartirilmasdan olindi. HTML, CSS, JavaScript, uchta rasm, shrift va shrift litsenziyasi to‘liq kiritilgan.

## Ishga tushirish

Arxivni oching va terminalda `NEXUS_Source_Code` papkasiga kiring. Kompyuterda Python 3 o‘rnatilgan bo‘lsa, quyidagi buyruqlardan foydalaning.

Windows:

```powershell
py -m http.server 8000 --directory dist
```

Linux yoki macOS:

```bash
python3 -m http.server 8000 --directory dist
```

Brauzerda [http://localhost:8000](http://localhost:8000) manzilini oching. Serverni to‘xtatish uchun terminalda `Ctrl+C` bosing.

`index.html` faylini ikki marta bosib ochish o‘rniga HTTP server ishlating. Saytdagi `/assets/...`, `/style.css` va `/app.js` manzillari serverning asosiy papkasi `dist/` bo‘lishini talab qiladi.

Boshqa static server ham ishlatishingiz mumkin; uning document root papkasi `dist/` bo‘lsin. Asl sayt uchun npm paketlari, build, backend, ma’lumotlar bazasi yoki API kalitlari kerak emas.

## Fayllar vazifasi

- `dist/index.html` — sahifa tuzilishi va barcha matnlar.
- `dist/style.css` — asosiy dizayn, hero, kartalar, immersion va responsive qoidalar.
- `dist/experience.css` — uzun scroll sahnalari, parallax bo‘limlari, 4D bo‘lim va qo‘shimcha responsive qoidalar.
- `dist/app.js` — hero harakatlari, dunyo tanlash, immersion, ovoz va motion boshqaruvi.
- `dist/experience.js` — scroll jarayoni, portal zoomi, personaj qatlamlari, Eden ochilishi, chapter navigation va 4D tesserakt.
- `dist/assets/rift.webp` — oltin portal manzarasi.
- `dist/assets/eden.webp` — ko‘kimtir-yashil alien jungle manzarasi.
- `dist/assets/ranger.webp` — transparent fonli personaj.
- `dist/assets/display.woff` — saytda ishlatilgan shrift.
- `dist/assets/font-license.txt` — shrift litsenziyasi; tarqatishda saqlang.
- `NEXUS_Exact_Clone_Prompt.txt` — boshqa AI agentga berish uchun batafsil inglizcha prompt.
- `SOURCE_SHA256.json` — original 10 ta faylning o‘lchamlari va SHA-256 qiymatlari.

## Boshqa AI agentga berish

Agentga **ZIP va promptni birga** bering. Prompt rasmlar yoki shrift o‘rnini bosa olmaydi. Eng aniq natija — original fayllarni o‘zgartirmasdan ishga tushirish.

Sayt havolasi boshqa agentda ochilmasa ham, arxiv ichidagi fayllar yetarli. Live sayt egasining akkaunti yoki maxfiy ma’lumotlari talab qilinmaydi.

Bu ko‘chiriladigan source arxivi. Original saytning Git tarixi, akkauntga bog‘langan hosting konfiguratsiyasi yoki credentiallari arxivga kiritilmagan. Boshqa hostingga chiqarilsa, `dist/` ni asosiy static papka sifatida belgilang. Yangi domen uchun canonical va Open Graph manzillarini keyin alohida moslashtirish mumkin.

## Original fayllarni tekshirish

`SOURCE_SHA256.json` har bir original fayl uchun `path`, `bytes` va `sha256` ni saqlaydi. Export vaqtida fayllar original commit bilan baytma-bayt solishtirildi va ZIP ichidan qayta o‘qib tekshirildi.

- Source commit: `c82735eb94566169de24bb812cbe01d1f0db81b7`
- Export sanasi: 2026-09-24
- Dastlabki source fayllar soni: 10
- Sayt bo‘limlari: 8; ulardan 3 tasi scroll davomida ekranda turadigan sahnalar.

Barcha animatsiyalar brauzer ichida bajariladi. 4D tesserakt matematik proyeksiya orqali Canvas 2D’da chiziladi; personaj va manzaralar esa original rasmlar hamda CSS qatlamlaridir.
