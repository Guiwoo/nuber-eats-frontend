describe("Log In", () => {
    const user = cy
    it("should see login page", () => {
        user.visit("/").title().should("eq", "Log-in | Nuber Eats")
    })
    it("can see email/password validation error", () => {
        user.visit("/")
        user.findByPlaceholderText(/email/i).type("park.guiwoo")
        user.findByRole("alert").should("have.text", "Please Write a right email form")
        user.findByPlaceholderText(/email/i).clear()
        user.findByRole("alert").should("have.text", "Email is Required")
        user.findByPlaceholderText(/email/i).type("bad@email.com")
        user.findByPlaceholderText(/password/i).type("aaa").clear()
        user.findByRole("alert").should("have.text", "Password is Required")
    })
    it("can fill out the form and log in", () => {
        user.login("park.guiwoo@hotmail.com", "123")
    })
})