# 🔥 Sıfırdan Elle — Mülakat Hazırlık Backlog'u

> AI'sız yazılacak ~100 küçük build. Her biri elimi ısıtır, bir açığımı kapatır,
> ve CV'mdeki gerçek bir teknolojiye bağlanır. Amaç hız değil — **"ben yazdım,
> ben savunurum" diyebilmek.** Uzun sürecek. Bitince hepsini yaptım diyeceğim.

---

## Nasıl kullanılır

- **Tek kural:** Kod AI'sız yazılır. Dokümana, MDN'e, resmi guide'lara bakmak **serbest**.
  Copilot / Cursor / ChatGPT'ye kod yazdırmak, "şunu yaz" demek **yasak.** Takıldığında
  önce kendin dener, sonra dokümana bakarsın. Bu, "neden"i öğrenmenin tek yolu.
- **El ısıtma** (günlük pazarlıksız iş) habit tracker'da. Bu README onun *malzemesi:*
  her gün buradan bir madde çekersin.
- **İşaretleme = commit.** Bir maddeyi bitirdiğinde `[ ]` → `[x]` yap, dört alanı doldur,
  commit et. Her commit GitHub'ını yeşilletir. Yavaş yeşiller ama **gerçek** yeşiller.
- **Sırayı boz ama atlama.** Numaralar zorluk sırası; canın bir üst fazdan bir şey
  isterse çek, ama temeli boşluk bırakma. Faz 1–3 diğer her şeyin altını tutar.
- **Dört alan neden var:**
  - *Nasıl yaptım* → gerçekten sen mi yazdın, çözümü kelimelerle kurabiliyor musun.
  - *Ne öğrendim* → mülakatta anlatacağın cümle burada doğar.
  - *Neyi yapamadım* → **en değerlisi.** Bir sonraki günün müfredatı budur. Boş bırakma,
    dürüst yaz; "hiç" yazıyorsan ya çok kolaydı ya kendini kandırıyorsun.

**İlerleme:** `0 / 100 tamamlandı`

---

## Yol haritası (kuşbakışı)

```
Faz 1  JS + TS temeli ......... "neden" kası, dil ikinci doğa olsun
Faz 2  HTML / a11y ............ seniorların hâlâ soğuk bilmesi beklenen kısım
Faz 3  React sıfırdan ......... router dahil, en çok zorlandığım yer
Faz 4  Vue .................... CV'de var, savunulmalı
Faz 5  Next.js / rendering .... server model, caching, i18n, SEO
Faz 6  Node / Express ........ katmanlama, cluster, graceful shutdown
Faz 7  NestJS ................ DI, guard/pipe/interceptor
Faz 8  Veritabanı ............ SQL, Prisma, Drizzle, Mongo, FTS
Faz 9  Redis + BullMQ ........ EN BÜYÜK AÇIĞIM — Scrape & Compare'in kalbi
Faz 10 Realtime + offline .... POS projemin kalbi, Socket.IO, sync, conflict
Faz 11 Auth + kripto ......... JWT, session, Ed25519 lisanslama
Faz 12 Scraping .............. Playwright, backoff, etik çerçeve
Faz 13 Media / SEO / i18n .... R2, ThumbHash, teknik SEO
Faz 14 Test .................. Vitest, RTL, Jest, e2e
Faz 15 Docker / deploy ....... multi-stage, compose, secret
Faz 16 CV savunması + system design .... mülakatı kazandıran kısım
```

---

## Faz 1 — JavaScript + TypeScript temeli

