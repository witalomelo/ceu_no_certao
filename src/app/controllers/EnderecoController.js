import Endereco from "../models/Endereco";

class EnderecoController {
  async store(req, res) {
    const enderecoExist = await Endereco.findOne({
      where: { cep: req.body.cep },
    });

    if (enderecoExist) {
      return res.status(400).json({ error: "Endereco ja cadastrado" });
    }

    const { id, cep, numero, endereco, referencia } =
      await Endereco.create(req.body);

    return res.json({
      id,
      cep,
      numero,
      endereco,
      referencia,
    });
  }
}
