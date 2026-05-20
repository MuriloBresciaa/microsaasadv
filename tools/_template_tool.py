#!/usr/bin/env python3
"""
_template_tool.py — Site Factory 3.0 Tools Layer
Propósito: Template base para novos scripts da Camada 3 (A.N.T)
Uso: python tools/_template_tool.py --input <valor>

Protocolo V.L.A.E.G — Fase A deve existir em /architecture/ antes de usar este template.
"""

import argparse
import json
import sys

from dotenv import load_dotenv

load_dotenv(".env.local")


def main(args: argparse.Namespace) -> dict:
    """
    Lógica principal. Retorna dict com { success, data } ou { success, error }.
    Exit codes: 0 = sucesso | 1 = erro de input | 2 = erro de runtime | 3 = erro de rede
    """
    try:
        # --- IMPLEMENTAÇÃO AQUI ---
        # Substituir pelo código determinístico do módulo
        result = {"message": "template executado com sucesso", "input": vars(args)}
        return {"success": True, "data": result}

    except ValueError as e:
        print(json.dumps({"success": False, "error": {"code": "INPUT_ERROR", "message": str(e)}}, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)

    except ConnectionError as e:
        print(json.dumps({"success": False, "error": {"code": "NETWORK_ERROR", "message": str(e)}}, ensure_ascii=False), file=sys.stderr)
        sys.exit(3)

    except Exception as e:
        print(json.dumps({"success": False, "error": {"code": "RUNTIME_ERROR", "message": str(e)}}, ensure_ascii=False), file=sys.stderr)
        sys.exit(2)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    # Adicionar argumentos específicos do módulo:
    # parser.add_argument("--input", required=True, help="Descrição do input")
    # parser.add_argument("--output", default="stdout", help="Destino do output")
    args = parser.parse_args()

    output = main(args)
    print(json.dumps(output, ensure_ascii=False, indent=2))
    sys.exit(0 if output["success"] else 2)