- [ ] **1. `debounce` ve `throttle`'ı sıfırdan yaz**
  - **Açıklama:** İkisini boş dosyada, kütüphanesiz yaz. Farkı bir cümleyle söyle. Arama kutusunda test et.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **2. `deepClone` ve `deepEqual` yaz**
  - **Açıklama:** İç içe obje/array'i klonla ve karşılaştır. `structuredClone`'un ne yaptığını, döngüsel referansın neden problem olduğunu gör.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **3. Sıralı vs paralel `await` — ölç**
  - **Açıklama:** 3 sahte async iş kur. Önce sırayla `await`, sonra `Promise.all`. Süreyi `console.time` ile kıyasla. Farkı anlat.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **4. Mini `Promise` yaz**
  - **Açıklama:** `then` zincirlenebilen basit bir promise sınıfı. `resolve/reject`, pending/fulfilled state. Neden microtask kuyruğunda çalıştığını anla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **5. Event loop çıktı tahmini**
  - **Açıklama:** sync + `Promise` + `setTimeout` karışık bir snippet yaz. Çalıştırmadan çıktı sırasını tahmin et, sonra çalıştır, tut/tutmadı yaz.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **6. Closure ile counter factory + module pattern**
  - **Açıklama:** Dışarıdan erişilemeyen private state tutan bir sayaç üretici. Closure'ın neyi kapattığını kelimelerle söyle.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **7. `this` + kendi `bind`'ini yaz**
  - **Açıklama:** `Function.prototype.myBind`. call-site kuralını (new > bind > method > plain) örneklerle göster. Arrow neden farklı?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **8. Prototype zinciri — class'sız kalıtım**
  - **Açıklama:** `Object.create` ile inheritance kur. `class`'ın altında ne olduğunu gör. `__proto__` vs `prototype`.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **9. `curry`, `compose`, `pipe` yaz**
  - **Açıklama:** Üçünü de elle. Fonksiyonel kompozisyonun okunabilirliğini bir örnekle göster.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **10. TS: tip-güvenli `Result<T, E>`**
  - **Açıklama:** try/catch yerine `{ ok: true, value } | { ok: false, error }` dönen fonksiyonlar. Generic kullan.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **11. TS: discriminated union + exhaustive switch**
  - **Açıklama:** Bir `Shape` union'ı (circle/square/…), alan hesabı, `never` ile eksik case'i derleme hatasına çevir.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **12. TS: utility type'ları elle yeniden yaz**
  - **Açıklama:** `Partial`, `Pick`, `Omit`, `Readonly`'yi mapped type ile kendin yaz. TS'in tip sistemini gerçekten anla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 2 — HTML / erişilebilirlik / platform

- [ ] **13. `<div onclick>`'i erişilebilir markup'a refactor et**
  - **Açıklama:** Tıklanabilir div'i `<button>`'a çevir, klavye + focus + `aria`. Neden semantic önemli, ekran okuyucu ne der?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **14. `defer` vs `async` — kur ve anlat**
  - **Açıklama:** İki script tag'i, farklı yükleme davranışı. Parse-blocking, sıra garantisi. Hangisi ne zaman?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **15. Erişilebilir modal (vanilla)**
  - **Açıklama:** Focus trap, `Esc` ile kapat, arkaya `aria-hidden`, açılınca focus içeri. Framework yok.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 3 — React sıfırdan (en çok zorlandığım yer)

