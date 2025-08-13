import React from "react";

const QuantumComputingBlogPage = () => {
  return (
    <div className="page-container" style={{ backgroundColor: "#0b0b0b", minHeight: "100vh", padding: "20px", color: "white", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Back to Blogs Button */}
      <a
        href="/blogs"
        className="button-orange"
        style={{
          backgroundColor: "#e2631f",
          color: "white",
          fontWeight: 700,
          padding: "10px 20px",
          borderRadius: "25px",
          border: "none",
          cursor: "pointer",
          display: "inline-block",
          textDecoration: "none",
          marginBottom: "20px",
          userSelect: "none",
        }}
      >
        ← Back to Blogs
      </a>

      {/* Title and Publish Date */}
      <div
        style={{
          backgroundColor: "#121212",
          padding: "40px",
          borderRadius: "12px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontWeight: "900", fontSize: "2.8rem", marginBottom: "15px" }}>
          The Rise of Quantum Computing
        </h1>
        <span
          style={{
            backgroundColor: "#e2631f",
            color: "white",
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: "8px",
            display: "inline-block",
            userSelect: "none",
          }}
        >
          Published: June 12, 2025
        </span>
      </div>

      {/* Blog Content */}
      <div
        style={{
          backgroundColor: "#222222",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "900px",
          margin: "0 auto",
          lineHeight: "1.6",
          fontSize: "1.1rem",
          color: "white",
        }}
      >
        <p>
          Quantum computing is no longer a far-off dream. With companies like IBM, Google, and numerous startups pushing the boundaries of what's possible, we are now closer than ever to unlocking the full potential of this revolutionary technology.
        </p>

        <p>
          Unlike classical computers, which use bits that represent either 0 or 1, quantum computers use qubits, which can exist in multiple states at once thanks to the principles of superposition and entanglement. This unique property allows quantum systems to process vast amounts of information simultaneously, solving complex problems that would take classical computers centuries to crack.
        </p>

        <h2 style={{ color: "#e2631f", fontWeight: "700", marginTop: "30px" }}>
          Breakthroughs in Industry
        </h2>

        <p>
          Major milestones have already been achieved. Google's quantum processor Sycamore performed a task in 200 seconds that would take the world's most powerful supercomputer over 10,000 years. IBM, on the other hand, is aiming to build a 100,000 qubit quantum computer within the next decade as part of its Quantum Development Roadmap.
        </p>

        <h2 style={{ color: "#e2631f", fontWeight: "700", marginTop: "30px" }}>
          Real-World Applications
        </h2>

        <p>
          The potential applications are staggering. From drug discovery and financial modeling to cryptography and artificial intelligence, quantum computing promises to revolutionize how we approach complex computational challenges. In cybersecurity, quantum computers could break current encryption methods, but they also offer the foundation for quantum cryptography, providing unbreakable security protocols.
        </p>

        <p>
          As we stand on the brink of the quantum age, it's clear that this technology will reshape industries and create new possibilities we can barely imagine today.
        </p>
      </div>
    </div>
  );
};

export default QuantumComputingBlogPage;
