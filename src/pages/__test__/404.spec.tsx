import {render, waitFor} from "../../test-utils";
import {NotFound} from "../404";

describe("<404 />", () => {
  it("renders ok", async () => {
    render(<NotFound />);
    await waitFor(() => expect(document.title).toBe("Not Found | Nuber Eats"));
  });
});