- [ ] **16. `npm create vite` + tek component render**
  - **Açıklama:** Sıfırdan React projesi ayağa kaldır. Basit bir "Hello" component'i. Build çalışsın.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **17. `useState` sayaç + türev state tuzağı**
  - **Açıklama:** Sayaç yap. Sonra "iki katı"nı ayrı state'te tutma hatasını yap ve düzelt — türev değer render'da hesaplanır.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **18. react-router: 2 route + `Link`**
  - **Açıklama:** `/` ve `/about`, aralarında gezinme. Router'ı elle kur, dokümana bak, AI yok.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **19. react-router: nested route + layout + `Outlet`**
  - **Açıklama:** Ortak layout (navbar) + iç sayfalar. `Outlet` mantığını anla. "Router'da zorlanırım" korkusunu burada gömüyoruz.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **20. react-router: dynamic param + `useParams`**
  - **Açıklama:** `/user/:id`, param oku, o id ile içerik göster. 404 route'u da ekle.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **21. Route değişince veri çek**
  - **Açıklama:** Bir detay sayfası param'a göre `fetch` etsin. Param değişince yeniden çeksin. Basit CSS, sade tut.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **22. Controlled form + validation**
  - **Açıklama:** İsim/e-posta, state'e bağlı input, submit'te doğrulama, hata mesajı göster. `<form>` semantiği doğru olsun.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **23. Fetch → loading / error / empty → liste**
  - **Açıklama:** Gerçek bir public API. Dört state'i de doğru yönet, `key` array index OLMASIN. **Frontend turunun bel kemiği.**
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **24. `useEffect` cleanup + race condition**
  - **Açıklama:** Hızlı arama yaparken eski isteğin yeniyi ezmesini `AbortController` ile çöz. Cleanup neden var?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **25. Custom hook: `useFetch`**
  - **Açıklama:** 23'teki mantığı yeniden kullanılabilir hook'a çıkar. `{ data, loading, error }` dönsün.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **26. Custom hook: `useDebouncedValue` + autocomplete**
  - **Açıklama:** Kullanıcı yazarken debounce'lu arama. 1 numaradaki debounce'u hook'a bağla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **27. `useMemo` / `useCallback` / `memo` — gerçekten gerekli case**
  - **Açıklama:** Yavaş bir hesap kur, `useMemo` ile hızlandır. Çocuğu `memo`'la. Bunların perf ipucu olduğunu, correctness olmadığını göster.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **28. `useReducer` ile CRUD state**
  - **Açıklama:** Ekle/sil/güncelle aksiyonlarını reducer'da yönet. Ne zaman `useState` yerine `useReducer`?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **29. Context ile tema/auth — prop drilling'i çöz**
  - **Açıklama:** Derin bir ağaca context ile veri geçir. Context'in ne zaman re-render tetiklediğini gör.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **30. Infinite scroll (IntersectionObserver)**
  - **Açıklama:** Sona gelince yeni sayfa çek. Sentinel element + observer. C2C marketplace'inde işine yarar.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **31. Star rating component (kontrollü)**
  - **Açıklama:** Tıkla/hover ile puan. Klavye ile de çalışsın. Klasik canlı-kodlama sorusu.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **32. Tabs (aria + klavye)**
  - **Açıklama:** Sekmeler, ok tuşlarıyla gezinme, `role="tab"`. Erişilebilir tab paneli.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **33. React 19: `useActionState` + form action**
  - **Açıklama:** Yeni action API ile form submit + pending state. React 19 headline'ını elinle gör.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **34. React 19: `useOptimistic`**
  - **Açıklama:** Sunucu cevabı gelmeden UI'ı iyimser güncelle, hata olursa geri al. Bir "like" butonunda dene.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **35. React 19: `use()` + Suspense**
  - **Açıklama:** Bir promise'i `use()` ile oku, `<Suspense>` ile fallback göster.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 4 — Vue (CV'de var, savunulmalı)

- [ ] **36. Vue 3 setup + `ref` vs `reactive`**
  - **Açıklama:** Composition API ile kur. İkisinin farkını örnekle. CV'ndeki "Reactive"i gerçekten anla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **37. `computed` + `watch`**
  - **Açıklama:** Türev değer için computed, yan etki için watch. React'in `useMemo`/`useEffect` karşılığı nasıl kuruluyor?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **38. Vue'da fetch → liste (23'ün karşılığı)**
  - **Açıklama:** Aynı loading/error/empty ekranını Vue'da kur. İki mental modeli karşılaştırabil.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **39. Pinia store**
  - **Açıklama:** Global state. Neden Vuex yerine Pinia? Mülakatta bu trade-off'u sorabilirler (CV'nde ikisi de var).
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **40. Composable yaz (`useFetch` Vue versiyonu)**
  - **Açıklama:** 25'teki hook'un Vue karşılığı. Composable = React custom hook.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 5 — Next.js / rendering modelleri

- [ ] **41. Server vs Client Component**
  - **Açıklama:** Biri sunucuda fetch etsin (JS göndermesin), diğeri `"use client"` ile hook kullansın. Sınırı elinle çiz.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **42. Server Action ile form**
  - **Açıklama:** API route yazmadan sunucuda mutasyon. Progressive enhancement mantığını gör.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **43. Caching: `force-cache` vs `no-store` vs `revalidate`**
  - **Açıklama:** Üç fetch, üç davranış. Next 15 default'unu anla. Mülakatın favori tuzağı.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **44. Streaming + Suspense boundary**
  - **Açıklama:** Yavaş bölümü `<Suspense>` ile ayır, sayfa parça parça gelsin. TTFB vs LCP.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **45. SSG: dynamic route + `generateStaticParams`**
  - **Açıklama:** Build-time'da statik sayfalar üret. C2C marketplace'inin ürün sayfaları buna oturur.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **46. ISR: `revalidate` senaryosu**
  - **Açıklama:** Statik ama süreli tazelenen sayfa. SSG + tazeleme farkını anlat.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **47. i18n routing**
  - **Açıklama:** `/tr` `/en` `/ja` route stratejisi. C2C projendeki i18n'i gerçekten kur.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **48. Teknik SEO: metadata API + sitemap**
  - **Açıklama:** Dinamik `<title>`/OG, `sitemap.xml`, `robots`. 2M ziyaretçi SEO deneyimini teknik tarafa bağla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 6 — Node / Express API

