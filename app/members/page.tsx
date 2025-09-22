export default function Page() {
  const members = [
    {
      name: "Saravana Sabaree",
      role: "Lead",
      img: "/Lead.jpg",
      align: "left",
    },
    {
      name: "Manan Toshniwal",
      role: "Co-Lead",
      img: "/Co-Lead.jpg",
      align: "right",
    },
    {
      name: "Harish",
      role: "Technical Lead",
      img: "/Technical_lead.jpg",
      align: "left",
    },
    {
      name: "Varsha",
      role: "Design Lead",
      img: "/Design_lead.webp",
      align: "right",
    },
    {
      name: "Sneha Das",
      role: "Management Lead",
      img: "/Management_lead.jpg",
      align: "left",
    },
    {
      name: "Tanu Priya",
      role: "Content Lead",
      img: "/Content_lead.jpg",
      align: "right",
    },
    {
      name: "Madhumitha Das",
      role: "PR Lead",
      img: "/PR_lead.jpg",
      align: "left",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16 text-center">
      <h1 className="text-4xl md:text-5xl font-passion mb-16 tracking-wide">
        CLUB MEMBERS
      </h1>
      <div className="flex flex-col gap-20">
        {members.map((member, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center gap-12 ${
              member.align === "left"
                ? "md:flex-row"
                : "md:flex-row-reverse"
            }`}
          >
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gradient-to-r from-[#DE5D26] to-[#FF8C42] text-black rounded-3xl px-6 py-4 md:px-10 md:py-6 w-full md:w-[650px] text-xl md:text-2xl font-medium">
              {member.name}
              <span className="block text-sm md:text-base mt-2 font-normal">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}