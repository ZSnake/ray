export default class Repository {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.findAll({});
  }

  getById(id) {
    return this.model.findById(id);
  }

  create(payload) {
    return this.model.create(payload);
  }

  update(id, payload) {
    return this.model.update(payload, {
      where: { id },
    });
  }

  delete(id) {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
