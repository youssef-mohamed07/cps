# مراجعة تنفيذ CPS Website Blueprint

تاريخ المراجعة: 8 سبتمبر 2026، بتوقيت القاهرة.

**النتيجة: الهيكل الجديد موجود بدرجة كبيرة، لكن الموقع لا يطابق الملف نصيًا أو وظيفيًا بعد.** أهم الفجوات هي بقاء الهيرو والفوتر القديمين في المحتوى المعروض، عدم انتقال تصنيفات المشاريع الجديدة إلى البيانات المستخدمة فعليًا، واختصار معظم نصوص الخدمات والكتالوجات. توجد كذلك اختلافات واضحة عن توجيهات شكل السكاشن.

المرجع هو [CPS_Website_Blueprint_v5.docx](CPS_Website_Blueprint_v5.docx). اسم الملف v5 لكن عنوانه الداخلي `Website Content + Structure Blueprint — v2`؛ هذه المراجعة تعتمد محتواه الموجود، وليس افتراض نسخة أخرى. [المقارنة النصية التفصيلية](blueprint-v5-copy-diff.md) تعرض 876 بندًا من صفحات الخدمات والكتالوجات والمكونات المشتركة، بالنص المطلوب والنص المنفذ كاملين. بنود المطابقة ليست نسبة إنجاز: تشمل أسماء وأزرارًا مكررة، بينما بعض الفجوات الوظيفية أهم من عشرات النصوص المطابقة.

## نطاق التحقق وحدوده

- قُرئ نص المستند كاملًا، بما فيه الجداول وتعليمات المطور وقائمة التنفيذ. المراجع أدناه بأسماء أقسام المستند؛ لم تتوفر بيئة المستندات المجهزة لرندر Word، ولذلك لا توجد أرقام صفحات ورقية أو ادعاء بفحص تنسيق Word بصريًا.
- فُحصت ملفات المحتوى، قوالب الصفحات، CSS، مخططات Sanity، الاستعلامات والـloaders، سكربت seed والتحويلات. استُخدم Git diff لتمييز ما تغير فعلًا عن آخر commit مما كان موجودًا مسبقًا. لا يُنسب قصد تغيير التصميم إلى صاحبه دون دليل.
- قُرئ HTML المستجيب من `http://localhost:3002`، بما فيه المحتوى القادم من CMS: 32 صفحة خدمات وكتالوج بالعربي والإنجليزي، و14 صفحة أساسية باللغتين، و5 صفحات تفاصيل مشاريع إنجليزية، و4 حالات فلترة. كلها استجابت HTTP 200. أربع عينات روابط قديمة استجابت 308 إلى الوجهات الجديدة.
- تم التحقق من 822 نصًا منفردًا في عمود التنفيذ بجدول مقارنة الخدمات والكتالوجات مقابل HTML المستجيب؛ جميعها موجودة. عدد كروت الكتالوجات في HTML هو 122 بالإنجليزية و122 بالعربية.
- المتصفح المتصل غير متاح. لذلك مراجعة الشكل مبنية على القالب وCSS وGit diff، وليست اعتمادًا بصريًا للـdesktop/mobile أو اختبار نقر وحركة. النص الموجود في HTML قد يكون داخل Accordion أو قائمة مغلقة، وليس بالضرورة ظاهرًا كله في اللحظة نفسها. أرقام العدادات الأولية في HTML لا تُعامل هنا كخطأ، لأنها تتحرك بعد تشغيل JavaScript.
- لم تُرسل نماذج فعلية ولم يُكتب أي محتوى في Sanity. تم إنشاء تقريري المراجعة فقط، دون تعديل تنفيذ الموقع.
- المستند إنجليزي؛ لا توجد نسخة عربية مرجعية تسمح بالحكم على الترجمة كلمة بكلمة. فُحص وجود العربية واتساقها والمشكلات المشتركة، وليس اعتماد ترجمة غير موجودة في المرجع.

## أهم الفجوات المؤكدة

| الأولوية | النتيجة | الدليل والأثر |
| --- | --- | --- |
| عالية | الهيرو الجديد موجود في local لكنه لا يظهر فعليًا | `/en` يعرض `Everything your booth needs, under one roof.` و`Request a Quote`؛ `/ar` يعرض «كل ما يحتاجه جناحك — تحت سقف واحد.» و«اطلب عرض سعر». |
| عالية | الفوتر يعرض الوصف القديم | `Exhibition booth design, fabrication, and install — end to end.` بدل شعار الخدمات المتعددة. `resolveFooter` يعطي `remote.description` الأولوية. |
| عالية | تصنيف المشاريع غير منتقل إلى العرض | `/en/work?service=exhibitions-booths` و`?service=retail-displays&industry=fmcg` و`?industry=technology-electronics` تعرض صفرًا رغم وجود المشاريع الأصلية. التفاصيل تعرض slugs قديمة مثل `technology` و`healthcare` و`energy`. |
| عالية | Recent Projects فارغ في الخدمات الثماني | كل صفحة تعرض `Published case studies for this service will appear here.`؛ الربط بالكود موجود لكن بياناته الحالية لا تعطي نتائج. |
| عالية | حقول تفاصيل المشاريع غير مكتملة فعليًا | المشاريع الخمسة لا تعرض `Services Provided`؛ `Scope of Work` يعرض اسم نوع الجناح فقط بدل النطاق التفصيلي الجديد. |
| متوسطة | اختيار Showcase غير مطابق في 6 خدمات | السبب المباشر `flatMap(...).slice(0, 5)` بدل اختيار featured مستقل بالترتيب والوصف المطلوبين. |
| متوسطة | المحتوى مختصر بشكل واسع | 122 اسم عنصر مطابق؛ 6 أوصاف فقط مطابقة حرفيًا و116 وصفًا مختلفًا. الاختلاف لا يعني غياب المنتج، لكنه يعني أن copy الملف لم يُطبق كما هو. |
| متوسطة | نموذج التواصل العام ما زال booth-only | `Event & booth`، أنواع الأجنحة، وخدمات النموذج القديمة؛ زر الإرسال المحلي `Send brief` بدل `Send Your Project Details`. |
| متوسطة | CTA الهيدر ليس ظاهرًا دائمًا | CSS يخفي `site-header-cta` تحت 640px؛ مخالف لعبارة `always visible` في المرجع. |
| متوسطة | حقل ساعات العمل يعرض نصًا غير مناسب | صفحة التواصل تعرض تحت `Business hours`: `Based in Riyadh — delivering exhibitions across Saudi Arabia, the GCC, and Egypt.` |

