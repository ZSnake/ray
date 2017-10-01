import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Bluebird from 'bluebird';
import 'babel-polyfill';

import Controller from '../../src/controllers/notificationTypes';
import Repository from '../../src/data/repository';

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Notification Types Controller', () => {
  describe('When getting all notification types', () =>{
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    })
    afterEach(() => {
      sandbox.restore();
    });
    it('Should reply to the client with a list of notificationTypes', (done) => {
      const request = {};
      const reply = sandbox.spy();
      const notificationTypesList = [
        {
          dataValues: {
            id: 1,
            notificationTypeName: 'someName',
            user_ids: null,
            group_ids: null
          }
        },
        {
          dataValues: {
            id: 2,
            notificationTypeName: 'someOtherName',
            user_ids: null,
            group_ids: null
          }
        }
      ]
      const getAllStub = sandbox.stub(Repository.prototype, 'getAll').resolves(notificationTypesList);
      Bluebird.coroutine(Controller.getAllNotificationTypes)(request, reply).then(() => {
        expect(reply).to.have.been.calledWith(notificationTypesList);
        done();
      });
    })
  });
});