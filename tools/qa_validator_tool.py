#!/usr/bin/env python3
"""
QA Validator Tool — Site Factory 3.0 Tools Layer
Propósito: Auditar arquivos temporários contra as Iron Laws antes de mover para produção.
Uso: python tools/qa_validator_tool.py --file .tmp/novo_schema.ts --type database
"""

import argparse
import json
import os
import sys

def verify_database_rules(content: str) -> list:
    errors = []
    if "mysqlTable" not in content:
        errors.append("Falta definição de tabela Drizzle (mysqlTable).")
    if "$inferSelect" not in content or "$inferInsert" not in content:
        errors.append("Contrato TypeScript violado: Não exportou tipos inferidos ($inferSelect/$inferInsert).")
    if "any" in content:
        errors.append("Uso proibido da palavra-chave 'any' encontrada no arquivo.")
    return errors

def verify_frontend_rules(content: str) -> list:
    import re
    errors = []
    if "interface" not in content and ".astro" not in content:
        errors.append("[serious] Componentes React devem obrigatoriamente possuir interfaces de Props nomeadas.")
    if "any" in content:
        errors.append("[critical] Uso proibido de 'any' detectado na camada de UI.")

    # Apple HIG / A11y rules merged from apple-hig-skills/packages/hig-doctor
    patterns = [
        # Critical concerns (accessibility-breaking)
        (r'<img\s(?![^>]*\balt=)[^>]*>', "[critical] Imagem HTML (<img>) sem atributo alt definido."),
        (r'<Image\s(?![^>]*\balt=)[^>]*>', "[critical] Imagem React (<Image>) sem atributo alt definido."),
        (r'<svg\s(?![^>]*(?:aria-label|aria-hidden|role=))', "[critical] Elemento <svg> sem atributos de acessibilidade (aria-label, aria-hidden ou role)."),
        (r'<h[1-6][^>]*>\s*</h[1-6]>', "[critical] Elemento de cabeçalho (h1-h6) vazio."),
        (r'<button[^>]*>\s*</button>', "[critical] Botão (<button>) vazio sem conteúdo textual ou ícone acessível."),
        (r'<video\b(?![^>]*<track)', "[critical] Elemento <video> sem faixa de legenda/legenda oculta (<track>)."),
        (r'<blink\b', "[critical] Uso proibido da tag obsoleta <blink>."),
        (r'<marquee\b', "[critical] Uso proibido da tag obsoleta <marquee>."),
        (r'user-scalable\s*=\s*no', "[critical] Acessibilidade móvel quebrada: 'user-scalable=no' impede zoom do usuário."),
        (r'maximum-scale\s*=\s*1\b', "[critical] Acessibilidade móvel quebrada: 'maximum-scale=1' restringe o zoom."),
        
        # Serious concerns (UX degradation)
        (r'<(div|span)\s[^>]*onClick[^>]*(?!.*role=)', "[serious] Elemento <\\1> com onClick mas sem role definido (use role=\"button\", etc.)."),
        (r'tabIndex\s*=\s*\{[1-9]', "[serious] Uso de tabindex positivo altera a ordem natural de foco do teclado."),
        (r'tabindex\s*=\s*["\'][1-9]', "[serious] Uso de tabindex positivo altera a ordem natural de foco do teclado."),
        (r'aria-hidden\s*=\s*["\']true["\'][^>]*(?:<button|<a\s|<input|tabIndex)', "[serious] aria-hidden=\"true\" aplicado a um contêiner com elementos interativos focáveis."),
        (r'onMouseOver=(?![^>]*onFocus)', "[serious] Evento onMouseOver sem o correspondente onFocus para acessibilidade de teclado."),
        (r'onMouseOut=(?![^>]*onBlur)', "[serious] Evento onMouseOut sem o correspondente onBlur para acessibilidade de teclado."),
        (r'\b(autoPlay|autoplay)\b', "[serious] Mídia com autoplay detectada (pode prejudicar usuários de leitores de tela)."),
        
        # Moderate concerns (style/best-practice violations)
        (r'(?:color|background-color|border-color|background):\s*#[0-9a-fA-F]{3,8}', "[moderate] Cor em hexadecimal codificada diretamente no CSS (use variáveis do Design System)."),
        (r'style=\{\{[^}]*color:\s*[\'"]#', "[moderate] Cor em hexadecimal in-line codificada diretamente (use variáveis de tema)."),
        (r'font-size:\s*\d+px', "[moderate] Tamanho de fonte fixo em px (utilize rem, em ou variáveis para suporte a Dynamic Type)."),
        (r'line-height:\s*(?:0\.\d+|1\.[01]\d*)\s*[;\}]', "[moderate] Altura de linha inferior a 1.2, prejudicando a legibilidade."),
        (r'z-index:\s*[1-9]\d{3,}', "[moderate] Valor extremo de z-index (z-index >= 1000). Mantenha valores controlados."),
        (r'!important', "[moderate] Uso de !important quebra a especificidade limpa do CSS do Design System."),
        (r'outline:\s*(none|0)\b', "[moderate] outline: none remove o anel de foco visual (use progressiva acessibilidade)."),
        (r'text-align:\s*(left|right)\b', "[moderate] Alinhamento físico de texto detectado (use start/end para compatibilidade RTL/i18n).")
    ]
    
    for pattern, err_msg in patterns:
        if re.search(pattern, content, re.IGNORECASE):
            errors.append(err_msg)
            
    return errors

def main(args: argparse.Namespace) -> dict:
    if not os.path.exists(args.file):
        return {"success": False, "error": {"code": "FILE_NOT_FOUND", "message": f"Arquivo {args.file} não existe."}}
    
    with open(args.file, "r", encoding="utf-8") as f:
        content = f.read()
    
    errors = []
    if args.type == "database":
        errors = verify_database_rules(content)
    elif args.type == "frontend":
        errors = verify_frontend_rules(content)
        
    if errors:
        return {"success": False, "error": {"code": "RULE_VIOLATION", "messages": errors}}
        
    return {"success": True, "data": {"message": "Arquivo aprovado com sucesso no critério de qualidade."}}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--file", required=True, help="Caminho do arquivo a ser testado")
    parser.add_argument("--type", required=True, choices=["database", "frontend", "api"], help="Tipo de validação")
    args = parser.parse_args()

    output = main(args)
    print(json.dumps(output, ensure_ascii=False, indent=2))
    sys.exit(0 if output["success"] else 2)
