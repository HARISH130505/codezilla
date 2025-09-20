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
    <div className="min-h-screen text-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-16 tracking-wide">
        CLUB MEMBERS
      </h1>

      <div className="flex flex-col gap-20">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center justify-center gap-12"
          >
            {member.align === "left" && (
              <div className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="bg-[#DE5D26]  text-black rounded-3xl px-10 py-6 md:w-[650px] text-2xl font-medium">
              {member.name}
              <span className="block text-base mt-2 font-normal">
                {member.role}
              </span>
            </div>

            {member.align === "right" && (
              <div className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
