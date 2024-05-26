const Blockchain = require("./blockchain");
const Block = require("./block");

describe("blockchain", () => {
  let bc;
  let bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it("Start the genesis Block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("adds the new block", () => {
    const data = "new block";
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it("Validate a valid chain", () => {
    bc2.addBlock("foo");
    expect(bc2.isValidChain(bc2.chain)).toBe(true);
  });

  it("Validate a chain with a corrupted genesis block", () => {
    bc2.chain[0].data = "aaaaaaaaaaa";
    expect(bc2.isValidChain(bc2.chain)).toBe(false);
  });

  it("Validate a corrupted chain", () => {
    bc2.addBlock("fuu");
    bc2.chain[1].data = "bar";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("replace the chain with a valid chain", () => {
    bc2.addBlock("faa");
    bc.replaceChain(bc2.chain);
    expect(bc.chain).toEqual(bc2.chain);
  });

  it("does not replace the blockchain with one of less than or equal to length", () => {
    bc.addBlock("fee");
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain);
  });
});
