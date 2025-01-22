import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TrackCreateForm } from "./TrackCreateForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../api/axiosDefaults");

describe("TrackCreateForm", () => {
  beforeEach(() => {
    axiosReq.post.mockResolvedValue({
      data: { id: 1, title: "Test Track", genre: "house" },
    });
  });

  test("renders the form with inputs and buttons", () => {
    render(
      <Router>
        <CurrentUserContext.Provider value={{ id: 1 }}>
          <TrackCreateForm />
        </CurrentUserContext.Provider>
      </Router>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/audio file/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/album cover/i)).toBeInTheDocument();
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test("updates input fields correctly", () => {
    render(
      <Router>
        <CurrentUserContext.Provider value={{ id: 1 }}>
          <TrackCreateForm />
        </CurrentUserContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Track Title" },
    });

    expect(screen.getByLabelText(/title/i).value).toBe("New Track Title");
  });

  test("handles file uploads correctly", () => {
    render(
      <Router>
        <CurrentUserContext.Provider value={{ id: 1 }}>
          <TrackCreateForm />
        </CurrentUserContext.Provider>
      </Router>
    );

    const fileInput = screen.getByLabelText(/audio file/i);
    const file = new File(["audio"], "audio.mp3", { type: "audio/mpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByLabelText(/audio file/i).files[0]).toBe(file);
  });

  test("submits form successfully", async () => {
    render(
      <Router>
        <CurrentUserContext.Provider value={{ id: 1 }}>
          <TrackCreateForm />
        </CurrentUserContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Track Title" },
    });
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: "house" },
    });

    axiosReq.post.mockResolvedValueOnce({
      data: { id: 1, title: "New Track Title", genre: "house" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(axiosReq.post).toHaveBeenCalledTimes(1);
      expect(axiosReq.post).toHaveBeenCalledWith("/tracks/", expect.any(FormData));
    });
  });

  test("displays error messages on failed submission", async () => {
    axiosReq.post.mockRejectedValueOnce({
      response: { data: { title: ["This field is required."] } },
    });

    render(
      <Router>
        <CurrentUserContext.Provider value={{ id: 1 }}>
          <TrackCreateForm />
        </CurrentUserContext.Provider>
      </Router>
    );

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/This field is required./i)).toBeInTheDocument();
    });
  });
});
