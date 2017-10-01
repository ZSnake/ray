import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Repository from '../../src/data/repository';

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

const sandbox = sinon.sandbox.create();

describe('Repository', () => {
  afterEach(() => {
    sandbox.restore();
  })
  describe('When getting all elements of a table', () => {
    it('Should resolve an array of objects with the desired data', () => {
      const modelResult = [
        {
          dataValues: {
            id: 'someId',
            value: 'someValue'
          }
        },
        {
          dataValues: {
            id: 'someOtherId',
            value: 'SomeOtherValue'
          }
        }
      ];
      const mockModel = {
        findAll: sandbox.stub().resolves(modelResult)
      };
      const testRepository = new Repository(mockModel);
      const result = testRepository.getAll();
      expect(result).to.eventually.deep.equal(modelResult);
    });
    it('Should resolve an empty array if theres no data', () => {
      const modelResult = [];
      const mockModel = {
        findAll: sinon.stub().resolves(modelResult)
      };
      const testRepository = new Repository(mockModel);
      const result = testRepository.getAll();
      expect(result).to.eventually.deep.equal(modelResult);
    });
  });

  describe('When getting an element by Id', () => {
    it('Should resolve an object with the desired data', () => {
      const objectId = 'someId';
      const modelResult = {
        dataValues: {
          id: objectId,
          value: 'someOtherId'
        }
      };
      const mockModel = {
        findById: sandbox.stub().resolves(modelResult)
      };
      const testRepository = new Repository(mockModel);
      const result = testRepository.getById(objectId);

      expect(result).to.eventually.equal(modelResult);
      expect(result).to.eventually.have.property('dataValues')
    });
    it('Should resolve null if theres no match', () => {
      const objectId = 'someInexistentId';
      const mockModel = {
        findById: sandbox.stub().resolves(null)
      };
      const testRepository = new Repository(mockModel);
      const result = testRepository.getById(objectId);

      expect(result).to.eventually.be.null;
    });
  });

  describe('When creating a new element', () => {
    const payload = {
      id: 'someId',
      value: 'someValue'
    };
    const mockModel = {
      create: sandbox.spy()
    };
    it('Should call the create function with the expected payload', () => {
      const testRepository = new Repository(mockModel);
      testRepository.create(payload);
      expect(mockModel.create).to.have.been.calledWith(payload);
    });
  });
  describe('When updating an element', () => {
    const elementId = 'someId';
    const payload = {
      value: 'newValue'
    };
    const mockModel = {
      update: sandbox.spy()
    };
    it('Should call the update function with the correct query and payload', () =>{
      const testRepository = new Repository(mockModel);
      testRepository.update(elementId, payload);

      expect(mockModel.update).to.have.been.calledWith(payload, {where: {id: elementId}});
    });
  });

  describe('When removing an element by id', () => {
    const elementId = 'someId';
    const mockModel = {
      destroy: sandbox.spy()
    };
    it('Should call the destroy function with the correct query', () => {
      const testRepository = new Repository(mockModel);
      testRepository.delete(elementId);

      expect(mockModel.destroy).to.have.been.calledWith({where:{id: elementId}});
    });
  });
});