## 1. الهيدر والتنقل

المرجع: القسم 4 وGLOBAL في القسم 16.

| المطلوب | الحالة الحالية | الحكم |
| --- | --- | --- |
| `Home / About / Services / Projects / Contact` | نفس ترتيب التنقل في العرض الحالي | منفذ |
| 8 خدمات وروابط إلى Service page | موجودة في مصدر التنقل الجديد | منفذ في الكود؛ فتح القائمة لم يُختبر بالنقر |
| شريط بعرض القائمة: `See how we build it → Production Capabilities.` | بطاقة featured مصورة جانبية داخل Mega Menu بدل شريط أسفل قائمة بسيطة؛ النص موزع بين عنوان وزر ووصف إضافي | نفس الوجهة، شكل وصياغة مختلفان |
| `Start a Project` دائم الظهور | ظاهر في HTML، لكن مخفي تحت 640px خارج قائمة الموبايل | منفذ جزئيًا |
| `View Our Work` بجانب الزر | موجود، ويظهر بجانب الزر بدءًا من 1120px؛ نسخة أخرى في قائمة الموبايل | منفذ مع اختلاف responsive |
| Insights في الفوتر فقط حاليًا | ليس ضمن عناصر الهيدر الخمسة | منفذ |

**الشكل:** استُخدم نظام الـMega Menu المصور الموجود، بتقسيم `Environments` و`Production & Delivery` وبطاقة قدرات الإنتاج. لم يتحول إلى القائمة النصية والشريط الموصوفين في الملف.

المصادر: `src/content/navigation.ts`، `src/lib/navigation.ts`، `src/components/layout/site-header.tsx`، `src/components/layout/mega-menu-panel.tsx`، `src/app/globals.css:65` و`:732`.

## 2. الرئيسية /en و/ar

المرجع: القسم 5 والقسمان 9 و10. ترتيب التنفيذ الحالي: Hero → Positioning/Lifecycle → Services → Production Capabilities → Featured Work → Why CPS → Logos → Closing CTA. السكاشن السبعة الأساسية موجودة مع Logos إضافي، لكن النص والشكل ليسا مطابقين بالكامل.

### 01 Hero

| الحقل | المطلوب حرفيًا | المعروض فعليًا بالإنجليزية |
| --- | --- | --- |
| Eyebrow | Production. Fabrication. Fit-Out. | #1 Exhibition Booth Design & Production in Riyadh، مع تدوير المدن في المكون |
| Headline | Exhibitions. Events. Interiors. Displays. Built under one roof. | Everything your booth needs, under one roof. |
| Sub-headline | One production facility. Eight services. Built and installed in-house. | Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house. |
| Primary CTA | Start a Project | Request a Quote |
| Secondary CTA | See What We Build | View Our Work |

النصوص المطلوبة الخمسة موجودة في `dictionaries.local.ts`؛ سطر العنوان مقسوم إلى سطرين فقط محليًا. لكن الدمج مع `homePage.hero` يسمح بعودة النص القديم، لأن شرط قبول الـCMS يعتمد على قائمة الخدمات ولا يتحقق من تحديث الهيرو نفسه. النتيجة القديمة مؤكدة أيضًا في العربية.

**الشكل:** مكون `HomeHero` نفسه لم يتغير في Git diff الحالي؛ ما زال يستخدم الصور العائمة والفيديو/البوستر وإمكانية تدوير المدن. إبقاء layout يطابق التوجيه، لكن توسيع الصور وراء الأجنحة غير مثبت بصريًا؛ مراجع الصور ما زالت خليطًا من صور الأجنحة والخدمات القديمة وUnsplash، لا حملة صور جديدة موثقة.

### 02 Positioning Statement

Eyebrow `Who We Are` والعنوان `One production partner. Multiple capabilities.` والسطر `One team carries every project from technical drawing to final install.` مطابقة في العرض.

| نقطة الملف | التنفيذ |
| --- | --- |
| Exhibition booths, event structures, branded interiors, retail displays, signage and custom fabrication — all under one roof | عنوان مضاف `Multiple environments` + `Exhibitions, events, interiors, retail displays, signage and custom fabrication.` |
| In-house production across wood, metal, acrylic, printing and installation | عنوان `In-house production` + `Wood, metal, acrylic, printing and installation on one production floor.` |
| One point of contact from concept through handover | عنوان `One point of contact` + `One accountable team from concept through handover.` |

**الشكل مختلف:** الملف يطلب بلوك نصي بسيط centered؛ التنفيذ أبقى `LifecycleSection`: عمود نص، صورة جانبية، ثلاثة عناصر مرقمة بأيقونات وعناوين وأوصاف. هذا احتفاظ بالمكون القديم مع تغيير copy، لا تصميم جديد مؤكد غرضه استيعاب النص. الصورة البديلة المحلية ما زالت تصف بناء جناح معرض.

### 03 Services Overview

- الخدمات الثماني وأوصافها الثمانية مطابقة للمستند، وبنفس الترتيب. الروابط تصل إلى Service pages الجديدة.
- `Eight services. One production floor.` والسطر الداعم مطابقان. `What we do` يختلف في حالة الأحرف فقط عن `What We Do`.
- زر `See All Services` إضافة؛ لا توجد وصلة Catalogue منفصلة لكل خدمة في هذا السكشن، وهو ليس نقصًا في شرط الروابط الذي يطلب التوجه إلى Service page.
- **الشكل غير مطابق لتوجيه 8-card grid:** ما زالت قائمة `service-expand-list` تتوسع مع hover/focus وتعرض صورة للخدمة النشطة. Git diff يثبت أن المكون تغيّر فيه الرابط فقط، ولم يُبن grid جديد للرئيسية. يوجد grid بالفعل في صفحة `/services`، ولا يُعد بديلًا عن طلب الرئيسية.
- المرجع نفسه يقول في القسم 9 إن card layout يمكن أن يبقى، بينما القسم 5 يحدد 8-card grid؛ النتيجة الحالية أقرب للاحتفاظ بالتنفيذ السابق، ويجب تسجيلها كاختلاف عن التوجيه الأكثر تحديدًا.

### 04 Production Capabilities Highlight

Eyebrow والعنوان والزر `See Our Production Capabilities` مطابقة. السطر الداعم زاد `, from raw material to final install.` بعد نص المرجع.

