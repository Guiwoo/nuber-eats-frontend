describe("Edti Profile", () => {
    const user = cy;

    beforeEach(() => {
        user.login("cypress@test.com", "123")
    })

    it("Can go to /edit-profile using the header", () => {
        user.get(`a[href="/edit-profile"]`).click()
        user.title().should("eq", "Edit-Profile | Nuber Eats")
    })
    it("can change email", () => {
        user.intercept("POST", "http://localhost:4000/graphql", (req) => {
            if (req.body?.operationName === "editProfile") {
                //@ts-ignore
                req.body.variables?.input?.email = "cypress@test.com"
            }
        })
        user.get(`a[href="/edit-profile"]`).click()
        user.findByPlaceholderText(/email/i).clear().type("editCypress@test.com")
        user.findByRole("button").click();
    })
})