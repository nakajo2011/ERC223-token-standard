const SampleToken = artifacts.require('SampleToken.sol')
const ReceiverImpl = artifacts.require('./ReceiverImpl.sol')
const ReceiverNotImpl = artifacts.require('./ReceiverNotImpl.sol')
const ReceiverHasFallback = artifacts.require('./ReceiverHasFallback.sol')

contract('ERC223TokenTest', function (accounts) {
  let token;
  beforeEach(async () => {
    token = await SampleToken.new();
  })
  it("allow transfer to implemented contract ", async () => {
    const impl = await ReceiverImpl.new();
    const receipt = await token.transfer(impl.address, 20)
    const balance = await token.balanceOf(impl.address)
    assert.equal(20, balance.toNumber())
  })

  it("not allow transfer to no impl contract ", async () => {
    const notImpl = await ReceiverNotImpl.new();
    try {
      const receipt2 = await token.transfer(notImpl.address, 10)
      assert.fail()
    } catch (e) {
      assert.equal("VM Exception while processing transaction: revert", e.message)
    }
  })

  it("allow transfer to has fallback contract ", async () => {
    const hasFallback = await ReceiverHasFallback.new();

    // fallbackあれば呼べちゃうけどまぁこれは仕方ないよね。。。
    const receipt3 = await token.transfer(hasFallback.address, 5)
    const balance3 = await token.balanceOf(hasFallback.address)
    assert.equal(5, balance3.toNumber())
  })

  it("allow transfer to other EOA ", async () => {
    // もちろん他のEOAにも送れる
    const receipt4 = await token.transfer(accounts[1], 30)
    const balance4 = await token.balanceOf(accounts[1])
    assert.equal(30, balance4.toNumber())
  })
})