| قائمة الملف الرئيسية، 5 نقاط | القائمة الحالية، 10 عناصر |
| --- | --- |
| Carpentry, joinery & CNC wood cutting | Carpentry & Joinery؛ CNC Routing & Cutting |
| Metal fabrication, laser cutting & powder coating | Metal Works؛ Laser Cutting؛ Painting & Finishing، دون ذكر powder coating صراحةً هنا |
| Acrylic fabrication & signage production | Acrylic Fabrication؛ Signage Production |
| Large-format printing & finishing | Large-Format Printing؛ Painting & Finishing |
| Assembly, installation & nationwide delivery | Assembly & Pre-Build؛ On-Site Installation، دون ذكر nationwide delivery صراحةً هنا |

**الشكل:** أضيف مكون جديد مقسوم لصورة ولوحة كحلية، والقائمة داخل اللوحة عمودان ثم عمود على الموبايل. `BeforeAfterSection` القديم أزيل من الرئيسية؛ لم يُستدع داخل المكون الجديد. إذن تحقق إزالة التكرار/استبدال السكشن، لكن إعادة استخدام نفس مكون split-screen حرفيًا لم تحصل. استخدام قائمة صفحة القدرات ذات 10 عناصر في الرئيسية زاد كثافة المحتوى عن الـhighlight المطلوب.

### 05 Featured Projects

- `Our Work` و`Recent work` مطابقان. `View all projects` اختلاف capitalization عن `View All Projects`.
- السطر المطلوب `A look at what's gone out the door recently, across services.` **لا يظهر**؛ نسخة معدلة منه موجودة في dictionary لكن `FeaturedWork` لا يأخذ `support` ولا يعرضه.
- المعروض: Northline، Aether Labs، Qamar. Pulse Retail، الذي وصفه أوضح كمشروع retail غير booth، ليس ضمن الثلاثة.
- يوجد tag مثل Technology / Healthcare / FMCG. لا تكفي هذه الوسوم لإثبات وجود مشروع non-booth؛ Aether Labs ما زال وصفه Modular booth، وQamar موصوف ضمن برنامج kiosk للمعارض. لا يوجد دليل كافٍ لاعتماد شرط «مشروع واحد غير booth» باعتباره مكتملًا.
- **الشكل:** ما زال مشروع رئيسي كبير ثم مشروعان، من المكون السابق؛ الاختيار `items.slice(0, 3)` وليس ضمان اختيار متعدد الخدمات.

### 06 Why CPS

Eyebrow والعنوان مطابقان، لكن السطر `Everything stays in-house, so nothing gets lost between subcontractors.` لا يظهر كاملًا.

| المطلوب | الحالي |
| --- | --- |
| In-house production across wood, metal, acrylic, printing and signage | `Everything stays in-house` + `Wood, metal, acrylic, printing and signage stay with one accountable production team.` |
| Nationwide site survey, installation and dismantling | `Nationwide project delivery` + `Site survey, logistics, installation and dismantling are coordinated across Saudi Arabia.` |
| Single point of contact from technical drawing to handover | ليس بندًا مستقلًا في Why CPS؛ جزء من المعنى موزع في سكشن Positioning |
| Delivered for Ajlan & Bros, SNB, SAB, Sirar by STC, Al Hilal، بعد التأكيد | لا يظهر كسطر مطابق داخل السكشن؛ Logos مستقل بعده، ولا يوجد دليل اعتماد قائمة العملاء |

**الشكل:** احتُفظ بالـbento القديم: صور وثلاثة مواضع صور مع بطاقتي نص، بدل أربعة أسباب واضحة. إضافة عناوين قصيرة ودمج النقاط سمحا باستخدام القالب الحالي، لكن لا يوجد دليل يثبت أن الاختصار كان ضروريًا؛ يمكن تصميم السكشن ليستوعب النص الأصلي.

### 07 Closing CTA

العنوان `Have a project in mind?` والزر `Start a Project` مطابقان. السطر الحالي `Tell us what you are building and we will get back to you with next steps.` بدل `Tell us what you're building and we'll get back to you with next steps.`؛ اختلاف صياغة بسيط لا اختلاف معنى.

**ما أزيل فعلًا من الرئيسية مقارنة بآخر commit:** Stats، Booth Types، Before/After، Clients testimonials، Brief Form، FAQ، Contact section. Logos انتقل من بعد الهيرو إلى بعد Why CPS، وأضيف CTA band جديد. هذه إزالة فعلية من الصفحة، وليست بالضرورة حذفًا للمكونات من المشروع؛ بعضها ما زال يظهر في الصفحات الداخلية.

المصادر: `src/app/[locale]/page.tsx`، `src/lib/dictionary.ts`، `src/sanity/load-pages.ts`، `src/content/dictionaries.local.ts`، والمكونات `home-hero` و`lifecycle-section` و`services-section` و`production-capabilities-section` و`featured-work` و`why-cps-section`.

## 3. صفحة الخدمات العامة /services

موجودة باللغتين. تعرض Hero ثم grid من 8 خدمات بروابط صحيحة، ثم قدرات الإنتاج وCTA. الملف يحدد ضرورة Hub دون copy تفصيلي مستقل لهذه الصفحة، لذلك العبارات الإضافية مثل `Explore service` والسطر الداعم الجديد اختيارات تنفيذية وليست نصوصًا مفقودة من مرجع.

**الشكل تغير فعلًا:** استبدلت الصفحة القديمة بتجميعة جديدة؛ `CollectionGrid columns={2}`، مع الصور والأوصاف. لا يجب الخلط بينها وبين قائمة الخدمات التفاعلية في الرئيسية.

**إدارة المحتوى:** الصفحة والخدمات والكتالوجات الجديدة تقرأ `service-architecture.ts` مباشرة. وجود service documents أو seed في Sanity لا يجعل هذه القوالب قابلة للتحرير من CMS؛ `getServiceArchitecture` لا يستخدم `loadService`. هذه فجوة عن بنية CMS-first الخاصة بالمشروع، وليست شرطًا حرفيًا إضافيًا في Blueprint.

## 4. المكونات المشتركة للخدمات الثماني

الـ12 بلوك المطلوب موجودة بنيويًا وبالترتيب الأساسي، مع رابط قدرات الإنتاج مضاف بين Process وBenefits. هذه الإضافة تحقق شرط القسم 8 بوجود رابط Production Capabilities في كل صفحة خدمة.

