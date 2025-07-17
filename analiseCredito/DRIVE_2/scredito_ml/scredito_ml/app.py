# app.py

import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Inicializa a aplicação Flask
app = Flask(__name__)

CORS(app)
# Carrega o modelo RandomForest treinado
# O modelo é carregado apenas uma vez quando o servidor inicia
try:
    model = joblib.load("scredito_rf.joblib")
    print("✅ Modelo 'scredito_rf.joblib' carregado com sucesso!")
except FileNotFoundError:
    print("❌ Erro: O arquivo 'scredito_rf.joblib' não foi encontrado.")
    model = None

# Define a rota (endpoint) para fazer previsões
@app.route('/perfil', methods=['POST'])
def prever_perfil():
    # Verifica se o modelo está disponível
    if model is None:
        return jsonify({'erro': 'Modelo não foi carregado, verifique os logs.'}), 500

    try:
        # 1. Pega os dados JSON enviados na requisição
        dados_entrada = request.get_json()
        print(f"📥 Dados recebidos: {dados_entrada}")

        # 2. Valida se as chaves necessárias estão presentes
        if 'renda_familiar' not in dados_entrada or 'score_credito' not in dados_entrada:
            return jsonify({'erro': 'Dados incompletos. Forneça "renda_familiar" e "score_credito".'}), 400

        # 3. Converte os dados para um DataFrame do Pandas
        # O modelo espera um DataFrame com colunas na ordem correta
        df_entrada = pd.DataFrame([dados_entrada], columns=['renda_familiar', 'score_credito'])

        # 4. Usa o modelo para fazer a previsão
        previsao = model.predict(df_entrada)

        # 5. O resultado é um array, então pegamos o primeiro item
        perfil_predito = previsao[0]

        # 6. Retorna o resultado em formato JSON
        print(f"✅ Previsão realizada: {perfil_predito}")
        return jsonify({'perfil_predito': perfil_predito})

    except Exception as e:
        # Em caso de qualquer outro erro, retorna uma mensagem clara
        traceback.print_exc()
        return jsonify({'erro': 'Ocorreu um erro inesperado.', 'detalhes': str(e)}), 500

# Executa o servidor
if __name__ == '__main__':
    # host='0.0.0.0' permite que a API seja acessada de outros dispositivos na mesma rede
    app.run(host='0.0.0.0', port=5000, debug=True)