# مراجعة تنفيذ CPS Website Blueprint v5

آخر تحديث: 8 سبتمبر 2026، بتوقيت القاهرة.

## النتيجة

تم تنفيذ جميع البنود البرمجية والمحتوى المتاح في
`CPS_Website_Blueprint_v5.docx` باللغتين العربية والإنجليزية. اجتاز المشروع
`npm run lint` و`npm run build`، ونجح Next.js في توليد 316 صفحة أثناء الـbuild.

المتبقي ليس عملًا برمجيًا يمكن استنتاجه بأمان، بل بيانات وأصول تحتاج اعتماد العميل:

- رقم الهاتف وواتساب الحقيقيان بدل `+966 50 000 0000`.
- البريد والعنوان وساعات العمل وروابط شبكات التواصل المعتمدة.
- صور المشاريع والإنتاج النهائية بدل الصور المؤقتة الحالية.
- اعتماد قائمة شعارات العملاء قبل نشرها كـsocial proof نهائي.

تم تشغيل الـseed غير الاستبدالي على dataset الحي، ثم تطبيق ترحيل Blueprint v5
على 21 وثيقة باستخدام transaction مع revision checks ونسخة احتياطية. أكد الفحص
النهائي أن خطة الترحيل أصبحت صفر وثائق.

## ما تم تنفيذه

### الهيكل والتنقل

- هيدر بخمسة مسارات أساسية، مع `Start a Project` و`View Our Work`.
- قائمة Services نصية للخدمات الثماني وشريط مستقل إلى Production Capabilities.
- فوتر بأعمدة Company / Services / Work / Contact، وسطر التموضع قبل الحقوق.
- إزالة Industries وLocations من الـsitemap النهائي مع الإبقاء على توافق الروابط القديمة.
- تحويل روابط أنواع الأجنحة القديمة إلى عناصر الكتالوج المقابلة بتحويلات دائمة.

### الصفحة الرئيسية

الترتيب الحالي مطابق للـBlueprint:

1. Hero الجديد.
2. Positioning statement centered بثلاث نقاط.
3. شبكة من ثماني بطاقات خدمات.
4. Production Capabilities highlight من خمس نقاط.
5. Featured Projects.
6. Why CPS بأربعة أسباب واضحة.
7. شعارات العملاء.
8. Closing CTA.

تم منع محتوى CMS القديم من إعادة الهيرو أو بنية الخدمات السابقة عندما لا تكون
وثائق الصفحة محدثة لبنية الخدمات الثماني.

### الخدمات والكتالوجات

- ثماني صفحات خدمات مستقلة تحت `/[locale]/services/[serviceSlug]`.
- كتالوج مستقل لكل خدمة، مع الفئات والبحث/الفلاتر حيث يطلبها المرجع.
- نصوص الهيرو، الـshowcase، Why CPS، المزايا، الصناعات، FAQ وCTA مطبقة باللغتين.
- نموذج Installation & Project Delivery يستخدم intake مناسبًا للخدمة بدل نموذج booth.
- Custom-Built Exhibition Booths يدعم city anchors للمدن السبع مع metadata محلية.
- إضافة `blueprintVersion: 5` إلى وثائق الخدمات، فلا يطغى CMS قديم على نسخة v5.
- سكربتا seed والترحيل يكتبان النسخة الكاملة للخدمة، وليس عناوين مختصرة فقط.

### قدرات الإنتاج

- صفحة مستقلة لعشر قدرات إنتاج.
- Highlight مختصر من خمس نقاط في الرئيسية.
- جدول مقارنة دلالي يوضح الفرق بين Services وProduction Capabilities.
- صورة الصفحة قابلة للتحرير من Site Settings مع fallback محلي.

### المشاريع

- دعم أكثر من خدمة للمشروع عبر `serviceSlugs` محليًا و`services[]` في Sanity.
- فلاتر Work تطابق أي خدمة مرتبطة بالمشروع مع industry مستقل.
- صفحات الخدمات تعرض المشاريع المرتبطة فقط، ولا تعرض بدائل غير صحيحة.
- تفاصيل المشروع تعرض قائمة Services Provided ونطاق العمل والقطاع والموقع.
- seed والترحيل يضيفان مراجع الخدمات وبيانات الفلترة للمشاريع الحالية.

### About وContact

- About يستخدم تموضع الشركة متعدد الخدمات ولا يعرض إحصاءات أو شهادات booth-only.
- Contact يقرأ hero وSEO والمحتوى من الوثيقة المنظمة مع fallback ثنائي اللغة.
- نماذج التواصل تظل عاملة ومتصلة بصندوق Sanity عند توفر write token.
- لم تُخترع بيانات اتصال أو ساعات عمل غير مقدمة من العميل.

## التحقق المنفذ

| الفحص | النتيجة |
| --- | --- |
| `npm run lint` | ناجح، صفر أخطاء وتحذيرات ESLint |
| `npm run build` | ناجح، compile وTypeScript وتوليد 316 صفحة |
| Sanity seed | ناجح؛ أنشأ الوثائق المفقودة وملأ الحقول الفارغة دون وضع الاستبدال |
| Sanity migration apply | ناجح؛ حدّث 21 وثيقة بمعاملة واحدة ونسخة احتياطية |
| Sanity verification dry run | ناجح؛ `Dry run: 0 documents` |

ظهر أثناء الـbuild تحذير غير حاجب من Node local storage؛ لم يؤثر في نجاح البناء
أو توليد الصفحات.

## إعادة تشغيل ترحيل Sanity مستقبلًا

عند الحاجة إلى مزامنة نسخة محلية جديدة، ضع `SANITY_API_WRITE_TOKEN` بصلاحية
تحديث dataset ثم شغّل:

```bash
node --import tsx scripts/migrate-blueprint-content.ts
node --import tsx scripts/migrate-blueprint-content.ts --apply
node --import tsx scripts/migrate-blueprint-content.ts
```

يجب أن يعرض الأمر الأخير `Dry run: 0 documents`.

## ملفات التنفيذ الرئيسية

- `src/content/service-architecture.ts`
- `src/content/dictionaries.local.ts`
- `src/content/projects.ts`
- `src/components/sections/service-architecture-page.tsx`
- `src/components/sections/catalogue-browser.tsx`
- `src/components/sections/production-capabilities-section.tsx`
- `src/components/sections/capability-explainer-section.tsx`
- `src/lib/dictionary.ts`
- `scripts/seed-sanity.ts`
- `scripts/migrate-blueprint-content.ts`

ملف `blueprint-v5-copy-diff.md` هو snapshot للمقارنة قبل اكتمال هذه الجولة، وليس
تقرير الحالة النهائي؛ هذا الملف هو المرجع الحالي لحالة التنفيذ.
