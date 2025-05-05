import { render } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", function() {
  render(
    <Card
      caption="Photo Caption"
      src="image1.jpg"
      currNum={1}
      totalNum={3}
    />
  );
});
