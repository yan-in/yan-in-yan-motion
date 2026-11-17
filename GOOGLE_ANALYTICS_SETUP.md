# Google Analytics 4

## Configuração atual

O ID de medição já está configurado em `index.html`, `success.html`, `pending.html` e `failure.html`. As páginas enviam as visualizações padrão do GA4. `pending.html` registra `payment_pending` ao abrir e registra `purchase` somente após a API confirmar o status `approved`; `failure.html` registra `payment_failed`.

O evento `purchase` usa o ID do pagamento como `transaction_id` para permitir a deduplicação no GA4. Ele não envia valor de receita: o site não recebe atualmente um valor confirmado da API de status. Não use esses eventos como relatório de receita sem implementar essa integração. O questionário de orçamento não carrega o GA4, e os cliques nos botões/planos não têm eventos próprios configurados.

## Trocar o ID de medição

Se a propriedade do GA4 mudar, atualize as referências ao ID em:

- `index.html`
- `success.html`
- `pending.html`
- `failure.html`

Confirme a coleta em **Relatórios → Tempo real** no Google Analytics após publicar.

## Privacidade

Revise as configurações de consentimento, privacidade e retenção de dados aplicáveis ao seu público e à sua operação. A presença do GA4, por si só, não garante conformidade legal.

Referências:
- [Google Analytics](https://support.google.com/analytics)
- [gtag.js](https://developers.google.com/gtagjs)
