const { ExpectationFailed } = require("http-errors")

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe('Sample Test 2', () => {
    it('should test that false === false', () => {
        expect(false).toBe(false)
    })
})
