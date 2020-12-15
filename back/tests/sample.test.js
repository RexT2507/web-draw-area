const { ExpectationFailed } = require("http-errors")

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})
