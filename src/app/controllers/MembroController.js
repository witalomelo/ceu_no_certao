import Membro from "../models/Membro";
import Familia from "../models/Familia";

class MembroController {
  async store(req, res) {
    try {
      const { familia_id, is_responsavel, nome } = req.body;

      // Verifica se a família existe e se o status é true
      const familia = await Familia.findByPk(familia_id);

      if (!familia) {
        return res.status(404).json({ error: "Família não encontrada" });
      }

      if (!familia.status) {
        return res.status(400).json({ error: "Família não está ativa" });
      }

      if (is_responsavel) {
        const responsavelAtual = await Membro.findOne({
          where: {
            familia_id,
            is_responsavel: true,
          },
        });

        if (responsavelAtual) {
          await responsavelAtual.update({ is_responsavel: false });
        }

        await familia.update({ resp_familiar: nome });
      }

      // Novo membro
      const membro = await Membro.create(req.body);

      return res
        .status(201)
        .json({ message: "Membro criado com sucesso", membro });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar um membro" });
    }
  }

  //delete
  async delete(req, res) {
    try {
      const { id } = req.params;
      const membro = await Membro.findByPk(id);

      if (!membro) {
        return res.status(404).json({ error: "Membro não encontrada" });
      }

      await membro.destroy();

      return res.status(200).json({ message: "Membro removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar o membro" });
    }
  }

  //show
  async show(req, res) {
    try {
      const { id } = req.params;
      const membro = await Membro.findByPk(id, {
        include: { model: Familia, as: "familia" },
      });

      if (!membro) {
        return res.status(404).json({ error: "Membro não encontrada" });
      }

      return res.json(membro);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar um membro" });
    }
  }

  //todas as pessoas
  async index(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await Membro.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      const membro = rows.map((membro) => ({
        id: membro.id,
        nome: membro.nome,
        idade: membro.idade,
        data_nascimento: membro.data_nascimento,
        escolaridade: membro.escolaridade,
        profissao: membro.profissao,
        telefone: membro.telefone,
        parentesco: membro.parentesco,
        sexo: membro.sexo,
        religiao: membro.religiao,
        estado_civil: membro.estado_civil,
        renda: membro.renda,
        familia: membro.familia,
      }));

      return res.json({
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        membro: membro,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar o membro" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { is_responsavel, familia_id } = req.body;

   
    const transaction = await Membro.sequelize.transaction();

    try {
      const membro = await Membro.findByPk(id, { transaction });

      if (!membro) {
        await transaction.rollback();
        return res.status(404).json({ error: "Membro não encontrado" });
      }

      
      if (is_responsavel && familia_id) {
        await Membro.update(
          { is_responsavel: false },
          {
            where: { familia_id, is_responsavel: true },
            transaction,
          }
        );

        
        await Familia.update(
          { resp_familiar: membro.nome }, 
          { where: { id: familia_id }, transaction }
        );
      }

      
      await membro.update(req.body, { transaction });

      await transaction.commit();
      return res.json(membro);
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ error: "Erro ao atualizar o membro" });
    }
  }
}

export default new MembroController();