| البلوك | المراجعة |
| --- | --- |
| Hero | العناوين الرئيسية الثمانية مطابقة. بعض bullets مختصرة، خصوصًا Exhibitions وCustom Fabrication. التفاصيل سطرًا بسطر في المقارنة النصية. |
| Trusted By | Eyebrow والعنوان والسطر الداعم مطابقون. الأسماء الخمسة موجودة كنص ثابت لا logos، ولا تُقرأ من قائمة clients. تأكيد العميل ما زال مطلوبًا، وعبارة `confirm current list` ليست copy للنشر. |
| Showcase | عنوان عام واحد `Featured from the catalogue` بدل عناوين الخدمات المخصوصة. أوصافه من الكتالوج، بينما المرجع له أوصاف Showcase مستقلة. |
| Why CPS | العناوين في معظمها مطابقة؛ النقاط اختُصرت، وأحيانًا subheadline أيضًا. |
| Our Process | المراحل الخمس وأسماؤها مطابقة. السطر الداعم فقد `whatever the service`، وكل أوصاف المراحل معاد صياغتها. وصف Handover فقد شرط maintenance/redeployment. |
| Benefits | 4 عناصر لكل خدمة، لكن أغلب الجمل تحولت لعبارات قصيرة؛ ليست المطابقة الحرفية المطلوبة. |
| Industries | عنوان عام `Sectors we build for` بدل العناوين المخصوصة؛ روابط Service + Industry موجودة. Fashion وFood & Beverage ليسا ضمن picklist العامة. |
| Related Services | الخدمات المرتبطة وترتيبها مطابقان لكل الخدمات الثماني. عنوان إضافي `Complete the build` ليس مطلوبًا في الملف لكنه لا يحذف شيئًا. |
| Recent Projects | فلترة ديناميكية موجودة، لكن السكشن فارغ فعليًا في الثماني. CTA عام `View all projects` بدل `View All [Service] Projects`، مع بقاء الرابط filtered. يظهر أيضًا نص تنفيذي عن سحب المشاريع آليًا؛ المرجع هنا يشرح مصدر البيانات ولا يحتاج تحويله إلى رسالة للزائر. |
| FAQ | 4 أسئلة وأجوبة لكل خدمة؛ كثير منها مختصر أو معاد الصياغة، وبعض إشارات الكتالوج والخدمات الأخرى أزيلت. عنوان وسطر داعم إضافيان من التنفيذ. |
| Quote Form | Name، Company، Email، Phone، Item/Type، اسم المشروع الاختياري، التفاصيل، والملفات الاختيارية موجودة بالكود. Item وlayout ينتقلان عبر الرابط، والاختيارات حسب الخدمة. زر `Request My Quote` مطابق. تشغيل الإرسال والرفع لم يُختبر بطلب فعلي. |
| Closing | الجمل والـservice nouns مطابقة غالبًا؛ Retail مختلف كما هو موضح أدناه. `you're/we'll` استُبدلت بـ`you are/we will`. |

**الشكل الجديد:** Hero بصورة وبنود، شريط ثقة نصي، Showcase مرقم في 5 أعمدة، Why بلوحة داكنة، Process timeline معاد استخدامه، Benefits في 4 بطاقات، روابط قطاعات، 3 بطاقات related، مشاريع، FAQ، نموذج بعمودين، CTA. Showcase يتحول إلى عمودين ثم عمود؛ لم يُفحص بصريًا مع الأوصاف الأصلية الأطول. إذا ستعاد النصوص الأصلية فالأفضل إعادة تقييم عرض الأعمدة وارتفاع البطاقات، خصوصًا العناوين الطويلة، بدل افتراض أن اختصارها مطلوب.

**FAQ تغير فعلًا على مستوى المكون المشترك:** العنوان والوصف أصبحا أعلى القائمة بدل مقدمة جانبية، والأسئلة أسفل بعرض السكشن. استُبدلت details/summary بأزرار وpanels مع aria وحركة فتح. هذا تغيير مناسب محتمل لتوفير عرض أكبر للكلام، لكن سببه المقصود غير موثق. Process نفسه لم يتغير شكليًا في diff الحالي؛ التعديل كان تعليقات lint فقط.

## 5. كل Service page وكل Catalogue page

المسارات التالية نسبية تحت `/en` و`/ar`، وكل زوج استجاب 200 في اللغتين.

| الخدمة ومسارها | عدد العناصر: المرجع التفصيلي / الحالي | الفئات | أوصاف الكتالوج المطابقة حرفيًا |
| --- | --- | --- | --- |
| `/services/exhibitions-booths` + `/catalogue` | 6 / 6 | flat + 4 layout chips | 0 من 6 |
| `/services/event-fabrication` + `/catalogue` | 7 / 7 | flat | 0 من 7 |
| `/services/fit-out-interiors` + `/catalogue` | 6 / 6 | flat | 3 من 6 |
| `/services/retail-displays` + `/catalogue` | 9 / 9 | flat | 1 من 9 |
| `/services/custom-fabrication` + `/catalogue` | 20 / 20 | 5 | 0 من 20 |
| `/services/printing-signage` + `/catalogue` | 36 / 36 | 10 + search | 1 من 36 |
| `/services/rental-solutions` + `/catalogue` | 13 / 13 | 4 | 0 من 13 |
| `/services/installation-project-delivery` + `/catalogue` | 25 / 25 | 7 | 1 من 25 |

**لكل كتالوج:** أسماء كل العناصر وترتيبها مطابقان؛ أسماء الفئات وترتيبها مطابقان؛ `Get a Quote` موحد على كل كارت؛ رابط See All موجود على صفحة الخدمة؛ bottom banner موجود مع اختلاف `Do not` عن `Don't`. الكارت الموحد موجود، لكنه يعيد صورة الخدمة نفسها لكل المنتجات، ولا يحتوي نوع `CatalogueItem` على صورة مستقلة لكل منتج. الصور representative قرار عميل مفتوح في المستند، فلا يصح اعتبار وجود صورة عامة دليل اكتمال تصوير المنتجات.

### Exhibitions & Booths

