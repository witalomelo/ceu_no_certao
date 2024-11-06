import Familia from "../models/Familia";
import Endereco from "../models/Endereco";
import Membro from "../models/Membro";
import Saneamento from "../models/Saneamento";

class FamiliaController {
  // Criar uma nova família
  async store(req, res) {
    //console.log(req.body);
    const { familia, endereco, saneamento, membros } = req.body;

    try {
      // cria saneamento
      const saneamentoCriado = await Saneamento.create(saneamento);

      // Criar o endereço
      const enderecoCriado = await Endereco.create(endereco);

      // Criar a família, incluindo o ID do endereço
      const familiaCriada = await Familia.create({
        ...familia,
        endereco_id: enderecoCriado.id,
        saneamento_id: saneamentoCriado.id,
      });

      const responsavelCriado = await Membro.create({
        nome: familia.resp_familiar,
        sexo: familia.sexo,
        parentesco: "Responsável",
        familia_id: familiaCriada.id,
        is_responsavel: true,
      });

      if (Array.isArray(membros) && membros.length > 0) {
        for (const membro of membros) {
          await Membro.create({
            ...membro,
            familia_id: familiaCriada.id,
          });
        }
      }

      const {
        id,
        endereco_id,
        saneamento_id,
        resp_familiar,
        sexo,
        beneficio,
        moradia,
        tipo_casa,
        num_comodos,
        num_moradores,
        status,
        lider,
      } = familiaCriada;

      // return res.status(200).json({ message: "Família criada com sucesso" });

      return res.status(200).json({
        id,
        endereco_id,
        beneficio,
        status: true,
        moradia,
        tipo_casa,
        num_comodos,
        num_moradores,
        endereco: enderecoCriado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar a família" });
    }
  }

  // Listar famílias com seus endereços
  async index(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await Familia.findAndCountAll({
        where: { status: true },
        include: [
          {
            model: Endereco,
            as: "enderecos",
            attributes: [
              "cep",
              "rua",
              "numero",
              "bairro",
              "cidade",
              "estado",
              "referencia",
            ],
          },
          {
            model: Saneamento,
            as: "saneamento",
            attributes: [
              "tratamento_agua",
              "abastecimento_agua",
              "sistema_esgoto",
            ],
          },
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      return res.json({
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        familias: rows,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar as famílias" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const familia = await Familia.findOne({
        where: {
          id: id,
          status: true,
        },
        include: [
          {
            model: Endereco,
            as: "enderecos",
            attributes: [
              "cep",
              "rua",
              "numero",
              "bairro",
              "cidade",
              "estado",
              "referencia",
            ],
          },
          {
            model: Saneamento,
            as: "saneamento",
            attributes: [
              "tratamento_agua",
              "abastecimento_agua",
              "sistema_esgoto",
            ],
          },
        ],
      });

      if (!familia) {
        return res.status(404).json({ error: "Família não encontrada" });
      }

      return res.json(familia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar a família" });
    }
  }

  //delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      const familia = await Familia.findByPk(id);

      if (!familia) {
        return res.status(404).json({ error: "Família não encontrada" });
      }

      if (!familia.status === true) {
        return res.status(400).json({ error: "Família já deletada" });
      }

      await familia.update({ status: false });

      return res.json({ message: "Família deletada com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar a família" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { endereco, familia, saneamento } = req.body;

      const familiaExist = await Familia.findByPk(id, {
        include: [
          { model: Endereco, as: "enderecos" },
          { model: Saneamento, as: "saneamento" },
        ],
      });

      if (!familiaExist) {
        return res.status(404).json({ error: "Família não encontrada" });
      }

      if (!familiaExist.status) {
        return res.status(400).json({ error: "Família não existe" });
      }

      // Atualiza o endereço
      let enderecoAtualizado = null;
      if (endereco) {
        await Endereco.update(endereco, {
          where: { id: familiaExist.endereco_id },
        });
        enderecoAtualizado = await Endereco.findByPk(familiaExist.endereco_id);
      }

      // Atualiza saneamento
      let saneamentoAtualizado = null;
      if (saneamento) {
        await Saneamento.update(saneamento, {
          where: { id: familiaExist.saneamento_id },
        });
        saneamentoAtualizado = await Saneamento.findByPk(
          familiaExist.saneamento_id
        );
      }

      // Atualiza a família
      if (familia) {
        await familiaExist.update(familia);
      }

      // Retorna os dados atualizados de forma separada
      return res.json({
        familia: {
          id: familiaExist.id,
          resp_familiar: familiaExist.resp_familiar,
          sexo: familiaExist.sexo,
          beneficio: familiaExist.beneficio,
          moradia: familiaExist.moradia,
          tipo_casa: familiaExist.tipo_casa,
          num_comodos: familiaExist.num_comodos,
          num_moradores: familiaExist.num_moradores,
          status: familiaExist.status,
          lider: familiaExist.lider,
          createdAt: familiaExist.createdAt,
          updatedAt: familiaExist.updatedAt,
        },
        endereco: enderecoAtualizado || familiaExist.enderecos,
        saneamento: saneamentoAtualizado || familiaExist.saneamento,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar a família" });
    }
  }

  async showMembros(req, res) {
    try {
      const { id } = req.params;

      const familia = await Familia.findByPk(id, {
        include: [
          {
            model: Membro,
            as: "membros",
            attributes: ["id", "nome", "idade", "parentesco"],
          },
        ],
      });

      if (!familia) {
        return res.status(404).json({ error: "Família não encontrada" });
      }

      const membrosDaFamilia = familia.membros.map((membro) => ({
        id: membro.id,
        nome: membro.nome,
        idade: membro.idade,
        parentesco: membro.parentesco,
      }));

      return res.json({
        familiaId: familia.id,
        membros: membrosDaFamilia,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar as pessoas da família" });
    }
  }
}

export default new FamiliaController();
