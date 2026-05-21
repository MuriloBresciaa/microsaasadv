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
    errors = []
    if "interface" not in content and ".astro" not in content:
        errors.append("Componentes React devem obrigatoriamente possuir interfaces de Props nomeadas.")
    if "any" in content:
        errors.append("Uso proibido de 'any' detectado na camada de UI.")
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
