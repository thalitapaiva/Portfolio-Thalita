import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./button";

describe("Button", () => {
  it("renders as a native button with default primary variant", () => {
    render(<Button>Enviar</Button>);
    const btn = screen.getByRole("button", { name: "Enviar" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("fires onClick when activated with keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Ok</Button>);
    screen.getByRole("button").focus();
    await user.keyboard("[Enter]");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Off
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports asChild to render as an anchor", () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("applies size classes", () => {
    render(<Button size="lg">Big</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });
});
