# Feedback SDK

## Proje Hakkında

 Bu proje, Vue3, Vite ve TypeScript kullanılarak son kullanıcıların geri bildirimlerini toplayacak bir feedback widget'ı sunar.

## Kurulum ve Entegrasyon

### Kurulum

```bash
# Gerekli paketlerin kurulumu
npm install

# Geliştirme sunucusunu başlatma
npm run dev

```
### Build oluşturma ve Entegrasyon

####  Build oluşturma

```bash
# Production build oluşturma
npm run build

```

 build komutu ile birlikte `"build": "tailwindcss -o build.css --minify && vue-tsc -b && vite build"` yapılandırması tetiklenir. 
 
 Tailwind CSS ile stil dosyalarını oluşturur ve minify eder, TypeScript ile yazılmış Vue bileşenlerinin hatalarını kontrol eder ve son olarak Vite kullanarak projeyi üretim için hazırlar.

 ####  Entegrasyon

 Hatasız gerçekleşen build işlemi sonrası dosya yapısı derlenen proje tek js dosyasında paketlenir.

```
src
dist              
    └── feedback-widget.iife.js     

```

**Örnek Kullanım;**

- SDK'nın kullanılacağı web projesine daha önceden paketlenen `feedback-widget.iife.js` dosyası import edilir. 

- Html dosyasına eklenen `<script src="dist/feedback-widget.iife.js" type="module"></script>` tag'i ile oluşturulan SDK implemente edilmiş olur. 

```
index.html
dist              
    └── feedback-widget.iife.js     

```

 ```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example Project</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="dist/feedback-widget.iife.js" type="module"></script>
  </body>
</html>
```




## Bağımlılıklar

### Ana Bağımlılıklar (dependencies)

- **axios**: HTTP istekleri için popüler bir kütüphane
- **classnames**: CSS sınıflarını dinamik olarak yönetme
- **vee-validate** & **yup**: Form doğrulama işlemleri için güçlü bir yapı
- **vite-plugin-string**: Dosya yollarını string yapılandırma için

### Geliştirme Bağımlılıkları (devDependencies)

- **@types/vue**, **typescript**, **vue-tsc**: TypeScript ile Vue.js entegrasyonu ve tip desteği
- **@vue/compiler-sfc**: Vue Single File Components (SFC) desteği
- **autoprefixer** & **prettier**: CSS tarayıcı uyumluluğu ve kod formatlama
- **vite** & **@vitejs/plugin-vue**: Hızlı ve modern frontend geliştirme ortamı

## Proje Yapısı

```
src/
├── main.ts                        # Uygulama başlangıç dosyası
├── api                            # API yapılandırması
├── components/                    # Yeniden kullanılabilir bileşenler
│   ├── index.ts               
│   ├── InputField.vue         
│   ├── ModalDialog.vue         
│   └── TextareaField.vue       
├── section/                       # Özelleştirilmiş bölümleri
│   ├── index.ts                
│   └── FeedbackWidget/         
│       ├── index.ts            
│       └── tabs/              
│           ├── FormStep.vue       
│           └── SubmittedStep.vue 
├── utils/                         # Yardımcı Araçlar
│   ├── index.ts       
│   ├── style.css             
│   ├── helper/
│   │   └── useLocalStorage.ts  
│   └── constants/
│       ├── shortcutStyle.ts    
│       └── themeVariant.ts     
├── global.d.ts                   # Global TypeScript tip tanımları
└── shims-vue.d.ts                # Vue dosya tip tanımlamaları
```

## Dosyalar ve Bileşenler

### Components (Temel Bileşenler)

- **InputField**: Modüler ve tekrar kullanılabilir input form bileşeni
- **ModalDialog**: Modüler ve tekrar kullanılabilir modal dialog bileşeni
- **TextareaField**: Modüler ve tekrar kullanılabilir textarea form bileşeni

### Sections (Özelleştirilmiş Bölümler)

#### FeedbackWidget
- **index.ts**: Modal ve widget'ın ana kontrol bileşeni
- **FormStep**: Modal içinde gösterilen form adımı (1. adım)
- **SubmittedStep**: Teşekkür mesajının gösterildiği adım (2. adım)

### Utils (Yardımcı Araçlar)

- **useLocalStorage**: Yerel depolama (localStorage) yönetimi için hook
- **shortcutStyle.ts**: Sık kullanılan CSS sınıflarının merkezi yönetimi
- **themeVariant**: Tema varyantları için stil sınıfları

### TypeScript Tanımlamaları

- **global.d.ts**: Global tip tanımlamaları
- **shims-vue.d**: Vue dosyalarının TypeScript tarafından tanınması için gerekli tanımlamalar

## Modüler Yapı ve Export Sistemi

### Index.ts Dosyalarının Önemi

Her klasörde bulunan `index.ts` dosyaları, o klasördeki bileşenlerin merkezi export noktasıdır. 

Bu yapının avantajları; 

- düzenli bir şekilde dışa aktarılmasını sağlamak
- modülerlik
- kolay içe aktarma 
- kod yönetimi ve geliştirme verimliliği


```typescript
// Tercih edilen kullanım
import { InputField, ModalDialog } from './components'

// Yerine
import InputField from './components/InputField.vue'
import ModalDialog from './components/ModalDialog.vue'
```