- [ ] **49. Sıfır bağımlılık HTTP server**
  - **Açıklama:** Sadece `http` modülüyle route'lu bir server. Express'in altında ne var, gör.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **50. Express: controller / service / repository katmanları**
  - **Açıklama:** Bir kaynağı 3 katmana böl. İş mantığı controller'da olmasın. İstek yolunu çizebil.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **51. Edge validation (zod) + error contract**
  - **Açıklama:** Gelen body'yi kenarda doğrula, tutarlı hata formatı dön. Kötü input asla içeri girmesin.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **52. Async error handling wrapper**
  - **Açıklama:** Her handler'a try/catch yazmadan hataları merkezi middleware'e taşı.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **53. Graceful shutdown (SIGTERM)**
  - **Açıklama:** Yeni bağlantıyı kes, devam edeni bitir, kaynakları kapat, timeout'la çık. Neden `process.exit()` yetmez?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **54. Cluster ile çok çekirdek**
  - **Açıklama:** Node tek-thread'i çekirdek başına process'e böl. Paylaşılan state neden Redis'e gider? (Faz 9'a köprü.)
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **55. Rate limiter middleware (elle, token bucket)**
  - **Açıklama:** Kütüphanesiz IP başına limit. Sonra Redis'li versiyonuyla (72) kıyasla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **56. Fastify ile aynı API**
  - **Açıklama:** POS projendeki Fastify seçimini gerçekten anla. Express'ten farkı, neden daha hızlı iddiası?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 7 — NestJS

- [ ] **57. Module + provider + DI**
  - **Açıklama:** Bir service'i controller'a inject et. Dependency injection'ı elinle gör; Express'te elle yaptığını Nest bedava verir.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **58. DTO + `ValidationPipe`**
  - **Açıklama:** class-validator ile gelen veriyi doğrula. 51'deki manuel validation'ın Nest karşılığı.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **59. Guard (auth)**
  - **Açıklama:** Route'u koruyan bir guard. İstek lifecycle'ında nereye oturur?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **60. Interceptor**
  - **Açıklama:** Yanıtı sarmalayan / süreyi loglayan interceptor. Guard/pipe/interceptor/filter sırasını anlat.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **61. Exception filter**
  - **Açıklama:** Merkezi hata yakalama + tutarlı format. Scrape & Compare NestJS mimarisini savunabil.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 8 — Veritabanı

- [ ] **62. Ham SQL: join + index, `EXPLAIN` oku**
  - **Açıklama:** İki tabloyu join'le, index'siz ve index'li plan farkını `EXPLAIN` ile gör.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **63. N+1 problemini yarat ve çöz**
  - **Açıklama:** Döngüde sorgu atarak N+1 üret, sonra join/eager load ile çöz. Mülakatın klasik ORM sorusu.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **64. Prisma: schema + migration + relation**
  - **Açıklama:** İlişkili iki model, migration çalıştır, ilişkili sorgu yaz. C2C projendeki Prisma'yı elinle kur.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **65. Drizzle: aynı modeli SQLite'ta kur**
  - **Açıklama:** POS projendeki Drizzle+SQLite. Prisma ile farkı, neden offline için SQLite?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **66. Transaction + rollback**
  - **Açıklama:** İki yazma işlemini atomik yap; ortada hata olunca geri al. Neden gerekli, bir örnekle.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **67. Postgres full-text search**
  - **Açıklama:** `tsvector`/`tsquery` ile arama. C2C marketplace'inin FTS'ini gerçekten kur, `LIKE`'tan farkını anlat.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **68. MongoDB: modelle + aggregation**
  - **Açıklama:** Schema-less bir koleksiyon, `$group`/`$match` ile aggregation. CV'ndeki MongoDB'yi savunulabilir yap.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **69. Connection pool — neden önemli**
  - **Açıklama:** Havuzu küçük tut, çok istek at, tükenmeyi gözlemle. Her istekte yeni bağlantı neden kötü?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 9 — Redis + BullMQ (EN BÜYÜK AÇIĞIM)

> Scrape & Compare'in kalbi buydu ve kararları AI verdi. Bu fazı bitirince
> "neden BullMQ" sorusuna gerçekten kendi cümlelerimle cevap verebileceğim.

