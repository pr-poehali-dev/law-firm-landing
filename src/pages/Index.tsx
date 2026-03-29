import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVICE_OPTIONS = [
  "Устная консультация",
  "Письменная консультация",
  "Составление заявления / жалобы",
  "Составление искового заявления",
  "Составление договора",
  "Представление интересов в суде",
  "Исполнительное производство",
  "Другое",
];

const TIME_OPTIONS = [
  "9:00–11:00",
  "11:00–13:00",
  "13:00–15:00",
  "15:00–17:00",
  "17:00–19:00",
];

interface FormData {
  name: string;
  phone: string;
  service: string;
  time: string;
  comment: string;
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    time: "",
    comment: "",
  });

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canNext1 = form.service !== "";
  const canNext2 = form.name.trim() !== "" && form.phone.trim().length >= 10;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div className="relative bg-white w-full max-w-lg animate-scale-in shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-gray-100">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">
              Запись на консультацию
            </p>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-0.5 w-8 transition-all duration-300 ${
                    s <= step ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="px-8 py-8">
          {/* Step 1 — choose service */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-serif text-2xl text-gray-900 mb-6">
                Какая помощь нужна?
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => set("service", s)}
                    className={`text-left text-sm px-4 py-3 border transition-all duration-150 leading-snug ${
                      form.service === s
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — name & phone */}
          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <h3 className="font-serif text-2xl text-gray-900 mb-6">
                Ваши контакты
              </h3>
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-400 block mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-400 block mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-400 block mb-2">
                  Удобное время
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIME_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => set("time", t)}
                      className={`text-xs px-3 py-2 border transition-all duration-150 ${
                        form.time === t
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs tracking-widets uppercase text-gray-400 block mb-2">
                  Комментарий{" "}
                  <span className="text-gray-300 normal-case tracking-normal">
                    (необязательно)
                  </span>
                </label>
                <textarea
                  value={form.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  placeholder="Коротко опишите ситуацию..."
                  rows={3}
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3 — success */}
          {step === 3 && (
            <div className="animate-fade-in text-center py-6">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={26} className="text-gray-900" />
              </div>
              <h3 className="font-serif text-2xl text-gray-900 mb-3">
                Заявка принята
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto mb-2">
                Мы позвоним вам на номер <span className="text-gray-900 font-medium">{form.phone}</span> в течение рабочего дня и подтвердим запись.
              </p>
              {form.time && (
                <p className="text-xs text-gray-400 mt-1">
                  Предпочтительное время: {form.time}
                </p>
              )}
              <button
                onClick={onClose}
                className="mt-8 bg-gray-900 text-white text-sm px-8 py-3 hover:bg-gray-700 transition-colors tracking-wide"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step < 3 && (
          <div className="px-8 pb-8 flex items-center justify-between">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                <Icon name="ChevronLeft" size={14} />
                Назад
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => {
                if (step === 1 && canNext1) setStep(2);
                if (step === 2 && canNext2) setStep(3);
              }}
              disabled={step === 1 ? !canNext1 : !canNext2}
              className="bg-gray-900 text-white text-sm px-8 py-3 hover:bg-gray-700 transition-colors tracking-wide disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {step === 1 ? "Далее" : "Отправить заявку"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const TEMPLATES = [
  {
    title: "Жалоба на действия должностного лица",
    tag: "Жалоба",
    preview: `В [наименование органа]
от [ФИО заявителя], проживающего по адресу: [адрес]

ЖАЛОБА

Я, [ФИО], обращаюсь с жалобой на незаконные действия [должность, ФИО должностного лица], выразившиеся в [описание нарушения] «__» _______ 202_ г.

На основании изложенного, руководствуясь ст. 33 Конституции РФ и Федеральным законом № 59-ФЗ, прошу:
1. Провести проверку по данному факту.
2. Привлечь виновное лицо к ответственности.
3. Сообщить о результатах в установленный законом срок.

[Дата]                                      [Подпись]`,
  },
  {
    title: "Заявление об отмене судебного приказа",
    tag: "Заявление",
    preview: `Мировому судье судебного участка № __
[района, города]

от [ФИО должника],
проживающего: [адрес], тел.: [телефон]

ВОЗРАЖЕНИЕ
относительно исполнения судебного приказа

«__» _______ 202_ г. мне стало известно о вынесении судебного приказа № _____ от «__» _______ 202_ г. о взыскании с меня [сумма и основание].

С данным судебным приказом не согласен, поскольку [указать причины несогласия].

На основании ст. 129 ГПК РФ прошу отменить указанный судебный приказ.

Приложение: копия судебного приказа.

[Дата]                                      [Подпись]`,
  },
  {
    title: "Обращение к судебному приставу",
    tag: "Обращение",
    preview: `Начальнику отдела судебных приставов
[наименование РОСП]

от [ФИО взыскателя / должника],
адрес: [адрес], тел.: [телефон]

ЗАЯВЛЕНИЕ

В производстве судебного пристава-исполнителя [ФИО] находится исполнительное производство № _______, возбуждённое на основании [документ].

В связи с [описание ситуации: длительным бездействием / необходимостью ознакомления с материалами / арестом имущества] прошу:
1. [Конкретное требование].
2. Уведомить о принятых мерах в установленный законом срок.

[Дата]                                      [Подпись]`,
  },
];

const SERVICES = [
  { name: "Устная консультация", price: "от 1 500 ₽", icon: "MessageSquare" },
  { name: "Письменная консультация", price: "от 3 000 ₽", icon: "FileText" },
  { name: "Составление заявления / жалобы", price: "от 2 000 ₽", icon: "PenLine" },
  { name: "Составление искового заявления", price: "от 5 000 ₽", icon: "Scale" },
  { name: "Составление договора", price: "от 4 000 ₽", icon: "FilePen" },
  { name: "Присутствие на судебном заседании", price: "от 5 000 ₽", icon: "Gavel" },
  { name: "Представление интересов в суде", price: "от 30 000 ₽", icon: "Briefcase" },
  { name: "Исполнительное производство", price: "от 10 000 ₽", icon: "ClipboardList" },
];

const REVIEWS = [
  {
    name: "Андрей М.",
    text: "Обратился по вопросу отмены судебного приказа. Всё объяснили, помогли составить возражение. Приказ был отменён в течение 10 дней. Спасибо за профессионализм.",
    stars: 5,
  },
  {
    name: "Елена С.",
    text: "Долго искала юриста по трудовым спорам. Здесь наконец получила внятный ответ и реальную помощь. Иск составили грамотно, суд выиграли.",
    stars: 5,
  },
  {
    name: "Василий К.",
    text: "Помогли разобраться с исполнительным производством — пристав бездействовал полгода. После обращения через агентство всё сдвинулось с места буквально за неделю.",
    stars: 5,
  },
];

const FAQ = [
  {
    q: "Как записаться на консультацию?",
    a: "Позвоните нам по телефону или заполните форму на сайте. Мы ответим в течение рабочего дня и согласуем удобное время.",
  },
  {
    q: "Можно ли получить консультацию онлайн?",
    a: "Да, мы проводим консультации по телефону и в мессенджерах. Для составления документов достаточно прислать материалы по электронной почте.",
  },
  {
    q: "Сколько стоят ваши услуги?",
    a: "Стоимость зависит от сложности дела. Устная консультация — от 1 500 ₽, составление документов — от 2 000 ₽. Точную цену назовём после ознакомления с ситуацией.",
  },
  {
    q: "Вы работаете с физическими и юридическими лицами?",
    a: "Да, мы оказываем юридическую помощь как гражданам, так и организациям. Специализируемся на гражданских, трудовых и административных делах.",
  },
  {
    q: "Что нужно принести на первую встречу?",
    a: "Паспорт и все имеющиеся документы по вашему вопросу — договоры, переписку, судебные акты. Чем больше материалов, тем точнее мы сможем оценить ситуацию.",
  },
  {
    q: "Гарантируете ли вы результат?",
    a: "Мы гарантируем качество юридической работы и максимальную защиту ваших интересов. Прогноз по исходу дела даём честно, без лишних обещаний.",
  },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTemplate, setOpenTemplate] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans bg-white text-gray-900 min-h-screen">
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-serif text-xl tracking-wide text-gray-900">
            Легис
          </a>
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors tracking-wide"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <a
            href="tel:+74951234567"
            className="hidden md:block text-sm font-medium text-gray-900 border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
          >
            +7 (495) 123-45-67
          </a>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-gray-700 text-left py-1"
              >
                {l.label}
              </button>
            ))}
            <a href="tel:+74951234567" className="text-sm font-medium text-gray-900 mt-2">
              +7 (495) 123-45-67
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-16 min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 max-w-2xl animate-fade-in">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-6">
            Адвокатское агентство · Москва
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-tight text-gray-900 mb-8">
            Ваши права под<br />
            <em className="not-italic text-gray-400">надёжной защитой</em>
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-md mb-10">
            Более 15 лет мы помогаем гражданам и организациям решать юридические вопросы. Чёткий анализ, честные прогнозы, реальный результат.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-gray-900 text-white text-sm px-8 py-4 hover:bg-gray-700 transition-colors tracking-wide"
            >
              Получить консультацию
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="border border-gray-300 text-gray-700 text-sm px-8 py-4 hover:border-gray-900 transition-colors tracking-wide"
            >
              Наши услуги
            </button>
          </div>
          <div className="flex gap-10 mt-14 pt-10 border-t border-gray-100">
            {[["15+", "лет опыта"], ["500+", "выигранных дел"], ["98%", "довольных клиентов"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-3xl text-gray-900">{n}</div>
                <div className="text-xs text-gray-400 mt-1 tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-5/12 h-64 lg:h-auto overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/10b5b0c8-da44-4bb7-bd08-f9acd112ca30/files/2f492706-dbb4-4580-be35-0e6e65fe4d99.jpg"
            alt="Офис адвокатского агентства"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">О нас</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
                Закон на стороне тех, кто знает свои права
              </h2>
            </div>
            <div className="space-y-5 text-gray-500 text-sm leading-relaxed pt-2">
              <p>
                Адвокатское агентство «Легис» основано в 2009 году. Мы специализируемся на гражданских, трудовых и административных делах, оказывая правовую помощь физическим лицам и малому бизнесу.
              </p>
              <p>
                В команде — адвокаты с опытом работы в судах общей юрисдикции и арбитраже. Мы не берём заведомо проигрышных дел и всегда честно оцениваем шансы клиента.
              </p>
              <p>
                Наш принцип: ясность вместо туманных обещаний, конкретный результат вместо бесконечных консультаций.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Образцы документов</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-12">
            Примеры юридических<br />документов
          </h2>
          <div className="space-y-4">
            {TEMPLATES.map((t, i) => (
              <div key={i} className="border border-gray-200 hover:border-gray-400 transition-colors">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenTemplate(openTemplate === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-widest uppercase text-gray-400 border border-gray-200 px-2 py-0.5">
                      {t.tag}
                    </span>
                    <span className="font-medium text-gray-900">{t.title}</span>
                  </div>
                  <Icon
                    name={openTemplate === i ? "ChevronUp" : "ChevronDown"}
                    size={18}
                    className="text-gray-400 shrink-0"
                  />
                </button>
                {openTemplate === i && (
                  <div className="px-6 pb-6">
                    <div className="bg-gray-50 p-5 text-xs font-mono text-gray-600 leading-relaxed whitespace-pre-wrap border-l-2 border-gray-200">
                      {t.preview}
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      * Образец носит ознакомительный характер. Для составления документа под вашу ситуацию обратитесь к специалисту.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Услуги и цены</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-12">
            Прозрачные тарифы
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white p-6 hover:bg-gray-50 transition-colors group">
                <Icon name={s.icon} size={20} className="text-gray-300 mb-4 group-hover:text-gray-600 transition-colors" fallback="FileText" />
                <div className="text-sm text-gray-700 leading-snug mb-3">{s.name}</div>
                <div className="font-serif text-xl text-gray-900">{s.price}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-5">
            Окончательная стоимость определяется после изучения материалов дела. Возможна оплата в рассрочку.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Отзывы</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-12">
            Что говорят клиенты
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-gray-100 p-7 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-gray-400 fill-gray-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">«{r.text}»</p>
                <div className="text-xs font-medium text-gray-700 tracking-wide">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">FAQ</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-12">
            Частые вопросы
          </h2>
          <div className="divide-y divide-gray-200">
            {FAQ.map((item, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-start justify-between py-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-gray-900">{item.q}</span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={16}
                    className="text-gray-400 mt-0.5 shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <p className="text-sm text-gray-500 leading-relaxed pb-5">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Контакты</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-8">
                Запишитесь<br />на консультацию
              </h2>
              <div className="space-y-5 text-sm text-gray-500">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <span>г. Москва, ул. Тверская, д. 15, офис 304<br /><span className="text-gray-400">м. Тверская, 3 мин. пешком</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={16} className="text-gray-400 shrink-0" />
                  <a href="tel:+74951234567" className="hover:text-gray-900 transition-colors">+7 (495) 123-45-67</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={16} className="text-gray-400 shrink-0" />
                  <a href="mailto:info@legis-law.ru" className="hover:text-gray-900 transition-colors">info@legis-law.ru</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={16} className="text-gray-400 shrink-0" />
                  <span>Пн–Пт: 9:00–19:00 · Сб: 10:00–15:00</span>
                </div>
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                className="mt-8 bg-gray-900 text-white text-sm px-8 py-4 hover:bg-gray-700 transition-colors tracking-wide inline-flex items-center gap-2"
              >
                <Icon name="CalendarDays" size={16} />
                Записаться онлайн
              </button>
            </div>
            <div className="overflow-hidden h-72 lg:h-auto min-h-64 bg-gray-100">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.604&z=15&pt=37.604,55.764,pm2rdm&text=%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F+15+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "280px" }}
                title="Карта проезда"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-serif text-lg text-gray-900">Легис</div>
          <p className="text-xs text-gray-400 text-center">
            © 2024 Адвокатское агентство «Легис». Все права защищены.
          </p>
          <a
            href="https://vk.com/legis_law"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="ВКонтакте">
              <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.598-.19 1.365 1.26 2.182 1.818.616.422 1.084.33 1.084.33l2.177-.03s1.137-.071.598-1.963c-.044-.145-.313-.666-1.61-1.886-1.356-1.274-1.175-1.068.46-3.272.999-1.33 1.399-2.143 1.274-2.49-.12-.332-.854-.244-.854-.244l-2.447.015s-.181-.025-.316.056c-.132.079-.217.264-.217.264s-.387 1.028-.903 1.903c-1.088 1.848-1.524 1.948-1.703 1.833-.413-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.529-2.733-.267-.065-.463-.107-1.146-.114-.876-.009-1.617.003-2.037.208-.28.136-.495.44-.363.457.162.022.53.099.726.364.252.341.243 1.107.243 1.107s.145 2.112-.337 2.373c-.331.18-.785-.187-1.758-1.862-.5-.861-.878-1.814-.878-1.814s-.072-.18-.202-.276c-.156-.118-.374-.155-.374-.155l-2.324.015s-.349.01-.477.161C4.004 8.589 4.11 8.901 4.11 8.901s1.82 4.26 3.875 6.405c1.888 1.972 4.03 1.842 4.03 1.842h.77v-.907z" />
            </svg>
            ВКонтакте
          </a>
        </div>
      </footer>
    </div>
  );
}