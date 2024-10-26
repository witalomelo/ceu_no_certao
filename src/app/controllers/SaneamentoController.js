import Saneamento from "../models/Saneamento";

class SaneamentoController {
  async store(req, res) {
    const {
      id,
      tratamento_agua,
      abastecimento_agua,
      sistema_esgoto,
      obsercao,
    } = await Saneamento.create(req.body);

    return res.json({
      id,
      tratamento_agua,
      abastecimento_agua,
      sistema_esgoto,
    });
  }
}

export default new SaneamentoController();
