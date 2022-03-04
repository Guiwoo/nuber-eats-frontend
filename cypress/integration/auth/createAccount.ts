describe("Create Account", () => {
    const user = cy;
    it("should see Validation Error on Email,Password", () => {
        user.visit("/")
        user.findAllByText(/Create an Account/i).click()
        user.findByPlaceholderText(/email/i).type("none@good")
        user.findByRole("alert").should("have.text", "Write a right email form")
        user.findByPlaceholderText(/email/i).clear()
        user.findByRole("alert").should("have.text", "Email is Required")
        user.findByPlaceholderText(/email/i).type("park.guiwoo@hotmail.com")
        user.findByPlaceholderText(/password/i).type("aaa").clear()
        user.findByRole("alert").should("have.text", "Password is Required")
    })
    it("should be able to account and log in", () => {
        user.intercept("http://localhost:4000/graphql", (req) => {
            const { operationName } = req.body
            if (operationName && operationName === "createAccountMutation") {
                req.reply((res) => {
                    res.send({
                        data: {
                            "createAccount": {
                                "ok": true,
                                "error": null,
                                "__typename": "CreateAccOutput"
                            }
                        }
                    })
                })
            }
        })
        user.visit("/create-account")
        user.findByPlaceholderText(/email/i).type("cypress@test.com")
        user.findByPlaceholderText(/password/i).type("123")
        user.findByRole("button").click()
        user.wait(3000)
        user.title().should("eq", "Log-in | Nuber Eats")
        user.findByRole("button").click()
        user.window().its("localStorage.nuber-token").should("be.a", "string")
    })
})