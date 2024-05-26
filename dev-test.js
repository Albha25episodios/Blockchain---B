const Block = require("./block");

const fooBlock = Block.mineBlock(Block.genesis(), "foobar");

console.log(fooBlock.toString());
