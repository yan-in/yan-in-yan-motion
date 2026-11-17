# SEO e indexação

## Configuração atual

- `robots.txt` permite o rastreamento geral, bloqueia alguns crawlers específicos e aponta para o sitemap.
- `sitemap.xml` lista apenas a página inicial; a página de orçamento e as páginas do checkout têm `noindex`.
- `index.html` define título, descrição, URL canônica e metadados Open Graph.
- Não há marcação JSON-LD no site neste momento.

## Manutenção

- Atualize a data `lastmod` no sitemap quando a página inicial mudar de forma relevante.
- Inclua no sitemap apenas páginas públicas que devem aparecer nos resultados de busca.
- Mantenha IDs de seção e links internos em sincronia com `index.html`; âncoras de seção não precisam de entradas próprias no sitemap.
- Não liste páginas pessoais/de fluxo, como orçamento e retorno de pagamento.

## Indexação e resultados de IA

Um sitemap e metadados ajudam mecanismos de busca a descobrir e interpretar o site, mas não garantem indexação nem aparição em respostas de IA. Para acompanhar a indexação, verifique o domínio no Google Search Console e envie `https://yanepifanio.com.br/sitemap.xml`.

Links úteis:
- [Google Search Console](https://search.google.com/search-console)
- [Google Search Central: sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Open Graph protocol](https://ogp.me/)
