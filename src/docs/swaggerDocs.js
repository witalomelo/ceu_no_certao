/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 *       description: "Por favor, forneça o token Bearer no formato `Bearer {token}`."
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário (mínimo 6 caracteres)
 *           minLength: 6
 *     Familia:
 *       type: object
 *       properties:
 *         resp_familiar:
 *           type: string
 *           description: Responsável pela família
 *         sexo: 
 *           type: string
 *           description: Sexo do responsável
 *         beneficio:
 *           type: string
 *           description: Indica se possui benefício social
 *         moradia:
 *           type: string
 *           enum: [propria, alugada, cedida, ocupacao, outro]
 *           description: Tipo de moradia da família
 *         tipo_casa:
 *           type: string
 *           enum: [tijolo, madeira, taipa, outro]
 *           description: Tipo de construção da casa
 *         num_comodos:
 *           type: integer
 *           description: Número de cômodos da casa
 *         num_moradores:
 *           type: integer
 *           description: Número de moradores da casa
 *         lider:
 *           type: string
 *           description: Líder da família
 *         status:
 *           type: boolean
 *           description: Status da família
 *     Endereco:
 *       type: object
 *       properties:
 *         cep:
 *           type: string
 *         rua:
 *           type: string
 *         numero:
 *           type: string
 *         complemento:
 *           type: string
 *         bairro:
 *           type: string
 *         cidade:
 *           type: string
 *         estado:
 *           type: string
 *         referencia:
 *           type: string
 *     Saneamento:
 *       type: object
 *       properties:
 *         tratamento_agua:
 *           type: string
 *         abastecimento_agua:
 *           type: string
 *         sistema_esgoto:
 *           type: string
 *         observacao:
 *           type: string
 *     Membros:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da pessoa
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: "Data de nascimento da pessoa (exemplo: 1995-04-15)"
 *         idade:
 *           type: integer
 *           description: Idade da pessoa
 *         sexo:
 *           type: string
 *           description: Sexo da pessoa
 *         religiao:
 *           type: string
 *           description: Religião da pessoa
 *         estado_civil:
 *           type: string
 *           description: Estado civil da pessoa
 *         telefone:
 *           type: string
 *           description: Telefone da pessoa
 *         parentesco:
 *           type: string
 *           description: Parentesco com o responsável da família
 *         escolaridade:
 *           type: string
 *           description: Escolaridade da pessoa
 *         profissao:
 *           type: string
 *           description: Profissão da pessoa
 *         familia_id:
 *           type: integer
 *           description: ID da família a qual a pessoa pertence
 *         renda:
 *           type: number
 *           format: float
 *           description: "Renda mensal da pessoa (exemplo: 1000.00)"
 */
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário
 *                   example: João Silva
 *                 email:
 *                   type: string
 *                   description: Email do usuário
 *                   example: joao.silva@email.com
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro detalhada
 *                   example: "falha no formato dos dados"
 *       409:
 *         description: Conflito de dados (usuário já cadastrado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro detalhada
 *                   example: "Usuario ja cadastrado"
 */

/**
 * @swagger
 * /familias:
 *   post:
 *     summary: Cria uma nova família
 *     tags: [Familia]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               familia:
 *                 $ref: '#/components/schemas/Familia'
 *               endereco:
 *                 type: object
 *                 properties:
 *                   cep:
 *                     type: string
 *                     example: "01234-567"
 *                   rua:
 *                     type: string
 *                     example: "Rua das Palmeiras"
 *                   numero:
 *                     type: string
 *                     example: "707"
 *                   bairro:
 *                     type: string
 *                     example: "Apto 10"
 *                   cidade:
 *                     type: string
 *                     example: "Fortaleza"
 *                   estado:
 *                     type: string
 *                     example: "Ceara"
 *                   referencia:
 *                     type: string
 *                     example: "proximo ao colegio Silva"
 *               saneamento:
 *                 type: object
 *                 properties:
 *                   tratamento_agua:
 *                     type: string
 *                     example: "FERVURA"
 *                   abastecimento_agua:
 *                     type: string
 *                     example: "CAMINHAO_PIPA"
 *                   sistema_esgoto:
 *                     type: string
 *                     example: "FOSSA"
 *                   observacao:
 *                     type: string
 *                     example: "Sistema de esgoto em área rural"
 *           example:
 *             familia:
 *               resp_familiar: "Carlos Andre"
 *               sexo: "M"
 *               beneficio: "Bolsa Família"
 *               moradia: "ALUGADA"
 *               tipo_casa: "TIJOLO"
 *               num_comodos: 2
 *               num_moradores: 3
 *               lider: "Pedro Augusto"
 *               status: true
 *             endereco:
 *               cep: "01234-567"
 *               rua: "Rua das Palmeiras"
 *               numero: "707"
 *               bairro: "Apto 10"
 *               cidade: "Fortaleza"
 *               estado: "Ceara"
 *               referencia: "proximo ao colegio Silva"
 *             saneamento:
 *               tratamento_agua: "FERVURA"
 *               abastecimento_agua: "CAMINHAO_PIPA"
 *               sistema_esgoto: "FOSSA"
 *               observacao: "Sistema de esgoto em área rural"
 *     responses:
 *       201:
 *         description: Família criada com sucesso
 *       400:
 *         description: Erro na requisicao
 *   get:
 *     summary: Retorna a lista de famílias
 *     tags: [Familia]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página a ser retornada (padrão é 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Número de famílias por página (padrão é 10)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de famílias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total de famílias na base de dados
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas disponíveis
 *                 currentPage:
 *                   type: integer
 *                   description: Página atual
 *                 familias:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Familia'  # Referência ao schema de Familia
 *       500:
 *         description: Erro ao buscar as famílias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 */

/**
 * @swagger
 * /familias/{id}:
 *   get:
 *     summary: Retorna os detalhes de uma família
 *     tags: [Familia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da família
 *     responses:
 *       200:
 *         description: Família encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Familia'  # Referência ao schema de Familia
 *       404:
 *         description: Família não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *       500:
 *         description: Erro ao buscar a família
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *   delete:
 *     summary: Deleta uma família
 *     tags: [Familia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da família
 *     responses:
 *       200:
 *         description: Família deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Família deletada com sucesso"
 *       400:
 *         description: Família já deletada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Família já deletada"
 *       404:
 *         description: Família não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Família não encontrada"
 *       500:
 *         description: Erro ao deletar a família
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao deletar a família"
 *   put:
 *     summary: Atualiza uma família
 *     tags: [Familia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da família
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Familia'
 *     responses:
 *       200:
 *         description: Família atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 enderecoAtualizado:
 *                   type: object
 *                   description: Informações do endereço atualizado
 *                   properties:
 *                     [insira as propriedades do objeto Endereco aqui, por exemplo]:
 *                     logradouro:
 *                       type: string
 *                     numero:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     uf:
 *                       type: string
 *                 familiaAtualizada:
 *                   type: object
 *                   description: Informações da família atualizada
 *                   properties:
 *                     [insira as propriedades do objeto Familia aqui, por exemplo]:
 *                     observacao:
 *                       type: string
 *                     beneficio:
 *                       type: string
 *                     moradia:
 *                       type: string
 *                     tipo_casa:
 *                       type: string
 *                     num_comodos:
 *                       type: integer
 *                     num_moradores:
 *                       type: integer
 *                     abastecimento_agua:
 *                       type: string
 *                     sistema_esgoto:
 *                       type: string
 *       400:
 *         description: Família já deletada ou erro de atualização
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Família deletada"
 *       404:
 *         description: Família não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Família não encontrada"
 *       500:
 *         description: Erro ao atualizar a família
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar a família"
 */
/**
/**
 * @swagger
 * /familias/membros:
 *   post:
 *     summary: Adiciona um membro a uma família
 *     tags: [Membro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Luis Martins"
 *               data_nascimento:
 *                 type: string
 *                 format: date-time
 *                 example: "1995-04-15T00:00:00Z"
 *               idade:
 *                 type: integer
 *                 example: 29
 *               sexo:
 *                 type: string
 *                 example: "M"
 *               religiao:
 *                 type: string
 *                 example: "Católica"
 *               estado_civil:
 *                 type: string
 *                 example: "Solteira"
 *               telefone:
 *                 type: string
 *                 example: "(11) 91234-5685"
 *               parentesco:
 *                 type: string
 *                 example: "Prima"
 *               escolaridade:
 *                 type: string
 *                 example: "Superior Cursando"
 *               profissao:
 *                 type: string
 *                 example: "Estudante"
 *               renda:
 *                 type: number
 *                 format: float
 *                 example: 1500.00
 *               familia_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Membro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Membro criado com sucesso"
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dados inválidos"
 *       500:
 *         description: Erro ao criar o membro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar o membro"
 */
/**
 * @swagger
 * /membros:
 *   get:
 *     summary: Retorna a lista de membros
 *     tags: [Membro]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página a ser retornada (default é 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Número máximo de membros a serem retornadas por página (default é 10)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de membros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 membros:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Membro'
 *       500:
 *         description: Erro ao buscar membros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar as membros"
 */

/**
 * @swagger
 * /familias/membros/{id}:
 *   delete:
 *     summary: Remove um membro da família
 *     tags: [Membro]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro
 *     responses:
 *       204:
 *         description: Membro removido com sucesso
 *       404:
 *         description: Membro não encontrado
 *       500:
 *         description: Erro ao deletar um membro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao deletar um membro"
 *
 *   put:
 *     summary: Atualiza os dados de um membro
 *     tags: [Membro]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membro'
 *     responses:
 *       200:
 *         description: Membro atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membro'
 *       404:
 *         description: Membro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Membro não encontrada"
 *       500:
 *         description: Erro ao atualizar a Membro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar a Membro"
 */

/**
/**
 * @swagger
 * /familias/{id}/membros:
 *   get:
 *     summary: Retorna os membros de uma família
 *     tags: [Membro]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da família
 *     responses:
 *       200:
 *         description: Lista de membros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 familiaId:
 *                   type: integer
 *                   example: 1
 *                 membros:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: "João da Silva"
 *                       idade:
 *                         type: integer
 *                         example: 30
 *                       parentesco:
 *                         type: string
 *                         example: "Pai"
 *       404:
 *         description: Nenhum membro encontrado para essa família
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Família não encontrada"
 *       500:
 *         description: Erro ao buscar os membros da família
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar os membros da família"
 */
