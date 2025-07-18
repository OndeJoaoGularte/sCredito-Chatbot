# Documentação de scripts de automação

### ALERTA
Não se assuste com a execução do script INICIAR_SERVICOS.bat, irá ser aberta várias janelas do CMD, porém cada um equivale a um serviço do ambiente SCredito.

Para o bom funcionamento do serviço dos agentes do ADK, é necessário realizar a instalação do ***wkhtmltox***, que é uma ferramenta nativa para converter HTML para PDF. O arquivo está marcado como **INSTALAR_ANTES.exe** no diretório raiz.

---

### Ambiente
Os serviços que compõem o ambiente do SCredito foram desenvolvidos para SO Windows 10 ou 11, estão localizados na pasta ***/scripts*** na raiz do projeto. Os scripts são do tipo *batch* e executados pelo **cmd.exe**.

---

### Scripts
A automação é composta por 5 scripts, sendo 4 para inicialização e 1 para orquestração. 
#### Lista de scripts
* **INICIAR_SERVICOS.bat**: Orquestração de scripts, inicializador.
* **iniciar_adk_v2.bat**: Criação e inicialização do serviço e API do *Google ADK*.
* **iniciar_ml.bat**: Criação e inicialização de servidor *Flask* para servir algoritmo de ML.
* **iniciar_ui.bat**: Inicialização do serviço de portal integrado do SCredito.
* **iniciar_site.bat**: Inicialização de website do SCredito.

#### Descrição
**INICIAR_SERVICOS.bat**
 - Invocação dos scripts dos serviços de ADK, ML, UI e WEBSITE.

**iniciar_adk_v2.bat**
 - Criação de ambiente virtual Python / Instalação de dependências.
 - Inicialização de API do Google ADK.

**iniciar_ml.bat**
 - Criação de ambiente virtual Python / Instalação de dependências.
 - Inicialização do serviço Flask.

**iniciar_ui.bat**
 - Verificação/Instalação das dependências do Node.
 - Inicialização do servidor Node.

 **iniciar_site.bat**
 - Verificação/Instalação das dependências do Node.
 - Inicialização do servidor Node.
 
---

### Etapas 
Adicionar chaves de API do Gemini em:
* Criar **.env**  em ***/scredito_website***, e adicionar: **"GEMINI_API_KEY=SUA_CHAVE_AQUI"**.
* Em ***scredito_adk/scredito***, adicionar no campo **"GOOGLE_API_KEY"** dos arquivos **.env** em ***/***, ***/agente_analista***, ***/agente_dashboard*** e ***/agente_pdf***.
  
Para executar os serviços, é necessário seguir a ordem:
1. INSTALAR_ANTES.exe: Irá instalar a ferramenta **wkhtmltox**, que tem como objetivo converter HTML para PDF nativamente.
2. INICIAR_SERVICOS.bat: Irá invocar o restante dos scripts.
   
