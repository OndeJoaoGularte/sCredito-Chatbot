const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add('btn-loading');
    setTimeout(() => {
      const formContainer = document.querySelector('.form-container');
      formContainer.innerHTML = `<div class="success-message" style="text-align: center; padding: 40px 20px;"><div style="font-size: 60px; margin-bottom: 20px;">🎉</div><h3 style="font-size: 28px; margin-bottom: 15px; color: var(--verde);">Formulário enviado com sucesso!</h3><p style="font-size: 18px; margin-bottom: 30px;">Em breve nossa equipe entrará em contato.</p><a href="#" class="btn" onclick="location.reload()">Voltar ao início</a></div>`;
    }, 2000);

    // CRIA SESSÃO NA API DO ADK
    fetch('http://127.0.0.1:8000/apps/agent/users/u_scredito_web/sessions/s_scredito_web', {
      method: 'POST'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao criar a sessão: ' + response.statusText);
        }
        console.log("Sessão criada com sucesso. Coletando dados do formulário.");
        return response.json();
      })
      .then(session => {
        // VALORES DO FORMULÁRIO
        var nome = document.getElementById('nome').value;
        var telefone = document.getElementById('telefone').value;
        var email = document.getElementById('email').value;
        var idade = document.getElementById('idade').value;
        var cidade = document.getElementById('cidade').value;
        var negocio = document.getElementById('negocio').value;
        var valor = document.getElementById('valor').value;
        var renda = document.getElementById('renda').value;
        var escolaridade = document.getElementById('escolaridade').value;

        // OBJETO JSON DO FORMULÁRIO
        var dados = {
          nome: nome,
          telefone: telefone,
          email: email,
          idade: parseInt(idade),
          cidade: cidade,
          negocio: negocio,
          valor: parseInt(valor),
          renda_familiar: parseFloat(renda),
          escolaridade: parseInt(escolaridade)
        };

        var requestAdk = {
          appName: "agent",
          userId: "u_scredito_web",
          sessionId: "s_scredito_web",
          newMessage: {
            role: "user",
            parts: [{
              text: JSON.stringify(dados)
            }]
          }
        };

        console.log("Enviando dados formatados para o agente:", JSON.stringify(requestAdk, null, 2));

        // ENVIANDO REQUEST PARA API DO ADK
        return fetch('http://127.0.0.1:8000/run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestAdk)
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição final para /run');
        }
        console.log("Dados enviados com sucesso para o ADK!");
        return response.json();
      })
      .then(dataFinal => {
        console.log("Resposta do agente:", dataFinal);
        alert("Solicitação foi enviada com sucesso!");
      }).catch(error => {
        console.error('Ocorreu um erro:', error);
        alert("Houve um problema ao enviar a solicitação. Tente novamente.");
      });
  });
}