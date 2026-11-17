# Yan Epifanio — site do estúdio

Site estático, sem etapa de build ou dependências de pacote.

## Estrutura
- `index.html`: portfólio, serviços e checkout Pix.
- `orcamento.html`: questionário que prepara uma mensagem para o WhatsApp.
- `success.html`, `pending.html`, `failure.html`: páginas de retorno do checkout.
- `css/yan.css`: identidade visual compartilhada, incluindo páginas de pagamento.
- `js/yan.js`, `js/orcamento.js`: interações da página inicial, checkout e questionário.
- `assets/videos/`: três cases e o vídeo vertical de Reels.
- `assets/images/`: imagem Open Graph e foto da seção de experiência.
- `assets/fonts/`: fonte Satoshi variável.
- `robots.txt`, `sitemap.xml`, `CNAME`: indexação e domínio do site.
- `GOOGLE_ANALYTICS_SETUP.md`, `SEO_GEMINI_GUIDE.md`: referências de Analytics e indexação.

## Publicação

Publique a raiz do repositório em uma hospedagem estática, como Cloudflare Pages. Não é necessário instalar dependências nem executar build. Todas as páginas de retorno do Mercado Pago e seus arquivos referenciados devem permanecer publicados.

## Fluxos importantes

- O formulário de orçamento monta uma mensagem para o WhatsApp.
- O checkout Pix é iniciado em `js/yan.js`; `pending.html` consulta o status e redireciona para a página de sucesso ou falha.
- `success.html`, `pending.html` e `failure.html` não devem ser incluídas no sitemap.

## Identidade visual

Base em preto, branco e cinza; títulos em Satoshi variável; DM Sans para textos; verde para WhatsApp e verde-limão para ações de orçamento.