- **Service:** Hero headline وsupport مطابقان. bullet 3 حذف `for major exhibitions` وbullet 4 اختصر `on-site installation`. أسماء Showcase الخمسة صحيحة، لكن وصف Showcase استُبدل بوصف كتالوج مختصر؛ مثل فقد `Nothing off a shelf.` في Custom-Built Exhibition Booths.
- **Catalogue:** الستة موجودة، والـ4 chips موجودة بالكود وتفلتر بحسب جدول compatibility. Custom وModular متاحان للأربعة؛ Double-Decker/Pavilion للـPeninsula/Island؛ Shell/Portable للـInline/Corner. هذا توزيع تنفيذي لم يقرّه المستند؛ بند التأكيد يقول إن الفلاتر تنطبق أساسًا على Custom-Built.
- **غير منفذ:** نقل حقول city-anchor SEO إلى كارت Custom-Built. نوع العنصر لا يحتوي حقول مدن أو SEO، والكارت لا يعرضها. تحويل عناوين المدن لا يُعد حفظًا لتلك الحقول.
- **Industries:** المرجع يقول Electronics وPharmaceutical؛ التنفيذ يوسعها إلى Technology & Electronics وHealthcare & Pharmaceutical لتوافق picklist. Food & Beverage وFashion ما زالا يخرجان slugs خارج picklist.

### Event Fabrication

- **Service:** Hero مطابق. Showcase المطلوب: Stage & Scenic، Branded Event Structures، VIP & Hospitality، Interactive & Activation، Experience Centers.
- **الحالي:** أول خمسة في الكتالوج أدخلت Photo & Content Experiences وأسقطت Experience Centers، مع تغيير ترتيب Interactive. وصف VIP المختصر فقد مستوى تشطيب hospitality المذكور للـShowcase.
- **Catalogue:** 7 أسماء موجودة بلا tabs كما هو مطلوب؛ الأوصاف السبعة مختلفة حرفيًا، مثل حذف `run-of-show` من Stage & Scenic.

### Fit-Out & Interiors

- **Service:** Hero واختيار أسماء Showcase الخمسة مطابقان. أوصاف Showcase الطويلة لم تُستخدم؛ مثل Office Fit-Out فقد `from partitioning to furniture`، وShowroom فقد daily foot traffic/repeated demos.
- **Catalogue:** 6 عناصر flat صحيحة. 3 أوصاف مطابقة و3 مختلفة، والقائمة التفصيلية تبينها دون اعتبار الصفحة كلها مطابقة.
- **المشروعات:** local يصنف Aether Labs تحت fit-out رغم أن وصفه في اللغتين Modular booth. وفي العرض الحالي لا يصل إلى Recent Projects أصلًا بسبب بيانات الـCMS.

### Retail Displays

- **Service:** Hero مطابق. Showcase يجب أن يحتوي Window Displays؛ الحالي يضع POP Displays ويؤخر Promotional Kiosks بدلًا منه.
- **Closing:** المرجع `Ready to build your next display rollout?`، الحالي `Ready to build your next display?`؛ فقد معنى rollout.
- **Catalogue:** التسعة موجودة. وصف Product Display Stands مطابق؛ الثمانية الأخرى معاد صياغتها.
- **Industry:** رابط Fashion لا تقابله قيمة في picklist، وبالتالي لا يمثل تجربة فلترة مكتملة.

### Custom Fabrication

- **Service:** Showcase المطلوب يمثل الخشب والمعدن والأكريليك وCNC والمواد المختلطة. الحالي كله من أول فئة Wood & Joinery: Custom Wood Fabrication، CNC Wood Cutting، Cabinets & Counters، Display Units، Decorative Structures. هذا يغير تمثيل الخدمة، وليس مجرد ترتيب تجميلي.
- **Catalogue:** 20 عنصرًا والفئات الخمس صحيحة؛ الأوصاف كلها مختلفة. مثال `Bespoke joinery built to drawing, from structural frames to finished cabinetry.` أصبح `Bespoke joinery built to drawing.`.
- **Quote routing:** يوجد عنصر Laser Cutting في Metal Fabrication وآخر في CNC & Precision Cutting، والاثنان يأخذان slug `laser-cutting`. روابط طلب السعر وvalue في select واحدة، و`options.find` يرجع أول عنصر؛ لا يحتفظ الطلب بالفئة التي اختارها المستخدم. يلزم identifier يميز الفئة/العنصر إذا أريد الاحتفاظ بهذا التفصيل.

### Printing & Signage

- **Service:** Showcase المطلوب Vinyl Printing، Illuminated Letters، Roll-Up Banners، Wall Graphics، Light Boxes. الحالي Vinyl، Fabric، Banner، Backdrop، Foam Boards؛ أربعة اختيارات مختلفة، وكلها من فئة Large Format Printing، فتضعف إبراز signage.
- **Catalogue:** 10 فئات وsearch موجودة. 36 عنصرًا كما في القوائم التفصيلية. 35 وصفًا مختلفًا وواحد مطابق. البحث يطابق اسم العنصر ووصفه بلغة الصفحة؛ فحصنا وجود الحقل ومنطقه، لا تفاعله بالنقر/الكتابة.
- **تعارض المرجع:** العدد 33 في الملخص وملاحظات المطور غير مطابق لتعداد المنتجات الفعلي 36. الثلاثة ليست زيادات من المطور؛ موجودة بالفعل في الملف.

### Rental Solutions

- **Service:** الملف يطلب 4 مختارات: Lounge Furniture، Registration Counters، Display Units، Branded Props. التنفيذ يعرض 5: Lounge Furniture، Tables، Chairs، High Tables، Registration Counters. غاب display/props وأضيفت ثلاث قطع أثاث.
- **Catalogue:** 13 عنصرًا والفئات الأربع مطابقة، والأوصاف كلها مختلفة حرفيًا.
- **الشكل:** نفس grid ذي 5 أعمدة مفروض من القالب؛ لا يوجد دعم اختيار 4 featured لعروض التأجير كما في المرجع.

### Installation & Project Delivery

- **Service:** Hero مطابق. الـShowcase المطلوب خمس مجموعات خدمات: Site Surveys & Technical Preparation، Nationwide Installation، Transportation & Logistics، Storage & Warehousing، Maintenance & Refurbishment. الحالي أول 5 خدمات تفصيلية: Site Surveys، Technical Drawings، Production Coordination، Installation Planning، Exhibition Installation. لذلك أسماء الـShowcase الخمسة المطلوبة غير موجودة فيه، رغم وجود مراحلها داخل فئات الكتالوج.
- **Catalogue:** 7 فئات و25 عنصرًا موجودة؛ الجدول الملخص يقول 24، لكن التفاصيل تعد 25. ليست زيادة غير مطلوبة.
- **Intake:** الزر يبقى `Get a Quote`، و`requestType` يصبح `service-add-on` عند الإرسال؛ هذا تمييز موجود. النموذج المعروض نفسه لا يضيف أسئلة خاصة بالمشروع القائم، لذلك شرط «نموذج مختلف قليلًا» منفذ جزئيًا في المعالجة، لا في أسئلة الواجهة. لم يُرسل طلب حقيقي.

