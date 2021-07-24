import { render, fireEvent, screen } from "@testing-library/react";

import BugListTable from "./BugListTable";

test("the bug table should display a list of bugs", () => {
  const bugList = [
    { id: "1234", description: "A test bug", priority: "Low" },
    { id: "2345", description: "Another test bug", priority: "Medium" },
    { id: "3456", description: "One more test bug", priority: "High" },
  ];

  render(<BugListTable bugList={bugList} deleteBug={() => {}} />);
  const rows = screen.getAllByRole("row");
  for (let index = 1; index < rows.length; index += 1) {
    expect(rows[index]).toHaveTextContent(bugList[index - 1].description);
  }
});

test("the resolved button should remove the bug", () => {
  let bugList = [
    { id: "1234", description: "A test bug", priority: "Low" },
    { id: "2345", description: "Another test bug", priority: "Medium" },
    { id: "3456", description: "One more test bug", priority: "High" },
  ];

  const removeFirstBug = (id) => {
    bugList = bugList.filter((bug) => bug.id !== id);
  };

  const { rerender } = render(
    <BugListTable
      bugList={bugList}
      deleteBug={(id) => {
        removeFirstBug(id);
      }}
    />
  );
  fireEvent.click(screen.getAllByText("Resolved")[0]);
  rerender(
    <BugListTable
      bugList={bugList}
      deleteBug={(id) => {
        removeFirstBug(id);
      }}
    />
  );
  const rows = screen.getAllByRole("row");
  expect(rows.length).toBe(3);
  for (let index = 1; index < rows.length; index += 1) {
    expect(rows[index]).toHaveTextContent(bugList[index - 1].description);
  }
});
