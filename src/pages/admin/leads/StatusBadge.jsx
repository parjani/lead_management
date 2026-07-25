function StatusBadge({ status }) {

  const colors = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Qualified: "bg-green-100 text-green-700",
    Proposal: "bg-purple-100 text-purple-700",
    Won: "bg-emerald-100 text-emerald-700",
    Lost: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;