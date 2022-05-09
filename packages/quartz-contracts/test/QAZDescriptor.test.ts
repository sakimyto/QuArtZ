import chai, { assert } from "chai";
import { solidity } from "ethereum-waffle";
import { QAZDescriptor } from "../typechain-types";
import { deployQAZDescriptor } from "./utils";

chai.use(solidity);

describe("QAZDescriptor", async () => {
  let QAZDescriptor: QAZDescriptor;
  let params: number[];

  before(async () => {
    QAZDescriptor = await deployQAZDescriptor();
    params = [...Array(31).keys()];
  });

  it("Should generate valid token uri metadata when data uris are enabled", async () => {
    const tokenUri = await QAZDescriptor.tokenURI(0);
    console.log(`tokenUri: ${tokenUri}`);

    const { name, description, image, attributes, notExistsKey } = JSON.parse(
      Buffer.from(
        tokenUri.replace("data:application/json;base64,", ""),
        "base64"
      ).toString("ascii")
    );

    assert.notEqual(name, "");
    console.log(`name: ${tokenUri}\n`);

    assert.equal(
      description,
      "QuArtZ is full-on-chain magic spell protocol, that is generated randomly and stored with attributes on Aster Network."
    );
    console.log(`description: ${description}\n`);

    assert.notEqual(image, "");
    console.log(`image data: ${image}\n`);

    assert.notEqual(attributes, "");
    console.log("attributes:");
    console.dir(attributes);

    assert.equal(notExistsKey, undefined);
    console.log(notExistsKey);
  });

  it("Should have getSpell function", async () => {
    const spell = await QAZDescriptor.getSpell(0);
    assert.notEqual(spell, "");
    console.log(spell);
  });

  it("Should have getElement function", async () => {
    const element = await QAZDescriptor.getElement(0);
    assert.notEqual(element, "");
    console.log(element);
  });

  it("Should have getPower function", async () => {
    const power = await QAZDescriptor.getPower(0);
    assert.include(params, parseInt(power, 10));
    console.log(`power param: ${power}`);
  });

  it("Should have getSpeed function", async () => {
    const speed = await QAZDescriptor.getSpeed(0);
    assert.include(params, parseInt(speed));
    console.log(`speed param: ${speed}`);
  });

  it("Should have getAccuracy function", async () => {
    const accuracy = await QAZDescriptor.getAccuracy(0);
    assert.include(params, parseInt(accuracy));
    console.log(`accuracy param: ${accuracy}`);
  });

  it("Should have getRange function", async () => {
    const range = await QAZDescriptor.getRange(0);
    assert.include(params, parseInt(range));
    console.log(`range param: ${range}`);
  });

  it("Should have getCost function", async () => {
    const cost = await QAZDescriptor.getCost(0);
    assert.include(params, parseInt(cost));
    console.log(`cost param: ${cost}`);
  });

  it("Should have getLuck function", async () => {
    const luck = await QAZDescriptor.getLuck(0);
    assert.include(params, parseInt(luck));
    console.log(`luck param: ${luck}`);
  });

  it("Watch attributes data", async () => {
    for (let i = 0; i < 15; i++) {
      const tokenUri = await QAZDescriptor.tokenURI(i);

      const { attributes } = JSON.parse(
        Buffer.from(
          tokenUri.replace("data:application/json;base64,", ""),
          "base64"
        ).toString("ascii")
      );

      assert.notEqual(attributes, "");
      console.log("attributes:");
      console.dir(attributes);
    }
  });
});
