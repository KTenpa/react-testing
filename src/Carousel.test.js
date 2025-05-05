import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

//Smoke Test for Carousel Component
it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
});


//Snapshot Test for Carousel Component
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});


//Test for Right Arrow
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


//Test for Left Arrow
it("left arrow should go to the previous image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="Test Carousel"
    />
  );

  // expect the first image to show
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

  // Click right arrow to move to second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Second image should be visible now
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // Now click the left arrow to move back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // First image should be visible again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});


//Test for Arrow Visibility
it("hides the left arrow when on the first image", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );
  
  // Initially, the left arrow should be hidden (first image)
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeInTheDocument();
});

it("hides the right arrow when on the last image", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );

  // Move to the last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Now the right arrow should be hidden (last image)
  expect(rightArrow).not.toBeInTheDocument();
});
