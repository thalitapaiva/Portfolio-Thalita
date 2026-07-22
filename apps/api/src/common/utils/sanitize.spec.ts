import {
  collapseWhitespace,
  decodeEntities,
  sanitizePlainText,
  stripHtml,
} from "./sanitize";

describe("sanitize utils", () => {
  it("stripHtml removes tags and script/style contents", () => {
    expect(
      stripHtml("<p>Hi <b>there</b><script>alert(1)</script></p>"),
    ).toBe("Hi there");
    expect(stripHtml("<style>.x{}</style>Hello")).toBe("Hello");
  });

  it("decodeEntities decodes the small allow-list", () => {
    expect(decodeEntities("Fish &amp; chips &lt;3")).toBe("Fish & chips <3");
    expect(decodeEntities("&nbsp;spaced")).toBe(" spaced");
  });

  it("collapseWhitespace trims and squashes runs", () => {
    expect(collapseWhitespace("  a    b\n\n\n\nc  ")).toBe("a b\n\nc");
  });

  it("sanitizePlainText composes all three and enforces maxLength", () => {
    const long = "a".repeat(20);
    expect(
      sanitizePlainText("<b>Hi &amp; hello</b>  <script>x</script>", {
        maxLength: 12,
      }),
    ).toBe("Hi & hello");
    expect(sanitizePlainText(long, { maxLength: 5 })).toHaveLength(5);
  });
});
