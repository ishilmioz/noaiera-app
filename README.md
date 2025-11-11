# noaiera - internetin sessiz odası

noaiera, sosyal medya ve yapay zekâ bombardımanından bunalmış insanlar için tasarlanmış,  sadece birkaç dakika boyunca hiçbir şey talep etmeyen bir “sessizlik” deneyimi.

- Reklam yok  
- Bildirim yok  
- Takip yok  
- Veri yok  
- Takipçi yok  
- Yapay zekâ yok  
- Sadece karanlık bir fon, loş bir görsel ve kısa cümleler

İnsanlar telefonlarını/bilgisayarlarını kapatmadan, yalnızca birkaç dakika için bile olsa gerçek bir sessizlik yaşayabilsin diye tasarlandı.

---

## Neden noaiera?

Dijital dünya çok hızlı.  
Her uygulama bir şey istiyor.  
Her sayfa konuşuyor.  
Her algoritma bağırıyor.

noaiera bunların tam tersi:

- Kullanıcıdan hiçbir şey istemez  
- İçerik dayatmaz  
- Kimseyi izlemez  
- Kimseyi yönlendirmez  
- Ölçmez, depolamaz, tanımaz

Bu proje, gerçek anlamda boşluk üretmek için var.


---


##  Kullanıcı Deneyimi

1. Sayfa açılır → loş bir arka plan belirir  
2. Kullanıcı etkileşimi sonrası Ambient ses (varsa) yumuşakça başlar  
3. Kısa, sert, net cümleler tek tek belirir  
4. Her cümle yavaşça kaybolur, diğeri gelir  

Form yok, scroll yok, CTA yok, “Bizi değerlendir” yok.  
Sessizlik biter, kullanıcı isterse çıkar, isterse tekrar izler.

---

## İroni (ve şeffaflık)

noaiera’nın kurulumu, metinleri ve arayüz kararları, geleneksel insan emeğinin yanında bir yapay zekâ asistanının desteğiyle üretildi. Bu detayı saklamıyoruz çünkü proje, “AI karşıtı” bir manifesto değil; dijital gürültüye karşı kısa süreli bir sessizlik alanı.

Ve bu ironiyi gizlemiyoruz.  
Bu proje,  “AI her yerde, hatta AI’dan kaçmak için inşa edilen yerde bile” demenin başka bir yolu. Teknolojiye değil, aşırılığa, hız takıntısına ve bitmeyen uyarana karşıyız.  
noaiera, yapay zekânın yardımıyla inşa edilip insanlara birkaç dakika sakinlik sunmayı amaçlıyor.

---

## Tech Stack

| Alan | Tercih |
|------|--------|
| Framework | **Next.js 14 (App Router)** |
| UI | **React + Framer Motion** |
| Stil | Tailwind + minimal CSS |
| Font | **DM Sans** |
| Ses | Web Audio API (ambient loop) |
| Dağıtım | Vercel veya benzeri statik barındırıcı |

Uygulama tamamen **client-side** çalışır.  
Sunucu isteği yok, API yok, analytics yok.


## Veri Politikası

- Cookie yok  
- Tracking yok  
- Analytics yok  
- LocalStorage yok  
- Form yok  
- “Sign in” yok  

**Hiçbir şey kaydetmiyoruz.**  
Bilerek.


---

## Geliştirme Süreci (Kısa Roadmap)

Bu proje fikirden ürüne çok hızlı geçti. Her aşamada amaç tek bir noktaya odaklandı: **sadelik**.

- İlk prototip: karmaşık animasyonlar → fazla dikkat çekti, silindi  
- Metinler önce çok yumuşak kaldı → daha kısa ve sert hale getirildi  
- Arka plan önce düz grid idi → loş, etkileyici bir görsel + karanlık maske tercih edildi  
- Tipografi sıradandı → DM Sans’a geçildi  
- Bazı tarayıcılarda ses autoplay engellendi → Web Audio API ile düşük volum loop yapıldı  
- Veri toplayabilecek her mekanizma özellikle devre dışı bırakıldı

**Geliştirme yaklaşımı:**

Bu süreçte ağır kurumsal süreçler değil, küçük ve hızlı iterasyonlar tercih edildi.  
Klasik Agile ritüelleri kullanılmasa da, aynı felsefe korundu:

- En kısa sürede çalışan ürün  
- Gereksiz plan yerine gerçek test  
- Eklemekten çok çıkarmak  
- “Kâğıt üzerindeki plan” değil, “ekrandaki deneyim”

İsterse bu yapı kolayca kurumsal Agile pratiklerine genişletilebilir:  
issue tracking, QA akışı, sprint planlaması ve ekip ölçeklendirilmesi mümkün.  
Ama **noaiera**, doğası gereği en yalın haliyle doğruydu.

---

##  Sonuç

noaiera, modern internetin tam tersidir.  
Kimseyi eğlendirmeye çalışmaz.  
Kimseyi ikna etmeye çalışmaz.