مصادر هذا القسم: `src/content/service-architecture.ts`، `src/components/sections/service-architecture-page.tsx`، `src/components/sections/catalogue-browser.tsx`، `src/components/forms/quote-form.tsx`، `src/app/[locale]/services/[serviceSlug]/catalogue/page.tsx`، `src/app/api/contact/route.ts`، `src/sanity/create-submission.ts`.

## 6. Production Capabilities

المرجع: القسم 8. الصفحة موجودة باللغتين، والعنوان `What we deliver is supported by how we build it.` مطابق. التخصصات العشرة بأسمائها مطابقة، وروابط الوصول موجودة من الهوم وقائمة الخدمات وصفحات الخدمات والفوتر.

**الشكل مختلف في جزئية:** Service-vs-Capability explainer table نُفذ كعمودين/بطاقتين بعنوان Services وProduction capabilities، لا جدول صفوف مقارنة. يؤدي شرح الفرق الأساسي لكنه اختيار تصميم مختلف. الصورة الرئيسية وصورة محتوى القدرات تستخدمان نفس مرجع `media.about.studio`، وهو Unsplash؛ لا دليل أنه تصوير مصنع CPS. توجيه factory/craftsmanship photography مطبق كاتجاه في مراجع الصورة، لا كصور CPS معتمدة.

العنوان الإضافي `Ten disciplines. One production floor.` والسطر الداعم وCTA closing نصوص تنفيذية لأن المرجع لا يقدم copy كاملًا لهذه المواضع. لا تُصنف تلقائيًا كمخالفات.

## 7. About CPS

المرجع: القسم 11. الـEyebrow والعنوان والـsubheadline الثلاثة مطابقة، وتظهر كذلك بالمعنى الجديد بالعربية. النقاط الثلاث الرئيسية دُمجت في فقرتي Story، مع إضافة جمل عن quality control وhandover؛ المعنى الأساسي موجود لكن النص والترتيب ليسا حرفيين.

| المطلوب | الحالي |
| --- | --- |
| In-house production across every major discipline | معناه موجود في Story وIn-House, Always وWorkshop؛ ليس differentiator بهذا النص |
| One team from technical drawing through installation and handover | موزع بين Story وبطاقة Accountable، دون العبارة الكاملة |
| Nationwide site survey, delivery and dismantling | ليس differentiator واضحًا ضمن مجموعة المبادئ الحالية |
| Confirmed KSA clients across banking, telecom and retail sectors، بعد التأكيد | غير موجود بنفس النطاق كدليل عملاء مؤكد |
| One production partner. Multiple capabilities. Built around your project. | آخر عبارة `Built around your project.` غير معروضة؛ سطر العلامة في Story هو `One team. Full lifecycle. No handoff gaps.` |

**بقايا لم تتعدل:** FAQ ما زال يقول `full booth lifecycle` و`other booth companies` ويقيس حجم العمل من kiosks إلى pavilions. `InnerPageEngagement` يعيد Stats بعنوان Booths delivered/Years in exhibitions/GCC cities، testimonials عن الأجنحة، ونموذج `Tell us about your booth`. توسيع مقدمة About وحده لا يكمل تموضع الشركة كله.

**الشكل:** بقي Story والصورة والمبادئ وWorkshop؛ أزيل سكشن Industries القديم فعلًا. لا يوجد دليل أن هيكل Story تغير لاستيعاب copy الجديد؛ التغيير الأوضح copy + حذف السكشن. عناصر differentiators الجديدة لم تُستبدل بها مجموعة القيم القديمة بالكامل.

المصادر: `src/components/sections/about-page-sections.tsx`، `src/components/sections/inner-page-engagement.tsx`، `src/content/dictionaries.local.ts`، `src/lib/dictionary.ts`.

## 8. Projects / Our Work

المرجع: القسم 12.

### صفحة القائمة والفلاتر

واجهة فلترين مستقلين Service وIndustry موجودة باللغتين. يوجد 8 services بدل أسماء الخدمات الستة المختصرة المقترحة في القسم 12؛ هذا توسع متسق مع الخدمات الثماني، لكنه ليس نفس القائمة حرفيًا. الـ11 industry مطابقة للأسماء العامة في المرجع.

| الحالة المختبرة من HTTP | النتيجة |
| --- | --- |
| `/en/work` | 5 مشاريع |
| `/en/work?service=exhibitions-booths` | 0 |
| `/en/work?service=retail-displays&industry=fmcg` | 0 |
| `/en/work?industry=technology-electronics` | 0 |
| `/en/work?service=retail-displays&industry=fashion` | 0؛ Fashion لا يظهر كتحديد معترف به في شارات الفلتر |

السبب المدعوم بالكود والعرض: `serviceSlug` و`industrySlug` الجديدان موجودان في schema وseed/local، لكن نتائج CMS تأتي بوسوم قديمة/ناقصة. `loadProjects` يدمج صورًا فقط من local عند وجود remote، ولا يدمج تصنيفات أو scope؛ فتظل بيانات التصنيف الجديدة المحلية غير مستخدمة. هذا يجعل الفلتر منفذًا كواجهة ومنطق، لكنه غير مكتمل كوظيفة على المحتوى الحالي.

**تفصيل إضافي من المرجع نفسه:** Fashion وFood & Beverage مستخدمان في قوائم صناعات بعض الخدمات لكن غير موجودين ضمن قائمة الـ11؛ يلزم mapping أو توحيد للتصنيف بدل توليد slugs لا تقبلها القائمة. Electronics/Pharmaceutical تم توسيعهما في التنفيذ إلى مسميات الـpicklist الأوسع.

### مراجعة تفاصيل كل مشروع

