import Stack from "../../src/stacks/Stack";

describe("Stack", () => {
  it("should push and pop elements", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });
});