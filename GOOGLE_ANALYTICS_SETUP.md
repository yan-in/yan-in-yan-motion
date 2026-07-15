# 📊 Google Analytics 4 - Guia de Configuração

## O que foi implementado

Adicionei rastreamento GA4 em **4 arquivos** para rastrear:

### ✅ **Eventos Rastreados**

| Evento | Página | Acionado Por | Dados |
|--------|--------|-------------|-------|
| `cta_whatsapp` | Index | Clique em "Falar no WhatsApp" (Hero) | Seção: hero |
| `view_cases` | Index | Clique em "Ver Cases" (Hero) | Seção: hero |
| `select_plan` | Index | Clique em plano (Starter/Pro/Business) | plan, value (R$) |
| `begin_checkout` | Index | Envio do formulário Pix | value (R$), currency |
| `payment_error` | Index | Erro ao processar Pix | error message |
| `purchase` | success.html | Página carregada | Conversão! ✅ |
| `payment_failed` | failure.html | Página carregada | Falha rastreada |
| `payment_pending` | pending.html | Página carregada | Pagamento aguardando |

---

## 🚀 PASSO 1: Criar Propriedade Google Analytics 4

### 1.1 Acesse Google Analytics
```
https://analytics.google.com
```

### 1.2 Clique em "Criar Propriedade"
- Nome: `Yan Epifanio`
- Timezone: `America/Fortaleza` (ou seu)
- Moeda: `BRL`

### 1.3 Crie a STREAM de WEB
- URL: `https://yanepifanio.com.br`
- Nome: `Main Site`

### 1.4 Copie o ID de Medição
```
Você verá: G-XXXXXXXXXX
```

---

## 📝 PASSO 2: Substituir nos Arquivos

Em **TODOS** os 4 arquivos, procure:
```
G-YOUR_MEASUREMENT_ID
```

E substitua por seu ID, por exemplo:
```
G-ABCD1234EF
```

**Arquivos para atualizar:**
1. `index.html` (2 ocorrências)
2. `success.html`
3. `failure.html`
4. `pending.html`

### Exemplo:
```html
<!-- ANTES -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"></script>

<!-- DEPOIS -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABCD1234EF"></script>
```

---

## 📊 PASSO 3: Verificar Implementação

### 3.1 Real Time (em tempo real)
1. Vai para Google Analytics
2. Clica em **Real Time** → **Visão Geral**
3. Abre seu site em outra aba
4. Clica nos botões (planos, WhatsApp, Pix)
5. Você vê em TEMPO REAL na GA

### 3.2 Validar com GA Debug
```
1. Abre DevTools (F12)
2. Console
3. Cola:
```
```javascript
gtag('event', 'test_event', {test: 'working'});
```
```
Se aparecer em Real Time, está funcionando! ✅
```

---

## 🎯 PASSO 4: Configurar Objetivos/Conversões

### 4.1 Criar Conversão de COMPRA
```
Google Analytics → Admin → Eventos
→ Crie um evento personalizado "purchase"
→ Marca como "Conversão" ✅
```

### 4.2 Criar Conversão de CLIQUE EM PLANO
```
GA → Admin → Eventos
→ Crie um evento "select_plan"
→ Marca como "Conversão" ✅
```

### 4.3 Criar Conversão de CHECKOUT
```
GA → Admin → Eventos
→ Crie um evento "begin_checkout"
→ Marca como "Conversão" ✅
```

---

## 📈 O QUE VOCÊ VERÁ NO GA

### Dashboard Principal
```
Usuários: 150 (mês)
Sessões: 200
Taxa de conversão: 2.5%
Receita (se vender): R$ 500,00
```

### Comportamento → Eventos
```
select_plan
├─ Starter: 5 cliques
├─ Pro: 3 cliques
└─ Business: 2 cliques

begin_checkout
├─ R$97: 2
├─ R$197: 1
└─ R$397: 1
```

### Conversões
```
purchase: 1 conversão (sucesso)
payment_error: 0 falhas
payment_failed: 0
```

---

## 🔍 TROUBLESHOOTING

### Problema: GA não aparece em Real Time
**Solução:**
1. Verifica se substitui `G-YOUR_MEASUREMENT_ID` corretamente
2. Aguarda 1-2 minutos
3. Faz hardrefresh (Ctrl+Shift+R)
4. Verifica no DevTools se gtag carrega

### Problema: Eventos não aparecem
**Solução:**
1. Abre DevTools → Console
2. Vê se há erros
3. Verifica se `trackEvent()` é chamado ao clicar

### Problema: GA não rastreia Pix
**Solução:**
1. Verifica se clicou "Pagar com Pix" em Real Time
2. Vê se antes de redirecionar ao MP, GA enviou o evento
3. No GA, vai a Real Time e procura por `begin_checkout`

---

## 📲 MOBILE

GA rastreia mobile automaticamente. Você vê:
```
Usuários
├─ Desktop: 60%
├─ Mobile: 35%
└─ Tablet: 5%
```

---

## ⚙️ PRÓXIMOS PASSOS

### Quando tiver dados (2-3 dias):

1. **Crie uma Dashboard Personalizada:**
   - Taxa de conversão
   - Fonte de tráfego
   - Tempo no site
   - Taxa de rejeição

2. **Configure Alertas:**
   - Se conversão cair
   - Se erros de Pix aumentarem

3. **Integre com Google Ads:**
   - Se fizer publicidade depois

4. **Configure Segment de Reconversão:**
   - Quem comprou 1x, compra 2x?

---

## 💡 DADOS QUE VOCÊ PODE VER

```
"Todos os clientes que clicaram em Starter 
gastam mais tempo no site do que os que 
clicaram em Pro" → ajusta estratégia

"60% dos acessos vêm de Instagram" 
→ investe mais em reels

"Taxa de erro de Pix é 5%" 
→ melhora documentação
```

---

## 🚨 IMPORTANTE

- ✅ GA **não** acessa dados de pagamento (seguro)
- ✅ GA rastreia apenas **cliques e ações** (legal)
- ✅ Tudo é anônimo (LGPD compliant)
- ✅ Lê dados de localização só de IP (genérico)

---

## 📚 Referências

- [Google Analytics 4](https://support.google.com/analytics)
- [gtag.js](https://developers.google.com/gtagjs)
- [Events - GA4](https://support.google.com/analytics/answer/9322688)

---

**Quando configurar, avisa que viu seus dados em Real Time!** 🎉
