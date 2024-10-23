# MulakatChallenges

## <a name="table">İçerik Listesi</a>

1.  [Genel Yapı](#genel-yapi)
2.  [Sorgulama Paneli](#sorgulama-paneli)
3.  [Görev Yöneticisi Uygulaması](#gorev-yoneticisi-uygulamasi)
4.  [Kart Uygulaması](#kart-uygulamasi)
5.  [Kart Uygulaması Gerçek Dünya](#kart-uygulamasi-gercek-dunya)
6.  [Harita Uygulaması](#harita-uygulamasi)

## <a name="genel-yapi">Genel Yapı</a>

Öncelikle Merhabalar,

Genel yapıyı oluştururken her bir soru için ayrı ayrı Angular projesi oluşturup ayağa kaldırmak yerine tek bir proje üstünde çalışmayı tercih ettim. Her bir sorunun cevabını /soru-1, /soru-2 gibi routinglerle verip her bir soru için ayrı componentler üstünde çalıştım. Uygulamayı ilk ayağa kaldırdığınızda ve localhost:4200'e gittiğinizde karşınıza bir nav-bar çıkacaktır. Navbar'da bulunan butonlarla her bir soruya ulaşabilirsiniz. Kurulum için;

1. git clone gelecek buraya
2. npm install
3. npm run start
   adımları yeterli olacaktır.

## <a name="sorgulama-paneli">Sorgulama Paneli</a>

İlgili component => components/query-panel
url => localhost:4200/soru-1

Bu soruda anladığım, servis içerisindeki en az 5 tane field'ı seçip, bunlar üzerinden bir sorgu paneli oluşturmaktı. Seçtiğim fieldlar Cmn_Name, Sci_Name, Condition, Height ve Leaf_Area oldu. Kullanıcı bir veya birden fazla filtreleme yaparak filtrelediği verileri tabloda görmektedir. Tablo için angular material'in tablo componentini kullandım. Material Tablosunun içinde olan pagination ve sort özellikleri ile client-side pagination ve sort yapılabilmektedir. Kodun daha düzenli ve okunabilir olması adına ağaçlar ve geçilecek filtreler için interface oluşturdum. Apply Filters butonuna basıldığında ilgili filtrelerle URLSearchParams Objesi oluşturularak rest servisine isteğe çıkılmaktadır. Respnsive bir yapı olması adına elementleri flex hale getirdim.

## <a name="gorev-yoneticisi-uygulamasi">Görev Yöneticisi Uygulaması</a>

İlgili component => components/task-manager
url => localhost:4200/soru-2

Bu soruda anladığım, bir görev yöneticisinin, elemanlara görev atayabildiği, onaylayabildiği,görüntüleyebildiği ve chart üzerinden dağılım bilgisine erişebildiği bir uygulama oluşturmaktı. Chart için chart.js, table için angular material'in tablo componenti ve form için ise yine angular material form component ve ngForm kullandım. Kodun daha düzenli ve okunabilir olması adına, görevler için bir interface oluşturdum. Yönetici her görev eklediğinde veya bir görevi onayladığında updateChart fonksiyonu ile chart'ı güncelledim. Dökümanda yazan "Yönetici yeni görevler ekleyebilmeli (6 adet görev, 3 farklı kullanıcıya atanmalı)" gereksinim için örnek olması adına 3 farklı kişi ve 3 farklı görev tipi(Low,Medium, ve High Priority). Yönetici istediği kadar görev ekleyebiliyor. Yine responsive bir yapı olması adına html elementleri flex olacak şekilde düzenledim.

## <a name="kart-uygulamasi">Kart Uygulaması</a>

İlgili component ve servisler =>

1. components/a-card
2. components/b-card
3. components/c-card
4. ui/card-application(ana component)
5. data-access/fake-http.service
6. model/card-model/a-card.model.ts
7. model/card-model/b-card.model.ts
8. model/card-model/c-card.model.ts

url => localhost:4200/soru-3

Bu soruda anladığım, 3 karttan oluşan bir kart uygulamasında, uygulama ayağa kalktığı anda 3 kartın da farklı 5 adet veri ile rastgele bir şekilde doldurulup ekrana gösterilmesiydi. Beklenen yapıya uygun bir şekilde servis, model ve komponentlerimi oluşturdum. Kart için primeng kart komponenti kullandım. /soru-3 route'una gidildiği anda eş zamanlı olarak a,b ve c kartlarındaki ngOnInit fonksiyonu, fake servisteki ilgili fonksiyonu çağırıp kartları doldurmaktadır. Servis tarafında, servisi bekliyormuş hissiyatı yaratmak adına 0.5 saniyelik fake bir delay ekledim(get servislerinde Observable döndürdüğümden dolayı komponentte karşılarken ilgili methoda subscribe oluyorum. Servis methodlarının asenkron olması gerekir).Ekleme ve çıkarma işleri ise kart özelinde pop ve push fonksiyonları ile olmaktadır. Yine responsive bir yapı oluşturmak adına elementleri flex şekilde düzenledim.

## <a name="kart-uygulamasi-gercek-dunya">Kart Uygulaması Gerçek Dünya</a>

İlgili componentler ve servisler =>

1. components/advanced-card
2. ui/advanced-card-application(ana component)
3. data-access/fake-http.service
4. model/card-model/a-card.model.ts
5. model/card-model/b-card.model.ts
6. model/card-model/c-card.model.ts

url => localhost:4200/soru-4

Bu sorudan anladığım, işlevi 3. soru ile aynı olan bir kart uygulaması yapmaktı. 3. sorudan farkı ise bir kart komponentini tekrar kullanılabilir hale getirip kod okunabilirliğini artırmak ve tekrar eden kodları en aza indirgemektir. Bu sayede uygulama daha esnek, dinamik ve yeniden kullanılabilir olur. İpucunda yazdığı gibi ng-content ve ngContentTemplate kullandım. ng-contenti kart komponentinde değişiklik yapmadan, parent komponentten içerik göndermek için kullandım. ngContentTemplate'i ise silme butonunu kapsayan footerTemplate'i parent komponentten göndermek için kullandım. Dökümantasyonda "@for veya @ngFor işlemleri sadece ve sadece kart component içinde kalmalıdır." kısıtı olduğundan dolayı ana komponentte a,b ve c kartlarını for kullanmadan tek tek oluşturdum. Yine soru-3 ile aynı şekilde /soru-4 route'una gidildiğini anda ilgili servislere çıkılıp rastgele bir şekilde kartlar doldurulmaktadır. Ekleme işlemi için yine push fonksiyonu, silme işlemi için ise her bir item'in yanındaki sil butonuna basıldığında splice methodu ile ilgili itemi silme işlemini gerçekleştirdim. Yine responsive bir yapı oluşturmak adına elementleri flex şekilde düzenledim.

## <a name="harita-uygulamasi">Harita Uygulaması</a>

İlgili component => components/map-application
url => localhost:4200/soru-5

Bu sorudan anladığım, içerisinde featureLayer, tablo ve pop-up barındıran, seçilen feature'ın özet bilgisi ve tabloda detay bilgisinin gösterildiği bir uygulama oluşturmaktı. Önce dökümandaki featureLayer örneğini aynı şekliyle Angular'a geçirdim. Sonrasında ekranı %70 harita ve %30 tablo olacak şekilde bölüp angular material table componenti ile tabloyu oluşturdum. Diğer tablolarda olduğu gibi material tablosunun pagination ve sort özelliğini kullanarak client-side pagination ve sort implemente ettim. Tabloyu doldurmak için, tabloda kullanmak üzere seçtiğim fieldlarla beraber harita üzerindeki verileri featureLayer'ın REST API'ını kullanarak çektim ve tabloyu doldurdum. Pop-up için ise yine arcgis'in kendi popup componenti ile bir template oluşturup featureLayer'a verdim ve herhangi bir feature'a tıklandığında ufak bir tablo ile özet bilgileri içeren bir pop-up oluşturdum. herhangi bir feature seçili olduğunda(pop-up açıldığında), veya seçili olmadığında(pop-up kapandığında) tabloyu güncelleyip ilgili veriyi highlight etmek için yine @arcgis/core'un kütüphanesi olan reactiveUtils'ı kullanarak haritanın propertylerini izledim. watch() fonksiyonu selectedFeatureIndex değiştiğinde veyahut pop-up açılıp kapandığında tetiklenerek tabloyu güncellememi sağladı. selectedItem global değişkeni ile mat-cell elementlerine selected-row classı vererek item'ı turuncuya boyadım ve unshift methodu ile tablonun en üstüne gelmesini sağladım.
watch() fonksiyonunu implemente etmek için faydalandığım kaynak => https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes-reactiveutils/

Benim sorulardan anladığım, neler yaptığım ve neler kurguladığım genel olarak bu şekildeydi. Vakit ayırdığınız için teşekkür ederim.