| المشروع | المعروض وقت الفحص | ما تغير محليًا ولم يظهر |
| --- | --- | --- |
| Northline | sector: `technology`؛ Project Type: Custom-Built Booths؛ Scope: Custom-Built Booths؛ لا Services Provided | industry = technology-electronics، service = exhibitions-booths، scope تفصيلي للتصميم والتصنيع والرسومات وAV والتركيب |
| Aether Labs | sector: `healthcare`؛ Project Type وScope: Modular / System Booths؛ لا Services Provided | industry = healthcare-pharmaceutical، service = fit-out-interiors، scope أوسع؛ لكن وصف المشروع نفسه لا يزال جناحًا معياريًا، فلا يصح اعتماد التصنيف الجديد دون مراجعة |
| Qamar | sector: FMCG؛ Project Type وScope: Kiosks & Small Footprint Stands؛ لا Services Provided | service = retail-displays، scope تصنيع kiosk وكاونتر وطباعة وتركيب |
| Harbor & Co. | sector: `energy`؛ Project Type وScope: Double-Deck Booths؛ لا Services Provided | industry = government-public-sector وservice = event-fabrication؛ النص ما زال عن جناح double-deck لقطاع الطاقة، فلا يوجد دليل كافٍ للتصنيفين الجديدين |
| Pulse Retail | sector: FMCG؛ Project Type وScope: Portable & Pop-Up Displays؛ لا Services Provided | service = retail-displays، scope تفصيلي للعرض المحمول والإضاءة والنقل وإعادة التركيب |

Client / Sector، Location، Challenge، CPS Solution، Key Production Elements، Gallery موجودة. `Project Type` ما زال يأتي من `boothType` وليس حقلًا عامًا للـfit-out/signage/event؛ خدمات المشروع المتعددة في schema لا تظهر كقائمة، بل القالب يعرض primary service فقط عندما توجد. هذا لا يحقق نموذج تفاصيل متعدد الخدمات بالكامل.

**الشكل:** facts موضوعة في قائمة بيانات، وKey Production Elements كوسوم، ثم Motion ثم Story بثلاثة أجزاء تشمل Outcome الإضافي، ثم Gallery وRelated projects. اسم `CPS Solution` تغير فعلًا؛ عنوان Motion الثابت `See the booth in motion.` ما زال booth-only. الملف لا يفرض شكلًا محددًا لتلك الحقول، لكنه يطلب وجودها.

مصادر: `src/app/[locale]/work/page.tsx`، `src/components/sections/work-filters.tsx`، `src/app/[locale]/work/[slug]/page.tsx`، `src/components/sections/project-detail-sections.tsx`، `src/content/projects.ts`، `src/sanity/load-collections.ts`، `src/sanity/queries/collections.ts`، `sanity/schemaTypes/documents/content.ts`.

## 9. Contact

المرجع يبقي Contact ولا يعطي نص Hero جديدًا؛ لذلك `Start with a conversation.` لا يعد مخالفة في حد ذاته.

- CTA استراتيجية التواصل المطلوب `Send Your Project Details` غير مطبق في copy المحلي للنموذج، الذي يستخدم `Send brief`؛ زر Hero الحالي `Start a Project`. زر الخطوة النهائية لم يُفتح في متصفح، لذلك هذا الحكم على مصدر النموذج.
- النموذج أربع خطوات ويستخدم `Event & booth` و`Booth type` و`Stand size` وقائمة خدمات قديمة؛ لا يخدم البنية الجديدة بوضوح. هذا النقص يظهر أيضًا في About/Work/Insights عبر المكون المشترك.
- بيانات العرض ما زالت `+966 50 000 0000` و`hello@cps.com` و`Riyadh, Saudi Arabia`. الرقم placeholder واضح، ولا يوجد دليل تأكيد البريد/العنوان/روابط التواصل من العميل.
- تحت `Business hours` يظهر نص التغطية الجغرافية بدل مواعيد العمل. الكود يعرض قيمة CMS كما هي؛ يلزم تصحيح الحقل المصدر.
- الخريطة الحالية تشير إلى الرياض بصورة عامة من fallback عند عدم وجود رابط embed مناسب؛ ليست إثبات عنوان مكتب معتمد.
- **الشكل:** بيانات تواصل + نموذج متدرج + خريطة؛ التعديل الظاهر في diff يتضمن عرض ساعات العمل. لا يوجد طلب إعادة تصميم Contact في الملف، لذلك إبقاء الشكل مقبول، مع معالجة المحتوى.

## 10. Footer

الهيكل Company / Services / Work / Get in Touch موجود، والخدمات الثماني وروابط Projects / Case Studies by Industry صحيحة. رابط Case Studies يصل إلى `/work#work-filters`؛ لا توجد صفحة Industries مستقلة في الفوتر.

| copy الملف | الحالي |
| --- | --- |
| About CPS | About |
| Production Capabilities / Insights / Contact | موجودة |
| Company تضم هذه الروابط الأربعة | إضافة Work داخل Company رغم وجود عمود Work مستقل |
| Exhibitions. Events. Interiors. Displays. Built under one roof. | العبارة الجديدة موجودة local، لكن المعروض فعليًا `Exhibition booth design, fabrication, and install — end to end.` |

**موضع/شكل closing line:** الملف يطلب العبارة فوق legal row؛ التنفيذ يضع `footer.description` قرب اللوجو في brand band أعلى الأعمدة. حتى بعد إصلاح قيمة CMS يبقى موضعها مختلفًا. CTA وشبكات التواصل في شريط العلامة، وبيانات الاتصال داخل العمود الأخير. Newsletter وtrust-strip ليسا ضمن render الحالي للفوتر.

## 11. Insights والروابط القديمة

- `/news` و`/ar/news` موجودتان بعنوان Insights/رؤى، والربط من الفوتر موجود. المحتوى الحالي يتضمن مقالين عن إنتاج الأجنحة ومقارنة modular/custom؛ الملف لا يزود copy للمقالات، ويترك قرار خطة المحتوى للعميل. لا يمكن اعتماد خطة نشر بناءً على وجود المقالين فقط.
- صفحات Industries تتحول إلى Work، وbooth-type pages إلى كتالوج الأجنحة؛ تم إثبات عينات 308 فعلية. كون ملفات routes القديمة ما زالت في المشروع لا يعني أنها ما زالت صفحات عامة مستقلة، لأن redirect يسبقها.
- التحويل `/en/industries/technology` يصل إلى `/en/work` العام دون الاحتفاظ بفلتر القطاع. ونوع الجناح/المدينة يفقد سياقه عند التحويل إلى Catalogue العام. هذا دمج موجود، مع فقد سياق يحتاج مراجعة عند اعتماد mapping النهائي.
- صفحات `/locations` و7 city hubs ما زالت في sitemap وفي الكود، رغم عدم وجود Locations في Final Sitemap الجديد. حفظ صفحات المدن بحد ذاته لم يُحسم بوضوح في الملف: يتحدث عن 8 صفحات booth قديمة، بينما المشروع الحالي يصف 7 مدن و8 booth types. يلزم عدم اختلاق أن العددين نفس المجموعة؛ التحويلات عامة، وقائمة عناوين الـ8 الأصلية ما زالت بند تأكيد.
- الخصوصية والشروط والكوكيز صفحات إضافية في sitemap/footer؛ المستند لا يعطي copy لها أو يطلب حذفها. `/studio` أداة إدارة، وليس صفحة تسويق يجب مطابقتها.