- [ ] **70. Redis temel komutlar**
  - **Açıklama:** Redis'i local çalıştır. `GET/SET/TTL/INCR/EXPIRE`. Redis nedir, neden in-memory, ne zaman kullanılır?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **71. Cache-aside elle**
  - **Açıklama:** Okuma: miss → DB'den çek → TTL ile Redis'e yaz. Yazma: değiştir → key'i invalidate et. Örüntüyü kur.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **72. Redis ile rate limit**
  - **Açıklama:** `INCR` + `EXPIRE` ile dağıtık limit. 55'teki in-memory versiyondan farkı: neden cluster'da Redis şart?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **73. BullMQ: producer + worker**
  - **Açıklama:** Bir job kuyruğa at, worker çeksin. En basit haliyle. Kuyruğun ne işe yaradığını elinle gör.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **74. BullMQ: retry + backoff + failed handling**
  - **Açıklama:** Bilerek çöken bir job, otomatik retry, artan backoff, `failed` event. Scraping'in dayanıklılığı burada.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **75. BullMQ: concurrency + rate limit + idempotency**
  - **Açıklama:** Aynı anda N job, dış API'ye limit, aynı job iki kez işlenirse ne olur? Idempotency key ile koru.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **76. "Neden HTTP içinde değil kuyrukta?" — savunma yaz**
  - **Açıklama:** Tek paragraf: uzun iş request'i bloklar, timeout olur, çökerse kaybolur → kuyruk hızlı döner, worker arkada çeker, retry devreye girer. Ezberleme, kendi cümlenle yaz.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 10 — Realtime + offline-first (POS projemin kalbi)

- [ ] **77. Socket.IO echo server + client**
  - **Açıklama:** Mesaj gönder, sunucu geri yollasın. WebSocket vs HTTP farkını anla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **78. Rooms + broadcast**
  - **Açıklama:** Bir odaya katıl, o odaya yayın yap. Çok istemcili senkron için temel.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **79. Offline queue: kopunca buffer, gelince flush**
  - **Açıklama:** Bağlantı kopunca işlemleri sırada tut, dönünce sunucuya boşalt. Offline-first'ün özü.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **80. Conflict resolution: LWW vs versioning**
  - **Açıklama:** İki istemci offline'ken aynı kaydı değiştirsin. Last-write-wins kur, sonra versiyon/timestamp ile daha iyisini. Mülakatta bu SORULUR.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **81. Electron: minimal main + renderer + IPC**
  - **Açıklama:** Masaüstü pencere aç, main↔renderer IPC ile konuş. POS'un Electron tarafını anla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **82. Offline-first sync mimarisini diyagramla + savun**
  - **Açıklama:** POS'un tüm sync akışını kağıda çiz (local DB → queue → socket → server → broadcast). 2 dakikada anlat.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 11 — Auth + kripto (POS lisanslama)

- [ ] **83. JWT: sign + verify elle**
  - **Açıklama:** header.payload.signature'ı kütüphaneyle üret ve doğrula. İmzanın ne koruduğunu (bütünlük, gizlilik değil) anla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **84. Session vs JWT — ikisini de kur**
  - **Açıklama:** Cookie-session ve JWT auth. Trade-off yaz: revoke, ölçek, XSS/CSRF. Hangi durumda hangisi?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **85. Ed25519: keypair + sign + verify**
  - **Açıklama:** Node crypto ile anahtar üret, bir "lisans" imzala, doğrula. POS lisanslama sistemini gerçekten anla.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **86. "Neden asimetrik? RSA vs Ed25519" — savunma**
  - **Açıklama:** Tek paragraf: private ile imzala, public ile doğrula → istemci kopyalayamaz/üretemez. Ed25519 neden RSA'dan tercih edildi (boyut, hız)? Kendi cümlenle.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 12 — Scraping (Scrape & Compare)

- [ ] **87. Playwright: sayfa aç, veri çek**
  - **Açıklama:** Bir sayfayı otomatik gez, veri topla. Kendi test sayfanda çalış, gerçek siteleri hedef alma.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **88. Pagination + adaptive backoff**
  - **Açıklama:** Sayfalar arası gez, hata/limit görünce bekleme süresini artır. Dayanıklı toplama.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **89. Etik/ToS çerçevesi yaz**
  - **Açıklama:** CV'ndeki "bot detection bypass" ifadesini mühendisliğe çevir: async orchestration, backoff, resilience. Mülakatta "bypass" yerine dayanıklılık anlat, sınırları bil.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 13 — Media / SEO / i18n

