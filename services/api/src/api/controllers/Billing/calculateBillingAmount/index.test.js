const chai = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const calculateBillingAmount = require('./');

const ErrorValidator = require('/var/lib/core/js/error-validator');
const errorValidator = new ErrorValidator(calculateBillingAmount);

const { Item } = require(process.env.MODELS_PATH);

chai.should();
chai.use(require('chai-as-promised'));

describe('controllers/Billing/calculateBillingAmount', () => {
  const {
    error,
    args,
    itemsInstance,
    itemFormated,
    getItemsParams,
    getRawParams,
    response
  } = require('./fixtures');

  beforeEach(() => {
    sandbox.stub(Item, 'getItems').resolves(itemsInstance);
    sandbox.stub(itemsInstance[0], 'getRaw').returns(itemFormated);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return an error if Item.getItems return a reject', async() => {
    Item.getItems.restore();
    sandbox.stub(Item, 'getItems').throws(error);

    await errorValidator.shouldFailWith(error, null, args, context);

    Item.getItems.calledOnce.should.be.true;
    Item.getItems.args[0].should.eql(getItemsParams);
    itemsInstance[0].getRaw.called.should.false;
  });

  it('should return a success if there was no issue', async() => {
    const result = await calculateBillingAmount(null, args, context);

    Item.getItems.calledOnce.should.be.true;
    Item.getItems.args[0].should.eql(getItemsParams);
    itemsInstance[0].getRaw.calledOnce.should.true;
    itemsInstance[0].getRaw.args[0].should.be.eql(getRawParams);

    result.should.be.eql(response);
  });
});