## 12. ملخص تغييرات الشكل

| المكان | ما تغير/بقي فعليًا | مطابق للملف؟ وهل يحتاج تعديل لاستيعاب الكلام؟ |
| --- | --- | --- |
| Home Hero | القالب القديم باقٍ | إبقاء layout مطلوب؛ النص الفعلي يحتاج تحديث. لا اعتماد بصري للعنوان الجديد حتى يظهر. |
| Positioning | Lifecycle بصور وأيقونات وترقيم باقٍ | يختلف عن centered text block. تقسيم الجمل إلى عناوين وأوصاف غيّر copy. |
| Home Services | قائمة expand قديمة، مع 8 عناصر وروابط جديدة | يختلف عن 8-card grid؛ لم يتغير شكل المكون في diff الحالي. |
| Production highlight | مكون split جديد بدل Before/After | الاتجاه البصري قريب، لكن القائمة 10 بدل 5؛ يلزم فصل بيانات highlight عن الصفحة الكاملة إذا أريد تطابق المرجع. |
| Featured Work | مشروع كبير واثنان أصغر، كما كان | لا مشكلة شكل محددة في المرجع؛ يلزم إضافة السطر الداعم واختيار non-booth واضح. |
| Why CPS | bento بصورتين نصيتين/ثلاث صور باقٍ | لم يتكيف ليستوعب الأسباب الأربعة؛ جرى دمج/اختصار النص. |
| Services hub | grid جديد بعمودين | اختيار مناسب؛ المرجع لا يحدد layout تفصيليًا للـhub. |
| Service Showcase | grid نصي جديد من 5 أعمدة | قد يحتاج توزيعًا أوسع للأوصاف الأصلية و4 عناصر Rental. هذا اقتراح، لا عيب overflow تم رصده بصريًا. |
| Catalogue | كروت صور موحدة، tabs/search حيث يلزم | البنية المطلوبة موجودة؛ تكرار الصورة قرار صور يحتاج اعتمادًا، وليس منتجًا ناقصًا. |
| FAQ | المقدمة أعلى والأسئلة بعرض السكشن؛ accordion معدل | تغير فعلي يمكن أن يساعد النص الأطول؛ الغرض غير موثق والقياس البصري لم يتم. |
| About | إزالة Industries، الإبقاء على Story/Values/Workshop | تحقق الحذف، لكن copy بعض السكاشن القديمة باقٍ. |
| Production page | صورتان بنفس المرجع + قائمتها، وشرح ببطاقتين | البطاقتان بدل الجدول اختلاف شكل مسجل. |
| Projects | service/industry بدل filter groups القديمة؛ facts أعيدت تسميتها | الهيكل جاهز، لكن بيانات الحقول والفلترة غير مكتملة. |
| Footer | أعمدة جديدة وbrand band | ترتيب الأعمدة مناسب؛ وصف قديم وموضع closing line مختلف. |

## 13. بنود تأكيد العميل وتعارضات المرجع

هذه ليست موافقات حصلت بالفعل: قائمة العملاء Ajlan & Bros/SNB/SAB/Sirar by STC/Al Hilal؛ بيانات التواصل؛ الصور المنفصلة مقابل representative imagery؛ مدى انطباق layout chips؛ خطة Insights؛ قائمة عناوين الصفحات الـ8 الأصلية؛ إطلاق كل الأزواج دفعة واحدة أو على مراحل. الكود يبني الأزواج الثمانية، لكنه لا يثبت اعتماد نشرها.

التعارضات الداخلية المسجلة: اسم v5/عنوان v2؛ Printing = 33 في الملخص مقابل 36 في التفاصيل؛ Installation = 24 مقابل 25؛ وجود Fashion/Food & Beverage في خدمات دون الـpicklist العامة؛ طلب 8-card grid مقابل السماح ببقاء layout السابق في القسم 9؛ وذكر 8 صفحات قديمة مقابل توزيع المشروع الحالي. كما أن المستند يقول بصورة عامة «لا Industries section»، ثم يطلب Industries We Work With داخل كل خدمة؛ التفسير المتسق هو إلغاء صفحة/hub القطاعات المستقلة مع الاحتفاظ بروابط القطاعات داخل الخدمة إلى Projects.

## 14. ترتيب الإكمال المقترح

1. إصلاح المصدر المعروض للهيرو والفوتر، وتحديث/ترحيل بيانات المشاريع الفعلية في CMS مع تحقق الأسماء والقطاعات والنطاق، ثم إعادة اختبار الفلاتر وRecent Projects.
2. فصل بيانات Showcase عن catalogue واختيار العناصر المقررة لكل خدمة؛ إعادة copy الأصلي حيث المطلوب، أو توثيق اعتماد الاختصارات بدل اعتبارها مطابقة.
3. توحيد taxonomy بين الخدمات وProjects ومعالجة Fashion/Food & Beverage وidentifiers المكررة لـLaser Cutting.
4. إكمال حقول تفاصيل المشاريع ونموذج التواصل العام وCTA copy وساعات العمل وبيانات الاتصال المؤكدة.
5. مراجعة اختلافات layout المسجلة واعتماد الشكل المقصود، ثم معاينة desktop/mobile بعد ظهور النص النهائي؛ خصوصًا الهيرو وShowcase وWhy CPS.
6. إكمال نقل SEO/سياق المدن واعتماد mapping التحويلات والصور والعملاء وخطة Insights. تحديث وثائق المشروع التي ما زالت تصف IA القديمة، ومنها تعليمات AGENTS الحالية عند اعتماد المعمارية الجديدة.

لا توجد تعديلات تنفيذية مرفقة بهذه المراجعة؛ التقرير يوضح المطلوب قبل تغيير المحتوى أو التصميم.
