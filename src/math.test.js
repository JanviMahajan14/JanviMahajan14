const math = require("./math")
// @ponicode
describe("math.tipCalc", () => {
    test("0", () => {
        let callFunction = () => {
            math.tipCalc(10000, -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            math.tipCalc(0, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            math.tipCalc(-10, 10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            math.tipCalc(10000, -10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            math.tipCalc(10, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            math.tipCalc(NaN, NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("math.celsiusToFahrenheit", () => {
    test("0", () => {
        let callFunction = () => {
            math.celsiusToFahrenheit(-1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            math.celsiusToFahrenheit(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            math.celsiusToFahrenheit(10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            math.celsiusToFahrenheit(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            math.celsiusToFahrenheit(0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            math.celsiusToFahrenheit(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("math.add", () => {
    test("0", () => {
        let callFunction = () => {
            math.add(10, -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            math.add(10, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            math.add(-1, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            math.add(-1, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            math.add(0.0, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            math.add(-Infinity, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
