# Aplicativo de Controle de Hábitos com DDD – (React + Vite)

## Executar localmente
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (Netlify recomendado)
1. Crie uma conta no Netlify.
2. New site from Git → conecte seu repositório.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Salve. As rotas SPA funcionarão via `public/_redirects`.

Alternativas:
- Vercel: Importar repositório → Framework: Vite → Build: `npm run build` → Output: `dist`.
- GitHub Pages: `npm run build` e publique `dist/` com GitHub Actions ou manualmente (requer configuração adicional de SPA).

## Testes manuais (checklist)
- Navegação entre páginas sem reload total.
- Tema claro/escuro persiste após refresh.
- Tarefas: criar/editar/excluir; status done/inbox; mover entre Inbox/DDD/Baú; persistência após refresh.
- Hábitos: criar/“Marcar hoje”; streak atualiza; persistência após refresh.
- Calendário: alterna Semana/Mês; mostra contagens por dia.
- Estatísticas: números refletem dados locais.
- Pomodoro: start/pause/reset; alterar tempos e som; persistência; alerta sonoro.
- Responsividade: menu mobile abre/fecha; foco visível e navegação por teclado.