- [ ] **90. Image optimize pipeline (R2 mantığı, local mock)**
  - **Açıklama:** Yükle → yeniden boyutlandır → CDN key'iyle sun. Cloudflare R2 akışını local olarak taklit et.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **91. ThumbHash / blur placeholder**
  - **Açıklama:** Görsel yüklenene kadar bulanık önizleme. C2C'deki ThumbHash'i anla, LCP'ye etkisi.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **92. 120 makale SEO deneyimini teknik checklist'e çevir**
  - **Açıklama:** On-page/off-page bildiğini teknik SEO'ya bağla: semantic HTML, meta, hız, sitemap, canonical. Frontend performansıyla birleştir.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 14 — Test

- [ ] **93. Vitest: `debounce`/`throttle` unit test**
  - **Açıklama:** Fake timer ile zamanlamayı test et. 1 numarayı geri getirip test yaz.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **94. React Testing Library: form testi**
  - **Açıklama:** 22'deki formu test et: yaz, submit et, hata mesajını doğrula. "Kullanıcı gibi" test felsefesi.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **95. Jest: service mock + integration**
  - **Açıklama:** Bir Express/Nest service'ini mock'lu test et. Unit vs integration farkını anlat.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **96. e2e happy path (Playwright)**
  - **Açıklama:** Bir CRUD akışını uçtan uca test et. Test piramidinde e2e nerede durur?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 15 — Docker / deploy

- [ ] **97. Dockerfile + multi-stage build**
  - **Açıklama:** Bir Node app'i imajla. Multi-stage ile imaj boyutunu küçült. Layer cache nasıl çalışır?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **98. docker-compose: app + Postgres + Redis**
  - **Açıklama:** Scrape & Compare stack'ini tek `compose up` ile ayağa kaldır. Servisler nasıl haberleşir?
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **99. env + secret yönetimi**
  - **Açıklama:** Config'i koddan ayır, secret'ı repo'ya sokma. 12-factor'ın bu maddesini uygula.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Faz 16 — CV savunması + system design (mülakatı kazandıran kısım)

> Buraya en son gelinir. Artık her şeyi elinle yaptığın için CV'n silaha döner.

- [ ] **100. Her CV projesi için "neden bu stack" tek sayfa savunma**
  - **Açıklama:** 4 proje × her büyük kararın gerekçesi + "X olunca ne olur" sorusunun cevabı. Cevaplayamadığın satır = geri dönülecek madde.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **101. STAR × 4 hikâye**
  - **Açıklama:** A11y platform, offline POS, scraping motoru, C2C marketplace. Her biri 2 dakikada: Durum-Görev-Aksiyon-Sonuç.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **102. System design: URL shortener**
  - **Açıklama:** Hashing, DB şeması, okuma-ağırlıklı cache (Faz 9'u bağla), ölçek. Kağıtta çiz, sesli anlat.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **103. System design: rate limiter**
  - **Açıklama:** 55 + 72'yi tasarıma dök: token bucket, dağıtık Redis, trade-off'lar.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **104. System design: notification / job sistemi**
  - **Açıklama:** Kuyruk, worker, retry, dead-letter. BullMQ bilgini (Faz 9) mimariye çevir. Bu senin en güçlü kartın.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

- [ ] **105. Mock deep-dive: bir projeni seç, acımasız sorgulan**
  - **Açıklama:** Bir projeni seç ve her katmanına "neden" sorusu sordur (kendine ya da bir mentöre). Savunamadığın her yer, listeye yeni madde.
  - **Nasıl yaptım:** _(doldur)_
  - **Ne öğrendim:** _(doldur)_
  - **Neyi yapamadım:** _(doldur)_

---

## Bitiş kriteri

Bu backlog "bitti" demek, 105 kutunun işaretli olması değil — o bir yan ürün.
Gerçek bitiş şu: **CV'ndeki her satırı, kimse yardım etmeden, kendi cümlelerinle
savunabiliyorsun; ve boş bir editörde donmadan yazabiliyorsun.** O noktaya
geldiğinde zaten çoktan başvurmuş, çoktan mülakata girmiş olacaksın — çünkü
liste bitmeden başvurmak da bu planın parçası.

_“Neyi yapamadım” alanları senin en dürüst hocan. Onları boş bırakma._
