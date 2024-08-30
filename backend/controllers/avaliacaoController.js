const db = require('../config/db');

// Função para salvar a avaliação no banco de dados
exports.saveAvaliacao = (req, res) => {
  // Log do corpo da requisição
  console.log('Corpo da requisição:', req.body);

  const { usuario_id, colaborador_id, servico_id, observacoes } = req.body;
  let respostas;

  // Verifica se `respostas` é uma string e tenta parsear como JSON
  if (typeof req.body.respostas === 'string') {
    try {
      respostas = JSON.parse(req.body.respostas); // Converter as respostas em JSON
    } catch (parseError) {
      console.error('Erro ao parsear as respostas:', parseError);
      return res.status(400).json({ message: 'Formato inválido para as respostas.' });
    }
  } else if (Array.isArray(req.body.respostas)) {
    // Se `respostas` for um array, converte para um objeto com chave como o índice
    respostas = req.body.respostas.reduce((acc, resposta, index) => {
      if (resposta !== undefined && resposta !== '') {
        acc[index] = resposta;
      }
      return acc;
    }, {});
  } else {
    console.error('Formato de `respostas` inválido.');
    return res.status(400).json({ message: 'Formato inválido para `respostas`.' });
  }

  // Log dos dados recebidos
  console.log('Dados recebidos:', { usuario_id, colaborador_id, servico_id, respostas, observacoes });

  // Iniciar uma transação no banco de dados
  db.beginTransaction((err) => {
    if (err) {
      console.error('Erro ao iniciar a transação:', err);
      return res.status(500).json({ message: 'Erro ao iniciar a transação.' });
    }

    console.log('Iniciando transação...');

    // Inserir a avaliação na tabela 'avaliacao'
    db.query(
      'INSERT INTO avaliacao (usuario_id, colaborador_id, servico_id, observacoes) VALUES (?, ?, ?, ?)',
      [usuario_id, colaborador_id, servico_id, observacoes],
      (err, result) => {
        if (err) {
          console.error('Erro ao salvar avaliação:', err);
          return db.rollback(() => res.status(500).json({ message: 'Erro ao salvar avaliação.' }));
        }

        const avaliacaoId = result.insertId;
        console.log('Avaliação salva com ID:', avaliacaoId);

        // Inserir cada resposta na tabela 'respostas'
        const respostaPromises = Object.entries(respostas).map(([pergunta_id, resposta]) => {
          return new Promise((resolve, reject) => {
            db.query(
              'INSERT INTO respostas (avaliacao_id, pergunta_id, resposta, colaborador_id, observacoes) VALUES (?, ?, ?, ?, ?)',
              [avaliacaoId, pergunta_id, resposta, colaborador_id, observacoes],
              (err) => {
                if (err) {
                  console.error(`Erro ao salvar resposta para pergunta ${pergunta_id}:`, err);
                  return reject(err);
                }
                console.log(`Resposta para pergunta ${pergunta_id} salva com sucesso.`);
                resolve();
              }
            );
          });
        });

        Promise.all(respostaPromises)
          .then(() => {
            // Confirmar a transação
            db.commit((err) => {
              if (err) {
                console.error('Erro ao confirmar a transação:', err);
                return db.rollback(() => res.status(500).json({ message: 'Erro ao confirmar a transação.' }));
              }
              console.log('Transação confirmada com sucesso!');
              res.status(201).json({ message: 'Avaliação salva com sucesso!' });
            });
          })
          .catch((err) => {
            console.error('Erro ao salvar respostas:', err);
            db.rollback(() => res.status(500).json({ message: 'Erro ao salvar respostas.' }));
          });
      }
    );
  });
};
