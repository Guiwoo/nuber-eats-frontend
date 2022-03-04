describe("Log In", () => {
    const user = cy
    it("should see login page", () => {
        user.visit("/").title().should("eq", "Log-in | Nuber Eats")
    })
    it("can fill out the form", () => {
        user.visit("/")
        user.findByPlaceholderText(/email/i).type("park.guiwoo@hotmail.com")
        user.findByPlaceholderText(/password/i).type("123")
        user.findByRole("button").should("not.have.class", "pointer-events-none")
        //todo login
    })
    it("can see email/password validation error", () => {
        user.visit("/")
        user.findByPlaceholderText(/email/i).type("park.guiwoo")
        user.findByRole("alert").should("have.text", "Please Write a right email form")
    })
})