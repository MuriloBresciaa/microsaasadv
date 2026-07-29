<div align="center">
  <h1>MicroSaaS Advogado - High Performance Legal Platform</h1>
  <p><b>Frontend Architecture | Legaltech UI/UX | High-Conversion Platform</b></p>
  <p>Aplicações web de alta performance voltadas para o setor jurídico, com foco em conversão de leads, design premium e arquitetura escalável.</p>
</div>

<hr />

## Visão Geral do Projeto

Plataforma MicroSaaS projetada para escritórios de advocacia e profissionais do direito. O projeto combina uma interface moderna, componentes otimizados para alta conversão e estrutura pronta para integração com serviços backend e autenticação.

- **Demonstração Online:** [Acessar Projeto na Netlify](https://seu-link.netlify.app)
- **Status:** Frontend v1.0 Concluído / Integração de Core e API em Desenvolvimento

<hr />

## Diferenciais Técnicos e Arquitetura

- **Astro Engine:** Renderização ultra rápida, carregamento otimizado de ativos e alta pontuação no Google Lighthouse.
- **Componentes React:** Ilhas de interatividade isoladas para formulários dinâmicos e fluxos de agendamento.
- **Design System Modular:** Estilização utilitária com Tailwind CSS, garantindo padronização visual e responsividade total.
- **TypeScript Strict Mode:** Tipagem estática rigorosa para prevenção de erros em tempo de compilação.
- **Mapeamento de Dados:** Configuração estruturada com Drizzle ORM para integração nativa com bancos SQL.

<hr />

## Stack Tecnológica

- **Framework:** Astro
- **UI Library:** React
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **ORM / Database Layer:** Drizzle ORM
- **Deploy e Hosting:** Netlify

<hr />

## Configuração do Ambiente Local

### Pré-requisitos
- Node.js versão 22 LTS
- Gerenciador de pacotes PNPM v9

### Passo a Passo

1. Clonar o repositório:
```bash
git clone https://github.com/MuriloBresciaa/microsaasadv.git
```

2. Acessar o diretório do projeto:
```bash
cd micro-saas-advogados
```

3. Configurar as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Instalar as dependências:
```bash
pnpm install
```

5. Executar o servidor de desenvolvimento:
```bash
pnpm dev
```

<hr />

## Estrutura de Pastas

- **src/components:** Componentes de interface reutilizáveis
- **src/pages:** Rotas estáticas e dinâmicas da aplicação
- **architecture:** Documentação técnica da infraestrutura e integrações
- **public:** Ativos estáticos e fontes personalizadas

<hr />

## Próximos Passos do Roadmap

- Implementação do painel administrativo do cliente
- Integração completa de autenticação OAuth2
- Conexão do fluxo de agendamentos com banco MySQL em produção
