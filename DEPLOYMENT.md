# Render.com ga Deploy Qilish Bo'yicha Qo'llanma

## 1-qadam: Render.com da ro'yxatdan o'tish

1. [Render.com](https://render.com) saytiga kiring
2. GitHub akkauntingiz bilan ro'yxatdan o'ting

## 2-qadam: Web Service yaratish

1. Dashboard'da **New +** tugmasini bosing
2. **Web Service** tanlang
3. GitHub repositoriyangizni ulang
4. Quyidagi sozlamalarni kiriting:

### Asosiy sozlamalar:
- **Name**: `smartpixel-uz` (yoki istalgan nom)
- **Region**: Sizga yaqin joylashgan region tanlang
- **Branch**: `main` (yoki asosiy branch)
- **Root Directory**: (bo'sh qoldiring)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Environment Variables:

**Environment** bo'limida quyidagi o'zgaruvchilarni qo'shing:

```
NODE_ENV=production
SESSION_SECRET=<Generate tugmasini bosing - avtomatik yaratiladi>
GEMINI_API_KEY=<sizning Google AI Studio API kalitingiz (ixtiyoriy)>
```

**Muhim:** 
- `SESSION_SECRET`: Generate tugmasini bosing, Render avtomatik kalit yaratadi
- `GEMINI_API_KEY`: AI kontent generatsiyasi uchun kerak (ixtiyoriy)

## 3-qadam: Deploy qilish

1. Barcha sozlamalarni to'ldirganingizdan so'ng **Create Web Service** tugmasini bosing
2. Render avtomatik deploy jarayonini boshlaydi
3. Deploy tugagach, sizga URL beriladi (masalan: `https://smartpixel-uz.onrender.com`)

## 4-qadam: Telegram Bot sozlash (ixtiyoriy)

Agar Telegram integratsiyasidan foydalanmoqchi bo'lsangiz:

1. Saytingizga kiring: `https://smartpixel-uz.onrender.com/login`
2. Admin akkauntingiz bilan login qiling (sizda mavjud username va parol)
3. **Settings** sahifasiga o'ting
4. Quyidagi ma'lumotlarni kiriting:
   - **Telegram Bot Token**: @BotFather dan olgan token
   - **Telegram Channel ID**: Kanal ID raqami

## 5-qadam: Avtomatik Deploy

Render GitHub repository'ga ulangan. Har safar `main` branch'ga yangi kod push qilganingizda, Render avtomatik ravishda yangi versiyani deploy qiladi.

## Environment Variables Haqida Ma'lumot

| O'zgaruvchi | Tavsif | Majburiy |
|------------|--------|----------|
| `NODE_ENV` | Production rejimi | ✅ Ha |
| `SESSION_SECRET` | Session shifrlash kaliti | ✅ Ha |
| `GEMINI_API_KEY` | Google AI API kaliti | ❌ Yo'q (AI generatsiya uchun) |

## Muammolarni Hal Qilish

### Deploy muvaffaqiyatsiz bo'lsa:

1. **Logs** ni tekshiring: Render dashboard → **Logs** tab
2. Node.js versiyasini tekshiring: Environment'da `NODE_VERSION=20` qo'shing
3. Build command to'g'riligini tekshiring

### Sayt ochilmasa:

1. `SESSION_SECRET` o'rnatilganligini tekshiring
2. Logs'da xatoliklarni qidiring
3. Environment variables to'g'ri kiritilganligini tasdiqlang

### Free Plan Cheklovi:

- Free plan'da sayt 15 daqiqa faoliyatsizlikdan keyin "uxlaydi"
- Keyingi safar ochilganda 30-60 soniya kutish kerak bo'lishi mumkin
- Doim faol sayt uchun: Paid plan'ga o'tish kerak

## Muhim Eslatma: In-Memory Storage

⚠️ **Diqqat:** Ushbu ilova hozirda **in-memory storage** ishlatadi. Bu degani:

- Barcha ma'lumotlar (kontent, sozlamalar) xotirada saqlanadi
- Server qayta ishga tushganda barcha ma'lumotlar yo'qoladi
- Render Free plan'da 15 daqiqa faoliyatsizlikdan keyin server to'xtaydi va keyingi safar yangi boshlaydi
- **Production uchun PostgreSQL database qo'shish tavsiya etiladi**

Agar doimiy ma'lumotlar saqlash kerak bo'lsa, keyinchalik database integratsiyasini qo'shish mumkin.

## Qo'shimcha Ma'lumot

- Render dokumentatsiyasi: https://render.com/docs
- Texnik yordam: https://render.com/support
