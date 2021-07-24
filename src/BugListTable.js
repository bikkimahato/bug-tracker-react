const BugListTable = ({ bugList, deleteBug }) => {
  const resolvedPressed = (id) => {
    deleteBug(id);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Priority</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {bugList.length === 0 && (
          <tr>
            <td>No Bugs Found</td>
          </tr>
        )}
        {bugList.length > 0 &&
          bugList.map((bug) => (
            <tr key={bug.id}>
              <td>{bug.description}</td>
              <td>{bug.priority}</td>
              <td>
                <button onClick={() => resolvedPressed(bug.id)}>
                  Resolved
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BugListTable;
