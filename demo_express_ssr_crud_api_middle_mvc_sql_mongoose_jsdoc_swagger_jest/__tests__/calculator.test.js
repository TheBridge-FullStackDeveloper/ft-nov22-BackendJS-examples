const { add, sub, div, mul } = require('../utils/calculator')

describe("Testing calculator functionalities", () => {
    describe("Adding numbers. Testing add() function", () => {
        test('Adding 1 + 1 equals 2', () => {
            expect(add(1, 1)).toBe(2)
        })

        test('Adding 1 + "1" equals 2', () => {
            expect(add(1, "1")).toBe(NaN);
        })
        test('Adding without parameters', () => {
            expect(add()).toBeNull();
        })
    })
    describe("Multiplying numbers. Testing add() function", () => {
        test('Multiplying 1 * 1 equals 1', () => {
            expect(mul(1, 1)).toBe(1)
        })
    })

    describe("Substracting numbers. Testing add() function", () => {
        test('Subtracting 1 - 1 equals 0', () => {
            expect(sub(1, 1)).toBe(0);
        })
    })

    describe("Dividing numbers. Testing div() function", () => {
        test('Dividing 1 / 1 equals 1', () => {
            expect(div(1, 1)).toBe(1);
        })
        test('Dividing 1 / 0 equals Infinity', () => {
            expect(div(1, 0)).toBe(Infinity);
        })
        test('Dividing without parameters', () => {
            expect(div()).toBeNull();
        })
    })
})
