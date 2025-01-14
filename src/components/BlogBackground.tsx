import AnimatedGradient from "./AnimatedGradient";

function BlogBackground() {
  const lightGradients = [
    ["#A8E6CF", "#DCEDC1"],
    ["#95E1D3", "#EAFFD0"],
  ];
  return (
    <div>
      <AnimatedGradient colors={lightGradients[0]} speed={0.05} blur="medium" />
    </div>
  );
}

export default BlogBackground;
